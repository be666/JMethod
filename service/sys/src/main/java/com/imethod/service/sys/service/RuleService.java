package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.RuleDao;
import com.imethod.service.sys.domain.Rule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class RuleService {


    Logger logger = LoggerFactory.getLogger(RuleService.class);


    @Autowired
    private RuleDao ruleDao;


    public void insert(Rule rule) {
        ruleDao.insert(rule);
    }


    public void update(Rule rule) {
        try {
            ruleDao.update(rule);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return ruleDao.list(pageIndex, pageSize);
    }


    public Rule loadById(Long ruleId) {
        return ruleDao.loadById(ruleId);
    }


}