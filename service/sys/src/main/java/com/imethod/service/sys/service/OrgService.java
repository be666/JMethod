package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.OrgDao;
import com.imethod.service.sys.domain.Org;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class OrgService {


    Logger logger = LoggerFactory.getLogger(OrgService.class);


    @Autowired
    private OrgDao orgDao;


    public void insert(Org org) {
        orgDao.insert(org);
    }


    public void update(Org org) {
        try {
            orgDao.update(org);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return orgDao.list(pageIndex, pageSize);
    }


    public Org loadById(Long orgId) {
        return orgDao.loadById(orgId);
    }


}