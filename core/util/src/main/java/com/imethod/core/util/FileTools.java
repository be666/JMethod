package com.imethod.core.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * 
 * 
 * @author vitem
 * @date 2015年10月21日
 */
public class FileTools {
	
    public static void closeStream(InputStream inputStream) {
        if (inputStream == null) return;
        try {
            inputStream.close();
        } catch (IOException e) {
        	ExceptionTools.unchecked(e);
        }
    }

    /**
     * 安全关闭输出流
     */
    public static void closeStream(OutputStream outputStream) {
        if (outputStream == null) return;
        try {
            outputStream.close();
        } catch (IOException e) {
        	ExceptionTools.unchecked(e);
        }
    }

    public static void copyInputStreamToFile(InputStream inputStream, File file) throws IOException {
        org.apache.commons.io.FileUtils.copyInputStreamToFile(inputStream, file);
    }

    public static void moveFile(File filePath, File dirPath) throws IOException {
        org.apache.commons.io.FileUtils.moveFile(filePath, dirPath);
    }


}
