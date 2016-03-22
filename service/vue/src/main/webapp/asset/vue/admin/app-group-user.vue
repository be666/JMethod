<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        应用用户列表
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-btn-toolbar">
        <div class="am-btn-group">
          <div class="am-btn am-btn-default" v-on:click="groupUserSelect()">
            选择用户
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
<script type="text/javascript">
  export default {
    data () {
      return {
        appId: this.$route.params.appId,
        groupId: this.$route.params.groupId
      }
    },
    events: {
      refresh(){
        var $this = this;
        $this.$http.get($this.$tools.resolveUrl("/AuthGroupUsers"), {
          filter: {
            where: {
              state: 1,
              appId: $this.appId,
              groupId: $this.groupId
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
      groupUserSelect () {
        var $this = this;
        var VueAppUser = require('../common/app-user.vue');
        VueAppUser.data = function () {
          return {appId: $this.appId}
        }
        var dialog = this.$dialog.open(VueAppUser, {
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
            $this.$http.post($this.$tools.resolveUrl('/AuthGroupUsers/bind'), {
              appId: $this.appId,
              groupId: $this.groupId,
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
          } else if (attr.sex == 1) {
            return '女'
          } else {
            return ''
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
          } else if (attr == 1) {
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
