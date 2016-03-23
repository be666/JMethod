package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.Region;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class RegionDao extends IBaseDao {


    public Region loadById(Long regionId) {
        Map<String, Object> map = new HashMap<>();
        map.put("region_id", regionId);
        Region region = null;
        try {
            region = load(Region.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return region;
    }


    String SQL_LIST_REGION = "select * from region where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_REGION, pageIndex, pageSize, new HashMap<>());
    }


}