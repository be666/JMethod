package com.imethod.service.record.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.record.dao.LogRecordDao;
import com.imethod.service.record.domain.LogRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class LogRecordService {


    Logger logger = LoggerFactory.getLogger(LogRecordService.class);


    @Autowired
    private LogRecordDao logRecordDao;


    public void insert(LogRecord logRecord) {
        logRecordDao.insert(logRecord);
    }


    public void update(LogRecord logRecord) {
        try {
            logRecordDao.update(logRecord);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return logRecordDao.list(pageIndex, pageSize);
    }


    public LogRecord loadById(Long logId) {
        return logRecordDao.loadById(logId);
    }


}