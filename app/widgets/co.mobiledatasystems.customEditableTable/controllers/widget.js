//copy the arguments passed in to the widget via. the xml and tss parameters
var _args = arguments[0] || {};

var editable = null;

if(OS_ANDROID){
	editable = false;
};

//get each element set in the widget's xml or tss parameters
Ti.API.info(JSON.stringify(_args));

//iterate round all the parameters we have passed in
for (var key in _args) {
  if (_args.hasOwnProperty(key)) {//checks key is a direct property of _args, not somewhere down the object tree  	
	switch (key){
		case 'labelColor':
			$.lblTitle.color = _args[key];
			break;
		case 'top':
			$.widgetView.top = _args[key];
			break;
		case 'bottom':
			$.widgetView.bottom = _args[key];
			break;
		case 'left':
			$.widgetView.left = _args[key];
			break;
		case 'right':
			$.widgetView.right = _args[key];
			break;
		case 'editing': 
			if(OS_ANDROID){
				editable = _args[key];
			} else {
				$.table[key] = _args[key];
			};
			break; 
		case 'moving': 
			if(OS_IOS){
				$.table[key] = _args[key];
			};
			break;  //android doesn't recognise this property
		default:
			$.table[key] = _args[key];
	};
  };
};

var rowData = [];

//custom method we expose to set the table's data
exports.setData = function(rows /*Ti.UI.Row*/){
	rowData = rows;
	$.table.setData(rows);
};

//custom method we expose to allow the table to be editable
exports.editing = function(edit /*bool*/){
	if(OS_IOS){
		$.table.editing = edit;  //allow row editing on iPhone & iPad
	} else {
		editable = edit;
	};
};




//create a handlers object that will contain references to functions
var handlers = {};

//assign some functions that do nothing.
handlers.click = function(r){};
handlers.deleteRow = function(r){};

//expose a function that can pass in a reference to an external function and assign the reference to the appropriate handler.
exports.addEventListener = function(listenerName, listenerFunction){
	switch (listenerName){
		case 'click' :
			handlers.click = listenerFunction;
			break;
		case 'delete' :
			handlers.deleteRow = listenerFunction;
			break;
	};
};


//This does the heavy lifting of the widget.  If the table is editable then we allow rows to be deleted.

//listen for the table's event handlers to fire and call the appropriate function that was passed into the widget.
//Simple for iOS, a 'delete' event is fired that does all the row deletion for us automagically.
if(OS_IOS){
	$.table.addEventListener('delete', function(r){
		handlers.deleteRow(r);	
	});
};

//Not so simple for android, we will use the click event.
//if we are Android then the local variable editable will not be NULL so we can use it's value (true or false) to determine if the
//click event is to cause the row to be deleted (true) or simply propagate the click event (false)
$.table.addEventListener('click', function(r){
	if(editable == true){
		var dialog = Ti.UI.createAlertDialog({
		    buttonNames: ['Delete', 'Cancel'],
		    message: 'Delete ' + r.row.rowTitle + '?',
		    title: 'Delete'
		  });
		  dialog.addEventListener('click', function(e){
		    if (e.index === 0){
		      $.table.deleteRow(r.index,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.UP});
		      handlers.deleteRow(r);
		    };
		  });
		  dialog.show();	
	} else {
		handlers.click(r);
	};
});

