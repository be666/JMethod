package com.imethod.core.jdbc.mine;


import com.imethod.core.jdbc.PageMaker;
import com.imethod.core.jdbc.mine.pojo.IGenerator;
import com.imethod.core.jdbc.mine.pojo.IKey;
import com.imethod.core.jdbc.mine.pojo.ITable;
import com.imethod.core.jdbc.mine.seq.ISequenceInfo;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.BeanTools;
import com.imethod.core.util.StringTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Bcaring on 2015/6/2.
 */
public class IJdbcTempBaseDao extends NamedParameterJdbcDaoSupport {

    private static Logger logger = LoggerFactory.getLogger(IJdbcTempBaseDao.class);

    private static String insertTemplate = "insert into tableName({keys}) values({values})";
    private static String updateTemplate = "update tableName set {updates} where {wheres}";
    private static String selectTemplate = "select {selects} from tableName where {wheres}";
    private static String countTemplate = "select count(1) from ({selects}) countTable";

    public ISqlHelp iSqlHelp;

    @Autowired
    private IJDBCConfig ijdbcConfig;


    public void setiSqlHelp(ISqlHelp iSqlHelp) {
        this.iSqlHelp = iSqlHelp;
    }

    public int update(String sql, Map<String, Object> params) {
        return getNamedParameterJdbcTemplate().update(sql, params);
    }

    public Map<String, Object> queryForMap(String sql, Map<String, Object> params) {
        return getNamedParameterJdbcTemplate().queryForMap(sql, params);
    }

    public <T> List<T> queryForList(String sql, Map<String, Object> params, Class<T> clazz) {
        return getNamedParameterJdbcTemplate().queryForList(sql, params, clazz);
    }


    public <T> T load(String sql, Map<String, Object> params, Class<T> clazz) {
        return getNamedParameterJdbcTemplate().queryForObject(sql, params, clazz);
    }


    /* common utils*/
    public String nvl(String column, String nvlVal) {
        return iSqlHelp.nvl(column, nvlVal);
    }

    public String like(String column) {
        return iSqlHelp.like(column);
    }

    public String likeStart(String column) {
        return iSqlHelp.likeStart(column);
    }

    public String likeEnd(String column) {
        return iSqlHelp.likeEnd(column);
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
    public <T> T insert(T object) throws IllegalAccessException, InstantiationException {
        return insert(object, null);
    }

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
    private <T> T insert(T object, String tableName) throws IllegalAccessException, InstantiationException {
        Class clazz = object.getClass();
        Field[] allF = clazz.getDeclaredFields();
        Field[] allF2 = clazz.getFields();
        List<Field> fields = new ArrayList<Field>();
        for (Field field : allF) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }
        for (Field field : allF2) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }

        StringBuffer keyStr = new StringBuffer();
        StringBuffer valueStr = new StringBuffer();
        Map<String, Object> params = new HashMap<String, Object>();
        tableName = getTableName(clazz, tableName);
        List<String> selects = new ArrayList<String>();
        Map<String, Object> map = new HashMap<String, Object>();
        for (Field field : fields) {
            Boolean flag = field.isAccessible();
            if (!flag) {
                field.setAccessible(true);
            }
            IKey iKey = field.getAnnotation(IKey.class);
            if (iKey != null) {
                //存在 key
                String _key = getKey(object, field, iKey, "insert");
                if (_key.length() > 0) {
                    // 存在值 或者 必须 传值
                    if (field.get(object) != null) { //当前有值
                        keyStr.append(_key).append(",");
                        valueStr.append(":").append(_key).append(",");
                        params.put(_key, field.get(object));
                    } else {
                        //没有值 生成值
                        IGenerator bwGenerator = field.getAnnotation(IGenerator.class);
                        if (bwGenerator == null) {
                            logger.debug("=====generator==null===== :" + _key);
                            continue;
                        }
                        String sys = bwGenerator.sys();
                        if (sys != null && sys.length() > 0) { //优先
                            keyStr.append(_key).append(",");
                            valueStr.append(sys).append(",");
                        } else {
                            keyStr.append(_key).append(",");
                            valueStr.append(":").append(_key).append(",");
                            if (bwGenerator.value().equals("sequence")) {
                                params.put(_key, generateNextSequence(tableName));
                            } else {
                                params.put(_key, getGenerator(bwGenerator.value()));
                            }
                        }
                    }
                    if (iKey.pk()) {
                        map.put(_key, params.get(_key));
                    }
                }
                _key = getKey(object, field, iKey, "select");
                if (_key.length() > 0) {
                    selects.add(_key);
                }
            }
            if (!flag) {
                field.setAccessible(false);
            }
        }
        keyStr.setLength(keyStr.length() - 1);
        valueStr.setLength(valueStr.length() - 1);
        String sql = insertTemplate.replace("tableName", tableName)
                .replace("{keys}", keyStr)
                .replace("{values}", valueStr);
        logger.debug(sql);
        getNamedParameterJdbcTemplate().update(sql, params);
        if (map.size() == 0) {
            return object;
        }
        return (T) load(clazz, tableName, selects, map);
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
    public <T> T load(Class<T> clazz, Map<String, Object> whereValue) throws IllegalAccessException, InstantiationException {
        return load(clazz, null, null, whereValue);
    }

    /**
     * load 对象
     *
     * @param clazz
     * @param tableName
     * @param pk
     * @param whereValue
     * @param <T>
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public <T> T load(Class<T> clazz,
                      String tableName, List<String> pk, Map<String, Object> whereValue) throws IllegalAccessException, InstantiationException {
        Field[] allF = clazz.getDeclaredFields();
        Field[] allF2 = clazz.getFields();
        List<Field> fields = new ArrayList<Field>();
        for (Field field : allF) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }
        for (Field field : allF2) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }
        Map<String, Object> params = new HashMap<String, Object>();
        tableName = getTableName(clazz, tableName);
        StringBuffer wheres = new StringBuffer();
        StringBuffer selects = new StringBuffer();
        for (Field field : fields) {
            Boolean flag = field.isAccessible();
            if (!flag) {
                field.setAccessible(true);
            }
            IKey iKey = field.getAnnotation(IKey.class);
            if (iKey != null) {
                //存在 key
                String _key = getKey(null, field, iKey, "select");
                if (_key.length() > 0) {
                    selects.append(_key).append(",");
                    if (iKey.pk() || (pk != null && pk.contains(_key))) {
                        if (whereValue.get(_key) != null) {
                            if (wheres.length() > 0) {
                                wheres.append(" and ");
                            }
                            wheres.append(_key)
                                    .append("=:")
                                    .append(_key).append(" ");
                            params.put(_key, whereValue.get(_key));
                        }

                    }
                }
            }
            if (!flag) {
                field.setAccessible(false);
            }
        }
        selects.setLength(selects.length() - 1);

        String sql = selectTemplate.replace("tableName", tableName)
                .replace("{selects}", selects).replace("{wheres}", wheres);
        logger.debug(sql);

        List<Map<String, Object>> mapList = getNamedParameterJdbcTemplate().queryForList(sql, whereValue);
        Map<String, Object> objectMap = null;
        T obj = (T) clazz.newInstance();
        if (mapList.size() > 0) {
            objectMap = mapList.get(0);
        } else {
            return null;
        }
        for (Field field : fields) {
            Boolean flag = field.isAccessible();
            if (!flag) {
                field.setAccessible(true);
            }
            IKey iKey = field.getAnnotation(IKey.class);
            if (iKey != null) {
                //存在 key
                String _key = getKey(null, field, iKey, "select");
                if (_key.length() > 0) {
                    if (objectMap.get(_key) != null) {
                        Object fValue = objectMap.get(_key);
                        String type = field.getType().getName();
                        try {
                            BeanTools.setProperty(obj, field.getName(), fValue);
                        } catch (Exception e) {
                            logger.debug(e.getMessage(), e.getCause());
                            logger.debug("------------" + type + "-----------");
                        }

                    }
                }
            }
            if (!flag) {
                field.setAccessible(false);
            }
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
            T object) throws IllegalAccessException {
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
    public <T> void update(
            T object, String tableName, List<String> whereCase) throws IllegalAccessException {
        if (whereCase == null) {
            whereCase = new ArrayList<String>();
        }
        Class clazz = object.getClass();
        Field[] allF = clazz.getDeclaredFields();
        Field[] allF2 = clazz.getFields();
        List<Field> fields = new ArrayList<Field>();
        for (Field field : allF) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }
        for (Field field : allF2) {
            if (fields.contains(field)) {
                continue;
            }
            fields.add(field);
        }
        StringBuffer updates = new StringBuffer();
        StringBuffer wheres = new StringBuffer();
        Map<String, Object> params = new HashMap<String, Object>();
        for (Field field : fields) {
            Boolean flag = field.isAccessible();
            if (!flag) {
                field.setAccessible(true);
            }
            IKey iKey = field.getAnnotation(IKey.class);
            if (iKey != null) {
                //存在 key
                String _key = getKey(object, field, iKey, "update");
                if (_key.length() > 0) {
                    if (iKey.pk() || //更新模式下 ，有主键 自动为 where 条件
                            whereCase.contains(_key) //指定where 条件
                            ) {
                        if (wheres.length() > 0) {
                            wheres.append(" and ");
                        }
                        //where 条件 肯定 有值
                        wheres.append(_key)
                                .append("=:")
                                .append(_key).append(" ");
                        params.put(_key, field.get(object));
                    } else {
                        IGenerator generator = field.getAnnotation(IGenerator.class);
                        if (field.get(object) != null) { //当前有值
                            updates.append(_key)
                                    .append("=:")
                                    .append(_key).append(",");
                            params.put(_key, field.get(object));
                        } else if (generator != null) {  //没有值 生成值
                            String sys = generator.sys();
                            if (sys != null && sys.length() > 0) {  //sys 数据库函数
                                updates.append(_key)
                                        .append("=")
                                        .append(sys).append(",");
                            } else {
                                updates.append(_key)
                                        .append("=:")
                                        .append(_key).append(",");
                                //sequence
                                if (generator.value().equals("sequence")) {
                                    params.put(_key, generateNextSequence(tableName));
                                } else { //其他
                                    params.put(_key, getGenerator(generator.value()));
                                }
                            }
                        }
                    }
                }

            }
            if (!flag) {
                field.setAccessible(false);
            }
        }
        updates.setLength(updates.length() - 1);
        String sql = updateTemplate.replace("tableName", getTableName(clazz, tableName))
                .replace("{updates}", updates)
                .replace("{wheres}", wheres);
        logger.debug(sql);
        getNamedParameterJdbcTemplate().update(sql, params);
    }

    private static String getKey(Object object, Field field, IKey iKey, String request) throws IllegalAccessException {
        Object fieldValue = null;
        if (object != null) {
            fieldValue = field.get(object);
        }
        String keyValue = iKey.value();
        if (fieldValue != null || //存在值
                Arrays.binarySearch(iKey.scope(), request) > -1 || //必要  (当 fieldValue＝null 自动赋值 )
                Arrays.binarySearch(iKey.scope(), "all") > -1 || //必要 （当 fieldValue＝null 自动赋值）
                ("insert".equals(request) && iKey.pk()) ||
                ("select".equals(request) && iKey.pk()) //插入模式 且当前是 pk （当 fieldValue＝null 自动赋值）

                ) {
            if (keyValue != null && keyValue.trim().length() > 0) {
                return keyValue.trim();
            }
            String fName = field.getName();
            StringBuffer rk = new StringBuffer();
            for (int i = 0; i < fName.length(); i++) {
                String fb = fName.substring(i, i + 1);
                if (!fb.toLowerCase().equals(fb)) {
                    rk.append("_").append(fb.toLowerCase());
                } else {
                    rk.append(fb);
                }
            }
            return rk.toString();
        }
        return "";
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

        ITable bwTable = (ITable) clazz.getAnnotation(ITable.class);
        if (bwTable == null || bwTable.value().trim().length() == 0) {
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
        tableName = bwTable.value();
        String tableName1 = tableName;
        Pattern pattern = Pattern.compile("\\$\\{(\\w|\\.)*?\\}");
        Matcher matcher = pattern.matcher(tableName);
        while (matcher.find()) {
            String p = matcher.group();
            tableName1 = tableName1.replace(p, ijdbcConfig.getProperty(p.substring(2, p.length() - 1)));
        }
        return tableName1.toLowerCase().trim();
    }

    /**
     * 自动生成
     *
     * @param generator
     * @return
     */
    private static String getGenerator(String generator) {
        if ("uid".equals(generator)) {
            return UUID.randomUUID().toString();
        } else if ("timestamp".equals(generator)) {
            return String.valueOf(new Date().getTime());
        } else if (generator != null && generator.startsWith("dateFmt:")) {
            String fmt = generator.substring(8, generator.length()).trim();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(fmt);
            return simpleDateFormat.format(new Date());
        }
        return "";
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

        String sSql = iSqlHelp.getPageSql(sql, pageStart, pageSize);
        return new PageMaker(rowCount, pageIndex, pageSize, pageStart,
                queryForList(sSql, params));
    }


    public List<Map<String, Object>> queryForList(String sql, Map<String, Object> params) {
        List<Map<String, Object>> resultList = getNamedParameterJdbcTemplate().queryForList(sql, params);
        List<String> keyList;
        for (Map<String, Object> result : resultList) {
            Set<String> keySet = result.keySet();
            keyList = new ArrayList<String>();
            for (String key : keySet) {
                if (!getMapKey(key).equals(key)) {
                    keyList.add(key);
                }
            }
            for (String key : keyList) {
                BeanTools.setProperty(result, getMapKey(key), result.get(key));
            }

            Iterator iterator = result.keySet().iterator();
            while (iterator.hasNext()) {
                String key = (String) iterator.next();
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

    public void batchUpdate(String sql, Map[] params) {
        getNamedParameterJdbcTemplate().batchUpdate(sql, params);
    }

    public int update(String sql) {
        return getNamedParameterJdbcTemplate().update(sql, new HashMap<String, Object>());
    }

    public List<Map<String, Object>> queryForList(String sql) {
        return queryForList(sql, new HashMap<String, Object>());
    }


    private Map sequenceInfoMap = new HashMap();

    private int poolSize = 20;

    public synchronized void reloadSequence(String sequenceName) {
        if (sequenceName == null || sequenceName.trim().equals("")) {
            sequenceInfoMap = new HashMap();
        } else {
            sequenceInfoMap.remove(sequenceName);
        }


    }

    public synchronized String generateNextSequence(String sequenceName, boolean isFillLeftWithZero) {
        Long nextSequence = 0l;
        sequenceName = sequenceName.toLowerCase().trim();
        if (!sequenceInfoMap.containsKey(sequenceName)) {
            String selectStr = "select curr_sequence,sequence_width from " + ijdbcConfig.getTSysSequenceInfo() + " where sequence_name='"
                    + sequenceName + "'";
            List sequenceInfoList = queryForList(selectStr);
            if (sequenceInfoList.size() != 1) {
                throw new RuntimeException("Not exist sequence's name is '" + sequenceName + "' or more than one !");
            } else {

                Map sequenceInfoInDbMap = (Map) sequenceInfoList.get(0);
                Object _currSequence = sequenceInfoInDbMap.get("currSequence");
                Long tempCurrInCache = Long.parseLong(String.valueOf(_currSequence));
                Object _sequenceWidth = sequenceInfoInDbMap.get("sequenceWidth");
                Integer sequenceWidth = Integer.parseInt(String.valueOf(_sequenceWidth));

                String updateStr = "update " + ijdbcConfig.getTSysSequenceInfo()+ " set curr_sequence=curr_sequence+" + poolSize
                        + " where sequence_name='" + sequenceName + "'";
                update(updateStr);
                ISequenceInfo seqInfo = new ISequenceInfo(tempCurrInCache, tempCurrInCache + poolSize, sequenceWidth);
                sequenceInfoMap.put(sequenceName, seqInfo);
            }
        }
        ISequenceInfo seqInfo = (ISequenceInfo) sequenceInfoMap.get(sequenceName);
        Long maxInCache = seqInfo.getMaxInCache();

        Long currInCache = seqInfo.getCurrInCache();
        Integer sequenceWidth = seqInfo.getSequenceWidth();
        if (currInCache >= maxInCache) {
            String updateStr = "update " + ijdbcConfig.getTSysSequenceInfo() + " set curr_sequence=curr_sequence+" + poolSize
                    + " where sequence_name='" + sequenceName + "'";
            update(updateStr);
            seqInfo.setMaxInCache(seqInfo.getMaxInCache() + poolSize);

        }
        nextSequence = currInCache + 1;
        seqInfo.setCurrInCache(nextSequence);
        return isFillLeftWithZero ? (StringTools.repeat("0", sequenceWidth - String.valueOf(nextSequence).length()) + nextSequence) : String.valueOf(nextSequence);

    }

    public synchronized String generateNextSequence(String sequenceName) {
        return generateNextSequence(sequenceName, false);

    }


    public void fillSequence(String sequenceName, String[] detailIdArr) {
        for (int i = 0; i < detailIdArr.length; i++) {
            detailIdArr[i] = generateNextSequence(sequenceName);
        }

    }
}
