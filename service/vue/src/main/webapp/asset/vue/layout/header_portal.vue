<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <header class="am-topbar" id="topbar">
    <div class="am-container">
      <h1 class="am-topbar-brand">
        <a href="/">合生账号</a>
      </h1>
      <a href="/admin" style="float:right;line-height: 36px">我是管理员</a>
    </div>
  </header>
</template>
<script>
  export default {
    created() {
      this.userInfo = this.userInfo || {};
    },
    props: ["userInfo"],
    methods: {
      logout () {
        this.$http.post(this.$tools.resolveUrl("/Users/logout"), function (data, status, request) {
          this.$auth.loginOut();
          this.$dispatch('link', "login");
        })
      }
    }
  }
</script>
