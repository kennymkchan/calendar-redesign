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

    $(calendarCell).attr("class", "calendar-cell " + " calendar-cell-" + i + " " + i);

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

var toggleStartDate = true;
$(".dropdown-menu--start-date-default").click(function() {
  if (toggleStartDate) {
    $(".dropdown-menu-start-date-options").show();
  } else {
    $(".dropdown-menu-start-date-options").hide();
  }
  toggleStartDate = !toggleStartDate;
});

$(".dropdown-start-options").click(function(event) {
  $(".dropdown-menu-start-date-heading").html(event.target.textContent);
  $(".dropdown-menu-start-date-options").hide();
  toggleStartDate = true;
});

var toggleStartTime = true;
$(".dropdown-menu--start-time-default").click(function() {
  if (toggleStartTime) {
    $(".dropdown-menu-start-time-options").show();
  } else {
    $(".dropdown-menu-start-time-options").hide();
  }
  toggleStartTime = !toggleStartTime;
});

$(".dropdown-start-time-option").click(function(event) {
  $(".dropdown-menu-start-time-heading").html(event.target.textContent);
  $(".dropdown-menu-start-time-options").hide();
  toggleStartTime = true;
});




var toggleEndDate = true;
$(".dropdown-menu--end-date-default").click(function() {
  if (toggleEndDate) {
    $(".dropdown-menu-end-date-options").show();
  } else {
    $(".dropdown-menu-end-date-options").hide();
  }
  toggleEndDate = !toggleEndDate;
});

$(".dropdown-end-options").click(function(event) {
  $(".dropdown-menu-end-date-heading").html(event.target.textContent);
  $(".dropdown-menu-end-date-options").hide();
  toggleEndDate = true;
});

var toggleEndTime = true;
$(".dropdown-menu--end-time-default").click(function() {
  if (toggleEndTime) {
    $(".dropdown-menu-end-time-options").show();
  } else {
    $(".dropdown-menu-end-time-options").hide();
  }
  toggleEndTime = !toggleEndTime;
});

$(".dropdown-end-time-option").click(function(event) {
  $(".dropdown-menu-end-time-heading").html(event.target.textContent);
  $(".dropdown-menu-end-time-options").hide();
  toggleEndTime = true;
});

var toggleCategory = true;
$(".dropdown-menu--default").click(function() {
  if (toggleCategory) {
    $(".dropdown--category-menu-option").show();
  } else {
    $(".dropdown--category-menu-option").hide();
  }
  toggleCategory = !toggleCategory;
});

$(".dropdown-category-option").click(function(event) {
  $(".dropdown-category--default-heading").html(event.target.textContent);
  $(".dropdown--category-menu-option").hide();
  toggleCategory = true;
});

var toggleReminder = true;
$(".dropdown-menu--remind-default").click(function() {
  if (toggleReminder) {
    $(".dropdown-menu-reminder-options").show();
  } else {
    $(".dropdown-menu-reminder-options").hide();
  }
  toggleReminder = !toggleReminder;
});

$(".dropdown-reminder-option").click(function(event) {
  $(".remind-me-minutes").html(event.target.textContent);
  $(".dropdown-menu-reminder-options").hide();
  toggleReminder = true;
});

var toggleRepeat = true;
$(".dropdown-menu--repeat-default").click(function() {
  if (toggleRepeat) {
    $(".repeat-options-menu").show();
  } else {
    $(".repeat-options-menu").hide();
  }
  toggleRepeat = !toggleRepeat;
});

$(".repeat-options").click(function(event) {
  $(".dropdown-repeat--default-heading").html(event.target.textContent);
  $(".repeat-options-menu").hide();
  toggleRepeat = true;
});

var toggleInvite = true;
$(".dropdown-menu--invite-default").click(function() {
  if (toggleInvite) {
    $(".invite-options-menu").show();
  } else {
    $(".invite-options-menu").hide();
  }
  toggleInvite = !toggleInvite;
});

$(".invite-options").click(function(event) {
  $(".dropdown-invite--default-heading").html(event.target.textContent);
  $(".invite-options-menu").hide();
  toggleInvite = true;
});
