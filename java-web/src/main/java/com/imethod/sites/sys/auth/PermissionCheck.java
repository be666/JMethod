package com.imethod.sites.sys.auth;

import java.lang.annotation.*;

/**
 * time : 15/10/22.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PermissionCheck {
    String value() default "true";
}
