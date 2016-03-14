<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-cf i-input-group i-search-warp">
    <input type="text" placeholder="{{placeholder}}" class="i-search-field" v-model="keyWord">
    <span class="i-input-search-label">
      <button type="button" v-on:click="searched">
        {{tips}}
      </button>
    </span>
  </div>
</template>
<style>
  .i-search-warp {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .i-search-warp .i-search-field {
    display: inline-block;
    width: 60%;
    height: inherit;
    line-height: 1.5rem;
    vertical-align: middle;
    float: left;
  }

  .i-input-search-label {
    display: inline-block;
    width: 40%;
    height: inherit;
    float: left;
  }

  .i-input-search-label button {
    height: inherit;
  }

</style>
<script>
  export default {
    props: ["keyWord", "placeholder", "tips"],
    data () {
      this.placeholder = this.placeholder || "输入";
      this.tips = this.tips || "查询";
      return {
        placeholder: this.placeholder,
        tips: this.tips,
        keyWord: this.keyWord,
        formId: this.$tools.getUUid()
      }
    },
    methods: {
      searched() {
        this.$dispatch("searched")
      }
    }
  }
</script>
