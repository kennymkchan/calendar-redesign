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

var filter = false;
var addCalendarBool = true;

var day = moment.date();
var month = moment.month() + 1; // + 1 because the months start at 0
var year = moment.year();

var currDate = day + " " + monthHash[month] + ", " + year;

$(".current-date").html(currDate);

populateTimeblock();

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function populateTimeblock() {

  var title = getParameterByName("title");
  var start = getParameterByName("start");
  var end = getParameterByName("end");
  var category = getParameterByName("category");
  var location = getParameterByName("location");

  var timeblockHeight = ((end - start) * 40);
  var timeblockDisplacement = (start - 1) * 40;

  console.log(timeblockDisplacement);

  timeblockDisplacement = timeblockDisplacement + 19;

  var height = timeblockHeight;

  height = height + "px";
  var calendarEvent = document.createElement("div");
  $(calendarEvent).attr("class", "calendar-event timeblock-30 " + category);
  $(calendarEvent).append("<p style='font-size: 12px;'>" + title + "</p>");
  $(calendarEvent).append("<p style='font-weight: 100; margin-top: 0;'>" + location + "</p>");
  $(calendarEvent).append("<span>" + timeHash[start] + ' - ' + timeHash[end] + "</span>")
  $(calendarEvent).css("height", height);
  $(calendarEvent).css("top", timeblockDisplacement + 'px');
  $(calendarEvent).css("position", "absolute");
  $(".calendar--day-2").append(calendarEvent);
}

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
    var column = "calendar-cell--column-" + day;

    $(calendarEvent).attr("class", column)

    $(calendarCell).attr("class", "calendar-cell " + column + " calendar-cell-" + i + " " + day + " " + i);

    $(calendarContainer).append(calendarCell);
  }
}

function mockAppointment() {
  var calendarEvent = document.createElement("div");
  $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-1");
  $(calendarEvent).append("<p>Soccer Practice</p>");
  $(calendarEvent).append("<span>7:00am - 8:30am</span>");
  $(".calendar--day-4").append(calendarEvent);

  var calendarEvent = document.createElement("div");
  $(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-2");
  $(calendarEvent).append("<p>Catching up with bae</p>");
  $(calendarEvent).append("<span>10:45am - 1:45pm</span>")
  $(".calendar--day-5").append(calendarEvent);

  var calendarEvent = document.createElement("div");
  $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-4");
  $(calendarEvent).append("<p>Breakfast with Professor</p>");
  $(calendarEvent).append("<span>8:15am - 9:45am</span>");
  $(".calendar--day-7").append(calendarEvent);

  var calendarEvent = document.createElement("div");
  $(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-5");
  $(calendarEvent).append("<p>Interview with Google</p>");
  $(calendarEvent).append("<span>7:00am - 10:00am</span>");
  $(".calendar--day-1").append(calendarEvent);

  // Other demo events
  // var calendarEvent = document.createElement("div");
  // $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-1");
  // $(calendarEvent).append("<p>Unavailble</p>");
  // $(calendarEvent).append("<span>10:30 - 12:00 pm</span>");
  // $(".calendar--day-3").append(calendarEvent);
  // $(calendarEvent).hide();
  //
  // var calendarEvent = document.createElement("div");
  // $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-2");
  // $(calendarEvent).append("<p>Breakfast Party with department</p>");
  // $(calendarEvent).append("<span>7:20 - 8:50 am</span>");
  // $(".calendar--day-1").append(calendarEvent);
  // $(calendarEvent).hide();
  //
  // var calendarEvent = document.createElement("div");
  // $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-3");
  // $(calendarEvent).append("<p>Pick up textbooks</p>");
  // $(calendarEvent).append("<span>9:40 - 11:10 am</span>");
  // $(".calendar--day-6").append(calendarEvent);
  // $(calendarEvent).hide();
}

function removeTimeblock() {
  $(".calendar-event").remove()
}

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-1");
$(calendarEvent).append("<p>Soccer Practice</p>");
$(calendarEvent).append("<span>7:00am - 8:30am</span>");
$(".calendar--day-4").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-2");
$(calendarEvent).append("<p>Catching up with bae</p>");
$(calendarEvent).append("<span>10:45am - 1:45pm</span>")
$(".calendar--day-5").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-4");
$(calendarEvent).append("<p>Breakfast with Professor</p>");
$(calendarEvent).append("<span>8:15am - 9:45am</span>");
$(".calendar--day-7").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-5");
$(calendarEvent).append("<p>Interview with Google</p>");
$(calendarEvent).append("<span>7:00am - 10:00am</span>");
$(".calendar--day-1").append(calendarEvent);

// Other demo events
// var calendarEvent = document.createElement("div");
// $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-1");
// $(calendarEvent).append("<p>Unavailble</p>");
// $(calendarEvent).append("<span>10:30 - 12:00 pm</span>");
// $(".calendar--day-3").append(calendarEvent);
// $(calendarEvent).hide();
//
// var calendarEvent = document.createElement("div");
// $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-2");
// $(calendarEvent).append("<p>Breakfast Party with department</p>");
// $(calendarEvent).append("<span>7:20 - 8:50 am</span>");
// $(".calendar--day-1").append(calendarEvent);
// $(calendarEvent).hide();
//
// var calendarEvent = document.createElement("div");
// $(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-prof-3");
// $(calendarEvent).append("<p>Pick up textbooks</p>");
// $(calendarEvent).append("<span>9:40 - 11:10 am</span>");
// $(".calendar--day-6").append(calendarEvent);
// $(calendarEvent).hide();

// Adding onclick listener to events
$(".view-filter").click(function() {
  filterResults();
});

$('.add-calendar').click(function() {
  addProfCalendar();
});

$('.remove-calendar').click(function() {
  removeProfCalendar();
});

$('.calendar-cell').click(function(event) {

  var target = event.target;

  var classArray = $(target).attr('class').split(/\s+/);

  var day = classArray[3];
  var hour = classArray[4];

  var url = '/calendar-redesign/addEdit.html?' + '&day=' + day + '&hour' + hour;
  window.location.href = url;
});

$('.calendar-event').click(function() {
  var url = '/calendar-redesign/addEdit.html?' + '&date=known&action=editEvent&title=breakfast';
  window.location.href = url;
});

var counter = 0;

$('.right-arrow').click(function() {

  if (counter == 0) {
    removeTimeblock();
    var monday = $('.monday').html("Mon 12/4");
    var tuesday = $('.tuesday').html("Tue 12/5");
    var wednesday = $('.wednesday').html("Wed 12/6");
    var thursday = $('.thursday').html("Thu 12/7");
    var friday = $('.friday').html("Fri 12/8");
    var saturday = $('.saturday').html("Sat 12/9");
    var sunday = $('.sunday').html("Sun 12/10");
  } else {
    mockAppointment();
    var monday = $('.monday').html("Mon 11/27");
    var tuesday = $('.tuesday').html("Tue 11/28");
    var wednesday = $('.wednesday').html("Wed 11/29");
    var thursday = $('.thursday').html("Thu 11/30");
    var friday = $('.friday').html("Fri 12/1");
    var saturday = $('.saturday').html("Sat 12/2");
    var sunday = $('.sunday').html("Sun 12/3");
  }

  counter = counter + 1;
});

$('.left-arrow').click(function() {

  if (counter == 0) {
    removeTimeblock();
    var monday = $('.monday').html("Mon 11/20");
    var tuesday = $('.tuesday').html("Tue 11/21");
    var wednesday = $('.wednesday').html("Wed 11/22");
    var thursday = $('.thursday').html("Thu 11/23");
    var friday = $('.friday').html("Fri 11/24");
    var saturday = $('.saturday').html("Sat 11/25");
    var sunday = $('.sunday').html("Sun 11/26");
  } else {
    mockAppointment();
    var monday = $('.monday').html("Mon 11/27");
    var tuesday = $('.tuesday').html("Tue 11/28");
    var wednesday = $('.wednesday').html("Wed 11/29");
    var thursday = $('.thursday').html("Thu 11/30");
    var friday = $('.friday').html("Fri 12/1");
    var saturday = $('.saturday').html("Sat 12/2");
    var sunday = $('.sunday').html("Sun 12/3");
  }
  counter = counter - 1;
});

function filterResults() {
  if (!filter) {
    $('.timeblock-2').hide();
    $('.timeblock-3').hide();
    $('.timeblock-4').hide();
  } else {
    $('.timeblock-2').show();
    $('.timeblock-3').show();
    $('.timeblock-4').show();
  }
  filter = !filter;
}

function addProfCalendar() {
  if (addCalendarBool) {
    $('.timeblock-prof-1').show();
    $('.timeblock-prof-2').show();
    $('.timeblock-prof-3').show();
  }
  addCalendarBool = false;
}

function removeProfCalendar() {
  if (!addCalendarBool) {
    $('.timeblock-prof-1').hide();
    $('.timeblock-prof-2').hide();
    $('.timeblock-prof-3').hide();
  }
  addCalendarBool = true;
}


// Calendar Widget on the side
!function() {

  var today = moment;

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment.date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
      window.setTimeout(function() {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();
  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;

    this.events.forEach(function(ev) {
     ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    });


    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
    outer.addEventListener('click', function() {
      self.openDay(this);
    });

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if(currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if(currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function(memo, ev) {
      if(ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  }

  Calendar.prototype.renderEvents = function(events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function(ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if(!events.length) {
      var div = createElement('div', 'event empty');

    }

    if(currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

!function() {
  var data = [
    { eventName: 'App Demo', color: 'orange' },
    { eventName: 'Lunch', color: 'orange' },
    { eventName: 'Bowling', color: 'orange' },
    { eventName: 'Soccer', color: 'orange' },
    { eventName: 'Dinner', color: 'orange' },
    { eventName: 'Project', color: 'orange' },
    { eventName: 'Homework - Calc', color: 'orange' },
    { eventName: 'Breakfast', color: 'orange' },
    { eventName: 'The game', color: 'orange' },
  ];

  function addDate(ev) {

  }

  var calendar = new Calendar('#calendar', data);

}();
