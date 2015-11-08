package com.imethod.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * serialize object
 * 
 * @author vitem
 * @date 2015年10月21日
 */
public class SerializeTools {

    public static String serialize(Object object) {
        ObjectOutputStream oos = null;
        ByteArrayOutputStream baos = null;
        try {
            baos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(baos);
            oos.writeObject(object);
            byte[] bytes = baos.toByteArray();
            return bytes.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            FileTools.closeStream(oos);
            FileTools.closeStream(baos);
        }
        return null;
    }

    public static Object unserialize(String info) {
        if (info == null) return null;
        byte[] bytes = info.getBytes();
        ByteArrayInputStream bais = null;
        ObjectInputStream ois = null;
        try {
            bais = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bais);
            return ois.readObject();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            FileTools.closeStream(bais);
            FileTools.closeStream(ois);
        }
        return null;
    }
    
}
