package com.imethod.modules.cache.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.data.redis.cache.RedisCache;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.Serializable;

/**
 * auth : iMethod
 * time : 15/11/3
 * desc :
 */
@Service
public class RedisCacheService implements Cache {

    @Autowired
    private RedisTemplate<String, Serializable> redisTemplate;

    private RedisCache redisCache;

    @PostConstruct
    public void init() {
        redisCache = new RedisCache("iMethod", "iMethod".getBytes(), redisTemplate, 1000L);
    }

    @Override
    public String getName() {
        return redisCache.getName();
    }

    @Override
    public Object getNativeCache() {
        return redisCache.getNativeCache();
    }

    @Override
    public ValueWrapper get(Object o) {
        return redisCache.get(o);
    }

    @Override
    public <T> T get(Object o, Class<T> aClass) {
        return redisCache.get(o, aClass);
    }

    @Override
    public void put(Object o, Object o1) {
        redisCache.put(o, o1);
    }

    @Override
    public ValueWrapper putIfAbsent(Object o, Object o1) {
        return redisCache.putIfAbsent(o, o1);
    }

    @Override
    public void evict(Object o) {
        redisCache.evict(o);
    }

    @Override
    public void clear() {
        redisCache.clear();
    }
}
