const redis = require('redis');
const redisClient = require('../config/redisClient');

const checkRedisCache = async (req, res, next) => {

    const client = await redisClient();

    const cacheData = await client.get('propertyData');

    if (!cacheData) {
        return next();
    } else {
        return res.status(200).json({ ...JSON.parse(cacheData), info: 'data from cache' });
    }
};

module.exports = checkRedisCache
