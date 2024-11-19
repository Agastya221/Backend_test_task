import { z } from 'zod';

export const createInventorySchema = z.object({
    productId: z.number().int().positive(),
    storeId: z.number().int().positive(),
    quantityOnShelf: z.number().int().nonnegative(),
    quantityInOrder: z.number().int().nonnegative(),
});


 

export const increaseInventorySchema = z.object({
    quantity: z.number().int().positive(),
    productId: z.number().int().positive(),
    storeId: z.number().int().positive(),
});


export const decreaseInventorySchema = z.object({
    quantity: z.number().int().positive(),
    productId: z.number().int().positive(),
    storeId: z.number().int().positive(),
});
