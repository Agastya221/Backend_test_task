# Inventory Management System

This project is a backend application for managing inventory and product actions, including stock updates and product history tracking. It uses **Prisma** with **PostgreSQL** as the database and **Redis** for caching.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: The runtime environment for the project.
- **Prisma**: ORM for interacting with PostgreSQL.
- **PostgreSQL**: Relational database for storing inventory and product action data.
- **Redis**: In-memory data store for caching.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Task_1.git

cd Task_1 
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Start the server

```bash
$ npm run dev

```
### 4. Setup PostgreSQL

```bash

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

```
### 5. Setup Redis With Docker

```bash

$ docker run --name redis -p 6379:6379 -d redis

```
Update the redisCLient file with the correct Redis configuration:

```javascript
const redisClient = new Redis({
    host: 'localhost',
    port: 6379           
});

})
```


### 6. Access the API

The API is accessible at `http://localhost:3000`.

### 7. Testing the API with Jest

```bash

$ npm jest

```

## 8. Routes to be tested

- POST /api/addProduct
- POST /api/createInventory
- POST /api/createStore
- POST /api/increaseInventory
- POST /api/decreaseInventory
- GET /api/inventory
- GET /api/product
- GET /api/store
- GET /api/productHistory 
  
Query Parameters:

- storeId (required)
- startDate (optional)
- endDate (optional)
- action (optional)


