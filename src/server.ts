import app from './index';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAdminUser } from './common/utils/initAdmin.util';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const MONGODB_URI: string =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/express-backend';

mongoose
  .connect(MONGODB_URI)
  .then(async (): Promise<void> => {
    console.log('Connected to MongoDB');
    await createAdminUser();
    app.listen(PORT, (): void => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error): void => {
    console.error('Failed to connect to MongoDB', err);
  });
