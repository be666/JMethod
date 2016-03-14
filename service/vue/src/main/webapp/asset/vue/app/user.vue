<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        用户列表
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-btn-toolbar">
        <div class="am-btn-group">
          <div class="am-btn am-btn-default" v-on:click="link('analysis_info')">
            新增
          </div>
        </div>
      </div>
      <div class="am-panel-bd">
        <i_table
          v-on:table-click="optionInfo"
          v-ref:table
        ></i_table>
      </div>
    </div>
  </div>
</template>
<style lang='less'>

</style>
<script type="text/javascript">
  module.exports = {
    data: function () {

    },
    methods: {
      link: function (pathName, params) {
        var $this = this;
        $this.$dispatch('link', pathName, params)
      },
      optionInfo: function () {

      }
    },
    ready: function () {
      var $this = this;
      $this.$refs.table.dataList = [];
    },
    created: function (argument) {

    },
    attached: function () {
      var $this = this;
      $this.$http.get($this.$tools.resolveUrl("/Users"), function (res, ste, req) {
        $this.$refs.table.dataList = res;
      })
    },
    compiled: function () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "appToken",
        text: "token"
      }, {
        id: "siteUrl",
        text: "站点地址"
      }, {
        id: "siteName",
        text: "站点名称"
      }, {
        id: "enable",
        text: "状态",
        render: function (el, attr, index) {
          if (attr == 0) {
            return "禁用"
          } else if (attr == 1) {
            return "启用"
          }
        }
      }];
      $this.$refs.table.optionList = [{
        id: "in",
        render: function (el, index) {
          if (el.enable == 0) {
            return "启用"
          } else {
            return "禁用"
          }
        }
      }];
    }
  }

</script>
