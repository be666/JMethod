<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-container">
    <div class="am-g">
      <div class="am-u-md-6 am-u-sm-centered">
        <h1>
          注册
        </h1>
        <form class="am-form"
              v-on:submit.prevent="login"
              data-am-validator="true" id="new_user"
              novalidate="novalidate">
          <input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token"
                                                            value="k2nJX40VUZxdDCoIg5/I6/+flPecnIeeJl2eohmXDCvsgRVl8dbM41A3H+muTi6nFWtPtwWz/50W+4T5Q0G/AA==">
          <div class="am-form-group">
            <label for="user_email">邮箱</label>
            <input class="am-radius"
                   required="required" type="email"
                   name="user[email]" id="user_email"
                   v-model="userName"
                   pattern="^((([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$">
            <p class="am-form-help">此邮箱将作为您的登陆账号</p>
          </div>
          <div class="am-form-group">
            <label for="user_passWord">密码</label>
            <input class="am-radius"
                   v-model="passWord"
                   required="required" type="passWord" name="user[passWord]" id="user_passWord">
            <p class="am-form-help">请使用 8-16 位，由大写字母、小写字母、阿拉伯数字和特殊符号中至少 3 种组合而成的密码</p>
          </div>
          <div class="am-form-group">
            <label for="user_passWord_confirmation">确认密码</label>
            <input class="am-radius"
                   v-model="passWord2"
                   required="required" type="passWord" name="user[passWord_confirmation]"
                   id="user_passWord_confirmation">
          </div>
          <!-- <hr>
          <p class="am-text-sm">
          点击“注册帐号”按钮，表示您了解并同意我们的<a target="_blank" href="/help/articles/115198">服务条款</a>
          </p>
          <hr> -->
          <div class="am-form-group">
            <input type="submit" name="commit" value="注册帐号" class="am-btn am-btn-block am-btn-success am-radius">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        userName: this.userName,
        passWord: this.passWord
      };
    },
    methods: {
      login () {
        this.$http.post(this.$tools.resolveUrl("/Users"), {
          "loginName": this.userName,
          "realName": this.userName,
          "userName": this.userName,
          "passWord": this.passWord,
          "state": 1,
          "email": "string",
          "id": 0
        }, function (data, status, request) {
          this.$dispatch('link', "root");
        }).error(function (data, status, request) {

        });
        return false;
      }
    }
  }
</script>
