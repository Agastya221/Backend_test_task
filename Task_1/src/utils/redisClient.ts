import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost',   
  port: 6379,          
  db: 0,               
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err: Error) => {
  console.error('Redis error', err);
});

export default redisClient;
