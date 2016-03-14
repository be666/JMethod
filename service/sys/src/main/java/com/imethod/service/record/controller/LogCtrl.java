package com.imethod.service.record.controller;

import com.imethod.service.record.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * auth : iMethod
 * create_at:  15/12/1.
 * desc:
 * note:
 *  1.
 */
@Controller
public class LogCtrl {

    @Autowired
    private LogService logService;
}
