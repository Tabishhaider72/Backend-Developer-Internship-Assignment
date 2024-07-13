import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

// Controller functions
const createShortUrl = async (originalUrl, customCode) => {
  try {
    let shortCode = customCode || nanoid(7); // Generate a short code if not provided

    // Check if the custom short code already exists
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode },
    });

    // If exists, generate a new short code
    while (existingUrl) {
      shortCode = nanoid(7);
    }

    // Create new URL entry in the database
    const createdUrl = await prisma.url.create({
      data: {
        original: originalUrl,
        shortCode,
      },
    });

    return createdUrl;
  } catch (error) {
    throw new Error(`Error creating short URL: ${error.message}`);
  }
};

const getUrlByShortCode = async (shortCode) => {
  try {
    // Retrieve URL by short code from the database
    const url = await prisma.url.findUnique({
      where: { shortCode },
    });

    return url;
  } catch (error) {
    throw new Error(`Error retrieving URL: ${error.message}`);
  }
};

export { createShortUrl, getUrlByShortCode };
