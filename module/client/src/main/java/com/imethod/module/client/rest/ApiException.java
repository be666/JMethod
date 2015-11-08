package com.imethod.module.client.rest;

import com.imethod.core.json.JSONObj;
import com.imethod.core.util.StringTools;
import org.springframework.web.client.HttpClientErrorException;

/**
 * time : 15/10/26.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public class ApiException extends RuntimeException {

    private RestResult restResult;

    private static String ERROR_UNDEFINED = "无效的请求数据";

    public RestResult getRestResult() {
        return restResult;
    }

    public void setRestResult(RestResult restResult) {
        this.restResult = restResult;
    }

    public ApiException(Exception e) {
        super(e);
        if (e instanceof HttpClientErrorException) {
            HttpClientErrorException errorException = (HttpClientErrorException) e;
            String str = errorException.getResponseBodyAsString();
            //what can i do;
            errorException.getStatusCode();
            restResult = new RestResult();
            JSONObj.fromObject(str).copyPropertiesTo(restResult);
        }

    }

    public ApiException(String errorCode) {
        super(errorCode);
    }

    public ApiException() {
        super(ERROR_UNDEFINED);
    }

    public String getMessage() {
        if (restResult != null && !StringTools.isEmpty(restResult.getMessage())) {
            return restResult.getMessage();
        }
        return super.getMessage();
    }
}
