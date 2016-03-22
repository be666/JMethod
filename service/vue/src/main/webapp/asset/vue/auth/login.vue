<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <i_header></i_header>
  <section>
    <div class='am-container'>
      <div class='am-u-md-6 am-u-sm-centered'>
        <h1>登陆</h1>
        <form class="am-form"
              data-am-validator="true"
              accept-charset="UTF-8"
              v-on:submit.prevent="login"
        >

          <div class='am-form-group'>
            <label for="userName">账号</label>
            <input class="am-radius" required="required" type="text" v-model="username" id="userName"/>
          </div>
          <div class='am-form-group'>
            <label for="passWord">密码</label>
            <input class="am-radius" required="required" type="password" v-model="password" id="passWord"/>
          </div>
          <div class='am-form-group'>
            <input type="submit" name="commit" value="登陆"
                   class="am-btn am-btn-block am-btn-primary am-radius"/>
          </div>
          <div class='am-form-group'>
            <input type="button" name="sign" value="注册" v-on:click="sign"
                   class="am-btn am-btn-block am-btn-primary am-radius"/>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<style lang='less'>
  .auth-keep {

  }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        username: null,
        password: null,
        autoLogin: null,
        app_token: null,
        url: null
      }
    },
    components: {
      'i_header': require("./header.vue")
    },
    created () {
      let search = window.location.search;
      while (search.startsWith("?")) {
        search = search.substring(1, search.length);
      }
      search = search.split("&");
      let query = {};
      for (let s of search) {
        s = s.split("=");
        query[s[0]] = decodeURIComponent(s[1]);
      }
      this.app_token = query.app_token || '';
      this.url = query.url || ''
    },
    methods: {
      login () {
        let $this = this;
        this.$http.post(this.$tools.resolveUrl("/AuthServers/login"), {
          username: this.username,
          password: this.password,
          app_token: this.app_token
        }, function (data, status, request) {
          let tokenInfo = data.tokenInfo;
          let authApp = data.authApp;
          window.location.href = this.$tools.resolveHost(authApp.siteUrl) + '/auth?tokenInfo=' + tokenInfo + '&url=' + encodeURIComponent(this.url);
        }).error(function (data, status, request) {
          $this.$dialog.error(data.error.message);
        })
      },
      sign(){
        window.location.href = this.$tools.resolveHost(this.siteUrl) + '/sign?app_token=' + encodeURIComponent(this.app_token) + '&url=' + encodeURIComponent(this.url);
      }
    },
    attached () {

    }
  }
</script>
