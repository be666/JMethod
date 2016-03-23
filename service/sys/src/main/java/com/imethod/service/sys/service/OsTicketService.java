package com.imethod.service.sys.service;


import com.imethod.core.bean.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.ExceptionTools;
import com.imethod.service.sys.dao.OsTicketDao;
import com.imethod.service.sys.domain.OsTicket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;


@Service
public class OsTicketService {


    Logger logger = LoggerFactory.getLogger(OsTicketService.class);


    @Autowired
    private OsTicketDao osTicketDao;


    public void insert(OsTicket osTicket) {
        osTicketDao.insert(osTicket);
    }


    public void update(OsTicket osTicket) {
        try {
            osTicketDao.update(osTicket);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
            ExceptionTools.unchecked(e);
        }
    }


    public PageMaker list(Long pageIndex, Long pageSize) {
        return osTicketDao.list(pageIndex, pageSize);
    }


    public OsTicket loadById(Long ticketId) {
        return osTicketDao.loadById(ticketId);
    }


}