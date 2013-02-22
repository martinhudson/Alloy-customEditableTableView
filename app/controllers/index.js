$.index.open();

var editMode = false;

//create some data to put in the table
var rows = [];
for(var i=0;i<10;i++){
	var view = Ti.UI.createView({height:'60dp', backgroundColor:'transparent'});
	var lbl = Ti.UI.createLabel({
		text:'Row number ' + i,
		font:{"fontSize": "20dp"},
		left:'10dp',
		height:'50dp',
		right:'10dp',
		color:'black'
	});
	view.add(lbl);
	var row = Ti.UI.createTableViewRow({
		height:'60dp',
		rowTitle:'Row number ' + i});
	row.add(view);
	
	rows.push(row);
};
$.table1.setData(rows);  //call the "setData" method we created in the widget

//listen for events coming back from the widget
$.table1.addEventListener('click', function(r){
	Ti.API.info('row clicked: ' + JSON.stringify(r));
	var dialog = Ti.UI.createAlertDialog({
	    message: r.row.rowTitle,
	    title: 'Clicked'
	  });
	  dialog.show();
});

$.table1.addEventListener('delete', function(r){
	Ti.API.info('row deleted: ' + JSON.stringify(r));
	var dialog = Ti.UI.createAlertDialog({
	    message: r.row.rowTitle,
	    title: 'Deleted'
	  });
	  dialog.show();
});

//toggle the "editable" mode of the table
function btnEdit_click_Event(){
	if(editMode){
		$.btnEdit.title = "Allow Editing";
		editMode = false;
	} else {
		$.btnEdit.title = "Cancel Editing";
		editMode = true;
	};
	$.table1.editing(editMode);  //call the "editing" method we created in the widget
};

