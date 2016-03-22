<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        用户登陆token
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-panel-bd">
        <i_table
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
      link (pathName, params) {
        this.$dispatch('link', pathName, params)
      }
    },
    ready () {
      this.$refs.table.dataList = [];
    },
    attached () {
      this.$http.get(this.$tools.resolveUrl("/UserTokens"), {
        filter: {
          where: {
            state: 1
          },
          include: 'user'
        }
      }, function (res, ste, req) {
        this.$refs.table.dataList = res;
      })
    },
    compiled () {
      let $this = this;
      this.$refs.table.pk = 'id';
      this.$refs.table.checkbox = [];
      this.$refs.table.titleList = [{
        id: 'user',
        text: "登陆名",
        render (el, attr, index) {
          return attr.loginName
        }
      }, {
        id: "ips",
        text: "登陆ip"
      }, {
        id: "createdAt",
        text: "登陆时间",
        render (el, attr, index) {
          return $this.$tools.getDateTimeStr(attr);
        }
      }, {
        id: "expiresTime",
        text: "有效期",
        render (el, attr, index) {
          return $this.$tools.getDateTimeStr(attr);
        }
      }, {
        id: "state",
        text: "状态",
        render (el, attr, index) {
          if (attr == 1) {
            return "有效"
          } else if (attr == 0) {
            return "失效"
          }
        }
      }];
    }
  }

</script>
