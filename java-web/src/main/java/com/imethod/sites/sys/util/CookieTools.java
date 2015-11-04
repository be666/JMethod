package com.imethod.sites.sys.util;

import com.imethod.modules.utils.ExceptionTools;
import com.imethod.modules.utils.StringTools;
import com.imethod.sites.sys.ApplicationHelper;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * time : 15/10/22.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class CookieTools {

    public static void setCookie(HttpServletResponse response, String key, String value) {
        setCookie(response, key, value, -1);
    }

    /**
     * 保存Cookie
     *
     * @param response
     * @param key
     * @param value
     * @param expiry
     */
    public static void setCookie(HttpServletResponse response, String key, String value, int expiry) {
        Cookie cookie = new Cookie(key, value);
        String contextPath = ApplicationHelper.getContextPath();
        if (StringTools.isEmpty(contextPath)) {
            contextPath = "/";
        }
        if (!contextPath.endsWith("/")) {
            contextPath = contextPath.concat("/");
        }
        if (expiry >= 0) {
            cookie.setMaxAge(expiry);
        }

        cookie.setPath(contextPath);
        response.addCookie(cookie);
    }

    /**
     * 获取Cookie
     *
     * @param request
     * @param key
     * @return
     */
    public static Cookie getCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if (null == cookies) return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equalsIgnoreCase(key)) {
                return cookie;
            }
        }

        return null;
    }

    /**
     * 获取Cookie值
     *
     * @param request
     * @param key
     * @return
     */
    public static String getCookieValue(HttpServletRequest request, String key) {
        if (StringTools.isEmpty(key)) {
            return "";
        }

        Cookie cookie = getCookie(request, key);
        if (cookie != null) {
            try {
                return URLDecoder.decode(cookie.getValue(), "utf-8");
            } catch (UnsupportedEncodingException e) {
                ExceptionTools.unchecked(e);
            }
        }
        return "";
    }

    /**
     * 清楚Cookie
     *
     * @param request
     * @param response
     * @param key
     */
    public static void clearCookie(HttpServletRequest request, HttpServletResponse response, String key) {
        Cookie cookie = getCookie(request, key);
        if (cookie != null) {
            setCookie(response, key, "", 0);
        }
    }
}
