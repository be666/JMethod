package com.imethod.modules.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/**
 *  auth : iMethod
 *  time : 15/11/3
 *  desc :
 */
@Service
public class RedisCacheService implements CacheService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;


}
