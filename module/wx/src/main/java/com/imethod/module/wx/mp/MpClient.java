package com.imethod.module.wx.mp;

import com.imethod.core.http.HttpTools;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

/**
 * auth : bqxu
 * create_at:  16/3/14.
 * desc:
 * note:
 * 1.
 */
public class MpClient {

    String accessToken = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}";

    public String accessToken(String appId, String appSecret) {
        return HttpTools.HttpGet(accessToken);
    }
}
