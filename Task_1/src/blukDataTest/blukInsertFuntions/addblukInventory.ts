import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { createInventorySchema } from '../../validators/inventoryValidtions';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

// Define the type for the inventory item
type InventoryItem = {
  productId: number;
  storeId: number;
  quantityOnShelf: number;
  quantityInOrder: number;
};

export const createBulkInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    // Expect an array of inventory objects
    const validatedData = req.body as InventoryItem[];

    if (!Array.isArray(validatedData)) {
      res.status(400).json({ error: 'Request body must be an array of inventory objects' });
    }

    // Validate each item 
    const validatedItems = validatedData.map((item) => createInventorySchema.parse(item));

    // Check if stores exist
    const storeIds = validatedItems.map((item) => item.storeId);
    const stores = await prisma.store.findMany({
      where: { id: { in: storeIds } },
    });

    const storeIdsInDb = stores.map((store) => store.id);
    const missingStores = storeIds.filter((id) => !storeIdsInDb.includes(id));

    if (missingStores.length > 0) {
       res.status(400).json({
        error: `Store(s) with ID(s) ${missingStores.join(', ')} do not exist. Please create these stores first.`,
      });
    }

    // Bulk insert 
    const result = await prisma.inventory.createMany({
      data: validatedItems,
      skipDuplicates: true, 
    });

    res.status(201).json({
      message: 'Bulk inventory created successfully',
      count: result.count,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create bulk inventory' });
    }
  }
};
