// utils/redisCache.ts
import redisClient from './redisClient';

export const invalidateProductHistoryCache = async (storeId?: number, startDate?: string, endDate?: string, action?: string, ) => {
  const cacheKey =`productHistory:${storeId || undefined}:${startDate || undefined}:${endDate || undefined}:${action || undefined}`;
  console.log(`Invalidating cache for key: ${cacheKey}`);
  await redisClient.del(cacheKey);
};
