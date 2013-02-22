function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "co.mobiledatasystems.customEditableTable/" + s : s.substring(0, index) + "/co.mobiledatasystems.customEditableTable/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.table = A$(Ti.UI.createTableView({
        id: "table"
    }), "TableView", null);
    $.addTopLevelView($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, editable = null;
    Ti.API.info(JSON.stringify(_args));
    for (var key in _args) _args.hasOwnProperty(key) && ($.table[key] = _args[key]);
    var rowData = [];
    exports.setData = function(rows) {
        rowData = rows;
        $.table.setData(rows);
    };
    exports.editing = function(edit) {
        $.table.editing = edit;
    };
    var handlers = {};
    handlers.click = function(r) {};
    handlers.deleteRow = function(r) {};
    exports.addEventListener = function(listenerName, listenerFunction) {
        switch (listenerName) {
          case "click":
            handlers.click = listenerFunction;
            break;
          case "delete":
            handlers.deleteRow = listenerFunction;
        }
    };
    $.table.addEventListener("delete", function(r) {
        handlers.deleteRow(r);
    });
    $.table.addEventListener("click", function(r) {
        if (editable == 1) {
            var dialog = Ti.UI.createAlertDialog({
                buttonNames: [ "Delete", "Cancel" ],
                message: "Delete " + r.row.rowTitle + "?",
                title: "Delete"
            });
            dialog.addEventListener("click", function(e) {
                if (e.index === 0) {
                    $.table.deleteRow(r.index, {
                        animationStyle: Titanium.UI.iPhone.RowAnimationStyle.UP
                    });
                    handlers.deleteRow(r);
                }
            });
            dialog.show();
        } else handlers.click(r);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;