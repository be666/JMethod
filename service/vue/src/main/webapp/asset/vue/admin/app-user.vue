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
          <div class="am-btn am-btn-default" v-on:click="appUserSelect()">
            导入用户
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
    data () {
      return {
        appId: this.$route.params.appId
      }
    },
    events: {
      refresh: function () {
        var $this = this;
        $this.$http.get($this.$tools.resolveUrl("/AuthAppUsers"), {
          filter: {
            where: {
              state: 1,
              appId: $this.appId
            },
            include: 'user'
          }
        }, function (res, ste, req) {
          $this.$refs.table.dataList = res;
        })
      }
    },
    methods: {

      link(pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      optionInfo () {

      },
      appUserSelect(){
        var $this = this;
        let VueUser = require('../common/user.vue');
        let dialog = this.$dialog.open(VueUser, {
          title: '导入用户到分组',
          dialogClass: 'i-dialog-max',
          onSuccess: function (content, $dialog, id) {
            let $table = content.$refs.content.$refs.table;
            let dataList = $table.dataList;
            let checkbox = $table.checkbox;
            if (checkbox.length == 0) {
              return true;
            }
            var userIds = [];
            for (var cb of checkbox) {
              userIds.push(dataList[cb].id);
            }
            $this.$http.post($this.$tools.resolveUrl('/AuthAppUsers/bind'), {
              appId: $this.appId,
              userIds: userIds
            }, function (res, ste, req) {
              dialog.close();
              $this.$dispatch('refresh')
            }).error(function (err) {
              $this.$dialog.error('请稍后重试!');
            });
            return false;
          }
        });
      }
    },
    ready () {
      this.$refs.table.dataList = [];
    },
    created (argument) {

    },
    attached () {
      this.$dispatch('refresh')
    },
    compiled: function () {
      var $this = this;
      $this.$refs.table.pk = 'id';
      $this.$refs.table.checkbox = [];
      $this.$refs.table.titleList = [{
        id: "user",
        text: "登录名",
        render: function (el, attr, index) {
          return attr.loginName
        }
      }, {
        id: "user",
        text: "真实姓名",
        render: function (el, attr, index) {
          return attr.realName
        }
      }, {
        id: "user",
        text: "性别",
        render: function (el, attr, index) {
          if (attr.sex == 0) {
            return '男'
          } else {
            return '女'
          }
        }
      }, {
        id: "user",
        text: "邮箱",
        render: function (el, attr, index) {
          return attr.email
        }
      }, {
        id: "user",
        text: "电话",
        render: function (el, attr, index) {
          return attr.telephone
        }
      }, {
        id: "state",
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
          if (el.state == 0) {
            return "启用";
          } else {
            return "禁用";
          }
        }
      }];
    }
  }

</script>
