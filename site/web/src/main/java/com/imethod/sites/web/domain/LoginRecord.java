package com.imethod.sites.web.domain;


import com.imethod.sites.web.domain.base.BasicEntity;

import javax.persistence.*;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 *  1.
 */
@Entity
@Table(name = "login_record")
public class LoginRecord extends BasicEntity {
    private static final long serialVersionUID = -9023797421894961643L;
    private Long loginId;
    private Long userId;
    private String ip;

    @Id
    @Column(name = "login_id", nullable = false)
    public Long getLoginId() {
        return loginId;
    }

    public void setLoginId(Long loginId) {
        this.loginId = loginId;
    }

    @Basic
    @Column(name = "user_id", nullable = true)
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "ip", nullable = true, length = 45)
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
}
