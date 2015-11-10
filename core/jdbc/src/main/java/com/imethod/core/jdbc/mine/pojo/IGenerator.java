package com.imethod.core.jdbc.mine.pojo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>Title:实体 注解</p>
 * <p>Description: 自动生成器</p>
 * <p>Copyright: Copyright (c) 2015</p>
 * <p>Company: imethod</p>
 * <p>Start Date: 2015-7-7</p>
 * <p>End Date:   2015-7-7</p>
 *
 * @author bqxu
 * @version 1.0
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IGenerator {
    //value sequence uid timestamp

    /**
     * 规则：
     * sequence         数据库 sequence 暂定 SEQ_ + tableName
     * uid              uuid
     * timestamp        new Date().getTime()
     * dateFmt:XXXX      调用 XXXX 未 时间格式字符串， new Data 自动转格式
     *
     * @return
     */
    String value() default "";

    /**
     * 数据库 参数 函数 方法
     * 使用时 直接拼接入sql
     *
     * @return
     */
    String sys() default "";
}
