package com.imethod.sites.web.controller;

import com.imethod.sites.web.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * auth : iMethod
 * time : 15/11/18
 * desc :
 */
@Controller
public class CodeCtrl {

    @Autowired
    private CodeService codeService;

    @RequestMapping("code")
    public String index(ModelMap modelMap) {
        String[] typeArr = new String[]{"currentStatus", "serviceType", "orgType", "schoolType", "courseType"};
        for (String str : typeArr) {
            modelMap.put(str, codeService.listCodeByType(str));
        }
        return "code";
    }

}
