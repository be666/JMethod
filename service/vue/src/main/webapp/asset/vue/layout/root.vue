<template>
  <component :is="currentView"></component>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  export default  {
    components: {
      home: require("./header_portal.vue"),
      admin: require("./header_admin.vue")
    },
    data () {
      let currentView = 'home';
      if (this.$config.module=='admin') {
        currentView = 'admin';
      }
      return {
        userInfo: this.userInfo,
        currentView: currentView
      }
    },
    route: {
      data (transition) {
        this.userInfo = this.$tools.getUserInfo();
      }
    }
  }
</script>
