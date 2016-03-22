<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        系统信息
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-g">
        <div class="am-u-md-10 am-u-end">
          用户数:x; <a v-on:click="link('user-add')">新增</a><br>
          应用数:y; <a v-on:click="link('app-add')">新增</a><br>
        </div>
      </div>
    </div>
  </div>
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        xxx应用
      </h3>
    </div>
    <div class="am-panel-bd">
      用户数,<br>
      管理员,<br>
      本周登录次数,<br>
    </div>
  </div>
</template>
<style lang='less'>
  .admin-keep {

  }
</style>
<script type="text/javascript">
  export default {
    date () {
      return {}
    },
    ready () {

    },
    methods: {
      link: function (pathName, params) {
        var $this = this;
        $this.$dispatch('link', pathName, params)
      }
    },

    attached () {

    }
  }
</script>
