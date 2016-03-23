package com.imethod.service.record.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.record.dao.LoginRecordDao;
import com.imethod.service.record.domain.LoginRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class LoginRecordService {


    Logger logger = LoggerFactory.getLogger(LoginRecordService.class);


    @Autowired
    private LoginRecordDao loginRecordDao;


    public void insert(LoginRecord loginRecord) {
        loginRecordDao.insert(loginRecord);
    }


    public void update(LoginRecord loginRecord) {
        try {
            loginRecordDao.update(loginRecord);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return loginRecordDao.list(pageIndex, pageSize);
    }


    public LoginRecord loadById(Long loginId) {
        return loginRecordDao.loadById(loginId);
    }


}