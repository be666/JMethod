package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.OsUser;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class OsUserDao extends IBaseDao {


    public OsUser loadById(Long osUserId) {
        Map<String, Object> map = new HashMap<>();
        map.put("os_user_id", osUserId);
        OsUser osUser = null;
        try {
            osUser = load(OsUser.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return osUser;
    }


    String SQL_LIST_OSUSER = "select * from os_user where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_OSUSER, pageIndex, pageSize, new HashMap<>());
    }


}