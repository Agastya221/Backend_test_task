import { z } from 'zod';


export const StoreSchema = z.object({
    name: z.string().min(1, "Store name cannot be empty"),
    location: z.string().min(1, "Store location cannot be empty"),
});