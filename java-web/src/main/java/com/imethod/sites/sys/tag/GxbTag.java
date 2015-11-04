package com.imethod.sites.sys.tag;

import com.imethod.sites.sys.json.JSONObj;

/**
 * time : 15/10/24.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class GxbTag {

    public static String toJSONlLine(Object obj) {
        //toJson
        String str = JSONObj.toJSONStr(obj);
        //inline
        str = str.replaceAll("[\r\n]+", "");
        //clear js undefined

        return str;
    }
}
