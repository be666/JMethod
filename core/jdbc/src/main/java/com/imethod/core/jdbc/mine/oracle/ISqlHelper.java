package com.imethod.core.jdbc.mine.oracle;

import com.imethod.core.jdbc.mine.ISqlHelp;

/**
 * auth : bqxu
 * time : 15/7/11
 * desc :
 */
public class ISqlHelper extends ISqlHelp {


    public String getPageSql(String selects, Long pageStart, Long pageSize) {
        return null;
    }


    @Override
    public String nvl(String column, String nvlVal) {
        return null;
    }

    @Override
    public String like(String column) {
        return "%" + column + "%";
    }

    @Override
    public String likeStart(String column) {
        return column + "%";
    }

    @Override
    public String likeEnd(String column) {
        return "%" + column;
    }

    @Override
    public String resoleLoadSql(String sql) {
        return null;
    }
}
