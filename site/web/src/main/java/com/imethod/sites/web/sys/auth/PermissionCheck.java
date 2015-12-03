package com.imethod.sites.web.sys.auth;

import java.lang.annotation.*;

/**
 * time : 15/11/14.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PermissionCheck {
    boolean value() default true;

    String menu() default "";
}
