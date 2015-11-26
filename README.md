# ui-timepicker [![built with gulp](http://gulpjs.com/img/builtwith.png)](http://gulpjs.com) [![Stories in Ready](https://badge.waffle.io/mirskytech/ui-timepicker.png?label=ready&title=Ready)](https://waffle.io/mirskytech/ui-timepicker)

**A timepicker for angular with an intuitive interface.**

![Screenshot](docs/_screenshot/original.png)

This is a fork of Kevin Zarknight's [original code](https://github.com/zarknight/ui-timepicker); thanks go
to him for getting this started.

## Getting started

### Install manually

* **Minified** Download [JS](https://github.com/) and [CSS](https://github.com/)
* **Unminified** Download [JS](https://github.com/) and [CSS](https://github.com/)

### Install with bower

```
bower install mirskytech/ui-timepicker
```

## Usage

Include the javascript and css files:

```javascript
<script src="d3.min.js"></script>
<script src="moment.min.js"></script>
<script src="angular.min.js"></script>
<script src="angular-moment.min.js"></script>

<script src="timepicker.directive.js"></script>
<link rel="stylesheet" href="timepicker.css">
```

Use in your html:

```html
<ui-timepicker ng-model="mydatetime"></ui-timepicker>
<div ng-bind="mydatetime"></div>
```

Configuration information can be found on the [project home page](https://github.io/mirsky-tech/ui-timepicker).

## Issue tracking

All upcoming features and issues can be tracked at [waffle.io](https://waffle.io/mirskytech/ui-timepicker).

## License

[MIT License](LICENSE)
