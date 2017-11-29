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

var dateHash = {
  1: "Nov 27, 2017",
  2: "Nov 28, 2017",
  3: "Nov 29, 2017",
  4: "Nov 30, 2017",
  5: "Dec 1, 2017",
  6: "Dec 2, 2017",
  7: "Dec 3, 2017",
}

var timeHash = {
  1: "6:00am",
  2: "6:30am",
  3: "7:00am",
  4: "7:30am",
  5: "8:00am",
  6: "8:30am",
  7: "9:00am",
  8: "9:30am",
  9: "10:00am",
  10: "10:30am",
  11: "11:00am",
  12: "11:30am",
  13: "12:00pm",
  14: "12:30pm",
  15: "1:00pm",
  16: "1:30pm",
  17: "2:00pm",
  18: "2:30pm",
  19: "3:00pm",
  20: "3:30pm",
  21: "4:00pm",
  22: "4:30pm",
  23: "5:00pm",
  24: "5:30pm",
  25: "6:00pm",
  26: "6:30pm",
  27: "7:00pm",
  28: "7:30pm",
  29: "8:00pm",
  30: "8:30pm",
  31: "9:00pm",
  32: "9:30pm",
  33: "10:00pm",
  34: "10:30pm",
  35: "11:00pm",
  36: "11:30pm",
  37: "12:00am",
  38: "12:30am",
  39: "1:00am",
  40: "1:30am",
  41: "2:00am",
  42: "2:30am",
  43: "3:00am",
  44: "3:30am",
  45: "4:00am",
  46: "4:30am",
  47: "5:00am",
  48: "5:30am",
}

function invert(obj) {
  var new_obj = {};

  for (var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }
  return new_obj;
};

reverseTimeHash = invert(timeHash);
reverseDateHash = invert(dateHash);

var action = getParameterByName("action");

prepopulate();

if (action === 'addEvent') {
  $('.addEdit-header').html("Add Event");
}

if (action === 'editEvent') {
  $('.addEdit-header').html("Edit Event");
}

$(".current-date").html("Today");

function prepopulate() {
  var hour = parseInt(getParameterByName("hour")) + 1;
  var day = parseInt(getParameterByName("day"));

  if (hour && day) {
    var suggestedEnd = hour + 2;
    var startTime = $('.dropdown-menu-start-time-heading').html(timeHash[parseInt(hour)]);
    var startDate = $('.dropdown-menu-start-date-heading').html(dateHash[day]);
    var endDate = $('.dropdown-menu-end-date-heading').html(dateHash[day]);
    var endTime = $('.dropdown-menu-end-time-heading').html(timeHash[parseInt(suggestedEnd)]);
  }
}

$(".title-input-text").focusout(function() {
    createTimeBlock();
});

$(".form--location-text-input").focusout(function() {
    createTimeBlock();
});

$('.save-calendar--btn').click(function() {

  var canProceed = true;

  $('.title-error').hide();
  $('.date-error').hide();

  var title = $(".title-input-text").val() || '';
  var start = $('.dropdown-menu-start-time-heading').html() || '';
  var end = $('.dropdown-menu-end-time-heading').html() || '';
  var category = $('.dropdown-category--default-heading').html() || '';
  var location = $(".form--location-text-input").val() || '';
  var startDate = $('.dropdown-menu-start-date-heading').html() || 3;

  if (title == '') {
    $('.title-error').show();
    canProceed = false;
  }

  if (parseInt(reverseTimeHash[start]) >= parseInt(reverseTimeHash[end])) {
    $('.date-error').show();
    canProceed = false;
  }

  if (canProceed) {
    if (category == "4A study term") {
      categoryClass = 'timeblock-1';
    } else if (category == "Personal event") {
      categoryClass = 'timeblock-2';
    } else {
      categoryClass = 'timeblock-3';
    }

    var url = '/calendar-redesign?'
            + '&title=' + title
            + '&start=' + reverseTimeHash[start]
            + '&end=' + reverseTimeHash[end]
            + '&category=' + categoryClass
            + '&date=' + reverseDateHash[startDate]
            + '&location=' + location;

    window.location.href = url;
  }
});

function createTimeBlock() {

  var boolTitle = true;

  var title = $(".title-input-text").val();
  if (title === '') {
    boolTitle = false;
  }
  var start = $('.dropdown-menu-start-time-heading').html();
  var end = $('.dropdown-menu-end-time-heading').html();
  var category = $('.dropdown-category--default-heading').html();
  var location = $(".form--location-text-input").val();

  var categoryClass = '';
  if (category == "4A study term") {
    categoryClass = 'timeblock-1';
  } else if (category == "Personal event") {
    categoryClass = 'timeblock-2';
  } else {
    categoryClass = 'timeblock-3';
  }

  var startTime = reverseTimeHash[start];
  var endTime = reverseTimeHash[end];

  var timeblockHeight = ((endTime - startTime) * 41) + 5;
  var timeblockDisplacement = (startTime - 1) * 40;

  if (timeblockHeight > 0) {

    if (!boolTitle) {
      title = "Undefined";
    }

    var height = timeblockHeight + "px";
    var displacement = timeblockDisplacement + 'px';

    var calendarEvent = document.createElement("div");
    $(calendarEvent).attr("class", "calendar-event timeblock " + categoryClass);
    $(calendarEvent).append("<p style='font-size: 14px;'>" + title + "</p>");
    $(calendarEvent).append("<p style='font-weight: 100; margin-top: 0;'>" + location + "</p>");
    $(calendarEvent).css("height", height);
    $(calendarEvent).css("top", displacement);
    $(calendarEvent).css("position", "absolute");
    $(".calendar--day-1").append(calendarEvent);
  }
}

function deleteTimeblocks() {
  $(".timeblock").remove()
}

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
  deleteTimeblocks();
  createTimeBlock();
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
  deleteTimeblocks();
  createTimeBlock();
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
  deleteTimeblocks();
  createTimeBlock();
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
