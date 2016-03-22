<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <i_table
      v-on:table-click="optionInfo"
      v-ref:table
    ></i_table>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        appId: null
      }
    },
    ready () {

    },
    methods: {
      optionInfo: function () {

      }
    },
    attached () {
      var $this = this;
      $this.$http.get($this.$tools.resolveUrl('/AuthAppUsers'), {
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
    },
    compiled(){
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
    }

  }
</script>
