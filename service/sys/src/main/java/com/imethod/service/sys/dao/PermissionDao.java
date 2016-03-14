package com.imethod.service.sys.dao;

import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.core.util.StringTools;
import com.imethod.service.sys.domain.Menu;
import com.imethod.service.sys.domain.OsTicket;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time : 15/11/14.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Repository
public class PermissionDao extends IBaseDao {



    private static String ruleStr = "SELECT m.* FROM menu m\n" +
            "  join rule r on r.menu_id = m.menu_id\n" +
            "where r.user_id=:userId ";

    public List<Map<String, Object>> getUserRule(Long userId, Integer menuType) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        StringBuffer sb = new StringBuffer();
        sb.append(ruleStr);
        if (StringTools.isNotEmpty(menuType)) {
            sb.append(" and m.menu_type=:menuType ");
        }
        map.put("menuType", menuType);
        return queryForList(sb.toString(), map);
    }

    public PageMaker getOsUser(String query, Long pageIndex, Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT  ou.os_user_id,ou.user_id,u.user_name,u.user_code,u.email,u.mobile," +
                "u.org_id,o.org_name FROM os_user ou\n" +
                "join user u on u.user_id=ou.user_id\n" +
                "join org o on o.org_id=u.org_id\n" +
                "where 1=1");
        if (StringTools.isNotEmpty(query)) {
            map.put("query", getISqlHelp().like(query));
            sql.append(" and ( o.org_name like :query or u.user_name like :query )  ");
        }
        return queryPageList(sql.toString(), pageIndex, pageSize, map);
    }

    public PageMaker getUnOsUser(String query, Long pageIndex, Long pageSize) {
        Map<String, Object> map = new HashMap<>();
        StringBuffer sb = new StringBuffer();
        sb.append("select u.user_id,u.user_name,u.user_code,u.org_id,o.org_name,u.email,u.mobile\n" +
                "from user u\n" +
                "  join org o on o.org_id=u.org_id\n" +
                "where not exists(\n" +
                "  select o.user_id from os_user o\n" +
                "  where o.user_id=u.user_id\n" +
                ")\n");
        if (StringTools.isNotEmpty(query)) {
            sb.append(" and ( o.org_name like :query or u.user_name like :query )  ");
            map.put("query", getISqlHelp().like(query));
        }
        return queryPageList(sb.toString(), pageIndex, pageSize, map);

    }

    public List<Menu> queryMenuList() {
        return queryForList("select * from menu", null, Menu.class);
    }

    public void deleteUserMenu(Long userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        update("delete from rule where user_id = :userId", map);
    }

    public void deleteTicket(String user_ticket) {
        Map<String, Object> map = new HashMap<>();
        map.put("userTicket", user_ticket);
        update("update os_ticket set state=0 where ticket_info=:userTicket ", map);
    }

    public OsTicket queryTicket(String userTicket) {
        StringBuffer sql = new StringBuffer();
        sql.append("select * from os_ticket where ticket_info=:userTicket and state=1;");
        Map<String, Object> map = new HashMap<>();
        map.put("userTicket", userTicket);
        List<OsTicket> ticketList = queryForList(sql.toString(), map, OsTicket.class);
        if (ticketList.isEmpty()) {
            return null;
        }
        return ticketList.get(0);
    }
}
