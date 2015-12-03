package com.imethod.core.json;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;

/**
 * time : 15/8/4.
 * auth : bqxu
 * desc :
 * tips :
 *   1.
 */
public class JSONArr {

    private static Logger logger = LoggerFactory.getLogger(JSONArr.class);
    private JSONArray jsonArray;

    public JSONArr() {
    }

    public JSONArr(JSONArray jsonArray) {
        this.jsonArray = jsonArray;
    }

    public static JSONArr fromObject(String obj) {
        JSONArr jsonArr = new JSONArr();
        if (obj == null) {
            return jsonArr;
        }
        try {
            JSONArray jsonArray = JSONArray.parseArray(obj);
            jsonArr.setJsonArray(jsonArray);
        } catch (JSONException e) {
            logger.warn("fromObject", e.getCause());
        }
        return jsonArr;
    }

    public JSONArray getJsonArray() {
        return jsonArray;
    }

    public void setJsonArray(JSONArray jsonArray) {
        this.jsonArray = jsonArray;
    }

    public int size() {
        if (jsonArray == null) {
            return 0;
        }
        return jsonArray.size();
    }

    public JSONObj getJSONObject(int index) {
        if (jsonArray == null) {
            return new JSONObj();
        }
        try {
            return new JSONObj(jsonArray.getJSONObject(index));
        } catch (JSONException e) {
            logger.warn("getJSONObject", e.getCause());
        }
        return new JSONObj();

    }

    public String getString(int index) {
        return getString(index, "");
    }

    public String getString(int index, String def) {
        if (jsonArray == null) {
            return def;
        }
        try {
            return jsonArray.getString(index);
        } catch (JSONException e) {
            logger.warn("getString", e.getCause());
        }
        return def;
    }


}
