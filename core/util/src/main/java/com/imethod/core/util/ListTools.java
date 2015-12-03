package com.imethod.core.util;

import java.util.*;

/**
 * time : 15/11/2.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class ListTools<T> {

    public static <T> T find(List<T> list, String key, Object value) {
        for (T obj : list) {
            if (BeanTools.equalProperty(obj, key, value)) {
                return obj;
            }
        }
        return null;
    }

    /**
     * map list key primary
     * <p/>
     * 将列表转换成树列表
     * 可以有多个根节点，根节点的父节点不能为null ，可以是任意孤立节点
     *
     * @param mapList  列表
     * @param key      节点id
     * @param pKey     父节点id
     * @param childKey 子列表名称
     * @return 树列表
     */
    public static List<Map<String, Object>> buildTree(List<Map<String, Object>> mapList, String key, String pKey, String childKey) {
        if (childKey == null) {
            childKey = "childNode";
        }
        Iterator<Map<String, Object>> mapIterator;
        Map<String, Object> map;
        mapIterator = mapList.iterator();
        List<Object> pKeyList = new ArrayList<>();
        List<Object> keyList = new ArrayList<>();
        List<Object> rootList = new ArrayList<>();
        while (mapIterator.hasNext()) {
            map = mapIterator.next();
            if (map.get(pKey) != null) {
                pKeyList.add(map.get(pKey));
            }
            if (map.get(key) != null) {
                keyList.add(map.get(key));
            }
        }
        Iterator<Object> objIterator = pKeyList.iterator();
        Object obj;
        while (objIterator.hasNext()) {
            obj = objIterator.next();
            if ((!keyList.contains(obj)) && (!rootList.contains(obj))) {
                rootList.add(obj);
            }
        }
        objIterator = rootList.iterator();
        List<Map<String, Object>> rList = new ArrayList<>();
        List<Map<String, Object>> innerList;
        while (objIterator.hasNext()) {
            obj = objIterator.next();
            innerList = getMapList(mapList, pKey, obj);
            if (innerList != null) {
                for (Map<String, Object> mapObj : innerList) {
                    if (mapObj != null) {
                        setMapChild(mapObj, mapList, key, pKey, childKey);
                        rList.add(mapObj);
                    }
                }
            }
        }

        return rList;
    }

    /**
     * 查找mapList 中，pKey对应value 为 mapObj中pKey对应value 的 map 列表
     * 并将匹配的map 列表  放入到mapObj 的 childKey 中
     *
     * @param mapObj   map对象
     * @param mapList  map列表
     * @param key      mapObj 中的key
     * @param pKey     mapList对应的pKey
     * @param childKey map对象中存放 匹配的map 列表 的属性
     */
    private static void setMapChild(Map<String, Object> mapObj, List<Map<String, Object>> mapList, String key, String pKey, String childKey) {
        if (mapObj == null || mapList == null || mapList.size() == 0) {
            return;
        }
        Object keyObj = mapObj.get(key);
        List<Map<String, Object>> childMaps = getMapList(mapList, pKey, keyObj);
        if (childMaps != null) {
            Iterator<Map<String, Object>> childIterator = childMaps.iterator();
            Map<String, Object> child;
            while (childIterator.hasNext()) {
                child = childIterator.next();
                setMapChild(child, mapList, key, pKey, childKey);
            }
            mapObj.put(childKey, childMaps);
        }
    }

    /**
     * 查找对应 key 所对应 为 obj 的 map ，匹配一个就返回
     *
     * @param mapList map列表
     * @param key     key值
     * @param obj     value值
     * @return 匹配的map  or null
     */
    private static Map<String, Object> getMap(List<Map<String, Object>> mapList, String key, Object obj) {
        Iterator<Map<String, Object>> mapIterator = mapList.iterator();
        Map<String, Object> map;
        while (mapIterator.hasNext()) {
            map = mapIterator.next();
            if (obj != null && obj.equals(map.get(key))) {
                return map;
            }
        }
        return null;
    }

    /**
     * 查找对应 key 所对应 为 obj 的 map ，匹配所有
     *
     * @param mapList map列表
     * @param key     key值
     * @param obj     value值
     * @return 匹配的map 列表 or null
     */
    private static List<Map<String, Object>> getMapList(List<Map<String, Object>> mapList, String key, Object obj) {
        Iterator<Map<String, Object>> mapIterator = mapList.iterator();
        Map<String, Object> map;
        List<Map<String, Object>> maps = new ArrayList<>();
        while (mapIterator.hasNext()) {
            map = mapIterator.next();
            if (obj != null && obj.equals(map.get(key))) {
                maps.add(map);
            }
        }
        return (maps.size() > 0) ? maps : null;
    }

    /**
     * 将list  转换为 map
     * 以传入的key在list 中 对应的value 为map的key ，value中存放 map
     * map 可以唯一 ，后值覆盖前值
     *
     * @param mapList 列表
     * @param key     map主键
     * @return 转换后的map
     */
    public static Map<Object, Object> buildMap(List<Map<String, Object>> mapList, String key) {
        if (mapList == null) {
            return null;
        }
        Iterator<Map<String, Object>> mapIterator = mapList.iterator();
        Map<String, Object> map;
        Map<Object, Object> maps = new HashMap<Object, Object>();
        while (mapIterator.hasNext()) {
            map = mapIterator.next();
            if (map.get(key) != null) {
                maps.put(map.get(key), map);
            }
        }
        return maps;
    }

}
