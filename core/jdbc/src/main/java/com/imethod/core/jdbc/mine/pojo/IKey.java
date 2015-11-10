package com.imethod.core.jdbc.mine.pojo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>Title:实体 注解</p>
 * <p>Description: 字段 注释</p>
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
public @interface IKey {


    /**
     * 注解 为true 时
     * <p/>
     * 在 插入过程 中 ，即时 该字段 为 null ，scope 不为 insert ，也会 调用 GENERATOR 生成 值插入
     *
     * @return
     */
    boolean pk() default false;

    /**
     * 说明  数据库字段名
     * 不复制的时候 取bo 字段 进行生成
     * 例如： Class Field：createTime －> create_time
     * 自动类名转表规则： 将 大写转为 "_" +小写 进行 拼接
     *
     * @return
     */
    String value() default "";

    /**
     * 字段作用域  （屏蔽字段 ） 有些字段 插入 修改，更新修改， 不需要被查询
     * 说明 ：
     * insert ： 在 insert  时 如果没有值 找 GENERATOR 自动生成
     * update ： 在 update  时 如果没有值 找 GENERATOR 自动生成
     * select ： 在 select 中现实
     *
     * @return
     */
    // value :insert update select all
    String[] scope() default {"select"};

    String comment() default "";

}
