---
layout: default
title: configuration
---

# Configuration

## Specify in scope

Define the app and add the options within the controller:

    <script>
        var exampleApp = angular.module("example1app", ["ui.timepicker"]);
        exampleApp.controller("ExampleController",
        ["$scope",
        function (scope) {

            scope.myOpts = {
                ...
            };

         }]);
    </script>

Within the view, add the `options` attribute:

    <div ng-controller="ExampleController">
        <div class="input-group">
            <input class="form-control" ui-timepicker options="myOpts" ng-model="_1" type="text" placeholder="time" />
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-time"></span>
            </span>
        </div>
    </div>

## Specify inline

The `options` attribute's value contains an associative array:

    <div ng-controller="ExampleController">
        <div class="input-group">
            <input class="form-control" ui-timepicker options="{ ... }" ng-model="_1" type="text" placeholder="time" />
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-time"></span>
            </span>
        </div>
    </div>


# Options

|option      |default    |description|
|--- |--- |--- |
|`increments`     |`1`       | only allow time to change by a certain interval |
|`format`         | `h mm a` | display format in the input field based [moment.js](http://momentjs.com/docs/#/parsing/string-format/)'s format. *note: the underlying variable is not effected*|


# Example

    var myopts = {
        increments:"15", // only allow times that end in 0, 15, 30 or 45
        format:"H mm" // display in 24-hour time
    };




