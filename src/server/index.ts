
import express from 'express';
import { webhookRouter } from './webhook';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Regular routes should use JSON parsing
app.use(express.json());

// Webhook routes need raw body parsing
app.use('/webhook', webhookRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});