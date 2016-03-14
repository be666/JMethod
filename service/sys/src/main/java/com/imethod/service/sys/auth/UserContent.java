package com.imethod.service.sys.auth;

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

    public static final ThreadLocal<AuthUser> userThreadLocal = new ThreadLocal<>();

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

    public static void setAuthUser(AuthUser user) {
        userThreadLocal.set(user);
    }


    public static AuthUser getAuthUser() {
        return userThreadLocal.get();
    }


    public static void saveAuthUser(HttpServletRequest request, HttpServletResponse response, AuthUser user) {
        setAuthUser(null);
        setRequest(request);
        setResponse(response);
        setAuthUser(user);
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
