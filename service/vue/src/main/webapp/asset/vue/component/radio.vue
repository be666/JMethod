<template>
  <div class="i-radio" v-for="item in itemList">
    <input type="radio" v-model="choose" value="{{item[sid]}}">
    {{item[text]}}
  </div>
</template>
<script>
  export default {
    name: 'i_radio',
    props: ['itemList', 'choose', 'sid', 'text']
  }
</script>
