package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.RegionDao;
import com.imethod.service.sys.domain.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class RegionService {


    Logger logger = LoggerFactory.getLogger(RegionService.class);


    @Autowired
    private RegionDao regionDao;


    public void insert(Region region) {
        regionDao.insert(region);
    }


    public void update(Region region) {
        try {
            regionDao.update(region);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return regionDao.list(pageIndex, pageSize);
    }


    public Region loadById(Long regionId) {
        return regionDao.loadById(regionId);
    }


}