<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        用户:xxx 您好!
        <a v-link="{name:'me'}" style="float: right">修改个人信息</a>
      </h3>
    </div>
    <div class="am-panel-bd">
      <div class="am-g">
        <div class="am-u-md-10 am-u-end">
          应用:xxxx <br>

          siteUrl:xxxx <br>

          角色:xx
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .portal-keep {

  }
</style>
<script type="text/javascript">
  export default {
    data() {
      return {
        sexList: [{
          sid: '0',
          name: '男'
        }, {
          sid: '1',
          name: '女'
        }],
        userInfo: {}
      }
    },
    methods: {
      link (pathName, params) {
        this.$dispatch('link', pathName, params)
      },
      reset(){

      },
      submitForm(){
        this.$http.put(this.$tools.resolveUrl("/Users"), {
          id: this.userInfo.id,
          realName: this.userInfo.realName,
          userName: this.userInfo.userName,
          email: this.userInfo.email,
          sex: this.userInfo.sex
        }, function (res, ste, req) {
          console.log(res);
        }).error(function () {

        })
      }
    },
    attached () {
      this.$http.get(this.$tools.resolveUrl("/Users"), {
        filter: {
          where: {
            id: this.$tools.getUserInfo().userId
          }
        }
      }, function (res, ste, req) {
        if (res.length > 0) {
          this.userInfo = res[0];
        }
      })
    }
  }

</script>
