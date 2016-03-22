<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <header class="am-topbar" id="topbar">
    <div class="am-container">
      <ul class="am-nav  am-nav-pills">
        <li v-on:click="refresh">
          <a href="javascript:void(0)">合生账号</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang='less'>
  .am-topbar .am-nav-pills {
    border: none;

  }

  .am-topbar .am-nav-pills li {
    line-height: 36px;
  }

</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    ready () {

    },
    methods: {
      refresh: function () {
        window.location.reload();
      }
    },
    attached () {

    }
  }
</script>
