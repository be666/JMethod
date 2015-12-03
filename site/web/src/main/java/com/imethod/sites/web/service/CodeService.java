package com.imethod.sites.web.service;

import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import com.imethod.core.util.DateTools;
import com.imethod.sites.web.constant.IConstants;
import com.imethod.sites.web.dao.CodeDao;
import com.imethod.sites.web.domain.Code;
import com.imethod.sites.web.vo.ReturnBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
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
@Service
public class CodeService {

    Logger logger = LoggerFactory.getLogger(CodeService.class);

    @Autowired
    private CodeDao codeDao;

    public Code insert(Code code) {
        return codeDao.insert(code);
    }

    public void update(Code code) {
        Date now = DateTools.getCurrentDateTime();
        Code codeDB = codeDao.loadById(code.getCodeId());
        codeDB.setCodeName(code.getCodeName());
        codeDB.setParentId(code.getParentId());
        codeDB.setLevelType(code.getLevelType());
        try {
            codeDao.update(code);
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.error(e.getMessage());
        }
    }

    public List<Code> listCodeByType(String codeType, Integer levelType, Integer parentId) {
        return codeDao.listCodeByType(codeType, levelType, parentId);
    }

    public List<Code> listCodeByType(String codeType) {
        return codeDao.listCodeByType(codeType, null, null);
    }

    public Map<Integer, Code> listCodeMap(String codeType) {
        List<Code> list = listCodeByType(codeType);
        Map<Integer, Code> map = new HashMap<>();
        for (Code code : list) {
            map.put(code.getCode(), code);
        }
        return map;
    }

    public ReturnBean delete(Long codeId) {

        ReturnBean returnBean = new ReturnBean();
        Code codeDB = codeDao.loadById(codeId);
        codeDB.setState(IConstants.STATE_FALSE);
        try {
            codeDao.update(codeDB);
        } catch (IllegalAccessException | InvocationTargetException e) {
            returnBean.setStatus(ReturnBean.FALSE);
            returnBean.setMsg("删除失败！");
        }
        return returnBean;
    }
}
