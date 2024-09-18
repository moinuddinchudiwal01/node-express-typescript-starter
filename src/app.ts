import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { ApiError } from "./utils/ApiError";
import mongoDBConfig from "./config/mongo.config";
import routes from './routes';
import morgan from 'morgan';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes
app.use('/v1/api', routes);

// Error handling middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        status: false,
        statusCode: statusCode,
        message: err.message,
    });
});

// Start the server and connect to the database
mongoDBConfig().then(() => {
    app.listen(process.env.PORT, () => {
        console.warn(`API listening on PORT ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});

// Handle unhandled rejections and uncaught exceptions
process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
    console.error(reason.name, reason.message);
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
    console.error(err.name, err.message);
    console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
});
