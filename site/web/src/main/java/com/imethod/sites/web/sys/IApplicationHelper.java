package com.imethod.sites.web.sys;

import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.IOTools;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.Properties;

/**
 * time : 15/11/8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class IApplicationHelper implements ApplicationContextAware {
    private static final Logger logger = LoggerFactory.getLogger(IApplicationHelper.class);
    private static String webRootPath;
    private static final Object webRootPathLock = new Object();
    private static ServletContext servletContext;
    private static ApplicationContext appContext;
    private static String contextPath;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        appContext = applicationContext;
    }

    /**
     * 获取当前Web的根目录
     *
     * @return
     */
    public static String getWebRootPath() {
        if (webRootPath != null) {
            return webRootPath;
        }
        synchronized (webRootPathLock) {
            // double check.
            if (webRootPath != null) {
                return webRootPath;
            }
            String path = servletContext.getRealPath("/");
            path = path.replace('\\', '/');
            if (path.charAt(path.length() - 1) == '/') {
                path = path.substring(0, path.length() - 1);
            }
            webRootPath = path;
            logger.debugFormat("Get web root path: [%s].", webRootPath);
        }
        return webRootPath;
    }

    /**
     * 获取Servlet上下文
     *
     * @return
     */
    public static ServletContext getServletContext() {
        return servletContext;
    }

    public static void setServletContext(ServletContext sc) {
        servletContext = sc;
    }

    public static String getContextPath() {
        if (contextPath != null) {
            return contextPath;
        }
        contextPath = servletContext.getContextPath();
        return contextPath;
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    public static <T> T getBean(String name) {
        return (T) appContext.getBean(name);
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    public static <T> T getBean(Class<T> requiredType) {
        return (T) appContext.getBean(requiredType);
    }

    /**
     * 清除IApplicationHelper中的ApplicationContext为Null.
     */
    public static void clear() {
        logger.debug("清除IApplicationHelper中的ApplicationContext:" + appContext);
        appContext = null;
    }

    public static String getWebRoot() {
        try {
            return appContext.getResource("/").getFile().getPath();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static Properties getProperties(String pathName) {
        Properties properties = new Properties();
        InputStream in = null;
        try {
            in = appContext.getResource(pathName).getInputStream();
            properties.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOTools.closeQuietly(in);
        }
        return properties;
    }

    public static String getMessage(String var1, Locale var4) {
        return appContext.getMessage(var1, null, var1, var4);
    }
}
