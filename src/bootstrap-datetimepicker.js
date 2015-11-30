var inputPopup = function (scope, element, $compile) {
    var picker = {},
        input,
        component = false,
        widget = false,
        options = {


            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'auto'
            },
            widgetParent: null,
            ignoreReadonly: false,
            keepOpen: false,
            focusOnShow: true,
            inline: false,
            datepickerInput: '.datepickerinput'
        },

        getTemplate = function () {
            var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu');
            var container = document.createElement('div');
            createTime(scope, container);
            return template.append(container);
        },

        place = function () {

            var position = (component || element).position(),
                offset = (component || element).offset(),
                vertical = options.widgetPositioning.vertical,
                horizontal = options.widgetPositioning.horizontal,
                parent;

            if (options.widgetParent) {
                parent = options.widgetParent.append(widget);
            } else if (element.is('input')) {
                parent = element.after(widget).parent();
            } else if (options.inline) {
                parent = element.append(widget);
                return;
            } else {
                parent = element;
                element.children().first().after(widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() &&
                    widget.height() + element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + widget.outerWidth() / 2 &&
                    offset.left + widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                widget.addClass('top').removeClass('bottom');
            } else {
                widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                widget.addClass('pull-right');
            } else {
                widget.removeClass('pull-right');
            }

            // find the first parent element that has a relative css positioning
            if (parent.css('position') !== 'relative') {
                parent = parent.parents().filter(function () {
                    return $(this).css('position') === 'relative';
                }).first();
            }

            if (parent.length === 0) {
                throw new Error('datetimepicker component should be placed within a relative positioned container');
            }

            //widget.css({
            //    top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
            //    bottom: vertical === 'top' ? position.top + element.outerHeight() : 'auto',
            //    left: horizontal === 'left' ? (parent === element ? 0 : position.left) : 'auto',
            //    right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
            //});
            widget.css({
                display:'block',
                top:'36px',
                bottom:'auto',
                left:'15px',
                right:'auto'
            })
        },


        hide = function () {
            ///<summary>Hides the widget. Possibly will emit dp.hide</summary>
            var transitioning = false;
            if (!widget) {
                return picker;
            }
            // Ignore event if in the middle of a picker transition
            widget.find('.collapse').each(function () {
                var collapseData = $(this).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    transitioning = true;
                    return false;
                }
                return true;
            });
            if (transitioning) {
                return picker;
            }
            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            widget.hide();

            $(window).off('resize', place);
            widget.off('click', '[data-action]');
            widget.off('mousedown', false);

            widget.remove();
            widget = false;



            input.blur();

            return picker;
        },

        show = function () {

            if (input.prop('disabled') || (!options.ignoreReadonly && input.prop('readonly')) || widget) {
                return picker;
            }


            widget = getTemplate(scope, element);


            //showMode();

            $(window).on('resize', place);
            //widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
            widget.on('mousedown', false);

            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            widget.show();
            place();

            if (options.focusOnShow && !input.is(':focus')) {
                input.focus();
            }

        },

        attachPopupElementEvents = function () {
            input.on({
                'blur': options.debug ? '' : hide,
                'focus': options.allowInputToggle ? show : ''
            });

            if (element.is('input')) {
                input.on({
                    'focus': show
                });
            } else if (component) {
                component.on('click', toggle);
                component.on('mousedown', false);
            }
        };

    if(element.length) {
        input = $(element[0]);
    } else {
        input = element;
    }

    attachPopupElementEvents();

};


angular.module('ui.mirsky',[])
    .directive('uiMirsky', ['$compile', function($compile){
       return {
           replace:false,
           template:'<div class="mirsky"></div>',
           link:function(scope, elem, attrs) {
               inputPopup(scope, elem, $compile);
               //$compile(elem)(scope);
           }
        }
    }]);

