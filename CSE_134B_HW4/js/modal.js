/***** Define settings dialog stuff *****/

function initializeSettingsDialog() {
	$("#ChangeSettingsDialog").dialog({
		dialogClass : "no-close",
		autoOpen : false,
		modal : true,
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
		buttons : [{
				text : "Save",
				click : function () {
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
		' <input type = "checkbox" id = "chkNotifications" value = "notifications" />				' +
		' <label for = "chkNotifications">Receive Notifications</label>		';

	$("#ChangeSettingsDialog").append(settingsHTML);
}

function showSettingsDialog() {
	$("#ChangeSettingsDialog").dialog("open");
}

/***** Define confirm delete dialog stuff *****/

function initializeConfirmDialog() {
	$("#ConfirmDeleteDialog").dialog({
		autoOpen : false,
		modal : true,
		open : function (event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
		buttons : [{
				text : "Delete",
				click : function () {
					$(this).dialog("close");
					$(habitItem).slideUp(
						function complete() {
						$(habitElem).addClass("deleteThisHabit");
					});
					//Add in parse settings to delete stuff here
				}
			}, {
				text : "Cancel",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});

	$("#ConfirmDeleteDialog").text("Are you sure you want to delete this habit?")
}

function showConfirmDialog(habitElem) {
	var habitItem = habitElem.parentNode.parentNode;
	var habitElemName = $(habitItem).attr("id");
	$("#ConfirmDeleteDialog").dialog("option", "appendTo", habitElemName);
	$("#ConfirmDeleteDialog").dialog("open");
}

/***** Define login dialog stuff *****/

function initializeLoginDialog() {
	$("#LoginDialog").dialog({
		dialogClass : "no-close",
		autoOpen : false,
		modal : true,
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

	$("#ChangeSettingsDialog").text("Are you sure you want to do this?");
}

function showSettingsDialog() {
	$("#ChangeSettingsDialog").dialog("open");
}
