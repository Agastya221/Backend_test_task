import { z } from "zod";



export const createProductSchema = z.object({
    plu: z.string().min(1, "Product PLU cannot be empty"),
    name: z.string().min(1, "Product name cannot be empty"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
