package com.imethod.service.sys.domain;



import com.imethod.core.bean.base.BasicEntity;

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
public class Rule extends BasicEntity {
    private static final long serialVersionUID = 8680787831107635768L;
    private Long ruleId;
    private Long menuId;
    private Long userId;
    private Integer state;

    @Id
    @Column(name = "rule_id", nullable = false, insertable = true, updatable = true)
    public Long getRuleId() {
        return ruleId;
    }

    public void setRuleId(Long ruleId) {
        this.ruleId = ruleId;
    }

    @Basic
    @Column(name = "menu_id", nullable = true, insertable = true, updatable = true)
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "user_id", nullable = true, insertable = true, updatable = true)
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
