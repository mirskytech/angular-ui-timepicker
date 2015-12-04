---
layout: default
title: installation
---

## Installation

### Download using bower

This is the recommended path for installation as all dependencies are automatically
installed as well.

    bower install angular-ui-timepicker

### Install manually

* **Minified** Download [JS](https://raw.githubusercontent.com/mirskytech/angular-ui-timepicker/master/dist/angular-ui-timepicker.min.js) and [CSS](https://github.com/mirskytech/angular-ui-timepicker/blob/master/dist/angular-ui-timepicker.css)
* **Unminified** Download [JS](https://raw.githubusercontent.com/mirskytech/angular-ui-timepicker/master/dist/angular-ui-timepicker.js) and [CSS](https://github.com/mirskytech/angular-ui-timepicker/blob/master/dist/angular-ui-timepicker.css)

Manually download and install dependecies:[angular](https://angularjs.org),
 [moment](https://momentjs.com), [angular moment](https://github.com/urish/angular-moment),
  [d3](https://d3js.org), [bootstrap](https://getbootstrap.com) and [jquery](https://jquery.com).


### Includes

These scripts are required for [angular-ui-timepicker](http://mirskytech.github.io/angular-ui-timepicker) to work correctly:


    <script src="jquery.min.js"></script>
    <script src="boostrap.min.js"></script>
    <script src="d3.min.js"></script>
    <script src="moment.min.js"></script>
    <script src="angular.min.js"></script>
    <script src="angular-moment.min.js"></script>
    <script src="angular-ui-timepicker.min.js"></script>

    <link rel="stylesheet" href="boostrap.min.css">
    <link rel="stylesheet" href="angular-ui-timepicker.css">


### Usage

#### Minimal

    <input ui-timepicker ng-model="mydatetime" type="text" placeholder="time" />

#### Styled with Bootstrap


    <div class="input-group">
        <input class="form-control" ui-timepicker increments="15" ng-model="mydatetime" type="text" placeholder="time" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-time"></span>
        </span>
    </div>

### Configuration

Additional configuration options can be found on the [Configuration](configuration.html)
and [Examples](examples.md) pages.
