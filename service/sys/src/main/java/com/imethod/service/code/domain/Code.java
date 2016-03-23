package com.imethod.service.code.domain;


import com.imethod.core.bean.base.BasicEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Code extends BasicEntity {

    private static final long serialVersionUID = -135695253643789310L;
    private Long codeId;
    private String codeType;
    private Integer levelType;
    private Integer code;
    private String codeName;
    private Long parentId;
    private String codeEnName;


    @Id
    @Column(name = "code_id")
    public Long getCodeId() {
        return codeId;
    }

    public void setCodeId(Long codeId) {
        this.codeId = codeId;
    }

    @Basic
    @Column(name = "code_type")
    public String getCodeType() {
        return codeType;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType;
    }

    @Basic
    @Column(name = "level_type")
    public Integer getLevelType() {
        return levelType;
    }

    public void setLevelType(Integer levelType) {
        this.levelType = levelType;
    }

    @Basic
    @Column(name = "code")
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Basic
    @Column(name = "code_name")
    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    @Basic
    @Column(name = "parent_id")
    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    @Basic
    @Column(name = "code_en_name")
    public String getCodeEnName() {
        return codeEnName;
    }

    public void setCodeEnName(String codeEnName) {
        this.codeEnName = codeEnName;
    }

}
