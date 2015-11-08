package com.imethod.sites.web.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time : 15/10/15.
 * auth :
 * desc :
 * tips :
 * 1.
 */
@Controller
public class DemoCtrl {

    @RequestMapping("/mvc/goto/*")
    public String index(HttpServletRequest request) {
        String contextPath = request.getContextPath();
        return request.getRequestURI().substring((contextPath + ("/mvc/goto/")).length());
    }

    @RequestMapping(value = "/mvc/demo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> demo() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", "001");
        map.put("name", "demo");
        map.put("no", "007");
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        Map<String, String> params = new HashMap<String, String>();
        params.put("courseId", "0001");
        params.put("courseName", "0002");
        list.add(params);
        map.put("list", list);
        return map;
    }
}
