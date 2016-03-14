package com.imethod.service.sys.auth;

import com.imethod.core.util.StringTools;
import com.imethod.service.sys.sso.SSOService;
import com.imethod.service.sys.domain.User;
import com.imethod.service.record.domain.VisitRecord;
import com.imethod.service.record.service.LogService;
import com.imethod.service.sys.service.PermissionService;
import com.imethod.service.sys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.support.ResourceHolder;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * time : 15/11/14.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class PermissionInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private LogService logService;

    @Autowired
    private UserService userService;

    @Autowired
    private SSOService ssoService;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof ResourceHttpRequestHandler) {
            return true;
        }
        HandlerMethod methodHandler = null;
        if (handler instanceof ResourceHolder) {
            return true;
        }
        //获取用户
        User user = new User();
        Long userId = ssoService.getUserId(request);
        if (userId != null) {
            user = userService.loadById(userId);
        }
        AuthUser lUser = new AuthUser(user.getUserId(), user.getUserName());
        String url = request.getRequestURI();
        if (StringTools.isNotEmpty(request.getQueryString())) {
            url = url.concat("?").concat(request.getQueryString());
        }
        request.setAttribute(PermissionKey.visit_url, url);
        // 装载会话中的登录上下文
        UserContent.saveAuthUser(request, response, lUser);
        //获取权限
        PermissionCheck permissionCheck;
        ResponseBody responseBody;

        boolean allowAnonymous = false;
        String menuType;
        boolean hasRule = true;
        if (handler instanceof HandlerMethod) {
            methodHandler = (HandlerMethod) handler;
            permissionCheck = methodHandler.getMethodAnnotation(PermissionCheck.class);
            responseBody = methodHandler.getMethodAnnotation(ResponseBody.class);
            if (responseBody != null) {
                request.setAttribute("responseBody", "true");
            }
            menuType = "option";
            if (permissionCheck == null) {
                Object bean = methodHandler.getBean();
                menuType = "module";
                permissionCheck = bean.getClass().getAnnotation(PermissionCheck.class);
            }
            if (permissionCheck != null) {
                if (!permissionCheck.value()) {
                    allowAnonymous = true;
                } else {
                    String menu = permissionCheck.menu();
                    List<String> ruleList = permissionService.getUserRuleStr(userId, menuType);
                    hasRule = ruleList.contains(menu);
                }
            }
            if (responseBody != null) {
                request.setAttribute("responseBody", "true");
            }
        }
        request.setAttribute("LUser", lUser);
        if (methodHandler == null) {
            return true;
        }
        if (allowAnonymous) {
            // 不要求登录验证
            return true;
        } else if (StringTools.isNotEmpty(user.getUserId())) {
            response.sendRedirect("/login?refer=" + url);
            return false;
        } else if (!hasRule) {
            response.sendRedirect("/noAuth");
            return false;
        }
        return true;
        //获取用户权限
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
        if (handler instanceof HandlerMethod) {
            VisitRecord visitRecord = new VisitRecord();
            visitRecord.setVisitUrl(request.getRequestURI());
            visitRecord.setUserId(UserContent.getAuthUser().getUserId());
            logService.insertVisit(visitRecord);
        }
        restUserContent();
    }


    @Override
    public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        super.afterConcurrentHandlingStarted(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    private void restUserContent() {
        UserContent.clear();
    }
}
