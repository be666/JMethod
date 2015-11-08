package com.imethod.module.client.rest;

import com.imethod.core.page.IPage;

import java.util.Map;

/**
 * time : 15/11/8.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class RestResult<T> {

    String message;
    String stateCode;
    Object result;
    IPage page;
    Map<String, Object> request;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public T getResult() {
        return (T) result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public IPage getPage() {
        return page;
    }

    public void setPage(IPage page) {
        this.page = page;
    }

    public Map<String, Object> getRequest() {
        return request;
    }

    public void setRequest(Map<String, Object> request) {
        this.request = request;
    }
}
