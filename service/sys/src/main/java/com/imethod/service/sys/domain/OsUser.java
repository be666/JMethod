package com.imethod.service.sys.domain;



import com.imethod.core.bean.base.BasicEntity;

import javax.persistence.*;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 * 1.
 */
@Entity
@Table(name = "os_user")
public class OsUser extends BasicEntity {
    private static final long serialVersionUID = 8745717622447652338L;
    private Long OsUserId;
    private Long userId;
    private String password;

    @Id
    @Column(name = "os_user_id", nullable = false)
    public Long getOsUserId() {
        return OsUserId;
    }

    public void setOsUserId(Long osUserId) {
        OsUserId = osUserId;
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
    @Column(name = "password", nullable = true, length = 45)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
