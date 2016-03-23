package com.imethod.service.record.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.record.domain.LogRecord;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class LogRecordDao extends IBaseDao {


    public LogRecord loadById(Long logId) {
        Map<String, Object> map = new HashMap<>();
        map.put("log_id", logId);
        LogRecord logRecord = null;
        try {
            logRecord = load(LogRecord.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return logRecord;
    }


    String SQL_LIST_LOGRECORD = "select * from log_record where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_LOGRECORD, pageIndex, pageSize, new HashMap<>());
    }


}