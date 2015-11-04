package com.imethod.sites.sys.util;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;

/**
 * time : 15/10/23.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class BeanTools {

    private static Logger logger = LoggerFactory.getLogger(BeanTools.class);


    public static void copyProperties(Object to, Object from) {
        try {
            BeanUtils.copyProperties(to, from);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.warn("copyProperties ", e.getCause());
        }
    }

    public static void copyProperty(Object bean, String name, Object value) {
        try {
            BeanUtils.copyProperty(bean, name, value);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.warn("copyProperty ", e.getCause());
        }
    }

    public static void setProperty(Object obj, String name, Object value) {
        try {
            BeanUtils.setProperty(obj, name, value);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.warn("setProperty ", e.getCause());
        }
    }

}
