-- CreateIndex
CREATE INDEX "Inventory_storeId_productId_idx" ON "Inventory"("storeId", "productId");

-- CreateIndex
CREATE INDEX "Inventory_quantityOnShelf_idx" ON "Inventory"("quantityOnShelf");

-- CreateIndex
CREATE INDEX "Inventory_quantityInOrder_idx" ON "Inventory"("quantityInOrder");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "ProductAction_storeId_productId_idx" ON "ProductAction"("storeId", "productId");

-- CreateIndex
CREATE INDEX "ProductAction_timestamp_idx" ON "ProductAction"("timestamp");

-- CreateIndex
CREATE INDEX "ProductAction_action_idx" ON "ProductAction"("action");
