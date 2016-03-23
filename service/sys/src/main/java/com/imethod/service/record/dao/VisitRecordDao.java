package com.imethod.service.record.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.record.domain.VisitRecord;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class VisitRecordDao extends IBaseDao {


    public VisitRecord loadById(Long visitRecordId) {
        Map<String, Object> map = new HashMap<>();
        map.put("visit_record_id", visitRecordId);
        VisitRecord visitRecord = null;
        try {
            visitRecord = load(VisitRecord.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return visitRecord;
    }


    String SQL_LIST_VISITRECORD = "select * from visit_record where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_VISITRECORD, pageIndex, pageSize, new HashMap<>());
    }


}