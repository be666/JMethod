package com.imethod.service.sys.sso;

import javax.servlet.http.HttpServletRequest;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 * 1.
 */
public interface SSOService {

    //登陆
    boolean login(HttpServletRequest request, Long userId);

    //验证登陆信息是否有效
    boolean logout(HttpServletRequest request);

    //获取登陆信息 (包含校验 与 自动登陆)
    Long getUserId(HttpServletRequest request);
}
