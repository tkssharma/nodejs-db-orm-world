import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';

const app = express();
dotenv.config({ path: path.join(__dirname, '.env.local') });

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started at ${process.env.PORT || 5000}`)
);
