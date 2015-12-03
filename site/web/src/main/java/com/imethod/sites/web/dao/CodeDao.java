package com.imethod.sites.web.dao;

import com.imethod.core.util.ExceptionTools;
import com.imethod.core.util.StringTools;
import com.imethod.sites.web.domain.Code;
import com.imethod.sites.web.sys.IBaseDao;
import org.springframework.stereotype.Repository;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time : 15/11/13.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Repository
public class CodeDao extends IBaseDao {


    public Code loadById(Long codeId) {
        Map<String, Object> map = new HashMap<>();
        map.put("code_id", codeId);
        Code code = null;
        try {
            code = load(Code.class, map);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
            ExceptionTools.unchecked(e);
        }
        return code;
    }

    String SQL_LIST_CODE = "select * from code where code_type =:codeType and state = 1  ";

    public List<Code> listCodeByType(String codeType, Integer levelType, Integer parentId) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("codeType", codeType);
        StringBuffer sb = new StringBuffer();
        sb.append(SQL_LIST_CODE);
        if (StringTools.isNotEmpty(levelType)) {
            sb.append(" and level_type =:levelType ");
        }

        if (StringTools.isNotEmpty(parentId)) {
            sb.append(" and parent_id =:parentId ");
        }
        List<Code> list = this.queryForList(sb.toString(), paramMap, Code.class);
        return list;
    }
}
