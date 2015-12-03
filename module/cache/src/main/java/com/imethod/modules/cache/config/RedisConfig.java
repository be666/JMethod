package com.imethod.modules.cache.config;

import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import lombok.Data;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.stereotype.Repository;

/**
 * time : //8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Repository
@Data
@PropertySource("classpath:/redis.properties")
public class RedisConfig implements InitializingBean {

    @Value("#{redis['redis.master']}")
    private String master;
    private static Logger logger = LoggerFactory.getLogger(RedisConfig.class);

    @Bean(name = "redis")
    public static PropertySourcesPlaceholderConfigurer redis() {
        return new PropertySourcesPlaceholderConfigurer();
    }


    @Override
    public void afterPropertiesSet() throws Exception {
        logger.debug(master);
    }
}
