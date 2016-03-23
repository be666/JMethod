package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.OsUserDao;
import com.imethod.service.sys.domain.OsUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class OsUserService {


    Logger logger = LoggerFactory.getLogger(OsUserService.class);


    @Autowired
    private OsUserDao osUserDao;


    public void insert(OsUser osUser) {
        osUserDao.insert(osUser);
    }


    public void update(OsUser osUser) {
        try {
            osUserDao.update(osUser);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return osUserDao.list(pageIndex, pageSize);
    }


    public OsUser loadById(Long osUserId) {
        return osUserDao.loadById(osUserId);
    }


}