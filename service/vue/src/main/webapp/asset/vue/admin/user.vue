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
          <div class="am-btn am-btn-default" v-on:click="link('user-add')">
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
  export default {
    methods: {
      link(pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      optionInfo () {

      }
    },
    ready () {
      this.$refs.table.dataList = [];
    },
    created (argument) {

    },
    attached () {
      var $this = this;
      $this.$http.get($this.$tools.resolveUrl("/AuthUsers"),{
        filter: {
          where: {
            state: 1
          }
        }
      }, function (res, ste, req) {
        $this.$refs.table.dataList = res;
      })
    },
    compiled: function () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "loginName",
        text: "登录名"
      }, {
        id: "realName",
        text: "真实姓名"
      }, {
        id: "sex",
        text: "性别",
        render: function (el, attr, index) {
          if (attr == 0) {
            return '男'
          } else {
            return '女'
          }
        }
      }, {
        id: "birthday",
        text: "出生日期"
      }, {
        id: "email",
        text: "邮箱"
      }, {
        id: "telephone",
        text: "电话"
      }, {
        id: "enable",
        text: "状态",
        render: function (el, attr, index) {
          if (attr == 0) {
            return '禁用'
          } else {
            return '启用'
          }
        }
      }];
      $this.$refs.table.optionList = [{
        className: 'am-btn-sm',
        id: "in",
        render: function (el, index) {
          if (el.enable == 0) {
            return "启用";
          } else {
            return "禁用";
          }
        }
      }];
    }
  }

</script>
