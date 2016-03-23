package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.Org;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class OrgDao extends IBaseDao {


    public Org loadById(Long orgId) {
        Map<String, Object> map = new HashMap<>();
        map.put("org_id", orgId);
        Org org = null;
        try {
            org = load(Org.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return org;
    }


    String SQL_LIST_ORG = "select * from org where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_ORG, pageIndex, pageSize, new HashMap<>());
    }


}