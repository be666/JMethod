package com.imethod.core.jdbc.mine;

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
