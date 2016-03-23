package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.Rule;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class RuleDao extends IBaseDao {


    public Rule loadById(Long ruleId) {
        Map<String, Object> map = new HashMap<>();
        map.put("rule_id", ruleId);
        Rule rule = null;
        try {
            rule = load(Rule.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return rule;
    }


    String SQL_LIST_RULE = "select * from rule where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_RULE, pageIndex, pageSize, new HashMap<>());
    }


}