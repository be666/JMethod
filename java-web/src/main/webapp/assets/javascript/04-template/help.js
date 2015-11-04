/**
 * auth : iMethod
 * create_at: 15/10/14.
 * desc:
 * note:
 *  1.
 */

template.helper("hhh", function (a) {
  return a
})


template.helper("template", function (id, args) {
  return window.template(id, args);
});


template.helper("log", function (arg) {
  console.log(arg)
});

template.helper("splitJoin", function (arg, split, join) {
  return window.gxb.utils.splitJoin(arg, split, join);
});

template.helper("extend", function (dist, obj) {
  return window.gxb.utils.extend(dist, obj);
});

template.helper("isEmptyArr", function (obj) {
  return window.gxb.utils.isEmptyArr(obj);
});

template.helper("attr", function (name, value) {

  if (!window.gxb.utils.nothing(value)) {
    return name + "=" + value + "";
  }
  return "";
});


template.helper("def", {
  btnText: "click",
  btnSure: "确定",
  btnSearch: "查询",
  btnCancel: "取消",
  searchInfo: "请输入内容进行查询"
});






