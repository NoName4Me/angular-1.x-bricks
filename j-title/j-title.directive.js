(function() {
    var directive = function() {
        return {
            "restrict": "A",
            "link": function(scope, element, attrs) {
                function shouldRemoveTip(e) {
                    if (e.clientX - tipPanel[0].offsetLeft <= tipPanel[0].offsetWidth && e.clientX - tipPanel[0].offsetLeft >= 0 && e.clientY - tipPanel[0].offsetTop <= tipPanel[0].offsetHeight && e.clientY - tipPanel[0].offsetTop >= 0) return !1;
                    return !0
                }

                function initFakeTipContent() {
                    titleText && fakeTipPanel.text(titleText).show();
                    tipPanelWH = fakeTipPanel[0].getBoundingClientRect()
                }

                function refreshTitle() {
                    titleText ? tipPanel.text(titleText) : tipPanel.hide()
                }
                var titleText, tipPanelWH, fontSize = 14,
                    lineHeight = 20,
                    screenWidth = document.body.clientWidth,
                    screenHeight = document.body.clientHeight,
                    tipPanel = $("#jTitle").length > 0 ? $("#jTitle").eq(0) : $("<div>").css({
                        "position": "fixed",
                        "background": "#fff",
                        "padding": "10px",
                        "box-shadow": "2px 2px 5px 0 rgba(0,0,0,.15)",
                        "color": "#666",
                        "z-index": "9999",
                        "max-width": "480px",
                        "white-space": "normal",
                        "word-break": "break-all",
                        "border": "1px solid #eee",
                        "font-size": fontSize + "px",
                        "line-height": lineHeight + "px",
                        "display": "none"
                    }).attr("id", "jTitle"),
                    fakeTipPanel = $("#fakeTipPanel").length > 0 ? $("#fakeTipPanel").eq(0) : tipPanel.clone().attr("id", "fakeTipPanel").css({
                        "left": "0",
                        "top": "0",
                        "display": "block",
                        "visibility": "hidden"
                    });
                if (0 === $("#jTitle").length) {
                    $("body").append(tipPanel);
                    $("body").append(fakeTipPanel)
                }
                scope.$watch(attrs.jTitle, function(value) {
                    titleText = value;
                    initFakeTipContent();
                    refreshTitle()
                });
                element.mouseenter(function(e) {
                    var left, top, cssPos;
                    canShowTip = !0;
                    if (titleText) {
                        left = e.clientX;
                        top = e.clientY + (element[0].offsetHeight - (void 0 === e.offsetY ? e.pageY - $(e.target).offset().top : e.offsetY));
                        cssPos = {
                            "left": "",
                            "right": "",
                            "top": "",
                            "bottom": ""
                        };
                        screenWidth - e.clientX < tipPanelWH.width && (cssPos.right = "10px");
                        screenHeight - e.clientY < tipPanelWH.height + 5 && (cssPos.bottom = screenHeight - top + element[0].clientHeight + "px");
                        cssPos.right || (cssPos.left = left + "px");
                        cssPos.bottom || (cssPos.top = top + "px");
                        tipPanel.text(titleText).css(cssPos).show()
                    }
                });
                element.mouseleave(function(e) {
                    shouldRemoveTip(e) && tipPanel.hide()
                });
                tipPanel.mouseleave(function(e) {
                    tipPanel.hide()
                })
            },
            "replace": true
        }
    };
    angular.module("rootApp").directive("jTitle", directive);
})();