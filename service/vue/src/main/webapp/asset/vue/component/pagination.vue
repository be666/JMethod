<template xmlns:v-on="" xmlns:v-bind="">
  <ul class="am-pagination am-pagination-right" v-if="!(pages  | gt0)">
    <li v-if="pageIndex > 1">
      <a href="javascript:void(0)" v-on:click.stop="indexClick(pageIndex - 1)">
        上一页
      </a>
    </li>
    <template v-for="pg in pages">
      <li v-bind:class="{ 'active': pageIndex == pg }">
        <a href="javascript:void(0)" v-on:click="indexClick(pageIndex )">
          {{pg}}
        </a>
      </li>
    </template>
    <li v-if="pageIndex != totalPage">
      <a href="javascript:void(0)" v-on:click="indexClick(pageIndex +1 )">
        下一页
      </a>
    </li>
    <li>
      <a href="javascript:void(0)">
        共{{totalPage}}页
      </a>
    </li>
  </ul>
</template>
<style>
  .am-pagination {
    margin: 0.5rem 0;
  }

  .am-pagination > li > a {
    margin-bottom: 0;
  }

  .am-table > tfoot > tr > td {
    padding: 0 .5rem;
  }
</style>
<script>
  export default{
    name: "i_pagination",
    data () {
      return {
        pageIndex: this.pageMaker.pageIndex || 0,
        pageSize: this.pageMaker.pageSize || 10,
        totalPage: this.pageMaker.totalPage || 0,
        pages: this.pageMaker.pages || [],
        rowCount: this.pageMaker.rowCount || 0,
        sizes: this.pageMaker.sizes || [10, 20, 50, 100]
      }
    },
    props: ['pageMaker'],
    methods: {
      sizeClick (size) {
        this.$dispatch('pageClick', 1, size)
      },
      indexClick (index) {
        this.$dispatch('pageClick', index, this.size)
      }
    }
  }
</script>
