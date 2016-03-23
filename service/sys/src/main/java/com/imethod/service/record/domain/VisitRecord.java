package com.imethod.service.record.domain;


import com.imethod.core.bean.base.BasicEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class VisitRecord extends BasicEntity {

    private static final long serialVersionUID = -252612987376970340L;
    private Long visitRecordId;
    private String visitUrl;
    private Long userId;


    @Id
    @Column(name = "visit_record_id")
    public Long getVisitRecordId() {
        return visitRecordId;
    }

    public void setVisitRecordId(Long visitRecordId) {
        this.visitRecordId = visitRecordId;
    }

    @Basic
    @Column(name = "visit_url")
    public String getVisitUrl() {
        return visitUrl;
    }

    public void setVisitUrl(String visitUrl) {
        this.visitUrl = visitUrl;
    }

    @Basic
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
