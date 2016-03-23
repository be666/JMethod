package com.imethod.service.sys.controller;

import com.imethod.core.util.StringTools;
import com.imethod.service.sys.auth.PermissionCheck;
import com.imethod.service.sys.domain.User;
import com.imethod.service.sys.service.AuthService;
import com.imethod.service.sys.sso.SSOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 * 1.
 */
@Controller
public class AuthCtrl {

    @Autowired
    private AuthService authService;

    @Autowired
    private SSOService ssoService;

    @PermissionCheck(false)
    @RequestMapping("/login")
    public ModelAndView login(HttpServletRequest request,
                              @RequestParam(required = false) String inputEmail,
                              @RequestParam(required = false) String inputPassword,
                              @RequestParam(required = false) String refer) {
        User user = null;
        if (StringTools.isNotEmpty(inputEmail) && StringTools.isNotEmpty(inputPassword)) {
            user = authService.getLoginUser(inputEmail, inputPassword);
        }
        if (user != null) {
            //登陆
            if (ssoService.login(request, user.getUserId())) {
                if (StringTools.isNotEmpty(refer) && !refer.contains("/login")) {
                    return new ModelAndView("redirect:" + refer);
                } else {
                    return new ModelAndView("redirect:/");
                }
            }
        }
        return new ModelAndView("login");
    }

    @PermissionCheck(false)
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {
        ssoService.logout(request);
        return "logout";
    }

    @PermissionCheck(false)
    @RequestMapping("/noAuth")
    @ResponseBody
    public String noAuth() {
        return "没有权限";
    }

    @RequestMapping("/mvc")
    public String main() {
        return "mvc";
    }
}
