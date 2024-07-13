// backend/controllers/urlController.js

const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');
const geoip = require('geoip-lite');

const prisma = new PrismaClient();

const createShortUrl = async (req, res) => {
  const { originalUrl, customCode } = req.body;
  const shortCode = customCode || nanoid(6);

  try {
    const url = await prisma.url.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
};

const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const visit = await prisma.visit.create({
      data: {
        urlId: url.id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        deviceType: getDeviceType(req.headers['user-agent']),
      },
    });

    res.redirect(302, url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Error redirecting URL' });
  }
};

const getUrlAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await prisma.url.findUnique({
      where: { shortCode },
      include: {
        visits: true,
      },
    });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const totalVisits = url.visits.length;
    const uniqueVisitors = new Set(url.visits.map((visit) => visit.ipAddress)).size;
    const visitsByDeviceType = url.visits.reduce((acc, visit) => {
      acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
      return acc;
    }, {});

    res.json({
      originalUrl: url.originalUrl,
      totalVisits,
      uniqueVisitors,
      visitsByDeviceType,
      visits: url.visits,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving URL analytics' });
  }
};

const getDeviceType = (userAgent) => {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getUrlAnalytics,
};
