package com.imethod.service.sys.controller;

import com.imethod.core.bean.PageMaker;
import com.imethod.core.bean.vo.ReturnBean;
import com.imethod.service.sys.auth.UserContent;
import com.imethod.service.sys.domain.OsUser;
import com.imethod.service.sys.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time : 15/11/15.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Controller
public class PermissionCtrl {

    @Autowired
    private PermissionService permissionService;

    @RequestMapping(value = "/permission", method = RequestMethod.GET)
    public String permission() {
        return "permission";
    }


    @RequestMapping(value = "/permission/menu", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean menu() {
        Map<String, Object> map = new HashMap<>();
        map.put("menuList", permissionService.getUserMenu(UserContent.getAuthUser().getUserId()));
        return new ReturnBean(map);
    }

    @RequestMapping(value = "/permission/usermenu/{userId}", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean userMenu(@PathVariable Long userId,
                               @RequestParam(value = "menus[]") List<Long> menuList) {
        Map<String, Object> map = new HashMap<>();
        permissionService.saveUserMenu(userId, menuList);
        return new ReturnBean(map);
    }

    @RequestMapping(value = "/permission/menu/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public ReturnBean menuUserId(@PathVariable Long userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("ruleList", permissionService.getUserMenu(userId));
        map.put("menuList", permissionService.queryMenuList());
        return new ReturnBean(map);
    }

    @RequestMapping(value = "/permission/user.ajax", method = RequestMethod.GET)
    @ResponseBody
    public ReturnBean user(@RequestParam(required = false) String query,
                           @RequestParam(required = false) Long pageIndex,
                           @RequestParam(required = false) Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        PageMaker pageMaker = permissionService.getOsUser(query, pageIndex, pageSize);
        map.put("pageMaker", pageMaker);
        return new ReturnBean(map);
    }

    @RequestMapping(value = "/permission/unosuser.ajax", method = RequestMethod.GET)
    @ResponseBody
    public ReturnBean unosuser(@RequestParam(required = false) String query,
                               @RequestParam(required = false) Long pageIndex,
                               @RequestParam(required = false) Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        PageMaker pageMaker = permissionService.getUnOsUser(query, pageIndex, pageSize);
        map.put("pageMaker", pageMaker);
        return new ReturnBean(map);
    }

    @RequestMapping(value = "/permission/adduser/{userId}", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean addUser(@PathVariable Long userId) {
        Map<String, Object> map = new HashMap<>();
        OsUser osUser = new OsUser();
        osUser.setPassword("123456");
        osUser.setUserId(userId);
        permissionService.insert(osUser);
        return new ReturnBean(map);
    }

}
