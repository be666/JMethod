<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class='am-container'>
    <div class="am-panel am-panel-default">

      <div class="am-panel-hd">
        <h3 class="am-panel-title">
          添加应用
        </h3>
      </div>
      <div class="am-panel-bd">
        <form class="am-form am-form-horizontal"
              v-on:submit.prevent="submitForm"
              v-on:reset.prevent="reset">
          <fieldset>
            <legend>应用信息</legend>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">应用名称</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="appInfo.appName" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">站点地址</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="appInfo.siteUrl" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">IP地址</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="appInfo.siteIp" required placeholder="">
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
    data () {
      return {
        appInfo: {}
      }
    },
    ready () {

    },
    methods: {
      submitForm: function () {
        this.$http.post(this.$tools.resolveUrl("/AuthApps/insert"), {
          appName: this.appInfo.appName,
          siteUrl: this.appInfo.siteUrl,
          siteIp: this.appInfo.siteIp
        }, function (res, ste, req) {
          this.$dispatch('link', 'app')
        }).error(function () {
        })
      },
      reset: function () {
        this.$dispatch('link', 'app')
      }
    },
    attached () {

    }
  }
</script>
