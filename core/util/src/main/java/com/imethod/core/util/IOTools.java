package com.imethod.core.util;

import org.apache.commons.io.IOUtils;

import java.io.InputStream;

/**
 * time : 15/11/8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class IOTools {
    public static void closeQuietly(InputStream in) {
        IOUtils.closeQuietly(in);
    }
}
