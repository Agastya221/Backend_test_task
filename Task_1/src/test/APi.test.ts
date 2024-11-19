import request from 'supertest';
import { app, server } from '../index'; 
import { PrismaClient } from '@prisma/client';
import redisClient from '../utils/redisClient';

const prisma = new PrismaClient();

describe('API Tests', () => {
  beforeAll(async () => {
    // Seeding  the database
    await prisma.store.create({
      data: { name: 'Store 1', location: 'Location 5' },
    });

    await prisma.product.create({
      data: { name: 'Product 1', plu: 'PLU5667' },
    });
  });


  afterAll(async () => {
    // Cleaning up the databaseq
    await prisma.productAction.deleteMany();
    await prisma.inventory.deleteMany();

    await prisma.product.deleteMany();
    await prisma.store.deleteMany();
    await prisma.$executeRaw`TRUNCATE TABLE  "ProductAction", "Inventory", "Product", "Store" RESTART IDENTITY`;
    await prisma.$disconnect();
    await redisClient.quit();
    server.close();
  });

  it('should create a new product', async () => {
    const response = await request(app).post('/api/addProduct').send({
      plu: 'PLU124',
      name: 'Product 2',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Product 2');
  });

  it('should create a new store', async () => {
    const response = await request(app).post('/api/createStore').send({
      name: 'Store 2',
      location: 'Location 2',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Store 2');
  });

  it('should create an inventory record', async () => {
    const product = await prisma.product.findFirst({ where: { name: 'Product 1' } });
    const store = await prisma.store.findFirst({ where: { name: 'Store 1' } });

    const response = await request(app).post('/api/createInventory').send({
      productId: product?.id,
      storeId: store?.id,
      quantityOnShelf: 10,
      quantityInOrder: 5,
    });

    expect(response.status).toBe(201);
    expect(response.body.quantityOnShelf).toBe(10);
  });

  it('should increase inventory', async () => {
    const product = await prisma.product.findFirst({ where: { name: 'Product 1' } });
    const store = await prisma.store.findFirst({ where: { name: 'Store 1' } });

    const response = await request(app).post('/api/increaseInventory').send({
      productId: product?.id,
      storeId: store?.id,
      quantity: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inventory updated successfully');
  });

  it('should decrease inventory', async () => {
    const product = await prisma.product.findFirst({ where: { name: 'Product 1' } });
    const store = await prisma.store.findFirst({ where: { name: 'Store 1' } });

    const response = await request(app).post('/api/decreaseInventory').send({
      productId: product?.id,
      storeId: store?.id,
      quantity: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inventory updated successfully');
  });

  it('should fetch inventory', async () => {
    const response = await request(app).get('/api/inventory');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch products', async () => {
    const response = await request(app).get('/api/product');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch stores', async () => {
    const response = await request(app).get('/api/store');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch product history', async () => {
    const product = await prisma.product.findFirst({ where: { name: 'Product 1' } });
    const store = await prisma.store.findFirst({ where: { name: 'Store 1' } });

    const response = await request(app)
      .get('/api/productHistory')
      .query({ storeId: store?.id, productId: product?.id });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
