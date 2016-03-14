<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-multi">
    <ul v-if="itemList.length">
      <template v-for="item in itemList">
        <li
          v-on:click="toggle(item[id])"
          v-bind:class="{'am-active':isSelected(item[id])}"
        >
          <a>
            {{item[text]}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<style>
  .i-multi {
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .i-multi ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .i-multi li {
    border-top: 1px solid #ddd;
  }

  .i-multi li:first-child {
    border-top-width: 0;
  }

  .i-multi a {
    display: block;
    padding: 6px 20px;
    font-weight: 400;
    color: #333;
    white-space: nowrap
  }

  .i-multi .am-active a {
    color: #fff;
    text-decoration: none;
    outline: 0;
    background-color: #0e90d2
  }
</style>
<script>
  export default {
    name: "i_select",
    props: ['id', 'text', 'selected', 'itemList'],
    data() {
      return {
        id: this.id || "id",
        text: this.text || "text",
        selected: this.selected,
        itemList: this.itemList
      }
    },
    methods: {
      toggle(id) {
        if (!this.selected) {
          this.selected = [];
        }
        var $selected = this.selected;
        if (tools.inArray($selected, id)) {
          for (var i = 0; i < $selected.length; i++) {
            var $s = $selected[i];
            if ($s == id) {
              $selected.splice(i, 1);
              break;
            }
          }
        } else {
          $selected.push(id);
        }
      },
      isSelected(id) {
        return this.$tools.inArray(this.selected, id);
      }
    }
  };
</script>
