package com.imethod.service.code.domain;

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
public class Code extends BasicEntity {
    private static final long serialVersionUID = -4009117757820710358L;
    private Long codeId;
    private String codeType;
    private Integer levelType;
    private Integer code;
    private String codeName;
    private Integer parentId;
    private Integer state;
    private String codeEnName;

    @Id
    @Column(name = "code_id", nullable = false, insertable = true, updatable = true)
    public Long getCodeId() {
        return codeId;
    }

    public void setCodeId(Long codeId) {
        this.codeId = codeId;
    }

    @Basic
    @Column(name = "code_type", nullable = true, insertable = true, updatable = true, length = 20)
    public String getCodeType() {
        return codeType;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType;
    }

    @Basic
    @Column(name = "level_type", nullable = true, insertable = true, updatable = true)
    public Integer getLevelType() {
        return levelType;
    }

    public void setLevelType(Integer levelType) {
        this.levelType = levelType;
    }

    @Basic
    @Column(name = "code", nullable = true, insertable = true, updatable = true, length = 20)
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Basic
    @Column(name = "code_name", nullable = true, insertable = true, updatable = true, length = 100)
    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    @Basic
    @Column(name = "parent_id", nullable = true, insertable = true, updatable = true)
    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    @Basic
    @Column(name = "state", nullable = true, insertable = true, updatable = true)
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Basic
    @Column(name = "code_en_name", nullable = true, length = 100)
    public String getCodeEnName() {
        return codeEnName;
    }

    public void setCodeEnName(String codeEnName) {
        this.codeEnName = codeEnName;
    }
}
