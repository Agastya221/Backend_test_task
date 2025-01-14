import { ActionType } from "@prisma/client";

const sampleActions = [
    { productId: 1, storeId: 1, action: ActionType.add_stock, quantityChanged: 100 },
    { productId: 1, storeId: 1, action: ActionType.remove_stock, quantityChanged: 50 },
    { productId: 2, storeId: 1, action: ActionType.add_stock, quantityChanged: 200 },
    { productId: 3, storeId: 1, action: ActionType.remove_stock, quantityChanged: 30 },
    { productId: 4, storeId: 1, action: ActionType.add_stock, quantityChanged: 150 },
    { productId: 5, storeId: 1, action: ActionType.remove_stock, quantityChanged: 60 },
    { productId: 6, storeId: 2, action: ActionType.add_stock, quantityChanged: 300 },
    { productId: 7, storeId: 2, action: ActionType.remove_stock, quantityChanged: 75 },
    { productId: 8, storeId: 2, action: ActionType.add_stock, quantityChanged: 250 },
    { productId: 1, storeId: 3, action: ActionType.add_stock, quantityChanged: 120 },
    { productId: 2, storeId: 3, action: ActionType.remove_stock, quantityChanged: 80 },
    { productId: 3, storeId: 3, action: ActionType.add_stock, quantityChanged: 200 },
    { productId: 4, storeId: 3, action: ActionType.remove_stock, quantityChanged: 90 },
    { productId: 5, storeId: 4, action: ActionType.add_stock, quantityChanged: 180 },
    { productId: 6, storeId: 4, action: ActionType.remove_stock, quantityChanged: 120 },
    { productId: 7, storeId: 4, action: ActionType.add_stock, quantityChanged: 500 },
    { productId: 8, storeId: 4, action: ActionType.remove_stock, quantityChanged: 200 },
    { productId: 1, storeId: 1, action: ActionType.add_stock, quantityChanged: 80 },
    { productId: 2, storeId: 1, action: ActionType.remove_stock, quantityChanged: 70 },
    { productId: 3, storeId: 2, action: ActionType.add_stock, quantityChanged: 150 },
    { productId: 4, storeId: 2, action: ActionType.remove_stock, quantityChanged: 50 },
    { productId: 5, storeId: 2, action: ActionType.add_stock, quantityChanged: 250 },
    { productId: 6, storeId: 2, action: ActionType.remove_stock, quantityChanged: 100 },
    { productId: 7, storeId: 3, action: ActionType.add_stock, quantityChanged: 400 },
    { productId: 8, storeId: 3, action: ActionType.remove_stock, quantityChanged: 180 },
    { productId: 1, storeId: 3, action: ActionType.add_stock, quantityChanged: 90 },
    { productId: 2, storeId: 4, action: ActionType.remove_stock, quantityChanged: 60 },
    { productId: 3, storeId: 4, action: ActionType.add_stock, quantityChanged: 170 },
    { productId: 4, storeId: 4, action: ActionType.remove_stock, quantityChanged: 80 },
    { productId: 5, storeId: 4, action: ActionType.add_stock, quantityChanged: 300 },
    { productId: 6, storeId: 4, action: ActionType.remove_stock, quantityChanged: 120 },
    { productId: 7, storeId: 1, action: ActionType.add_stock, quantityChanged: 600 },
    { productId: 8, storeId: 1, action: ActionType.remove_stock, quantityChanged: 300 },
  ];
  
  export default sampleActions;