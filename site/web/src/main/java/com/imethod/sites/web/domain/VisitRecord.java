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
@Table(name = "visit_record")
public class VisitRecord extends BasicEntity {
    private static final long serialVersionUID = -3850045348989223747L;
    private Long visitRecordId;
    private Long userId;
    private String visitUrl;

    @Id
    @Column(name = "visit_record_id", nullable = false)
    public Long getVisitRecordId() {
        return visitRecordId;
    }

    public void setVisitRecordId(Long visitRecordId) {
        this.visitRecordId = visitRecordId;
    }

    @Basic
    @Column(name = "visit_url", nullable = true)
    public String getVisitUrl() {
        return visitUrl;
    }

    public void setVisitUrl(String visitUrl) {
        this.visitUrl = visitUrl;
    }

    @Basic
    @Column(name = "user_id", nullable = true)
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
