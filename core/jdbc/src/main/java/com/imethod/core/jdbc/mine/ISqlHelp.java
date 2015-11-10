package com.imethod.core.jdbc.mine;

/**
 * Created by bcaring on 15/7/11.
 */
public abstract class ISqlHelp {

    public abstract String getPageSql(String sql, Long pageStart, Long pageSize);

    public abstract String nvl(String column, String nvlVal);

    public abstract String like(String column);

    public abstract String likeStart(String column);

    public abstract String likeEnd(String column);
}
