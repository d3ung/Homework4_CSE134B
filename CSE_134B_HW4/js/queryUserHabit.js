function queryUserHabit() {
  Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
  var Habit = Parse.Object.extend("Habit");
  var objectId = Parse.User.current().id;
  var query = new Parse.Query(Habit);
  var date = new Date();
  var numberOfToday = date.getDay();
  var weekdayString = "Habit List";

  // Get the day for today
  /*switch (numberOfToday) {
    case 0:
      weekdayString = "Habit List for Sunday";
      break;
    case 1:
      weekdayString = "Habit List for Monday";
      break;
    case 2:
      weekdayString = "Habit List for Tuesday";
      break;
    case 3:
      weekdayString = "Habit List for Wednesday";
      break;
    case 4:
      weekdayString = "Habit List for Thursday";
      break;
    case 5:
      weekdayString = "Habit List for Friday";
      break;
    case 6:
      weekdayString = "Habit List for Saturday";
      break;
  }*/

  query.equalTo("user", objectId);
  query.find({
    success : function (results) {
      // Do something with the returned Parse.Object values
      $('#display-Day').append(weekdayString);
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var daysOfWeekArray = object.get('day');
        var title = object.get('Title');
        var icon = object.get('icon');
        var queryId = object.id;
        var currentStreak = object.get('currentStreak');
        var successC = object.get('successCount');
        var bestStreak = object.get('bestStreak');
        var frequency = object.get('freq');
        var progressBar = "progressBar";
        var completed = "completedString";
        var integerString = i.toString();
        var resultBar = progressBar.concat(integerString);
        var resultCompleted = completed.concat(integerString);
        var totalTimesCompleted = object.get('timesCompleted');
        var totalTimes = object.get('habitTotal');
        if (daysOfWeekArray[numberOfToday] == 0) {
          continue;
        }
        // Get upload image url
        if (icon == "") {
          icon = object.get('iconUpload').url();
        }

        updateStreaks(object);

        (function ($) {
          var s1 = "<li><div id='";
          var s2 = "<button id='";
          s1 = s1.concat(queryId + "'");
          s2 = s2.concat(queryId + "'");

          // Jack progress bar Text
          /*$('#habit-list').append('<li>' + '<ul class="habit-info">' + s1 + 'class="habit-name">' + title + '</div></li>' +
          '<li><img class="habit-icon" src="' + icon + '" alt="habit icon"></li></ul>' + '<div class="message">' + '<span class="message-total">' +
          '<strong>' + currentStreak + '</strong>' +
          ' days in a row! Best record: <strong>' + bestStreak +
          '</strong><br><progress id="'+ resultBar + '"; value="' + currentStreak + '"' +
          ' max="' + frequency + '"></progress><br>' +
          '</span><span class="message-today"></span>' +
          '</div>' + '<div class="habit-op">' +
          s2 + 'type="button" class="op op-done" onclick="displayProgress(this,' + '\'' + resultBar + '\''+ ');" title="done">' + '<img src="../img/done.svg" alt="Done"></button>' +
          '<button type="button" class="op op-edit" onclick="createSession(\'' + title + '\',\'' + queryId + '\')" title="edit habit">' + '<img src="../img/edit.svg" alt="Edit"></button>' +
          s2 + 'type="button" class="op op-del" onclick="deleteHabit(this);" title="delete habit">' + '<img src="../img/delete.svg" alt="Del"></button></div>' + '</li>');
          })(jQuery);*/
          $('#habit-list').append('<li>' + '<ul class="habit-info">' + s1 + 'class="habit-name">' + title + '</div></li>' +
            '<li><img class="habit-icon" src="' + icon + '" alt="habit icon"></li></ul>' + '<div class="message">' + '<span class="message-total">' +
            '<div id="' + resultCompleted + '">You have complete this ' + totalTimesCompleted + ' out of ' + totalTimes + ' times.</div>' +
            '</strong><p><progress id="' + resultBar + '"; value="' + successC + '"' +
            ' max="' + frequency + '"></progress></p>' +
            '</span><span class="message-today"></span>' +
            '</div>' + '<div class="habit-op" >' +
            s2 + 'type="button" class="op op-done" onclick="displayProgress(this,' + '\'' + resultBar + '\',' + '\'' + resultCompleted + '\'' + ');" title="done">' + '<img src="../img/done.svg" alt="Done"></button>' +
            '<button type="button" class="op op-edit" onclick="createSession(\'' + title + '\',\'' + queryId + '\')" title="edit habit">' + '<img src="../img/edit.svg" alt="Edit"></button>' +
            s2 + 'type="button" class="op op-del" onclick="deleteHabit(this);" title="delete habit">' + '<img src="../img/delete.svg" alt="Del"></button></div>' + '</li>');
        })(jQuery);
      }
    },
    error : function (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function createSession(title, id) {
  localStorage.setItem("habitTitle", title);
  localStorage.setItem("habitId", id);
  window.location.href = "edit.html";
}

function deleteHabit(element) {
  Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
  var userId = Parse.Object.extend("Habit");
  var query = new Parse.Query(userId);
  query.equalTo("objectId", element.id);
  query.find({
      success : function (results) {
          results[0].destroy({
              success: function() {
                  // Remove whatever is added in createSession(...)
                  localStorage.removeItem(results[0].attributes.Title);
                  localStorage.removeItem(results[0].id);
              }
          });
      }
  });

  var child = element.parentNode.parentNode;
  var parent = child.parentNode;
  parent.removeChild(child);
}

function displayProgress(element, barId, completedId) {
    var ParseHabit = Parse.Object.extend("Habit");
    var query = new Parse.Query(ParseHabit);
    var hashTagBarId = '#';
    var hashResultBarId = hashTagBarId.concat(barId);
    var hashCompletedId = hashTagBarId.concat(completedId);
    query.equalTo("objectId", element.id);
    query.find(
    {
      success : function (results) {
          var habit = results[0];
          var successCount = habit.attributes.successCount;
          var freq = habit.attributes.freq;
          var currentStreak = habit.attributes.currentStreak;
          var totalTimes = habit.attributes.habitTotal;
          var today = new Date();
          var todayString = today.toDateString();
          var streaksUpdatedAt = new Date(habit.attributes.streaksUpdatedAt);
          var streaksUpdatedAtString = streaksUpdatedAt.toDateString();
          var timesCompleted = habit.attributes.timesCompleted;
          var yyy = new Date(habit.attributes.streaksUpdatedAt); //for testing

          //                if(streaksUpdatedAtString == todayString) {
          //if(today.getUTCMinutes() == yyy.getUTCMinutes()) {  // for testing
          if (successCount < freq) {
              successCount++;
              if (successCount == freq) {
                  timesCompleted++;
              }
              habit.set("successCount", successCount);
              habit.set("currentStreak", currentStreak);
              habit.set("timesCompleted", timesCompleted);
              habit.save();
              var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
              msgElement.innerHTML = 'Completed <strong>' + successCount +
                  '/' + freq + '</strong> for today!</span>';
              msgElement.style.visibility = "visible";
              $(hashResultBarId).prop('value', successCount);
              $(hashCompletedId).html('You have complete this ' + timesCompleted + ' out of ' + totalTimes + ' times.');
          } else {
              // Force refresh with new day message.
              //alert('A new day has begun! Refreshing page...');
              alert('You are done with this habit for the day!');
              //location.reload(false);
          }
      }
    });
}

function updateStreaks(habit) {
  /*
  var today = new Date();
  var updatedAt = new Date(habit.updatedAt);
  var streaksUpdatedAt = new Date(habit.attributes.streaksUpdatedAt);

  var todayString = today.toDateString();
  var updatedAtString = updatedAt.toDateString();
  var streaksUpdatedAtString = streaksUpdatedAt.toDateString();

  // Update fields if new day
  if(updatedAtString != todayString || streaksUpdatedAtString != todayString) {
  var successCount = habit.get('successCount');
  var currentStreak = habit.get('currentStreak');
  var bestStreak = habit.get('bestStreak');
  var freq = habit.get('freq');


  // Update best streak
  if(successCount >= freq) {
  currentStreak++;
  if(currentStreak > bestStreak) {
  habit.set('bestStreak', currentStreak);
  }
  } else {
  currentStreak = 0;
  }

  // Reset current streak if more than one day since last update
  if(streaksUpdatedAt.getUTCFullYear() == today.getUTCFullYear() &&
  streaksUpdatedAt.getUTCMonth() == today.getUTCMonth() &&
  today.getDate() - streaksUpdatedAt.getDate() != 1) {
  currentStreak = 0;
  }

  habit.set("currentStreak", currentStreak);
  habit.set("successCount", 0);  // reset daily count
  habit.set("streaksUpdatedAt", today);
  habit.save();
  }
  }
   */

  // Everything below here is the same as above but with
  // periods of 1 day = 1 minute.
  // Delete everything below here once done testing
  var today = new Date();
  var updatedAt = new Date(habit.updatedAt);
  var streaksUpdatedAt = new Date(habit.attributes.streaksUpdatedAt);

  var xxx = updatedAt;
  var zzz = streaksUpdatedAt;

  // Update fields if new minute
  if (xxx.getUTCMinutes() != today.getUTCMinutes() || zzz.getUTCMinutes() != today.getUTCMinutes()) {
    var successCount = habit.get('successCount');
    var currentStreak = habit.get('currentStreak');
    var bestStreak = habit.get('bestStreak');
    var freq = habit.get('freq');
    var totalTimes = habit.get('habitTotal');
    // Update best streak
    if (successCount >= freq) {
      currentStreak++;
      if (currentStreak > bestStreak) {
        habit.set('bestStreak', currentStreak);
      }
    } else {
      currentStreak = 0;
    }

    if (streaksUpdatedAt.getUTCHours() == today.getUTCHours() &&
      today.getUTCMinutes() - streaksUpdatedAt.getUTCMinutes() != 1) {
      // More than one minute since last streak update
      currentStreak = 0;
    }
    totalTimes++;
    habit.set("currentStreak", currentStreak);
    habit.set("successCount", 0); // reset minutely count
    habit.set("streaksUpdatedAt", today);
    habit.set("habitTotal", totalTimes);
    habit.save();
  }
}

function loginCheck() {
  Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
  if (Parse.User.current() == null) {
    location.href = "login.html";
  }
}

function logUserOut() {
  Parse.User.logOut();
  location.href = "login.html";
}
