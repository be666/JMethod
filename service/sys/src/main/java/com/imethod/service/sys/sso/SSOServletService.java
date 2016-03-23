package com.imethod.service.sys.sso;

import com.imethod.core.util.IdentitieTools;
import com.imethod.service.record.domain.LoginRecord;
import com.imethod.service.record.service.LoginRecordService;
import com.imethod.service.sys.domain.OsTicket;
import com.imethod.service.sys.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 * 1.
 */
@Service
public class SSOServletService implements SSOService {

    private static final String USER_TICKET = "USER_TICKET";

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private LoginRecordService loginRecordService;

    @Override
    public boolean login(HttpServletRequest request, Long userId) {
        String user_ticket = IdentitieTools.uuid2();
        request.getSession().setAttribute("USER_TICKET", user_ticket);
        OsTicket osTicket = new OsTicket();
        osTicket.setUserId(userId);
        osTicket.setTicketInfo(user_ticket);
        osTicket.setState(1);
        permissionService.saveTicket(osTicket);
        LoginRecord loginRecord = new LoginRecord();
        loginRecord.setUserId(userId);
        loginRecord.setIp(request.getRemoteAddr());
        loginRecordService.insert(loginRecord);
        request.getServletContext().setAttribute("USER_TICKET_" + user_ticket, osTicket);
        return true;
    }

    @Override
    public boolean logout(HttpServletRequest request) {
        Object USER_TICKET = request.getSession().getAttribute("USER_TICKET");
        if (USER_TICKET != null) {
            String user_ticket = (String) USER_TICKET;
            permissionService.deleteTicket(user_ticket);
            request.getServletContext().setAttribute("USER_TICKET_" + user_ticket, null);
            request.getSession().setAttribute("USER_TICKET", null);
        }
        return false;
    }

    @Override
    public Long getUserId(HttpServletRequest request) {
        Object USER_TICKET = request.getSession().getAttribute("USER_TICKET");
        if (USER_TICKET != null) {
            String user_ticket = (String) USER_TICKET;
            Object osTicket = request.getServletContext().getAttribute("USER_TICKET_" + user_ticket);
            if (osTicket == null) {
                osTicket = permissionService.queryTicket(user_ticket);
            }
            if (osTicket != null) {
                return ((OsTicket) osTicket).getUserId();
            }
        }
        return null;
    }
}
