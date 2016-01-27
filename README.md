<img src="http://i.imgur.com/OTQ1D5w.png" align="center"/ style="width:40%;">

# Eventbrite Chrome Extension

Simple chrome extension that allows you to search for events nearby using the Eventbrite API

## Preview

<img src="http://i.imgur.com/7tRTew7.png?1" style="width:40%;"/>
<img src="http://i.imgur.com/mHzE1BM.png" style="width:40%;"/>


## Table of Contents
  - [Features](#features)
  - [Install](#install-and-run-locally)
  - [Folder Structure](#folder-structure)
  - [Built With](#built-with)
  - [Contribution Guide](#contribution-guide)
  - [Feature Ideas](#feature-ideas)
  - [License](#license)


## Features

- Search using any address in the world with Google Autocomplete API
- Filter by distance, weekend events, popular events

## Install and run locally
- Download as ZIP or clone it to desktop and extract it
- In Chrome, More Tools->Extensions-> Click 'Load unpacked extension' and select folder ('eventbrite-chrome-extension')
```
$ npm install
```
To install Grunt(If you don't have it) for running tasks
```
$ grunt build
```
Concatenates, jshints and minifies Javascript files and CSS file
```
$ grunt
```
Watches for changes in Javascript files and runs the build again

## Folder Structure
```
|-- eventbrite-chrome-extension',
    |-- .DS_Store',
    |-- .gitignore',
    |-- .jshintrc',
    |-- Gruntfile.js',
    |-- LICENSE',
    |-- README.md',
    |-- manifest.json',
    |-- package.json',
    |-- _locales',
    |   |-- en',
    |       |-- messages.json',
    |-- app',
        |-- .DS_Store',
        |-- popup.html',
        |-- assets',
        |   |-- .DS_Store',
        |   |-- backup-img.png',
        |   |-- eventbrite-text.png',
        |   |-- eventman.png',
        |   |-- icon128.png',
        |   |-- icon16.png',
        |   |-- icon19.png',
        |   |-- icon48.png',
        |-- css',
        |   |-- .DS_Store',
        |   |-- custom.css',
        |-- dist',
        |   |-- css',
        |   |   |-- custom.min.css',
        |   |-- js',
        |       |-- app.concat.js',
        |       |-- app.min.js',
        |-- js',
            |-- .DS_Store',
            |-- app.js',
            |-- utils-factory.js',
            |-- lib',
                |-- .DS_Store',
                |-- angular.min.js',
                |-- moment.min.js'
```
## Built With

[Eventbrite API](https://www.eventbrite.com/developer/v3/)
[Moment.js](http://momentjs.com)
[Google Places API](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)
[AngularJS](https://angularjs.org/)

## Contribution Guide
Fork it, make a feature branch, commit to it with awesome fixes/features and make a pull request!

## Feature Ideas
Create events through the chrome extension, Filter by specific dates, Allow users to favorite events and save them

## License
MIT

All logos & images used in the project belong to Eventbrite
