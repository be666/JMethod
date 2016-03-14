<template>
  <div class="am-g am-g-fixed" id="bd-warp">
    <div class="am-u-md-10 am-u-md-push-1 doc-content">
      <section>
        <router-view>

        </router-view>
      </section>
    </div>
  </div>
</template>
<style>
  #bd-warp {
    min-width: 1000px;
  }
</style>
<script>
  export default {
    compiled () {
    },
    data () {
      return {
        moduleName: this.moduleName
      }
    },
    route: {
      data (transition) {
        var to = transition.to;
        if (to.matched && to.matched[1]) {
          this.moduleName = transition.to.matched[1].handler.name;
        }
      }
    }
  }
</script>
