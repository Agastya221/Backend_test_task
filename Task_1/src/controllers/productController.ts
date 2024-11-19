import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { CreateProductInput, createProductSchema } from '../validators/productValidtions'
import { ZodError } from 'zod'
import redisClient from '../utils/redisClient'
const prisma = new PrismaClient()

export const addProduct = async (req: Request, res: Response) : Promise<void> =>  {
    try {
      // Validate request body
      const validatedData: CreateProductInput = createProductSchema.parse(req.body)
  
      const { plu, name } = validatedData
  
      // Create product     
      const product = await prisma.product.create({
        data: {
          plu,
          name,
        },
      })
  
      // Clear Redis cache
      await redisClient.del('products')
      // Send success response
      res.status(201).json(product)
    } catch (error) {
        if (error instanceof ZodError) {
          // Handle validation errors
           res.status(400).json({
            errors: error.errors.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          })
        }
    
        console.error("Error adding product:", error)
        res.status(500).json({ message: "An error occurred while adding the product" })
      }
  }

  export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const cacheKey = 'products'
  
      // Check if data is in Redis
      const cachedProducts = await redisClient.get(cacheKey)
      if (cachedProducts) {
        console.log('Serving from cache')
        res.status(200).json(JSON.parse(cachedProducts))
        return
      }
  
      const products = await prisma.product.findMany()
  
      // Cache the data in Redis for 40 seconds
      await redisClient.setex(cacheKey, 40, JSON.stringify(products))
  
      console.log('Serving from database')
      res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Failed to get products' })
    }
  }