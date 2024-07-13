import express from 'express';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/shorten', async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const existingUrl = await prisma.url.findUnique({
      where: { original: originalUrl },
    });

    if (existingUrl) {
      res.json({ shortCode: existingUrl.shortCode });
      return;
    }

    const shortCode = nanoid(7); // Generate a short code
    const createdUrl = await prisma.url.create({
      data: {
        original: originalUrl,
        shortCode,
      },
    });

    res.json({ shortCode: createdUrl.shortCode });
  } catch (error) {
    next(error);
  }
});

export default router;
