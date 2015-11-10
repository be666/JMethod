package com.imethod.module.client.rest;

import com.imethod.core.log.Logger;
import com.imethod.core.log.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * time : 15/10/21.
 * auth :
 * desc :
 * tips :
 * 1.
 */
public abstract class RestClient<T> {

    private static final Logger logger = LoggerFactory.getLogger(RestClient.class);
    private RestTemplate restTemplate = new RestTemplate();

    public abstract String resolve(String url);

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    protected <T> RestResult<T> get(String url, Class<T> responseType) {
        RestResult<T> obj = null;
        try {
            obj = restTemplate.getForObject(resolve(url), obj.getClass());
            if (obj == null) {
                throw new ApiException();
            }
            return obj;
        } catch (Exception e) {
            throw new ApiException(e);
        }
    }

    protected RestResult<T> get(String url, Class<T> responseType, Object... urlVariables) {
        RestResult<T> obj = null;
        try {
            obj = restTemplate.getForObject(resolve(url), obj.getClass(), urlVariables);
            if (obj == null) {
                throw new ApiException();
            }
            return obj;
        } catch (Exception e) {
            throw new ApiException(e);
        }
    }

    protected <T> RestResult<T> getWhat(String url, Class<T> responseType) {
        RestResult<T> obj = null;
        try {
            obj = restTemplate.getForObject(resolve(url), obj.getClass());
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return obj;
    }

    protected <T> RestResult<T> getWhat(String url, Class<T> responseType, Object... urlVariables) {
        RestResult<T> obj = null;
        try {
            obj = restTemplate.getForObject(resolve(url), obj.getClass(), urlVariables);
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return obj;
    }

    protected boolean put(String url, Object request, Map<String, ?> urlVariables) {
        try {
            restTemplate.put(resolve(url), request, urlVariables);
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return true;
    }

    protected boolean put(String url, Object... urlVariables) {
        try {
            restTemplate.put(resolve(url), null, urlVariables);
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return true;
    }

    protected <T> RestResult<T> post(String url, Object request, Class<T> responseType) {
        RestResult<T> obj = null;
        try {
            return restTemplate.postForObject(resolve(url), request, obj.getClass());
        } catch (Exception e) {
            throw new ApiException(e);
        }
    }

    protected <T> RestResult<T> post(String url, Object request, Class<T> responseType, Object... urlVariables) {
        RestResult<T> obj = null;
        try {
            return restTemplate.postForObject(resolve(url), request, obj.getClass(), urlVariables);
        } catch (Exception e) {
            throw new ApiException(e);
        }
    }


    protected boolean delete(String url, Map<String, ?> urlVariables) {
        try {
            restTemplate.delete(resolve(url), urlVariables);
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return true;
    }

    protected boolean delete(String url) {
        try {
            restTemplate.delete(resolve(url));
        } catch (Exception e) {
            throw new ApiException(e);
        }
        return true;
    }


}
