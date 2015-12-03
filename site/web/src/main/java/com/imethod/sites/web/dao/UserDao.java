package com.imethod.sites.web.dao;

import com.imethod.core.jdbc.PageMaker;
import com.imethod.core.util.StringTools;
import com.imethod.sites.web.domain.User;
import com.imethod.sites.web.sys.IBaseDao;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 * time : 15/11/13.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Repository
public class UserDao extends IBaseDao {


    public User loadById(Long userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("user_id", userId);
        User user = null;
        try {
            user = load(User.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return user;
    }

    String SQL_LIST_USER = "select * from user where state = 1 ";

    public PageMaker listUser(String query, Long pageIndex, Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        StringBuffer buffer = new StringBuffer();
        buffer.append(SQL_LIST_USER);
        if (StringTools.isNotEmpty(query)) {
            buffer.append(" and ( user_name like :query or mobile like :query or email like :query) ");
            map.put("query", getISqlHelp().like(query));
        }

        return this.queryPageList(buffer.toString(), pageIndex, pageSize, map);
    }

    public PageMaker listOrgUser(String orgId, String query, Long pageIndex, Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        StringBuffer buffer = new StringBuffer();
        buffer.append(SQL_LIST_USER).append(" and org_id=:orgId ");
        map.put("orgId", orgId);
        if (StringTools.isNotEmpty(query)) {
            buffer.append(" and ( user_name like :query or mobile like :query or email like :query) ");
            map.put("query", getISqlHelp().like(query));
        }
        return this.queryPageList(buffer.toString(), pageIndex, pageSize, map);
    }
}
