package com.imethod.service.sys.service;

import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.service.sys.dao.UserDao;
import com.imethod.service.sys.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;

/**
 * time : 15/11/14.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Service
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDao userDao;

    public void insert(User user) {
        user.setState(1);
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
            e.printStackTrace();
            logger.error(e.getMessage());
        }
    }

    public PageMaker listUser(String query, Long pageIndex, Long pageSize) {
        return userDao.listUser(query, pageIndex, pageSize);
    }

    public User loadById(Long userId) {
        return userDao.loadById(userId);
    }

    public PageMaker listOrgUser(String orgId, String query, Long pageIndex, Long pageSize) {
        return userDao.listOrgUser(orgId, query, pageIndex, pageSize);
    }
}
