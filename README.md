# calendar-redesign

This application is an attempt to display a horizontal prototype for a
Google Calendar redesign.

Although functionality is limited, this will provide a basic overview
of the website.

## Installation Instructions

1. Run `npm install`
2. In the terminal, run `gulp serve`

Gulp serve will serve the application on your localhost at port 9000.
You can change it by going to the `gulpfile.js` and changing the settings
in the `connect` task.

** Gulp serve has hot reload on HTML, and CSS; so changes should be there immediately without refreshing**
--> You will need to reload for Javascript changes because it's very inefficient watching those.

For date related things, I will be using Moment.js to handle all that information
--> https://momentjs.com

## Screenshots
![google-calendar-redesign](https://user-images.githubusercontent.com/22083509/32713867-213d8aa6-c819-11e7-9bde-d1ebdcf72e46.JPG)
