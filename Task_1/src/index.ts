
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import Router from './routes/routes';

const app = express();

const prisma = new PrismaClient(); // PrismaClient instance

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", Router);

// Request logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request:', req.method, req.url);
    next();
});


app.get("/", async (req: Request, res: Response) => {
    try {
        

        res.send("Hello World! Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).send("Database connection failed.");
    }
});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });


process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
export { app, server };
