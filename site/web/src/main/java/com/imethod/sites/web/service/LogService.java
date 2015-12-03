package com.imethod.sites.web.service;

import com.imethod.sites.web.dao.LogDao;
import com.imethod.sites.web.domain.LoginRecord;
import com.imethod.sites.web.domain.VisitRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 *  1.
 */
@Service
public class LogService {

    @Autowired
    private LogDao logDao;

    public void insertVisit(VisitRecord visitRecord) {
        logDao.insert(visitRecord);
    }

    public void insertLogin(LoginRecord loginRecord) {
        logDao.insert(loginRecord);
    }
}
