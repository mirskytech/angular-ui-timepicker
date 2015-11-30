

angular.module("ui.timepicker", ["angularMoment"])
    .directive('uiMirsky', function() {
        return {
            replace:true,
            template: '<div><input type="text" /><ul class="pop">name name name</ul></div>'

        };
    })
    .directive("uiTimepicker", ["moment", "$document", function (moment, $document) {
        return {
            restrict: "EA",
            
            require: 'ngModel',

            scope: {
                datetime: '=ngModel',
                increments: '='
            },

            replace: true,

            //template: '<div class="pop"></div>',

            link: function (scope, element, attrs) {

                var _opts = {
                    increments:scope.increments||1,
                    popup:element[0].nodeName == 'INPUT'
                }

                var _selection = d3.select(element[0]);

                var _arc = d3.svg.arc().startAngle(0 * (Math.PI / 180)).endAngle(360 * (Math.PI / 180));

                var _w = 200;
                var _h = _w;
                var _diameter = _w;
                var _margin = { top:10, right:10, bottom:10, left:10 };
                var _fontSize = 10;

                var _width;
                var _height;
                var _x0;
                var _y0;

                var _minValue = 1;
                var _maxValue = 720;
                var _value = 1;

                var _setAsAM = false;

                _selection.each(function (data) {
                    measure();

                    var container = document.createElement('div');
                    this.parentNode.appendChild(container);

                    if(_opts.popup) {
                        var input = angular.element(this);
                        var _body = angular.element($document[0].body);

                        //body.on('click', function() { console.log('blur'); });

                        var popup = angular.element(container);

                        popup.addClass('pop popnomore');

                        var hide = function(e) {
                            console.log('blurring');
                            e.preventDefault(); e.stopPropagation();

                            popup.addClass('popnomore');
                            _body.off('click', hide);
                        };



                        input.on('focus', function(e){
                            e.preventDefault();e.stopPropagation();
                            popup.removeClass('popnomore');
                            scope.$apply();
                            _body.on('click', hide);
                            return false;
                        });


                    }



                    var svg = d3.select(container).selectAll("svg").data([data]);

                    var enter = svg.enter().append("svg")
                        .attr("class", "x1-timepicker-svg").append("g")
                        .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

                    svg.attr("width", _w).attr("height", _h);

                    var background = enter.append("g")
                        .attr("class", "x1-timepicker-component");

                    var body = background.append("circle")
                        .attr("class", "x1-timepicker-inner")
                        .attr("transform", "translate(" + _x0 + "," + _y0 + ")")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", _width / 2);
                    
                    var slider = background.append("path")
                        .attr("transform", "translate(" + _x0 + "," + _y0 + ")")
                        .attr("d", _arc);

                    var arcContainer = enter.append("g")
                        .attr("class", "x1-timepicker-arcs");

                    var selectedArc = arcContainer.append("path")
                        .attr("class", "arc")
                        .attr("transform", "translate(" + _x0 + "," + _y0 + ")")
                        .attr("d", _arc);

                    // ---------- labels for the picker ------------------------------------------
                    var labels = enter.append("g")
                        .attr("class", "x1-timepicker-labels");

                    var labelSendAt = labels.append("text")
                        .attr("class", "title")
                        .attr("x", _x0)
                        .attr("y", _width / 4.2 + _fontSize / 3)
                        .attr("width", _width)
                        .text("Time")
                        .style("font-size", (_fontSize * 0.4) + "px");

                    var labelTime = labels.append("text")
                        .attr("class", "time")
                        .attr("x", _x0)
                        .attr("y", _y0 + _fontSize / 3)
                        .attr("width", _width)
                        .style("font-size", (_fontSize * 1.4) + "px");

                    var labelAMPM = labels.append("text")
                        .attr("class", "ampm")
                        .attr("cursor", "pointer")
                        .attr("x", _x0)
                        .attr("y", _width / 1.4 + _fontSize / 3)
                        .attr("width", _width)
                        .style("font-size", (_fontSize * 0.6) + "px")
                        .on("click", function () {
                            var blnAM = isAM(scope.datetime);
                            var offset = blnAM ? 12 : -12;
                            _setAsAM = !blnAM;
                            scope.datetime = moment(scope.datetime).add(offset, 'hour').toDate();
                            d3.select(this).text(moment(scope.datetime).format("A"));
                            scope.$apply();
                        });

                    // ---------- slider handler ------------------------------------------
                    var drag = d3.behavior.drag().on("drag", function () {

                        var eventX = d3.event.x;
                        var eventY = d3.event.y;

                        // --------------------------
                        var _C = Math.PI * _width;

                        var ox = 0;
                        var oy = 0;

                        var ax = 0;
                        var ay = _height / 2;

                        var bx = eventX - _width / 2;
                        var by = _height / 2 - eventY;

                        var k = (by - oy)/(bx - ox);

                        var angle = Math.abs(Math.atan(k) / (Math.PI / 180));
                        var targetAngle = 0;

                        if (bx > 0 && by >= 0) {
                            targetAngle = 90 - angle;
                        } else if (bx >= 0 && by < 0) {
                            targetAngle = 90 + angle;
                        } else if (bx < 0 && by <= 0) {
                            targetAngle = 270 - angle;
                        } else if (bx <= 0 && by > 0) {
                            targetAngle = 270 + angle;
                        }
                        
                        _value = _maxValue * (targetAngle / 360);

                        // update scope.datetime
                        var hours = Math.floor(_value / 60);
                        hours = _setAsAM ? hours : (hours + 12);

                        var minutes = Math.floor( (_value % 60) / _opts.increments) * _opts.increments;

                        scope.datetime = moment(scope.datetime)
                            .set('hour', hours)
                            .set('minute', minutes)
                            .set('second', 0)
                            .toDate();

                        scope.$apply(function(){
                            setCurrent(selectedArc, handler, labelTime, labelAMPM);
                        });
                    });

                    var handler = enter.append("g").append("circle")
                        .attr("class", "x1-timepicker-handler")
                        .attr("cursor", "pointer")
                        .attr("transform", "translate(" + _x0 + "," + _y0 + ")")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", 10)
                        .attr("fill", "#FFFFFF")
                        .call(drag);

                    // ---------- set the init value from ng-model ----------------------------------------------
                    var updateValue = function (v) {
                        var hours = moment(v).hours();
                        var hours12 = hours >= 12 ? hours - 12 : hours;
                        var minutes = moment(v).minutes();
                        _value = (hours12 * 60 + minutes);
                        setCurrent(selectedArc, handler, labelTime, labelAMPM);
                    };

                    updateValue(scope.datetime);

                    _setAsAM = isAM(scope.datetime);

                    scope.$watch("datetime", function (newVal, oldVal) {
                        updateValue(newVal);
                    });
                });

                function isAM (date) {
                    return moment(date).format("A") === "AM";
                }

                function measure () {
                    _width = _height = _diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
                    _x0 = _y0 = _width / 2;
                    _fontSize = _width * .2;
                    _arc.outerRadius(_width / 2);
                    _arc.innerRadius(_width / 2 * .85);
                }

                function setCurrent (selectedArc, handler, labelTime, labelAMPM) {
                    // set the selected arc
                    var ratio = Math.min((_value - _minValue) / (_maxValue - _minValue), 1);
                    var endAng = Math.min(360 * ratio, 360) * Math.PI / 180;
                    _arc.endAngle(endAng);
                    selectedArc.attr("d", _arc);

                    // set the handler position
                    var oAngle = 360 * _value / _maxValue;
                    var r = _width / 2 - 5;
                    var x = r * Math.cos((oAngle - 90) * Math.PI / 180);
                    var y = r * Math.sin((oAngle - 90) * Math.PI / 180);
                    handler.attr('cx', x).attr('cy', y);

                    // update time label
                    var hours = moment(scope.datetime).hours();
                    var hours12 = hours >= 12 ? hours - 12 : hours;
                    var minutes = moment(scope.datetime).minutes();

                    var lbTime = "" + hours12 + ":";
                    if (minutes < 10) {
                        lbTime += "0";
                    }
                    lbTime += minutes;
                    
                    labelTime.text(lbTime);
                    labelAMPM.text(moment(scope.datetime).format("A"));
                }

            }
        };
    }]);
