package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.MenuDao;
import com.imethod.service.sys.domain.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class MenuService {


    Logger logger = LoggerFactory.getLogger(MenuService.class);


    @Autowired
    private MenuDao menuDao;


    public void insert(Menu menu) {
        menuDao.insert(menu);
    }


    public void update(Menu menu) {
        try {
            menuDao.update(menu);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return menuDao.list(pageIndex, pageSize);
    }


    public Menu loadById(Long menuId) {
        return menuDao.loadById(menuId);
    }


}