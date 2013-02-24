function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "co.mobiledatasystems.customEditableTable/" + s : s.substring(0, index) + "/co.mobiledatasystems.customEditableTable/" + s.substring(index + 1);
    return path.indexOf("/") !== 0 ? "/" + path : path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.widgetView = A$(Ti.UI.createView({
        id: "widgetView",
        layout: "vertical"
    }), "View", null);
    $.addTopLevelView($.__views.widgetView);
    $.__views.lblTitle = A$(Ti.UI.createLabel({
        text: "This is the widget",
        id: "lblTitle",
        left: "0",
        right: "0",
        top: "0",
        height: "30dp",
        textAlign: "center"
    }), "Label", $.__views.widgetView);
    $.__views.widgetView.add($.__views.lblTitle);
    $.__views.table = A$(Ti.UI.createTableView({
        id: "table",
        top: "10dp",
        bottom: "0",
        left: "0",
        right: "0"
    }), "TableView", $.__views.widgetView);
    $.__views.widgetView.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, editable = null;
    editable = !1;
    Ti.API.info(JSON.stringify(_args));
    for (var key in _args) if (_args.hasOwnProperty(key)) switch (key) {
      case "labelColor":
        $.lblTitle.color = _args[key];
        break;
      case "top":
        $.widgetView.top = _args[key];
        break;
      case "bottom":
        $.widgetView.bottom = _args[key];
        break;
      case "left":
        $.widgetView.left = _args[key];
        break;
      case "right":
        $.widgetView.right = _args[key];
        break;
      case "editing":
        editable = _args[key];
        break;
      case "moving":
        break;
      default:
        $.table[key] = _args[key];
    }
    var rowData = [];
    exports.setData = function(rows) {
        rowData = rows;
        $.table.setData(rows);
    };
    exports.editing = function(edit) {
        editable = edit;
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