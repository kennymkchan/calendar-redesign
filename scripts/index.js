console.log("Confirmed JS working");

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
  0: "12am",
  1: "1am",
  2: "2am",
  3: "3am",
  4: "4am",
  5: "5am",
  6: "6am",
  7: "7am",
  8: "8am",
  9: "9am",
  10: "10am",
  11: "11am",
  12: "12pm",
  13: "1pm",
  14: "2pm",
  15: "3pm",
  16: "4pm",
  17: "5pm",
  18: "6pm",
  19: "7pm",
  20: "8pm",
  21: "9pm",
  22: "10pm",
  23: "11pm",
}

var day = moment.date();
var month = moment.month() + 1; // + 1 because the months start at 0
var year = moment.year();

var currDate = day + " " + monthHash[month] + ", " + year;

console.log("Today date: " + currDate);

$(".current-date").html(currDate);

// Create the timeslot column on the side
// Only need 24 because there are 24 hours in the day. Each hour will have
// 2 timeslot cells (As coded below)

var timeContainer = $(".calendar--timeslots");
for (var i = 0; i < 24; i++) {

  var timeCell = document.createElement("div");
  $(timeCell).attr("class", "timeslot-cell");
  $(timeCell).append("<span>" + timeslotHash[i] + "</span>");
  $(timeContainer).append(timeCell);
}

var timeContainer = $(".calendar--timeslots-thin");
for (var i = 0; i < 24; i++) {

  var timeCell = document.createElement("div");
  $(timeCell).attr("class", "timeslot-cell-thin");
  $(timeCell).append("<span>" + timeslotHash[i] + "</span>");
  $(timeContainer).append(timeCell);
}


// Loop through the different days in the week and append the timeslots
for (var day = 1; day < 8; day++) {

  calendarContainer = $(".calendar--day-" + day);

  // Creating the calendar cells. Each calendar cell should represent 30min,
  // so one day will have a total of 2 * 24;
  for (var i = 0; i < 48; i++) {
    var calendarCell = document.createElement("div");
    if (i < 47) {
      $(calendarCell).attr("class", "calendar-cell");
    } else {
      console.log("Hello");
      $(calendarCell).attr("class", "calendar-cell--last calendar-cell");
    }
    $(calendarContainer).append(calendarCell);
  }
}

for (var day = 1; day < 8; day++) {

  calendarContainer = $(".calendar--wide-" + day);

  // Creating the calendar cells. Each calendar cell should represent 30min,
  // so one day will have a total of 2 * 24;
  for (var i = 0; i < 48; i++) {
    var calendarCell = document.createElement("div");
    if (i < 47) {
      $(calendarCell).attr("class", "calendar-cell-wide");
    } else {
      $(calendarCell).attr("class", "calendar-cell--last calendar-cell");
    }
    $(calendarContainer).append(calendarCell);
  }
}



console.log("Day of week: " + moment.isoWeekday()); // Sunday = 7; Monday = 1
