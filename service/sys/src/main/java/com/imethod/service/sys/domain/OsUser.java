package com.imethod.service.sys.domain;


import com.imethod.core.bean.base.BasicEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class OsUser extends BasicEntity {

    private static final long serialVersionUID = -855376119682550600L;
    private Long osUserId;
    private Long userId;
    private String password;


    @Id
    @Column(name = "os_user_id")
    public Long getOsUserId() {
        return osUserId;
    }

    public void setOsUserId(Long osUserId) {
        this.osUserId = osUserId;
    }

    @Basic
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
