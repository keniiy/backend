import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './common/middlewares/error-handler.middleware';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
