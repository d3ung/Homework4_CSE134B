function queryEditHabit() {
	Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
	var Habit = Parse.Object.extend("Habit");
	var objectId = Parse.User.current().id;
	var query = new Parse.Query(Habit);

	query.equalTo("user", objectId);
	query.find({
		success : function (results) {
			for (var i = 0; i < results.length; i++) {
				if (results[i].id == localStorage.getItem("habitId")) {
					var object = results[i];
					var title = object.get('Title');
					var array = object.get('day');
					var weekdayArray = object.get('day');
					var sundayBox = '<label> <input id="sunday" type="checkbox" name="date" value="sunday""><span>Sun</span></label>';
					var mondayBox = '<label> <input id="monday" type="checkbox" name="date" value="monday"><span>Mon</span></label>';
					var tuesdayBox = '<label> <input id="tuesday" type="checkbox" name="date" value="tuesday"><span>Tues</span></label>';
					var wednesdayBox = '<label> <input id="wednesday" type="checkbox" name="date" value="wednesday"><span>Wed</span></label>';
					var thursdayBox = '<label> <input id="thursday" type="checkbox" name="date" value="thursday"><span>Thur</span></label>';
					var fridayBox = '<label> <input id="friday" type="checkbox" name="date" value="friday"><span>Fri</span></label>';
					var saturdayBox = '<label> <input id="saturday" type="checkbox" name="date" value="saturday"><span>Sat</span></label>';
					var frequency = object.get('freq');
					var freqBox1 = '<label> <input id="frequency_one" onclick="clearOther1();" type="checkbox" name="day" value="one"><span>1</span></label>';
					var freqBox2 = '<label> <input id="frequency_two" onclick="clearOther2();" type="checkbox" name="day" value="two"><span>2</span></label>';
					var freqBox3 = '<label> <input id="frequency_three" onclick="clearOther3();" type="checkbox" name="day" value="three"><span>3</span></label>';
					var freqOther = '<p><label><span id="others_text">Others: </span></label></p><p><input id="others" type="text" name="day" placeholder="More than 3 times"></p>';

					switch (frequency) {
					case 1:
						freqBox1 = '<label> <input id="frequency_one" onclick="clearOther1();" type="checkbox" name="day" value="one" checked><span>1</span></label>';
						break;
					case 2:
						freqBox2 = '<label> <input id="frequency_two" onclick="clearOther2();" type="checkbox" name="day" value="two" checked><span>2</span></label>';
						break;
					case 3:
						freqBox3 = '<label> <input id="frequency_three" onclick="clearOther3();" type="checkbox" name="day" value="three" checked><span>3</span></label>';
						break;
					default:
						freqOther = '<p><label><span id="others_text">Others: </span></label></p><p><input id="others" type="text" name="day" placeholder="More than 3 times" value=' + frequency + '></p>';
					}

					var icon = object.get('icon');

					//Icon section
					if (icon == "") {
						icon = object.get('iconUpload').url();
					}

					//Weekly Frequency
					if (weekdayArray[0] == 1) {
						sundayBox = '<label> <input id="sunday" type="checkbox" name="date" value="sunday" checked><span>Sun</span></label>';
					}
					if (weekdayArray[1] == 1) {
						mondayBox = '<label> <input id="monday" type="checkbox" name="date" value="monday" checked><span>Mon</span></label>';
					}
					if (weekdayArray[2] == 1) {
						tuesdayBox = '<label> <input id="tuesday" type="checkbox" name="date" value="tuesday" checked><span>Tues</span></label>';
					}
					if (weekdayArray[3] == 1) {
						wednesdayBox = '<label> <input id="wednesday" type="checkbox" name="date" value="wednesday" checked><span>Wed</span></label>';
					}
					if (weekdayArray[4] == 1) {
						thursdayBox = '<label> <input id="thursday" type="checkbox" name="date" value="thursday" checked><span>Thur</span></label>';
					}
					if (weekdayArray[5] == 1) {
						fridayBox = '<label> <input id="friday" type="checkbox" name="date" value="friday" checked><span>Fri</span></label>';
					}
					if (weekdayArray[6] == 1) {
						saturdayBox = '<label> <input id="saturday" type="checkbox" name="date" value="saturday" checked><span>Sat</span></label>';
					}
					(function ($) {
						$('#edit-forms').append('<p><label><span id="title_text">' + 'Habit Title' + '</span></label></p>' +
							'<p><input id="title" type="text" name="fullname" value="' + title + '"></p>' +
							'<p><label>Habit Icon</label></p>' + '<center>' +
							'<img id="icon1" class="icon" onclick="selectImage(\'icon1\');" src="../img/sleep.jpg" alt="sleep image"/>' +
							'<img id="icon2" class="icon" onclick="selectImage(\'icon2\');" src="../img/salad.jpg" alt="eat image"/>' +
							'<img id="icon3" class="icon" onclick="selectImage(\'icon3\');" src="../img/run.jpg" alt="run image"/>' +
							'<img id="icon4" type="button" class="icon" onclick="selectImage(\'icon4\');" src="../img/add.png" alt="find a image"/>' +
							'<input type="file" style="display:none;" name="selection" id="icon4Upload" value="" accept="image/jpeg"/>' + '</center>' +
							'<p><label>Weekly Frequency</label></p>' +
							'<div id="ck-button">' + sundayBox + mondayBox + tuesdayBox + wednesdayBox + thursdayBox + fridayBox + saturdayBox + '</div>' +
							'<p><label>Daily Frequency</label></p>' +
							'<div id="daily-button">' + freqBox1 + freqBox2 + freqBox3 + '<span id="times">times</span></div>' + freqOther +
							'<p id="add_buttons"><input id="cancel" type="button" value="Cancel" onclick="cancelEditHabit();"><input id="save" type="button" value="Save It" onclick="editCheckScript()"></p>');
					})(jQuery);
					break;
				}
			}
		},
		error : function (error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function editHabit() {
	Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
	var Habit = Parse.Object.extend("Habit");
	var query = new Parse.Query(Habit);
	var title = document.getElementById('title').value;
	var icon;
	var weekArray = [0, 0, 0, 0, 0, 0, 0];
	var fileUploadControl;
	var parseFile;
	var frequency = 0;
	var weekdaysSelected = 0;
	var nanFlag = 0;
	if (document.getElementById('icon1').className == "icon active") {
		icon = '../img/sleep.jpg';
	} else if (document.getElementById('icon2').className == "icon active") {
		icon = '../img/salad.jpg';
	} else if (document.getElementById('icon3').className == "icon active") {
		icon = '../img/run.jpg';
	} else if (document.getElementById('icon4').className == "icon active") {
		fileUploadControl = $("#icon4Upload")[0];
		if (fileUploadControl.files.length > 0) {
			file = fileUploadControl.files[0];
			name = "photo.jpg";
			parseFile = new Parse.File(name, file);
		}
		parseFile.save().then(function () {
			// The file has been saved to Parse.
		}, function (error) {
			// The file either could not be read, or could not be saved to Parse.
		});
	} else {
		icons = '../img/no-image.jpg';
	}

	if (document.getElementById('sunday').checked) {
		weekArray[0] = 1;
		weekdaysSelected++;
	}
	if (document.getElementById('monday').checked) {
		weekArray[1] = 1;
		weekdaysSelected++
	}
	if (document.getElementById('tuesday').checked) {
		weekArray[2] = 1;
		weekdaysSelected++
	}
	if (document.getElementById('wednesday').checked) {
		weekArray[3] = 1;
		weekdaysSelected++;
	}
	if (document.getElementById('thursday').checked) {
		weekArray[4] = 1;
		weekdaysSelected++
	}
	if (document.getElementById('friday').checked) {
		weekArray[5] = 1;
		weekdaysSelected++;
	}
	if (document.getElementById('saturday').checked) {
		weekArray[6] = 1;
		weekdaysSelected++;
	}

	if (document.getElementById('others').value == 0) {
		if (document.getElementById('frequency_one').checked) {
			frequency = 1;
		}
		if (document.getElementById('frequency_two').checked) {
			frequency = 2;
		}
		if (document.getElementById('frequency_three').checked) {
			frequency = 3;
		}
	} else {
		document.getElementById('frequency_one').checked = false;
		document.getElementById('frequency_two').checked = false;
		document.getElementById('frequency_three').checked = false;
		if (isNaN(document.getElementById('others').value)) {
			nanFlag = 1;
		} else {
			frequency = parseInt(document.getElementById('others').value);
		}
	}

	if (weekdaysSelected == 0 && frequency <= 0) {
		showAlertDialog('Please select your weekly frequency and also input or select your daily frequency');
	} else if (weekdaysSelected == 0) {
		showAlertDialog('Please select some of the weekly to track your habits.');
	} else if (nanFlag) {
		showAlertDialog('Please input a number and not characters for your daily frequency.');
	} else if (frequency <= 0) {
		showAlertDialog('Please input or select your daily frequency to a value greater than 0.');
	} else {
		query.get(localStorage.getItem("habitId"), {
			success : function (results) {
				results.set('Title', title);
				if (document.getElementById('icon4').className == "icon active") {
					results.set('icon', "")
				} else {
					results.set('icon', icon);
				}
				results.set('iconUpload', parseFile);
				results.set('day', weekArray);
				results.set('freq', frequency);
				results.set('edited', true);
				results.save(null, {
					success : function () {
						location.href = "list.html";
					}
				});
			},
			error : function (error) {
				showAlertDialog("Error: " + error.code + " " + error.message);
			}
		});
	}
}

function clearOther1() {
	document.getElementById('others').value = '';
	$('#frequency_two').prop('checked', false);
	$('#frequency_three').prop('checked', false);
}

function clearOther2() {
	document.getElementById('others').value = '';
	$('#frequency_one').prop('checked', false);
	$('#frequency_three').prop('checked', false);
}

function clearOther3() {
	document.getElementById('others').value = '';
	$('#frequency_one').prop('checked', false);
	$('#frequency_two').prop('checked', false);
}

function cancelEditHabit() {
	window.location = "./list.html";
}
