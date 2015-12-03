package com.imethod.sites.web.domain;


import com.imethod.sites.web.domain.base.BasicEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * time : 15/11/14.
 * auth : iMethod
 * desc :
 * tips :
 * 1.
 */
@Entity
public class Menu extends BasicEntity {
    private static final long serialVersionUID = -6363174120526501580L;
    private Long menuId;
    private String menuName;
    private Integer menuType;
    private Integer menuPid;
    private String content;
    private Integer state;

    @Id
    @Column(name = "menu_id", nullable = false, insertable = true, updatable = true)
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_name", nullable = true, insertable = true, updatable = true, length = 45)
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    @Basic
    @Column(name = "menu_type", nullable = true, insertable = true, updatable = true)
    public Integer getMenuType() {
        return menuType;
    }

    public void setMenuType(Integer menuType) {
        this.menuType = menuType;
    }

    @Basic
    @Column(name = "menu_pid", nullable = true, insertable = true, updatable = true)
    public Integer getMeunPid() {
        return menuPid;
    }

    public void setMeunPid(Integer menuPid) {
        this.menuPid = menuPid;
    }

    @Basic
    @Column(name = "content", nullable = true, insertable = true, updatable = true)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "state", nullable = true, insertable = true, updatable = true)
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

}
