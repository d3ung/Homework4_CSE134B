/***** Define settings dialogue stuff *****/

function initializeSettingsDialog() {
	$("#ChangeSettingsDialog").dialog({
		autoOpen : false,
		modal : true,
		hide : "slideUp",
		show : "slideDown",
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
		buttons : [{
				text : "Save",
				click : function () {
					//update notifications for users
					var noti = $('#notifChance').val();
					var notiBool = (noti === 'true');
					Parse.User.current().set('notification', notiBool);
					Parse.User.current().save();
					$(this).dialog("close");
					//Add in parse settings save stuff here
				}
			}, {
				text : "Cancel",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});

	// Can add additional settings options here, just follow the format
	var settingsHTML =
		' <input type = "checkbox" id = "chkNotifications" value = "notifications" /> ' +
		' <label for = "chkNotifications">Receive Notifications</label> ';
	$("#ChangeSettingsDialog").append(settingsHTML);
}

function showSettingsDialog() {
	$("#ChangeSettingsDialog").dialog("open");
}

/***** Define confirm delete dialog stuff *****/

var habitVar;

function initializeConfirmDialog() {
	$("#ConfirmDeleteDialog").dialog({
		autoOpen : false,
		modal : true,
		hide : "slideUp",
		show : "slideDown",
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
			var confButton = $(this).next()[0].childNodes[0];
			$(confButton).attr("id", "confDelHabit");
		},
		buttons : [{
				text : "Delete",
				click : function () {
					var habitItem = habitVar.parentNode.parentNode;
					$(habitItem).slideUp();
					deleteHabit(habitVar);
					$(this).dialog("close");
				}
			}, {
				text : "Cancel",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});
	$("#ConfirmDeleteDialog").text(" Are you sure you want to delete this habit?");
}

function showConfirmDialog(habitElem) {
	var habitItem = habitElem.parentNode.parentNode;
	var habitElemName = $(habitItem).attr("id");
	$("#ConfirmDeleteDialog").dialog("option", "appendTo", habitElemName);
	$("#ConfirmDeleteDialog").dialog("open");
	habitVar = habitElem;
}

/***** Define login dialog stuff *****/

function initializeLoginDialog() {
	$("#LoginDialog").dialog({
		autoOpen : false,
		modal : true,
		hide : "slideUp",
		show : "slideDown",
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
		buttons : [{
				text : "OK",
				click : function () {
					$(this).dialog("close");
					//Add in parse settings save stuff here, confirm login
				}
			}, {
				text : "Cancel",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});
}

function showLoginDialog() {
	$("#LoginDialog").dialog("open");
}

/***** Define alert dialog stuff *****/

function initializeAlertDialog() {
	$("#AlertDialog").dialog({
		autoOpen : false,
		modal : true,
		hide : "slideUp",
		show : "slideDown",
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
		buttons : [{
				text : "OK",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});
}

function showAlertDialog(message) {
	var diag = $("#AlertDialog");
	diag.text(message);
	diag.dialog("open");
}

/***** Define notification dialog stuff *****/

function initializeNotificationDialog() {
	$("#NotificationDialog").dialog({
		autoOpen : false,
		modal : true,
		hide : "slideUp",
		show : "slideDown",
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
	});
}

function showNotificationDialog(message) {
	var diag = $("#NotificationDialog");
	diag.text(message);
	diag.dialog("open");
	// Adjust fade here...
	var duration = 3200;
	diag.fadeOut(duration, function complete() {
		diag.dialog("close");
	});
}
