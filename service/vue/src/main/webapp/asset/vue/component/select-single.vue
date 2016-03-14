<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-dropdown" v-bind:class="{'am-active':active}">
    <button class="am-btn am-dropdown-toggle" type="button"
            v-on:click="toggle"
    >
      {{selected&&selected[id]?selected[text]:unSelected[text]}}
      <span class="am-icon-caret-down"></span>
    </button>
    <ul class="am-dropdown-content" v-if="itemList.length | gt0">
      <template v-for="item in itemList">
        <li
          v-on:click="clicked(item[id],item[text])"
          v-bind:class="{'am-active':equal(item[id],selected[id])}"
        >
          <a>
            {{item[text]}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "i_select",
    props: ['id', 'text', 'selected', 'unSelected', "pid", 'itemList'],
    data: function () {
      return {
        active: 0,
        id: this.id || "id",
        pid: this.pid || this.$tools.getUUid(),
        text: this.text || "text",
        selected: this.selected || {},
        unSelected: this.unSelected || {
          id: "",
          text: "请选择"
        },
        itemList: this.itemList
      }
    },
    methods: {
      toggle() {
        this.active = 1 - this.active;
      },
      clicked(idVal, textVal) {
        var selected = {};
        selected[this.id] = idVal;
        selected[this.text] = textVal;
        this.selected = selected;
        this.active = 0;
        this.$dispatch("selecting", this.pid, idVal, textVal);
      },
      equal (v1, v2) {
        return v1 == v2;
      }
    }
  };
</script>
