<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-cf i-file-group">
    <input type="text" placeholder="{{placeholder}}" class="i-file-field" v-model="name">
    <span class="i-input-group-label">
      <button class="i-file-warp" type="button">
        {{tips}}{{prc}}
        <form onsubmit="return false" enctype="multipart/form-data" v-bind:id="formId">
          <input type="file" v-on:change="submit()" class="i-file" multiple="multiple" name="fileUpload"
                 id="fileUpload">
        </form>
      </button>
    </span>
  </div>
</template>
<style>
  .i-file-group {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .i-file-group input[type=text].i-file-field {
    display: inline-block;
    width: 60%;
    height: inherit;
    float: left;
  }

  .i-input-group-label {
    display: inline-block;
    width: 40%;
    height: inherit;
    float: left;
  }

  .i-file-warp {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    width: 100%;
    height: 32px;
  }

  .i-file {
    width: 100%;
    height: 32px;
  }

  .i-file-warp .i-file {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .i-file-warp:hover {
    text-decoration: none;
  }
</style>
<script>
  export default  {
    props: ['name', "size", "path", "placeholder", "tips"],
    data: function () {
      this.placeholder = this.placeholder || "文件名称";
      this.tips = this.tips || "选择文件";
      return {
        placeholder: this.placeholder,
        tips: this.tips,
        name: this.name,
        size: this.size,
        path: this.path,
        formId: this.$tools.getUUid()
      }
    },
    methods: {
      submit: function () {
        var formData = new FormData(document.forms.namedItem(this.formId));
        this.$http.post(tools.config.uploadUrl, formData, function (data, state, req) {
          this.name = data.name;
          this.size = data.size;
          this.path = data.path;
        }, {
          headers: {
            "Content-Type": "multipart/form-data;"
          }
        }).error(function () {

        })
      }
    }
  }
</script>
