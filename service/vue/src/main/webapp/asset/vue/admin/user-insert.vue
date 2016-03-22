<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class='am-container'>
    <div class="am-panel am-panel-default">

      <div class="am-panel-hd">
        <h3 class="am-panel-title">
          添加用户
        </h3>
      </div>
      <div class="am-panel-bd">
        <form class="am-form am-form-horizontal"
              v-on:submit.prevent="submitForm"
              v-on:reset.prevent="reset">
          <fieldset>
            <legend>用户信息</legend>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">登陆名</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="userInfo.loginName" required placeholder="">
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
                <input type="email" v-model="userInfo.email" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">电话</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="userInfo.telephone" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">出生日期</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="date" v-model="userInfo.birthday" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">联系地址</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="userInfo.address" required placeholder="">
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
<style lang='less'>

</style>
<script type="text/javascript">
  export default {
    route: {
      canReuse(transition){
        return false;
      }
    },
    data () {
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
    ready () {

    },
    methods: {
      submitForm () {
        let $this=this;
        this.$http.post(this.$tools.resolveUrl("/AuthUsers"), {
          loginName: this.userInfo.loginName,
          realName: this.userInfo.realName,
          userName: this.userInfo.userName,
          email: this.userInfo.email,
          sex: this.userInfo.sex,
          address: this.userInfo.address,
          birthday: this.userInfo.birthday,
          telephone: this.userInfo.telephone
        }, function (res, ste, req) {
          this.$dispatch('link', 'user')
        }).error(function () {
          $this.$dialog.error('请稍后重试!');
        })
      },
      reset () {
        this.$dispatch('link', 'user')
        this.userInfo = {};
      }
    },
    attached () {

    }
  }
</script>
