package com.imethod.sites.sys.auth;

import com.imethod.sites.sys.bo.IUser;
import com.imethod.utils.StringTools;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * time : 15/10/22.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class PermissionInterceptor extends HandlerInterceptorAdapter {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        if (StringTools.isNotEmpty(request.getQueryString())) {
            url = url.concat("?").concat(request.getQueryString());
        }
        request.setAttribute("RequestUrl", url);


        // 装载会话中的登录上下文
        UserContent.setIUser(null);
        UserContent.setRequest(request);
        UserContent.setResponse(response);

        IUser iUser = UserContent.loadIUser();
        PermissionCheck permissionCheck = null;
        ResponseBody responseBody = null;
        HandlerMethod methodHandler = null;
        boolean allowAnonymous = false;
        if (handler instanceof HandlerMethod) {
            methodHandler = (HandlerMethod) handler;
            permissionCheck = methodHandler.getMethodAnnotation(PermissionCheck.class);
            responseBody = methodHandler.getMethodAnnotation(ResponseBody.class);
            if (permissionCheck == null) {
                Object bean = methodHandler.getBean();
                permissionCheck = bean.getClass().getAnnotation(PermissionCheck.class);
            }
            if (permissionCheck != null && permissionCheck.value().length() >= 1 && permissionCheck.value().equalsIgnoreCase("false")) {
                allowAnonymous = true;
            }
            if (responseBody != null) {
                request.setAttribute("responseBody", "true");
            }
        }

        request.setAttribute("iUser", iUser);

        if (methodHandler == null) {
            return true;
        }


        if (allowAnonymous) {
            // 不要求登录验证
            return true;
        }


        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
        restUserContent();
    }

    private void restUserContent() {
        UserContent.clear();
    }

}
