<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <header class="am-topbar" id="topbar">
    <div class="am-container">
      <ul class="am-nav  am-nav-pills">
        <li v-link="{name: 'home',activeClass:''}">
          <a>合生账号</a>
        </li>
        <li v-link="{name: 'user',activeClass:'am-active'}">
          <a>用户管理</a>
        </li>
        <li v-link="{name: 'app',activeClass:'am-active'}">
          <a>应用管理</a>
        </li>
        <li style="float: right">
          <a href="/">个人中心</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang="less">
  .am-topbar .am-nav-pills {
    border: none;

  }

  .am-topbar .am-nav-pills li {
    line-height: 36px;
  }

</style>
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
