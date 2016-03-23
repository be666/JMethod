package com.imethod.service.sys.dao;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.jdbc.mine.IBaseDao;
import com.imethod.service.sys.domain.OsTicket;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;


@Repository
public class OsTicketDao extends IBaseDao {


    public OsTicket loadById(Long ticketId) {
        Map<String, Object> map = new HashMap<>();
        map.put("ticket_id", ticketId);
        OsTicket osTicket = null;
        try {
            osTicket = load(OsTicket.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return osTicket;
    }


    String SQL_LIST_OSTICKET = "select * from os_ticket where state = 1 ";


    public PageMaker list(Long pageIndex, Long pageSize) {
        return this.queryPageList(SQL_LIST_OSTICKET, pageIndex, pageSize, new HashMap<>());
    }


}