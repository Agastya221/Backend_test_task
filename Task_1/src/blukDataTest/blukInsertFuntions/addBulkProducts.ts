import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();




export const addProducts = async (req: Request, res: Response) : Promise<void> => {
    try {
      const products = req.body; // Expect an array of product objects
        
      if (!Array.isArray(products)) {
         res.status(400).json({ error: 'Request body must be an array of product objects' });
      }
  
      const result = await prisma.product.createMany({
        data: products,
        skipDuplicates: true, // Optional: Avoid duplicate errors
      });
  
      res.status(201).json({ message: 'Products added successfully', count: result.count });
    } catch (error) {
      console.error('Error adding products:', error);
      res.status(500).json({ error: 'Failed to add products' });
    }
  };