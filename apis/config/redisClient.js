const redis = require('redis');

async function redisClient() {

    try {
        const redisConfig = redis.createClient({
            socket: {
                port: process.env.REDIS_PORT,
                host: process.env.REDIS_HOST
            }
        }
        );
        const client = await redisConfig.connect();
        console.log(`Connected to Redis successfully!`);
        return client;

    } catch (e) {
        console.error('Redis connection errro!');
        throw e;
    }


}
module.exports = redisClient;


