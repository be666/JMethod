/**
 * Created by bqxu on 16/3/20.
 */
let tools = require('../tools');
let Vue = require('vue');
let x=require('./dialog.less');

var dialogTemplate = [];
dialogTemplate.push('<div class="i-modal {{dialogClass}}" id="{{dialogId}}">');
dialogTemplate.push('<div class="i-modal-dialog" >');
dialogTemplate.push('<div class="i-modal-hd">');
dialogTemplate.push('{{dialogTitle}}');
dialogTemplate.push('<a href="javascript: void(0)" class="am-close am-close-spin" v-on:click="close">&times;</a>');
dialogTemplate.push('</div>');
dialogTemplate.push('<div class="i-modal-bd">');
dialogTemplate.push('<dialog_content v-ref:content></dialog_content>');
dialogTemplate.push('</div>');
dialogTemplate.push('<div class="i-modal-footer" id="{{dialogId}}-btn" v-if="showBtn">');
dialogTemplate.push('</div>');
dialogTemplate.push('</div>');
dialogTemplate.push('</div>');

var VueDialog = Vue.extend({
  template: dialogTemplate.join('')
});

var VueDialogBtn = Vue.extend({
  template: '<span class="am-modal-btn {{className}}" v-on:click="btnClick" >{{text}}</span>'
});


class DialogStore {

  constructor() {
    this.store = [];
  };

  push($dialog) {
    this.store.push({
      id: $dialog.id,
      dialog: $dialog
    });
    this.watchModal();
  }

  pop($id) {
    let index = this.store.findIndex(({id})=> {
      return id == $id
    });
    if (index > -1) {
      this.store.splice(index, 1);
    }
    this.watchModal();
  }

  watchModal() {
    let dialogModal = document.getElementById('vue-ui-dialog-modal');
    let className = dialogModal.className;
    className = className.split(' ');
    let index = className.findIndex((n)=>n == 'am-active');
    if (index > -1) {
      className.splice(index, 1);
    }
    if (this.store.length > 0) {
      className.push('am-active');
      dialogModal.style.display = 'block';
    } else {
      dialogModal.style.display = 'none';
    }
    dialogModal.className = className.join(' ');
  }
}

window.dialogStore = window.dialogStore || new DialogStore();

class Dialog {
  constructor(dialogVue, {id, buttons=[],onClose,title,dialogClass}) {
    this.id = id;
    var $this = this;
    this.vueDialog = new VueDialog({
      components: {
        "dialog_content": dialogVue
      },
      data(){
        let classArr = [];
        classArr.push(buttons.length > 0 ? 'i-modal-confirm' : 'i-modal-no-btn');
        classArr.push(dialogClass);
        return {
          dialogId: id,
          dialogTitle: title,
          showBtn: buttons.length > 0,
          dialogClass: classArr.join(' ')
        };
      },
      methods: {
        close(){
          if (typeof onClose == 'function') {
            if (onClose($this.vueDialog, $this, id)) {
              $this.close();
            }
          } else {
            $this.close();
          }
        }
      },
      ready: function () {
        for (let {text,click,className=''} of buttons) {
          let dialogBtn = new VueDialogBtn({
            data(){
              return {
                text, className
              }
            },
            methods: {
              btnClick() {
                click && click($this.vueDialog, $this, id);
              }
            }
          });
          dialogBtn.$mount().$appendTo(`#${id}-btn`)
        }
      }
    });
    this.vueDialog.$mount().$appendTo('#vue-ui-home');
    this.show();
  }

  show() {
    var $this = this;
    this.css(this.vueDialog.$el, {
      opacity: 1,
      display: 'block'
    });
    window.addEventListener('resize', function () {
      $this.lockWindow($this.id);
    });

    $this.lockWindow($this.id);

    window.dialogStore.push($this)
  }

  css(target, styles) {
    for (var key in styles) {
      target.style[key] = styles[key];
    }
  }


  lockWindow(id) {
    let target = document.getElementById(id);
    let winWidth = window.innerWidth || document.body.clientWidth || 0;
    let winHeight = window.innerHeight || document.body.clientHeight || 0;
    let tWidth = target.offsetWidth || 0;
    let tHeight = target.offsetHeight || 0;
    let left = (winWidth - tWidth) / 2;
    let top = (winHeight - tHeight) / 2;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    this.css(target, {
      position: 'fixed',
      left: parseInt(left) + 'px',
      top: parseInt(top) + 'px'
    });
  }

  close() {
    this.vueDialog.$destroy(true);
    window.dialogStore.pop(this.id)
  }
}

var dialogModal = [];
dialogModal.push('<div class="am-dimmer" id="vue-ui-dialog-modal">');
dialogModal.push('</div>');
if (!document.getElementById('vue-ui-home')) {
  let uiHome = document.createElement('div');
  uiHome.style.width = 0;
  uiHome.style.height = 0;
  uiHome.id = 'vue-ui-home';
  uiHome.innerHTML = dialogModal.join('');
  var l = document.body.childNodes.length;
  document.body.insertBefore(uiHome, document.body.childNodes[l - 1]);
}


export let open = (dialogVue, {
  id,buttons,onSuccess,onCancel,title,onClose,dialogClass
  }={}) => {
  if (!id) {
    id = tools.getEUID(10);
  }
  if (!buttons) {
    buttons = [];
    buttons.push({
      text: '取消',
      click: function (content, $this, id) {
        if (typeof onCancel == 'function') {
          if (onCancel(content, $this, id)) {
            $this.close();
          }
        } else {
          $this.close();
        }
      }
    });
    buttons.push({
      text: '确定',
      click: function (content, $this, id) {
        if (typeof onSuccess == 'function') {
          if (onSuccess(content, $this, id)) {
            $this.close();
          }
        } else {
          $this.close();
        }
      }
    })
  }
  return new Dialog(dialogVue, {id: id, buttons: buttons, title, onClose, dialogClass});
};

let DialogMsg = Vue.extend({
  template: '<div>{{dialogMsg}}</div>'
});

export let success = (msg, onclick)=> {
  let dialogMsg = DialogMsg.extend({
    data(){
      return {dialogMsg: msg}
    }
  });
  return open(dialogMsg, {
    buttons: [{
      text: '确定',
      click: function (content, $this, id) {
        if (typeof onclick == 'function') {
          if (onclick(content, $this, id)) {
            $this.close()
          }
        } else {
          $this.close()
        }
      }
    }]
  });
};

export let error = (msg)=> {
  let dialogMsg = DialogMsg.extend({
    data(){
      return {dialogMsg: msg}
    }
  });
  return open(dialogMsg, {buttons: []});
};



