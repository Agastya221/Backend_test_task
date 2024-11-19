import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const addBulkStores_For_testing = async (req: Request, res: Response) : Promise<void> => {
  try {
    const stores = req.body; 

    if (!Array.isArray(stores)) {
       res.status(400).json({ error: 'Request body must be an array of store objects' });
    }

    // Bulk insert stores using createMany
    const result = await prisma.store.createMany({
      data: stores,
      skipDuplicates: true, 
    });

    res.status(201).json({ message: 'Stores added successfully', count: result.count });
  } catch (error) {
    console.error('Error adding stores:', error);
    res.status(500).json({ error: 'Failed to add stores' });
  }
};
