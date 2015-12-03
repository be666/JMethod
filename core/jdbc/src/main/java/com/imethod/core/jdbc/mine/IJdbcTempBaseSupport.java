package com.imethod.core.jdbc.mine;


import com.imethod.core.jdbc.PageMaker;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.BeanTools;
import com.imethod.core.util.ExceptionTools;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

/**
 * auth : iMethod
 * create_at:  2015/6/2.
 * desc:
 * note:
 * 1.
 */
public abstract class IJdbcTempBaseSupport {

    private static Logger logger = LoggerFactory.getLogger(IJdbcTempBaseSupport.class);

    private static String insertTemplate = "insert into tableName({keys}) values({values})";
    private static String updateTemplate = "update tableName set {updates} where {wheres}";
    private static String loadTemplate = "select {selects} from tableName where {wheres}";
    private static String countTemplate = "select count(1) from ({selects}) countTable";

    public int update(String sql, Map<String, Object> params) {
        return getNamedParameterJdbcTemplate().update(sql, params);
    }

    public <T> List<T> queryForList(String sql, Map<String, Object> params, Class<T> clazz) {
        List<Map<String, Object>> mapList = queryForList(sql, params);
        List<T> tList = new ArrayList<>();
        T t;
        for (Map<String, Object> map : mapList) {
            try {
                t = clazz.newInstance();
                BeanTools.copyNotNullProperties(t, map);
                tList.add(t);
            } catch (InstantiationException | IllegalAccessException e) {
                ExceptionTools.unchecked(e);
            }

        }
        return tList;
    }

    public Map<String, Object> queryForMap(String sql, Map<String, Object> params) {
        return getNamedParameterJdbcTemplate().queryForMap(sql, params);
    }


    public <T> T load(String sql, Map<String, Object> params, Class<T> clazz) {
        return getNamedParameterJdbcTemplate().queryForObject(sql, params, clazz);
    }


    /* common utils*/
    public String nvl(String column, String nvlVal) {
        return getISqlHelp().nvl(column, nvlVal);
    }


    public String like(String column) {
        return getISqlHelp().like(column);
    }

    public String likeStart(String column) {
        return getISqlHelp().likeStart(column);
    }

    public String likeEnd(String column) {
        return getISqlHelp().likeEnd(column);
    }

    /*coustom*/

    /**
     * 插入实体
     *
     * @param object
     * @param <T>
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public <T> T insert(T object) {
        try {
            insertWarp(object);
            return insert(object, null);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            e.printStackTrace();
            ExceptionTools.unchecked(e);
        }
        return null;
    }

    protected abstract <T> void insertWarp(T object);

    protected abstract <T> void updateWarp(T object);

    /**
     * 插入实体 指定表名
     *
     * @param object
     * @param tableName
     * @param <T>
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    private <T> T insert(T object, String tableName) throws IllegalAccessException, InstantiationException, InvocationTargetException {
        Class clazz = object.getClass();
        Method[] methods = clazz.getMethods();
        StringBuffer keyStr = new StringBuffer();
        StringBuffer valueStr = new StringBuffer();
        Map<String, Object> params = new HashMap<String, Object>();
        Map<String, Object> where = new HashMap<>();
        String idKey = null;
        for (Method method : methods) {
            Column column = method.getAnnotation(Column.class);
            if (column != null) {
                //存在 key
                String _key = getKey(object, method, column, "insert");
                //存在 key
                if (_key != null) {
                    keyStr.append(_key).append(",");
                    valueStr.append(":").append(_key).append(",");
                    params.put(_key, method.invoke(object));
                }
                Id id = method.getAnnotation(Id.class);
//                _key = getKey(object, method, column, "select");
//                select
                if (id != null) {
                    if (method.invoke(object) == null) {
                        idKey = column.name();
                    }
                    where.put(column.name(), method.invoke(object));
                }

            }
        }
        keyStr.setLength(keyStr.length() - 1);
        valueStr.setLength(valueStr.length() - 1);
        String sql = insertTemplate.replace("tableName", getTableName(clazz, tableName))
                .replace("{keys}", keyStr)
                .replace("{values}", valueStr);
        logger.debug(sql);

        KeyHolder keyHolder = new GeneratedKeyHolder();
        getNamedParameterJdbcTemplate().update(sql, new MapSqlParameterSource(params), keyHolder);
        if (idKey != null) {
            where.put(idKey, keyHolder.getKey().intValue());
        }
        return (T) load(object.getClass(), where);
    }


    /**
     * load 对象
     *
     * @param clazz
     * @param whereValue
     * @param <T>
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public <T> T load(Class<T> clazz, Map<String, Object> whereValue) throws IllegalAccessException, InstantiationException, InvocationTargetException {
        return load(clazz, null, whereValue);
    }

    /**
     * load 对象
     *
     * @param clazz
     * @param tableName
     * @param idValue
     * @param <T>
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     * @throws InvocationTargetException
     */
    private <T> T load(Class<T> clazz,
                       String tableName, Map<String, Object> idValue) throws IllegalAccessException, InstantiationException, InvocationTargetException {
        Method[] methods = clazz.getMethods();
        tableName = getTableName(clazz, tableName);
        StringBuffer wheres = new StringBuffer();
        StringBuffer selects = new StringBuffer();
        for (Method method : methods) {
            Column column = method.getAnnotation(Column.class);
            if (column != null) {
                //存在 key
                String _key = getKey(null, method, column, "select");
                if (_key != null) {
                    selects.append(_key).append(",");
                    Id id = method.getAnnotation(Id.class);
                    if (id != null) {
                        if (idValue.get(_key) != null) {
                            if (wheres.length() > 0) {
                                wheres.append(" and ");
                            }
                            wheres.append(_key)
                                    .append("=:")
                                    .append(_key).append(" ");
                        }

                    }
                }
            }
        }
        selects.setLength(selects.length() - 1);

        String sql = loadTemplate.replace("tableName", getTableName(clazz, tableName))
                .replace("{selects}", selects).replace("{wheres}", wheres);
        logger.debug(sql);
        Map<String, Object> map = getNamedParameterJdbcTemplate().queryForMap(getISqlHelp().resoleLoadSql(sql), idValue);
        T obj = clazz.newInstance();
        for (String key : map.keySet()) {
            BeanTools.setProperty(obj, getMapKey(key), map.get(key));
        }
        return obj;
    }


    /**
     * 更新实体
     *
     * @param object
     * @param <T>
     * @throws IllegalAccessException
     */
    public <T> void update(
            T object) throws IllegalAccessException, InvocationTargetException {
        updateWarp(object);
        update(object, null, null);
    }

    /**
     * 更新实体
     *
     * @param object
     * @param tableName
     * @param whereCase
     * @param <T>
     * @throws IllegalAccessException
     */
    private <T> void update(
            T object, String tableName, List<String> whereCase) throws IllegalAccessException, InvocationTargetException {
        if (whereCase == null) {
            whereCase = new ArrayList<String>();
        }
        Class clazz = object.getClass();
        Method[] methods = clazz.getMethods();
        StringBuffer updates = new StringBuffer();
        StringBuffer wheres = new StringBuffer();
        Map<String, Object> params = new HashMap<String, Object>();
        for (Method method : methods) {
            Column column = method.getAnnotation(Column.class);
            if (column != null) {
                //存在 key
                String _key = getKey(object, method, column, "update");
                if (_key != null) {
                    Id id = method.getAnnotation(Id.class);
                    if (id != null || //更新模式下 ，有主键 自动为 where 条件
                            whereCase.contains(_key) //指定where 条件
                            ) {
                        if (wheres.length() > 0) {
                            wheres.append(" and ");
                        }
                        //where 条件 肯定 有值
                        wheres.append(_key)
                                .append("=:")
                                .append(_key).append(" ");
                        params.put(_key, method.invoke(object));
                    }
                    updates.append(_key)
                            .append("=:")
                            .append(_key).append(",");
                    params.put(_key, method.invoke(object));
                }


            }
        }
        updates.setLength(updates.length() == 0 ? 0 : updates.length() - 1);
        String sql = updateTemplate.replace("tableName", getTableName(clazz, tableName))
                .replace("{updates}", updates)
                .replace("{wheres}", wheres);
        logger.debug(sql);
        getNamedParameterJdbcTemplate().update(sql, params);
    }

    private static String getKey(Object object, Method method, Column column, String request) throws InvocationTargetException, IllegalAccessException {
        Object result = null;
        if (object != null) {
            result = method.invoke(object);
        }
        String cname = column.name();
        switch (request) {
            case "insert":
                if (column.nullable() || column.insertable() && result != null) {
                    return cname;
                }
                break;
            case "update":
                if (column.updatable() && result != null) {
                    return cname;
                }
                break;
            case "select":
                return cname;
        }
        return null;
    }


    /**
     * 获取表名
     *
     * @param clazz
     * @param tableName
     * @return
     */
    private String getTableName(Class clazz, String tableName) {
        if (tableName != null && tableName.trim().length() > 0) {
            return tableName.trim();
        }
        Table table = clazz.getClass().getAnnotation(Table.class);
        if (table != null) {
            return table.name();
        }
        String fName = clazz.getName();
        fName = fName.substring(fName.lastIndexOf(".") + 1, fName.length());
        StringBuffer rt = new StringBuffer();
        for (int i = 0; i < fName.length(); i++) {
            String fb = fName.substring(i, i + 1);
            if (i != 0 && !fb.toLowerCase().equals(fb)) {
                rt.append("_").append(fb.toLowerCase());
            } else {
                rt.append(fb.toLowerCase());
            }
        }
        return rt.toString();
    }


    public PageMaker queryPageList(String sql, Long pageIndex, Long pageSize, Map params) {
        String cSql = countTemplate.replace("{selects}", sql);
        Long rowCount = getNamedParameterJdbcTemplate().queryForObject(cSql, params, Long.class);
        if (pageIndex == null) {
            pageIndex = 1l;
        }
        if (pageSize == null) {
            pageSize = 10l;
        }
        if (pageSize < 1) {
            pageSize = rowCount;
        }
        Long pageStart = 0l;
        if (pageIndex > 1) {
            pageStart = (pageIndex - 1) * pageSize;
        }
        if (pageIndex == 0 || pageSize == 0) {
            pageIndex = 1l;
            pageSize = rowCount;
        }

        String sSql = getISqlHelp().getPageSql(sql, pageStart, pageSize);
        return new PageMaker(rowCount, pageIndex, pageSize, pageStart,
                queryForList(sSql, params));
    }


    public List<Map<String, Object>> queryForList(String sql, Map<String, Object> params) {
        List<Map<String, Object>> resultList = getNamedParameterJdbcTemplate().queryForList(sql, params);
        List<String> keyList;
        for (Map<String, Object> result : resultList) {
            Set<String> keySet = result.keySet();
            keyList = new ArrayList<>();
            for (String key : keySet) {
                if (!getMapKey(key).equals(key)) {
                    keyList.add(key);
                }
            }
            for (String key : keyList) {
                BeanTools.setProperty(result, getMapKey(key), result.get(key));
            }

            Iterator<String> iterator = result.keySet().iterator();
            while (iterator.hasNext()) {
                String key = iterator.next();
                if (keyList.contains(key)) {
                    iterator.remove();
                }
            }
        }
        return resultList;
    }

    public String getMapKey(String key) {
        StringBuffer rt = new StringBuffer();
        key = key.toLowerCase();
        String[] keyArr = key.split("_");
        rt.append(keyArr[0]);
        String kArr;
        if (keyArr.length > 1) {
            for (int i = 1; i < keyArr.length; i++) {
                kArr = keyArr[i];
                rt.append(kArr.substring(0, 1).toUpperCase()).append(kArr.substring(1));
            }
        }
        return rt.toString();
    }

    public int queryForInt(String sql, Map<String, Object> map) {
        Integer integer = getNamedParameterJdbcTemplate().queryForObject(sql, map, Integer.class);
        return integer == null ? 0 : integer;
    }


    public void batchUpdate(String sql, Map[] params) {
        getNamedParameterJdbcTemplate().batchUpdate(sql, params);
    }

    public int update(String sql) {
        return getNamedParameterJdbcTemplate().update(sql, new HashMap<String, Object>());
    }

    public List<Map<String, Object>> queryForList(String sql) {
        return queryForList(sql, new HashMap<String, Object>());
    }

    public abstract NamedParameterJdbcTemplate getNamedParameterJdbcTemplate();

    protected abstract ISqlHelp getISqlHelp();


}
