package com.imethod.core.log;

/**
 * Created by Bcaring on 15/6/12.
 * 日志工厂类，返回日志类
 */
public class LoggerFactory {

    /**
     * 获取一个日志类实例
     *
     * @return 日志类
     */
    public static Logger getLogger() {
        return new Logger();
    }

    /**
     * 根据类对象获取一个日志类实例
     *
     * @param clazz 类对象
     * @return 日志类
     */
    public static Logger getLogger(Class clazz) {
        return new Logger(clazz);
    }
}
