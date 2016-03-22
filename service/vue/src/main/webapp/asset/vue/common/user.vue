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
        userUrl: '/AuthUsers',
        filter: {
          where: {
            state: 1
          }
        }
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
      $this.$http.get($this.$tools.resolveUrl($this.userUrl), {
        filter: $this.filter
      }, function (res, ste, req) {
        $this.$refs.table.dataList = res;
      })
    },
    compiled(){
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
