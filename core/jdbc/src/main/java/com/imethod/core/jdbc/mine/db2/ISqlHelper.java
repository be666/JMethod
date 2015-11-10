package com.imethod.core.jdbc.mine.db2;

import com.imethod.core.jdbc.mine.ISqlHelp;

/**
 *  auth : bqxu
 *  time : 15/7/11
 *  desc :
 */
public class ISqlHelper extends ISqlHelp {

    private static String querySeqTemplate = "select nextval for SEQ_tableName as generator from SYSIBM.SYSDUMMY1";

    private static String pageTemplate = "select pageOuter.* from (\n" +
            "select pageInner.*,rownumber() over() as rowId from (\n" +
            "{selects}" +
            ") pageInner" +
            ") pageOuter where pageOuter.rowId >={pageStart} and  pageOuter.rowId <= {pageEnd}";


    private static String nvlTemplate = "nvl({column},{nvlVal})";

    public String getPageSql(String selects, Long pageStart, Long pageSize) {
      	Long pageEnd = pageStart + pageSize;
      	pageStart=pageStart+1;
        return pageTemplate.replace("{pageStart}", String.valueOf(pageStart))
                .replace("{pageEnd}", String.valueOf(pageEnd))
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
}
