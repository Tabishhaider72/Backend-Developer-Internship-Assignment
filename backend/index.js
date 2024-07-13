import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import urlRoutes from './routes/urlRoutes.js';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
