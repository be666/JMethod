package com.imethod.core.jdbc.mine.pojo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>Title:实体 注解</p>
 * <p>Description: table</p>
 * <p>Copyright: Copyright (c) 2015</p>
 * <p>Company: imethod</p>
 * <p>Start Date: 2015-7-7</p>
 * <p>End Date:   2015-7-7</p>
 *
 * @author bqxu
 * @version 1.0
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ITable {

    /**
     * 表名  没有 则 取类名
     * 例如： ClassName：TestTable －> test_table
     * 自动类名转表规则： 将 大写转为 "_" +小写 进行 拼接 (第一个 字母大写忽略)
     *
     * @return
     */
    String value() default "";

    String comment() default "";
}
