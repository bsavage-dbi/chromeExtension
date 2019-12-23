### Chrome Extension
#### General:
This project was made with JavaScript, HTML and Python, and was made to help people investigate and solve problems easier and faster, but entering the extension.
In this project I used Skeleton CSS, it's already in main.html file.

#### Properties and possabilities:
There are 5 main possabilities in this extension:
    1. You may open a confluence link by inserting it's name of a part of his name.
    2. Open a few graphs in 'one-btn-click' function.
    3. Investigate a specific machine by inserting it's ID (works perfectly with Nagios).
    4. Copy template of whatever you'll want to your computer's clipboard.
    5. A python file that could check if all your alerts (from csv file) are synced into alerts.JSON

How to set up your own properties:
    1. Please fill in JSON file with all your alerts information (ID just need an increase for every new alert) ID,Name,Link.
    2. in mainApp.js, please change to your graphs links.
    3. in mainApp.js, change to your nagios link excluding a machine ID.
    4. in script.js, change `Template to copy to your clipboard here` to the template you want to be copied to your clipboard.
    5. Please name your alerts CSV file as `finalAlertData.csv` for csvChecker.py.

### License:
This is a free program, so you may use it for own needs.
