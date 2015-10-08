package com.imethod.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

/**
 * Created by bcaring on 15/10/7.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@RestController
@EnableAutoConfiguration
public class App {

    @RequestMapping("/")
    public String index() {
        return "hello world";
    }

    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return new AppCustomizer();
    }

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(App.class, args);

        System.out.println("Let's inspect the beans provided by Spring Boot:");

        String[] beanNames = ctx.getBeanDefinitionNames();
        Arrays.sort(beanNames);
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }

}
