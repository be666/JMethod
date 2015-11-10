package com.imethod.core.log;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Created by Bcaring on 15/6/12.
 * 日志类
 */
public class Logger {

    private Log logger;

    Logger() {
        logger = LogFactory.getLog(this.getClass());
    }

    Logger(Class c) {
        logger = LogFactory.getLog(c);
    }


    public void trace(Object o) {
        if (logger.isTraceEnabled()) {
            logger.trace(o);
        }
    }


    public void trace(Object o, Throwable throwable) {
        if (logger.isTraceEnabled()) {
            logger.trace(o, throwable);
        }
    }


    public void debug(Object o) {
        if (logger.isDebugEnabled()) {

            logger.debug(o);
        }
    }


    public void debug(Object o, Throwable throwable) {
        if (logger.isDebugEnabled()) {

            logger.debug(o, throwable);
        }
    }


    public void info(Object o) {
        if (logger.isInfoEnabled()) {

            logger.info(o);
        }
    }


    public void info(Object o, Throwable throwable) {
        if (logger.isInfoEnabled()) {

            logger.info(o, throwable);
        }
    }


    public void warn(Object o) {
        if (logger.isWarnEnabled()) {
            logger.warn(o);
        }
    }


    public void warn(Object o, Throwable throwable) {
        if (logger.isWarnEnabled()) {

            logger.warn(o, throwable);
        }
    }


    public void error(Object o) {
        if (logger.isWarnEnabled()) {

            logger.error(o);
        }
    }


    public void error(Object o, Throwable throwable) {
        if (logger.isErrorEnabled()) {

            logger.error(o, throwable);
        }
    }


    public void fatal(Object o) {
        if (logger.isFatalEnabled()) {

            logger.fatal(o);
        }
    }


    public void fatal(Object o, Throwable throwable) {
        if (logger.isFatalEnabled()) {
            logger.fatal(o, throwable);
        }
    }

    public void debugFormat(String s, Object... objects) {
        debug(String.format(s, objects));
    }

    public void warnFormat(String s, Object... objects) {
        warn(String.format(s, objects));
    }
}
