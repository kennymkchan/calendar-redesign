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
      $(calendarCell).attr("class", "calendar-cell--last calendar-cell");
    }
    $(calendarContainer).append(calendarCell);
  }
}

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-1");
$(".calendar--day-4").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-2");
$(".calendar--day-5").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--30 timeblock-3");
$(".calendar--day-2").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-4");
$(".calendar--day-7").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--120 timeblock-5");
$(".calendar--day-1").append(calendarEvent);

var calendarEvent = document.createElement("div");
$(calendarEvent).attr("class", "calendar-event timeblock--60 timeblock-6");
$(".calendar--day-5").append(calendarEvent);


console.log("Day of week: " + moment.isoWeekday()); // Sunday = 7; Monday = 1




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

      div.appendChild(span);
      wrapper.appendChild(div);
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