# ui-timepicker [![built with gulp](https://img.shields.io/badge/built_with-gulp-red.svg?style=flat)](http://gulpjs.com) [![Stories in Ready](https://badge.waffle.io/mirskytech/ui-timepicker.png?label=ready&title=Ready)](https://waffle.io/mirskytech/ui-timepicker)

**A timepicker for angular with an intuitive interface.**

![Screenshot](https://raw.githubusercontent.com/mirskytech/ui-timepicker/bower/docs/_screenshots/original.png)

This is a fork of Kevin Zarknight's [original code](https://github.com/zarknight/ui-timepicker); thanks go
to him for getting this started.

## Getting started

### Install manually

* **Minified** Download [JS](https://raw.githubusercontent.com/mirskytech/angular-ui-timepicker/master/dist/angular-ui-timepicker.min.js) and [CSS](https://github.com/mirskytech/angular-ui-timepicker/blob/master/dist/angular-ui-timepicker.css)
* **Unminified** Download [JS](https://raw.githubusercontent.com/mirskytech/angular-ui-timepicker/master/dist/angular-ui-timepicker.js) and [CSS](https://github.com/mirskytech/angular-ui-timepicker/blob/master/dist/angular-ui-timepicker.css)

**Dependecies:** [angular](https://angularjs.org),
 [moment](https://momentjs.com), [angular moment](https://github.com/urish/angular-moment),
  [d3](https://d3js.org), [bootstrap](https://getbootstrap.com) and [jquery](https://jquery.com).

### Install with bower

```
bower install angular-ui-timepicker
```

## Usage

Include the javascript and css files:

```javascript
<script src="jquer.min.js"></script>
<script src="boostrap.min.js"></script>
<script src="d3.min.js"></script>
<script src="moment.min.js"></script>
<script src="angular.min.js"></script>
<script src="angular-moment.min.js"></script>
<script src="angular-ui-timepicker.min.js"></script>

<link rel="stylesheet" href="boostrap.min.css">
<link rel="stylesheet" href="angular-ui-timepicker.css">
```

Use in your html:

```html
    <div class="input-group">
        <input class="form-control" ui-timepicker increments="15" ng-model="mydatetime" type="text" placeholder="time" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-time"></span>
        </span>
    </div>
```

Configuration information can be found on the [project home page](https://mirskytech.github.io/angular-ui-timepicker).

## Issue tracking

All upcoming features and issues can be tracked at [waffle.io](https://waffle.io/mirskytech/angular-ui-timepicker).

## License

[MIT License](LICENSE)
