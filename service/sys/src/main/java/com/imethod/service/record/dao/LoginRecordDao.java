package com.imethod.service.record.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.record.domain.LoginRecord;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class LoginRecordDao extends IBaseDao {


    public LoginRecord loadById(Long loginId) {
        Map<String, Object> map = new HashMap<>();
        map.put("login_id", loginId);
        LoginRecord loginRecord = null;
        try {
            loginRecord = load(LoginRecord.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return loginRecord;
    }


    String SQL_LIST_LOGINRECORD = "select * from login_record where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_LOGINRECORD, pageIndex, pageSize, new HashMap<>());
    }


}