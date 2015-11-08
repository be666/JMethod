define('controller/student/assignment.opts', [
    "controller/play/uedit",
    'service/student_service',
    "view/student/assignment/list",
    "template"
], function (require, exports, module) {
    var playEdit = require("controller/play/uedit");
    var studentService = require("service/student_service");
    var assignmentListView = require("view/student/assignment/list");

    exports.joinAssignment = function (uEditId) {
        var ue = playEdit.getEditor(uEditId);
        ue.ready(function () {
            ue.setContent('<p>hello!</p>');
            ue.getAllHtml();
        });
    }

    gxb.controller.student = gxb.controller.student || {};
    gxb.controller.student.assignment = gxb.controller.student.assignment || {};
    gxb.controller.student.assignment.opts = module.exports;
});