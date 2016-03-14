package com.imethod.service.sys.service;

import com.imethod.core.bean.PageMaker;
import com.imethod.core.util.ListTools;
import com.imethod.service.sys.dao.PermissionDao;
import com.imethod.service.sys.domain.Menu;
import com.imethod.service.sys.domain.OsTicket;
import com.imethod.service.sys.domain.OsUser;
import com.imethod.service.sys.domain.Rule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * time : 15/11/14.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Service
public class PermissionService {

    @Autowired
    private PermissionDao permissionDao;

    /**
     * 获取用户所有权限 rule 对象
     *
     * @param userId
     */
    public List<Map<String, Object>> getUserRule(Long userId, Integer menuType) {
        return permissionDao.getUserRule(userId, menuType);
    }

    /**
     * 获取用户所有权限
     *
     * @param userId
     */
    public List<String> getUserRuleStr(Long userId, String ruleType) {
        return new ArrayList<>();
    }

    public List<Map<String, Object>> getUserMenu(Long userId) {
        List<Map<String, Object>> rule = getUserRule(userId, 1);
        return ListTools.buildTree(rule, "menuId", "menuPid", "childMenu");
    }

    public PageMaker getOsUser(String query, Long pageIndex, Long pageSize) {
        return permissionDao.getOsUser(query, pageIndex, pageSize);
    }

    public PageMaker getUnOsUser(String query, Long pageIndex, Long pageSize) {
        return permissionDao.getUnOsUser(query, pageIndex, pageSize);
    }

    public OsUser insert(OsUser osUser) {
        return permissionDao.insert(osUser);
    }

    public List<Menu> queryMenuList() {
        return permissionDao.queryMenuList();
    }

    public void saveUserMenu(Long userId, List<Long> menuList) {
        permissionDao.deleteUserMenu(userId);
        for (Long menuId : menuList) {
            Rule rule = new Rule();
            rule.setUserId(userId);
            rule.setState(1);
            rule.setMenuId(menuId);
            permissionDao.insert(rule);
        }
    }

    public OsTicket saveTicket(OsTicket osTicket) {
        return permissionDao.insert(osTicket);
    }

    public void deleteTicket(String user_ticket) {
        permissionDao.deleteTicket(user_ticket);
    }

    public OsTicket queryTicket(String userTicket) {
        return permissionDao.queryTicket(userTicket);
    }
}
