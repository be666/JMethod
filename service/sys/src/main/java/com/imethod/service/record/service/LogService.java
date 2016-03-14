package com.imethod.service.record.service;

import com.imethod.service.record.dao.LogDao;
import com.imethod.service.record.domain.LoginRecord;
import com.imethod.service.record.domain.VisitRecord;
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
