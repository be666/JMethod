package com.imethod.module.jms.listener;

import javax.jms.*;

/**
 * time : 15/11/8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class ConsumerMessageListener<T> implements MessageListener {

    public void onMessage(Message message) {
        //这里我们知道生产者发送的就是一个纯文本消息，所以这里可以直接进行强制转换
        ObjectMessage objectMessage = (ObjectMessage) message;
        System.out.println("接收到一个纯文本消息。");
        try {
            System.out.println("消息内容是：" + objectMessage.getObject());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

}