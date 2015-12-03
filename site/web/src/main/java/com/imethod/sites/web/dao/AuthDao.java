package com.imethod.sites.web.dao;

import com.imethod.sites.web.domain.User;
import com.imethod.sites.web.sys.IBaseDao;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 * 1.
 */
@Repository
public class AuthDao extends IBaseDao {


    public User getLoginUser(String id, String password) {
        StringBuffer sql = new StringBuffer();
        sql.append("select u.* from os_user ou\n" +
                "join user u on u.user_id=ou.user_id\n" +
                "where (u.email=:id or u.user_name=:id) and ou.password=:password");
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("password", password);
        List<User> userList = queryForList(sql.toString(), map, User.class);
        if (userList.isEmpty()) {
            return null;
        }
        return userList.get(0);
    }


}
