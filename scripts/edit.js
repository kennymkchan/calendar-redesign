var moment = moment();
var monthHash = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

var timeslotHash = {
  0: "6am",
  1: "7am",
  2: "8am",
  3: "9am",
  4: "10am",
  5: "11am",
  6: "12pm",
  7: "1pm",
  8: "2pm",
  9: "3pm",
  10: "4pm",
  11: "5pm",
  12: "6pm",
  13: "7pm",
  14: "8pm",
  15: "9pm",
  16: "10pm",
  17: "11pm",
  18: "12am",
  19: "1am",
  20: "2am",
  21: "3am",
  22: "4am",
  23: "5am",
}

var action = getParameterByName("action");

if (action === 'addEvent') {
  $('.addEdit-header').html("Add Event");
  $('.field-date').val("November 3, 2017");
  $('.field-length').val("45min");
  $('.field-start-time').val("7:15 am");
}

if (action === 'editEvent') {
  $('.addEdit-header').html("Edit Event");
  $('.field-title').val("Catching up with bae");
  $('.field-date').val("November 3, 2017");
  $('.field-length').val("180 minutes (3 hours)");
  $('.field-start-time').val("8:45 am");
}

$(".current-date").html("Today");

var timeContainer = $(".calendar--timeslots-thin");
for (var i = 0; i < 24; i++) {
  var timeCell = document.createElement("div");
  $(timeCell).attr("class", "timeslot-cell-thin");
  $(timeCell).append("<span>" + timeslotHash[i] + "</span>");
  $(timeContainer).append(timeCell);
  var timeCell = document.createElement("div");
  $(timeCell).attr("class", "timeslot-cell-thin");
  $(timeContainer).append(timeCell);
}

var timeContainer = $(".calendar--timeslots");
for (var i = 0; i < 24; i++) {

  var timeCell = document.createElement("div");
  $(timeCell).attr("class", "timeslot-cell");
  $(timeCell).append("<span>" + timeslotHash[i] + "</span>");
  $(timeContainer).append(timeCell);
}


for (var day = 1; day < 2; day++) {

  calendarContainer = $(".calendar--day-" + day);

  // Creating the calendar cells. Each calendar cell should represent 30min,
  // so one day will have a total of 2 * 24;
  for (var i = 0; i < 48; i++) {
    var calendarCell = document.createElement("div");
    var column = "calendar-cell--column-" + day;

    $(calendarCell).attr("class", "calendar-cell " + column + " calendar-cell-" + i + " " + day + " " + i);

    $(calendarContainer).append(calendarCell);
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
