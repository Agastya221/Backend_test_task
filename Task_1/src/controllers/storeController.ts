import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {StoreSchema} from "../validators/storeValidation";
import { ZodError } from 'zod';
import redisClient from '../utils/redisClient';
const prisma = new PrismaClient();



export const createStore = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = StoreSchema.parse(req.body); 
        const { name, location } = validatedData;
        const store = await prisma.store.create({
            data: {
                name,
                location,
            },
        });
        res.status(201).json(store);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create store' });
        }
    }
};

export const getStores = async (req: Request, res: Response): Promise<void> => {
    try {
        const cacheKey = 'stores'
  
      // Check if data is in Redis
      const cachedProducts = await redisClient.get(cacheKey)
      if (cachedProducts) {
        console.log('Serving from cache')
        res.status(200).json(JSON.parse(cachedProducts))
        return
      }

        const stores = await prisma.store.findMany();
        await redisClient.setex(cacheKey, 40, JSON.stringify(stores));
        console.log('Serving from database')
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stores' });
    }
};