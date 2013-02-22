function Controller() {
    function btnEdit_click_Event() {
        if (editMode) {
            $.btnEdit.title = "Allow Editing";
            editMode = !1;
        } else {
            $.btnEdit.title = "Cancel Editing";
            editMode = !0;
        }
        $.table1.editing(editMode);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "gray",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.table1 = Alloy.createWidget("co.mobiledatasystems.customEditableTable", "widget", {
        left: "10dp",
        right: "10dp",
        top: "20dp",
        bottom: "80dp",
        backgroundColor: "orange",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "black",
        id: "table1"
    });
    $.__views.table1.setParent($.__views.index);
    $.__views.btnEdit = A$(Ti.UI.createButton({
        bottom: "10dp",
        left: "20dp",
        right: "20dp",
        height: "45dp",
        id: "btnEdit",
        title: "Allow Editing"
    }), "Button", $.__views.index);
    $.__views.index.add($.__views.btnEdit);
    btnEdit_click_Event ? $.__views.btnEdit.on("click", btnEdit_click_Event) : __defers["$.__views.btnEdit!click!btnEdit_click_Event"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var editMode = !1, rows = [];
    for (var i = 0; i < 10; i++) {
        var view = Ti.UI.createView({
            height: "60dp",
            backgroundColor: "transparent"
        }), lbl = Ti.UI.createLabel({
            text: "Row number " + i,
            font: {
                fontSize: "20dp"
            },
            left: "10dp",
            height: "50dp",
            right: "10dp",
            color: "black"
        });
        view.add(lbl);
        var row = Ti.UI.createTableViewRow({
            height: "60dp",
            rowTitle: "Row number " + i
        });
        row.add(view);
        rows.push(row);
    }
    $.table1.setData(rows);
    $.table1.addEventListener("click", function(r) {
        Ti.API.info("row clicked: " + JSON.stringify(r));
        var dialog = Ti.UI.createAlertDialog({
            message: r.row.rowTitle,
            title: "Clicked"
        });
        dialog.show();
    });
    $.table1.addEventListener("delete", function(r) {
        Ti.API.info("row deleted: " + JSON.stringify(r));
        var dialog = Ti.UI.createAlertDialog({
            message: r.row.rowTitle,
            title: "Deleted"
        });
        dialog.show();
    });
    __defers["$.__views.btnEdit!click!btnEdit_click_Event"] && $.__views.btnEdit.on("click", btnEdit_click_Event);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;