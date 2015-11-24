function queryUserHabit() {
	Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
	var Habit = Parse.Object.extend("Habit");
	var objectId = Parse.User.current().id;
	var query = new Parse.Query(Habit);
	var date = new Date();
	var numberOfToday = date.getUTCDay();
	var weekdayString = "Habit List";

	// Get the day for today
	switch (numberOfToday) {
	case 0:
		weekdayString = "Habit List for Sunday<hr>";
		break;
	case 1:
		weekdayString = "Habit List for Monday<hr>";
		break;
	case 2:
		weekdayString = "Habit List for Tuesday<hr>";
		break;
	case 3:
		weekdayString = "Habit List for Wednesday<hr>";
		break;
	case 4:
		weekdayString = "Habit List for Thursday<hr>";
		break;
	case 5:
		weekdayString = "Habit List for Friday<hr>";
		break;
	case 6:
		weekdayString = "Habit List for Saturday<hr>";
		break;
	}

	query.equalTo("user", objectId);
	query.find({
		success : function (results) {

			//give a notification for an empty habit list
			var d = new Date();

			if (results.length === 0 && Parse.User.current().attributes.notification) {
				$.notify("You don't have any habits today! Press '+' to add one!", {
					globalPosition : 'bottom right'
				});
			} else {

				//give users a daily notification
				if (!Parse.User.current().get('notitoday')) {

					$.notify("Welcome " + Parse.User.current().attributes.username + "! Make sure to fill out your habits today!", {
						className : 'success',
						autoHide : false
					});

					Parse.User.current().set('notitoday', false);

					Parse.User.current().save();
				}
			}

			//give users a warning notification, day about to end
			if (d.getUTCHours() >= 0 && d.getUTCHours() < 3) {

				$.notify("Make sure to fill out your habits before midnight!", {
					className : 'warn'
				});

				Parse.User.current().set("notitoday", false);

				Parse.User.current().save();
			}

			// Do something with the returned Parse.Object values
			$('#display-Day').append(weekdayString);
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				var daysOfWeekArray = object.get('day');
				if (daysOfWeekArray[numberOfToday] == 0) {
					continue;
				}

				updateDailyCounts(object);
				updateEdits(object);

				var title = object.get('Title');
				var icon = object.get('icon');
				var queryId = object.id;
				var successC = object.get('successCount');
				var frequency = object.get('freq');
				var progressBar = "progressBar";
				var completed = "completedString";
				var integerString = i.toString();
				var resultBar = progressBar.concat(integerString);
				var resultCompleted = completed.concat(integerString);
				var totalTimesCompleted = object.get('timesCompleted');
				var totalTimes = object.get('habitTotal');
				// Get upload image url
				if (icon == "") {
					icon = object.get('iconUpload').url();
				}

				(function ($) {
					var s1 = "<li><div id='";
					var s2 = "<button id='";
					s1 = s1.concat(queryId + "'");
					s2 = s2.concat(queryId + "'");

					$('#habit-list').append('<li>' + '<ul class="habit-info">' + s1 + 'class="habit-name">' + title + '</div></li>' +
						'<li><img class="habit-icon" src="' + icon + '" alt="habit icon"></li></ul>' + '<div class="message">' + '<span class="message-total">' +
						'<div id="' + resultCompleted + '">You have completed this ' + totalTimesCompleted + ' out of ' + totalTimes + ' times.</div>' +
						'</strong><p><progress id="' + resultBar + '"; value="' + successC + '"' +
						' max="' + frequency + '"></progress></p>' +
						'</span><span class="message-today"></span>' +
						'</div>' + '<div class="habit-op" >' +
						s2 + 'type="button" class="op op-done" onclick="displayProgress(this,' + '\'' + resultBar + '\',' + '\'' + resultCompleted + '\'' + ');" title="done">' + '<img src="../img/done.svg" alt="Done"></button>' +
						'<button type="button" class="op op-edit" onclick="createSession(\'' + title + '\',\'' + queryId + '\')" title="edit habit">' + '<img src="../img/edit.svg" alt="Edit"></button>' +
						s2 + 'type="button" class="op op-del" onclick="confirmDeleteHabit(this);" title="delete habit">' + '<img src="../img/delete.svg" alt="Del"></button></div>' + '</li>');
				})(jQuery);
			}
		},
		error : function (error) {
			showAlertDialog("Database error " + error.code + ": " + error.message + ". Please refresh the app and try again.");
		}
	});
}

function queryUserHabit2() {
	Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
	var Habit = Parse.Object.extend("Habit");
	var objectId = Parse.User.current().id;
	var query = new Parse.Query(Habit);
	var date = new Date();
	var numberOfToday = date.getUTCDay();
	var weekdayString = "Other Habits<hr>";

	query.equalTo("user", objectId);
	query.find({
		success : function (results) {
			// Do something with the returned Parse.Object values
			$('#display-Day2').append(weekdayString);
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				var daysOfWeekArray = object.get('day');
				if (daysOfWeekArray[numberOfToday] == 1) {
					continue;
				}

				var title = object.get('Title');
				var icon = object.get('icon');
				var queryId = object.id;
				var completed = "completedString";
				var integerString = i.toString();
				var resultCompleted = completed.concat(integerString);
				var totalTimesCompleted = object.get('timesCompleted');
				var totalTimes = object.get('habitTotal');
				// Get upload image url
				if (icon == "") {
					icon = object.get('iconUpload').url();
				}

				(function ($) {
					var s1 = "<li><div id='";
					var s2 = "<button id='";
					s1 = s1.concat(queryId + "'");
					s2 = s2.concat(queryId + "'");

					$('#habit-list2').append('<li>' + '<ul class="habit-info">' + s1 + 'class="habit-name">' + title + '</div></li>' +
						'<li><img class="habit-icon" src="' + icon + '" alt="habit icon"></li></ul>' + '<div class="message">' + '<span class="message-total">' +
						'<div id="' + resultCompleted + '">You have completed this ' + totalTimesCompleted + ' out of ' + totalTimes + ' times.</div>' +
						'</strong><br><br></span><span class="message-today"></span>' +
						'</div>' + '<div class="habit-op" >' +
						'<button type="button" class="op op-edit" onclick="createSession(\'' + title + '\',\'' + queryId + '\')" title="edit habit">' + '<img src="../img/edit.svg" alt="Edit"></button>' +
						s2 + 'type="button" class="op op-del" onclick="confirmDeleteHabit(this);" title="delete habit">' + '<img src="../img/delete.svg" alt="Del"></button></div>' + '</li>');
				})(jQuery);
			}
		},
		error : function (error) {
			showAlertDialog("Database error " + error.code + ": " + error.message + ". Please refresh the ap and try again.");
		}
	});
}

function createSession(title, id) {
	localStorage.setItem("habitTitle", title);
	localStorage.setItem("habitId", id);
	window.location.href = "edit.html";
}

function confirmDeleteHabit(element) {
	showConfirmDialog(element);
}

function deleteHabit(element) {
	Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
	var userId = Parse.Object.extend("Habit");
	var query = new Parse.Query(userId);
	query.equalTo("objectId", element.id);
	query.find({
		success : function (results) {
			results[0].destroy({
				success : function () {
					// Remove whatever is added in createSession(...)
					localStorage.removeItem(results[0].attributes.Title);
					localStorage.removeItem(results[0].id);
				}
			});
		}
	});
}

function displayProgress(element, barId, completedId) {
	var ParseHabit = Parse.Object.extend("Habit");
	var query = new Parse.Query(ParseHabit);
	var hashTagBarId = '#';
	var hashResultBarId = hashTagBarId.concat(barId);
	var hashCompletedId = hashTagBarId.concat(completedId);

	query.equalTo("objectId", element.id);
	query.find({
		success : function (results) {
			var habit = results[0];
			var successCount = habit.attributes.successCount;
			var freq = habit.attributes.freq;
			var habitTotal = habit.attributes.habitTotal;
			var timesCompleted = habit.attributes.timesCompleted;
			var today = new Date();
			var streaksUpdatedAt = new Date(habit.attributes.streaksUpdatedAt);
			var todayString = today.toDateString();
			var streaksUpdatedAtString = streaksUpdatedAt.toDateString();
			
			/*****/
			// CRITICAL: For testing only. 1 day = 1 minute
			if (streaksUpdatedAtString == todayString &&
				streaksUpdatedAt.getUTCHours() == today.getUTCHours() &&
				streaksUpdatedAt.getUTCMinutes() == today.getUTCMinutes()) {
			/*****/
				// CRITICAL: Uncomment the line below to test daily checking instead of minute-checking
				//if(streaksUpdatedAtString == todayString) {
				if (successCount < freq) {
					successCount++;
					if (successCount == freq) {
						timesCompleted++;
						habit.set("timesCompleted", timesCompleted);
						habit.set("completed", true);
						//give a user a success notification
						$.notify("You have completed habit '" + habit.attributes.Title + "'!", 'success', {
							elementPosition : 'top'
						});
					}
					habit.set("successCount", successCount);
					habit.save();

					var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
					msgElement.innerHTML = 'Completed <strong>' + successCount +
						'/' + freq + '</strong> for today!</span>';
					msgElement.style.visibility = "visible";
					$(hashResultBarId).prop('value', successCount);
					$(hashCompletedId).html('You have completed this ' + timesCompleted + ' out of ' + habitTotal + ' times.');
				} else {
					$.notify("You have already completed '" + habit.get('Title') + "'!", 'info', {
						globalPosition : 'top right'
					});
				}
			} else {
				// Force refresh when new day, already complete notification
				window.alert("A new day has begun! Your habits have been refreshed!");
				window.location.reload(false);
			}
		}
	});
}

function updateDailyCounts(habit) {
	var today = new Date();
	var todayDay = today.getUTCDay();
	var updatedAt = new Date(habit.updatedAt);
	var streaksUpdatedAt = new Date(habit.attributes.streaksUpdatedAt);
	var todayString = today.toDateString();
	var updatedAtString = updatedAt.toDateString();
	var streaksUpdatedAtString = streaksUpdatedAt.toDateString();
	var dayArray = habit.attributes.day;

	// CRITICAL: Update field if new day. Uncomment this section to test.
	/*
		if (dayArray[todayDay] == 1) {
		if (streaksUpdatedAtString != todayString) {
			habit.set("habitTotal", habit.attributes.habitTotal + 1);
			habit.set("successCount", 0); // reset daily count
			habit.set("completed", false);
			habit.set("streaksUpdatedAt", today);
			habit.save();
		}
	}
	*/
	
	/****/
	// CRITICAL: For testing only. Update fields if new minute (1 day = 1 minute)
	if (dayArray[todayDay] == 1) {
		if (streaksUpdatedAtString != todayString ||
			streaksUpdatedAt.getUTCHours() != today.getUTCHours() ||
			streaksUpdatedAt.getUTCMinutes() != today.getUTCMinutes()) {
			habit.set("habitTotal", habit.attributes.habitTotal + 1);
			habit.set("successCount", 0); // reset daily count
			habit.set("completed", false);
			habit.set("streaksUpdatedAt", today);
			habit.save();
		}
	}
	/****/
}

/* Deal with cases where user edits habits  */
function updateEdits(habit) {
	if (habit.attributes.edited == true) {
		var completed = habit.attributes.completed;
		var successCount = habit.attributes.successCount;
		var timesCompleted = habit.attributes.timesCompleted;
		var habitTotal = habit.attributes.habitTotal;
		var freq = habit.attributes.freq;
		var dayArray = habit.attributes.day;

		if (dayArray[(new Date()).getUTCDay()] == 1) {
			// User already completed but edited the frequency to be higher
			if (completed == true) {
				if (successCount < freq) {
					habit.set('timesCompleted', timesCompleted - 1);
					habit.set('completed', false);
				}
			} else {
				// User edits freq so that it is <= successCount
				if (freq <= successCount) {
					habit.set('timesCompleted', timesCompleted + 1);
					habit.set('completed', true);
				}
			}

			habit.set('edited', false);
			habit.save();
		}
	}
}

function dateDiffInDays(d1, d2) {
	var millisecondsPerDay = 1000 * 60 * 60 * 24;
	// Discard the time and time-zone information.
	var utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
	var utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
	return Math.floor((utc2 - utc1) / millisecondsPerDay);
}

function logUserOut() {
	Parse.User.logOut();
	location.href = "login.html";
}
