package com.imethod.module.jms.cli;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.jms.*;
import java.util.HashMap;
import java.util.List;

/**
 * time : 15/11/8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Service
public class ProducerService<T> {

    @Autowired
    private JmsTemplate cliJmsTemplate;

    public <T> void sendMessage(Destination destination, final T message) {
        System.out.println("---------------生产者发送消息-----------------");
        System.out.println("---------------生产者发了一个消息：" + message);
            cliJmsTemplate.convertAndSend(destination,message);
    }

}
