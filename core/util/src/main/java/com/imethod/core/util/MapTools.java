package com.imethod.core.util;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * time : 15/11/2.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class MapTools {

    /**
     * 将map 集合下map 对应 key 的value 格式化为字符串
     *
     * @param mapList map集合
     * @param key     key
     */
    public static void formatMapListStr(List<Map<String, Object>> mapList, String key) {
        if (mapList == null || key == null) {
            return;
        }
        Iterator<Map<String, Object>> mapIterator = mapList.iterator();
        Map<String, Object> objectMap;
        while (mapIterator.hasNext()) {
            objectMap = mapIterator.next();
            formatMapStr(objectMap, key);
        }
    }

    /**
     * 将map 对应 key 的value 格式化为字符串
     *
     * @param objectMap map
     * @param key       key
     */
    public static void formatMapStr(Map<String, Object> objectMap, String key) {
        if (objectMap == null || key == null) {
            return;
        }
        String keyValueStr = null;
        if (objectMap.get(key) != null) {
            Object keyValue = objectMap.get(key);
            if (String.class.isInstance(keyValue)) {
                keyValueStr = (String) keyValue;
            } else {
                keyValueStr = keyValue.toString();
            }
        }
        objectMap.put(key.concat("_str"), keyValueStr);
    }
}
