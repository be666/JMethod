package com.imethod.sites.web.sys;

import com.imethod.core.jdbc.mine.IJdbcTempBaseSupport;
import com.imethod.core.jdbc.mine.ISqlHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

/**
 * auth : iMethod
 * create_at:  15/12/3.
 * desc:
 * note:
 * 1.
 */
public class IBaseDao extends IJdbcTempBaseSupport {

    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    private ISqlHelp iSqlHelp;


    @Override
    protected <T> void insertWarp(T object) {

    }

    @Override
    protected <T> void updateWarp(T object) {

    }

    public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
        return namedParameterJdbcTemplate;
    }

    protected ISqlHelp getISqlHelp() {
        return iSqlHelp;
    }

    public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    public void setiSqlHelp(ISqlHelp iSqlHelp) {
        this.iSqlHelp = iSqlHelp;
    }
}
