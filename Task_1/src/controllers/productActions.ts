import { PrismaClient, ActionType } from '@prisma/client';
import { Request, Response } from 'express';
import redisClient from '../utils/redisClient';

const prisma = new PrismaClient()

export const getProductHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId, startDate, endDate, action } = req.query


    const parsedStartDate = startDate ? new Date(startDate as string) : undefined
    const parsedEndDate = endDate ? new Date(endDate as string) : undefined

    // Validate dates if provided
    if (startDate && isNaN(parsedStartDate!.getTime())) {
      res.status(400).json({ error: 'Invalid startDate format.' })
      return
    }
    if (endDate && isNaN(parsedEndDate!.getTime())) {
      res.status(400).json({ error: 'Invalid endDate format.' })
      return
    }
    if (parsedEndDate) {
      parsedEndDate.setHours(23, 59, 59, 999)
    }

    const cacheKey = `productHistory:${storeId}:${startDate}:${endDate}:${action}`

    // Checking  if the data is cache
    const cachedHistory = await redisClient.get(cacheKey)
    if (cachedHistory) {
      res.status(200).json(JSON.parse(cachedHistory))
      console.log('Serving from cache')
      return;
    }

    
    const history = await prisma.productAction.findMany({
      where: {
        storeId: storeId ? Number(storeId) : undefined,
        action: action ? (action as ActionType) : undefined,
        timestamp: {
          gte: parsedStartDate || undefined,
          lte: parsedEndDate || undefined,
        },
      },
      include: {
        product: true,
        store: true,
      },
    })

    await redisClient.setex(cacheKey, 30, JSON.stringify(history))
    console.log('Serving from database')
    res.status(200).json(history)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch product action history.' })
  }
}
