<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        个人中心
      </h3>
    </div>
    <div class="am-panel-bd">
      <form class="am-form am-form-horizontal"
            v-on:submit.prevent="submitForm"
            v-on:reset.prevent="reset">
        <fieldset>
          <legend>个人信息维护</legend>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">登陆名</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.loginName" readonly placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">用户名</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.userName" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">真实姓名</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.realName" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">邮箱</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="userInfo.email" required placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">性别</label>
            <div class="am-u-sm-9 am-u-end ">
              <i_radio
                v-bind:item-list="sexList"
                v-bind:choose.sync="userInfo.sex"
                sid="sid"
                text="name"
              ></i_radio>
            </div>
          </div>

          <div class="am-form-group">
            <div class="am-u-sm-10 am-u-sm-offset-2">
              <button type="submit" class="am-btn am-btn-default">提交</button>
              <button type="reset" class="am-btn am-btn-default">取消&返回</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
  </div>
</template>
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
