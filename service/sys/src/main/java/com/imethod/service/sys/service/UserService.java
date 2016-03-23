package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.UserDao;
import com.imethod.service.sys.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class UserService {


    Logger logger = LoggerFactory.getLogger(UserService.class);


    @Autowired
    private UserDao userDao;


    public void insert(User user) {

        userDao.insert(user);
    }


    public void update(User user) {
        User userDB = userDao.loadById(user.getUserId());
        userDB.setState(user.getState());
        userDB.setOrgId(user.getOrgId());
        userDB.setUserName(user.getUserName());
        userDB.setEmail(user.getEmail());
        userDB.setMobile(user.getMobile());
        String gender = user.getGender();
        userDB.setGender(gender);
        try {
            userDao.update(user);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return userDao.list(pageIndex, pageSize);
    }


    public User loadById(Long userId) {
        return userDao.loadById(userId);
    }


    public PageMaker listUser(String query, Long pageIndex, Long pageSize) {
        return userDao.listUser(query, pageIndex, pageSize);
    }
}