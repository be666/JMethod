<template>
  <i_header v-bind:user-info="userInfo"></i_header>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  export default  {
    components: {
      'i_header': require("./header.vue")
    },
    data () {
      return {
        userInfo: this.userInfo
      }
    },
    route: {
      data (transition) {
        this.userInfo = this.$tools.getUserInfo();
      }
    }
  }
</script>
