package com.imethod.sites.sys.auth;

import com.imethod.sites.sys.bo.IUser;
import com.imethod.sites.sys.util.CookieTools;
import com.imethod.utils.IdentitieTools;
import com.imethod.utils.StringTools;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * time : 15/10/22.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class UserContent {

    public static final ThreadLocal<IUser> userThreadLocal = new ThreadLocal<>();

    public static final ThreadLocal<HttpServletRequest> requestThreadLocal = new ThreadLocal<>();

    public static final ThreadLocal<HttpServletResponse> responseThreadLocal = new ThreadLocal<>();


    /**
     * 获取当前的request对象
     *
     * @return
     */
    public static final HttpServletRequest getRequest() {
        return requestThreadLocal.get();
    }

    public static void setRequest(HttpServletRequest request) {
        requestThreadLocal.set(request);
    }

    /**
     * 获取当前response对象
     *
     * @return
     */
    public static final HttpServletResponse getResponse() {
        return responseThreadLocal.get();
    }

    public static void setResponse(HttpServletResponse response) {
        responseThreadLocal.set(response);
    }

    public static void setIUser(IUser IUser) {
        userThreadLocal.set(IUser);
    }


    public static IUser getIUser() {
        return userThreadLocal.get();
    }

    public static IUser loadIUser() {
        IUser IUser = getIUser();
        if (IUser != null) {
            return IUser;
        }
        return loadUser();
    }

    public static String getUserKey() {
        String sessionKey = (String) getRequest().getAttribute(IUser.vk);
        if (StringTools.isEmpty(sessionKey)) {
            sessionKey = CookieTools.getCookieValue(getRequest(), IUser.vk);
        }
        if (sessionKey == null) {
            return setUserKey();
        }
        return sessionKey;
    }

    public static String setUserKey() {
        String sessionKey = IdentitieTools.uuid2();
        getRequest().setAttribute(IUser.vk, sessionKey);
        CookieTools.setCookie(getResponse(), IUser.vk, sessionKey);
        return sessionKey;
    }


    private static IUser loadUser() {
        HttpServletRequest request = getRequest();
        if (request == null) return null;
        return loadFromServlet();
    }

    private static IUser loadFromServlet() {
        Object obj = getRequest().getServletContext().getAttribute("i_user_" + getUserKey());
        if (!StringTools.isEmpty(obj)) {
            return (IUser) obj;
        }
        return null;
    }

    public static void saveIUser(IUser IUser) {
        getRequest().getServletContext().setAttribute("i_user_" + getUserKey(), IUser);
        setIUser(IUser);
    }


    /**
     * 清除登录上下文环境
     */
    public static void clear() {
        userThreadLocal.set(null);
        requestThreadLocal.set(null);
        responseThreadLocal.set(null);
    }

}
