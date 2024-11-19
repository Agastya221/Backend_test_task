import { PrismaClient, ActionType } from '@prisma/client';
import { Request, Response } from 'express';
import { createInventorySchema, decreaseInventorySchema, increaseInventorySchema } from "../validators/inventoryValidtions";
import redisClient from '../utils/redisClient';
import { invalidateProductHistoryCache } from '../utils/redisCache';
import { ZodError } from 'zod';
const prisma = new PrismaClient()

export const createInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = createInventorySchema.parse(req.body) 
        const { productId, storeId, quantityOnShelf, quantityInOrder } = validatedData

        const storeExists = await prisma.store.findUnique({
            where: { id: storeId },
        })

        if (!storeExists) {
            res.status(400).json({
                error: `Store with ID ${storeId} does not exist. Please create the store first.`,
            })
            return
        }
         // Remove old cache
         await redisClient.del(`inventory:${storeId}:${productId}`)

        const inventory = await prisma.inventory.create({
            data: {
                productId,
                storeId,
                quantityOnShelf,
                quantityInOrder,
            },
        })

        // Cache the new inventory in Redis
        await redisClient.setex(`inventory:${storeId}:${productId}`,20, JSON.stringify(inventory))

        res.status(201).json(inventory)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors })
        } else {
            res.status(500).json({ error: 'Failed to create inventory' })
        }
    }
}

export const increaseInventory = async (req: Request, res: Response) => {
    try {
        console.log(req.body)   
        const validatedData = increaseInventorySchema.parse(req.body) 
        const { quantity, productId, storeId } = validatedData

        const updatedInventory = await prisma.inventory.update({
            where: { id: productId },
            data: { quantityOnShelf: { increment: quantity } },
        })

        // Remove old cache
        await redisClient.del(`inventory:${storeId}:${productId}`)

        await prisma.productAction.create({
            data: {
                productId,
                storeId,
                action: ActionType.add_stock,
                quantityChanged: quantity,
            },
        })

        await invalidateProductHistoryCache()

        // Update the cache 
        await redisClient.set(`inventory:${storeId}:${productId}`, JSON.stringify(updatedInventory))

        res.status(200).json({
            message: 'Inventory updated successfully',
            updatedInventory})
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors })
        } else {
            res.status(500).json({ error: 'Failed to increase inventory' })
        }
    }
}

export const decreaseInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = decreaseInventorySchema.parse(req.body)
        const { quantity, productId, storeId } = validatedData

        const updatedInventory = await prisma.inventory.update({
            where: { id: productId },
            data: { quantityOnShelf: { decrement: quantity } },
        })

        // Remove old cache
        await redisClient.del(`inventory:${storeId}:${productId}`)

        

        await prisma.productAction.create({
            data: {
                productId,
                storeId,
                action: ActionType.remove_stock,
                quantityChanged: quantity,
            },
        })
        await redisClient.del(`productHistory:${storeId}:${productId}`)

        // Update the cache 
        await redisClient.set(`inventory:${storeId}:${productId}`, JSON.stringify(updatedInventory))

        res.status(200).json(
            {
                message: 'Inventory updated successfully',
                updatedInventory,}
        )
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors })
        } else {
            res.status(500).json({ error: 'Failed to decrease inventory' })
        }
    }
}

export const getInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { storeId, productId } = req.query

        // Check if the inventory exists in cache
        const cachedInventory = await redisClient.get(`inventory:${storeId}:${productId}`)

        if (cachedInventory) {
            console.log('Serving from cache')
            res.status(200).json(JSON.parse(cachedInventory))
            return; // Return early if data is found in cache
        }

        // fetch from the database, if not found in cache
        const inventory = await prisma.inventory.findMany({
            where: {
                storeId: storeId ? Number(storeId) : undefined,
                productId: productId ? Number(productId) : undefined,
            },
        })

        // Cache the result 
        await redisClient.setex(`inventory:${storeId}:${productId}`, 40, JSON.stringify(inventory))
        console.log('Serving from database')
        res.status(200).json(inventory)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get inventory' })
    }
}
