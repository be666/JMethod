<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class='am-container'>
    <div class="am-panel am-panel-default">

      <div class="am-panel-hd">
        <h3 class="am-panel-title">
          添加应用分组
        </h3>
      </div>
      <div class="am-panel-bd">
        <form class="am-form am-form-horizontal"
              v-on:submit.prevent="submitForm"
              v-on:reset.prevent="reset">
          <fieldset>
            <legend>应用分组信息</legend>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">gid</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="groupInfo.gid" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">分组名称</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="groupInfo.groupName" required placeholder="">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">权限代码</label>
              <div class="am-u-sm-9 am-u-end ">
                <input type="text" v-model="groupInfo.groupCode" required placeholder="">
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
        groupInfo: {},
        appId: this.$route.params.appId
      }
    },
    ready () {

    },
    methods: {
      submitForm: function () {
        var $this = this;
        $this.$http.post(this.$tools.resolveUrl("/AuthGroups"), {
          appId: $this.appId,
          gid: $this.groupInfo.gid,
          groupName: $this.groupInfo.groupName,
          groupCode: $this.groupInfo.groupCode
        }, function (res, ste, req) {
          $this.$dispatch('link', 'app-group', {
            appId: $this.appId
          })
        }).error(function () {

        })
      },
      reset: function () {
        this.$dispatch('link', 'app-group', {
          appId: this.appId
        })
      }
    },
    attached () {

    }
  }
</script>
