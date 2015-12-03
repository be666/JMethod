package com.imethod.core.jdbc.mine.mysql;

import com.imethod.core.jdbc.mine.ISqlHelp;

/**
 * auth : iMethod
 * time : 15/7/11
 * desc :
 */
public class ISqlHelper extends ISqlHelp {

    private static String querySeqTemplate = "select nextval for seqName as generator from SYSIBM.SYSDUMMY1";

    private static String pageTemplate = "select pageSql.* from  (\n" +
            "{selects}" +
            ") pageSql limit {pageStart},{pageSize}";


    private static String nvlTemplate = "ifnull({column},{nvlVal})";

    public String getPageSql(String selects, Long pageStart, Long pageSize) {
        return pageTemplate.replace("{pageStart}", String.valueOf(pageStart))
                .replace("{pageSize}", String.valueOf(pageSize))
                .replace("{selects}", selects);
    }

    @Override
    public String nvl(String column, String nvlVal) {
        return nvlTemplate.replace("{column}", column).replace("{nvlVal}", nvlVal);
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
        return sql + " limit 1";
    }

}
