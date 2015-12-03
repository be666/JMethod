/**
 * auth : iMethod
 * create_at: 15/10/14.
 * desc:
 * note:
 *  1.
 */
template.helper("template", function (id, args) {
    return window.template(id, args);
});


template.helper("log", function (arg) {
    console.log(arg)
});

template.helper("splitJoin", function (arg, split, join) {
    return window.iMethod.utils.splitJoin(arg, split, join);
});

template.helper("extend", function (dist, obj) {
    return window.iMethod.utils.extend(dist, obj);
});

template.helper("isEmptyArr", function (obj) {
    return window.iMethod.utils.isEmptyArr(obj);
});

template.helper("nothing", function (obj) {
    return window.iMethod.utils.nothing(obj);
});
template.helper("isFunc", function (obj) {
    return window.iMethod.utils.isFunc(obj);
});

template.helper("fromCharCode", function (obj) {
    return String.fromCharCode(obj);
});

template.helper("expireTime", function (datetime) {
    return new Date().getTime() >= new Date(datetime.replace(new RegExp("-", 'g'), "/")).getTime();
});

template.helper("attr", function (name, value) {

    if (!window.iMethod.utils.nothing(value)) {
        return name + "=" + value + "";
    }
    return "";
});

template.helper("htmlClean", function (html) {
    html = html.toLocaleLowerCase().replace(/<style>.+<\/style>/g, '')
    return $("<div></div>").html(html).html();
});


template.helper("def", {
    btnText: "click",
    btnSure: "确定",
    btnSearch: "查询",
    btnCancel: "取消",
    searchInfo: "请输入内容进行查询"
});






