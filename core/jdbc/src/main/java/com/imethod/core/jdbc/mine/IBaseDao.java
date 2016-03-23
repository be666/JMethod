package com.imethod.core.jdbc.mine;

import com.imethod.core.bean.base.BasicEntity;
import com.imethod.core.util.DateTools;
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
    protected <T extends BasicEntity> void insertWarp(T object) {
        if (object.getState() == null) {
            object.setState(1);
        }
        object.setCreateAt(DateTools.getCurrentDateTime());
    }

    @Override
    protected <T extends BasicEntity> void updateWarp(T object) {
        object.setUpdateAt(DateTools.getCurrentDateTime());
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
