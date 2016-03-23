package com.imethod.service.record.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.record.dao.VisitRecordDao;
import com.imethod.service.record.domain.VisitRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class VisitRecordService {


    Logger logger = LoggerFactory.getLogger(VisitRecordService.class);


    @Autowired
    private VisitRecordDao visitRecordDao;


    public void insert(VisitRecord visitRecord) {
        visitRecordDao.insert(visitRecord);
    }


    public void update(VisitRecord visitRecord) {
        try {
            visitRecordDao.update(visitRecord);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return visitRecordDao.list(pageIndex, pageSize);
    }


    public VisitRecord loadById(Long visitRecordId) {
        return visitRecordDao.loadById(visitRecordId);
    }


}