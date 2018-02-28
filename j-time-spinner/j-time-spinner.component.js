(function() {
    var directive = function($timeout) {
        function format2FixedStr(srcValue, length) {
            var formatted = new Array(length).join("0") + srcValue;
            return formatted.slice(formatted.length - length)
        }

        function validTime(value, type) {
            if (isNaN(Number.parseInt(value))) return "00";
            var tempValue = Number.parseInt(value);
            if ("m" === type || "s" === type) {
                if (tempValue > 59) return "00";
                if (tempValue < 0) return "59"
            } else {
                if ("h" !== type) return "00";
                if (tempValue > 23) return "00";
                if (tempValue < 0) return "23"
            }
            return format2FixedStr(value, 2)
        }

        function setValue(scope) {
            scope.value = (scope.show.h ? scope.showValue.h : "") + (scope.show.m ? ":" + scope.showValue.m : "") + (scope.show.s ? ":" + scope.showValue.s : "")
        }

        function initShow(scope) {
            scope.show = {};
            var formatArr = scope.format.split(":");
            scope.show.h = formatArr.indexOf("hh") > -1;
            scope.show.m = formatArr.indexOf("mm") > -1;
            scope.show.s = formatArr.indexOf("ss") > -1
        }

        function useNowTime() {
            var value, nowTime = new Date;
            value = format2FixedStr(nowTime.getHours(), 2) + ":";
            value += format2FixedStr(nowTime.getMinutes(), 2) + ":";
            value += format2FixedStr(nowTime.getSeconds(), 2);
            return value
        }

        function initShowValue(scope) {
            scope.showValue = {};
            scope.value = scope.value || (scope.useNow ? useNowTime() : "00:00:00");
            var timeArr = scope.value.split(":");
            scope.showValue.h = validTime(timeArr[0], "h");
            scope.showValue.m = validTime(timeArr[1], "m");
            scope.showValue.s = validTime(timeArr[2], "s");
            setValue(scope)
        }

        function initEvent(scope, element) {
            scope.add = function() {
                $timeout(function() {
                    element.find(".j-spinner").focus();
                    currentDom.select()
                }, 0);
                scope.showValue[scope.currentType] = validTime(+scope.showValue[scope.currentType] + 1, scope.currentType);
                setValue(scope)
            };
            scope.minus = function() {
                $timeout(function() {
                    element.find(".j-spinner").focus();
                    currentDom.select()
                }, 0);
                scope.showValue[scope.currentType] = validTime(+scope.showValue[scope.currentType] - 1, scope.currentType);
                setValue(scope)
            };
            scope.currentType = "h";
            scope.focus = function($event, type) {
                $timeout(function() {
                    $event.target.select()
                }, 0);
                currentDom = $event.target;
                scope.currentType = type
            };
            scope.change = function() {
                scope.showValue[scope.currentType] = validTime(scope.showValue[scope.currentType], scope.currentType);
                setValue(scope)
            }
        }

        function init(scope, element, attrs) {
            initShow(scope);
            initShowValue(scope);
            initEvent(scope, element)
        }
        var currentDom;
        return {
            "restrict": "E",
            "link": function(scope, element, attrs) {
                init(scope, element, attrs)
            },
            "scope": {
                "format": "=",
                "value": "=",
                "disable": "=",
                "useNow": "="
            },
            "templateUrl": "./j-time-spinner.template.html",
            "replace": true
        }
    };
    angular.module("rootApp").directive("jTimeSpinner", directive);
})();