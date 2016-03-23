package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.Menu;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class MenuDao extends IBaseDao {


    public Menu loadById(Long menuId) {
        Map<String, Object> map = new HashMap<>();
        map.put("menu_id", menuId);
        Menu menu = null;
        try {
            menu = load(Menu.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return menu;
    }


    String SQL_LIST_MENU = "select * from menu where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_MENU, pageIndex, pageSize, new HashMap<>());
    }


}