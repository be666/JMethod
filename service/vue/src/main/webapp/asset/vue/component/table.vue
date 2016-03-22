<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div style="overflow-x: auto; ">
    <table class="am-table am-table-bordered">
      <thead>
      <tr>
        <th>
          <input v-on:change="toggleAll" type="checkbox"/>
        </th>
        <template v-for="title in titleList">
          <th>
            {{title.text}}
          </th>
        </template>
        <th v-if="optionList.length | gt0">
          操作
        </th>
      </tr>
      </thead>
      <tbody v-if="dataList && dataList.length | gt0 ">
      <template v-for="data in dataList">
        <tr>
          <td>
            <input type="checkbox" v-model="checkbox" value="{{$index}}">
          </td>
          <template v-for="title in titleList">
            <td>
              <template v-if="title.render">
                {{{ (title.render)(data,data[title.id],$index) }}}
              </template>
              <template v-else>
                {{data[title.id]}}
              </template>
            </td>
          </template>
          <td v-if="optionList.length  | gt0">
            <div v-for="option in optionList"
                 class="am-btn am-btn-default {{option.className||''}}"
                 v-on:click="optionEvent(option.id,data)">
              <template v-if="option.render">
                {{{ (option.render)(data,$index) }}}
              </template>
              <template v-else>
                {{{option.text}}}
              </template>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="{{ (optionList.length>0) ? (titleList.length+2) : (titleList.length+1) }}"
            v-if="dataList | gt0">
          <i_pagination
            :page-maker="pageMaker"
          >
          </i_pagination>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'i_table',
    created () {
      if (!this.pageMaker) {
        this.pageMaker = {};
      }
    },
    beforeCompile() {
      this.optionList = this.optionList || [];
    },
    props: {
      titleList: 'Array',
      dataList: 'Array',
      pageMaker: 'Object',
      checkbox: {
        type: 'Array',
        default(){
          return [];
        }
      },
      optionList: {
        type: 'Array',
        default(){
          return [];
        }
      },
      pid: {
        type: 'String',
        default() {
          return this.$tools.getUUid();
        }
      }
    },
    events: {
      pageClick (index, size) {
        this.$dispatch('tablePageClick', index, size)
      }
    },
    methods: {
      toggleAll(event) {
        this.checkbox.splice(0, this.checkbox.length);
        if (event.target.checked) {
          let dLength = this.dataList.length;
          for (var i = 0; i < dLength; i++) {
            this.checkbox.push(String(i));
          }
        }
      },
      optionEvent(optionId, data) {
        this.$dispatch('table-click', this.pid, optionId, data);
      }
    }
  }
</script>
