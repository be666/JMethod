package com.imethod.service.sys.controller;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.bean.vo.ReturnBean;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.service.sys.domain.User;
import com.imethod.service.sys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * time : 15/11/13.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Controller
public class UserCtrl {

    Logger logger = LoggerFactory.getLogger(UserCtrl.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/{userId}.ajax", method = RequestMethod.GET)
    @ResponseBody
    public ReturnBean load(@PathVariable Long userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("user", userService.loadById(userId));
        return new ReturnBean(map);
    }

    /**
     * add user
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean insert(User user) {

        ReturnBean returnBean = new ReturnBean();
        try {
            userService.insert(user);
        } catch (Exception e) {
            e.printStackTrace();
            returnBean.setStatus(ReturnBean.FALSE);
            returnBean.setMsg("保存失败， " + e.getMessage());
        }
        return returnBean;
    }

    @RequestMapping(value = "/user/{userId}.post", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean update(@PathVariable String userId, User user) {

        ReturnBean returnBean = new ReturnBean();
        try {
            userService.update(user);
        } catch (Exception e) {
            e.printStackTrace();
            returnBean.setStatus(ReturnBean.FALSE);
            returnBean.setMsg("保存失败， " + e.getMessage());
        }
        return returnBean;
    }

    /**
     * update user
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.POST)
    @ResponseBody
    public ReturnBean update(@PathVariable Long userId, User user) {

        ReturnBean returnBean = new ReturnBean();
        try {
            user.setUserId(userId);
            userService.update(user);
        } catch (Exception e) {
            logger.error(e);
            returnBean.setStatus(ReturnBean.FALSE);
            returnBean.setMsg("更新失败， " + e.getMessage());
        }
        return returnBean;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @ResponseBody
    public PageMaker list(@RequestParam(required = false) String query,
                          @RequestParam(required = false) Long pageIndex,
                          @RequestParam(required = false) Long pageSize) {

        PageMaker pageMaker = null;
        try {
            pageMaker = userService.listUser(query, pageIndex, pageSize);
        } catch (Exception e) {
            logger.error(e);

        }
        return pageMaker;
    }
}
