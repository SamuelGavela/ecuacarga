function initAjaxContent() {
    initChildClasses(), initAdressFix(), initTouchNav(), initDropDownClasses(), initVerticalAlign()
}

function initLayoutFix() {
    var e = jQuery(window),
        t = "focus";
    jQuery(".header-nav-search").each(function() {
        var e = jQuery(this),
            i = e.find(".text input");
        i.on("focus", function() {
            e.addClass(t), i.attr("aria-expanded", "true")
        }).on("blur", function() {
            "" === this.value && e.removeClass(t), i.attr("aria-expanded", "false")
        })
    }), jQuery(".row").each(function() {
        var t = jQuery(this),
            i = t.find(".equal-height"),
            n = 0,
            s = 0,
            a = 0,
            o = function() {
                n = 0, s = 0, a = 0, i.removeAttr("style").each(function() {
                    var e = jQuery(this);
                    e.offset().top > a && (a = e.offset().top, s++), e.outerHeight() > n && (n = e.outerHeight())
                }), 1 == s && i.each(function() {
                    var e = jQuery(this),
                        t = parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom")) || 0;
                    e.css({
                        height: n - t
                    })
                })
            };
        i.length && (o(), e.on("resize load", o))
    }), jQuery(".inner-main .shortcuts").each(function() {
        var e = jQuery(this),
            t = e.find(">li");
        t.each(function(e) {
            jQuery(this).addClass("item" + (e + 1))
        })
    }), jQuery(".home-main .shortcuts li").each(function(e) {
        jQuery(this).addClass("item" + (e + 1))
    }), jQuery(".model-b .header-nav-tabs .link-holder a").prepend('<span class="shadow"><span/></span>'), jQuery('<span class="border"/>').insertAfter("#nav")
}

function initFilterSelect() {
    var e = jQuery(window);
    jQuery(".compare-form").each(function() {
        var t = jQuery(this),
            i = t.find(".filter-select"),
            n = t.find("button:submit"),
            s = jQuery(),
            a = function() {
                s.hide().filter('[id="' + i.val() + '"]').show(), e.trigger("resize")
            };
        i.find("option").each(function() {
            var e = jQuery(this),
                t = e.val(),
                i = jQuery("#" + t);
            i.length && (s = s.add(i))
        }), a(), n.length ? n.on("click", function(e) {
            e.preventDefault(), a()
        }) : i.on("change", a)
    })
}

function initAjaxDropDown() {
    var e = 0,
        t = 0;
    jQuery("#nav > li, #nav02 > li").each(function() {
        var i = jQuery(this),
            n = i.data("target");
        n && (e++, jQuery.ajax({
            url: n,
            dataType: "text",
            success: function(n) {
                t++, i.append(n), t == e && initAjaxContent()
            },
            error: function(n) {
                t++, i.append(n), t == e && initAjaxContent()
            }
        }))
    })
}

function initPrint() {
    jQuery(".print").on("click", function(e) {
        window.print(), e.preventDefault()
    })
}

function initRefreshCustomForms() {
    var e, t = jQuery(window),
        i = jQuery("select"),
        n = function() {
            clearTimeout(e), e = setTimeout(function() {
                i.each(function() {
                    this.jcf && (this.jcf.fakeElement.style.width = this.jcf.realElement.offsetWidth + "px", this.jcf.refreshState(), this.jcf.options.showNativeDrop || this.jcf.hideDropdown())
                })
            }, 50)
        };
    t.bind("resize", n)
}

function initSearchTransfer() {
    var e = jQuery(".search-placeholder"),
        t = jQuery(".header-nav-search-container");
    e.length && t.length && t.appendTo(e)
}

function initKeyboardSupport() {
    jQuery(".header-nav-tabs > ul").keyboardSupport({
        items: "a"
    })
}

function initFitVids() {
    jQuery(".video-holder").fitVids()
}

function initMediaElement() {
    jQuery("video,audio").mediaelementplayer({
        pluginPath: window.pathInfo ? pathInfo.base + pathInfo.js : "../js/"
    })
}

function initTabs() {
    jQuery("ul[role=tablist]").contentTabs({
        addToParent: !0,
        tabLinks: "a"
    })
}

function initGlobalFocus() {
    {
        var e = "ui-global-focus";
        jQuery("*")
    }
    jQuery(document).focusin(function(t) {
        jQuery("*").removeClass(e), jQuery(t.target).addClass(e)
    }).focusout(function(t) {
        jQuery(t.target).removeClass(e)
    })
}

function initSameHeight() {
    jQuery(".row-sameheight").sameHeight({
        elements: '>[class*="col-"]>*',
        flexible: !0,
        multiLine: !0
    }), jQuery("div.row").sameHeight({
        elements: ".same-height",
        flexible: !0,
        multiLine: !0
    }), jQuery("nav.content-tabs, div.content-tabs .tablist-holder").sameHeight({
        elements: "a",
        flexible: !0,
        multiLine: !0
    }), jQuery("ul.list-image-links").sameHeight({
        elements: "figcaption",
        flexible: !0,
        multiLine: !0
    })
}

function initResizeCustomScroll() {
    var e = jQuery(window),
        t = jQuery(".scrollable-area"),
        i = function() {
            t.each(function() {
                jQuery(this).css({
                    width: "",
                    height: ""
                }), jQuery(this).parent().css({
                    width: "",
                    height: ""
                }), jcf.customForms.refreshElement(this)
            })
        };
    e.on("resize load", i)
}

function initDropDownClasses() {
    jQuery("#nav li, .header-nav-tabs .slide>ul>li").each(function() {
        var e = jQuery(this),
            t = e.find(".header-nav-drop-panel, ul"),
            i = e.find("a").eq(0);
        t.length && (e.addClass("has-drop-down"), i.length && i.addClass("has-drop-down-a"))
    })
}

function initAccordion() {
    jQuery(window);
    init = !1, footerMenu = jQuery(".footer-menu"), toggleLink = footerMenu.find(".toggle-accordion"), slideMenu = jQuery(".first-drop-footer"), headerMenu = jQuery("#country-selector .group ul"), bottomMenu = slideMenu.find("> ul"), toggleLink.on("click", function(e) {
        e.preventDefault(), init ? (init = !1, footerMenu.trigger("destroy.accordion")) : (init = !0, footerMenu.slideAccordion({
            opener: ">.opener",
            slider: ">.slide",
            animSpeed: 300
        }))
    }), ResponsiveHelper.addRange({
        "..767": {
            on: function() {
                init = !0, footerMenu.slideAccordion({
                    opener: ">.opener",
                    slider: ">.slide",
                    animSpeed: 300
                }), bottomMenu.slideAccordion({
                    opener: ">.opener",
                    slider: ">.second-drop-footer",
                    animSpeed: 300
                }), slideMenu.horizontalMenu({
                    drop: ".third-drop-footer",
                    back: ".back-link a",
                    animSpeed: 300
                })
            },
            off: function() {
                init = !1, footerMenu.trigger("destroy.accordion"), slideMenu.data("HorizontalMenu") && slideMenu.data("HorizontalMenu").destroy(), bottomMenu.trigger("destroy.accordion")
            }
        },
        "768..": {
            on: function() {
                headerMenu.slideAccordion({
                    opener: ">.opener",
                    slider: ">.drop",
                    tabindex: !1,
                    focusLink: !0,
                    animSpeed: 300
                })
            },
            off: function() {
                headerMenu.trigger("destroy.accordion")
            }
        }
    }), jQuery(".accordion").slideAccordion({
        expandAll: ".main-opener",
        opener: ".opener",
        slider: ">.slide",
        animSpeed: 300
    })
}

function initOpenClose() {
    var e = jQuery(".row .header-nav-menu"),
        t = jQuery(".header-nav-tabs"),
        i = jQuery("#footer .country-selector"),
        n = jQuery(".pull-right .header-nav-menu");
    ResponsiveHelper.addRange({
        "..767": {
            on: function() {
                e.openClose({
                    activeClass: "active",
                    opener: ".opener",
                    slider: ".slide",
                    animSpeed: 400,
                    effect: "slide",
                    animStart: function(e, t) {
                        if (browserInfo.msie && 8 == browserInfo.version) {
                            var i = "temp",
                                n = t.slider.find("*");
                            respond.update(), n.addClass(i), setTimeout(function() {
                                respond.update(), n.removeClass(i)
                            }, 0)
                        }
                    }
                }), t.openClose({
                    activeClass: "active",
                    opener: ".opener",
                    slider: ".slide",
                    animSpeed: 400,
                    effect: "slide",
                    animStart: function(e, t) {
                        if (browserInfo.msie && 8 == browserInfo.version) {
                            var i = "temp",
                                n = t.slider.find("*");
                            respond.update(), n.addClass(i), setTimeout(function() {
                                respond.update(), n.removeClass(i)
                            }, 0)
                        }
                    }
                }), i.openClose({
                    activeClass: "active",
                    opener: ".opener-drop",
                    slider: ".first-drop-footer",
                    animSpeed: 400,
                    effect: "slide"
                }), n.openClose({
                    activeClass: "active",
                    opener: ".header-nav-opener",
                    slider: ".header-nav-holder",
                    animSpeed: 400,
                    effect: "slide"
                })
            },
            off: function() {
                e.data("OpenClose") && e.data("OpenClose").destroy(), t.data("OpenClose") && t.data("OpenClose").destroy(), e.find(".slide").css({
                    overflow: ""
                }), i.data("OpenClose") && i.data("OpenClose").destroy(), n.data("OpenClose") && (n.data("OpenClose").destroy(), n.find(".header-nav-holder").removeAttr("style"))
            }
        }
    }), jQuery("#wrapper").openClose({
        activeClass: "country-selected",
        opener: "#header .country-selector a",
        slider: "#country-selector",
        animSpeed: 400,
        effect: "slide",
        onInit: function(e) {
            e.currentIndex = 0, e.links = e.slider.find(".group > ul > li > a");
            var t = function(t) {
                switch (e.links = e.slider.find(".group > ul > li > a"), e.links = e.links.add(".group > ul > .active > .drop a"), e.currentIndex = e.links.index(e.links.filter(".ui-global-focus")), t.keyCode) {
                    case 37:
                    case 38:
                        t.preventDefault(), e.currentIndex--, e.currentIndex < 0 && (e.currentIndex = e.links.length - 1), e.links.eq(e.currentIndex).focus();
                        break;
                    case 39:
                    case 40:
                        t.preventDefault(), e.currentIndex++, e.currentIndex > e.links.length - 1 && (e.currentIndex = 0), e.links.eq(e.currentIndex).focus()
                }
            };
            e.slider.on("keydown", t)
        },
        animEnd: function(e, t) {
            e ? (t.links.attr("tabindex", "0"), t.links.eq(0).focus()) : t.links.attr("tabindex", "-1")
        }
    }), jQuery(".language-selector, .phone-number-selector").openClose({
        hideOnClickOutside: !0,
        activeClass: "active",
        opener: ".opener",
        slider: ".slide",
        animSpeed: 400,
        effect: "slide",
        onInit: function(e) {
            e.focusItems = e.holder.find("a"), e.keyHandler = function(t) {
                switch (t.keyCode) {
                    case 9:
                        setTimeout(function() {
                            e.focusItems.filter(".ui-global-focus").length || e.hideSlide()
                        }, 10)
                }
            }, e.holder.on("keydown", e.keyHandler)
        }
    }), jQuery(".model-b .layer02, .model-c .layer03").openClose({
        activeClass: "active",
        opener: ".form-opener",
        slider: ".slide-form",
        animSpeed: 400,
        effect: "slide",
        animStart: function(e, t) {
            if (browserInfo.msie && 8 == browserInfo.version) {
                var i = "temp",
                    n = t.slider.find("*");
                respond.update(), n.addClass(i), setTimeout(function() {
                    respond.update(), n.removeClass(i)
                }, 0)
            }
        }
    }), jQuery(".search-holder").openClose({
        activeClass: "active",
        opener: ".form-opener",
        slider: ".slide-form",
        animSpeed: 400,
        effect: "slide"
    }), jQuery(".aside-form").openClose({
        activeClass: "active",
        opener: ".opener-form",
        slider: ".slide",
        animSpeed: 400,
        effect: "slide"
    }), jQuery(".content-form").openClose({
        activeClass: "active",
        opener: ".opener-form",
        slider: ".slide",
        animSpeed: 400,
        effect: "slide"
    })
}

function initSelectNavigation() {
    var e = jQuery(".model-a .header-nav-tabs ul");
    e.length && ResponsiveHelper.addRange({
        "..959": {
            on: function() {
                e.navigationSelect({
                    defaultOptionAttr: "data-title"
                }), jcf.customForms.replaceAll()
            },
            off: function() {
                e.data("NavigationSelect") && e.data("NavigationSelect").destroy()
            }
        }
    })
}

function initAdressFix() {
    var e, t = "one-line",
        i = jQuery(window);
    jQuery("#header .icon-telephone").each(function() {
        var n = jQuery(this),
            s = n.parents(".header-nav-drop-panel"),
            a = n.find("em"),
            o = n.find("b"),
            r = function() {
                clearTimeout(e), e = setTimeout(function() {
                    n.removeClass(t), s.css({
                        display: "block"
                    }), (a.height() < 2 * parseInt(a.css("font-size")) || o.height() < 2 * parseInt(o.css("font-size"))) && n.addClass(t), s.css({
                        display: ""
                    })
                }, 50)
            };
        a.length && o.length || (r(), i.on("resize load", r))
    })
}

function initChildClasses() {
    jQuery("#header .content-container,#header .content-container02,#header .content-container03,.header-nav-drop-panel .row,.quick-quote-links.plus ul,.model-b .header-nav-tabs .slide>ul").children(":last-child").not(":first-child").addClass("last"), jQuery("#nav>li:odd,.header-nav-tabs .slide>ul>li:odd").addClass("odd"), jQuery(".header-nav-drop-panel .col-sm-12 .customer-services-links ul li:nth-child(3n+1)").addClass("first-in-row"), jQuery(".header-nav-drop-panel .col-sm-12 .customer-services-links ul li:nth-child(3n+3)").addClass("third-in-row")
}

function initTouchNav() {
    var e, t, i, n = 400,
        s = "one-module",
        a = "two-modules",
        o = "three-modules",
        r = "four-modules",
        l = "expanded",
        c = jQuery(window),
        d = jQuery("#wrapper"),
        h = d.find("#main"),
        u = jQuery("#nav, #nav02"),
        p = u.parent().hasClass("slide"),
        f = u.clone(),
        m = d.find(".language-selector, .phone-number-selector"),
        g = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        v = /Windows Phone/.test(navigator.userAgent),
        y = navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        b = v ? y : "click",
        w = function() {
            if (browserInfo.msie && 8 == browserInfo.version) {
                var e = "temp",
                    t = jQuery(".header-nav-drop-panel *");
                respond.update(), t.addClass(e), setTimeout(function() {
                    respond.update(), t.removeClass(e)
                }, 0)
            }
        },
        k = function(i) {
            e = 0, t = c.width(), p ? u.css({
                marginBottom: ""
            }) : h.css({
                paddingTop: ""
            }), window.addEventListener && (e = window.innerWidth - jQuery("body").width()), t + e > 767 && 960 > t + e && (p ? u.css({
                marginBottom: i.outerHeight()
            }) : h.css({
                paddingTop: i.outerHeight()
            })), w()
        };
    (g || v) && c.on("resize", function() {
        i = u.find(".hover .header-nav-drop-panel"), i.length && k(i)
    }), ResponsiveHelper.addRange({
        "..959": {
            off: function() {
                p ? u.css({
                    marginBottom: ""
                }) : h.css({
                    paddingTop: ""
                })
            }
        },
        "..767": {
            on: function() {
                u.each(function() {
                    var e, t = jQuery(this),
                        i = t.find(">li");
                    i.each(function() {
                        var t = jQuery(this),
                            s = t.find(".link-holder a, >a"),
                            a = t.find(".header-nav-drop-panel"),
                            o = a.find(".row").children(),
                            r = o.length,
                            h = function(s) {
                                a.length && (s.preventDefault(), t.hasClass(l) ? a.slideUp(n, function() {
                                    t.removeClass(l), e = null, a.attr({
                                        "aria-hidden": "true",
                                        "aria-expanded": "false"
                                    }), t.attr("tabindex", "-1")
                                }) : e ? e.slideUp(n, function() {
                                    i.removeClass(l), t.addClass(l), e.attr({
                                        "aria-hidden": "true",
                                        "aria-expanded": "false"
                                    }), a.attr({
                                        "aria-hidden": "false",
                                        "aria-expanded": "true"
                                    }), i.attr("tabindex", "-1"), t.attr("tabindex", "0"), a.slideDown(n, function() {
                                        e = a
                                    })
                                }) : (t.addClass(l), a.slideDown(n, function() {
                                    e = a
                                }), a.attr({
                                    "aria-hidden": "false",
                                    "aria-expanded": "true"
                                }), t.attr("tabindex", "0"), w()))
                            },
                            u = function() {
                                a.length && a.css({
                                    width: d.width()
                                })
                            },
                            p = function() {
                                c.off("resize", u), t.off("keydown", f), setTimeout(function() {
                                    var e = o.parents(".holder");
                                    e.length && o.unwrap(), i.removeClass(l), s.off(b), a.removeAttr("style").removeAttr("aria-hidden").removeAttr("aria-expanded"), s.removeAttr("tabindex")
                                }, 10)
                            },
                            f = function(e) {
                                switch (e.keyCode) {
                                    case 13:
                                    case 32:
                                        e.preventDefault(), h(e);
                                        break;
                                    case 35:
                                        e.preventDefault(), i.eq(i.length - 1).focus();
                                        break;
                                    case 36:
                                        e.preventDefault(), i.eq(0).focus();
                                        break;
                                    case 37:
                                    case 38:
                                        e.preventDefault(), t.prev().focus();
                                        break;
                                    case 39:
                                    case 40:
                                        e.preventDefault(), t.next().focus()
                                }
                            };
                        if (a.horizontalMenu({
                                slider: ">.container",
                                items: ".title-links-list > ul > li",
                                back: ".back",
                                drop: ">ul"
                            }), r > 2)
                            for (var m = 0; r > m; m += 2) o.slice(m, m + 2).wrapAll('<div class="holder" />');
                        t.hasClass(l) ? (e = a, a.attr({
                            "aria-hidden": "false",
                            "aria-expanded": "true"
                        })) : a.attr({
                            "aria-hidden": "true",
                            "aria-expanded": "false"
                        }), u(), s.on(b, h), c.on("resize", u), c.on("destroy.menu", p), t.on("keydown", f)
                    })
                })
            },
            off: function() {
                c.trigger("destroy.menu").off("destroy.menu"), jQuery(".header-nav-drop-panel").each(function() {
                    var e = jQuery(this);
                    e.stop().removeAttr("aria-hidden").removeAttr("aria-expanded"), e.data("HorizontalMenu") && e.data("HorizontalMenu").destroy()
                })
            }
        },
        "768..": {
            on: function() {
                setTimeout(function() {
                    u.each(function() {
                        {
                            var e = jQuery(this),
                                t = e.closest(".container"),
                                i = e.find(">li");
                            new TouchNav({
                                navBlock: this,
                                menuDrop: "div.header-nav-drop-panel",
                                onShow: function(e) {
                                    m.data("OpenClose") && e.length && m.data("OpenClose").hideSlide(), k(e)
                                },
                                onHide: function() {
                                    p ? u.css({
                                        marginBottom: ""
                                    }) : h.css({
                                        paddingTop: ""
                                    }), w()
                                }
                            })
                        }
                        i.each(function() {
                            var e = jQuery(this),
                                i = e.find(".header-nav-drop-panel"),
                                n = i.find(".row").children(),
                                l = function() {
                                    if (e.hasClass(s) || e.hasClass(a) || e.hasClass(o)) {
                                        i.css({
                                            display: "block"
                                        });
                                        var n = e.outerWidth(),
                                            r = e.hasClass(s);
                                        i.css(p ? {
                                            left: -(i.outerWidth(!0) / 2 - n / 2)
                                        } : {
                                            left: -((r ? i.outerWidth() : i.width()) / 2 - n / 2)
                                        });
                                        var l = p ? t.offset().left : d.offset().left;
                                        i.offset().left + i.outerWidth() > l + (p ? t.width() : d.width()) ? (i.css({
                                            left: "auto",
                                            right: 0
                                        }), i.offset().left < l && i.css({
                                            right: -(1 + l - i.offset().left + parseInt(i.css("margin-left")))
                                        })) : i.offset().left < l && i.css({
                                            left: 0
                                        }), i.css({
                                            display: ""
                                        })
                                    }
                                };
                            switch (n.length) {
                                case 1:
                                    e.addClass(s);
                                    break;
                                case 2:
                                    e.addClass(a);
                                    break;
                                case 3:
                                    e.addClass(o);
                                    break;
                                case 4:
                                    e.addClass(r)
                            }
                            l(), c.on("resize", l)
                        })
                    })
                }, 20)
            },
            off: function() {
                u.replaceWith(f.clone()), u = jQuery("#nav, #nav02"), initDropDownClasses(), initChildClasses(), initAdressFix(), initVerticalAlign()
            }
        }
    })
}

function initCarousel() {
    jQuery(".carousel").scrollGallery({
        mask: ".mask",
        slider: ".slideset",
        slides: ".slide",
        btnPrev: ".btn-prev",
        btnNext: ".btn-next",
        generatePagination: ".pagination",
        stretchSlideToMask: !0,
        autoHeight: !0,
        maskAutoSize: !0,
        autoRotation: !1,
        switchTime: 5e3,
        animSpeed: 500,
        onInit: function(e) {
            e.win = jQuery(window), e.pagerHolder && (e.pagerPosition = function(t) {
                var i = e.slides.eq(e.currentStep).find(".content-block"),
                    n = i.length ? i.outerHeight(!0) : parseInt(e.pagerHolder.css("bottom"));
                e.pagerHolder.animate({
                    bottom: n
                }, {
                    queue: !1,
                    duration: t ? 0 : e.options.animSpeed
                })
            }, e.resizeHandler = function() {
                e.pagerPosition(!0)
            }, ResponsiveHelper.addRange({
                "..767": {
                    on: function() {
                        e.pagerPosition(!0), e.win.on("load resize", e.resizeHandler)
                    },
                    off: function() {
                        e.win.off("resize", e.resizeHandler), setTimeout(function() {
                            e.pagerHolder.removeAttr("style")
                        }, 20)
                    }
                }
            }))
        },
        onBeforeChange: function(e) {
            e.pagerHolder && ResponsiveHelper.addRange({
                "..767": {
                    on: function() {
                        e.pagerPosition()
                    }
                }
            })
        }
    })
}

function initRSS() {
    var e = function(e, t) {
        return e.length > t ? e.slice(0, t - 1) + "…" : e
    };
    jQuery(".home-rss-news").readerRSS({
        set: ".post-list",
        onLoad: function(t, i) {
            i.responseData && (t.set.empty(), jQuery.each(i.responseData.feed.entries, function(i, n) {
                var s, a = "",
                    o = "",
                    r = jQuery("<div />"),
                    l = new Date(n.publishedDate),
                    c = l.getDate(),
                    d = l.getMonth() + 1,
                    h = l.getFullYear() % 100,
                    u = n.title,
                    p = n.link;
                r.html(n.content), a = r.find("img:first").attr("src"), "undefined" != typeof a && (o = '<img width="80" src="' + a + '" alt="' + u + '">'), 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), 10 > h && (h = "0" + h), s = jQuery('<li class="post">' + o + '<div class="text"><time datetime="' + l.getFullYear() + "-" + c + "-" + d + '">' + c + "/" + d + "/" + h + '</time><p><a href="' + p + '">' + e(u, 85) + "</a></p></div></li>").appendTo(t.set)
            }))
        }
    }), jQuery(".rss-news").readerRSS({
        set: ".rss-gallery",
        onLoad: function(t, i) {
            i.responseData && jQuery.each(i.responseData.feed.entries, function(i, n) {
                {
                    var s = n.title,
                        a = n.link;
                    jQuery('<div class="item"><a href="' + a + '">' + e(s, 85) + "</a></div>").appendTo(t.set)
                }
            })
        }
    })
}

function initDatepicker() {
    var e = "expanded",
        t = jQuery(window);
    jQuery(function(e) {
        e.datepicker.regional[MLocale.currentLocale] = {
            closeText: MLocale.get("ui_close_text"),
            prevText: MLocale.get("ui_prev_text"),
            nextText: MLocale.get("ui_next_text"),
            currentText: MLocale.get("ui_current_text"),
            monthNames: MLocale.get("ui_month_names"),
            monthNamesShort: MLocale.get("ui_month_names_short"),
            dayNames: MLocale.get("ui_day_names"),
            dayNamesShort: MLocale.get("ui_day_names_short"),
            dayNamesMin: MLocale.get("ui_day_names_min"),
            weekHeader: MLocale.get("ui_week_header"),
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, jQuery.datepicker.setDefaults(e.datepicker.regional[MLocale.currentLocale])
    }), jQuery(".date-field").each(function() {
        var e, t, i, n = jQuery(this),
            s = n.find("input:text"),
            a = jQuery('<a href="#" tabindex="0" class="ui-datepicker-prev-year"><span>prev-year</span></a>'),
            o = jQuery('<a href="#" tabindex="0" class="ui-datepicker-next-year"><span>next-year</span></a>'),
            r = jQuery('<div class="ui-datepicker-year-wrapper"></div>'),
            l = function(e) {
                e.stopPropagation(), s.focus()
            },
            c = function() {
                setTimeout(function() {
                    var e = o.clone(),
                        t = a.clone(),
                        i = r.clone(),
                        n = jQuery("div.ui-datepicker-header"),
                        l = s.datepicker("getDate").getFullYear();
                    e.click(function(e) {
                        var t = s.datepicker("getDate");
                        t.setYear(t.getFullYear() + 1), s.datepicker("setDate", t), e.preventDefault()
                    }), t.click(function(e) {
                        var t = s.datepicker("getDate");
                        t.setYear(t.getFullYear() - 1), s.datepicker("setDate", t), e.preventDefault()
                    }), i.append(t, l, e), n.children().wrapAll('<div class="ui-datepicker-month-wrapper"></div>'), n.append(i)
                }, 0)
            },
            d = function(e) {
                switch (e.keyCode) {
                    case 13:
                    case 32:
                        e.preventDefault();
                        var t = jQuery(".ui-datepicker-header .ui-global-focus"),
                            i = t.attr("class").split(" ")[0];
                        t.trigger("click"), setTimeout(function() {
                            jQuery(".ui-datepicker-header").find("." + i).focus()
                        }, 400)
                }
            },
            h = function(t) {
                switch (t.keyCode) {
                    case 13:
                    case 32:
                        t.preventDefault(), e.eq(i).find("a").trigger("click");
                        break;
                    case 35:
                        t.preventDefault(), i = e.length - 1, e.eq(i).focus();
                        break;
                    case 36:
                        t.preventDefault(), i = 0, e.eq(i).focus();
                        break;
                    case 37:
                        t.preventDefault(), i--, 0 > i && (i = 0), e.eq(i).focus();
                        break;
                    case 38:
                        t.preventDefault(), i -= 7, 0 > i && (i = 0), e.eq(i).focus();
                        break;
                    case 39:
                        t.preventDefault(), i++, i > e.length - 1 && (i = e.length - 1), e.eq(i).focus();
                        break;
                    case 40:
                        t.preventDefault(), i += 7, i > e.length - 1 && (i = e.length - 1), e.eq(i).focus()
                }
            },
            u = function() {
                setTimeout(function() {
                    e = jQuery(".ui-datepicker-calendar tbody td").not(".ui-datepicker-unselectable"), t = e.eq(0), t.focus(), i = e.index(t)
                }, 10)
            };
        s.datepicker({
            dateFormat: "dd|mm|yy",
            showOtherMonths: !0,
            onChangeMonthYear: function() {
                c(), setTimeout(function() {
                    s.blur(), jQuery(".ui-datepicker-calendar").on("keydown", h), jQuery(".ui-datepicker-header").on("keydown", d)
                }, 400)
            },
            beforeShow: function() {
                c(), u(), setTimeout(function() {
                    s.blur(), jQuery(".ui-datepicker").find("a").eq(0).focus(), jQuery(".ui-datepicker-calendar").on("keydown", h), jQuery(".ui-datepicker-header").on("keydown", d)
                }, 400)
            }
        }).datepicker("setDate", new Date), n.on("click", l)
    }), jQuery(".calendar").each(function() {
        var i, n, s, a, o = jQuery(this),
            r = o.data("target"),
            l = function(e) {
                var t = o.xmldatepicker("getEventByDate", e);
                if (t) {
                    var i = "";
                    return jQuery(t.events).each(function() {
                        i += '<li><a tabindex="0" href="' + this.target + '">' + this.title + "</a></li>"
                    }), i
                }
                return ""
            },
            c = function(e) {
                switch (e.keyCode) {
                    case 13:
                    case 32:
                        e.preventDefault();
                        var t = o.find(".ui-global-focus"),
                            i = t.attr("class").split(" ")[0];
                        o.find(".ui-global-focus").trigger("click"), setTimeout(function() {
                            o.find("." + i).focus()
                        }, 400)
                }
            },
            d = function(e) {
                switch (n = i.find(".ui-global-focus").parent(), n.length && (a = i.index(n)), e.keyCode) {
                    case 13:
                    case 32:
                        e.preventDefault(), o.find(".ui-global-focus").trigger("click"), setTimeout(function() {
                            o.find(".expanded .calendar-drop a").eq(1).focus()
                        }, 100);
                        break;
                    case 35:
                        e.preventDefault(), a = i.length - 1, i.eq(a).focus();
                        break;
                    case 36:
                        e.preventDefault(), a = 0, i.eq(a).focus();
                        break;
                    case 37:
                        e.preventDefault(), a--, 0 > a && (setTimeout(function() {
                            i = jQuery(".ui-datepicker-calendar tbody td"), a = i.length - 1, i.eq(a).attr("tabindex", "0").focus()
                        }, 400), jQuery(".ui-datepicker-prev").trigger("click")), i.eq(a).focus();
                        break;
                    case 38:
                        e.preventDefault(), a -= 7, 0 > a && (jQuery(".ui-datepicker-prev").trigger("click"), setTimeout(function() {
                            i = jQuery(".ui-datepicker-calendar tbody td"), a = i.length - a, a > i.length && (a -= 2 * (a - i.length)), i.eq(a).attr("tabindex", "0").focus()
                        }, 400)), i.eq(a).focus();
                        break;
                    case 39:
                        e.preventDefault(), a++, a > i.length - 1 && (setTimeout(function() {
                            i = jQuery(".ui-datepicker-calendar tbody td"), a = 0, i.eq(a).attr("tabindex", "0").focus()
                        }, 400), jQuery(".ui-datepicker-next").trigger("click")), i.eq(a).focus();
                        break;
                    case 40:
                        e.preventDefault(), a += 7, a > i.length - 1 && (jQuery(".ui-datepicker-next").trigger("click"), setTimeout(function() {
                            i = jQuery(".ui-datepicker-calendar tbody td"), a -= i.length, a > 7 ? a -= 7 : 0 > a && (a = 7 + a), i.eq(a).attr("tabindex", "0").focus()
                        }, 400)), i.eq(a).focus()
                }
            },
            h = function() {
                setTimeout(function() {
                    i = jQuery(".ui-datepicker-calendar tbody td"), n = i.filter(".ui-datepicker-today"), a = i.index(n)
                }, 10)
            },
            u = function(t) {
                jQuery(t.target).closest(".calendar-drop").length || (o.find(".ui-datepicker-current-day").removeClass(e), t.stopPropagation())
            };
        o.xmldatepicker({
            sourceURL: r,
            startDate: new Date,
            xmlNodeName: "day",
            xmlNodeDate: "date",
            onRefreshMonth: function(i, n) {
                var a = n.ui.element.find("." + n.ui.options.eventClass);
                a.each(function(i, n) {
                    var a = jQuery(n),
                        r = jQuery('<div class="calendar-drop"><a tabindex="0" class="btn-close" href="#">' + MLocale.get("ui_close_text") + '</a><h2>Eventos</h2><ul></ul></div>"'),
                        c = r.find("ul"),
                        d = a.attr("class").replace(/^[\s\S]*date-([^\s]+)[\s\S]*$/gi, "$1"),
                        h = function() {
                            var e = o.find(".ui-datepicker-current-day"),
                                t = e.find(".calendar-drop");
                            t.is(":visible") && t.css({
                                marginTop: -(o.offset().top + o.height() - (e.offset().top + e.height()))
                            })
                        },
                        u = function() {
                            window.location.href = jQuery(this).attr("href")
                        },
                        p = function(i) {
                            i.preventDefault(), setTimeout(function() {
                                a.hasClass(e) ? o.find(".ui-datepicker-current-day").removeClass(e) : (o.find(".ui-datepicker-current-day").addClass(e), h(), t.on("resize", h)), s = o.find(".ui-datepicker-calendar a").index(o.find(".ui-datepicker-current-day > a"))
                            }, 20)
                        },
                        f = function(e) {
                            e.preventDefault(), setTimeout(function() {
                                o.find(".ui-datepicker-calendar a").eq(s).focus()
                            }, 400)
                        };
                    d = d.replace(/-/g, "/"), c.html(l(d)), a.append(r), a.find(">a").on("click", p), a.find(".calendar-drop ul a").on("click", u), r.find(".btn-close").on("click", f)
                }), o.find(".ui-datepicker-calendar").on("keydown", d), o.find(".ui-datepicker-header").on("keydown", c)
            },
            parseElement: function(e) {
                var t = [];
                return e.find("event").each(function(e) {
                    var i = jQuery(this);
                    t[e] = {
                        title: i.find("title").text(),
                        target: i.find("target").text()
                    }
                }), {
                    events: t
                }
            }
        }), setTimeout(function() {
            h()
        }, 500), jQuery(document).on("click", u)
    })
}

function initXMLStockuotes() {
    jQuery(".mapfre-share").each(function() {
        var e = jQuery(this),
            t = e.find(".date"),
            i = e.find(".time"),
            n = e.find("time"),
            s = e.find(".change"),
            a = e.find(".percentage-change"),
            o = e.find(".current-price"),
            r = e.data("target");
        e.removeAttr("data-target"), jQuery.ajax({
            type: "post",
            dataType: "text",
            url: "inc/proxy.php?url=" + encodeURIComponent(r),
            success: function(e) {
                var r = jQuery(e),
                    l = r.find("Date").text().split("/"),
                    c = l[0],
                    d = l[1],
                    h = l[2];
                10 > c && (c = "0" + c), 10 > d && (d = "0" + d), n.attr("datetime", h + "-" + d + "-" + c + "T" + r.find("Time").text().split(" ")[0]), i.html(r.find("Time").text().split(" ")[0]), t.html(c + "/" + d + "/" + h), o.html(r.find("CurrentPrice").text()), s.html(r.find("Change").text()), a.html(r.find("PercentageChange").text())
            }
        })
    })
}

function initVerticalAlign() {
    jQuery(".col-sm-12 .customer-services-links li").each(function() {
        var e = jQuery(this),
            t = e.find("a");
        t.length && ResponsiveHelper.addRange({
            "768..959": {
                on: function() {
                    setTimeout(function() {
                        t.css({
                            marginTop: e.height() / 2 - t.height() / 2
                        })
                    }, 50)
                },
                off: function() {
                    t.removeAttr("style")
                }
            }
        })
    })
}

function initCheckAll() {
    var e = "all-checked";
    jQuery(".advanced-search").each(function() {
        var t = jQuery(this),
            i = t.find(".text a"),
            n = t.find(".checkbox-list input:checkbox"),
            s = function(t) {
                t.preventDefault(), i.hasClass(e) ? (i.removeClass(e), n.prop("checked", !1)) : (i.addClass(e), n.prop("checked", !0)), n.each(function() {
                    jcf.customForms.refreshElement(this)
                })
            };
        i.on("click", s)
    })
}

function initInputs() {
    PlaceholderInput.replaceByOptions({
        clearInputs: !0,
        clearTextareas: !0,
        clearPasswords: !0,
        skipClass: "default",
        wrapWithElement: !1,
        showUntilTyping: !1,
        getParentByClass: !1,
        placeholderAttr: "placeholder"
    })
}

function initLightbox() {
    var e, t = jQuery(window),
        i = 20,
        n = 0,
        s = null,
        a = function() {
            var n = function() {
                if (jQuery("#fancybox-content, #fancybox-wrap, #fancybox-title").css({
                        width: "auto",
                        height: "auto",
                        left: ""
                    }), t.width() < 768) {
                    var e = jQuery("#fancybox-frame"),
                        n = e.closest(".modal-dialog-box");
                    e.css({
                        minWidth: t.width() - 2 * i - 2 * parseInt(n.css("padding-left"))
                    })
                } else jQuery("#fancybox-frame").css({
                    minWidth: ""
                });
                jQuery.fancybox.resize(), jQuery.fancybox.center()
            };
            n(), clearTimeout(e), e = setTimeout(n, 300)
        };
    jQuery('a.lightbox, a[data-rel*="lightbox"]').each(function() {
        var e, o = jQuery(this),
            r = o.hasClass("iframe"),
            l = o.attr("title"),
            c = function() {
                s = o
            },
            d = function(t) {
                switch (t.keyCode) {
                    case 9:
                        n++, n > e.length - 1 && (n = 0), e.eq(n).focus(), t.preventDefault()
                }
            };
        o.on("click", c), o.attr("rel", o.attr("data-rel")).fancybox({
            padding: 0,
            margin: i,
            cyclic: !1,
            autoScale: !0,
            overlayShow: !0,
            showNavArrows: !1,
            showCloseButton: !1,
            overlayOpacity: .5,
            width: "auto",
            height: "auto",
            overlayColor: "#000000",
            titleShow: !1,
            onComplete: function(i) {
                if (r) {
                    var s = jQuery("#fancybox-content"),
                        c = s.find("#fancybox-frame");
                    s.append('<div class="modal-dialog-box"><a href="#" class="close"></a></div>'), s.find(".modal-dialog-box").prepend(c), s.find("a.close").unbind("click.fb").bind("click.fb", function(e) {
                        jQuery.fancybox.close(), e.preventDefault()
                    }), l.length && s.find(".modal-dialog-box").prepend('<div class="modal-dialog-header"><h2>' + l + "</h2></div>")
                }
                if (0 === o.attr("href").indexOf("#")) {
                    var h = jQuery("#fancybox-content .modal-dialog-box");
                    h.find("a.close").unbind("click.fb").bind("click.fb", function(e) {
                        jQuery.fancybox.close(), e.preventDefault()
                    }), h.find(".multimedia-paging .next").unbind("click.fb").bind("click.fb", function(e) {
                        jQuery.fancybox.next(), e.preventDefault()
                    }), h.find(".multimedia-paging .prev").unbind("click.fb").bind("click.fb", function(e) {
                        jQuery.fancybox.prev(), e.preventDefault()
                    }), e = h.find("a"), e.eq(n).focus(), h.on("keydown", d)
                }
                if (t.bind("resize", a), a(), window.Hammer) {
                    var u = new Hammer.Manager(jQuery("#fancybox-wrap")[0]);
                    u.add(new Hammer.Pan({
                        direction: Hammer.DIRECTION_HORIZONTAL,
                        threshold: 15
                    })), u.on("panleft panright", function(e) {
                        switch (e.type) {
                            case "panleft":
                                jQuery.fancybox.next();
                                break;
                            case "panright":
                                jQuery.fancybox.prev()
                        }
                    })
                }
            },
            onClosed: function() {
                t.unbind("resize", a), s && (s.focus(), s = null)
            }
        })
    })
}

function initValidation() {
    var e = "has-error",
        t = "success",
        i = "success-form",
        n = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        s = /^[a-zA-Z\ \.\-]+$/,
        a = /^\+?[0-9]+$/;
    jQuery(".contact-box").each(function() {
        function o(e) {
            u = !0, h.each(r), u && jQuery.ajax({
                url: d.attr("action"),
                type: d.attr("method") || "GET",
                data: d.serialize(),
                success: function() {
                    c.addClass(i)
                }
            }), e.preventDefault()
        }

        function r(e, t) {
            var i = jQuery(t),
                o = i.closest(".field");
            i.hasClass("required") && l(o, i, !i.val().length || i.val() === i.prop("defaultValue")), i.hasClass("required-name") && l(o, i, !s.test(i.val()) || i.val() === i.data("placeholder")), i.hasClass("required-email") && l(o, i, !n.test(i.val())), i.hasClass("required-select") && l(o, i, 0 === i.get(0).selectedIndex), i.hasClass("required-number") && l(o, i, !a.test(i.val())), i.hasClass("required-checkbox") && l(o, i, !i.is(":checked"))
        }

        function l(i, n, s) {
            i.removeClass(e).removeClass(t), s ? (i.addClass(e), n.one("focus", function() {
                i.removeClass(e).removeClass(t)
            }), n.attr({
                "aria-invalid": "true"
            }), u = !1) : (i.addClass(t), n.attr({
                "aria-invalid": "false"
            }))
        }
        var c = jQuery(this),
            d = c.find("form").attr("novalidate", "novalidate"),
            h = d.find("input, textarea, select"),
            u = (c.find(".message-ok"), !0);
        d.submit(o)
    })
}

function initSpeechRecognition() {
    function e(e) {
        return e.length ? e[0].toUpperCase() + e.slice(1) : e
    }
    var t = "speech-active";
    "undefined" != typeof webkitSpeechRecognition && jQuery('[type="search"]').each(function() {
        var i = jQuery(this),
            n = i.parent(),
            s = jQuery('<span class="icon-newsroom"  title="' + MLocale.get("ui_title_speech_recognition") + '" />'),
            a = function() {
                n.hasClass(t) ? (n.removeClass(t), o.stop()) : (n.addClass(t), i.focus(), o.start())
            },
            o = new webkitSpeechRecognition,
            r = "";
        s.insertAfter(i), s.on("click", a), o.onresult = function(t) {
            r = "";
            for (var n = t.resultIndex; n < t.results.length; ++n) t.results[n].isFinal && (r += t.results[n][0].transcript);
            r = e(r), i.val(r)
        }, o.onend = function() {
            n.removeClass(t)
        }
    })
}

function TouchNav(e) {
    this.options = {
        hoverClass: "hover",
        menuItems: "li",
        menuOpener: "a",
        menuDrop: "ul",
        navBlock: null
    };
    for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
    this.init()
}

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(e) {
    mejs.YouTubeApi.flashReady(e)
}
jQuery(function() {
    initSearchTransfer(), initAjaxDropDown(), initChildClasses(), initAccordion(), initOpenClose(), jQuery("body").addClass("js-ready"), jcf.customForms.replaceAll(), initRefreshCustomForms(), initSpeechRecognition(), initSelectNavigation(), initDropDownClasses(), initDatepicker(), initSameHeight(), initLightbox(), initInputs(), initRSS(), initValidation(), initFitVids(), initMediaElement(), initCheckAll(), initGlobalFocus(), initVerticalAlign(), initXMLStockuotes(), initFilterSelect(), initResizeCustomScroll(), initKeyboardSupport(), initCarousel(), initPrint(), initTabs(), initLayoutFix()
}), jQuery(window).load(function() {
    jQuery("body").addClass("js-load")
});
var browserInfo = /(MSIE) ([\w.]+)/.exec(navigator.userAgent);
browserInfo = browserInfo ? {
        msie: !0,
        version: browserInfo[2]
    } : {},
    function(e) {
        function t(t) {
            this.options = e.extend({
                set: ".set"
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && (this.findElements(), this.ajaxCall())
            },
            findElements: function() {
                this.holder = e(this.options.holder), this.set = this.holder.find(this.options.set), this.target = document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(this.holder.data("target")), "undefined" != typeof this.holder.data("num") && (this.target += "&num=" + this.holder.data("num")), this.holder.removeAttr("data-target").removeAttr("data-num")
            },
            ajaxCall: function() {
                var t = this;
                e.ajax({
                    url: this.target,
                    dataType: "json",
                    success: function(e) {
                        t.set.empty(), t.makeCallback("onLoad", t, e)
                    }
                })
            },
            makeCallback: function(e) {
                if ("function" == typeof this.options[e]) {
                    var t = Array.prototype.slice.call(arguments);
                    t.shift(), this.options[e].apply(this, t)
                }
            }
        }, e.fn.readerRSS = function(i) {
            return this.each(function() {
                e(this).data("ReaderRSS", new t(e.extend(i, {
                    holder: this
                })))
            })
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                animSpeed: 300,
                activeClass: "expanded",
                slider: ">ul",
                items: ".second-drop-footer > ul > li",
                back: ".back-link a",
                drop: ".third-drop-footer"
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && this.findElements()
            },
            findElements: function() {
                var t = this;
                this.holder = e(this.options.holder), this.slider = this.holder.find(this.options.slider), this.items = this.holder.find(this.options.items), this.items.each(function() {
                    var i = e(this),
                        n = i.find(t.options.drop),
                        s = i.find(">a"),
                        a = n.find(t.options.back);
                    if (n.length) {
                        var o = function(e) {
                                e.preventDefault(), i.hasClass(t.options.activeClass) || (i.addClass(t.options.activeClass), t.slider.animate({
                                    marginLeft: "-100%"
                                }, {
                                    duration: t.options.animSpeed,
                                    queue: !1
                                }), t.holder.animate({
                                    height: n.outerHeight()
                                }, {
                                    duration: t.options.animSpeed,
                                    queue: !1
                                }))
                            },
                            r = function(e) {
                                e.preventDefault(), i.hasClass(t.options.activeClass) && (t.slider.css({
                                    marginLeft: -t.holder.outerWidth()
                                }).animate({
                                    marginLeft: 0
                                }, {
                                    duration: t.options.animSpeed,
                                    queue: !1,
                                    complete: function() {
                                        i.removeClass(t.options.activeClass)
                                    }
                                }), t.holder.animate({
                                    height: t.slider.outerHeight()
                                }, {
                                    duration: t.options.animSpeed,
                                    queue: !1,
                                    complete: function() {
                                        t.holder.css({
                                            height: ""
                                        })
                                    }
                                }))
                            };
                        s.on("click", o), a.on("click", r)
                    }
                })
            },
            makeCallback: function(e) {
                if ("function" == typeof this.options[e]) {
                    var t = Array.prototype.slice.call(arguments);
                    t.shift(), this.options[e].apply(this, t)
                }
            },
            destroy: function() {
                this.items.removeClass(this.options.activeClass), this.items.find(">a").off("click"), this.items.find(".back-link a").off("click"), this.slider.add(this.holder).removeAttr("style"), this.items.find(".third-drop-footer").removeAttr("style")
            }
        }, e.fn.horizontalMenu = function(i) {
            return this.each(function() {
                e(this).data("HorizontalMenu", new t(e.extend(i, {
                    holder: this
                })))
            })
        }
    }(jQuery),
    function(e) {
        e.fn.slideAccordion = function(n) {
            var s = e.extend({
                addClassBeforeAnimation: !1,
                expnadedClass: "expanded",
                activeClass: "active",
                expandAll: !1,
                opener: ".opener",
                slider: ".slide",
                animSpeed: 300,
                collapsible: !0,
                tabindex: !0,
                focusLink: !1,
                event: "click"
            }, n);
            return this.each(function() {
                var n = (e(window), e(this)),
                    a = n.find(s.expandAll),
                    o = n.find(":has(" + s.slider + ")"),
                    r = (n.find(s.opener), !0);
                if (!n.data("disable")) {
                    var l = function(e) {
                            o.each(function() {
                                var t = jQuery(this),
                                    i = t.find(s.opener);
                                t.hasClass(s.activeClass) ? e && i.trigger("click") : e || i.trigger("click")
                            })
                        },
                        c = function(e) {
                            var t = n.hasClass(s.expnadedClass);
                            t ? (n.removeClass(s.expnadedClass), r = !0) : (n.addClass(s.expnadedClass), r = !1), l(t), e.preventDefault()
                        },
                        d = function(e) {
                            switch (e.keyCode) {
                                case 13:
                                case 32:
                                    e.preventDefault(), c(e)
                            }
                        };
                    a.bind("click", c), a.bind("keydown", d), o.each(function(l) {
                        var c = e(this),
                            d = c.find(s.opener),
                            h = c.find(s.slider),
                            u = function(e) {
                                switch (e.keyCode) {
                                    case 13:
                                    case 32:
                                        e.preventDefault(), d.trigger("click");
                                        break;
                                    case 35:
                                        e.preventDefault(), o.eq(o.length - 1).focus();
                                        break;
                                    case 36:
                                        e.preventDefault(), o.eq(0).focus();
                                        break;
                                    case 37:
                                    case 38:
                                        e.preventDefault();
                                        var t = l - 1;
                                        0 > t && (t = 0), o.eq(t).focus();
                                        break;
                                    case 39:
                                    case 40:
                                        e.preventDefault();
                                        var i = l + 1;
                                        i > o.length - 1 && (i = o.length - 1), o.eq(i).focus()
                                }
                            },
                            p = function() {
                                d.unbind("click"), a.unbind("click"), n.off("destroy.accordion", p), setTimeout(function() {
                                    o.removeClass("active").removeAttr("tabindex"), h.removeAttr("style aria-hidden aria-expanded")
                                }, 10)
                            };
                        n.on("destroy.accordion", p), s.focusLink ? d.on("keydown", u) : c.on("keydown", u), d.bind(s.event, function(e) {
                            if (!h.is(":animated"))
                                if (c.hasClass(s.activeClass)) s.collapsible && h.slideUp(s.animSpeed, function() {
                                    i(h), c.removeClass(s.activeClass), h.attr({
                                        "aria-hidden": "true",
                                        "aria-expanded": "false"
                                    }), s.tabindex && c.attr("tabindex", "-1"), "function" == typeof s.animEnd && s.animEnd(!1, h)
                                });
                                else {
                                    var n = o.filter("." + s.activeClass),
                                        a = n.find(s.slider);
                                    c.addClass(s.activeClass), t(h).hide().slideDown(s.animSpeed, function() {
                                        "function" == typeof s.animEnd && s.animEnd(!0, h)
                                    }), r && a.slideUp(s.animSpeed, function() {
                                        n.removeClass(s.activeClass), i(a), a.attr({
                                            "aria-hidden": "true",
                                            "aria-expanded": "false"
                                        }), s.tabindex && n.attr("tabindex", "-1")
                                    }), h.attr({
                                        "aria-hidden": "false",
                                        "aria-expanded": "true"
                                    }), s.tabindex && c.attr("tabindex", "0")
                                }
                            e.preventDefault()
                        }), c.hasClass(s.activeClass) ? (t(h), h.attr({
                            "aria-hidden": "false",
                            "aria-expanded": "true"
                        })) : (i(h), h.attr({
                            "aria-hidden": "true",
                            "aria-expanded": "false"
                        }))
                    }), s.tabindex && o.attr("tabindex", "-1").eq(0).attr("tabindex", "0")
                }
            })
        };
        var t = function(e) {
                return e.css({
                    position: "",
                    top: "",
                    left: "",
                    width: ""
                })
            },
            i = function(e) {
                return e.show().css({
                    position: "absolute",
                    top: -9999,
                    left: -9999,
                    width: e.width()
                })
            }
    }(jQuery), MLocale = {
        currentLocale: jQuery("html").attr("lang") || "en",
        get: function(e) {
            var t = LocaleData[this.currentLocale][e],
                i = Array.prototype.slice.call(arguments, 1);
            return "function" == typeof t ? t.apply(this, i) : t
        }
    }, jQuery(function() {
        var e = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            t = /Windows Phone/.test(navigator.userAgent);
        if (!e && !t) {
            var i = document.getElementsByTagName("head")[0],
                n = document.createElement("style"),
                s = document.createTextNode("#fancybox-overlay{position:fixed;bottom:0;top:0;left:0;}");
            n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = s.nodeValue : n.appendChild(s), i.appendChild(n)
        }
    }), jcf = {
        modules: {},
        plugins: {},
        baseOptions: {
            unselectableClass: "jcf-unselectable",
            labelActiveClass: "jcf-label-active",
            labelDisabledClass: "jcf-label-disabled",
            classPrefix: "jcf-class-",
            hiddenClass: "jcf-hidden",
            focusClass: "jcf-focus",
            wrapperTag: "div"
        },
        customForms: {
            setOptions: function(e) {
                for (var t in e) e.hasOwnProperty(t) && "object" == typeof e[t] && jcf.lib.extend(jcf.modules[t].prototype.defaultOptions, e[t])
            },
            replaceAll: function(e) {
                for (var t in jcf.modules)
                    for (var i = jcf.lib.queryBySelector(jcf.modules[t].prototype.selector, e), n = 0; n < i.length; n++) i[n].jcf ? i[n].jcf.refreshState() : !jcf.lib.hasClass(i[n], "default") && jcf.modules[t].prototype.checkElement(i[n]) && new jcf.modules[t]({
                        replaces: i[n]
                    })
            },
            refreshAll: function(e) {
                for (var t in jcf.modules)
                    for (var i = jcf.lib.queryBySelector(jcf.modules[t].prototype.selector, e), n = 0; n < i.length; n++) i[n].jcf && i[n].jcf.refreshState()
            },
            refreshElement: function(e) {
                e && e.jcf && e.jcf.refreshState()
            },
            destroyAll: function() {
                for (var e in jcf.modules)
                    for (var t = jcf.lib.queryBySelector(jcf.modules[e].prototype.selector), i = 0; i < t.length; i++) t[i].jcf && t[i].jcf.destroy()
            }
        },
        isTouchDevice: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        isWinPhoneDevice: /Windows Phone/.test(navigator.userAgent),
        setBaseModule: function(e) {
            jcf.customControl = function(e) {
                this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, e), this.init()
            };
            for (var t in e) jcf.customControl.prototype[t] = e[t]
        },
        addModule: function(e) {
            if (e.name) {
                jcf.modules[e.name] = function() {
                    jcf.modules[e.name].superclass.constructor.apply(this, arguments)
                }, jcf.lib.inherit(jcf.modules[e.name], jcf.customControl);
                for (var t in e) jcf.modules[e.name].prototype[t] = e[t];
                jcf.modules[e.name].prototype.onCreateModule();
                for (var i in jcf.modules) jcf.modules[i] != jcf.modules[e.name] && jcf.modules[i].prototype.onModuleAdded(jcf.modules[e.name])
            }
        },
        addPlugin: function(e) {
            if (e && e.name) {
                jcf.plugins[e.name] = function() {
                    this.init.apply(this, arguments)
                };
                for (var t in e) jcf.plugins[e.name].prototype[t] = e[t]
            }
        },
        init: function() {
            return navigator.pointerEnabled ? (this.eventPress = "pointerdown", this.eventMove = "pointermove", this.eventRelease = "pointerup") : navigator.msPointerEnabled ? (this.eventPress = "MSPointerDown", this.eventMove = "MSPointerMove", this.eventRelease = "MSPointerUp") : (this.eventPress = this.isTouchDevice ? "touchstart" : "mousedown", this.eventMove = this.isTouchDevice ? "touchmove" : "mousemove", this.eventRelease = this.isTouchDevice ? "touchend" : "mouseup"), setTimeout(function() {
                jcf.lib.domReady(function() {
                    jcf.initStyles()
                })
            }, 1), this
        },
        initStyles: function() {
            var e = document.getElementsByTagName("head")[0],
                t = document.createElement("style"),
                i = document.createTextNode("." + jcf.baseOptions.unselectableClass + "{-moz-user-select:none;-webkit-tap-highlight-color:rgba(255,255,255,0);-webkit-user-select:none;user-select:none;}");
            t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = i.nodeValue : t.appendChild(i), e.appendChild(t)
        }
    }.init(), jcf.setBaseModule({
        init: function() {
            this.options.replaces && (this.realElement = this.options.replaces, this.realElement.jcf = this, this.replaceObject())
        },
        defaultOptions: {},
        checkElement: function(e) {
            return !0
        },
        replaceObject: function() {
            this.createWrapper(), this.attachEvents(), this.fixStyles(), this.setupWrapper()
        },
        createWrapper: function() {
            this.fakeElement = jcf.lib.createElement(this.options.wrapperTag), this.labelFor = jcf.lib.getLabelFor(this.realElement), jcf.lib.disableTextSelection(this.fakeElement), jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix)), jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass)
        },
        attachEvents: function() {
            jcf.lib.event.add(this.realElement, "focus", this.onFocusHandler, this), jcf.lib.event.add(this.realElement, "blur", this.onBlurHandler, this), jcf.lib.event.add(this.fakeElement, "click", this.onFakeClick, this), jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this), jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this), this.labelFor && (this.labelFor.jcf = this, jcf.lib.event.add(this.labelFor, "click", this.onFakeClick, this), jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this), jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this))
        },
        fixStyles: function() {
            if (jcf.isTouchDevice) {
                var e = "rgba(255,255,255,0)";
                this.realElement.style.webkitTapHighlightColor = e, this.fakeElement.style.webkitTapHighlightColor = e, this.labelFor && (this.labelFor.style.webkitTapHighlightColor = e)
            }
        },
        setupWrapper: function() {},
        refreshState: function() {},
        destroy: function() {
            this.fakeElement && this.fakeElement.parentNode && (this.fakeElement.parentNode.insertBefore(this.realElement, this.fakeElement), this.fakeElement.parentNode.removeChild(this.fakeElement)), jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass), this.realElement.jcf = null
        },
        onFocus: function() {
            jcf.lib.addClass(this.fakeElement, this.options.focusClass)
        },
        onBlur: function(e) {
            jcf.lib.removeClass(this.fakeElement, this.options.focusClass)
        },
        onFocusHandler: function() {
            this.focused || (this.focused = !0, jcf.isTouchDevice && (jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement && (jcf.focusedInstance.onBlur(), jcf.focusedInstance.realElement.blur()), jcf.focusedInstance = this), this.onFocus.apply(this, arguments))
        },
        onBlurHandler: function() {
            this.pressedFlag || (this.focused = !1, this.onBlur.apply(this, arguments))
        },
        onFakeClick: function() {
            jcf.isTouchDevice ? this.onFocus() : this.realElement.disabled || this.realElement.focus()
        },
        onFakePressed: function(e) {
            this.pressedFlag = !0
        },
        onFakeReleased: function() {
            this.pressedFlag = !1
        },
        onCreateModule: function() {},
        onModuleAdded: function(e) {},
        onControlReady: function() {}
    }), jcf.lib = {
        bind: function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        browser: function() {
            var e = navigator.userAgent.toLowerCase(),
                t = {},
                i = /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || [];
            return t[i[1]] = !0, t.version = i[2] || "0", t.safariMac = -1 != e.indexOf("mac") && -1 != e.indexOf("safari"), t
        }(),
        getOffset: function(e) {
            if (e.getBoundingClientRect && !jcf.isWinPhoneDevice) {
                var t = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                    i = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                    n = document.documentElement.clientLeft || document.body.clientLeft || 0,
                    s = document.documentElement.clientTop || document.body.clientTop || 0;
                return {
                    top: Math.round(e.getBoundingClientRect().top + i - s),
                    left: Math.round(e.getBoundingClientRect().left + t - n)
                }
            }
            for (var a = 0, o = 0; e.offsetParent;) a += e.offsetLeft, o += e.offsetTop, e = e.offsetParent;
            return {
                top: o,
                left: a
            }
        },
        getScrollTop: function() {
            return window.pageYOffset || document.documentElement.scrollTop
        },
        getScrollLeft: function() {
            return window.pageXOffset || document.documentElement.scrollLeft
        },
        getWindowWidth: function() {
            return "CSS1Compat" == document.compatMode ? document.documentElement.clientWidth : document.body.clientWidth
        },
        getWindowHeight: function() {
            return "CSS1Compat" == document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
        },
        getStyle: function(e, t) {
            return document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(e, null)[t] : e.currentStyle ? e.currentStyle[t] : e.style[t]
        },
        getParent: function(e, t) {
            for (; e.parentNode && e.parentNode != document.body;) {
                if (e.parentNode.tagName.toLowerCase() == t.toLowerCase()) return e.parentNode;
                e = e.parentNode
            }
            return !1
        },
        isParent: function(e, t) {
            for (; t.parentNode;) {
                if (t.parentNode === e) return !0;
                t = t.parentNode
            }
            return !1
        },
        getLabelFor: function(e) {
            var t = jcf.lib.getParent(e, "label");
            return t ? t : e.id ? jcf.lib.queryBySelector('label[for="' + e.id + '"]')[0] : void 0
        },
        disableTextSelection: function(e) {
            "undefined" != typeof e.onselectstart ? e.onselectstart = function() {
                return !1
            } : window.opera ? e.setAttribute("unselectable", "on") : jcf.lib.addClass(e, jcf.baseOptions.unselectableClass)
        },
        enableTextSelection: function(e) {
            "undefined" != typeof e.onselectstart ? e.onselectstart = null : window.opera ? e.removeAttribute("unselectable") : jcf.lib.removeClass(e, jcf.baseOptions.unselectableClass)
        },
        queryBySelector: function(e, t) {
            if ("string" == typeof t) {
                for (var i, n = [], s = this.getElementsBySelector(t), a = 0; a < s.length; a++) i = Array.prototype.slice.call(this.getElementsBySelector(e, s[a])), n = n.concat(i);
                return n
            }
            return this.getElementsBySelector(e, t)
        },
        prevSibling: function(e) {
            for (;
                (e = e.previousSibling) && 1 != e.nodeType;);
            return e
        },
        nextSibling: function(e) {
            for (;
                (e = e.nextSibling) && 1 != e.nodeType;);
            return e
        },
        fireEvent: function(e, t) {
            if (e.dispatchEvent) {
                var i = document.createEvent("HTMLEvents");
                return i.initEvent(t, !0, !0), !e.dispatchEvent(i)
            }
            if (document.createEventObject) {
                var i = document.createEventObject();
                return e.fireEvent("on" + t, i)
            }
        },
        inherit: function(e, t) {
            var i = function() {};
            i.prototype = t.prototype, e.prototype = new i, e.prototype.constructor = e, e.superclass = t.prototype
        },
        extend: function(e) {
            for (var t = 1; t < arguments.length; t++)
                for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
            return e
        },
        hasClass: function(e, t) {
            return e.className ? e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) : !1
        },
        addClass: function(e, t) {
            this.hasClass(e, t) || (e.className += (e.className.length && " " !== e.className.charAt(e.className.length - 1) ? " " : "") + t)
        },
        removeClass: function(e, t) {
            this.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ").replace(/\s+$/, ""))
        },
        toggleClass: function(e, t, i) {
            i ? this.addClass(e, t) : this.removeClass(e, t)
        },
        createElement: function(e, t) {
            var i = document.createElement(e);
            for (var n in t)
                if (t.hasOwnProperty(n)) switch (n) {
                    case "class":
                        i.className = t[n];
                        break;
                    case "html":
                        i.innerHTML = t[n];
                        break;
                    case "style":
                        this.setStyles(i, t[n]);
                        break;
                    default:
                        i.setAttribute(n, t[n])
                }
                return i
        },
        setStyles: function(e, t) {
            for (var i in t)
                if (t.hasOwnProperty(i)) switch (i) {
                    case "float":
                        e.style.cssFloat = t[i];
                        break;
                    case "opacity":
                        e.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * t[i] + ")", e.style.opacity = t[i];
                        break;
                    default:
                        e.style[i] = ("undefined" == typeof t[i] ? 0 : t[i]) + ("number" == typeof t[i] ? "px" : "")
                }
                return e
        },
        getInnerWidth: function(e) {
            return e.offsetWidth - (parseInt(this.getStyle(e, "paddingLeft")) || 0) - (parseInt(this.getStyle(e, "paddingRight")) || 0)
        },
        getInnerHeight: function(e) {
            return e.offsetHeight - (parseInt(this.getStyle(e, "paddingTop")) || 0) - (parseInt(this.getStyle(e, "paddingBottom")) || 0)
        },
        getAllClasses: function(e, t, i) {
            return i || (i = ""), t || (t = ""), e ? e.replace(new RegExp("(\\s|^)" + i + "(\\s|$)"), " ").replace(/[\s]*([\S]+)+[\s]*/gi, t + "$1 ") : ""
        },
        getElementsBySelector: function(e, t) {
            if ("function" == typeof document.querySelectorAll) return (t || document).querySelectorAll(e);
            for (var i = e.split(","), n = [], s = 0; s < i.length; s++) {
                for (var a = [t || document], o = i[s].replace(/^\s+/, "").replace(/\s+$/, "").split(" "), r = 0; r < o.length; r++)
                    if (token = o[r].replace(/^\s+/, "").replace(/\s+$/, ""), token.indexOf("#") > -1) {
                        var l = token.split("#"),
                            c = l[0],
                            d = l[1],
                            h = document.getElementById(d);
                        if (c && h.nodeName.toLowerCase() != c) return [];
                        a = [h]
                    } else if (token.indexOf(".") > -1) {
                    for (var l = token.split("."), c = l[0] || "*", u = l[1], p = [], f = 0, m = 0; m < a.length; m++) {
                        var g;
                        g = a[m].getElementsByTagName("*" == c ? "*" : c);
                        for (var v = 0; v < g.length; v++) p[f++] = g[v]
                    }
                    a = [];
                    for (var y = 0, b = 0; b < p.length; b++) p[b].className && p[b].className.match(new RegExp("(\\s|^)" + u + "(\\s|$)")) && (a[y++] = p[b])
                } else if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^"]*)"?\]$/)) {
                    var c = RegExp.$1 || "*",
                        w = RegExp.$2,
                        k = RegExp.$3,
                        C = RegExp.$4;
                    "for" == w.toLowerCase() && this.browser.msie && this.browser.version < 8 && (w = "htmlFor");
                    for (var p = [], f = 0, m = 0; m < a.length; m++) {
                        var g;
                        g = a[m].getElementsByTagName("*" == c ? "*" : c);
                        for (var v = 0; g[v]; v++) p[f++] = g[v]
                    }
                    a = [];
                    var j, y = 0;
                    switch (k) {
                        case "=":
                            j = function(e) {
                                return e.getAttribute(w) == C
                            };
                            break;
                        case "~":
                            j = function(e) {
                                return e.getAttribute(w).match(new RegExp("(\\s|^)" + C + "(\\s|$)"))
                            };
                            break;
                        case "|":
                            j = function(e) {
                                return e.getAttribute(w).match(new RegExp("^" + C + "-?"))
                            };
                            break;
                        case "^":
                            j = function(e) {
                                return 0 == e.getAttribute(w).indexOf(C)
                            };
                            break;
                        case "$":
                            j = function(e) {
                                return e.getAttribute(w).lastIndexOf(C) == e.getAttribute(w).length - C.length
                            };
                            break;
                        case "*":
                            j = function(e) {
                                return e.getAttribute(w).indexOf(C) > -1
                            };
                            break;
                        default:
                            j = function(e) {
                                return e.getAttribute(w)
                            }
                    }
                    a = [];
                    for (var y = 0, b = 0; b < p.length; b++) j(p[b]) && (a[y++] = p[b])
                } else {
                    c = token;
                    for (var p = [], f = 0, m = 0; m < a.length; m++)
                        for (var g = a[m].getElementsByTagName(c), v = 0; v < g.length; v++) p[f++] = g[v];
                    a = p
                }
                n = [].concat(n, a)
            }
            return n
        },
        scrollSize: function() {
            function e() {
                s && t(), n = document.createElement("div"), s = document.createElement("div"), s.style.cssText = "position:absolute;overflow:hidden;width:100px;height:100px", s.appendChild(n), document.body.appendChild(s)
            }

            function t() {
                document.body.removeChild(s), s = null
            }

            function i(i) {
                return e(), n.style.cssText = "height:" + (i ? "100%" : "200px"), a = i ? n.offsetHeight : n.offsetWidth, s.style.overflow = "scroll", n.innerHTML = 1, o = i ? n.offsetHeight : n.offsetWidth, i && s.clientHeight && (o = s.clientHeight), t(), a - o
            }
            var n, s, a, o;
            return {
                getWidth: function() {
                    return i(!1)
                },
                getHeight: function() {
                    return i(!0)
                }
            }
        }(),
        domReady: function(e) {
            function t() {
                n || (n = !0, e())
            }

            function i() {
                if (!n && document.body) try {
                    document.documentElement.doScroll("left"), t()
                } catch (e) {
                    setTimeout(i, 0)
                }
            }
            var n = !1;
            document.addEventListener ? document.addEventListener("DOMContentLoaded", t, !1) : document.attachEvent && (document.documentElement.doScroll && window == window.top && i(), document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && t()
            })), window.addEventListener ? window.addEventListener("load", t, !1) : window.attachEvent && window.attachEvent("onload", t)
        },
        event: function() {
            function e(e) {
                if (e = e || window.event, e.isFixed) return e;
                if (e.isFixed = !0, e.preventDefault = e.preventDefault || function() {
                        this.returnValue = !1
                    }, e.stopPropagation = e.stopPropagation || function() {
                        this.cancelBubble = !0
                    }, e.target || (e.target = e.srcElement), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement), null == e.pageX && null != e.clientX) {
                    var t = document.documentElement,
                        i = document.body;
                    e.pageX = e.clientX + (t && t.scrollLeft || i && i.scrollLeft || 0) - (t.clientLeft || 0), e.pageY = e.clientY + (t && t.scrollTop || i && i.scrollTop || 0) - (t.clientTop || 0)
                }
                return !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), ("DOMMouseScroll" === e.type || "mousewheel" === e.type) && (e.mWheelDelta = 0, e.wheelDelta ? e.mWheelDelta = e.wheelDelta / 120 : e.detail && (e.mWheelDelta = -e.detail / 3)), e
            }

            function t(t, i) {
                t = e(t);
                var n = this.events[t.type];
                for (var s in n) {
                    var a = n[s],
                        o = a.call(i || this, t);
                    o === !1 && (t.preventDefault(), t.stopPropagation())
                }
            }
            var i = 0,
                n = {
                    add: function(e, s, a, o) {
                        e.setInterval && e != window && !e.frameElement && (e = window), a.guid || (a.guid = ++i), e.events || (e.events = {}, e.handle = function(i) {
                            return t.call(e, i)
                        }), e.events[s] || (e.events[s] = {}, e.addEventListener ? e.addEventListener(s, e.handle, !1) : e.attachEvent && e.attachEvent("on" + s, e.handle), "mousewheel" === s && n.add(e, "DOMMouseScroll", a, o));
                        var r = jcf.lib.bind(a, o);
                        r.guid = a.guid, e.events[s][a.guid] = o ? r : a
                    },
                    remove: function(e, t, i) {
                        var s = e.events && e.events[t];
                        if (s) {
                            delete s[i.guid];
                            for (var a in s) return;
                            e.removeEventListener ? e.removeEventListener(t, e.handle, !1) : e.detachEvent && e.detachEvent("on" + t, e.handle), delete e.events[t];
                            for (var a in e.events) return;
                            try {
                                delete e.handle, delete e.events
                            } catch (o) {
                                e.removeAttribute && (e.removeAttribute("handle"), e.removeAttribute("events"))
                            }
                            "mousewheel" === t && n.remove(e, "DOMMouseScroll", i)
                        }
                    }
                };
            return n
        }()
    }, jcf.addModule({
        name: "select",
        selector: "select",
        defaultOptions: {
            useNativeDropOnMobileDevices: !0,
            hideDropOnScroll: !0,
            showNativeDrop: !1,
            handleDropPosition: !1,
            selectDropPosition: "bottom",
            wrapperClass: "select-area",
            focusClass: "select-focus",
            dropActiveClass: "select-active",
            selectedClass: "item-selected",
            currentSelectedClass: "current-selected",
            disabledClass: "select-disabled",
            valueSelector: "span.center",
            optGroupClass: "optgroup",
            openerSelector: "a.select-opener",
            selectStructure: '<a class="select-opener"></a><span class="center-holder"><span class="center"></span></span>',
            wrapperTag: "span",
            classPrefix: "select-",
            dropMaxHeight: 200,
            dropFlippedClass: "select-options-flipped",
            dropHiddenClass: "options-hidden",
            dropScrollableClass: "options-overflow",
            dropClass: "select-options",
            dropClassPrefix: "drop-",
            dropStructure: '<div class="drop-holder"><div class="drop-list"></div></div>',
            dropSelector: "div.drop-list"
        },
        checkElement: function(e) {
            return !e.size && !e.multiple
        },
        setupWrapper: function() {
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass), this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement), this.fakeElement.innerHTML = this.options.selectStructure, this.fakeElement.style.width = this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + "px" : "auto", this.options.useNativeDropOnMobileDevices && (jcf.isTouchDevice || jcf.isWinPhoneDevice) && (this.options.showNativeDrop = !0), this.options.showNativeDrop && (this.fakeElement.appendChild(this.realElement), jcf.lib.removeClass(this.realElement, this.options.hiddenClass), jcf.lib.setStyles(this.realElement, {
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                opacity: 0,
                border: "none",
                position: "absolute",
                width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
                height: jcf.lib.getInnerHeight(this.fakeElement) - 1
            }), jcf.lib.event.add(this.realElement, jcf.eventPress, function() {
                this.realElement.title = ""
            }, this)), this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0], this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0], jcf.lib.disableTextSelection(this.valueText), this.opener.jcf = this, this.options.showNativeDrop ? this.refreshState() : (this.createDropdown(), this.refreshState(), this.onControlReady(this), this.hideDropdown(!0)), this.addEvents(), jQuery(this.realElement).attr({
                "aria-expanded": "false"
            })
        },
        addEvents: function() {
            this.options.showNativeDrop ? jcf.lib.event.add(this.realElement, "click", this.onChange, this) : jcf.lib.event.add(this.fakeElement, "click", this.toggleDropdown, this), jcf.lib.event.add(this.realElement, "change", this.onChange, this)
        },
        onFakeClick: function() {},
        onFocus: function() {
            jcf.modules[this.name].superclass.onFocus.apply(this, arguments), this.options.showNativeDrop || (jcf.lib.browser.safariMac && this.realElement.setAttribute("size", "2"), jcf.lib.event.add(this.realElement, "keydown", this.onKeyDown, this), jcf.activeControl && jcf.activeControl != this && (jcf.activeControl.hideDropdown(), jcf.activeControl = this))
        },
        onBlur: function() {
            this.options.showNativeDrop ? jcf.modules[this.name].superclass.onBlur.apply(this) : (jcf.lib.browser.safariMac && this.realElement.removeAttribute("size"), this.isActiveDrop() && this.isOverDrop() || (jcf.modules[this.name].superclass.onBlur.apply(this), jcf.activeControl === this && (jcf.activeControl = null), jcf.isTouchDevice || this.hideDropdown()), jcf.lib.event.remove(this.realElement, "keydown", this.onKeyDown))
        },
        onChange: function() {
            this.refreshState()
        },
        onKeyDown: function(e) {
            this.dropOpened = !0, jcf.tmpFlag = !0, setTimeout(function() {
                jcf.tmpFlag = !1
            }, 100);
            var t = this;
            return t.keyboardFix = !0, setTimeout(function() {
                t.refreshState()
            }, 10), 13 == e.keyCode ? (t.toggleDropdown.apply(t), !1) : void 0
        },
        onResizeWindow: function(e) {
            this.isActiveDrop() && this.hideDropdown()
        },
        onScrollWindow: function(e) {
            this.options.hideDropOnScroll ? this.hideDropdown() : this.isActiveDrop() && this.positionDropdown()
        },
        onOptionClick: function(e) {
            var t = e.target && e.target.tagName && "li" == e.target.tagName.toLowerCase() ? e.target : jcf.lib.getParent(e.target, "li");
            return t && (this.dropOpened = !0, this.realElement.selectedIndex = parseInt(t.getAttribute("rel")), jcf.isTouchDevice ? this.onFocus() : this.realElement.focus(), this.refreshState(), this.hideDropdown(), jcf.lib.fireEvent(this.realElement, "change")), !1
        },
        onClickOutside: function(e) {
            return jcf.tmpFlag ? void(jcf.tmpFlag = !1) : void(jcf.lib.isParent(this.fakeElement, e.target) || jcf.lib.isParent(this.selectDrop, e.target) || this.hideDropdown())
        },
        onDropHover: function(e) {
            if (this.keyboardFix) this.keyboardFix = !1;
            else {
                this.hoverFlag = !0;
                var t = e.target && e.target.tagName && "li" == e.target.tagName.toLowerCase() ? e.target : jcf.lib.getParent(e.target, "li");
                t && (this.realElement.selectedIndex = parseInt(t.getAttribute("rel")), this.refreshSelectedClass(parseInt(t.getAttribute("rel"))))
            }
        },
        onDropLeave: function() {
            this.hoverFlag = !1
        },
        isActiveDrop: function() {
            return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass)
        },
        isOverDrop: function() {
            return this.hoverFlag
        },
        createDropdown: function() {
            this.selectDrop && this.selectDrop.parentNode.removeChild(this.selectDrop), this.selectDrop = document.createElement("div"), this.selectDrop.className = this.options.dropClass, this.selectDrop.innerHTML = this.options.dropStructure, jcf.lib.setStyles(this.selectDrop, {
                position: "absolute"
            }), this.selectList = jcf.lib.queryBySelector(this.options.dropSelector, this.selectDrop)[0], jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass), document.body.appendChild(this.selectDrop), this.selectDrop.jcf = this, jcf.lib.event.add(this.selectDrop, "click", this.onOptionClick, this), jcf.lib.event.add(this.selectDrop, "mouseover", this.onDropHover, this), jcf.lib.event.add(this.selectDrop, "mouseout", this.onDropLeave, this), this.buildDropdown()
        },
        buildDropdown: function() {
            this.buildDropdownOptions(), this.positionDropdown(), this.buildDropdownScroll()
        },
        buildDropdownOptions: function() {
            this.resStructure = "", this.optNum = 0;
            for (var e = 0; e < this.realElement.children.length; e++) this.resStructure += this.buildElement(this.realElement.children[e], e) + "\n";
            this.selectList.innerHTML = this.resStructure
        },
        buildDropdownScroll: function() {
            jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass)), this.options.dropMaxHeight && this.selectDrop.offsetHeight > this.options.dropMaxHeight && (this.selectList.style.height = this.options.dropMaxHeight + "px", this.selectList.style.overflow = "auto", this.selectList.style.overflowX = "hidden", jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass))
        },
        parseOptionTitle: function(e) {
            return "string" == typeof e && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(e) ? e : ""
        },
        buildElement: function(e, t) {
            var i, n = "";
            if ("option" == e.tagName.toLowerCase()) return jcf.lib.prevSibling(e) && "option" == jcf.lib.prevSibling(e).tagName.toLowerCase() || (n += "<ul>"), i = this.parseOptionTitle(e.getAttribute("data-title")), n += '<li rel="' + this.optNum++ + '" class="' + (e.className ? e.className + " " : "") + (t % 2 ? "option-even " : "") + 'jcfcalc"><a href="#">' + (i ? '<img src="' + i + '" alt="" />' : "") + "<span>" + e.innerHTML + "</span></a></li>", jcf.lib.nextSibling(e) && "option" == jcf.lib.nextSibling(e).tagName.toLowerCase() || (n += "</ul>"), n;
            if ("optgroup" == e.tagName.toLowerCase() && e.label) {
                n += '<div class="' + this.options.optGroupClass + '">', n += '<strong class="jcfcalc"><em>' + e.label + "</em></strong>";
                for (var s = 0; s < e.children.length; s++) n += this.buildElement(e.children[s], s);
                return n += "</div>"
            }
        },
        positionDropdown: function() {
            var e = jcf.lib.getOffset(this.fakeElement),
                t = this.fakeElement.offsetHeight,
                i = this.selectDrop.offsetHeight,
                n = e.top - i >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < e.top + t + i;
            this.options.handleDropPosition && n || "top" === this.options.selectDropPosition ? (this.selectDrop.style.top = e.top - i + "px", jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass), jcf.lib.addClass(this.fakeElement, this.options.dropFlippedClass)) : (this.selectDrop.style.top = e.top + t + "px", jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass), jcf.lib.removeClass(this.fakeElement, this.options.dropFlippedClass)), this.selectDrop.style.left = e.left + "px", this.selectDrop.style.width = this.fakeElement.offsetWidth + "px"
        },
        showDropdown: function() {
            document.body.appendChild(this.selectDrop), jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass), jcf.lib.addClass(this.fakeElement, this.options.dropActiveClass), this.positionDropdown();
            var e = this.getFakeActiveOption();
            this.removeClassFromItems(this.options.currentSelectedClass), jcf.lib.addClass(e, this.options.currentSelectedClass), jcf.lib.event.add(window, "resize", this.onResizeWindow, this), jcf.lib.event.add(window, "scroll", this.onScrollWindow, this), jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this), this.positionDropdown(), jQuery(this.realElement).attr({
                "aria-expanded": "true"
            })
        },
        hideDropdown: function(e) {
            this.selectDrop.parentNode && (this.selectDrop.offsetWidth && this.selectDrop.parentNode.removeChild(this.selectDrop), e) || ("number" == typeof this.origSelectedIndex && (this.realElement.selectedIndex = this.origSelectedIndex), jcf.lib.removeClass(this.fakeElement, this.options.dropActiveClass), jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass), jcf.lib.event.remove(window, "resize", this.onResizeWindow), jcf.lib.event.remove(window, "scroll", this.onScrollWindow), jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside), jcf.isTouchDevice && this.onBlur(), jQuery(this.realElement).attr({
                "aria-expanded": "false"
            }))
        },
        toggleDropdown: function() {
            !this.realElement.disabled && this.realElement.options.length && (jcf.isTouchDevice ? this.onFocus() : this.realElement.focus(), this.isActiveDrop() ? this.hideDropdown() : this.showDropdown(), this.refreshState())
        },
        scrollToItem: function() {
            if (this.isActiveDrop()) {
                var e = this.selectList.offsetHeight,
                    t = this.calcOptionOffset(this.getFakeActiveOption()),
                    i = this.selectList.scrollTop,
                    n = this.getFakeActiveOption().offsetHeight;
                t >= i + e ? this.selectList.scrollTop = t - e + n : i > t && (this.selectList.scrollTop = t)
            }
        },
        getFakeActiveOption: function(e) {
            return jcf.lib.queryBySelector('li[rel="' + ("number" == typeof e ? e : this.realElement.selectedIndex) + '"]', this.selectList)[0]
        },
        calcOptionOffset: function(e) {
            for (var t = 0, i = jcf.lib.queryBySelector(".jcfcalc", this.selectList), n = 0; n < i.length && i[n] != e; n++) t += i[n].offsetHeight;
            return t
        },
        childrenHasItem: function(e, t) {
            var n = e.getElementsByTagName("*");
            for (i = 0; i < n.length; i++)
                if (n[i] == t) return !0;
            return !1
        },
        removeClassFromItems: function(e) {
            for (var t = jcf.lib.queryBySelector("li", this.selectList), i = t.length - 1; i >= 0; i--) jcf.lib.removeClass(t[i], e)
        },
        setSelectedClass: function(e) {
            var t = this.getFakeActiveOption(e);
            t && jcf.lib.addClass(t, this.options.selectedClass)
        },
        refreshSelectedClass: function(e) {
            this.options.showNativeDrop || (this.removeClassFromItems(this.options.selectedClass), this.setSelectedClass(e)), this.realElement.disabled ? (jcf.lib.addClass(this.fakeElement, this.options.disabledClass), this.labelFor && jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass)) : (jcf.lib.removeClass(this.fakeElement, this.options.disabledClass), this.labelFor && jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass))
        },
        refreshSelectedText: function() {
            if (!this.dropOpened && this.realElement.getAttribute("data-title")) this.valueText.innerHTML = this.realElement.getAttribute("data-title");
            else {
                var e = this.realElement.options[this.realElement.selectedIndex];
                if (e)
                    if (e.getAttribute("data-title")) {
                        var t = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].getAttribute("data-title"));
                        this.valueText.innerHTML = (t ? '<img src="' + t + '" alt="" />' : "") + this.realElement.options[this.realElement.selectedIndex].innerHTML
                    } else this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML
            }
        },
        refreshState: function() {
            this.origSelectedIndex = this.realElement.selectedIndex, this.refreshSelectedClass(), this.refreshSelectedText(), this.options.showNativeDrop || (this.positionDropdown(), this.selectDrop.offsetWidth && this.scrollToItem())
        }
    }), jcf.addModule({
        name: "checkbox",
        selector: 'input[type="checkbox"]',
        defaultOptions: {
            wrapperClass: "chk-area",
            focusClass: "chk-focus",
            checkedClass: "chk-checked",
            labelActiveClass: "chk-label-active",
            uncheckedClass: "chk-unchecked",
            disabledClass: "chk-disabled",
            chkStructure: "<span></span>"
        },
        setupWrapper: function() {
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass), this.fakeElement.innerHTML = this.options.chkStructure, this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement), jcf.lib.event.add(this.realElement, "click", this.onRealClick, this), this.refreshState()
        },
        isLinkTarget: function(e, t) {
            for (; e.parentNode || e === t;) {
                if ("a" === e.tagName.toLowerCase()) return !0;
                e = e.parentNode
            }
        },
        onFakePressed: function() {
            jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments), this.realElement.disabled || this.realElement.focus()
        },
        onFakeClick: function(e) {
            return jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments), this.tmpTimer = setTimeout(jcf.lib.bind(function() {
                this.toggle()
            }, this), 10), this.isLinkTarget(e.target, this.labelFor) ? void 0 : !1
        },
        onRealClick: function(e) {
            setTimeout(jcf.lib.bind(function() {
                this.refreshState()
            }, this), 10), e.stopPropagation()
        },
        toggle: function(e) {
            return this.realElement.disabled || (this.realElement.checked ? this.realElement.checked = !1 : this.realElement.checked = !0), this.refreshState(), jcf.lib.fireEvent(this.realElement, "change"), !1
        },
        refreshState: function() {
            this.realElement.checked ? (jcf.lib.addClass(this.fakeElement, this.options.checkedClass), jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass), this.labelFor && jcf.lib.addClass(this.labelFor, this.options.labelActiveClass), jQuery(this.realElement).attr({
                "aria-checked": "true"
            })) : (jcf.lib.removeClass(this.fakeElement, this.options.checkedClass), jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass), this.labelFor && jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass), jQuery(this.realElement).attr({
                "aria-checked": "false"
            })), this.realElement.disabled ? (jcf.lib.addClass(this.fakeElement, this.options.disabledClass), this.labelFor && jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass)) : (jcf.lib.removeClass(this.fakeElement, this.options.disabledClass), this.labelFor && jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass))
        }
    }), jcf.addModule({
        name: "radio",
        selector: 'input[type="radio"]',
        defaultOptions: {
            wrapperClass: "rad-area",
            focusClass: "rad-focus",
            checkedClass: "rad-checked",
            uncheckedClass: "rad-unchecked",
            disabledClass: "rad-disabled",
            radStructure: "<span></span>"
        },
        getRadioGroup: function(e) {
            var t = e.getAttribute("name");
            return t ? jcf.lib.queryBySelector('input[name="' + t + '"]', jcf.lib.getParent("form")) : [e]
        },
        setupWrapper: function() {
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass), this.fakeElement.innerHTML = this.options.radStructure, this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement), this.refreshState(), this.addEvents()
        },
        addEvents: function() {
            jcf.lib.event.add(this.fakeElement, "click", this.toggleRadio, this), this.labelFor && jcf.lib.event.add(this.labelFor, "click", this.toggleRadio, this)
        },
        onFocus: function(e) {
            jcf.modules[this.name].superclass.onFocus.apply(this, arguments), setTimeout(jcf.lib.bind(function() {
                this.refreshState()
            }, this), 10)
        },
        toggleRadio: function() {
            this.realElement.disabled || this.realElement.checked || (this.realElement.checked = !0, jcf.lib.fireEvent(this.realElement, "change")), this.refreshState()
        },
        refreshState: function() {
            for (var e = this.getRadioGroup(this.realElement), t = 0; t < e.length; t++) {
                var i = e[t].jcf;
                i && (i.realElement.checked ? (jcf.lib.addClass(i.fakeElement, i.options.checkedClass), jcf.lib.removeClass(i.fakeElement, i.options.uncheckedClass), i.labelFor && jcf.lib.addClass(i.labelFor, i.options.labelActiveClass), jQuery(this.realElement).attr({
                    "aria-checked": "true"
                })) : (jcf.lib.removeClass(i.fakeElement, i.options.checkedClass), jcf.lib.addClass(i.fakeElement, i.options.uncheckedClass), i.labelFor && jcf.lib.removeClass(i.labelFor, i.options.labelActiveClass), jQuery(this.realElement).attr({
                    "aria-checked": "false"
                })), i.realElement.disabled ? (jcf.lib.addClass(i.fakeElement, i.options.disabledClass), i.labelFor && jcf.lib.addClass(i.labelFor, i.options.labelDisabledClass)) : (jcf.lib.removeClass(i.fakeElement, i.options.disabledClass), i.labelFor && jcf.lib.removeClass(i.labelFor, i.options.labelDisabledClass)))
            }
        }
    }), jcf.addModule({
        name: "customscroll",
        selector: "div.scrollable-area",
        defaultOptions: {
            alwaysPreventWheel: !1,
            enableMouseWheel: !0,
            captureFocus: !1,
            handleNested: !0,
            alwaysKeepScrollbars: !1,
            autoDetectWidth: !1,
            scrollbarOptions: {},
            focusClass: "scrollable-focus",
            wrapperTag: "div",
            autoDetectWidthClass: "autodetect-width",
            noHorizontalBarClass: "noscroll-horizontal",
            noVerticalBarClass: "noscroll-vertical",
            innerWrapperClass: "scrollable-inner-wrapper",
            outerWrapperClass: "scrollable-area-wrapper",
            horizontalClass: "hscrollable",
            verticalClass: "vscrollable",
            bothClass: "anyscrollable"
        },
        replaceObject: function() {
            this.initStructure(), this.refreshState(), this.addEvents()
        },
        initStructure: function() {
            this.realElement.jcf = this, jcf.lib.hasClass(this.realElement, this.options.bothClass) || jcf.lib.hasClass(this.realElement, this.options.horizontalClass) && jcf.lib.hasClass(this.realElement, this.options.verticalClass) ? this.scrollType = "both" : jcf.lib.hasClass(this.realElement, this.options.horizontalClass) ? this.scrollType = "horizontal" : this.scrollType = "vertical", jcf.lib.hasClass(this.realElement, this.options.autoDetectWidthClass) && (this.options.autoDetectWidth = !0), this.realElement.style.position = "relative", this.realElement.style.overflow = "hidden", this.buildWrapper(), this.buildScrollbars()
        },
        buildWrapper: function() {
            if (this.outerWrapper = document.createElement(this.options.wrapperTag), this.outerWrapper.className = this.options.outerWrapperClass, this.realElement.parentNode.insertBefore(this.outerWrapper, this.realElement), this.outerWrapper.appendChild(this.realElement), this.options.autoDetectWidth && ("both" === this.scrollType || "horizontal" === this.scrollType) && 1 === this.realElement.children.length) {
                var e = 0;
                this.realElement.style.width = "99999px", e = this.realElement.children[0].offsetWidth, this.realElement.style.width = "", e && (this.realElement.children[0].style.width = e + "px")
            }
        },
        buildScrollbars: function() {
            ("horizontal" === this.scrollType || "both" === this.scrollType) && (this.hScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions, {
                vertical: !1,
                spawnClass: this,
                holder: this.outerWrapper,
                range: this.realElement.scrollWidth - this.realElement.offsetWidth,
                size: this.realElement.offsetWidth,
                onScroll: jcf.lib.bind(function(e) {
                    this.realElement.scrollLeft = e
                }, this)
            }))), ("vertical" === this.scrollType || "both" === this.scrollType) && (this.vScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions, {
                vertical: !0,
                spawnClass: this,
                holder: this.outerWrapper,
                range: this.realElement.scrollHeight - this.realElement.offsetHeight,
                size: this.realElement.offsetHeight,
                onScroll: jcf.lib.bind(function(e) {
                    this.realElement.scrollTop = e
                }, this)
            }))), this.outerWrapper.style.width = this.realElement.offsetWidth + "px", this.outerWrapper.style.height = this.realElement.offsetHeight + "px", this.resizeScrollContent()
        },
        resizeScrollContent: function() {
            var e = this.realElement.offsetWidth - jcf.lib.getInnerWidth(this.realElement),
                t = this.realElement.offsetHeight - jcf.lib.getInnerHeight(this.realElement);
            this.realElement.style.width = Math.max(0, this.outerWrapper.offsetWidth - e - (this.vScrollBar ? this.vScrollBar.getScrollBarSize() : 0)) + "px", this.realElement.style.height = Math.max(0, this.outerWrapper.offsetHeight - t - (this.hScrollBar ? this.hScrollBar.getScrollBarSize() : 0)) + "px"
        },
        addEvents: function() {
            if (!jcf.isTouchDevice && this.options.enableMouseWheel && jcf.lib.event.add(this.outerWrapper, "mousewheel", this.onMouseWheel, this), (jcf.isTouchDevice || navigator.msPointerEnabled) && (this.outerWrapper.style.msTouchAction = "none", jcf.lib.event.add(this.realElement, jcf.eventPress, this.onScrollablePress, this)), this.options.handleNested)
                for (var e = this.realElement, t = this.name; e.parentNode;) e.parentNode.jcf && e.parentNode.jcf.name == t && e.parentNode.jcf.refreshState(), e = e.parentNode
        },
        onMouseWheel: function(e) {
            return "vertical" === this.scrollType || "both" === this.scrollType ? this.vScrollBar.doScrollWheelStep(e.mWheelDelta) === !1 ? !1 : !this.options.alwaysPreventWheel : this.hScrollBar.doScrollWheelStep(e.mWheelDelta) === !1 ? !1 : !this.options.alwaysPreventWheel
        },
        onScrollablePress: function(e) {
            e.pointerType === e.MSPOINTER_TYPE_TOUCH && (this.preventFlag = !0, this.origWindowScrollTop = jcf.lib.getScrollTop(), this.origWindowScrollLeft = jcf.lib.getScrollLeft(), this.scrollableOffset = jcf.lib.getOffset(this.realElement), this.hScrollBar && (this.scrollableTouchX = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX, this.origValueX = this.hScrollBar.getScrollValue()), this.vScrollBar && (this.scrollableTouchY = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY, this.origValueY = this.vScrollBar.getScrollValue()), jcf.lib.event.add(this.realElement, jcf.eventMove, this.onScrollableMove, this), jcf.lib.event.add(this.realElement, jcf.eventRelease, this.onScrollableRelease, this))
        },
        onScrollableMove: function(e) {
            if (this.vScrollBar) {
                var t = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY - this.scrollableTouchY,
                    i = this.origValueY - t;
                this.vScrollBar.scrollTo(i), (0 > i || i > this.vScrollBar.options.range) && (this.preventFlag = !1)
            }
            if (this.hScrollBar) {
                var n = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX - this.scrollableTouchX,
                    s = this.origValueX - n;
                this.hScrollBar.scrollTo(s), (0 > s || s > this.hScrollBar.options.range) && (this.preventFlag = !1)
            }
            this.preventFlag && e.preventDefault()
        },
        onScrollableRelease: function() {
            jcf.lib.event.remove(this.realElement, jcf.eventMove, this.onScrollableMove), jcf.lib.event.remove(this.realElement, jcf.eventRelease, this.onScrollableRelease)
        },
        refreshState: function() {
            this.options.alwaysKeepScrollbars ? (this.hScrollBar && (this.hScrollBar.scrollBar.style.display = "block"), this.vScrollBar && (this.vScrollBar.scrollBar.style.display = "block")) : (this.hScrollBar && (this.getScrollRange(!1) ? (this.hScrollBar.scrollBar.style.display = "block", this.resizeScrollContent(), this.hScrollBar.setRange(this.getScrollRange(!1))) : (this.hScrollBar.scrollBar.style.display = "none", this.realElement.style.width = this.outerWrapper.style.width), jcf.lib.toggleClass(this.outerWrapper, this.options.noHorizontalBarClass, 0 === this.hScrollBar.options.range)), this.vScrollBar && (this.getScrollRange(!0) > 0 ? (this.vScrollBar.scrollBar.style.display = "block", this.resizeScrollContent(), this.vScrollBar.setRange(this.getScrollRange(!0))) : (this.vScrollBar.scrollBar.style.display = "none", this.realElement.style.width = this.outerWrapper.style.width), jcf.lib.toggleClass(this.outerWrapper, this.options.noVerticalBarClass, 0 === this.vScrollBar.options.range))), this.vScrollBar && (this.vScrollBar.setRange(this.realElement.scrollHeight - this.realElement.offsetHeight), this.vScrollBar.setSize(this.realElement.offsetHeight), this.vScrollBar.scrollTo(this.realElement.scrollTop)), this.hScrollBar && (this.hScrollBar.setRange(this.realElement.scrollWidth - this.realElement.offsetWidth), this.hScrollBar.setSize(this.realElement.offsetWidth), this.hScrollBar.scrollTo(this.realElement.scrollLeft))
        },
        getScrollRange: function(e) {
            return e ? this.realElement.scrollHeight - this.realElement.offsetHeight : this.realElement.scrollWidth - this.realElement.offsetWidth
        },
        getCurrentRange: function(e) {
            return this.getScrollRange(e.isVertical)
        },
        onCreateModule: function() {
            jcf.modules.select && this.extendSelect(), jcf.modules.selectmultiple && this.extendSelectMultiple(), jcf.modules.textarea && this.extendTextarea()
        },
        onModuleAdded: function(e) {
            "select" == e.prototype.name && this.extendSelect(), "selectmultiple" == e.prototype.name && this.extendSelectMultiple(), "textarea" == e.prototype.name && this.extendTextarea()
        },
        extendSelect: function() {
            jcf.modules.select.prototype.onControlReady = function(e) {
                e.selectList.scrollHeight > e.selectList.offsetHeight && (e.jcfScrollable = new jcf.modules.customscroll({
                    alwaysPreventWheel: !0,
                    replaces: e.selectList
                }))
            };
            var e = jcf.modules.select.prototype.scrollToItem;
            jcf.modules.select.prototype.scrollToItem = function() {
                e.apply(this), this.jcfScrollable && this.jcfScrollable.refreshState()
            }
        },
        extendTextarea: function() {
            jcf.modules.textarea.prototype.onControlReady = function(e) {
                e.jcfScrollable = new jcf.modules.customscroll({
                    alwaysKeepScrollbars: !0,
                    alwaysPreventWheel: !0,
                    replaces: e.realElement
                })
            };
            var e = jcf.modules.textarea.prototype.refreshState;
            jcf.modules.textarea.prototype.refreshState = function() {
                e.apply(this), this.jcfScrollable && this.jcfScrollable.refreshState()
            }
        },
        extendSelectMultiple: function() {
            jcf.modules.selectmultiple.prototype.onControlReady = function(e) {
                e.jcfScrollable = new jcf.modules.customscroll({
                    alwaysPreventWheel: !0,
                    replaces: e.optionsHolder
                })
            };
            var e = jcf.modules.selectmultiple.prototype.scrollToItem;
            jcf.modules.selectmultiple.prototype.scrollToItem = function() {
                e.apply(this), this.jcfScrollable && this.jcfScrollable.refreshState()
            };
            var t = jcf.modules.selectmultiple.prototype.rebuildOptions;
            jcf.modules.selectmultiple.prototype.rebuildOptions = function() {
                t.apply(this), this.jcfScrollable && this.jcfScrollable.refreshState()
            }
        }
    }), jcf.addPlugin({
        name: "scrollbar",
        defaultOptions: {
            size: 0,
            range: 0,
            moveStep: 6,
            moveDistance: 50,
            moveInterval: 10,
            trackHoldDelay: 900,
            holder: null,
            vertical: !0,
            scrollTag: "div",
            onScroll: function() {},
            onScrollEnd: function() {},
            onScrollStart: function() {},
            disabledClass: "btn-disabled",
            VscrollBarClass: "vscrollbar",
            VscrollStructure: '<div class="vscroll-up"></div><div class="vscroll-line"><div class="vscroll-slider"><div class="scroll-bar-top"></div><div class="scroll-bar-bottom"></div></div></div></div><div class="vscroll-down"></div>',
            VscrollTrack: "div.vscroll-line",
            VscrollBtnDecClass: "div.vscroll-up",
            VscrollBtnIncClass: "div.vscroll-down",
            VscrollSliderClass: "div.vscroll-slider",
            HscrollBarClass: "hscrollbar",
            HscrollStructure: '<div class="hscroll-left"></div><div class="hscroll-line"><div class="hscroll-slider"><div class="scroll-bar-left"></div><div class="scroll-bar-right"></div></div></div></div><div class="hscroll-right"></div>',
            HscrollTrack: "div.hscroll-line",
            HscrollBtnDecClass: "div.hscroll-left",
            HscrollBtnIncClass: "div.hscroll-right",
            HscrollSliderClass: "div.hscroll-slider"
        },
        init: function(e) {
            this.setOptions(e), this.createScrollBar(), this.attachEvents(), this.setSize()
        },
        setOptions: function(e) {
            this.options = jcf.lib.extend({}, this.defaultOptions, e), this.isVertical = this.options.vertical, this.prefix = this.isVertical ? "V" : "H", this.eventPageOffsetProperty = this.isVertical ? "pageY" : "pageX", this.positionProperty = this.isVertical ? "top" : "left", this.sizeProperty = this.isVertical ? "height" : "width", this.dimenionsProperty = this.isVertical ? "offsetHeight" : "offsetWidth", this.invertedDimenionsProperty = this.isVertical ? "offsetWidth" : "offsetHeight";
            for (var t in this.options) 0 == t.indexOf(this.prefix) && (this.options[t.substr(1)] = this.options[t])
        },
        createScrollBar: function() {
            this.scrollBar = document.createElement(this.options.scrollTag), this.scrollBar.className = this.options.scrollBarClass, this.scrollBar.innerHTML = this.options.scrollStructure, this.track = jcf.lib.queryBySelector(this.options.scrollTrack, this.scrollBar)[0], this.btnDec = jcf.lib.queryBySelector(this.options.scrollBtnDecClass, this.scrollBar)[0], this.btnInc = jcf.lib.queryBySelector(this.options.scrollBtnIncClass, this.scrollBar)[0], this.slider = jcf.lib.queryBySelector(this.options.scrollSliderClass, this.scrollBar)[0], this.slider.style.position = "absolute", this.track.style.position = "relative"
        },
        attachEvents: function() {
            this.options.holder && this.options.holder.appendChild(this.scrollBar), jcf.lib.event.add(this.slider, jcf.eventPress, this.onSliderPressed, this), jcf.lib.event.add(this.btnDec, jcf.eventPress, this.onBtnDecPressed, this), jcf.lib.event.add(this.btnInc, jcf.eventPress, this.onBtnIncPressed, this), jcf.lib.event.add(this.track, jcf.eventPress, this.onTrackPressed, this)
        },
        setSize: function(e) {
            "number" == typeof e && (this.options.size = e), this.scrollOffset = this.scrollValue = this.sliderOffset = 0, this.scrollBar.style[this.sizeProperty] = this.options.size + "px", this.resizeControls(), this.refreshSlider()
        },
        setRange: function(e) {
            this.options.range = Math.max(e, 0), this.resizeControls()
        },
        doScrollWheelStep: function(e) {
            return this.startScroll(), 0 > e && !this.isEndPosition() || e > 0 && !this.isStartPosition() ? (this.scrollTo(this.getScrollValue() - this.options.moveDistance * e), this.moveScroll(), this.endScroll(), !1) : void 0
        },
        resizeControls: function() {
            this.barSize = this.scrollBar[this.dimenionsProperty], this.btnDecSize = this.btnDec[this.dimenionsProperty], this.btnIncSize = this.btnInc[this.dimenionsProperty], this.trackSize = Math.max(0, this.barSize - this.btnDecSize - this.btnIncSize), this.track.style[this.sizeProperty] = this.trackSize + "px", this.trackSize = this.track[this.dimenionsProperty], this.sliderSize = this.getSliderSize(), this.slider.style[this.sizeProperty] = this.sliderSize + "px", this.sliderSize = this.slider[this.dimenionsProperty]
        },
        refreshSlider: function(e) {
            e && this.resizeControls(), this.sliderOffset = isNaN(this.sliderOffset) ? 0 : this.sliderOffset, this.slider.style[this.positionProperty] = this.sliderOffset + "px"
        },
        startScroll: function() {
            this.options.spawnClass && "function" == typeof this.options.spawnClass.getCurrentRange && this.setRange(this.options.spawnClass.getCurrentRange(this)), this.resizeControls(), this.scrollBarOffset = jcf.lib.getOffset(this.track)[this.positionProperty], this.options.onScrollStart()
        },
        moveScroll: function() {
            this.options.onScroll(this.scrollValue), jcf.lib.removeClass(this.btnDec, this.options.disabledClass), jcf.lib.removeClass(this.btnInc, this.options.disabledClass), 0 === this.scrollValue && jcf.lib.addClass(this.btnDec, this.options.disabledClass), this.scrollValue === this.options.range && jcf.lib.addClass(this.btnInc, this.options.disabledClass)
        },
        endScroll: function() {
            this.options.onScrollEnd()
        },
        startButtonMoveScroll: function(e) {
            this.startScroll(), clearInterval(this.buttonScrollTimer), this.buttonScrollTimer = setInterval(jcf.lib.bind(function() {
                this.scrollValue += this.options.moveStep * e, this.scrollValue > this.options.range ? (this.scrollValue = this.options.range, this.endButtonMoveScroll()) : this.scrollValue < 0 && (this.scrollValue = 0, this.endButtonMoveScroll()), this.scrollTo(this.scrollValue)
            }, this), this.options.moveInterval)
        },
        endButtonMoveScroll: function() {
            clearInterval(this.buttonScrollTimer), this.endScroll()
        },
        isStartPosition: function() {
            return 0 === this.scrollValue
        },
        isEndPosition: function() {
            return this.scrollValue === this.options.range
        },
        getSliderSize: function() {
            return Math.round(this.getSliderSizePercent() * this.trackSize / 100)
        },
        getSliderSizePercent: function() {
            return 0 === this.options.range ? 0 : 100 * this.barSize / (this.barSize + this.options.range)
        },
        getSliderOffsetByScrollValue: function() {
            return 100 * this.scrollValue / this.options.range * (this.trackSize - this.sliderSize) / 100
        },
        getSliderOffsetPercent: function() {
            return 100 * this.sliderOffset / (this.trackSize - this.sliderSize)
        },
        getScrollValueBySliderOffset: function() {
            return this.getSliderOffsetPercent() * this.options.range / 100
        },
        getScrollBarSize: function() {
            return this.scrollBar[this.invertedDimenionsProperty]
        },
        getScrollValue: function() {
            return this.scrollValue || 0
        },
        scrollOnePage: function(e) {
            this.scrollTo(this.scrollValue + e * this.barSize)
        },
        scrollTo: function(e) {
            this.scrollValue = 0 > e ? 0 : e > this.options.range ? this.options.range : e, this.sliderOffset = this.getSliderOffsetByScrollValue(), this.refreshSlider(), this.moveScroll()
        },
        onSliderPressed: function(e) {
            return jcf.lib.event.add(document.body, jcf.eventRelease, this.onSliderRelease, this), jcf.lib.event.add(document.body, jcf.eventMove, this.onSliderMove, this), jcf.lib.disableTextSelection(this.slider), this.sliderInnerOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.slider)[this.positionProperty], this.startScroll(), !1
        },
        onSliderRelease: function() {
            jcf.lib.event.remove(document.body, jcf.eventRelease, this.onSliderRelease), jcf.lib.event.remove(document.body, jcf.eventMove, this.onSliderMove)
        },
        onSliderMove: function(e) {
            this.sliderOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - this.scrollBarOffset - this.sliderInnerOffset, this.sliderOffset < 0 ? this.sliderOffset = 0 : this.sliderOffset + this.sliderSize > this.trackSize && (this.sliderOffset = this.trackSize - this.sliderSize), this.previousOffset != this.sliderOffset && (this.previousOffset = this.sliderOffset, this.scrollTo(this.getScrollValueBySliderOffset()))
        },
        onBtnIncPressed: function() {
            return jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnIncRelease, this), jcf.lib.disableTextSelection(this.btnInc), this.startButtonMoveScroll(1), !1
        },
        onBtnIncRelease: function() {
            jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnIncRelease), this.endButtonMoveScroll()
        },
        onBtnDecPressed: function() {
            return jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnDecRelease, this), jcf.lib.disableTextSelection(this.btnDec), this.startButtonMoveScroll(-1), !1
        },
        onBtnDecRelease: function() {
            jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnDecRelease), this.endButtonMoveScroll()
        },
        onTrackPressed: function(e) {
            var t = e[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.track)[this.positionProperty],
                i = t < this.sliderOffset ? -1 : t > this.sliderOffset + this.sliderSize ? 1 : 0;
            i && this.scrollOnePage(i)
        }
    }),
    function(e) {
        e.fn.contentTabs = function(n) {
            var s = e.extend({
                activeClass: "active",
                addToParent: !1,
                autoHeight: !1,
                autoRotate: !1,
                checkHash: !1,
                animSpeed: 400,
                switchTime: 3e3,
                effect: "none",
                tabLinks: "a",
                attrib: "href",
                event: "click"
            }, n);
            return this.each(function() {
                function n(e, n, o) {
                    c = !0;
                    var d = e.data("ctab"),
                        h = n.data("ctab");
                    m = n, l = h, (s.addToParent ? f : p).removeClass(s.activeClass), (s.addToParent ? n.data("cparent") : n).addClass(s.activeClass), a(d, !0), i[s.effect].hide({
                        speed: s.animSpeed,
                        tab: d,
                        complete: function() {
                            a(h.removeClass(t).width("")), g = o, h.attr({
                                "aria-expanded": "true",
                                "aria-hidden": "false"
                            }), i[s.effect].show({
                                speed: s.animSpeed,
                                tab: h,
                                complete: function() {
                                    d.is(h) || (d.width(d.width()).addClass(t), d.attr({
                                        "aria-expanded": "false",
                                        "aria-hidden": "true"
                                    })), c = !1, a(h, !1), r()
                                }
                            })
                        }
                    })
                }

                function a(e, t) {
                    var i = e && e.length ? e : l;
                    if (s.autoHeight && i)
                        if (d.stop(), t === !1) d.css({
                            height: ""
                        });
                        else {
                            var n = i.attr("style");
                            i.show().css({
                                width: i.width()
                            });
                            var a = i.outerHeight(!0);
                            n ? i.attr("style", n) : i.removeAttr("style"), t === !0 ? d.css({
                                height: a
                            }) : d.animate({
                                height: a
                            }, {
                                duration: s.animSpeed
                            })
                        }
                }

                function o() {
                    var e = (s.addToParent ? f : p).filter("." + s.activeClass),
                        t = (s.addToParent ? f : p).index(e),
                        i = t < p.length - 1 ? t + 1 : 0,
                        a = p.eq(i);
                    m = p.eq(t), n(m, a, i)
                }

                function r() {
                    s.autoRotate && p.length > 1 && (clearTimeout(y), y = setTimeout(function() {
                        c ? r() : o()
                    }, s.switchTime))
                }
                var l, c, d, h = e(this),
                    u = e(),
                    p = h.find(s.tabLinks),
                    f = p.parent(),
                    m = p.eq(0),
                    g = 0;
                s.checkHash && p.filter("[" + s.attrib + '="' + location.hash + '"]').length && ((s.addToParent ? f : p).removeClass(s.activeClass), setTimeout(function() {
                    window.scrollTo(0, 0)
                }, 1)), p.each(function(a) {
                    var o = e(this),
                        r = o.attr(s.attrib),
                        h = o.parent();
                    r = r.substr(r.lastIndexOf("#"));
                    var p = e(r);
                    u = u.add(p), o.data("cparent", h), o.data("ctab", p), !d && p.length && (d = p.parent());
                    var f = s.addToParent ? h : o;
                    if (f.hasClass(s.activeClass) || s.checkHash && location.hash === r) f.addClass(s.activeClass), m = o, l = p, p.removeClass(t).width(""), i[s.effect].show({
                        tab: p,
                        fast: !0
                    }), g = a, p.attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    });
                    else {
                        var v = p.width();
                        v && p.width(v), p.addClass(t), p.attr({
                            "aria-expanded": "false",
                            "aria-hidden": "true"
                        })
                    }
                    o.bind(s.event, function(e) {
                        o == m || c || (n(m, o, a), m = o)
                    }), "href" === s.attrib && o.bind("click", function(e) {
                        e.preventDefault()
                    })
                });
                var v = function(e) {
                    switch (e.keyCode) {
                        case 35:
                        case 34:
                            e.preventDefault(), p.eq(p.length - 1).trigger("click").focus();
                            break;
                        case 36:
                        case 33:
                            e.preventDefault(), p.eq(0).trigger("click").focus();
                            break;
                        case 37:
                        case 38:
                            e.preventDefault(), g--, 0 > g && (g = p.length - 1), p.eq(g).trigger("click").focus();
                            break;
                        case 39:
                        case 40:
                            e.preventDefault(), g++, g > p.length - 1 && (g = 0), p.eq(g).trigger("click").focus()
                    }
                };
                h.on("keydown", v), s.autoHeight && e(window).bind("resize orientationchange", function() {
                    u.not(l).removeClass(t).show().each(function() {
                        var e = jQuery(this),
                            t = e.css({
                                width: ""
                            }).width();
                        t && e.width(t)
                    }).hide().addClass(t), a(l, !1)
                });
                var y;
                r()
            })
        };
        var t = "js-tab-hidden";
        e(function() {
            var i = e('<style type="text/css">')[0],
                n = "." + t;
            n += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}", i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n)), e("head").append(i)
        });
        var i = {
            none: {
                show: function(e) {
                    e.tab.css({
                        display: "block"
                    }), e.complete && e.complete()
                },
                hide: function(e) {
                    e.tab.css({
                        display: "none"
                    }), e.complete && e.complete()
                }
            },
            fade: {
                show: function(e) {
                    e.fast && (e.speed = 1), e.tab.fadeIn(e.speed), e.complete && setTimeout(e.complete, e.speed)
                },
                hide: function(e) {
                    e.fast && (e.speed = 1), e.tab.fadeOut(e.speed), e.complete && setTimeout(e.complete, e.speed)
                }
            },
            slide: {
                show: function(t) {
                    var i = t.tab.show().css({
                            width: t.tab.width()
                        }).outerHeight(!0),
                        n = e('<div class="effect-div">').insertBefore(t.tab).append(t.tab);
                    n.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), t.tab.css({
                        marginTop: -i,
                        display: "block"
                    }), t.fast && (t.speed = 1), t.tab.animate({
                        marginTop: 0
                    }, {
                        duration: t.speed,
                        complete: function() {
                            t.tab.css({
                                marginTop: "",
                                width: ""
                            }).insertBefore(n), n.remove(), t.complete && t.complete()
                        }
                    })
                },
                hide: function(t) {
                    var i = t.tab.show().css({
                            width: t.tab.width()
                        }).outerHeight(!0),
                        n = e('<div class="effect-div">').insertBefore(t.tab).append(t.tab);
                    n.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), t.fast && (t.speed = 1), t.tab.animate({
                        marginTop: -i
                    }, {
                        duration: t.speed,
                        complete: function() {
                            t.tab.css({
                                display: "none",
                                marginTop: "",
                                width: ""
                            }).insertBefore(n), n.remove(), t.complete && t.complete()
                        }
                    })
                }
            }
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                addClassBeforeAnimation: !0,
                hideOnClickOutside: !1,
                activeClass: "active",
                opener: ".opener",
                slider: ".slide",
                animSpeed: 400,
                effect: "fade",
                event: "click"
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this))
            },
            findElements: function() {
                this.holder = e(this.options.holder), this.opener = this.holder.find(this.options.opener), this.slider = this.holder.find(this.options.slider)
            },
            attachEvents: function() {
                var t = this;
                this.eventHandler = function(e) {
                    e.preventDefault(), t.slider.is(":animated") || (t.slider.hasClass(i) ? t.showSlide() : t.hideSlide())
                }, t.opener.bind(t.options.event, this.eventHandler), "over" === t.options.event && (t.opener.bind("mouseenter", function() {
                    t.showSlide()
                }), t.holder.bind("mouseleave", function() {
                    t.hideSlide()
                })), t.outsideClickHandler = function(i) {
                    if (t.options.hideOnClickOutside) {
                        var n = e(i.target);
                        n.is(t.holder) || n.closest(t.holder).length || t.hideSlide()
                    }
                }, this.holder.hasClass(this.options.activeClass) ? (e(document).bind("click touchstart", t.outsideClickHandler), t.slider.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })) : (this.slider.addClass(i), t.slider.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                })), this.opener.on("keydown", function(e) {
                    switch (e.keyCode) {
                        case 13:
                        case 32:
                            e.preventDefault(), t.eventHandler(e)
                    }
                })
            },
            showSlide: function() {
                var t = this;
                t.options.addClassBeforeAnimation && t.holder.addClass(t.options.activeClass), t.slider.removeClass(i), e(document).bind("click touchstart", t.outsideClickHandler), t.makeCallback("animStart", !0, this), n[t.options.effect].show({
                    box: t.slider,
                    speed: t.options.animSpeed,
                    complete: function() {
                        t.options.addClassBeforeAnimation || t.holder.addClass(t.options.activeClass), t.makeCallback("animEnd", !0, t)
                    }
                }), t.slider.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })
            },
            hideSlide: function() {
                var t = this;
                t.options.addClassBeforeAnimation && t.holder.removeClass(t.options.activeClass), e(document).unbind("click touchstart", t.outsideClickHandler), t.makeCallback("animStart", !1, this), n[t.options.effect].hide({
                    box: t.slider,
                    speed: t.options.animSpeed,
                    complete: function() {
                        t.options.addClassBeforeAnimation || t.holder.removeClass(t.options.activeClass), t.slider.addClass(i), t.makeCallback("animEnd", !1, t), t.slider.attr({
                            "aria-expanded": "false",
                            "aria-hidden": "true"
                        })
                    }
                })
            },
            destroy: function() {
                var t = this;
                e(document).unbind("click touchstart", this.outsideClickHandler), setTimeout(function() {
                    t.slider.removeClass(i).css({
                        display: ""
                    }), t.opener.unbind(t.options.event, t.eventHandler), t.holder.removeClass(t.options.activeClass).removeData("OpenClose"), t.slider.removeAttr("aria-expanded aria-hidden")
                }, 10)
            },
            makeCallback: function(e) {
                if ("function" == typeof this.options[e]) {
                    var t = Array.prototype.slice.call(arguments);
                    t.shift(), this.options[e].apply(this, t)
                }
            }
        };
        var i = "js-slide-hidden";
        e(function() {
            var t = e('<style type="text/css">')[0],
                n = "." + i;
            n += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}", t.styleSheet ? t.styleSheet.cssText = n : t.appendChild(document.createTextNode(n)), e("head").append(t)
        });
        var n = {
            slide: {
                show: function(e) {
                    e.box.stop(!0).hide().slideDown(e.speed, e.complete)
                },
                hide: function(e) {
                    e.box.stop(!0).slideUp(e.speed, e.complete)
                }
            },
            fade: {
                show: function(e) {
                    e.box.stop(!0).hide().fadeIn(e.speed, e.complete)
                },
                hide: function(e) {
                    e.box.stop(!0).fadeOut(e.speed, e.complete)
                }
            },
            none: {
                show: function(e) {
                    e.box.hide().show(0, e.complete)
                },
                hide: function(e) {
                    e.box.hide(0, e.complete)
                }
            }
        };
        e.fn.openClose = function(i) {
            return this.each(function() {
                jQuery(this).data("OpenClose", new t(e.extend(i, {
                    holder: this
                })))
            })
        }
    }(jQuery), ResponsiveHelper = function(e) {
        function t() {
            var t = r.width();
            t !== a && (a = t, e.each(o, function(t, n) {
                e.each(n.data, function(e, t) {
                    t.currentActive && !i(t.range[0], t.range[1]) && (t.currentActive = !1, "function" == typeof t.disableCallback && t.disableCallback())
                }), e.each(n.data, function(e, t) {
                    !t.currentActive && i(t.range[0], t.range[1]) && (t.currentActive = !0, "function" == typeof t.enableCallback && t.enableCallback())
                })
            }))
        }

        function i(e, t) {
            var i = "";
            return e > 0 && (i += "(min-width: " + e + "px)"), 1 / 0 > t && (i += (i ? " and " : "") + "(max-width: " + t + "px)"), n(i, e, t)
        }

        function n(e, t, i) {
            return window.matchMedia && l ? matchMedia(e).matches : window.styleMedia ? styleMedia.matchMedium(e) : window.media ? media.matchMedium(e) : a >= t && i >= a
        }

        function s(e) {
            var t = e.split(".."),
                i = parseInt(t[0], 10) || -(1 / 0),
                n = parseInt(t[1], 10) || 1 / 0;
            return [i, n].sort(function(e, t) {
                return e - t
            })
        }
        var a, o = [],
            r = e(window),
            l = !1;
        return window.matchMedia && (window.Window && window.matchMedia === Window.prototype.matchMedia ? l = !0 : window.matchMedia.toString().indexOf("native") > -1 && (l = !0)), r.bind("load resize orientationchange", t), {
            addRange: function(i) {
                var n = {
                    data: {}
                };
                e.each(i, function(e, t) {
                    n.data[e] = {
                        range: s(e),
                        enableCallback: t.on,
                        disableCallback: t.off
                    }
                }), o.push(n), a = null, t()
            }
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                mask: "div.mask",
                slider: ">*",
                slides: ">*",
                activeClass: "active",
                disabledClass: "disabled",
                btnPrev: "a.btn-prev",
                btnNext: "a.btn-next",
                generatePagination: !1,
                pagerList: '<ul role="presentation">',
                pagerListItem: '<li role="presentation"><a role="button" aria-controls="carousel-slideset" href="#"></a></li>',
                pagerListItemText: "a",
                pagerLinks: ".pagination li",
                currentNumber: "span.current-num",
                totalNumber: "span.total-num",
                btnPlay: ".btn-play",
                btnPause: ".btn-pause",
                btnPlayPause: ".btn-play-pause",
                galleryReadyClass: "gallery-js-ready",
                autorotationActiveClass: "autorotation-active",
                autorotationDisabledClass: "autorotation-disabled",
                autorotationStopAfterClick: !0,
                stretchSlideToMask: !1,
                circularRotation: !0,
                disableWhileAnimating: !1,
                autoRotation: !1,
                pauseOnHover: i ? !1 : !0,
                maskAutoSize: !1,
                autoHeight: !1,
                switchTime: 4e3,
                animSpeed: 600,
                event: "click",
                swipeGap: !1,
                swipeThreshold: 15,
                handleTouch: !0,
                vertical: !1,
                useTranslate3D: !1,
                step: !1
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && (this.findElements(), this.attachEvents(), this.refreshPosition(), this.refreshState(!0), this.resumeRotation(), this.wai(), this.makeCallback("onInit", this))
            },
            findElements: function() {
                if (this.fullSizeFunction = this.options.vertical ? "outerHeight" : "outerWidth", this.innerSizeFunction = this.options.vertical ? "height" : "width", this.slideSizeFunction = "outerHeight", this.maskSizeProperty = "height", this.animProperty = this.options.vertical ? "marginTop" : "marginLeft", this.swipeProperties = this.options.vertical ? ["up", "down"] : ["left", "right"], this.gallery = e(this.options.holder).addClass(this.options.galleryReadyClass), this.mask = this.gallery.find(this.options.mask), this.slider = this.mask.find(this.options.slider), this.slides = this.slider.find(this.options.slides), this.btnPrev = this.gallery.find(this.options.btnPrev), this.btnNext = this.gallery.find(this.options.btnNext), this.currentStep = 0, this.stepsCount = 0, this.options.step === !1) {
                    var t = this.slides.filter("." + this.options.activeClass);
                    t.length && (this.currentStep = this.slides.index(t))
                }
                this.calculateOffsets(), "string" == typeof this.options.generatePagination ? (this.pagerLinks = e(), this.buildPagination()) : (this.pagerLinks = this.gallery.find(this.options.pagerLinks), this.attachPaginationEvents()), this.btnPlay = this.gallery.find(this.options.btnPlay), this.btnPause = this.gallery.find(this.options.btnPause), this.btnPlayPause = this.gallery.find(this.options.btnPlayPause), this.curNum = this.gallery.find(this.options.currentNumber), this.allNum = this.gallery.find(this.options.totalNumber), this.gallery.attr("data-time") && (this.options.switchTime = this.gallery.data("time")), this.gallery.attr("data-rotation") && (this.options.autoRotation = this.gallery.data("rotation"))
            },
            attachEvents: function() {
                var t = this;
                this.bindHandlers(["onWindowResize"]), e(window).bind("load resize", this.onWindowResize), this.btnPrev.length && (this.prevSlideHandler = function(e) {
                    e.preventDefault(), t.prevSlide(), t.options.autorotationStopAfterClick && t.stopRotation()
                }, this.btnPrev.bind(this.options.event, this.prevSlideHandler)), this.btnNext.length && (this.nextSlideHandler = function(e) {
                    e.preventDefault(), t.nextSlide(), t.options.autorotationStopAfterClick && t.stopRotation()
                }, this.btnNext.bind(this.options.event, this.nextSlideHandler)), this.options.pauseOnHover && !i && (this.hoverHandler = function() {
                    t.options.autoRotation && (t.galleryHover = !0, t.pauseRotation())
                }, this.leaveHandler = function() {
                    t.options.autoRotation && (t.galleryHover = !1, t.resumeRotation())
                }, this.gallery.bind({
                    mouseenter: this.hoverHandler,
                    mouseleave: this.leaveHandler
                })), this.btnPlay.length && (this.btnPlayHandler = function(e) {
                    e.preventDefault(), t.startRotation()
                }, this.btnPlay.bind(this.options.event, this.btnPlayHandler)), this.btnPause.length && (this.btnPauseHandler = function(e) {
                    e.preventDefault(), t.stopRotation()
                }, this.btnPause.bind(this.options.event, this.btnPauseHandler)), this.btnPlayPause.length && (this.btnPlayPauseHandler = function(e) {
                    e.preventDefault(), t.gallery.hasClass(t.options.autorotationActiveClass) ? t.stopRotation() : t.startRotation()
                }, this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler)), i && this.options.handleTouch && window.Hammer && this.mask.length && (this.swipeHandler = new Hammer.Manager(this.mask[0]), this.swipeHandler.add(new Hammer.Pan({
                    direction: t.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
                    threshold: t.options.swipeThreshold
                })), this.swipeHandler.on("panstart", function() {
                    t.galleryAnimating ? t.swipeHandler.stop() : (t.pauseRotation(), t.originalOffset = parseFloat(t.slider.css(t.animProperty)))
                }).on("panmove", function(e) {
                    var i = t.originalOffset + e[t.options.vertical ? "deltaY" : "deltaX"];
                    i = Math.max(Math.min(0, i), t.maxOffset), t.slider.css(t.animProperty, i)
                }).on("panend", function(e) {
                    t.resumeRotation(), e.distance > t.options.swipeThreshold ? e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN ? t.nextSlide() : t.prevSlide() : t.switchSlide()
                })), this.gallery.on("keydown", function(e) {
                    switch (e.keyCode) {
                        case 35:
                            e.preventDefault(), t.numSlide(t.stepsCount - 1), t.options.autorotationStopAfterClick && t.stopRotation();
                            break;
                        case 36:
                            e.preventDefault(), t.numSlide(0), t.options.autorotationStopAfterClick && t.stopRotation();
                            break;
                        case 33:
                        case 37:
                        case 38:
                            e.preventDefault(), t.prevSlide(), t.options.autorotationStopAfterClick && t.stopRotation();
                            break;
                        case 34:
                        case 39:
                        case 40:
                            e.preventDefault(), t.nextSlide(), t.options.autorotationStopAfterClick && t.stopRotation()
                    }
                    "9" == e.keyCode && setTimeout(function() {
                        t.mask.scrollLeft(0)
                    }, 0)
                })
            },
            onWindowResize: function() {
                this.galleryAnimating ? this.resizeQueue = !0 : (this.calculateOffsets(), this.refreshPosition(), this.buildPagination(), this.refreshState(), this.resizeQueue = !1)
            },
            refreshPosition: function() {
                this.currentStep = Math.min(this.currentStep, this.stepsCount - 1), this.tmpProps = {}, this.tmpProps[this.animProperty] = this.getStepOffset(), this.slider.stop().css(this.tmpProps)
            },
            calculateOffsets: function() {
                var t, i, n = this;
                if (this.options.stretchSlideToMask) {
                    var s = {};
                    s[this.innerSizeFunction] = this.mask[this.innerSizeFunction](), this.slides.css(s)
                }
                if (this.maskSize = this.mask[this.innerSizeFunction](), this.sumSize = this.getSumSize(), this.maxOffset = this.maskSize - this.sumSize, this.options.vertical && this.options.maskAutoSize) {
                    this.options.step = 1, this.stepsCount = this.slides.length, this.stepOffsets = [0], t = 0;
                    for (var a = 0; a < this.slides.length; a++) t -= e(this.slides[a])[this.fullSizeFunction](!0), this.stepOffsets.push(t);
                    return void(this.maxOffset = t)
                }
                if (this.options.autoHeight && this.mask.css({
                        height: this.slides.eq(this.currentStep).outerHeight()
                    }), "number" == typeof this.options.step && this.options.step > 0)
                    for (this.slideDimensions = [], this.slides.each(e.proxy(function(t, i) {
                            n.slideDimensions.push(e(i)[n.fullSizeFunction](!0))
                        }, this)), this.stepOffsets = [0], this.stepsCount = 1, t = i = 0; t > this.maxOffset;) t -= this.getSlideSize(i, i + this.options.step), i += this.options.step, this.stepOffsets.push(Math.max(t, this.maxOffset)), this.stepsCount++;
                else
                    for (this.stepSize = this.maskSize, this.stepsCount = 1, t = 0; t > this.maxOffset;) t -= this.stepSize, this.stepsCount++
            },
            getSumSize: function() {
                var t = 0;
                return this.slides.each(e.proxy(function(i, n) {
                    t += e(n)[this.fullSizeFunction](!0)
                }, this)), this.slider.css(this.innerSizeFunction, t), t
            },
            getStepOffset: function(e) {
                return e = e || this.currentStep, "number" == typeof this.options.step ? this.stepOffsets[this.currentStep] : Math.min(0, Math.max(-this.currentStep * this.stepSize, this.maxOffset))
            },
            getSlideSize: function(e, t) {
                for (var i = 0, n = e; n < Math.min(t, this.slideDimensions.length); n++) i += this.slideDimensions[n];
                return i
            },
            buildPagination: function() {
                if ("string" == typeof this.options.generatePagination && this.sumSize > this.maskSize && (this.pagerHolder || (this.pagerHolder = this.gallery.find(this.options.generatePagination)), this.pagerHolder.length && this.oldStepsCount != this.stepsCount)) {
                    this.oldStepsCount = this.stepsCount, this.pagerHolder.empty(), this.pagerList = e(this.options.pagerList).appendTo(this.pagerHolder);
                    for (var t = 0; t < this.stepsCount; t++) e(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(t + 1);
                    this.pagerLinks = this.pagerList.children(), this.attachPaginationEvents()
                }
            },
            attachPaginationEvents: function() {
                var e = this;
                this.pagerLinksHandler = function(t) {
                    t.preventDefault(), e.numSlide(e.pagerLinks.index(t.currentTarget)), e.options.autorotationStopAfterClick && e.stopRotation()
                }, this.pagerLinks.bind(this.options.event, this.pagerLinksHandler)
            },
            prevSlide: function() {
                this.options.disableWhileAnimating && this.galleryAnimating || (this.currentStep > 0 ? (this.currentStep--, this.switchSlide()) : this.options.circularRotation && (this.currentStep = this.stepsCount - 1, this.switchSlide()))
            },
            nextSlide: function(e) {
                this.options.disableWhileAnimating && this.galleryAnimating || (this.currentStep < this.stepsCount - 1 ? (this.currentStep++, this.switchSlide(!1, e)) : (this.options.circularRotation || e === !0) && (this.currentStep = 0, this.switchSlide(!1, e)))
            },
            numSlide: function(e, t) {
                this.currentStep != e && (this.currentStep = e, this.switchSlide(t))
            },
            switchSlide: function(e, t) {
                var n = this;
                this.galleryAnimating = !0, this.tmpProps = {}, this.tmpProps[this.animProperty] = this.getStepOffset(), this.slider.stop().animate(this.tmpProps, {
                    duration: e ? 0 : this.options.animSpeed,
                    complete: function() {
                        n.galleryAnimating = !1, n.resizeQueue && n.onWindowResize(), n.wai(), t || i || n.pagerLinks.find("a").eq(n.currentStep).focus(), n.makeCallback("onChange", n), n.autoRotate()
                    }
                }), this.refreshState(), this.makeCallback("onBeforeChange", this)
            },
            wai: function() {
                var e = this.slides.eq(this.currentStep);
                this.slides.not(e).attr({
                    "aria-selected": "false"
                }), this.slides.not(e).find("a").attr("tabindex", "-1"), e.attr({
                    "aria-selected": "true"
                }), e.find("a").removeAttr("tabindex")
            },
            refreshState: function(e) {
                (1 === this.options.step || this.stepsCount === this.slides.length) && this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass), this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass), this.curNum.html(this.currentStep + 1), this.allNum.html(this.stepsCount), this.options.maskAutoSize && "number" == typeof this.options.step && (this.tmpProps = {}, this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep, this.slides.length - 1))[this.slideSizeFunction](!0), this.mask.stop()[e ? "css" : "animate"](this.tmpProps)), this.options.autoHeight && this.mask.animate({
                    height: this.slides.eq(this.currentStep).outerHeight()
                }, {
                    queue: !1,
                    duration: this.options.animSpeed
                }), this.options.circularRotation || (this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass), 0 === this.currentStep && this.btnPrev.addClass(this.options.disabledClass), this.currentStep === this.stepsCount - 1 && this.btnNext.addClass(this.options.disabledClass)), this.gallery.toggleClass("not-enough-slides", this.sumSize <= this.maskSize), e && (this.slides.not(this.slides.eq(this.currentStep)).attr({
                    "aria-selected": "false"
                }), this.slides.eq(this.currentStep).attr({
                    "aria-selected": "true"
                }))
            },
            startRotation: function() {
                this.options.autoRotation = !0, this.galleryHover = !1, this.autoRotationStopped = !1, this.resumeRotation()
            },
            stopRotation: function() {
                this.galleryHover = !0, this.autoRotationStopped = !0, this.pauseRotation()
            },
            pauseRotation: function() {
                this.gallery.addClass(this.options.autorotationDisabledClass), this.gallery.removeClass(this.options.autorotationActiveClass), clearTimeout(this.timer)
            },
            resumeRotation: function() {
                this.autoRotationStopped || (this.gallery.addClass(this.options.autorotationActiveClass), this.gallery.removeClass(this.options.autorotationDisabledClass), this.autoRotate())
            },
            autoRotate: function() {
                var e = this;
                clearTimeout(this.timer), !this.options.autoRotation || this.galleryHover || this.autoRotationStopped ? this.pauseRotation() : this.timer = setTimeout(function() {
                    e.nextSlide(!0)
                }, this.options.switchTime)
            },
            bindHandlers: function(t) {
                var i = this;
                e.each(t, function(e, t) {
                    var n = i[t];
                    i[t] = function() {
                        return n.apply(i, arguments)
                    }
                })
            },
            makeCallback: function(e) {
                if ("function" == typeof this.options[e]) {
                    var t = Array.prototype.slice.call(arguments);
                    t.shift(), this.options[e].apply(this, t)
                }
            },
            destroy: function() {
                e(window).unbind("load resize", this.onWindowResize), this.btnPrev.unbind(this.options.event, this.prevSlideHandler), this.btnNext.unbind(this.options.event, this.nextSlideHandler), this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler), this.gallery.unbind({
                    mouseenter: this.hoverHandler,
                    mouseleave: this.leaveHandler
                }), this.stopRotation(), this.btnPlay.unbind(this.options.event, this.btnPlayHandler), this.btnPause.unbind(this.options.event, this.btnPauseHandler), this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler), this.swipeHandler && this.swipeHandler.destroy();
                var t = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
                this.gallery.removeClass(t.join(" ")), this.slider.add(this.slides).removeAttr("style"), "string" == typeof this.options.generatePagination && this.pagerHolder.empty()
            }
        };
        var i = /Windows Phone/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
        e.fn.scrollGallery = function(i) {
            return this.each(function() {
                e(this).data("ScrollGallery", new t(e.extend(i, {
                    holder: this
                })))
            })
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                list: null,
                levelIndentHTML: " &bull; ",
                defaultOptionAttr: "title",
                defaultOptionText: MLocale.get("ui_default_option_text"),
                selectClass: "nav-select",
                activeClass: "active",
                defaultOptionClass: "opt-default",
                hasDropClass: "opt-sublevel",
                levelPrefixClass: "opt-level-",
                useDefaultOption: !1
            }, t), this.options.list && (this.createSelect(), this.attachEvents())
        }
        t.prototype = {
            createSelect: function() {
                this.startIndex = 0, this.navigation = e(this.options.list), this.select = e("<select>").addClass(this.options.selectClass), this.createDefaultOption(), this.createList(this.navigation, 0), this.select.insertBefore(this.navigation)
            },
            createDefaultOption: function() {
                if (this.options.useDefaultOption) {
                    var t = this.navigation.attr(this.options.defaultOptionAttr),
                        i = e("<option>").addClass(this.options.defaultOptionClass).text(t || this.options.defaultOptionText);
                    this.navigation.removeAttr(this.options.defaultOptionAttr), this.select.append(i), this.startIndex = 1
                }
            },
            createList: function(t, i) {
                var n = this;
                t.children().each(function(t, s) {
                    var a = e(this),
                        o = a.find("a").eq(0),
                        r = a.find("ul").eq(0),
                        l = r.length > 0;
                    o.length && n.select.append(n.createOption(o, l, i, o.parent().hasClass(n.options.activeClass))), l && n.createList(r, i + 1)
                })
            },
            createOption: function(t, i, n, s) {
                var a = this.getLevelIndent(n) + t.html();
                return e("<option>").html(a).addClass(this.options.levelPrefixClass + (n + 1)).toggleClass(this.options.hasDropClass, i).val(t.attr("href")).attr("selected", s ? "selected" : !1)
            },
            getLevelIndent: function(e) {
                return new Array(e + 1).join(this.options.levelIndentHTML)
            },
            attachEvents: function() {
                var e = this;
                this.select.change(function() {
                    this.selectedIndex >= e.startIndex && (location.href = this.value)
                })
            },
            destroy: function() {
                this.select[0].jcf && this.select[0].jcf.destroy(), this.select.remove()
            }
        }, e.fn.navigationSelect = function(i) {
            return this.each(function() {
                e(this).data("NavigationSelect", new t(e.extend({
                    list: this
                }, i)))
            })
        }
    }(jQuery),
    function(e) {
        function t(t, a) {
            var o, r = e(),
                l = 0,
                c = t.eq(0).offset().top;
            t.each(function(t) {
                var s = e(this);
                s.offset().top === c ? r = r.add(this) : (o = i(r), l = Math.max(l, n(r, o, a)), r = s, c = s.offset().top)
            }), r.length && (o = i(r), l = Math.max(l, n(r, o, a))), a.biggestHeight && t.css(a.useMinHeight && s ? "minHeight" : "height", l)
        }

        function i(t) {
            var i = 0;
            return t.each(function() {
                i = Math.max(i, e(this).outerHeight())
            }), i
        }

        function n(t, i, n) {
            var a, o = "number" == typeof i ? i : i.height();
            return t.removeClass(n.leftEdgeClass).removeClass(n.rightEdgeClass).each(function(t) {
                var r = e(this),
                    l = 0,
                    c = "border-box" === r.css("boxSizing");
                "number" != typeof i && r.parents().each(function() {
                    var t = e(this);
                    return i.is(this) ? !1 : void(l += t.outerHeight() - t.height())
                }), a = o - l, a -= c ? 0 : r.outerHeight() - r.height(), a > 0 && r.css(n.useMinHeight && s ? "minHeight" : "height", a)
            }), t.filter(":first").addClass(n.leftEdgeClass), t.filter(":last").addClass(n.rightEdgeClass), a
        }
        e.fn.sameHeight = function(i) {
            var a = e.extend({
                skipClass: "same-height-ignore",
                leftEdgeClass: "same-height-left",
                rightEdgeClass: "same-height-right",
                elements: ">*",
                flexible: !1,
                multiLine: !1,
                useMinHeight: !1,
                biggestHeight: !1
            }, i);
            return this.each(function() {
                function i() {
                    c.css(a.useMinHeight && s ? "minHeight" : "height", ""), a.multiLine ? t(c, a) : n(c, l, a)
                }
                var o, r, l = e(this),
                    c = l.find(a.elements).not("." + a.skipClass);
                if (c.length) {
                    i();
                    var d = function() {
                        r || (r = !0, i(), clearTimeout(o), o = setTimeout(function() {
                            i(), setTimeout(function() {
                                r = !1
                            }, 10)
                        }, 100))
                    };
                    a.flexible && e(window).bind("resize orientationchange fontresize", d), e(window).bind("load", d)
                }
            })
        };
        var s = "undefined" != typeof document.documentElement.style.maxHeight
    }(jQuery), jQuery.onFontResize = function(e) {
        return e(function() {
            var t = "font-resize-frame-" + Math.floor(1e3 * Math.random()),
                i = e("<iframe>").attr("id", t).addClass("font-resize-helper");
            if (i.css({
                    width: "100em",
                    height: "10px",
                    position: "absolute",
                    borderWidth: 0,
                    top: "-9999px",
                    left: "-9999px"
                }).appendTo("body"), window.attachEvent && !window.addEventListener) i.bind("resize", function() {
                e.onFontResize.trigger(i[0].offsetWidth / 100)
            });
            else {
                var n = i[0].contentWindow.document;
                n.open(), n.write('<script>window.onload = function(){var em = parent.jQuery("#' + t + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</script>'), n.close()
            }
            jQuery.onFontResize.initialSize = i[0].offsetWidth / 100
        }), {
            trigger: function(t) {
                e(window).trigger("fontresize", [t])
            }
        }
    }(jQuery), TouchNav.isActiveOn = function(e) {
        return e && e.touchNavActive
    }, TouchNav.prototype = {
        init: function() {
            "string" == typeof this.options.navBlock ? this.menu = document.getElementById(this.options.navBlock) : "object" == typeof this.options.navBlock && (this.menu = this.options.navBlock), this.menu && this.addEvents()
        },
        addEvents: function() {
            var e = this,
                t = (jQuery(window), navigator.pointerEnabled && "pointerdown" || navigator.msPointerEnabled && "MSPointerDown" || this.isTouchDevice && "touchstart"),
                i = 0;
            this.menuItems = jQuery(this.menu).find(">" + this.options.menuItems);
            for (var n = 0; n < this.menuItems.length; n++) ! function(n) {
                var s = e.menuItems[n],
                    a = lib.queryElementsBySelector(e.options.menuDrop, s)[0],
                    o = lib.queryElementsBySelector(e.options.menuOpener, s)[0],
                    r = jQuery(a),
                    l = r.find("a").not(".back"),
                    c = function(t) {
                        var n = jQuery(this);
                        switch (t.keyCode) {
                            case 27:
                                n.trigger("mouseleave");
                                break;
                            case 13:
                            case 32:
                                t.preventDefault(), "true" == r.attr("aria-hidden") ? (e.menuItems.not(n).trigger("mouseleave"), n.trigger("mouseenter"), l.eq(0).focus(), i = 0) : n.trigger("mouseleave");
                                break;
                            case 38:
                                t.preventDefault(), "true" == r.attr("aria-hidden") ? (e.menuItems.not(n).trigger("mouseleave"), n.trigger("mouseenter"), l.eq(0).focus(), i = 0) : (i--, 0 > i && (i = l.length - 1), l.eq(i).focus());
                                break;
                            case 40:
                                t.preventDefault(), "true" == r.attr("aria-hidden") ? (e.menuItems.not(n).trigger("mouseleave"), n.trigger("mouseenter"), l.eq(0).focus()) : (i++, i > l.length - 1 && (i = 0), l.eq(i).focus());
                                break;
                            case 35:
                                t.preventDefault(), e.menuItems.eq(e.menuItems.length - 1).focus(), e.menuItems.attr("tabindex", "-1").eq(e.menuItems.length - 1).attr("tabindex", "0");
                                break;
                            case 36:
                                t.preventDefault(), e.menuItems.eq(0).focus(), e.menuItems.attr("tabindex", "-1").eq(0).attr("tabindex", "0");
                                break;
                            case 37:
                                t.preventDefault(), n.prev().focus(), e.menuItems.attr("tabindex", "-1"), n.prev().attr("tabindex", "0");
                                break;
                            case 39:
                                t.preventDefault(), n.next().focus(), e.menuItems.attr("tabindex", "-1"), n.next().attr("tabindex", "0")
                        }
                    };
                (e.isTouchDevice || navigator.msPointerEnabled) && a && o && (lib.event.add(o, "click", lib.bind(e.clickHandler, e)), lib.event.add(o, t, function(t) {
                    return e.isTouchPointerEvent(t) ? void(e.preventCurrentClick = !1) : (e.touchFlag = !0, e.currentItem = s, e.currentLink = o, e.currentDrop = r, void e.pressHandler.apply(e, arguments))
                })), jQuery(s).bind("mouseenter", function() {
                    e.touchFlag || (e.currentItem = s, e.mouseoverHandler(), r.attr({
                        "aria-hidden": "false",
                        "aria-expanded": "true"
                    }), jQuery(s).attr("tabindex", "0"), "function" == typeof e.options.onShow && e.options.onShow(r))
                }), jQuery(s).bind("mouseleave", function() {
                    e.touchFlag || (e.currentItem = s, e.mouseoutHandler(), r.attr({
                        "aria-hidden": "true",
                        "aria-expanded": "false"
                    }), jQuery(s).attr("tabindex", "-1"), "function" == typeof e.options.onHide && e.options.onHide())
                }), s.touchNavActive = !0, jQuery(s).on("keydown", c), jQuery(a).attr({
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                })
            }(n);
            (this.isTouchDevice || navigator.msPointerEnabled) && lib.event.add(document, t, lib.bind(this.clickOutsideHandler, this))
        },
        mouseoverHandler: function() {
            lib.addClass(this.currentItem, this.options.hoverClass), jQuery(this.currentItem).trigger("itemhover")
        },
        mouseoutHandler: function() {
            lib.removeClass(this.currentItem, this.options.hoverClass), jQuery(this.currentItem).trigger("itemleave")
        },
        hideActiveDropdown: function() {
            for (var e = 0; e < this.menuItems.length; e++) lib.hasClass(this.menuItems[e], this.options.hoverClass) && (lib.removeClass(this.menuItems[e], this.options.hoverClass), jQuery(this.menuItems[e]).trigger("itemleave"));
            this.activeParent = null, "function" == typeof this.options.onHide && this.options.onHide()
        },
        pressHandler: function(e) {
            var t = this;
            this.currentItem !== this.activeParent && (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode ? lib.removeClass(this.activeParent, this.options.hoverClass) : this.isParent(this.activeParent, this.currentLink) || this.hideActiveDropdown()), this.activeParent = this.currentItem, lib.hasClass(this.currentItem, this.options.hoverClass) ? this.preventCurrentClick = !1 : (e.preventDefault(), this.preventCurrentClick = !0, lib.addClass(this.currentItem, this.options.hoverClass), jQuery(this.currentItem).trigger("itemhover"), "function" == typeof t.options.onShow && t.options.onShow(t.currentDrop))
        },
        clickHandler: function(e) {
            (this.preventCurrentClick || "undefined" == typeof this.preventCurrentClick) && e.preventDefault()
        },
        clickOutsideHandler: function(e) {
            if (!this.isTouchPointerEvent(e)) {
                var t = e.changedTouches ? e.changedTouches[0] : e;
                this.activeParent && !this.isParent(this.menu, t.target) && (this.hideActiveDropdown(), this.touchFlag = !1)
            }
        },
        isParent: function(e, t) {
            for (; t.parentNode;) {
                if (t.parentNode == e) return !0;
                t = t.parentNode
            }
            return !1
        },
        isTouchPointerEvent: function(e) {
            return navigator.pointerEnabled && "touch" === e.pointerType || navigator.msPointerEnabled && e.pointerType !== e.MSPOINTER_TYPE_TOUCH
        },
        isTouchDevice: function() {
            try {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || -1 != navigator.userAgent.indexOf("IEMobile")
            } catch (e) {
                return !1
            }
        }()
    }, lib = {
        hasClass: function(e, t) {
            return e && e.className ? e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) : !1
        },
        addClass: function(e, t) {
            e && !this.hasClass(e, t) && (e.className += " " + t)
        },
        removeClass: function(e, t) {
            e && this.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " "))
        },
        extend: function(e) {
            for (var t = 1; t < arguments.length; t++)
                for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
            return e
        },
        each: function(e, t) {
            var i, n;
            if ("number" == typeof e.length)
                for (i = 0, n = e.length; n > i && t.call(e[i], i, e[i]) !== !1; i++);
            else
                for (i in e)
                    if (e.hasOwnProperty(i) && t.call(e[i], i, e[i]) === !1) break
        },
        event: function() {
            var e = function(e) {
                return e = e || window.event, e.isFixed ? e : (e.isFixed = !0, e.target || (e.target = e.srcElement), e.preventDefault = e.preventDefault || function() {
                    this.returnValue = !1
                }, e.stopPropagation = e.stopPropagation || function() {
                    this.cancelBubble = !0
                }, e)
            };
            return {
                add: function(t, i, n) {
                    t.events || (t.events = {}, t.handle = function(i) {
                        var n, s = t.events[i.type];
                        i = e(i);
                        for (var a = 0, o = s.length; o > a; a++) s[a] && (n = s[a].call(t, i), n === !1 && (i.preventDefault(), i.stopPropagation()))
                    }), t.events[i] || (t.events[i] = [], t.addEventListener ? t.addEventListener(i, t.handle, !1) : t.attachEvent && t.attachEvent("on" + i, t.handle)), t.events[i].push(n)
                },
                remove: function(e, t, i) {
                    for (var n = e.events[t], s = n.length - 1; s >= 0; s--) n[s] === i && n.splice(s, 1);
                    n.length || (delete e.events[t], e.removeEventListener ? e.removeEventListener(t, e.handle, !1) : e.detachEvent && e.detachEvent("on" + t, e.handle))
                }
            }
        }(),
        queryElementsBySelector: function(e, t) {
            if (t = t || document, !e) return [];
            if (">*" === e) return t.children;
            if ("function" == typeof document.querySelectorAll) return t.querySelectorAll(e);
            for (var i = e.split(","), n = [], s = 0; s < i.length; s++) {
                for (var a = [t || document], o = i[s].replace(/^\s+/, "").replace(/\s+$/, "").split(" "), r = 0; r < o.length; r++)
                    if (token = o[r].replace(/^\s+/, "").replace(/\s+$/, ""), token.indexOf("#") > -1) {
                        var l = token.split("#"),
                            c = l[0],
                            d = l[1],
                            h = document.getElementById(d);
                        if (h && c && h.nodeName.toLowerCase() != c) return [];
                        a = h ? [h] : []
                    } else if (token.indexOf(".") > -1) {
                    for (var l = token.split("."), c = l[0] || "*", u = l[1], p = [], f = 0, m = 0; m < a.length; m++) {
                        var g;
                        g = a[m].getElementsByTagName("*" == c ? "*" : c);
                        for (var v = 0; v < g.length; v++) p[f++] = g[v]
                    }
                    a = [];
                    for (var y = 0, b = 0; b < p.length; b++) p[b].className && p[b].className.match(new RegExp("(\\s|^)" + u + "(\\s|$)")) && (a[y++] = p[b])
                } else if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
                    var c = RegExp.$1 || "*",
                        w = RegExp.$2,
                        k = RegExp.$3,
                        C = RegExp.$4;
                    "for" == w.toLowerCase() && this.browser.msie && this.browser.version < 8 && (w = "htmlFor");
                    for (var p = [], f = 0, m = 0; m < a.length; m++) {
                        var g;
                        g = a[m].getElementsByTagName("*" == c ? "*" : c);
                        for (var v = 0; g[v]; v++) p[f++] = g[v]
                    }
                    a = [];
                    var j, y = 0;
                    switch (k) {
                        case "=":
                            j = function(e) {
                                return e.getAttribute(w) == C
                            };
                            break;
                        case "~":
                            j = function(e) {
                                return e.getAttribute(w).match(new RegExp("(\\s|^)" + C + "(\\s|$)"))
                            };
                            break;
                        case "|":
                            j = function(e) {
                                return e.getAttribute(w).match(new RegExp("^" + C + "-?"))
                            };
                            break;
                        case "^":
                            j = function(e) {
                                return 0 == e.getAttribute(w).indexOf(C)
                            };
                            break;
                        case "$":
                            j = function(e) {
                                return e.getAttribute(w).lastIndexOf(C) == e.getAttribute(w).length - C.length
                            };
                            break;
                        case "*":
                            j = function(e) {
                                return e.getAttribute(w).indexOf(C) > -1
                            };
                            break;
                        default:
                            j = function(e) {
                                return e.getAttribute(w)
                            }
                    }
                    a = [];
                    for (var y = 0, b = 0; b < p.length; b++) j(p[b]) && (a[y++] = p[b])
                } else {
                    c = token;
                    for (var p = [], f = 0, m = 0; m < a.length; m++)
                        for (var g = a[m].getElementsByTagName(c), v = 0; v < g.length; v++) p[f++] = g[v];
                    a = p
                }
                n = [].concat(n, a)
            }
            return n
        },
        trim: function(e) {
            return e.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        bind: function(e, t, i) {
            return function() {
                return e.apply(t, "undefined" != typeof i ? [i] : arguments)
            }
        }
    },
    function(e) {
        function t(t) {
            this.options = e.extend({
                items: "a",
                activeClass: "ui-global-focus"
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && (this.findElements(), this.attachEvents())
            },
            findElements: function() {
                this.holder = e(this.options.holder), this.items = this.holder.find(this.options.items), this.itemsCount = this.items.length
            },
            attachEvents: function() {
                var e = this,
                    t = function(t) {
                        switch (t.keyCode) {
                            case 35:
                                t.preventDefault(), e.items.eq(e.itemsCount - 1).focus();
                                break;
                            case 36:
                                t.preventDefault(), e.items.eq(0).focus();
                                break;
                            case 37:
                                t.preventDefault();
                                var i = e.items.index(e.items.filter("." + e.options.activeClass));
                                "-1" == i && (i = e.itemsCount), e.items.eq(i - 1).focus();
                                break;
                            case 39:
                                t.preventDefault();
                                var i = e.items.index(e.items.filter("." + e.options.activeClass));
                                i == e.itemsCount - 1 && (i = -1), e.items.eq(i + 1).focus()
                        }
                    };
                this.holder.on("keydown", t)
            }
        }, e.fn.keyboardSupport = function(i) {
            return this.each(function() {
                e(this).data("KeyboardSupport", new t(e.extend(i, {
                    holder: this
                })))
            })
        }
    }(jQuery),
    function(e) {
        var t, i, n, s, a, o, r, l, c, d, h, u, p, f = 0,
            m = {},
            g = [],
            v = 0,
            y = {},
            b = [],
            w = null,
            k = new Image,
            C = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
            j = /[^\.]\.(swf)\s*$/i,
            S = 1,
            x = 0,
            T = "",
            D = !1,
            E = e.extend(e("<div/>")[0], {
                prop: 0
            }),
            M = /MSIE 6/.test(navigator.userAgent) && e.browser.version < 7 && !window.XMLHttpRequest,
            _ = function() {
                i.hide(), k.onerror = k.onload = null, w && w.abort(), t.empty()
            },
            P = function() {
                return !1 === m.onError(g, f, m) ? (i.hide(), void(D = !1)) : (m.titleShow = !1, m.width = "auto", m.height = "auto", t.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), void A())
            },
            I = function() {
                var n, s, a, r, l, c, d = g[f];
                if (_(), m = e.extend({}, e.fn.fancybox.defaults, "undefined" == typeof e(d).data("fancybox") ? m : e(d).data("fancybox")), c = m.onStart(g, f, m), c === !1) return void(D = !1);
                if ("object" == typeof c && (m = e.extend(m, c)), a = m.title || (d.nodeName ? e(d).attr("title") : d.title) || "", d.nodeName && !m.orig && (m.orig = e(d).children("img:first").length ? e(d).children("img:first") : e(d)), "" === a && m.orig && m.titleFromAlt && (a = m.orig.attr("alt")), n = m.href || (d.nodeName ? e(d).attr("href") : d.href) || null, (/^(?:javascript)/i.test(n) || "#" == n) && (n = null), m.type ? (s = m.type, n || (n = m.content)) : m.content ? s = "html" : n && (s = n.match(C) ? "image" : n.match(j) ? "swf" : e(d).hasClass("iframe") ? "iframe" : 0 === n.indexOf("#") ? "inline" : "ajax"), !s) return void P();
                switch ("inline" == s && (d = n.substr(n.indexOf("#")), s = e(d).length > 0 ? "inline" : "ajax"), m.type = s, m.href = n, m.title = a, m.autoDimensions && ("html" == m.type || "inline" == m.type || "ajax" == m.type ? (m.width = "auto", m.height = "auto") : m.autoDimensions = !1), m.modal && (m.overlayShow = !0, m.hideOnOverlayClick = !1, m.hideOnContentClick = !1, m.enableEscapeButton = !1, m.showCloseButton = !1), m.padding = parseInt(m.padding, 10), m.margin = parseInt(m.margin, 10), t.css("padding", m.padding + m.margin), e(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
                    e(this).replaceWith(o.children())
                }), s) {
                    case "html":
                        t.html(m.content), A();
                        break;
                    case "inline":
                        if (e(d).parent().is("#fancybox-content") === !0) return void(D = !1);
                        e('<div class="fancybox-inline-tmp" />').hide().insertBefore(e(d)).bind("fancybox-cleanup", function() {
                            e(this).replaceWith(o.children())
                        }).bind("fancybox-cancel", function() {
                            e(this).replaceWith(t.children())
                        }), e(d).appendTo(t), A();
                        break;
                    case "image":
                        D = !1, e.fancybox.showActivity(), k = new Image, k.onerror = function() {
                            P()
                        }, k.onload = function() {
                            D = !0, k.onerror = k.onload = null, F()
                        }, k.src = n;
                        break;
                    case "swf":
                        m.scrolling = "no", r = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + m.width + '" height="' + m.height + '"><param name="movie" value="' + n + '"></param>', l = "", e.each(m.swf, function(e, t) {
                            r += '<param name="' + e + '" value="' + t + '"></param>', l += " " + e + '="' + t + '"'
                        }), r += '<embed src="' + n + '" type="application/x-shockwave-flash" width="' + m.width + '" height="' + m.height + '"' + l + "></embed></object>", t.html(r), A();
                        break;
                    case "ajax":
                        D = !1, e.fancybox.showActivity(), m.ajax.win = m.ajax.success, w = e.ajax(e.extend({}, m.ajax, {
                            url: n,
                            data: m.ajax.data || {},
                            dataType: "text",
                            error: function(e, t, i) {
                                e.status > 0 && P()
                            },
                            success: function(e, s, a) {
                                var o = "object" == typeof a ? a : w;
                                if (200 == o.status || 0 === o.status) {
                                    if ("function" == typeof m.ajax.win) {
                                        if (c = m.ajax.win(n, e, s, a), c === !1) return void i.hide();
                                        ("string" == typeof c || "object" == typeof c) && (e = c)
                                    }
                                    t.html(e), A()
                                }
                            }
                        }));
                        break;
                    case "iframe":
                        N()
                }
            },
            A = function() {
                var i = m.width,
                    n = m.height;
                i = i.toString().indexOf("%") > -1 ? parseInt((e(window).width() - 2 * m.margin) * parseFloat(i) / 100, 10) + "px" : "auto" == i ? "auto" : i + "px", n = n.toString().indexOf("%") > -1 ? parseInt((e(window).height() - 2 * m.margin) * parseFloat(n) / 100, 10) + "px" : "auto" == n ? "auto" : n + "px", t.wrapInner('<div style="width:' + i + ";height:" + n + ";overflow: " + ("auto" == m.scrolling ? "auto" : "yes" == m.scrolling ? "scroll" : "hidden") + ';position:relative;"></div>'), m.width = t.width(), m.height = t.height(), N()
            },
            F = function() {
                m.width = k.width, m.height = k.height, e("<img />").attr({
                    id: "fancybox-img",
                    src: k.src,
                    alt: m.title
                }).appendTo(t), N()
            },
            N = function() {
                var a, h;
                return i.hide(), s.is(":visible") && !1 === y.onCleanup(b, v, y) ? (e(".fancybox-inline-tmp").trigger("fancybox-cancel"), void(D = !1)) : (D = !0, e(o.add(n)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), s.is(":visible") && "outside" !== y.titlePosition && s.css("height", s.height()), b = g, v = f, y = m, y.overlayShow ? (n.css({
                    "background-color": y.overlayColor,
                    opacity: y.overlayOpacity,
                    cursor: y.hideOnOverlayClick ? "pointer" : "auto",
                    height: e(document).height()
                }), n.is(":visible") || (M && e("select:not(#fancybox-tmp select)").filter(function() {
                    return "hidden" !== this.style.visibility
                }).css({
                    visibility: "hidden"
                }).one("fancybox-cleanup", function() {
                    this.style.visibility = "inherit"
                }), n.show())) : n.hide(), p = Q(), H(), s.is(":visible") ? (e(r.add(c).add(d)).hide(), a = s.position(), u = {
                    top: a.top,
                    left: a.left,
                    width: s.width(),
                    height: s.height()
                }, h = u.width == p.width && u.height == p.height, void o.fadeTo(y.changeFade, .3, function() {
                    var i = function() {
                        o.html(t.contents()).fadeTo(y.changeFade, 1, B)
                    };
                    e(".fancybox-inline-tmp").trigger("fancybox-change"), o.empty().removeAttr("filter").css({
                        "border-width": y.padding,
                        width: p.width - 2 * y.padding,
                        height: m.autoDimensions ? "auto" : p.height - x - 2 * y.padding
                    }), h ? i() : (E.prop = 0, e(E).animate({
                        prop: 1
                    }, {
                        duration: y.changeSpeed,
                        easing: y.easingChange,
                        step: z,
                        complete: i
                    }))
                })) : (s.removeAttr("style"), o.css("border-width", y.padding), "elastic" == y.transitionIn ? (u = q(), o.html(t.contents()), s.show(), y.opacity && (p.opacity = 0), E.prop = 0, void e(E).animate({
                    prop: 1
                }, {
                    duration: y.speedIn,
                    easing: y.easingIn,
                    step: z,
                    complete: B
                })) : ("inside" == y.titlePosition && x > 0 && l.show(), o.css({
                    width: p.width - 2 * y.padding,
                    height: m.autoDimensions ? "auto" : p.height - x - 2 * y.padding
                }).html(t.contents()), void s.css(p).fadeIn("none" == y.transitionIn ? 0 : y.speedIn, B))))
            },
            O = function(e) {
                return e && e.length ? "float" == y.titlePosition ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + e + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + y.titlePosition + '">' + e + "</div>" : !1
            },
            H = function() {
                if (T = y.title || "", x = 0, l.empty().removeAttr("style").removeClass(), y.titleShow === !1) return void l.hide();
                if (T = e.isFunction(y.titleFormat) ? y.titleFormat(T, b, v, y) : O(T), !T || "" === T) return void l.hide();
                switch (l.addClass("fancybox-title-" + y.titlePosition).html(T).appendTo("body").show(), y.titlePosition) {
                    case "inside":
                        l.css({
                            width: p.width - 2 * y.padding,
                            marginLeft: y.padding,
                            marginRight: y.padding
                        }), x = l.outerHeight(!0), l.appendTo(a), p.height += x;
                        break;
                    case "over":
                        l.css({
                            marginLeft: y.padding,
                            width: p.width - 2 * y.padding,
                            bottom: y.padding
                        }).appendTo(a);
                        break;
                    case "float":
                        l.css("left", -1 * parseInt((l.width() - p.width - 40) / 2, 10)).appendTo(s);
                        break;
                    default:
                        l.css({
                            width: p.width - 2 * y.padding,
                            paddingLeft: y.padding,
                            paddingRight: y.padding
                        }).appendTo(s)
                }
                l.hide()
            },
            L = function() {
                return (y.enableEscapeButton || y.enableKeyboardNav) && e(document).bind("keydown.fb", function(t) {
                    27 == t.keyCode && y.enableEscapeButton ? (t.preventDefault(), e.fancybox.close()) : 37 != t.keyCode && 39 != t.keyCode || !y.enableKeyboardNav || "INPUT" === t.target.tagName || "TEXTAREA" === t.target.tagName || "SELECT" === t.target.tagName || (t.preventDefault(), e.fancybox[37 == t.keyCode ? "prev" : "next"]())
                }), y.showNavArrows ? ((y.cyclic && b.length > 1 || 0 !== v) && c.show(), void((y.cyclic && b.length > 1 || v != b.length - 1) && d.show())) : (c.hide(), void d.hide())
            },
            B = function() {
                e.support.opacity === !1 && (o.get(0).style.removeAttribute("filter"), s.get(0).style.removeAttribute("filter")), m.autoDimensions && o.css("height", "auto"), s.css("height", "auto"), T && T.length && l.show(), y.showCloseButton && r.show(), L(), y.hideOnContentClick && o.bind("click", e.fancybox.close), y.hideOnOverlayClick && n.bind("click", e.fancybox.close), e(window).bind("resize.fb", e.fancybox.resize), y.centerOnScroll && e(window).bind("scroll.fb", e.fancybox.center), "iframe" == y.type && e('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (window.attachEvent ? 'allowtransparency="true""' : "") + ' scrolling="' + m.scrolling + '" src="' + y.href + '"></iframe>').appendTo(o), s.show(), D = !1, e.fancybox.center(), y.onComplete(b, v, y), R()
            },
            R = function() {
                var e, t;
                b.length - 1 > v && (e = b[v + 1].href, "undefined" != typeof e && e.match(C) && (t = new Image,
                    t.src = e)), v > 0 && (e = b[v - 1].href, "undefined" != typeof e && e.match(C) && (t = new Image, t.src = e))
            },
            z = function(e) {
                var t = {
                    width: parseInt(u.width + (p.width - u.width) * e, 10),
                    height: parseInt(u.height + (p.height - u.height) * e, 10),
                    top: parseInt(u.top + (p.top - u.top) * e, 10),
                    left: parseInt(u.left + (p.left - u.left) * e, 10)
                };
                "undefined" != typeof p.opacity && (t.opacity = .5 > e ? .5 : e), s.css(t), o.css({
                    width: t.width - 2 * y.padding,
                    height: t.height - x * e - 2 * y.padding
                })
            },
            W = function() {
                return [e(window).width() - 2 * y.margin, e(window).height() - 2 * y.margin, e(document).scrollLeft() + y.margin, e(document).scrollTop() + y.margin]
            },
            Q = function() {
                var e, t = W(),
                    i = {},
                    n = y.autoScale,
                    s = 2 * y.padding;
                return y.width.toString().indexOf("%") > -1 ? i.width = parseInt(t[0] * parseFloat(y.width) / 100, 10) : i.width = y.width + s, y.height.toString().indexOf("%") > -1 ? i.height = parseInt(t[1] * parseFloat(y.height) / 100, 10) : i.height = y.height + s, n && (i.width > t[0] || i.height > t[1]) && ("image" == m.type || "swf" == m.type ? (e = y.width / y.height, i.width > t[0] && (i.width = t[0], i.height = parseInt((i.width - s) / e + s, 10)), i.height > t[1] && (i.height = t[1], i.width = parseInt((i.height - s) * e + s, 10))) : (i.width = Math.min(i.width, t[0]), i.height = Math.min(i.height, t[1]))), i.top = parseInt(Math.max(t[3] - 20, t[3] + .5 * (t[1] - i.height - 40)), 10), i.left = parseInt(Math.max(t[2] - 20, t[2] + .5 * (t[0] - i.width - 40)), 10), i
            },
            V = function(e) {
                var t = e.offset();
                return t.top += parseInt(e.css("paddingTop"), 10) || 0, t.left += parseInt(e.css("paddingLeft"), 10) || 0, t.top += parseInt(e.css("border-top-width"), 10) || 0, t.left += parseInt(e.css("border-left-width"), 10) || 0, t.width = e.width(), t.height = e.height(), t
            },
            q = function() {
                var t, i, n = m.orig ? e(m.orig) : !1,
                    s = {};
                return n && n.length ? (t = V(n), s = {
                    width: t.width + 2 * y.padding,
                    height: t.height + 2 * y.padding,
                    top: t.top - y.padding - 20,
                    left: t.left - y.padding - 20
                }) : (i = W(), s = {
                    width: 2 * y.padding,
                    height: 2 * y.padding,
                    top: parseInt(i[3] + .5 * i[1], 10),
                    left: parseInt(i[2] + .5 * i[0], 10)
                }), s
            },
            Y = function() {
                return i.is(":visible") ? (e("div", i).css("top", -40 * S + "px"), void(S = (S + 1) % 12)) : void clearInterval(h)
            };
        e.fn.fancybox = function(t) {
            return e(this).length ? (e(this).data("fancybox", e.extend({}, t, e.metadata ? e(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(t) {
                if (t.preventDefault(), !D) {
                    D = !0, e(this).blur(), g = [], f = 0;
                    var i = e(this).attr("rel") || "";
                    i && "" != i && "nofollow" !== i ? (g = e('a[rel="' + i + '"], area[rel="' + i + '"]'), f = g.index(this)) : g.push(this), I()
                }
            }), this) : this
        }, e.fancybox = function(t) {
            var i;
            if (!D) {
                if (D = !0, i = "undefined" != typeof arguments[1] ? arguments[1] : {}, g = [], f = parseInt(i.index, 10) || 0, e.isArray(t)) {
                    for (var n = 0, s = t.length; s > n; n++) "object" == typeof t[n] ? e(t[n]).data("fancybox", e.extend({}, i, t[n])) : t[n] = e({}).data("fancybox", e.extend({
                        content: t[n]
                    }, i));
                    g = jQuery.merge(g, t)
                } else "object" == typeof t ? e(t).data("fancybox", e.extend({}, i, t)) : t = e({}).data("fancybox", e.extend({
                    content: t
                }, i)), g.push(t);
                (f > g.length || 0 > f) && (f = 0), I()
            }
        }, e.fancybox.showActivity = function() {
            clearInterval(h), i.show(), h = setInterval(Y, 66)
        }, e.fancybox.hideActivity = function() {
            i.hide()
        }, e.fancybox.next = function() {
            return e.fancybox.pos(v + 1)
        }, e.fancybox.prev = function() {
            return e.fancybox.pos(v - 1)
        }, e.fancybox.pos = function(e) {
            D || (e = parseInt(e), g = b, e > -1 && e < b.length ? (f = e, I()) : y.cyclic && b.length > 1 && (f = e >= b.length ? 0 : b.length - 1, I()))
        }, e.fancybox.cancel = function() {
            D || (D = !0, e(".fancybox-inline-tmp").trigger("fancybox-cancel"), _(), m.onCancel(g, f, m), D = !1)
        }, e.fancybox.close = function() {
            function t() {
                n.fadeOut("fast"), l.empty().hide(), s.hide(), e(".fancybox-inline-tmp").trigger("fancybox-cleanup"), o.empty(), y.onClosed(b, v, y), b = m = [], v = f = 0, y = m = {}, D = !1
            }
            if (!D && !s.is(":hidden")) {
                if (D = !0, y && !1 === y.onCleanup(b, v, y)) return void(D = !1);
                if (_(), e(r.add(c).add(d)).hide(), e(o.add(n)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), "iframe" === y.type && o.find("iframe").attr("src", M && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank"), "inside" !== y.titlePosition && l.empty(), s.stop(), "elastic" == y.transitionOut) {
                    u = q();
                    var i = s.position();
                    p = {
                        top: i.top,
                        left: i.left,
                        width: s.width(),
                        height: s.height()
                    }, y.opacity && (p.opacity = 1), l.empty().hide(), E.prop = 1, e(E).animate({
                        prop: 0
                    }, {
                        duration: y.speedOut,
                        easing: y.easingOut,
                        step: z,
                        complete: t
                    })
                } else s.fadeOut("none" == y.transitionOut ? 0 : y.speedOut, t)
            }
        }, e.fancybox.resize = function() {
            n.is(":visible") && n.css("height", e(document).height()), e.fancybox.center(!0)
        }, e.fancybox.center = function() {
            var e, t;
            D || (t = arguments[0] === !0 ? 1 : 0, e = W(), (t || !(s.width() > e[0] || s.height() > e[1])) && s.stop().animate({
                top: parseInt(Math.max(e[3] - 20, e[3] + .5 * (e[1] - o.height() - 40) - y.padding)),
                left: parseInt(Math.max(e[2] - 20, e[2] + .5 * (e[0] - o.width() - 40) - y.padding))
            }, "number" == typeof arguments[0] ? arguments[0] : 0))
        }, e.fancybox.init = function() {
            e("#fancybox-wrap").length || (e("body").append(t = e('<div id="fancybox-tmp"></div>'), i = e('<div id="fancybox-loading"><div></div></div>'), n = e('<div id="fancybox-overlay"></div>'), s = e('<div id="fancybox-wrap"></div>')), a = e('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(s), a.append(o = e('<div id="fancybox-content"></div>'), r = e('<a id="fancybox-close"></a>'), l = e('<div id="fancybox-title"></div>'), c = e('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), d = e('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), r.click(e.fancybox.close), i.click(e.fancybox.cancel), c.click(function(t) {
                t.preventDefault(), e.fancybox.prev()
            }), d.click(function(t) {
                t.preventDefault(), e.fancybox.next()
            }), e.fn.mousewheel && s.bind("mousewheel.fb", function(t, i) {
                D ? t.preventDefault() : (0 == e(t.target).get(0).clientHeight || e(t.target).get(0).scrollHeight === e(t.target).get(0).clientHeight) && (t.preventDefault(), e.fancybox[i > 0 ? "prev" : "next"]())
            }), e.support.opacity === !1 && s.addClass("fancybox-ie"), M && (i.addClass("fancybox-ie6"), s.addClass("fancybox-ie6"), e('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(a)))
        }, e.fn.fancybox.defaults = {
            padding: 10,
            margin: 40,
            opacity: !1,
            modal: !1,
            cyclic: !1,
            scrolling: "auto",
            width: 560,
            height: 340,
            autoScale: !0,
            autoDimensions: !0,
            centerOnScroll: !1,
            ajax: {},
            swf: {
                wmode: "transparent"
            },
            hideOnOverlayClick: !0,
            hideOnContentClick: !1,
            overlayShow: !0,
            overlayOpacity: .7,
            overlayColor: "#777",
            titleShow: !0,
            titlePosition: "float",
            titleFormat: null,
            titleFromAlt: !1,
            transitionIn: "fade",
            transitionOut: "fade",
            speedIn: 300,
            speedOut: 300,
            changeSpeed: 300,
            changeFade: "fast",
            easingIn: "swing",
            easingOut: "swing",
            showCloseButton: !0,
            showNavArrows: !0,
            enableEscapeButton: !0,
            enableKeyboardNav: !0,
            onStart: function() {},
            onCancel: function() {},
            onComplete: function() {},
            onCleanup: function() {},
            onClosed: function() {},
            onError: function() {}
        }, e(document).ready(function() {
            e.fancybox.init()
        })
    }(jQuery),
    function(e, t) {
        function i(t, i) {
            var s, a, o, r = t.nodeName.toLowerCase();
            return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t)
        }

        function n(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
        }
        var s = 0,
            a = /^ui-id-\d+$/;
        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "1.10.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            focus: function(t) {
                return function(i, n) {
                    return "number" == typeof i ? this.each(function() {
                        var t = this;
                        setTimeout(function() {
                            e(t).focus(), n && n.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus),
            scrollParent: function() {
                var t;
                return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function(i) {
                if (i !== t) return this.css("zIndex", i);
                if (this.length)
                    for (var n, s, a = e(this[0]); a.length && a[0] !== document;) {
                        if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                        a = a.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++s)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    a.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(i) {
                    return !!e.data(i, t)
                }
            }) : function(t, i, n) {
                return !!e.data(t, n[3])
            },
            focusable: function(t) {
                return i(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var n = e.attr(t, "tabindex"),
                    s = isNaN(n);
                return (s || n >= 0) && i(t, !s)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, n) {
            function s(t, i, n, s) {
                return e.each(a, function() {
                    i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), i
            }
            var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                o = n.toLowerCase(),
                r = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + n] = function(i) {
                return i === t ? r["inner" + n].call(this) : this.each(function() {
                    e(this).css(o, s(this, i) + "px")
                })
            }, e.fn["outer" + n] = function(t, i) {
                return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function() {
                    e(this).css(o, s(this, t, !0, i) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(i) {
                return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), e.extend(e.ui, {
            plugin: {
                add: function(t, i, n) {
                    var s, a = e.ui[t].prototype;
                    for (s in n) a.plugins[s] = a.plugins[s] || [], a.plugins[s].push([i, n[s]])
                },
                call: function(e, t, i) {
                    var n, s = e.plugins[t];
                    if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                        for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i)
                }
            },
            hasScroll: function(t, i) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    s = !1;
                return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
            }
        })
    }(jQuery),
    function(e, t) {
        var i = 0,
            n = Array.prototype.slice,
            s = e.cleanData;
        e.cleanData = function(t) {
            for (var i, n = 0; null != (i = t[n]); n++) try {
                e(i).triggerHandler("remove")
            } catch (a) {}
            s(t)
        }, e.widget = function(i, n, s) {
            var a, o, r, l, c = {},
                d = i.split(".")[0];
            i = i.split(".")[1], a = d + "-" + i, s || (s = n, n = e.Widget), e.expr[":"][a.toLowerCase()] = function(t) {
                return !!e.data(t, a)
            }, e[d] = e[d] || {}, o = e[d][i], r = e[d][i] = function(e, i) {
                return this._createWidget ? (arguments.length && this._createWidget(e, i), t) : new r(e, i)
            }, e.extend(r, o, {
                version: s.version,
                _proto: e.extend({}, s),
                _childConstructors: []
            }), l = new n, l.options = e.widget.extend({}, l.options), e.each(s, function(i, s) {
                return e.isFunction(s) ? (c[i] = function() {
                    var e = function() {
                            return n.prototype[i].apply(this, arguments)
                        },
                        t = function(e) {
                            return n.prototype[i].apply(this, e)
                        };
                    return function() {
                        var i, n = this._super,
                            a = this._superApply;
                        return this._super = e, this._superApply = t, i = s.apply(this, arguments), this._super = n, this._superApply = a, i
                    }
                }(), t) : (c[i] = s, t)
            }), r.prototype = e.widget.extend(l, {
                widgetEventPrefix: o ? l.widgetEventPrefix || i : i
            }, c, {
                constructor: r,
                namespace: d,
                widgetName: i,
                widgetFullName: a
            }), o ? (e.each(o._childConstructors, function(t, i) {
                var n = i.prototype;
                e.widget(n.namespace + "." + n.widgetName, r, i._proto)
            }), delete o._childConstructors) : n._childConstructors.push(r), e.widget.bridge(i, r)
        }, e.widget.extend = function(i) {
            for (var s, a, o = n.call(arguments, 1), r = 0, l = o.length; l > r; r++)
                for (s in o[r]) a = o[r][s], o[r].hasOwnProperty(s) && a !== t && (i[s] = e.isPlainObject(a) ? e.isPlainObject(i[s]) ? e.widget.extend({}, i[s], a) : e.widget.extend({}, a) : a);
            return i
        }, e.widget.bridge = function(i, s) {
            var a = s.prototype.widgetFullName || i;
            e.fn[i] = function(o) {
                var r = "string" == typeof o,
                    l = n.call(arguments, 1),
                    c = this;
                return o = !r && l.length ? e.widget.extend.apply(null, [o].concat(l)) : o, this.each(r ? function() {
                    var n, s = e.data(this, a);
                    return s ? e.isFunction(s[o]) && "_" !== o.charAt(0) ? (n = s[o].apply(s, l), n !== s && n !== t ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : t) : e.error("no such method '" + o + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + o + "'")
                } : function() {
                    var t = e.data(this, a);
                    t ? t.option(o || {})._init() : e.data(this, a, new s(o, this))
                }), c
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, n) {
                n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === n && this.destroy()
                    }
                }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(i, n) {
                var s, a, o, r = i;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof i)
                    if (r = {}, s = i.split("."), i = s.shift(), s.length) {
                        for (a = r[i] = e.widget.extend({}, this.options[i]), o = 0; s.length - 1 > o; o++) a[s[o]] = a[s[o]] || {}, a = a[s[o]];
                        if (i = s.pop(), 1 === arguments.length) return a[i] === t ? null : a[i];
                        a[i] = n
                    } else {
                        if (1 === arguments.length) return this.options[i] === t ? null : this.options[i];
                        r[i] = n
                    }
                return this._setOptions(r), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(i, n, s) {
                var a, o = this;
                "boolean" != typeof i && (s = n, n = i, i = !1), s ? (n = a = e(n), this.bindings = this.bindings.add(n)) : (s = n, n = this.element, a = this.widget()), e.each(s, function(s, r) {
                    function l() {
                        return i || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : t
                    }
                    "string" != typeof r && (l.guid = r.guid = r.guid || l.guid || e.guid++);
                    var c = s.match(/^(\w+)\s*(.*)$/),
                        d = c[1] + o.eventNamespace,
                        h = c[2];
                    h ? a.delegate(h, d, l) : n.bind(d, l)
                })
            },
            _off: function(e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function(e, t) {
                function i() {
                    return ("string" == typeof e ? n[e] : e).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, i, n) {
                var s, a, o = this.options[t];
                if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                    for (s in a) s in i || (i[s] = a[s]);
                return this.element.trigger(i, n), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, i) {
            e.Widget.prototype["_" + t] = function(n, s, a) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var o, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : t;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), o = !e.isEmptyObject(s), s.complete = a, s.delay && n.delay(s.delay), o && e.effects && e.effects.effect[r] ? n[t](s) : r !== t && n[r] ? n[r](s.duration, s.easing, a) : n.queue(function(i) {
                    e(this)[t](), a && a.call(n[0]), i()
                })
            }
        })
    }(jQuery),
    function(e, t) {
        function i() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, e.extend(this._defaults, this.regional[""]), this.dpDiv = n(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function n(t) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t.delegate(i, "mouseout", function() {
                e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
            }).delegate(i, "mouseover", function() {
                e.datepicker._isDisabledDatepicker(a.inline ? t.parent()[0] : a.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function s(t, i) {
            e.extend(t, i);
            for (var n in i) null == i[n] && (t[n] = i[n]);
            return t
        }
        e.extend(e.ui, {
            datepicker: {
                version: "1.10.4"
            }
        });
        var a, o = "datepicker";
        e.extend(i.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(e) {
                return s(this._defaults, e || {}), this
            },
            _attachDatepicker: function(t, i) {
                var n, s, a;
                n = t.nodeName.toLowerCase(), s = "div" === n || "span" === n, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), a = this._newInst(e(t), s), a.settings = e.extend({}, i || {}), "input" === n ? this._connectDatepicker(t, a) : s && this._inlineDatepicker(t, a)
            },
            _newInst: function(t, i) {
                var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: s,
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? n(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(t, i) {
                var n = e(t);
                i.append = e([]), i.trigger = e([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, o, i), i.settings.disabled && this._disableDatepicker(t))
            },
            _attachments: function(t, i) {
                var n, s, a, o = this._get(i, "appendText"),
                    r = this._get(i, "isRTL");
                i.append && i.append.remove(), o && (i.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[r ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && t.focus(this._showDatepicker), ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
                    src: a,
                    alt: s,
                    title: s
                }) : e("<button type='button'></button>").addClass(this._triggerClass).html(a ? e("<img/>").attr({
                    src: a,
                    alt: s,
                    title: s
                }) : s)), t[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
                    return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
                }))
            },
            _autoSize: function(e) {
                if (this._get(e, "autoSize") && !e.inline) {
                    var t, i, n, s, a = new Date(2009, 11, 20),
                        o = this._get(e, "dateFormat");
                    o.match(/[DM]/) && (t = function(e) {
                        for (i = 0, n = 0, s = 0; e.length > s; s++) e[s].length > i && (i = e[s].length, n = s);
                        return n
                    }, a.setMonth(t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), e.input.attr("size", this._formatDate(e, a).length)
                }
            },
            _inlineDatepicker: function(t, i) {
                var n = e(t);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), e.data(t, o, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(t, i, n, a, r) {
                var l, c, d, h, u, p = this._dialogInst;
                return p || (this.uuid += 1, l = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + l + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, e.data(this._dialogInput[0], o, p)), s(p.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (c = document.documentElement.clientWidth, d = document.documentElement.clientHeight, h = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + h, d / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], o, p), this
            },
            _destroyDatepicker: function(t) {
                var i, n = e(t),
                    s = e.data(t, o);
                n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, o), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(t) {
                var i, n, s = e(t),
                    a = e.data(t, o);
                s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, a.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                    return e === t ? null : e
                }))
            },
            _disableDatepicker: function(t) {
                var i, n, s = e(t),
                    a = e.data(t, o);
                s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, a.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                    return e === t ? null : e
                }), this._disabledInputs[this._disabledInputs.length] = t)
            },
            _isDisabledDatepicker: function(e) {
                if (!e) return !1;
                for (var t = 0; this._disabledInputs.length > t; t++)
                    if (this._disabledInputs[t] === e) return !0;
                return !1
            },
            _getInst: function(t) {
                try {
                    return e.data(t, o)
                } catch (i) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(i, n, a) {
                var o, r, l, c, d = this._getInst(i);
                return 2 === arguments.length && "string" == typeof n ? "defaults" === n ? e.extend({}, e.datepicker._defaults) : d ? "all" === n ? e.extend({}, d.settings) : this._get(d, n) : null : (o = n || {}, "string" == typeof n && (o = {}, o[n] = a), d && (this._curInst === d && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), l = this._getMinMaxDate(d, "min"), c = this._getMinMaxDate(d, "max"), s(d.settings, o), null !== l && o.dateFormat !== t && o.minDate === t && (d.settings.minDate = this._formatDate(d, l)), null !== c && o.dateFormat !== t && o.maxDate === t && (d.settings.maxDate = this._formatDate(d, c)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(e(i), d), this._autoSize(d), this._setDate(d, r), this._updateAlternate(d), this._updateDatepicker(d)), t)
            },
            _changeDatepicker: function(e, t, i) {
                this._optionDatepicker(e, t, i)
            },
            _refreshDatepicker: function(e) {
                var t = this._getInst(e);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function(e, t) {
                var i = this._getInst(e);
                i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(e, t) {
                var i = this._getInst(e);
                return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
            },
            _doKeyDown: function(t) {
                var i, n, s, a = e.datepicker._getInst(t.target),
                    o = !0,
                    r = a.dpDiv.is(".ui-datepicker-rtl");
                if (a._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                    case 9:
                        e.datepicker._hideDatepicker(), o = !1;
                        break;
                    case 13:
                        return s = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", a.dpDiv), s[0] && e.datepicker._selectDay(t.target, a.selectedMonth, a.selectedYear, s[0]), i = e.datepicker._get(a, "onSelect"), i ? (n = e.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [n, a])) : e.datepicker._hideDatepicker(), !1;
                    case 27:
                        e.datepicker._hideDatepicker();
                        break;
                    case 33:
                        e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 34:
                        e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? 1 : -1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? -1 : 1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        o = !1
                } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : o = !1;
                o && (t.preventDefault(), t.stopPropagation())
            },
            _doKeyPress: function(i) {
                var n, s, a = e.datepicker._getInst(i.target);
                return e.datepicker._get(a, "constrainInput") ? (n = e.datepicker._possibleChars(e.datepicker._get(a, "dateFormat")), s = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > s || !n || n.indexOf(s) > -1) : t
            },
            _doKeyUp: function(t) {
                var i, n = e.datepicker._getInst(t.target);
                if (n.input.val() !== n.lastVal) try {
                    i = e.datepicker.parseDate(e.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, e.datepicker._getFormatConfig(n)), i && (e.datepicker._setDateFromField(n), e.datepicker._updateAlternate(n), e.datepicker._updateDatepicker(n))
                } catch (s) {}
                return !0
            },
            _showDatepicker: function(t) {
                if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                    var i, n, a, o, r, l, c;
                    i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), n = e.datepicker._get(i, "beforeShow"), a = n ? n.apply(t, [t, i]) : {}, a !== !1 && (s(i.settings, a), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function() {
                        return o |= "fixed" === e(this).css("position"), !o
                    }), r = {
                        left: e.datepicker._pos[0],
                        top: e.datepicker._pos[1]
                    }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), e.datepicker._updateDatepicker(i), r = e.datepicker._checkOffset(i, r, o), i.dpDiv.css({
                        position: e.datepicker._inDialog && e.blockUI ? "static" : o ? "fixed" : "absolute",
                        display: "none",
                        left: r.left + "px",
                        top: r.top + "px"
                    }), i.inline || (l = e.datepicker._get(i, "showAnim"), c = e.datepicker._get(i, "duration"), i.dpDiv.zIndex(e(t).zIndex() + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[l] ? i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), c) : i.dpDiv[l || "show"](l ? c : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(t) {
                this.maxRows = 4, a = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i, n = this._getNumberOfMonths(t),
                    s = n[1],
                    o = 17;
                t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), t.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                    t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() {
                        i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null
                    }, 0))
            },
            _shouldFocusInput: function(e) {
                return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
            },
            _checkOffset: function(t, i, n) {
                var s = t.dpDiv.outerWidth(),
                    a = t.dpDiv.outerHeight(),
                    o = t.input ? t.input.outerWidth() : 0,
                    r = t.input ? t.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (n ? 0 : e(document).scrollLeft()),
                    c = document.documentElement.clientHeight + (n ? 0 : e(document).scrollTop());
                return i.left -= this._get(t, "isRTL") ? s - o : 0, i.left -= n && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= n && i.top === t.input.offset().top + r ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + a > c && c > a ? Math.abs(a + r) : 0), i
            },
            _findPos: function(t) {
                for (var i, n = this._getInst(t), s = this._get(n, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[s ? "previousSibling" : "nextSibling"];
                return i = e(t).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(t) {
                var i, n, s, a, r = this._curInst;
                !r || t && r !== e.data(t, o) || this._datepickerShowing && (i = this._get(r, "showAnim"), n = this._get(r, "duration"), s = function() {
                    e.datepicker._tidyDialog(r)
                }, e.effects && (e.effects.effect[i] || e.effects[i]) ? r.dpDiv.hide(i, e.datepicker._get(r, "showOptions"), n, s) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, a = this._get(r, "onClose"), a && a.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(e) {
                e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(t) {
                if (e.datepicker._curInst) {
                    var i = e(t.target),
                        n = e.datepicker._getInst(i[0]);
                    (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== n) && e.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(t, i, n) {
                var s = e(t),
                    a = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(a, i + ("M" === n ? this._get(a, "showCurrentAtPos") : 0), n), this._updateDatepicker(a))
            },
            _gotoToday: function(t) {
                var i, n = e(t),
                    s = this._getInst(n[0]);
                this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
            },
            _selectMonthYear: function(t, i, n) {
                var s = e(t),
                    a = this._getInst(s[0]);
                a["selected" + ("M" === n ? "Month" : "Year")] = a["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(s)
            },
            _selectDay: function(t, i, n, s) {
                var a, o = e(t);
                e(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = e("a", s).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = n, this._selectDate(t, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
            },
            _clearDate: function(t) {
                var i = e(t);
                this._selectDate(i, "")
            },
            _selectDate: function(t, i) {
                var n, s = e(t),
                    a = this._getInst(s[0]);
                i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), n = this._get(a, "onSelect"), n ? n.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(t) {
                var i, n, s, a = this._get(t, "altField");
                a && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), n = this._getDate(t), s = this.formatDate(i, n, this._getFormatConfig(t)), e(a).each(function() {
                    e(this).val(s)
                }))
            },
            noWeekends: function(e) {
                var t = e.getDay();
                return [t > 0 && 6 > t, ""]
            },
            iso8601Week: function(e) {
                var t, i = new Date(e.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1
            },
            parseDate: function(i, n, s) {
                if (null == i || null == n) throw "Invalid arguments";
                if (n = "object" == typeof n ? "" + n : n + "", "" === n) return null;
                var a, o, r, l, c = 0,
                    d = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    h = "string" != typeof d ? d : (new Date).getFullYear() % 100 + parseInt(d, 10),
                    u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                    p = (s ? s.dayNames : null) || this._defaults.dayNames,
                    f = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                    m = (s ? s.monthNames : null) || this._defaults.monthNames,
                    g = -1,
                    v = -1,
                    y = -1,
                    b = -1,
                    w = !1,
                    k = function(e) {
                        var t = i.length > a + 1 && i.charAt(a + 1) === e;
                        return t && a++, t
                    },
                    C = function(e) {
                        var t = k(e),
                            i = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                            s = RegExp("^\\d{1," + i + "}"),
                            a = n.substring(c).match(s);
                        if (!a) throw "Missing number at position " + c;
                        return c += a[0].length, parseInt(a[0], 10)
                    },
                    j = function(i, s, a) {
                        var o = -1,
                            r = e.map(k(i) ? a : s, function(e, t) {
                                return [
                                    [t, e]
                                ]
                            }).sort(function(e, t) {
                                return -(e[1].length - t[1].length)
                            });
                        if (e.each(r, function(e, i) {
                                var s = i[1];
                                return n.substr(c, s.length).toLowerCase() === s.toLowerCase() ? (o = i[0], c += s.length, !1) : t
                            }), -1 !== o) return o + 1;
                        throw "Unknown name at position " + c
                    },
                    S = function() {
                        if (n.charAt(c) !== i.charAt(a)) throw "Unexpected literal at position " + c;
                        c++
                    };
                for (a = 0; i.length > a; a++)
                    if (w) "'" !== i.charAt(a) || k("'") ? S() : w = !1;
                    else switch (i.charAt(a)) {
                        case "d":
                            y = C("d");
                            break;
                        case "D":
                            j("D", u, p);
                            break;
                        case "o":
                            b = C("o");
                            break;
                        case "m":
                            v = C("m");
                            break;
                        case "M":
                            v = j("M", f, m);
                            break;
                        case "y":
                            g = C("y");
                            break;
                        case "@":
                            l = new Date(C("@")), g = l.getFullYear(), v = l.getMonth() + 1, y = l.getDate();
                            break;
                        case "!":
                            l = new Date((C("!") - this._ticksTo1970) / 1e4), g = l.getFullYear(), v = l.getMonth() + 1, y = l.getDate();
                            break;
                        case "'":
                            k("'") ? S() : w = !0;
                            break;
                        default:
                            S()
                    }
                    if (n.length > c && (r = n.substr(c), !/^\s+/.test(r))) throw "Extra/unparsed characters found in date: " + r;
                if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h >= g ? 0 : -100)), b > -1)
                    for (v = 1, y = b; o = this._getDaysInMonth(g, v - 1), !(o >= y);) v++, y -= o;
                if (l = this._daylightSavingAdjust(new Date(g, v - 1, y)), l.getFullYear() !== g || l.getMonth() + 1 !== v || l.getDate() !== y) throw "Invalid date";
                return l
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
            formatDate: function(e, t, i) {
                if (!t) return "";
                var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    a = (i ? i.dayNames : null) || this._defaults.dayNames,
                    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    r = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(t) {
                        var i = e.length > n + 1 && e.charAt(n + 1) === t;
                        return i && n++, i
                    },
                    c = function(e, t, i) {
                        var n = "" + t;
                        if (l(e))
                            for (; i > n.length;) n = "0" + n;
                        return n
                    },
                    d = function(e, t, i, n) {
                        return l(e) ? n[t] : i[t]
                    },
                    h = "",
                    u = !1;
                if (t)
                    for (n = 0; e.length > n; n++)
                        if (u) "'" !== e.charAt(n) || l("'") ? h += e.charAt(n) : u = !1;
                        else switch (e.charAt(n)) {
                            case "d":
                                h += c("d", t.getDate(), 2);
                                break;
                            case "D":
                                h += d("D", t.getDay(), s, a);
                                break;
                            case "o":
                                h += c("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                h += c("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                h += d("M", t.getMonth(), o, r);
                                break;
                            case "y":
                                h += l("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                                break;
                            case "@":
                                h += t.getTime();
                                break;
                            case "!":
                                h += 1e4 * t.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? h += "'" : u = !0;
                                break;
                            default:
                                h += e.charAt(n)
                        }
                        return h
            },
            _possibleChars: function(e) {
                var t, i = "",
                    n = !1,
                    s = function(i) {
                        var n = e.length > t + 1 && e.charAt(t + 1) === i;
                        return n && t++, n
                    };
                for (t = 0; e.length > t; t++)
                    if (n) "'" !== e.charAt(t) || s("'") ? i += e.charAt(t) : n = !1;
                    else switch (e.charAt(t)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            s("'") ? i += "'" : n = !0;
                            break;
                        default:
                            i += e.charAt(t)
                    }
                    return i
            },
            _get: function(e, i) {
                return e.settings[i] !== t ? e.settings[i] : this._defaults[i]
            },
            _setDateFromField: function(e, t) {
                if (e.input.val() !== e.lastVal) {
                    var i = this._get(e, "dateFormat"),
                        n = e.lastVal = e.input ? e.input.val() : null,
                        s = this._getDefaultDate(e),
                        a = s,
                        o = this._getFormatConfig(e);
                    try {
                        a = this.parseDate(i, n, o) || s
                    } catch (r) {
                        n = t ? "" : n
                    }
                    e.selectedDay = a.getDate(), e.drawMonth = e.selectedMonth = a.getMonth(), e.drawYear = e.selectedYear = a.getFullYear(), e.currentDay = n ? a.getDate() : 0, e.currentMonth = n ? a.getMonth() : 0, e.currentYear = n ? a.getFullYear() : 0, this._adjustInstDate(e)
                }
            },
            _getDefaultDate: function(e) {
                return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
            },
            _determineDate: function(t, i, n) {
                var s = function(e) {
                        var t = new Date;
                        return t.setDate(t.getDate() + e), t
                    },
                    a = function(i) {
                        try {
                            return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
                        } catch (n) {}
                        for (var s = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, a = s.getFullYear(), o = s.getMonth(), r = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = l.exec(i); c;) {
                            switch (c[2] || "d") {
                                case "d":
                                case "D":
                                    r += parseInt(c[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    r += 7 * parseInt(c[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    o += parseInt(c[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));
                                    break;
                                case "y":
                                case "Y":
                                    a += parseInt(c[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o))
                            }
                            c = l.exec(i)
                        }
                        return new Date(a, o, r)
                    },
                    o = null == i || "" === i ? n : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? n : s(i) : new Date(i.getTime());
                return o = o && "Invalid Date" == "" + o ? n : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
            },
            _daylightSavingAdjust: function(e) {
                return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
            },
            _setDate: function(e, t, i) {
                var n = !t,
                    s = e.selectedMonth,
                    a = e.selectedYear,
                    o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
                e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), s === e.selectedMonth && a === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(n ? "" : this._formatDate(e))
            },
            _getDate: function(e) {
                var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return t
            },
            _attachHandlers: function(t) {
                var i = this._get(t, "stepMonths"),
                    n = "#" + t.id.replace(/\\\\/g, "\\");
                t.dpDiv.find("[data-handler]").map(function() {
                    var t = {
                        prev: function() {
                            e.datepicker._adjustDate(n, -i, "M")
                        },
                        next: function() {
                            e.datepicker._adjustDate(n, +i, "M")
                        },
                        hide: function() {
                            e.datepicker._hideDatepicker()
                        },
                        today: function() {
                            e.datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return e.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return e.datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function() {
                            return e.datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(e) {
                var t, i, n, s, a, o, r, l, c, d, h, u, p, f, m, g, v, y, b, w, k, C, j, S, x, T, D, E, M, _, P, I, A, F, N, O, H, L, B, R = new Date,
                    z = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                    W = this._get(e, "isRTL"),
                    Q = this._get(e, "showButtonPanel"),
                    V = this._get(e, "hideIfNoPrevNext"),
                    q = this._get(e, "navigationAsDateFormat"),
                    Y = this._getNumberOfMonths(e),
                    U = this._get(e, "showCurrentAtPos"),
                    $ = this._get(e, "stepMonths"),
                    K = 1 !== Y[0] || 1 !== Y[1],
                    X = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                    G = this._getMinMaxDate(e, "min"),
                    Z = this._getMinMaxDate(e, "max"),
                    J = e.drawMonth - U,
                    ee = e.drawYear;
                if (0 > J && (J += 12, ee--), Z)
                    for (t = this._daylightSavingAdjust(new Date(Z.getFullYear(), Z.getMonth() - Y[0] * Y[1] + 1, Z.getDate())), t = G && G > t ? G : t; this._daylightSavingAdjust(new Date(ee, J, 1)) > t;) J--, 0 > J && (J = 11, ee--);
                for (e.drawMonth = J, e.drawYear = ee, i = this._get(e, "prevText"), i = q ? this.formatDate(i, this._daylightSavingAdjust(new Date(ee, J - $, 1)), this._getFormatConfig(e)) : i, n = this._canAdjustMonth(e, -1, ee, J) ? "<a class='ui-datepicker-prev ui-corner-all' tabindex='0' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>" : V ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(e, "nextText"), s = q ? this.formatDate(s, this._daylightSavingAdjust(new Date(ee, J + $, 1)), this._getFormatConfig(e)) : s, a = this._canAdjustMonth(e, 1, ee, J) ? "<a class='ui-datepicker-next ui-corner-all' tabindex='0' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + s + "</span></a>" : V ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + s + "</span></a>", o = this._get(e, "currentText"), r = this._get(e, "gotoCurrent") && e.currentDay ? X : z, o = q ? this.formatDate(o, r, this._getFormatConfig(e)) : o, l = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", c = Q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (W ? l : "") + (this._isInRange(e, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (W ? "" : l) + "</div>" : "", d = parseInt(this._get(e, "firstDay"), 10), d = isNaN(d) ? 0 : d, h = this._get(e, "showWeek"), u = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), w = "", C = 0; Y[0] > C; C++) {
                    for (j = "", this.maxRows = 4, S = 0; Y[1] > S; S++) {
                        if (x = this._daylightSavingAdjust(new Date(ee, J, e.selectedDay)), T = " ui-corner-all", D = "", K) {
                            if (D += "<div class='ui-datepicker-group", Y[1] > 1) switch (S) {
                                case 0:
                                    D += " ui-datepicker-group-first", T = " ui-corner-" + (W ? "right" : "left");
                                    break;
                                case Y[1] - 1:
                                    D += " ui-datepicker-group-last", T = " ui-corner-" + (W ? "left" : "right");
                                    break;
                                default:
                                    D += " ui-datepicker-group-middle", T = ""
                            }
                            D += "'>"
                        }
                        for (D += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === C ? W ? a : n : "") + (/all|right/.test(T) && 0 === C ? W ? n : a : "") + this._generateMonthYearHeader(e, J, ee, G, Z, C > 0 || S > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", E = h ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", k = 0; 7 > k; k++) M = (k + d) % 7, E += "<th" + ((k + d + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + u[M] + "'>" + p[M] + "</span></th>";
                        for (D += E + "</tr></thead><tbody>", _ = this._getDaysInMonth(ee, J), ee === e.selectedYear && J === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, _)), P = (this._getFirstDayOfMonth(ee, J) - d + 7) % 7, I = Math.ceil((P + _) / 7), A = K && this.maxRows > I ? this.maxRows : I, this.maxRows = A, F = this._daylightSavingAdjust(new Date(ee, J, 1 - P)), N = 0; A > N; N++) {
                            for (D += "<tr>", O = h ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(F) + "</td>" : "", k = 0; 7 > k; k++) H = g ? g.apply(e.input ? e.input[0] : null, [F]) : [!0, ""], L = F.getMonth() !== J, B = L && !y || !H[0] || G && G > F || Z && F > Z, O += "<td class='" + ((k + d + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + (F.getTime() === x.getTime() && J === e.selectedMonth && e._keyEvent || b.getTime() === F.getTime() && b.getTime() === x.getTime() ? " " + this._dayOverClass : "") + (B ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !v ? "" : " " + H[1] + (F.getTime() === X.getTime() ? " " + this._currentClass : "") + (F.getTime() === z.getTime() ? " ui-datepicker-today" : "")) + "'" + (L && !v || !H[2] ? "" : " title='" + H[2].replace(/'/g, "&#39;") + "'") + (B ? "" : " data-handler='selectDay' data-event='click' data-month='" + F.getMonth() + "' data-year='" + F.getFullYear() + "'") + ">" + (L && !v ? "&#xa0;" : B ? "<span class='ui-state-default'>" + (F.getDate() < 10 && jQuery(".calendar").length ? "0" + F.getDate() : F.getDate()) + "</span>" : "<a class='ui-state-default" + (F.getTime() === z.getTime() ? " ui-state-highlight" : "") + (F.getTime() === X.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + (F.getDate() < 10 && jQuery(".calendar").length ? "0" + F.getDate() : F.getDate()) + "</a>") + "</td>", F.setDate(F.getDate() + 1), F = this._daylightSavingAdjust(F);
                            D += O + "</tr>"
                        }
                        J++, J > 11 && (J = 0, ee++), D += "</tbody></table>" + (K ? "</div>" + (Y[0] > 0 && S === Y[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), j += D
                    }
                    w += j
                }
                return w += c, e._keyEvent = !1, w
            },
            _generateMonthYearHeader: function(e, t, i, n, s, a, o, r) {
                var l, c, d, h, u, p, f, m, g = this._get(e, "changeMonth"),
                    v = this._get(e, "changeYear"),
                    y = this._get(e, "showMonthAfterYear"),
                    b = "<div class='ui-datepicker-title'>",
                    w = "";
                if (a || !g) w += "<span class='ui-datepicker-month'>" + o[t] + "</span>";
                else {
                    for (l = n && n.getFullYear() === i, c = s && s.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", d = 0; 12 > d; d++)(!l || d >= n.getMonth()) && (!c || s.getMonth() >= d) && (w += "<option value='" + d + "'" + (d === t ? " selected='selected'" : "") + ">" + r[d] + "</option>");
                    w += "</select>"
                }
                if (y || (b += w + (!a && g && v ? "" : "&#xa0;")), !e.yearshtml)
                    if (e.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (h = this._get(e, "yearRange").split(":"), u = (new Date).getFullYear(), p = function(e) {
                                var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? u + parseInt(e, 10) : parseInt(e, 10);
                                return isNaN(t) ? u : t
                            }, f = p(h[0]), m = Math.max(f, p(h[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = s ? Math.min(m, s.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null
                    }
                return b += this._get(e, "yearSuffix"), y && (b += (!a && g && v ? "" : "&#xa0;") + w), b += "</div>"
            },
            _adjustInstDate: function(e, t, i) {
                var n = e.drawYear + ("Y" === i ? t : 0),
                    s = e.drawMonth + ("M" === i ? t : 0),
                    a = Math.min(e.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? t : 0),
                    o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(n, s, a)));
                e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
            },
            _restrictMinMax: function(e, t) {
                var i = this._getMinMaxDate(e, "min"),
                    n = this._getMinMaxDate(e, "max"),
                    s = i && i > t ? i : t;
                return n && s > n ? n : s
            },
            _notifyChange: function(e) {
                var t = this._get(e, "onChangeMonthYear");
                t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
            },
            _getNumberOfMonths: function(e) {
                var t = this._get(e, "numberOfMonths");
                return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
            },
            _getMinMaxDate: function(e, t) {
                return this._determineDate(e, this._get(e, t + "Date"), null)
            },
            _getDaysInMonth: function(e, t) {
                return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
            },
            _getFirstDayOfMonth: function(e, t) {
                return new Date(e, t, 1).getDay()
            },
            _canAdjustMonth: function(e, t, i, n) {
                var s = this._getNumberOfMonths(e),
                    a = this._daylightSavingAdjust(new Date(i, n + (0 > t ? t : s[0] * s[1]), 1));
                return 0 > t && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(e, a)
            },
            _isInRange: function(e, t) {
                var i, n, s = this._getMinMaxDate(e, "min"),
                    a = this._getMinMaxDate(e, "max"),
                    o = null,
                    r = null,
                    l = this._get(e, "yearRange");
                return l && (i = l.split(":"), n = (new Date).getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += n), i[1].match(/[+\-].*/) && (r += n)), (!s || t.getTime() >= s.getTime()) && (!a || t.getTime() <= a.getTime()) && (!o || t.getFullYear() >= o) && (!r || r >= t.getFullYear())
            },
            _getFormatConfig: function(e) {
                var t = this._get(e, "shortYearCutoff");
                return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(e, "dayNamesShort"),
                    dayNames: this._get(e, "dayNames"),
                    monthNamesShort: this._get(e, "monthNamesShort"),
                    monthNames: this._get(e, "monthNames")
                }
            },
            _formatDate: function(e, t, i, n) {
                t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
                var s = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(n, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return this.formatDate(this._get(e, "dateFormat"), s, this._getFormatConfig(e))
            }
        }), e.fn.datepicker = function(t) {
            if (!this.length) return this;
            e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
            }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
        }, e.datepicker = new i, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.10.4"
    }(jQuery),
    function(e) {
        var t = e.proxy || function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        e.widget("ui.xmldatepicker", {
            options: {
                loadingClass: "ajax-loading",
                eventClass: "event-active",
                noeventClass: "no-event",
                dateFormat: "mm/dd/yy",
                startDate: "today",
                sourceURL: !1,
                xmlNodeName: "event",
                xmlNodeDate: "date",
                delay: 300
            },
            _create: function() {
                e.ui.datepicker && this.options.sourceURL && (this.element.datepicker({
                    showOtherMonths: !0,
                    defaultDate: this.options.startDate,
                    dateFormat: this.options.dateFormat,
                    onChangeMonthYear: t(this._loadEvents, this),
                    beforeShowDay: t(this._getDayState, this),
                    beforeShow: this.options.beforeShow,
                    onSelect: t(this._onSelectDay, this)
                }), this.switchToDate(this.options.startDate instanceof Date ? this.options.startDate : new Date))
            },
            _setOption: function(t, i) {
                e.Widget.prototype._setOption.apply(this, arguments)
            },
            destroy: function() {
                e.ui.datepicker && (this.curDates = null, this.element.datepicker("destroy"))
            },
            _loadEvents: function(i, n) {
                var s, a, o;
                this.element.addClass(this.options.loadingClass), e.ajax({
                    type: "get",
                    url: this.options.sourceURL,
                    dataType: e.parseXML || e.browser.msie && e.browser.version < 9 ? "text" : "xml",
                    data: "y=" + i + "&m=" + n + "&hash=" + Math.random(),
                    success: t(function(t) {
                        s = e.parseXML ? e.parseXML(t) : t, "string" == typeof s && (s = new ActiveXObject("Microsoft.XMLDOM"), s.async = !0, s.loadXML(t)), o ? this._ajaxDataReceived(s) : a = !0
                    }, this),
                    error: t(function(e, t) {
                        this.element.removeClass(this.options.loadingClass), this.options.onAjaxError ? this._trigger("onAjaxError", null, {
                            xhr: e,
                            message: t
                        }) : alert("AJAX Error: " + t)
                    }, this)
                }), setTimeout(t(function() {
                    o = !0, a && this._ajaxDataReceived(s)
                }, this), this.options.delay)
            },
            _ajaxDataReceived: function(e) {
                this.parseData(e), this.element.removeClass(this.options.loadingClass), this.element.datepicker("refresh"), this._onReadyMonth()
            },
            _onReadyMonth: function() {
                setTimeout(t(function() {
                    this._trigger("onRefreshMonth", null, {
                        ui: this
                    })
                }, this), 10)
            },
            _getDayState: function(t) {
                var i = this.options.dateFormat.replace(/\//g, "-"),
                    n = e.datepicker.formatDate(this.options.dateFormat, t),
                    s = " date-" + e.datepicker.formatDate(i, t);
                return this.getEventByDate(n) ? [!0, this.options.eventClass + s] : [!1, this.options.noeventClass + s]
            },
            _onSelectDay: function(e) {
                return this._trigger("onSelectDay", null, {
                    ui: this,
                    selectedDate: e
                }), this._onReadyMonth(), !1
            },
            parseData: function(i) {
                this.curDates = [], e(this.options.xmlNodeName, i).each(t(function(t, i) {
                    var n, s = e(i),
                        a = {
                            date: s.find(this.options.xmlNodeDate).text()
                        };
                    "function" == typeof this.options.parseElement && (n = this.options.parseElement(s)), this.curDates.push(e.extend(a, n))
                }, this))
            },
            switchToDate: function(e) {
                this.element.datepicker("setDate", e), this._loadEvents(e.getFullYear(), e.getMonth())
            },
            getEventByDate: function(e) {
                if (this.curDates)
                    for (var t = 0; t < this.curDates.length; t++)
                        if (this.curDates[t].date == e) return this.curDates[t];
                return !1
            }
        })
    }(jQuery),
    function() {
        function e(e) {
            for (var t = [], i = 0, n = t.length = e.length; n > i; i++) t[i] = e[i];
            return t
        }

        function t(e) {
            return (e.type ? e.type : e.tagName).toLowerCase()
        }

        function i(e, t) {
            return e.className ? e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) : !1
        }

        function n(e, t) {
            i(e, t) || (e.className += " " + t)
        }

        function s(e, t) {
            i(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " "))
        }

        function a(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }

        function o(e, t) {
            return document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(e, null)[t] : e.currentStyle ? e.currentStyle[t] : e.style[t]
        }
        var r = [];
        PlaceholderInput = function() {
            this.options = {
                element: null,
                showUntilTyping: !1,
                wrapWithElement: !1,
                getParentByClass: !1,
                showPasswordBullets: !1,
                placeholderAttr: "value",
                inputFocusClass: "focus",
                inputActiveClass: "text-active",
                parentFocusClass: "parent-focus",
                parentActiveClass: "parent-active",
                labelFocusClass: "label-focus",
                labelActiveClass: "label-active",
                fakeElementClass: "input-placeholder-text"
            }, r.push(this), this.init.apply(this, arguments)
        }, PlaceholderInput.refreshAllInputs = function(e) {
            for (var t = 0; t < r.length; t++) e !== r[t] && r[t].refreshState()
        }, PlaceholderInput.replaceByOptions = function(i) {
            for (var n = [].concat(e(document.getElementsByTagName("input")), e(document.getElementsByTagName("textarea"))), s = 0; s < n.length; s++)
                if (n[s].className.indexOf(i.skipClass) < 0) {
                    var a = t(n[s]),
                        o = n[s].getAttribute("placeholder");
                    (i.focusOnly || i.clearInputs && ("search" === a || "text" === a || "email" === a || o) || i.clearTextareas && "textarea" === a || i.clearPasswords && "password" === a) && new PlaceholderInput({
                        element: n[s],
                        focusOnly: i.focusOnly,
                        wrapWithElement: i.wrapWithElement,
                        showUntilTyping: i.showUntilTyping,
                        getParentByClass: i.getParentByClass,
                        showPasswordBullets: i.showPasswordBullets,
                        placeholderAttr: o ? "placeholder" : i.placeholderAttr
                    })
                }
        }, PlaceholderInput.prototype = {
            init: function(e) {
                this.setOptions(e), this.element && this.element.PlaceholderInst ? this.element.PlaceholderInst.refreshClasses() : (this.element.PlaceholderInst = this, ("radio" !== this.elementType || "checkbox" !== this.elementType || "file" !== this.elementType) && (this.initElements(), this.attachEvents(), this.refreshClasses()))
            },
            setOptions: function(e) {
                for (var i in e) e.hasOwnProperty(i) && (this.options[i] = e[i]);
                this.options.element && (this.element = this.options.element, this.elementType = t(this.element), this.options.focusOnly ? this.wrapWithElement = !1 : "password" === this.elementType && this.options.showPasswordBullets && !this.options.showUntilTyping ? this.wrapWithElement = !1 : this.wrapWithElement = "password" === this.elementType || this.options.showUntilTyping ? !0 : this.options.wrapWithElement, this.setPlaceholderValue(this.options.placeholderAttr))
            },
            setPlaceholderValue: function(e) {
                this.origValue = "value" === e ? this.element.defaultValue : this.element.getAttribute(e) || "", "value" !== this.options.placeholderAttr && (this.element.setAttribute("data-placeholder", this.element.getAttribute(e)), this.element.removeAttribute(this.options.placeholderAttr))
            },
            initElements: function() {
                if (this.wrapWithElement ? (this.fakeElement = document.createElement("span"), this.fakeElement.className = this.options.fakeElementClass, this.fakeElement.innerHTML += this.origValue, this.fakeElement.style.color = o(this.element, "color"), this.fakeElement.style.position = "absolute", this.element.parentNode.insertBefore(this.fakeElement, this.element), this.element.value !== this.origValue && this.element.value ? this.togglePlaceholderText(!1) : (this.element.value = "", this.togglePlaceholderText(!0))) : !this.element.value && this.origValue.length && (this.element.value = this.origValue), this.element.id) {
                    this.labels = document.getElementsByTagName("label");
                    for (var e = 0; e < this.labels.length; e++)
                        if (this.labels[e].htmlFor === this.element.id) {
                            this.labelFor = this.labels[e];
                            break
                        }
                }
                if (this.elementParent = this.element.parentNode, "string" == typeof this.options.getParentByClass)
                    for (var t = this.element; t.parentNode;) {
                        if (i(t.parentNode, this.options.getParentByClass)) {
                            this.elementParent = t.parentNode;
                            break
                        }
                        t = t.parentNode
                    }
            },
            attachEvents: function() {
                this.element.onfocus = a(this.focusHandler, this), this.element.onblur = a(this.blurHandler, this), this.options.showUntilTyping && (this.element.onkeydown = a(this.typingHandler, this), this.element.onpaste = a(this.typingHandler, this)), this.wrapWithElement && (this.fakeElement.onclick = a(this.focusSetter, this))
            },
            togglePlaceholderText: function(e) {
                this.element.readOnly || this.options.focusOnly || (this.wrapWithElement ? this.fakeElement.style.display = e ? "" : "none" : this.element.value = e ? this.origValue : "")
            },
            focusSetter: function() {
                this.element.focus()
            },
            focusHandler: function() {
                clearInterval(this.checkerInterval), this.checkerInterval = setInterval(a(this.intervalHandler, this), 1), this.focused = !0, this.element.value.length && this.element.value !== this.origValue || this.options.showUntilTyping || this.togglePlaceholderText(!1), this.refreshClasses()
            },
            blurHandler: function() {
                clearInterval(this.checkerInterval), this.focused = !1, this.element.value.length && this.element.value !== this.origValue || this.togglePlaceholderText(!0), this.refreshClasses(), PlaceholderInput.refreshAllInputs(this)
            },
            typingHandler: function() {
                setTimeout(a(function() {
                    this.element.value.length && (this.togglePlaceholderText(!1), this.refreshClasses())
                }, this), 10)
            },
            intervalHandler: function() {
                "undefined" == typeof this.tmpValue && (this.tmpValue = this.element.value), this.tmpValue != this.element.value && PlaceholderInput.refreshAllInputs(this)
            },
            refreshState: function() {
                this.wrapWithElement && (this.element.value.length && this.element.value !== this.origValue ? this.togglePlaceholderText(!1) : this.element.value.length || this.togglePlaceholderText(!0)), this.refreshClasses()
            },
            refreshClasses: function() {
                this.textActive = this.focused || this.element.value.length && this.element.value !== this.origValue, this.setStateClass(this.element, this.options.inputFocusClass, this.focused), this.setStateClass(this.elementParent, this.options.parentFocusClass, this.focused), this.setStateClass(this.labelFor, this.options.labelFocusClass, this.focused), this.setStateClass(this.element, this.options.inputActiveClass, this.textActive), this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive), this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive)
            },
            setStateClass: function(e, t, i) {
                e && (i ? n(e, t) : s(e, t))
            }
        }
    }(), Object.create && ! function(e, t, i, n) {
        "use strict";

        function s(e, t, i) {
            return setTimeout(d(e, i), t)
        }

        function a(e, t, i) {
            return Array.isArray(e) ? (o(e, i[t], i), !0) : !1
        }

        function o(e, t, i) {
            var s;
            if (e)
                if (e.forEach) e.forEach(t, i);
                else if (e.length !== n)
                for (s = 0; s < e.length;) t.call(i, e[s], s, e), s++;
            else
                for (s in e) e.hasOwnProperty(s) && t.call(i, e[s], s, e)
        }

        function r(e, t, i) {
            for (var s = Object.keys(t), a = 0; a < s.length;)(!i || i && e[s[a]] === n) && (e[s[a]] = t[s[a]]), a++;
            return e
        }

        function l(e, t) {
            return r(e, t, !0)
        }

        function c(e, t, i) {
            var n, s = t.prototype;
            n = e.prototype = Object.create(s), n.constructor = e, n._super = s, i && r(n, i)
        }

        function d(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }

        function h(e, t) {
            return typeof e == de ? e.apply(t ? t[0] || n : n, t) : e
        }

        function u(e, t) {
            return e === n ? t : e
        }

        function p(e, t, i) {
            o(v(t), function(t) {
                e.addEventListener(t, i, !1)
            })
        }

        function f(e, t, i) {
            o(v(t), function(t) {
                e.removeEventListener(t, i, !1)
            })
        }

        function m(e, t) {
            for (; e;) {
                if (e == t) return !0;
                e = e.parentNode
            }
            return !1
        }

        function g(e, t) {
            return e.indexOf(t) > -1
        }

        function v(e) {
            return e.trim().split(/\s+/g)
        }

        function y(e, t, i) {
            if (e.indexOf && !i) return e.indexOf(t);
            for (var n = 0; n < e.length;) {
                if (i && e[n][i] == t || !i && e[n] === t) return n;
                n++
            }
            return -1
        }

        function b(e) {
            return Array.prototype.slice.call(e, 0)
        }

        function w(e, t, i) {
            for (var n = [], s = [], a = 0; a < e.length;) {
                var o = t ? e[a][t] : e[a];
                y(s, o) < 0 && n.push(e[a]), s[a] = o, a++
            }
            return i && (n = t ? n.sort(function(e, i) {
                return e[t] > i[t]
            }) : n.sort()), n
        }

        function k(e, t) {
            for (var i, s, a = t[0].toUpperCase() + t.slice(1), o = 0; o < le.length;) {
                if (i = le[o], s = i ? i + a : t, s in e) return s;
                o++
            }
            return n
        }

        function C() {
            return fe++
        }

        function j(e) {
            var t = e.ownerDocument;
            return t.defaultView || t.parentWindow;

        }

        function S(e, t) {
            var i = this;
            this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
                h(e.options.enable, [e]) && i.handler(t)
            }, this.init()
        }

        function x(e) {
            var t, i = e.options.inputClass;
            return new(t = i ? i : ve ? B : ye ? W : ge ? V : L)(e, T)
        }

        function T(e, t, i) {
            var n = i.pointers.length,
                s = i.changedPointers.length,
                a = t & Se && n - s === 0,
                o = t & (Te | De) && n - s === 0;
            i.isFirst = !!a, i.isFinal = !!o, a && (e.session = {}), i.eventType = t, D(e, i), e.emit("hammer.input", i), e.recognize(i), e.session.prevInput = i
        }

        function D(e, t) {
            var i = e.session,
                n = t.pointers,
                s = n.length;
            i.firstInput || (i.firstInput = _(t)), s > 1 && !i.firstMultiple ? i.firstMultiple = _(t) : 1 === s && (i.firstMultiple = !1);
            var a = i.firstInput,
                o = i.firstMultiple,
                r = o ? o.center : a.center,
                l = t.center = P(n);
            t.timeStamp = pe(), t.deltaTime = t.timeStamp - a.timeStamp, t.angle = N(r, l), t.distance = F(r, l), E(i, t), t.offsetDirection = A(t.deltaX, t.deltaY), t.scale = o ? H(o.pointers, n) : 1, t.rotation = o ? O(o.pointers, n) : 0, M(i, t);
            var c = e.element;
            m(t.srcEvent.target, c) && (c = t.srcEvent.target), t.target = c
        }

        function E(e, t) {
            var i = t.center,
                n = e.offsetDelta || {},
                s = e.prevDelta || {},
                a = e.prevInput || {};
            (t.eventType === Se || a.eventType === Te) && (s = e.prevDelta = {
                x: a.deltaX || 0,
                y: a.deltaY || 0
            }, n = e.offsetDelta = {
                x: i.x,
                y: i.y
            }), t.deltaX = s.x + (i.x - n.x), t.deltaY = s.y + (i.y - n.y)
        }

        function M(e, t) {
            var i, s, a, o, r = e.lastInterval || t,
                l = t.timeStamp - r.timeStamp;
            if (t.eventType != De && (l > je || r.velocity === n)) {
                var c = r.deltaX - t.deltaX,
                    d = r.deltaY - t.deltaY,
                    h = I(l, c, d);
                s = h.x, a = h.y, i = ue(h.x) > ue(h.y) ? h.x : h.y, o = A(c, d), e.lastInterval = t
            } else i = r.velocity, s = r.velocityX, a = r.velocityY, o = r.direction;
            t.velocity = i, t.velocityX = s, t.velocityY = a, t.direction = o
        }

        function _(e) {
            for (var t = [], i = 0; i < e.pointers.length;) t[i] = {
                clientX: he(e.pointers[i].clientX),
                clientY: he(e.pointers[i].clientY)
            }, i++;
            return {
                timeStamp: pe(),
                pointers: t,
                center: P(t),
                deltaX: e.deltaX,
                deltaY: e.deltaY
            }
        }

        function P(e) {
            var t = e.length;
            if (1 === t) return {
                x: he(e[0].clientX),
                y: he(e[0].clientY)
            };
            for (var i = 0, n = 0, s = 0; t > s;) i += e[s].clientX, n += e[s].clientY, s++;
            return {
                x: he(i / t),
                y: he(n / t)
            }
        }

        function I(e, t, i) {
            return {
                x: t / e || 0,
                y: i / e || 0
            }
        }

        function A(e, t) {
            return e === t ? Ee : ue(e) >= ue(t) ? e > 0 ? Me : _e : t > 0 ? Pe : Ie
        }

        function F(e, t, i) {
            i || (i = Oe);
            var n = t[i[0]] - e[i[0]],
                s = t[i[1]] - e[i[1]];
            return Math.sqrt(n * n + s * s)
        }

        function N(e, t, i) {
            i || (i = Oe);
            var n = t[i[0]] - e[i[0]],
                s = t[i[1]] - e[i[1]];
            return 180 * Math.atan2(s, n) / Math.PI
        }

        function O(e, t) {
            return N(t[1], t[0], He) - N(e[1], e[0], He)
        }

        function H(e, t) {
            return F(t[0], t[1], He) / F(e[0], e[1], He)
        }

        function L() {
            this.evEl = Be, this.evWin = Re, this.allow = !0, this.pressed = !1, S.apply(this, arguments)
        }

        function B() {
            this.evEl = Qe, this.evWin = Ve, S.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function R() {
            this.evTarget = Ye, this.evWin = Ue, this.started = !1, S.apply(this, arguments)
        }

        function z(e, t) {
            var i = b(e.touches),
                n = b(e.changedTouches);
            return t & (Te | De) && (i = w(i.concat(n), "identifier", !0)), [i, n]
        }

        function W() {
            this.evTarget = Ke, this.targetIds = {}, S.apply(this, arguments)
        }

        function Q(e, t) {
            var i = b(e.touches),
                n = this.targetIds;
            if (t & (Se | xe) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
            var s, a, o = b(e.changedTouches),
                r = [],
                l = this.target;
            if (a = i.filter(function(e) {
                    return m(e.target, l)
                }), t === Se)
                for (s = 0; s < a.length;) n[a[s].identifier] = !0, s++;
            for (s = 0; s < o.length;) n[o[s].identifier] && r.push(o[s]), t & (Te | De) && delete n[o[s].identifier], s++;
            return r.length ? [w(a.concat(r), "identifier", !0), r] : void 0
        }

        function V() {
            S.apply(this, arguments);
            var e = d(this.handler, this);
            this.touch = new W(this.manager, e), this.mouse = new L(this.manager, e)
        }

        function q(e, t) {
            this.manager = e, this.set(t)
        }

        function Y(e) {
            if (g(e, tt)) return tt;
            var t = g(e, it),
                i = g(e, nt);
            return t && i ? it + " " + nt : t || i ? t ? it : nt : g(e, et) ? et : Je
        }

        function U(e) {
            this.id = C(), this.manager = null, this.options = l(e || {}, this.defaults), this.options.enable = u(this.options.enable, !0), this.state = st, this.simultaneous = {}, this.requireFail = []
        }

        function $(e) {
            return e & ct ? "cancel" : e & rt ? "end" : e & ot ? "move" : e & at ? "start" : ""
        }

        function K(e) {
            return e == Ie ? "down" : e == Pe ? "up" : e == Me ? "left" : e == _e ? "right" : ""
        }

        function X(e, t) {
            var i = t.manager;
            return i ? i.get(e) : e
        }

        function G() {
            U.apply(this, arguments)
        }

        function Z() {
            G.apply(this, arguments), this.pX = null, this.pY = null
        }

        function J() {
            G.apply(this, arguments)
        }

        function ee() {
            U.apply(this, arguments), this._timer = null, this._input = null
        }

        function te() {
            G.apply(this, arguments)
        }

        function ie() {
            G.apply(this, arguments)
        }

        function ne() {
            U.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function se(e, t) {
            return t = t || {}, t.recognizers = u(t.recognizers, se.defaults.preset), new ae(e, t)
        }

        function ae(e, t) {
            t = t || {}, this.options = l(t, se.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = x(this), this.touchAction = new q(this, this.options.touchAction), oe(this, !0), o(t.recognizers, function(e) {
                var t = this.add(new e[0](e[1]));
                e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
            }, this)
        }

        function oe(e, t) {
            var i = e.element;
            o(e.options.cssProps, function(e, n) {
                i.style[k(i.style, n)] = t ? e : ""
            })
        }

        function re(e, i) {
            var n = t.createEvent("Event");
            n.initEvent(e, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
        }
        var le = ["", "webkit", "moz", "MS", "ms", "o"],
            ce = t.createElement("div"),
            de = "function",
            he = Math.round,
            ue = Math.abs,
            pe = Date.now,
            fe = 1,
            me = /mobile|tablet|ip(ad|hone|od)|android/i,
            ge = "ontouchstart" in e,
            ve = k(e, "PointerEvent") !== n,
            ye = ge && me.test(navigator.userAgent),
            be = "touch",
            we = "pen",
            ke = "mouse",
            Ce = "kinect",
            je = 25,
            Se = 1,
            xe = 2,
            Te = 4,
            De = 8,
            Ee = 1,
            Me = 2,
            _e = 4,
            Pe = 8,
            Ie = 16,
            Ae = Me | _e,
            Fe = Pe | Ie,
            Ne = Ae | Fe,
            Oe = ["x", "y"],
            He = ["clientX", "clientY"];
        S.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(j(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(j(this.element), this.evWin, this.domHandler)
            }
        };
        var Le = {
                mousedown: Se,
                mousemove: xe,
                mouseup: Te
            },
            Be = "mousedown",
            Re = "mousemove mouseup";
        c(L, S, {
            handler: function(e) {
                var t = Le[e.type];
                t & Se && 0 === e.button && (this.pressed = !0), t & xe && 1 !== e.which && (t = Te), this.pressed && this.allow && (t & Te && (this.pressed = !1), this.callback(this.manager, t, {
                    pointers: [e],
                    changedPointers: [e],
                    pointerType: ke,
                    srcEvent: e
                }))
            }
        });
        var ze = {
                pointerdown: Se,
                pointermove: xe,
                pointerup: Te,
                pointercancel: De,
                pointerout: De
            },
            We = {
                2: be,
                3: we,
                4: ke,
                5: Ce
            },
            Qe = "pointerdown",
            Ve = "pointermove pointerup pointercancel";
        e.MSPointerEvent && (Qe = "MSPointerDown", Ve = "MSPointerMove MSPointerUp MSPointerCancel"), c(B, S, {
            handler: function(e) {
                var t = this.store,
                    i = !1,
                    n = e.type.toLowerCase().replace("ms", ""),
                    s = ze[n],
                    a = We[e.pointerType] || e.pointerType,
                    o = a == be,
                    r = y(t, e.pointerId, "pointerId");
                s & Se && (0 === e.button || o) ? 0 > r && (t.push(e), r = t.length - 1) : s & (Te | De) && (i = !0), 0 > r || (t[r] = e, this.callback(this.manager, s, {
                    pointers: t,
                    changedPointers: [e],
                    pointerType: a,
                    srcEvent: e
                }), i && t.splice(r, 1))
            }
        });
        var qe = {
                touchstart: Se,
                touchmove: xe,
                touchend: Te,
                touchcancel: De
            },
            Ye = "touchstart",
            Ue = "touchstart touchmove touchend touchcancel";
        c(R, S, {
            handler: function(e) {
                var t = qe[e.type];
                if (t === Se && (this.started = !0), this.started) {
                    var i = z.call(this, e, t);
                    t & (Te | De) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, t, {
                        pointers: i[0],
                        changedPointers: i[1],
                        pointerType: be,
                        srcEvent: e
                    })
                }
            }
        });
        var $e = {
                touchstart: Se,
                touchmove: xe,
                touchend: Te,
                touchcancel: De
            },
            Ke = "touchstart touchmove touchend touchcancel";
        c(W, S, {
            handler: function(e) {
                var t = $e[e.type],
                    i = Q.call(this, e, t);
                i && this.callback(this.manager, t, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: be,
                    srcEvent: e
                })
            }
        }), c(V, S, {
            handler: function(e, t, i) {
                var n = i.pointerType == be,
                    s = i.pointerType == ke;
                if (n) this.mouse.allow = !1;
                else if (s && !this.mouse.allow) return;
                t & (Te | De) && (this.mouse.allow = !0), this.callback(e, t, i)
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var Xe = k(ce.style, "touchAction"),
            Ge = Xe !== n,
            Ze = "compute",
            Je = "auto",
            et = "manipulation",
            tt = "none",
            it = "pan-x",
            nt = "pan-y";
        q.prototype = {
            set: function(e) {
                e == Ze && (e = this.compute()), Ge && (this.manager.element.style[Xe] = e), this.actions = e.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var e = [];
                return o(this.manager.recognizers, function(t) {
                    h(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }), Y(e.join(" "))
            },
            preventDefaults: function(e) {
                if (!Ge) {
                    var t = e.srcEvent,
                        i = e.offsetDirection;
                    if (this.manager.session.prevented) return void t.preventDefault();
                    var n = this.actions,
                        s = g(n, tt),
                        a = g(n, nt),
                        o = g(n, it);
                    return s || a && i & Ae || o && i & Fe ? this.preventSrc(t) : void 0
                }
            },
            preventSrc: function(e) {
                this.manager.session.prevented = !0, e.preventDefault()
            }
        };
        var st = 1,
            at = 2,
            ot = 4,
            rt = 8,
            lt = rt,
            ct = 16,
            dt = 32;
        U.prototype = {
            defaults: {},
            set: function(e) {
                return r(this.options, e), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(e) {
                if (a(e, "recognizeWith", this)) return this;
                var t = this.simultaneous;
                return e = X(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
            },
            dropRecognizeWith: function(e) {
                return a(e, "dropRecognizeWith", this) ? this : (e = X(e, this), delete this.simultaneous[e.id], this)
            },
            requireFailure: function(e) {
                if (a(e, "requireFailure", this)) return this;
                var t = this.requireFail;
                return e = X(e, this), -1 === y(t, e) && (t.push(e), e.requireFailure(this)), this
            },
            dropRequireFailure: function(e) {
                if (a(e, "dropRequireFailure", this)) return this;
                e = X(e, this);
                var t = y(this.requireFail, e);
                return t > -1 && this.requireFail.splice(t, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(e) {
                return !!this.simultaneous[e.id]
            },
            emit: function(e) {
                function t(t) {
                    i.manager.emit(i.options.event + (t ? $(n) : ""), e)
                }
                var i = this,
                    n = this.state;
                rt > n && t(!0), t(), n >= rt && t(!0)
            },
            tryEmit: function(e) {
                return this.canEmit() ? this.emit(e) : void(this.state = dt)
            },
            canEmit: function() {
                for (var e = 0; e < this.requireFail.length;) {
                    if (!(this.requireFail[e].state & (dt | st))) return !1;
                    e++
                }
                return !0
            },
            recognize: function(e) {
                var t = r({}, e);
                return h(this.options.enable, [this, t]) ? (this.state & (lt | ct | dt) && (this.state = st), this.state = this.process(t), void(this.state & (at | ot | rt | ct) && this.tryEmit(t))) : (this.reset(), void(this.state = dt))
            },
            process: function() {},
            getTouchAction: function() {},
            reset: function() {}
        }, c(G, U, {
            defaults: {
                pointers: 1
            },
            attrTest: function(e) {
                var t = this.options.pointers;
                return 0 === t || e.pointers.length === t
            },
            process: function(e) {
                var t = this.state,
                    i = e.eventType,
                    n = t & (at | ot),
                    s = this.attrTest(e);
                return n && (i & De || !s) ? t | ct : n || s ? i & Te ? t | rt : t & at ? t | ot : at : dt
            }
        }), c(Z, G, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Ne
            },
            getTouchAction: function() {
                var e = this.options.direction,
                    t = [];
                return e & Ae && t.push(nt), e & Fe && t.push(it), t
            },
            directionTest: function(e) {
                var t = this.options,
                    i = !0,
                    n = e.distance,
                    s = e.direction,
                    a = e.deltaX,
                    o = e.deltaY;
                return s & t.direction || (t.direction & Ae ? (s = 0 === a ? Ee : 0 > a ? Me : _e, i = a != this.pX, n = Math.abs(e.deltaX)) : (s = 0 === o ? Ee : 0 > o ? Pe : Ie, i = o != this.pY, n = Math.abs(e.deltaY))), e.direction = s, i && n > t.threshold && s & t.direction
            },
            attrTest: function(e) {
                return G.prototype.attrTest.call(this, e) && (this.state & at || !(this.state & at) && this.directionTest(e))
            },
            emit: function(e) {
                this.pX = e.deltaX, this.pY = e.deltaY;
                var t = K(e.direction);
                t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
            }
        }), c(J, G, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [tt]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & at)
            },
            emit: function(e) {
                if (this._super.emit.call(this, e), 1 !== e.scale) {
                    var t = e.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + t, e)
                }
            }
        }), c(ee, U, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [Je]
            },
            process: function(e) {
                var t = this.options,
                    i = e.pointers.length === t.pointers,
                    n = e.distance < t.threshold,
                    a = e.deltaTime > t.time;
                if (this._input = e, !n || !i || e.eventType & (Te | De) && !a) this.reset();
                else if (e.eventType & Se) this.reset(), this._timer = s(function() {
                    this.state = lt, this.tryEmit()
                }, t.time, this);
                else if (e.eventType & Te) return lt;
                return dt
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(e) {
                this.state === lt && (e && e.eventType & Te ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = pe(), this.manager.emit(this.options.event, this._input)))
            }
        }), c(te, G, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [tt]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & at)
            }
        }), c(ie, G, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Ae | Fe,
                pointers: 1
            },
            getTouchAction: function() {
                return Z.prototype.getTouchAction.call(this)
            },
            attrTest: function(e) {
                var t, i = this.options.direction;
                return i & (Ae | Fe) ? t = e.velocity : i & Ae ? t = e.velocityX : i & Fe && (t = e.velocityY), this._super.attrTest.call(this, e) && i & e.direction && e.distance > this.options.threshold && ue(t) > this.options.velocity && e.eventType & Te
            },
            emit: function(e) {
                var t = K(e.direction);
                t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
            }
        }), c(ne, U, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [et]
            },
            process: function(e) {
                var t = this.options,
                    i = e.pointers.length === t.pointers,
                    n = e.distance < t.threshold,
                    a = e.deltaTime < t.time;
                if (this.reset(), e.eventType & Se && 0 === this.count) return this.failTimeout();
                if (n && a && i) {
                    if (e.eventType != Te) return this.failTimeout();
                    var o = this.pTime ? e.timeStamp - this.pTime < t.interval : !0,
                        r = !this.pCenter || F(this.pCenter, e.center) < t.posThreshold;
                    this.pTime = e.timeStamp, this.pCenter = e.center, r && o ? this.count += 1 : this.count = 1, this._input = e;
                    var l = this.count % t.taps;
                    if (0 === l) return this.hasRequireFailures() ? (this._timer = s(function() {
                        this.state = lt, this.tryEmit()
                    }, t.interval, this), at) : lt
                }
                return dt
            },
            failTimeout: function() {
                return this._timer = s(function() {
                    this.state = dt
                }, this.options.interval, this), dt
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == lt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), se.VERSION = "2.0.4", se.defaults = {
            domEvents: !1,
            touchAction: Ze,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [te, {
                    enable: !1
                }],
                [J, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [ie, {
                    direction: Ae
                }],
                [Z, {
                        direction: Ae
                    },
                    ["swipe"]
                ],
                [ne],
                [ne, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [ee]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var ht = 1,
            ut = 2;
        ae.prototype = {
            set: function(e) {
                return r(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
            },
            stop: function(e) {
                this.session.stopped = e ? ut : ht
            },
            recognize: function(e) {
                var t = this.session;
                if (!t.stopped) {
                    this.touchAction.preventDefaults(e);
                    var i, n = this.recognizers,
                        s = t.curRecognizer;
                    (!s || s && s.state & lt) && (s = t.curRecognizer = null);
                    for (var a = 0; a < n.length;) i = n[a], t.stopped === ut || s && i != s && !i.canRecognizeWith(s) ? i.reset() : i.recognize(e), !s && i.state & (at | ot | rt) && (s = t.curRecognizer = i), a++
                }
            },
            get: function(e) {
                if (e instanceof U) return e;
                for (var t = this.recognizers, i = 0; i < t.length; i++)
                    if (t[i].options.event == e) return t[i];
                return null
            },
            add: function(e) {
                if (a(e, "add", this)) return this;
                var t = this.get(e.options.event);
                return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
            },
            remove: function(e) {
                if (a(e, "remove", this)) return this;
                var t = this.recognizers;
                return e = this.get(e), t.splice(y(t, e), 1), this.touchAction.update(), this
            },
            on: function(e, t) {
                var i = this.handlers;
                return o(v(e), function(e) {
                    i[e] = i[e] || [], i[e].push(t)
                }), this
            },
            off: function(e, t) {
                var i = this.handlers;
                return o(v(e), function(e) {
                    t ? i[e].splice(y(i[e], t), 1) : delete i[e]
                }), this
            },
            emit: function(e, t) {
                this.options.domEvents && re(e, t);
                var i = this.handlers[e] && this.handlers[e].slice();
                if (i && i.length) {
                    t.type = e, t.preventDefault = function() {
                        t.srcEvent.preventDefault()
                    };
                    for (var n = 0; n < i.length;) i[n](t), n++
                }
            },
            destroy: function() {
                this.element && oe(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, r(se, {
            INPUT_START: Se,
            INPUT_MOVE: xe,
            INPUT_END: Te,
            INPUT_CANCEL: De,
            STATE_POSSIBLE: st,
            STATE_BEGAN: at,
            STATE_CHANGED: ot,
            STATE_ENDED: rt,
            STATE_RECOGNIZED: lt,
            STATE_CANCELLED: ct,
            STATE_FAILED: dt,
            DIRECTION_NONE: Ee,
            DIRECTION_LEFT: Me,
            DIRECTION_RIGHT: _e,
            DIRECTION_UP: Pe,
            DIRECTION_DOWN: Ie,
            DIRECTION_HORIZONTAL: Ae,
            DIRECTION_VERTICAL: Fe,
            DIRECTION_ALL: Ne,
            Manager: ae,
            Input: S,
            TouchAction: q,
            TouchInput: W,
            MouseInput: L,
            PointerEventInput: B,
            TouchMouseInput: V,
            SingleTouchInput: R,
            Recognizer: U,
            AttrRecognizer: G,
            Tap: ne,
            Pan: Z,
            Swipe: ie,
            Pinch: J,
            Rotate: te,
            Press: ee,
            on: p,
            off: f,
            each: o,
            merge: l,
            extend: r,
            inherit: c,
            bindFn: d,
            prefixed: k
        }), typeof define == de && define.amd ? define(function() {
            return se
        }) : "undefined" != typeof module && module.exports ? module.exports = se : e[i] = se
    }(window, document, "Hammer"),
    function(e) {
        e.fn.fitVids = function(t) {
            var i = {
                customSelector: null
            };
            if (!document.getElementById("fit-vids-style")) {
                var n = document.createElement("div"),
                    s = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0],
                    a = "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
                n.className = "fit-vids-style", n.id = "fit-vids-style", n.style.display = "none", n.innerHTML = a, s.parentNode.insertBefore(n, s)
            }
            return t && e.extend(i, t), this.each(function() {
                var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                i.customSelector && t.push(i.customSelector);
                var n = e(this).find(t.join(","));
                n = n.not("object object"), n.each(function() {
                    var t = e(this);
                    if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                        var i = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                            n = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                            s = i / n;
                        if (!t.attr("id")) {
                            var a = "fitvid" + Math.floor(999999 * Math.random());
                            t.attr("id", a)
                        }
                        t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), t.removeAttr("height").removeAttr("width")
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto);
var mejs = mejs || {};
if (mejs.version = "2.13.2", mejs.meIndex = 0, mejs.plugins = {
        silverlight: [{
            version: [3, 0],
            types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
        }],
        flash: [{
            version: [9, 0, 124],
            types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
        }],
        youtube: [{
            version: null,
            types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
        }],
        vimeo: [{
            version: null,
            types: ["video/vimeo", "video/x-vimeo"]
        }]
    }, mejs.Utility = {
        encodeUrl: function(e) {
            return encodeURIComponent(e)
        },
        escapeHTML: function(e) {
            return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
        },
        absolutizeUrl: function(e) {
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
        },
        getScriptPath: function(e) {
            for (var t, i, n, s = 0, a = "", o = "", r = document.getElementsByTagName("script"), l = r.length, c = e.length; l > s; s++) {
                for (i = r[s].src, t = i.lastIndexOf("/"), t > -1 ? (n = i.substring(t + 1), i = i.substring(0, t + 1)) : (n = i, i = ""), t = 0; c > t; t++)
                    if (o = e[t], o = n.indexOf(o), o > -1) {
                        a = i;
                        break
                    }
                if ("" !== a) break
            }
            return a
        },
        secondsToTimeCode: function(e, t, i, n) {
            "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
            var s = Math.floor(e / 3600) % 24,
                a = Math.floor(e / 60) % 60,
                o = Math.floor(e % 60);
            return e = Math.floor((e % 1 * n).toFixed(3)), (t || s > 0 ? (10 > s ? "0" + s : s) + ":" : "") + (10 > a ? "0" + a : a) + ":" + (10 > o ? "0" + o : o) + (i ? ":" + (10 > e ? "0" + e : e) : "")
        },
        timeCodeToSeconds: function(e, t, i, n) {
            "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25), e = e.split(":"), t = parseInt(e[0], 10);
            var s = parseInt(e[1], 10),
                a = parseInt(e[2], 10),
                o = 0,
                r = 0;
            return i && (o = parseInt(e[3]) / n), r = 3600 * t + 60 * s + a + o
        },
        convertSMPTEtoSeconds: function(e) {
            if ("string" != typeof e) return !1;
            e = e.replace(",", ".");
            var t = 0,
                i = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
                n = 1;
            e = e.split(":").reverse();
            for (var s = 0; s < e.length; s++) n = 1, s > 0 && (n = Math.pow(60, s)), t += Number(e[s]) * n;
            return Number(t.toFixed(i))
        },
        removeSwf: function(e) {
            var t = document.getElementById(e);
            t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function() {
                4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        },
        removeObjectInIE: function(e) {
            if (e = document.getElementById(e)) {
                for (var t in e) "function" == typeof e[t] && (e[t] = null);
                e.parentNode.removeChild(e)
            }
        }
    }, mejs.PluginDetector = {
        hasPluginVersion: function(e, t) {
            var i = this.plugins[e];
            return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2] ? !0 : !1
        },
        nav: window.navigator,
        ua: window.navigator.userAgent.toLowerCase(),
        plugins: [],
        addPlugin: function(e, t, i, n, s) {
            this.plugins[e] = this.detectPlugin(t, i, n, s)
        },
        detectPlugin: function(e, t, i, n) {
            var s, a = [0, 0, 0];
            if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                if ((i = this.nav.plugins[e].description) && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                    for (a = i.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), e = 0; e < a.length; e++) a[e] = parseInt(a[e].match(/\d+/), 10)
            } else if ("undefined" != typeof window.ActiveXObject) try {
                (s = new ActiveXObject(i)) && (a = n(s))
            } catch (o) {}
            return a
        }
    }, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
        var t = [];
        return (e = e.GetVariable("$version")) && (e = e.split(" ")[1].split(","), t = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]), t
    }), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
        var t = [0, 0, 0, 0],
            i = function(e, t, i, n) {
                for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
                t[i] -= n
            };
        return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
    }), mejs.MediaFeatures = {
        init: function() {
            var e, t = this,
                i = document,
                n = mejs.PluginDetector.nav,
                s = mejs.PluginDetector.ua.toLowerCase(),
                a = ["source", "track", "audio", "video"];
            t.isiPad = null !== s.match(/ipad/i), t.isiPhone = null !== s.match(/iphone/i), t.isiOS = t.isiPhone || t.isiPad, t.isAndroid = null !== s.match(/android/i), t.isBustedAndroid = null !== s.match(/android 2\.[12]/), t.isBustedNativeHTTPS = "https:" === location.protocol && (null !== s.match(/android [12]\./) || null !== s.match(/macintosh.* version.* safari/)), t.isIE = -1 != n.appName.toLowerCase().indexOf("microsoft") || null !== n.appName.toLowerCase().match(/trident/gi), t.isChrome = null !== s.match(/chrome/gi), t.isFirefox = null !== s.match(/firefox/gi), t.isWebkit = null !== s.match(/webkit/gi), t.isGecko = null !== s.match(/gecko/gi) && !t.isWebkit && !t.isIE, t.isOpera = null !== s.match(/opera/gi), t.hasTouch = "ontouchstart" in window, t.svg = !!document.createElementNS && !!document.createElementNS("//www.w3.org/2000/svg", "svg").createSVGRect;
            for (n = 0; n < a.length; n++) e = document.createElement(a[n]);
            t.supportsMediaTag = "undefined" != typeof e.canPlayType || t.isBustedAndroid;
            try {
                e.canPlayType("video/mp4")
            } catch (o) {
                t.supportsMediaTag = !1
            }
            t.hasSemiNativeFullScreen = "undefined" != typeof e.webkitEnterFullscreen, t.hasNativeFullscreen = "undefined" != typeof e.requestFullscreen, t.hasWebkitNativeFullScreen = "undefined" != typeof e.webkitRequestFullScreen, t.hasMozNativeFullScreen = "undefined" != typeof e.mozRequestFullScreen, t.hasMsNativeFullScreen = "undefined" != typeof e.msRequestFullscreen, t.hasTrueNativeFullScreen = t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen || t.hasMsNativeFullScreen, t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen, t.hasMozNativeFullScreen ? t.nativeFullScreenEnabled = document.mozFullScreenEnabled : t.hasMsNativeFullScreen && (t.nativeFullScreenEnabled = document.msFullscreenEnabled), t.isChrome && (t.hasSemiNativeFullScreen = !1), t.hasTrueNativeFullScreen && (t.fullScreenEventName = "", t.hasWebkitNativeFullScreen ? t.fullScreenEventName = "webkitfullscreenchange" : t.hasMozNativeFullScreen ? t.fullScreenEventName = "mozfullscreenchange" : t.hasMsNativeFullScreen && (t.fullScreenEventName = "MSFullscreenChange"), t.isFullScreen = function() {
                return e.mozRequestFullScreen ? i.mozFullScreen : e.webkitRequestFullScreen ? i.webkitIsFullScreen : e.hasMsNativeFullScreen ? null !== i.msFullscreenElement : void 0
            }, t.requestFullScreen = function(e) {
                t.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : t.hasMozNativeFullScreen ? e.mozRequestFullScreen() : t.hasMsNativeFullScreen && e.msRequestFullscreen()
            }, t.cancelFullScreen = function() {
                t.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : t.hasMozNativeFullScreen ? document.mozCancelFullScreen() : t.hasMsNativeFullScreen && document.msExitFullscreen()
            }), t.hasSemiNativeFullScreen && s.match(/mac os x 10_5/i) && (t.hasNativeFullScreen = !1, t.hasSemiNativeFullScreen = !1)
        }
    }, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
        pluginType: "native",
        isFullScreen: !1,
        setCurrentTime: function(e) {
            this.currentTime = e
        },
        setMuted: function(e) {
            this.muted = e
        },
        setVolume: function(e) {
            this.volume = e
        },
        stop: function() {
            this.pause()
        },
        setSrc: function(e) {
            for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
            if ("string" == typeof e) this.src = e;
            else {
                var i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.src = i.src;
                        break
                    }
            }
        },
        setVideoSize: function(e, t) {
            this.width = e, this.height = t
        }
    }, mejs.PluginMediaElement = function(e, t, i) {
        this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
    }, mejs.PluginMediaElement.prototype = {
        pluginElement: null,
        pluginType: "",
        isFullScreen: !1,
        playbackRate: -1,
        defaultPlaybackRate: -1,
        seekable: [],
        played: [],
        paused: !0,
        ended: !1,
        seeking: !1,
        duration: 0,
        error: null,
        tagName: "",
        muted: !1,
        volume: 1,
        currentTime: 0,
        play: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
        },
        load: function() {
            null != this.pluginApi && ("youtube" != this.pluginType && this.pluginApi.loadMedia(), this.paused = !1)
        },
        pause: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
        },
        stop: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
        },
        canPlayType: function(e) {
            var t, i, n, s = mejs.plugins[this.pluginType];
            for (t = 0; t < s.length; t++)
                if (n = s[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version))
                    for (i = 0; i < n.types.length; i++)
                        if (e == n.types[i]) return "probably";
            return ""
        },
        positionFullscreenButton: function(e, t, i) {
            null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
        },
        hideFullscreenButton: function() {
            null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
        },
        setSrc: function(e) {
            if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
            else {
                var t, i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(e);
                        break
                    }
            }
        },
        setCurrentTime: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
        },
        setVolume: function(e) {
            null != this.pluginApi && (this.pluginApi.setVolume("youtube" == this.pluginType ? 100 * e : e), this.volume = e)
        },
        setMuted: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(e), this.muted = e)
        },
        setVideoSize: function(e, t) {
            this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
        },
        setFullscreen: function(e) {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
        },
        enterFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
        },
        exitFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
        },
        addEventListener: function(e, t) {
            this.events[e] = this.events[e] || [], this.events[e].push(t)
        },
        removeEventListener: function(e, t) {
            if (!e) return this.events = {}, !0;
            var n = this.events[e];
            if (!n) return !0;
            if (!t) return this.events[e] = [], !0;
            for (i = 0; i < n.length; i++)
                if (n[i] === t) return this.events[e].splice(i, 1), !0;
            return !1
        },
        dispatchEvent: function(e) {
            var t, i, n = this.events[e];
            if (n)
                for (i = Array.prototype.slice.call(arguments, 1), t = 0; t < n.length; t++) n[t].apply(null, i)
        },
        hasAttribute: function(e) {
            return e in this.attributes
        },
        removeAttribute: function(e) {
            delete this.attributes[e]
        },
        getAttribute: function(e) {
            return this.hasAttribute(e) ? this.attributes[e] : ""
        },
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
        remove: function() {
            mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
        }
    }, mejs.MediaPluginBridge = {
        pluginMediaElements: {},
        htmlMediaElements: {},
        registerPluginElement: function(e, t, i) {
            this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = i
        },
        unregisterPluginElement: function(e) {
            delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
        },
        initPlugin: function(e) {
            var t = this.pluginMediaElements[e],
                i = this.htmlMediaElements[e];
            if (t) {
                switch (t.pluginType) {
                    case "flash":
                        t.pluginElement = t.pluginApi = document.getElementById(e);
                        break;
                    case "silverlight":
                        t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
                }
                null != t.pluginApi && t.success && t.success(t, i)
            }
        },
        fireEvent: function(e, t, i) {
            var n, s;
            if (e = this.pluginMediaElements[e]) {
                t = {
                    type: t,
                    target: e
                };
                for (n in i) e[n] = i[n], t[n] = i[n];
                s = i.bufferedTime || 0, t.target.buffered = t.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return s
                    },
                    length: 1
                }, e.dispatchEvent(t.type, t)
            }
        }
    }, mejs.MediaElementDefaults = {
        mode: "auto",
        plugins: ["flash", "silverlight", "youtube", "vimeo"],
        enablePluginDebug: !1,
        httpsBasicAuthSite: !1,
        type: "",
        pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
        flashName: "flashmediaelement.swf",
        flashStreamer: "",
        enablePluginSmoothing: !1,
        enablePseudoStreaming: !1,
        pseudoStreamingStartQueryParam: "start",
        silverlightName: "silverlightmediaelement.xap",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        pluginWidth: -1,
        pluginHeight: -1,
        pluginVars: [],
        timerRate: 250,
        startVolume: .8,
        success: function() {},
        error: function() {}
    }, mejs.MediaElement = function(e, t) {
        return mejs.HtmlMediaElementShim.create(e, t)
    }, mejs.HtmlMediaElementShim = {
        create: function(e, t) {
            var i = mejs.MediaElementDefaults,
                n = "string" == typeof e ? document.getElementById(e) : e,
                s = n.tagName.toLowerCase(),
                a = "audio" === s || "video" === s,
                o = n.getAttribute(a ? "src" : "href");
            s = n.getAttribute("poster");
            var r, l = n.getAttribute("autoplay"),
                c = n.getAttribute("preload"),
                d = n.getAttribute("controls");
            for (r in t) i[r] = t[r];
            return o = "undefined" == typeof o || null === o || "" == o ? null : o, s = "undefined" == typeof s || null === s ? "" : s, c = "undefined" == typeof c || null === c || "false" === c ? "none" : c, l = !("undefined" == typeof l || null === l || "false" === l), d = !("undefined" == typeof d || null === d || "false" === d), r = this.determinePlayback(n, i, mejs.MediaFeatures.supportsMediaTag, a, o), r.url = null !== r.url ? mejs.Utility.absolutizeUrl(r.url) : "", "native" == r.method ? (mejs.MediaFeatures.isBustedAndroid && (n.src = r.url, n.addEventListener("click", function() {
                n.play()
            }, !1)), this.updateNative(r, i, l, c)) : "" !== r.method ? this.createPlugin(r, i, s, l, c, d) : (this.createErrorMessage(r, i, s), this)
        },
        determinePlayback: function(e, t, i, n, s) {
            var a, o, r, l, c = [],
                d = {
                    method: "",
                    url: "",
                    htmlMediaElement: e,
                    isVideo: "audio" != e.tagName.toLowerCase()
                };
            if ("undefined" != typeof t.type && "" !== t.type)
                if ("string" == typeof t.type) c.push({
                    type: t.type,
                    url: s
                });
                else
                    for (a = 0; a < t.type.length; a++) c.push({
                        type: t.type[a],
                        url: s
                    });
            else if (null !== s) r = this.formatType(s, e.getAttribute("type")), c.push({
                type: r,
                url: s
            });
            else
                for (a = 0; a < e.childNodes.length; a++) o = e.childNodes[a], 1 == o.nodeType && "source" == o.tagName.toLowerCase() && (s = o.getAttribute("src"), r = this.formatType(s, o.getAttribute("type")),
                    o = o.getAttribute("media"), (!o || !window.matchMedia || window.matchMedia && window.matchMedia(o).matches) && c.push({
                        type: r,
                        url: s
                    }));
            if (!n && c.length > 0 && null !== c[0].url && this.getTypeFromFile(c[0].url).indexOf("audio") > -1 && (d.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                }), !(!i || "auto" !== t.mode && "auto_plugin" !== t.mode && "native" !== t.mode || mejs.MediaFeatures.isBustedNativeHTTPS && t.httpsBasicAuthSite === !0)) {
                for (n || (a = document.createElement(d.isVideo ? "video" : "audio"), e.parentNode.insertBefore(a, e), e.style.display = "none", d.htmlMediaElement = e = a), a = 0; a < c.length; a++)
                    if ("" !== e.canPlayType(c[a].type).replace(/no/, "") || "" !== e.canPlayType(c[a].type.replace(/mp3/, "mpeg")).replace(/no/, "")) {
                        d.method = "native", d.url = c[a].url;
                        break
                    }
                if ("native" === d.method && (null !== d.url && (e.src = d.url), "auto_plugin" !== t.mode)) return d
            }
            if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
                for (a = 0; a < c.length; a++)
                    for (r = c[a].type, e = 0; e < t.plugins.length; e++)
                        for (s = t.plugins[e], o = mejs.plugins[s], i = 0; i < o.length; i++)
                            if (l = o[i], null == l.version || mejs.PluginDetector.hasPluginVersion(s, l.version))
                                for (n = 0; n < l.types.length; n++)
                                    if (r == l.types[n]) return d.method = s, d.url = c[a].url, d;
            return "auto_plugin" === t.mode && "native" === d.method ? d : ("" === d.method && c.length > 0 && (d.url = c[0].url), d)
        },
        formatType: function(e, t) {
            return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
        },
        getTypeFromFile: function(e) {
            return e = e.split("?")[0], e = e.substring(e.lastIndexOf(".") + 1).toLowerCase(), (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(e) ? "video" : "audio") + "/" + this.getTypeFromExtension(e)
        },
        getTypeFromExtension: function(e) {
            switch (e) {
                case "mp4":
                case "m4v":
                    return "mp4";
                case "webm":
                case "webma":
                case "webmv":
                    return "webm";
                case "ogg":
                case "oga":
                case "ogv":
                    return "ogg";
                default:
                    return e
            }
        },
        createErrorMessage: function(e, t, i) {
            var n = e.htmlMediaElement,
                s = document.createElement("div");
            s.className = "me-cannotplay";
            try {
                s.style.width = n.width + "px", s.style.height = n.height + "px"
            } catch (a) {}
            s.innerHTML = t.customError ? t.customError : "" !== i ? '<a href="' + e.url + '"><img src="' + i + '" width="100%" height="100%" /></a>' : '<a href="' + e.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>", n.parentNode.insertBefore(s, n), n.style.display = "none", t.error(n)
        },
        createPlugin: function(e, t, i, n, s, a) {
            i = e.htmlMediaElement;
            var o, r = 1,
                l = 1,
                c = "me_" + e.method + "_" + mejs.meIndex++,
                d = new mejs.PluginMediaElement(c, e.method, e.url),
                h = document.createElement("div");
            for (d.tagName = i.tagName, o = 0; o < i.attributes.length; o++) {
                var u = i.attributes[o];
                1 == u.specified && d.setAttribute(u.name, u.value)
            }
            for (o = i.parentNode; null !== o && "body" != o.tagName.toLowerCase();) {
                if ("p" == o.parentNode.tagName.toLowerCase()) {
                    o.parentNode.parentNode.insertBefore(o, o.parentNode);
                    break
                }
                o = o.parentNode
            }
            switch (e.isVideo ? (r = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== i.getAttribute("width") ? i.getAttribute("width") : t.defaultVideoWidth, l = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== i.getAttribute("height") ? i.getAttribute("height") : t.defaultVideoHeight, r = mejs.Utility.encodeUrl(r), l = mejs.Utility.encodeUrl(l)) : t.enablePluginDebug && (r = 320, l = 240), d.success = t.success, mejs.MediaPluginBridge.registerPluginElement(c, d, i), h.className = "me-plugin", h.id = c + "_container", e.isVideo ? i.parentNode.insertBefore(h, i) : document.body.insertBefore(h, document.body.childNodes[0]), n = ["id=" + c, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + s, "width=" + r, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + l, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && n.push("flash" == e.method ? "file=" + mejs.Utility.encodeUrl(e.url) : "file=" + e.url), t.enablePluginDebug && n.push("debug=true"), t.enablePluginSmoothing && n.push("smoothing=true"), t.enablePseudoStreaming && n.push("pseudostreaming=true"), a && n.push("controls=true"), t.pluginVars && (n = n.concat(t.pluginVars)), e.method) {
                case "silverlight":
                    h.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + c + '" name="' + c + '" width="' + r + '" height="' + l + '" class="mejs-shim"><param name="initParams" value="' + n.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
                    break;
                case "flash":
                    mejs.MediaFeatures.isIE ? (e = document.createElement("div"), h.appendChild(e), e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + c + '" width="' + r + '" height="' + l + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + n.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : h.innerHTML = '<embed id="' + c + '" name="' + c + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + n.join("&") + '" width="' + r + '" height="' + l + '" scale="default"class="mejs-shim"></embed>';
                    break;
                case "youtube":
                    t = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                        container: h,
                        containerId: h.id,
                        pluginMediaElement: d,
                        pluginId: c,
                        videoId: t,
                        height: l,
                        width: r
                    }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                    break;
                case "vimeo":
                    d.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), h.innerHTML = '<iframe src="//player.vimeo.com/video/' + d.vimeoid + '?portrait=0&byline=0&title=0" width="' + r + '" height="' + l + '" frameborder="0" class="mejs-shim"></iframe>'
            }
            return i.style.display = "none", i.removeAttribute("autoplay"), d
        },
        updateNative: function(e, t) {
            var i, n = e.htmlMediaElement;
            for (i in mejs.HtmlMediaElement) n[i] = mejs.HtmlMediaElement[i];
            return t.success(n, n), n
        }
    }, mejs.YouTubeApi = {
        isIframeStarted: !1,
        isIframeLoaded: !1,
        loadIframeApi: function() {
            if (!this.isIframeStarted) {
                var e = document.createElement("script");
                e.src = "//www.youtube.com/player_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
            }
        },
        iframeQueue: [],
        enqueueIframe: function(e) {
            this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
        },
        createIframe: function(e) {
            var t = e.pluginMediaElement,
                i = new YT.Player(e.containerId, {
                    height: e.height,
                    width: e.width,
                    videoId: e.videoId,
                    playerVars: {
                        controls: 0
                    },
                    events: {
                        onReady: function() {
                            e.pluginMediaElement.pluginApi = i, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function() {
                                mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                            }, 250)
                        },
                        onStateChange: function(e) {
                            mejs.YouTubeApi.handleStateChange(e.data, i, t)
                        }
                    }
                })
        },
        createEvent: function(e, t, i) {
            if (i = {
                    type: i,
                    target: t
                }, e && e.getDuration) {
                t.currentTime = i.currentTime = e.getCurrentTime(), t.duration = i.duration = e.getDuration(), i.paused = t.paused, i.ended = t.ended, i.muted = e.isMuted(), i.volume = e.getVolume() / 100, i.bytesTotal = e.getVideoBytesTotal(), i.bufferedBytes = e.getVideoBytesLoaded();
                var n = i.bufferedBytes / i.bytesTotal * i.duration;
                i.target.buffered = i.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return n
                    },
                    length: 1
                }
            }
            t.dispatchEvent(i.type, i)
        },
        iFrameReady: function() {
            for (this.isIframeLoaded = this.isLoaded = !0; this.iframeQueue.length > 0;) this.createIframe(this.iframeQueue.pop())
        },
        flashPlayers: {},
        createFlash: function(e) {
            this.flashPlayers[e.pluginId] = e;
            var t, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
            mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
        },
        flashReady: function(e) {
            var t = this.flashPlayers[e],
                i = document.getElementById(e),
                n = t.pluginMediaElement;
            n.pluginApi = n.pluginElement = i, mejs.MediaPluginBridge.initPlugin(e), i.cueVideoById(t.videoId), e = t.containerId + "_callback", window[e] = function(e) {
                mejs.YouTubeApi.handleStateChange(e, i, n)
            }, i.addEventListener("onStateChange", e), setInterval(function() {
                mejs.YouTubeApi.createEvent(i, n, "timeupdate")
            }, 250)
        },
        handleStateChange: function(e, t, i) {
            switch (e) {
                case -1:
                    i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
                    break;
                case 0:
                    i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
                    break;
                case 1:
                    i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
                    break;
                case 2:
                    i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
                    break;
                case 3:
                    mejs.YouTubeApi.createEvent(t, i, "progress")
            }
        }
    }, window.mejs = mejs, window.MediaElement = mejs.MediaElement, function(e, t) {
        var i = {
            locale: {
                language: "",
                strings: {}
            },
            methods: {}
        };
        i.getLanguage = function() {
            return (i.locale.language || window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase()
        }, "undefined" != typeof mejsL10n && (i.locale.language = mejsL10n.language), i.methods.checkPlain = function(e) {
            var t, i, n = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            e = String(e);
            for (t in n) n.hasOwnProperty(t) && (i = RegExp(t, "g"), e = e.replace(i, n[t]));
            return e
        }, i.methods.t = function(e, t) {
            return i.locale.strings && i.locale.strings[t.context] && i.locale.strings[t.context][e] && (e = i.locale.strings[t.context][e]), i.methods.checkPlain(e)
        }, i.t = function(e, t) {
            if ("string" == typeof e && e.length > 0) {
                var n = i.getLanguage();
                return t = t || {
                    context: n
                }, i.methods.t(e, t)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }, t.i18n = i
    }(document, mejs), function(e) {
        "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
    }(mejs.i18n.locale.strings), function(e) {
        "undefined" == typeof e.de && (e.de = {
            Fullscreen: "Vollbild",
            "Go Fullscreen": "Vollbild an",
            "Turn off Fullscreen": "Vollbild aus",
            Close: "Schließen"
        })
    }(mejs.i18n.locale.strings), function(e) {
        "undefined" == typeof e.zh && (e.zh = {
            Fullscreen: "全螢幕",
            "Go Fullscreen": "全屏模式",
            "Turn off Fullscreen": "退出全屏模式",
            Close: "關閉"
        })
    }(mejs.i18n.locale.strings), "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof ender && (mejs.$ = ender), function(e) {
        mejs.MepDefaults = {
                poster: "",
                showPosterWhenEnded: !1,
                defaultVideoWidth: 480,
                defaultVideoHeight: 270,
                videoWidth: -1,
                videoHeight: -1,
                defaultAudioWidth: 400,
                defaultAudioHeight: 30,
                defaultSeekBackwardInterval: function(e) {
                    return .05 * e.duration
                },
                defaultSeekForwardInterval: function(e) {
                    return .05 * e.duration
                },
                audioWidth: -1,
                audioHeight: -1,
                startVolume: .8,
                loop: !1,
                autoRewind: !0,
                enableAutosize: !0,
                alwaysShowHours: !1,
                showTimecodeFrameCount: !1,
                framesPerSecond: 25,
                autosizeProgress: !0,
                alwaysShowControls: !1,
                hideVideoControlsOnLoad: !1,
                clickToPlayPause: !0,
                iPadUseNativeControls: !1,
                iPhoneUseNativeControls: !1,
                AndroidUseNativeControls: !1,
                features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
                isVideo: !0,
                enableKeyboard: !0,
                pauseOtherPlayers: !0,
                keyActions: [{
                    keys: [32, 179],
                    action: function(e, t) {
                        t.paused || t.ended ? e.play() : e.pause()
                    }
                }, {
                    keys: [38],
                    action: function(e, t) {
                        t.setVolume(Math.min(t.volume + .1, 1))
                    }
                }, {
                    keys: [40],
                    action: function(e, t) {
                        t.setVolume(Math.max(t.volume - .1, 0))
                    }
                }, {
                    keys: [37, 227],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [39, 228],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [70],
                    action: function(e) {
                        "undefined" != typeof e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
                    }
                }]
            }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function(t, i) {
                return this instanceof mejs.MediaElementPlayer ? (this.$media = this.$node = e(t), this.node = this.media = this.$media[0], "undefined" != typeof this.node.player ? this.node.player : (this.node.player = this, "undefined" == typeof i && (i = this.$node.data("mejsoptions")), this.options = e.extend({}, mejs.MepDefaults, i), this.id = "mep_" + mejs.mepIndex++, mejs.players[this.id] = this, this.init(), this)) : new mejs.MediaElementPlayer(t, i)
            }, mejs.MediaElementPlayer.prototype = {
                hasFocus: !1,
                controlsAreVisible: !0,
                init: function() {
                    var t = this,
                        i = mejs.MediaFeatures,
                        n = e.extend(!0, {}, t.options, {
                            success: function(e, i) {
                                t.meReady(e, i)
                            },
                            error: function(e) {
                                t.handleError(e)
                            }
                        }),
                        s = t.media.tagName.toLowerCase();
                    t.isDynamic = "audio" !== s && "video" !== s, t.isVideo = t.isDynamic ? t.options.isVideo : "audio" !== s && t.options.isVideo, i.isiPad && t.options.iPadUseNativeControls || i.isiPhone && t.options.iPhoneUseNativeControls ? (t.$media.attr("controls", "controls"), i.isiPad && null !== t.media.getAttribute("autoplay") && t.play()) : i.isAndroid && t.options.AndroidUseNativeControls || (t.$media.removeAttr("controls"), t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media), t.container.addClass((i.isAndroid ? "mejs-android " : "") + (i.isiOS ? "mejs-ios " : "") + (i.isiPad ? "mejs-ipad " : "") + (i.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")), i.isiOS ? (i = t.$media.clone(), t.container.find(".mejs-mediaelement").append(i), t.$media.remove(), t.$node = t.$media = i, t.node = t.media = i[0]) : t.container.find(".mejs-mediaelement").append(t.$media), t.controls = t.container.find(".mejs-controls"), t.layers = t.container.find(".mejs-layers"), i = t.isVideo ? "video" : "audio", s = i.substring(0, 1).toUpperCase() + i.substring(1), t.width = t.options[i + "Width"] > 0 || t.options[i + "Width"].toString().indexOf("%") > -1 ? t.options[i + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.media.style.width : null !== t.media.getAttribute("width") ? t.$media.attr("width") : t.options["default" + s + "Width"], t.height = t.options[i + "Height"] > 0 || t.options[i + "Height"].toString().indexOf("%") > -1 ? t.options[i + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.$media.attr("height") : t.options["default" + s + "Height"], t.setPlayerSize(t.width, t.height), n.pluginWidth = t.width, n.pluginHeight = t.height), mejs.MediaElement(t.$media[0], n), "undefined" != typeof t.container && t.controlsAreVisible && t.container.trigger("controlsshown")
                },
                showControls: function(e) {
                    var t = this;
                    e = "undefined" == typeof e || e, t.controlsAreVisible || (e ? (t.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0, t.container.trigger("controlsshown")
                    }), t.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0
                    })) : (t.controls.css("visibility", "visible").css("display", "block"), t.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), t.controlsAreVisible = !0, t.container.trigger("controlsshown")), t.setControlsSize())
                },
                hideControls: function(t) {
                    var i = this;
                    t = "undefined" == typeof t || t, i.controlsAreVisible && !i.options.alwaysShowControls && (t ? (i.controls.stop(!0, !0).fadeOut(200, function() {
                        e(this).css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")
                    }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function() {
                        e(this).css("visibility", "hidden").css("display", "block")
                    })) : (i.controls.css("visibility", "hidden").css("display", "block"), i.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
                },
                controlsTimer: null,
                startControlsTimer: function(e) {
                    var t = this;
                    e = "undefined" != typeof e ? e : 1500, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function() {
                        t.hideControls(), t.killControlsTimer("hide")
                    }, e)
                },
                killControlsTimer: function() {
                    null !== this.controlsTimer && (clearTimeout(this.controlsTimer), delete this.controlsTimer, this.controlsTimer = null)
                },
                controlsEnabled: !0,
                disableControls: function() {
                    this.killControlsTimer(), this.hideControls(!1), this.controlsEnabled = !1
                },
                enableControls: function() {
                    this.showControls(!1), this.controlsEnabled = !0
                },
                meReady: function(e, t) {
                    var i = this,
                        n = mejs.MediaFeatures,
                        s = t.getAttribute("autoplay");
                    s = !("undefined" == typeof s || null === s || "false" === s);
                    var a;
                    if (!i.created) {
                        if (i.created = !0, i.media = e, i.domNode = t, !(n.isAndroid && i.options.AndroidUseNativeControls || n.isiPad && i.options.iPadUseNativeControls || n.isiPhone && i.options.iPhoneUseNativeControls)) {
                            i.buildposter(i, i.controls, i.layers, i.media), i.buildkeyboard(i, i.controls, i.layers, i.media), i.buildoverlays(i, i.controls, i.layers, i.media), i.findTracks();
                            for (a in i.options.features)
                                if (n = i.options.features[a], i["build" + n]) try {
                                    i["build" + n](i, i.controls, i.layers, i.media)
                                } catch (o) {}
                                i.container.trigger("controlsready"), i.setPlayerSize(i.width, i.height), i.setControlsSize(), i.isVideo && (mejs.MediaFeatures.hasTouch ? i.$media.bind("touchstart", function() {
                                i.controlsAreVisible ? i.hideControls(!1) : i.controlsEnabled && i.showControls(!1)
                            }) : (mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function() {
                                i.options.clickToPlayPause && (i.media.paused ? i.play() : i.pause())
                            }, i.media.addEventListener("click", i.clickToPlayPauseCallback, !1), i.container.bind("mouseenter mouseover", function() {
                                i.controlsEnabled && (i.options.alwaysShowControls || (i.killControlsTimer("enter"), i.showControls(), i.startControlsTimer(2500)))
                            }).bind("mousemove", function() {
                                i.controlsEnabled && (i.controlsAreVisible || i.showControls(), i.options.alwaysShowControls || i.startControlsTimer(2500))
                            }).bind("mouseleave", function() {
                                i.controlsEnabled && !i.media.paused && !i.options.alwaysShowControls && i.startControlsTimer(1e3)
                            })), i.options.hideVideoControlsOnLoad && i.hideControls(!1), s && !i.options.alwaysShowControls && i.hideControls(), i.options.enableAutosize && i.media.addEventListener("loadedmetadata", function(e) {
                                i.options.videoHeight <= 0 && null === i.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (i.setPlayerSize(e.target.videoWidth, e.target.videoHeight), i.setControlsSize(), i.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                            }, !1)), e.addEventListener("play", function() {
                                for (var e in mejs.players) {
                                    var t = mejs.players[e];
                                    t.id != i.id && i.options.pauseOtherPlayers && !t.paused && !t.ended && t.pause(), t.hasFocus = !1
                                }
                                i.hasFocus = !0
                            }, !1), i.media.addEventListener("ended", function() {
                                if (i.options.autoRewind) try {
                                    i.media.setCurrentTime(0)
                                } catch (e) {}
                                i.media.pause(), i.setProgressRail && i.setProgressRail(), i.setCurrentRail && i.setCurrentRail(), i.options.loop ? i.play() : !i.options.alwaysShowControls && i.controlsEnabled && i.showControls()
                            }, !1), i.media.addEventListener("loadedmetadata", function() {
                                i.updateDuration && i.updateDuration(), i.updateCurrent && i.updateCurrent(), i.isFullScreen || (i.setPlayerSize(i.width, i.height), i.setControlsSize())
                            }, !1), setTimeout(function() {
                                i.setPlayerSize(i.width, i.height), i.setControlsSize()
                            }, 50), i.globalBind("resize", function() {
                                i.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || i.setPlayerSize(i.width, i.height), i.setControlsSize()
                            }), "youtube" == i.media.pluginType && i.container.find(".mejs-overlay-play").hide()
                        }
                        s && "native" == e.pluginType && i.play(), i.options.success && ("string" == typeof i.options.success ? window[i.options.success](i.media, i.domNode, i) : i.options.success(i.media, i.domNode, i))
                    }
                },
                handleError: function(e) {
                    this.controls.hide(), this.options.error && this.options.error(e)
                },
                setPlayerSize: function(t, i) {
                    if ("undefined" != typeof t && (this.width = t), "undefined" != typeof i && (this.height = i), this.height.toString().indexOf("%") > 0 || "100%" === this.$node.css("max-width") || parseInt(this.$node.css("max-width").replace(/px/, ""), 10) / this.$node.offsetParent().width() === 1 || this.$node[0].currentStyle && "100%" === this.$node[0].currentStyle.maxWidth) {
                        var n = this.isVideo ? this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth : this.options.defaultAudioWidth,
                            s = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight,
                            a = this.container.parent().closest(":visible").width();
                        n = this.isVideo || !this.options.autosizeProgress ? parseInt(a * s / n, 10) : s, "body" === this.container.parent()[0].tagName.toLowerCase() && (a = e(window).width(), n = e(window).height()), 0 != n && 0 != a && (this.container.width(a).height(n), this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%"), this.isVideo && this.media.setVideoSize && this.media.setVideoSize(a, n), this.layers.children(".mejs-layer").width("100%").height("100%"))
                    } else this.container.width(this.width).height(this.height), this.layers.children(".mejs-layer").width(this.width).height(this.height);
                    a = this.layers.find(".mejs-overlay-play"), n = a.find(".mejs-overlay-button"), a.height(this.container.height() - this.controls.height()), n.css("margin-top", "-" + (n.height() / 2 - this.controls.height() / 2).toString() + "px")
                },
                setControlsSize: function() {
                    var t = 0,
                        i = 0,
                        n = this.controls.find(".mejs-time-rail"),
                        s = this.controls.find(".mejs-time-total");
                    this.controls.find(".mejs-time-current"), this.controls.find(".mejs-time-loaded");
                    var a = n.siblings();
                    this.options && !this.options.autosizeProgress && (i = parseInt(n.css("width"))), 0 !== i && i || (a.each(function() {
                        var i = e(this);
                        "absolute" != i.css("position") && i.is(":visible") && (t += e(this).outerWidth(!0))
                    }), i = this.controls.width() - t - (n.outerWidth(!0) - n.width())), n.width(i), s.width(i - (s.outerWidth(!0) - s.width())), this.setProgressRail && this.setProgressRail(), this.setCurrentRail && this.setCurrentRail()
                },
                buildposter: function(t, i, n, s) {
                    var a = e('<div class="mejs-poster mejs-layer"></div>').appendTo(n);
                    i = t.$media.attr("poster"), "" !== t.options.poster && (i = t.options.poster), "" !== i && null != i ? this.setPoster(i) : a.hide(), s.addEventListener("play", function() {
                        a.hide()
                    }, !1), t.options.showPosterWhenEnded && t.options.autoRewind && s.addEventListener("ended", function() {
                        a.show()
                    }, !1)
                },
                setPoster: function(t) {
                    var i = this.container.find(".mejs-poster"),
                        n = i.find("img");
                    0 == n.length && (n = e('<img width="100%" height="100%" />').appendTo(i)), n.attr("src", t), i.css({
                        "background-image": "url(" + t + ")"
                    })
                },
                buildoverlays: function(t, i, n, s) {
                    var a = this;
                    if (t.isVideo) {
                        var o = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                            r = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                            l = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).bind("click touchstart", function() {
                                a.options.clickToPlayPause && s.paused && a.play()
                            });
                        s.addEventListener("play", function() {
                            l.hide(), o.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), s.addEventListener("playing", function() {
                            l.hide(), o.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), s.addEventListener("seeking", function() {
                            o.show(), i.find(".mejs-time-buffering").show()
                        }, !1), s.addEventListener("seeked", function() {
                            o.hide(), i.find(".mejs-time-buffering").hide()
                        }, !1), s.addEventListener("pause", function() {
                            mejs.MediaFeatures.isiPhone || l.show()
                        }, !1), s.addEventListener("waiting", function() {
                            o.show(), i.find(".mejs-time-buffering").show()
                        }, !1), s.addEventListener("loadeddata", function() {
                            o.show(), i.find(".mejs-time-buffering").show()
                        }, !1), s.addEventListener("canplay", function() {
                            o.hide(), i.find(".mejs-time-buffering").hide()
                        }, !1), s.addEventListener("error", function() {
                            o.hide(), i.find(".mejs-time-buffering").hide(), r.show(), r.find("mejs-overlay-error").html("Error loading this resource")
                        }, !1)
                    }
                },
                buildkeyboard: function(t, i, n, s) {
                    this.globalBind("keydown", function(e) {
                        if (t.hasFocus && t.options.enableKeyboard)
                            for (var i = 0, n = t.options.keyActions.length; n > i; i++)
                                for (var a = t.options.keyActions[i], o = 0, r = a.keys.length; r > o; o++)
                                    if (e.keyCode == a.keys[o]) return e.preventDefault(), a.action(t, s, e.keyCode), !1;
                        return !0
                    }), this.globalBind("click", function(i) {
                        0 == e(i.target).closest(".mejs-container").length && (t.hasFocus = !1)
                    })
                },
                findTracks: function() {
                    var t = this,
                        i = t.$media.find("track");
                    t.tracks = [], i.each(function(i, n) {
                        n = e(n), t.tracks.push({
                            srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                            src: n.attr("src"),
                            kind: n.attr("kind"),
                            label: n.attr("label") || "",
                            entries: [],
                            isLoaded: !1
                        })
                    })
                },
                changeSkin: function(e) {
                    this.container[0].className = "mejs-container " + e, this.setPlayerSize(this.width, this.height), this.setControlsSize()
                },
                play: function() {
                    this.load(), this.media.play()
                },
                pause: function() {
                    try {
                        this.media.pause()
                    } catch (e) {}
                },
                load: function() {
                    this.isLoaded || this.media.load(), this.isLoaded = !0
                },
                setMuted: function(e) {
                    this.media.setMuted(e)
                },
                setCurrentTime: function(e) {
                    this.media.setCurrentTime(e)
                },
                getCurrentTime: function() {
                    return this.media.currentTime
                },
                setVolume: function(e) {
                    this.media.setVolume(e)
                },
                getVolume: function() {
                    return this.media.volume
                },
                setSrc: function(e) {
                    this.media.setSrc(e)
                },
                remove: function() {
                    var e, t;
                    for (e in this.options.features)
                        if (t = this.options.features[e], this["clean" + t]) try {
                            this["clean" + t](this)
                        } catch (i) {}
                        this.isDynamic ? this.$node.insertBefore(this.container) : (this.$media.prop("controls", !0), this.$node.clone().show().insertBefore(this.container), this.$node.remove()), "native" !== this.media.pluginType && this.media.remove(), delete mejs.players[this.id], this.container.remove(), this.globalUnbind(), delete this.node.player
                }
            },
            function() {
                function t(t, n) {
                    var s = {
                        d: [],
                        w: []
                    };
                    return e.each((t || "").split(" "), function(e, t) {
                        var a = t + "." + n;
                        0 === a.indexOf(".") ? (s.d.push(a), s.w.push(a)) : s[i.test(t) ? "w" : "d"].push(a)
                    }), s.d = s.d.join(" "), s.w = s.w.join(" "), s
                }
                var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
                mejs.MediaElementPlayer.prototype.globalBind = function(i, n, s) {
                    i = t(i, this.id), i.d && e(document).bind(i.d, n, s), i.w && e(window).bind(i.w, n, s)
                }, mejs.MediaElementPlayer.prototype.globalUnbind = function(i, n) {
                    i = t(i, this.id), i.d && e(document).unbind(i.d, n), i.w && e(window).unbind(i.w, n)
                }
            }(), "undefined" != typeof jQuery && (jQuery.fn.mediaelementplayer = function(e) {
                return this.each(e === !1 ? function() {
                    var e = jQuery(this).data("mediaelementplayer");
                    e && e.remove(), jQuery(this).removeData("mediaelementplayer")
                } : function() {
                    jQuery(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, e))
                }), this
            }), e(document).ready(function() {
                e(".mejs-player").mediaelementplayer()
            }), window.MediaElementPlayer = mejs.MediaElementPlayer
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            playpauseText: mejs.i18n.t("Play/Pause")
        }), e.extend(MediaElementPlayer.prototype, {
            buildplaypause: function(t, i, n, s) {
                var a = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(i).click(function(e) {
                    return e.preventDefault(), s.paused ? s.play() : s.pause(), !1
                });
                s.addEventListener("play", function() {
                    a.removeClass("mejs-play").addClass("mejs-pause")
                }, !1), s.addEventListener("playing", function() {
                    a.removeClass("mejs-play").addClass("mejs-pause")
                }, !1), s.addEventListener("pause", function() {
                    a.removeClass("mejs-pause").addClass("mejs-play")
                }, !1), s.addEventListener("paused", function() {
                    a.removeClass("mejs-pause").addClass("mejs-play")
                }, !1)
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            stopText: "Stop"
        }), e.extend(MediaElementPlayer.prototype, {
            buildstop: function(t, i, n, s) {
                e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(i).click(function() {
                    s.paused || s.pause(), s.currentTime > 0 && (s.setCurrentTime(0), s.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)), n.find(".mejs-poster").show())
                })
            }
        })
    }(mejs.$), function(e) {
        e.extend(MediaElementPlayer.prototype, {
            buildprogress: function(t, i, n, s) {
                e('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i), i.find(".mejs-time-buffering").hide();
                var a = this,
                    o = i.find(".mejs-time-total");
                n = i.find(".mejs-time-loaded");
                var r = i.find(".mejs-time-current"),
                    l = i.find(".mejs-time-handle"),
                    c = i.find(".mejs-time-float"),
                    d = i.find(".mejs-time-float-current"),
                    h = function(e) {
                        e = e.pageX;
                        var t = o.offset(),
                            i = o.outerWidth(!0),
                            n = 0,
                            a = n = 0;
                        s.duration && (e < t.left ? e = t.left : e > i + t.left && (e = i + t.left), a = e - t.left, n = a / i, n = .02 >= n ? 0 : n * s.duration, u && n !== s.currentTime && s.setCurrentTime(n), mejs.MediaFeatures.hasTouch || (c.css("left", a), d.html(mejs.Utility.secondsToTimeCode(n)), c.show()))
                    },
                    u = !1;
                o.bind("mousedown", function(e) {
                    return 1 === e.which ? (u = !0, h(e), a.globalBind("mousemove.dur", function(e) {
                        h(e)
                    }), a.globalBind("mouseup.dur", function() {
                        u = !1, c.hide(), a.globalUnbind(".dur")
                    }), !1) : void 0
                }).bind("mouseenter", function() {
                    a.globalBind("mousemove.dur", function(e) {
                        h(e)
                    }), mejs.MediaFeatures.hasTouch || c.show()
                }).bind("mouseleave", function() {
                    u || (a.globalUnbind(".dur"), c.hide())
                }), s.addEventListener("progress", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e)
                }, !1), s.addEventListener("timeupdate", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e)
                }, !1), a.loaded = n, a.total = o, a.current = r, a.handle = l
            },
            setProgressRail: function(e) {
                var t = void 0 != e ? e.target : this.media,
                    i = null;
                t && t.buffered && t.buffered.length > 0 && t.buffered.end && t.duration ? i = t.buffered.end(0) / t.duration : t && void 0 != t.bytesTotal && t.bytesTotal > 0 && void 0 != t.bufferedBytes ? i = t.bufferedBytes / t.bytesTotal : e && e.lengthComputable && 0 != e.total && (i = e.loaded / e.total), null !== i && (i = Math.min(1, Math.max(0, i)), this.loaded && this.total && this.loaded.width(this.total.width() * i))
            },
            setCurrentRail: function() {
                if (void 0 != this.media.currentTime && this.media.duration && this.total && this.handle) {
                    var e = Math.round(this.total.width() * this.media.currentTime / this.media.duration),
                        t = e - Math.round(this.handle.outerWidth(!0) / 2);
                    this.current.width(e), this.handle.css("left", t)
                }
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            duration: -1,
            timeAndDurationSeparator: "<span> | </span>"
        }), e.extend(MediaElementPlayer.prototype, {
            buildcurrent: function(t, i, n, s) {
                e('<div class="mejs-time"><span class="mejs-currenttime">' + (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(i), this.currenttime = this.controls.find(".mejs-currenttime"), s.addEventListener("timeupdate", function() {
                    t.updateCurrent()
                }, !1)
            },
            buildduration: function(t, i, n, s) {
                i.children().last().find(".mejs-currenttime").length > 0 ? e(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"),
                    e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(i)), this.durationD = this.controls.find(".mejs-duration"), s.addEventListener("timeupdate", function() {
                    t.updateDuration()
                }, !1)
            },
            updateCurrent: function() {
                this.currenttime && this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
            },
            updateDuration: function() {
                this.container.toggleClass("mejs-long-video", this.media.duration > 3600), this.durationD && (this.options.duration > 0 || this.media.duration) && this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration : this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            muteText: mejs.i18n.t("Mute Toggle"),
            hideVolumeOnTouchDevices: !0,
            audioVolume: "horizontal",
            videoVolume: "vertical"
        }), e.extend(MediaElementPlayer.prototype, {
            buildvolume: function(t, i, n, s) {
                if (!mejs.MediaFeatures.hasTouch || !this.options.hideVolumeOnTouchDevices) {
                    var a = this,
                        o = a.isVideo ? a.options.videoVolume : a.options.audioVolume,
                        r = "horizontal" == o ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + a.id + '" title="' + a.options.muteText + '" aria-label="' + a.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(i) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + a.id + '" title="' + a.options.muteText + '" aria-label="' + a.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(i),
                        l = a.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                        c = a.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                        d = a.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                        h = a.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                        u = function(e, t) {
                            if (l.is(":visible") || "undefined" != typeof t)
                                if (e = Math.max(0, e), e = Math.min(e, 1), 0 == e ? r.removeClass("mejs-mute").addClass("mejs-unmute") : r.removeClass("mejs-unmute").addClass("mejs-mute"), "vertical" == o) {
                                    var i = c.height(),
                                        n = c.position(),
                                        s = i - i * e;
                                    h.css("top", Math.round(n.top + s - h.height() / 2)), d.height(i - s), d.css("top", n.top + s)
                                } else i = c.width(), n = c.position(), i *= e, h.css("left", Math.round(n.left + i - h.width() / 2)), d.width(Math.round(i));
                            else l.show(), u(e, !0), l.hide()
                        },
                        p = function(e) {
                            var t = null,
                                i = c.offset();
                            if ("vertical" == o) {
                                if (t = c.height(), parseInt(c.css("top").replace(/px/, ""), 10), t = (t - (e.pageY - i.top)) / t, 0 == i.top || 0 == i.left) return
                            } else t = c.width(), t = (e.pageX - i.left) / t;
                            t = Math.max(0, t), t = Math.min(t, 1), u(t), s.setMuted(0 == t ? !0 : !1), s.setVolume(t)
                        },
                        f = !1,
                        m = !1;
                    r.hover(function() {
                        l.show(), m = !0
                    }, function() {
                        m = !1, !f && "vertical" == o && l.hide()
                    }), l.bind("mouseover", function() {
                        m = !0
                    }).bind("mousedown", function(e) {
                        return p(e), a.globalBind("mousemove.vol", function(e) {
                            p(e)
                        }), a.globalBind("mouseup.vol", function() {
                            f = !1, a.globalUnbind(".vol"), !m && "vertical" == o && l.hide()
                        }), f = !0, !1
                    }), r.find("button").click(function() {
                        s.setMuted(!s.muted)
                    }), s.addEventListener("volumechange", function() {
                        f || (s.muted ? (u(0), r.removeClass("mejs-mute").addClass("mejs-unmute")) : (u(s.volume), r.removeClass("mejs-unmute").addClass("mejs-mute")))
                    }, !1), a.container.is(":visible") && (u(t.options.startVolume), 0 === t.options.startVolume && s.setMuted(!0), "native" === s.pluginType && s.setVolume(t.options.startVolume))
                }
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            usePluginFullScreen: !0,
            newWindowCallback: function() {
                return ""
            },
            fullscreenText: mejs.i18n.t("Fullscreen")
        }), e.extend(MediaElementPlayer.prototype, {
            isFullScreen: !1,
            isNativeFullScreen: !1,
            isInIframe: !1,
            buildfullscreen: function(t, i, n, s) {
                if (t.isVideo) {
                    t.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen && (n = function() {
                        t.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0, t.setControlsSize()) : (t.isNativeFullScreen = !1, t.exitFullScreen()))
                    }, mejs.MediaFeatures.hasMozNativeFullScreen ? t.globalBind(mejs.MediaFeatures.fullScreenEventName, n) : t.container.bind(mejs.MediaFeatures.fullScreenEventName, n));
                    var a = this,
                        o = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>').appendTo(i);
                    if ("native" === a.media.pluginType || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) o.click(function() {
                        mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen()
                    });
                    else {
                        var r = null;
                        if (function() {
                                var e = document.createElement("x"),
                                    t = document.documentElement,
                                    i = window.getComputedStyle;
                                return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", t.appendChild(e), i = i && "auto" === i(e, "").pointerEvents, t.removeChild(e), !!i) : !1
                            }() && !mejs.MediaFeatures.isOpera) {
                            var l = !1,
                                c = function() {
                                    if (l) {
                                        for (var e in d) d[e].hide();
                                        o.css("pointer-events", ""), a.controls.css("pointer-events", ""), a.media.removeEventListener("click", a.clickToPlayPauseCallback), l = !1
                                    }
                                },
                                d = {};
                            i = ["top", "left", "right", "bottom"];
                            var h, u = function() {
                                var e = o.offset().left - a.container.offset().left,
                                    t = o.offset().top - a.container.offset().top,
                                    i = o.outerWidth(!0),
                                    n = o.outerHeight(!0),
                                    s = a.container.width(),
                                    r = a.container.height();
                                for (h in d) d[h].css({
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                });
                                d.top.width(s).height(t), d.left.width(e).height(n).css({
                                    top: t
                                }), d.right.width(s - e - i).height(n).css({
                                    top: t,
                                    left: e + i
                                }), d.bottom.width(s).height(r - n - t).css({
                                    top: t + n
                                })
                            };
                            for (a.globalBind("resize", function() {
                                    u()
                                }), h = 0, n = i.length; n > h; h++) d[i[h]] = e('<div class="mejs-fullscreen-hover" />').appendTo(a.container).mouseover(c).hide();
                            o.on("mouseover", function() {
                                if (!a.isFullScreen) {
                                    var e = o.offset(),
                                        i = t.container.offset();
                                    s.positionFullscreenButton(e.left - i.left, e.top - i.top, !1), o.css("pointer-events", "none"), a.controls.css("pointer-events", "none"), a.media.addEventListener("click", a.clickToPlayPauseCallback);
                                    for (h in d) d[h].show();
                                    u(), l = !0
                                }
                            }), s.addEventListener("fullscreenchange", function() {
                                a.isFullScreen = !a.isFullScreen, a.isFullScreen ? a.media.removeEventListener("click", a.clickToPlayPauseCallback) : a.media.addEventListener("click", a.clickToPlayPauseCallback), c()
                            }), a.globalBind("mousemove", function(e) {
                                if (l) {
                                    var t = o.offset();
                                    (e.pageY < t.top || e.pageY > t.top + o.outerHeight(!0) || e.pageX < t.left || e.pageX > t.left + o.outerWidth(!0)) && (o.css("pointer-events", ""), a.controls.css("pointer-events", ""), l = !1)
                                }
                            })
                        } else o.on("mouseover", function() {
                            null !== r && (clearTimeout(r), delete r);
                            var e = o.offset(),
                                i = t.container.offset();
                            s.positionFullscreenButton(e.left - i.left, e.top - i.top, !0)
                        }).on("mouseout", function() {
                            null !== r && (clearTimeout(r), delete r), r = setTimeout(function() {
                                s.hideFullscreenButton()
                            }, 1500)
                        })
                    }
                    t.fullscreenBtn = o, a.globalBind("keydown", function(e) {
                        (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || a.isFullScreen) && 27 == e.keyCode && t.exitFullScreen()
                    })
                }
            },
            cleanfullscreen: function(e) {
                e.exitFullScreen()
            },
            containerSizeTimeout: null,
            enterFullScreen: function() {
                var t = this;
                if ("native" === t.media.pluginType || !mejs.MediaFeatures.isFirefox && !t.options.usePluginFullScreen) {
                    if (e(document.documentElement).addClass("mejs-fullscreen"), normalHeight = t.container.height(), normalWidth = t.container.width(), "native" === t.media.pluginType)
                        if (mejs.MediaFeatures.hasTrueNativeFullScreen) mejs.MediaFeatures.requestFullScreen(t.container[0]), t.isInIframe && setTimeout(function n() {
                            t.isNativeFullScreen && (e(window).width() !== screen.width ? t.exitFullScreen() : setTimeout(n, 500))
                        }, 500);
                        else if (mejs.MediaFeatures.hasSemiNativeFullScreen) return void t.media.webkitEnterFullscreen();
                    if (t.isInIframe) {
                        var i = t.options.newWindowCallback(this);
                        if ("" !== i) {
                            if (!mejs.MediaFeatures.hasTrueNativeFullScreen) return t.pause(), void window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                            setTimeout(function() {
                                t.isNativeFullScreen || (t.pause(), window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                            }, 250)
                        }
                    }
                    t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), t.containerSizeTimeout = setTimeout(function() {
                        t.container.css({
                            width: "100%",
                            height: "100%"
                        }), t.setControlsSize()
                    }, 500), "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"), t.media.setVideoSize(e(window).width(), e(window).height())), t.layers.children("div").width("100%").height("100%"), t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), t.setControlsSize(), t.isFullScreen = !0
                }
            },
            exitFullScreen: function() {
                clearTimeout(this.containerSizeTimeout), "native" !== this.media.pluginType && mejs.MediaFeatures.isFirefox ? this.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), e(document.documentElement).removeClass("mejs-fullscreen"), this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight), "native" === this.media.pluginType ? this.$media.width(normalWidth).height(normalHeight) : (this.container.find(".mejs-shim").width(normalWidth).height(normalHeight), this.media.setVideoSize(normalWidth, normalHeight)), this.layers.children("div").width(normalWidth).height(normalHeight), this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), this.setControlsSize(), this.isFullScreen = !1)
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            startLanguage: "",
            tracksText: mejs.i18n.t("Captions/Subtitles"),
            hideCaptionsButtonWhenEmpty: !0,
            toggleCaptionsButtonWhenOnlyOne: !1,
            slidesSelector: ""
        }), e.extend(MediaElementPlayer.prototype, {
            hasChapters: !1,
            buildtracks: function(t, i, n, s) {
                if (0 != t.tracks.length) {
                    var a;
                    if (this.domNode.textTracks)
                        for (a = this.domNode.textTracks.length - 1; a >= 0; a--) this.domNode.textTracks[a].mode = "hidden";
                    for (t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(), t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(), t.captionsText = t.captions.find(".mejs-captions-text"), t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i), a = i = 0; a < t.tracks.length; a++) "subtitles" == t.tracks[a].kind && i++;
                    for (this.options.toggleCaptionsButtonWhenOnlyOne && 1 == i ? t.captionsButton.on("click", function() {
                            t.setTrack(null == t.selectedTrack ? t.tracks[0].srclang : "none")
                        }) : t.captionsButton.hover(function() {
                            e(this).find(".mejs-captions-selector").css("visibility", "visible")
                        }, function() {
                            e(this).find(".mejs-captions-selector").css("visibility", "hidden")
                        }).on("click", "input[type=radio]", function() {
                            lang = this.value, t.setTrack(lang)
                        }), t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function() {
                            t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                        }).bind("controlshidden", function() {
                            s.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                        }), t.trackToLoad = -1, t.selectedTrack = null, t.isLoadingTrack = !1, a = 0; a < t.tracks.length; a++) "subtitles" == t.tracks[a].kind && t.addTrackButton(t.tracks[a].srclang, t.tracks[a].label);
                    t.loadNextTrack(), s.addEventListener("timeupdate", function() {
                        t.displayCaptions()
                    }, !1), "" != t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector), s.addEventListener("timeupdate", function() {
                        t.displaySlides()
                    }, !1)), s.addEventListener("loadedmetadata", function() {
                        t.displayChapters()
                    }, !1), t.container.hover(function() {
                        t.hasChapters && (t.chapters.css("visibility", "visible"), t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                    }, function() {
                        t.hasChapters && !s.paused && t.chapters.fadeOut(200, function() {
                            e(this).css("visibility", "hidden"), e(this).css("display", "block")
                        })
                    }), null !== t.node.getAttribute("autoplay") && t.chapters.css("visibility", "hidden")
                }
            },
            setTrack: function(e) {
                var t;
                if ("none" == e) this.selectedTrack = null, this.captionsButton.removeClass("mejs-captions-enabled");
                else
                    for (t = 0; t < this.tracks.length; t++)
                        if (this.tracks[t].srclang == e) {
                            null == this.selectedTrack && this.captionsButton.addClass("mejs-captions-enabled"), this.selectedTrack = this.tracks[t], this.captions.attr("lang", this.selectedTrack.srclang), this.displayCaptions();
                            break
                        }
            },
            loadNextTrack: function() {
                this.trackToLoad++, this.trackToLoad < this.tracks.length ? (this.isLoadingTrack = !0, this.loadTrack(this.trackToLoad)) : (this.isLoadingTrack = !1, this.checkForTracks())
            },
            loadTrack: function(t) {
                var i = this,
                    n = i.tracks[t];
                e.ajax({
                    url: n.src,
                    dataType: "text",
                    success: function(e) {
                        n.entries = "string" == typeof e && /<tt\s+xml/gi.exec(e) ? mejs.TrackFormatParser.dfxp.parse(e) : mejs.TrackFormatParser.webvvt.parse(e), n.isLoaded = !0, i.enableTrackButton(n.srclang, n.label), i.loadNextTrack(), "chapters" == n.kind && i.media.addEventListener("play", function() {
                            i.media.duration > 0 && i.displayChapters(n)
                        }, !1), "slides" == n.kind && i.setupSlides(n)
                    },
                    error: function() {
                        i.loadNextTrack()
                    }
                })
            },
            enableTrackButton: function(t, i) {
                "" === i && (i = mejs.language.codes[t] || t), this.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(i), this.options.startLanguage == t && e("#" + this.id + "_captions_" + t).click(), this.adjustLanguageBox()
            },
            addTrackButton: function(t, i) {
                "" === i && (i = mejs.language.codes[t] || t), this.captionsButton.find("ul").append(e('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + this.id + "_captions_" + t + '">' + i + " (loading)</label></li>")), this.adjustLanguageBox(), this.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
            },
            adjustLanguageBox: function() {
                this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + this.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
            },
            checkForTracks: function() {
                var e = !1;
                if (this.options.hideCaptionsButtonWhenEmpty) {
                    for (i = 0; i < this.tracks.length; i++)
                        if ("subtitles" == this.tracks[i].kind) {
                            e = !0;
                            break
                        }
                    e || (this.captionsButton.hide(), this.setControlsSize())
                }
            },
            displayCaptions: function() {
                if ("undefined" != typeof this.tracks) {
                    var e, t = this.selectedTrack;
                    if (null != t && t.isLoaded)
                        for (e = 0; e < t.entries.times.length; e++)
                            if (this.media.currentTime >= t.entries.times[e].start && this.media.currentTime <= t.entries.times[e].stop) return this.captionsText.html(t.entries.text[e]), void this.captions.show().height(0);
                    this.captions.hide()
                }
            },
            setupSlides: function(e) {
                this.slides = e, this.slides.entries.imgs = [this.slides.entries.text.length], this.showSlide(0)
            },
            showSlide: function(t) {
                if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                    var i = this,
                        n = i.slides.entries.text[t],
                        s = i.slides.entries.imgs[t];
                    "undefined" == typeof s || "undefined" == typeof s.fadeIn ? i.slides.entries.imgs[t] = s = e('<img src="' + n + '">').on("load", function() {
                        s.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                    }) : !s.is(":visible") && !s.is(":animated") && s.fadeIn().siblings(":visible").fadeOut()
                }
            },
            displaySlides: function() {
                if ("undefined" != typeof this.slides) {
                    var e, t = this.slides;
                    for (e = 0; e < t.entries.times.length; e++)
                        if (this.media.currentTime >= t.entries.times[e].start && this.media.currentTime <= t.entries.times[e].stop) {
                            this.showSlide(e);
                            break
                        }
                }
            },
            displayChapters: function() {
                var e;
                for (e = 0; e < this.tracks.length; e++)
                    if ("chapters" == this.tracks[e].kind && this.tracks[e].isLoaded) {
                        this.drawChapters(this.tracks[e]), this.hasChapters = !0;
                        break
                    }
            },
            drawChapters: function(t) {
                var i, n, s = this,
                    a = n = 0;
                for (s.chapters.empty(), i = 0; i < t.entries.times.length; i++) n = t.entries.times[i].stop - t.entries.times[i].start, n = Math.floor(n / s.media.duration * 100), (n + a > 100 || i == t.entries.times.length - 1 && 100 > n + a) && (n = 100 - a), s.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[i].start + '" style="left: ' + a.toString() + "%;width: " + n.toString() + '%;"><div class="mejs-chapter-block' + (i == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[i].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[i].stop) + "</span></div></div>")), a += n;
                s.chapters.find("div.mejs-chapter").click(function() {
                    s.media.setCurrentTime(parseFloat(e(this).attr("rel"))), s.media.paused && s.media.play()
                }), s.chapters.show()
            }
        }), mejs.language = {
            codes: {
                af: "Afrikaans",
                sq: "Albanian",
                ar: "Arabic",
                be: "Belarusian",
                bg: "Bulgarian",
                ca: "Catalan",
                zh: "Chinese",
                "zh-cn": "Chinese Simplified",
                "zh-tw": "Chinese Traditional",
                hr: "Croatian",
                cs: "Czech",
                da: "Danish",
                nl: "Dutch",
                en: "English",
                et: "Estonian",
                tl: "Filipino",
                fi: "Finnish",
                fr: "French",
                gl: "Galician",
                de: "German",
                el: "Greek",
                ht: "Haitian Creole",
                iw: "Hebrew",
                hi: "Hindi",
                hu: "Hungarian",
                is: "Icelandic",
                id: "Indonesian",
                ga: "Irish",
                it: "Italian",
                ja: "Japanese",
                ko: "Korean",
                lv: "Latvian",
                lt: "Lithuanian",
                mk: "Macedonian",
                ms: "Malay",
                mt: "Maltese",
                no: "Norwegian",
                fa: "Persian",
                pl: "Polish",
                pt: "Portuguese",
                ro: "Romanian",
                ru: "Russian",
                sr: "Serbian",
                sk: "Slovak",
                sl: "Slovenian",
                es: "Spanish",
                sw: "Swahili",
                sv: "Swedish",
                tl: "Tagalog",
                th: "Thai",
                tr: "Turkish",
                uk: "Ukrainian",
                vi: "Vietnamese",
                cy: "Welsh",
                yi: "Yiddish"
            }
        }, mejs.TrackFormatParser = {
            webvvt: {
                pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
                pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
                parse: function(t) {
                    var i = 0;
                    t = mejs.TrackFormatParser.split2(t, /\r?\n/);
                    for (var n, s, a = {
                            text: [],
                            times: []
                        }; i < t.length; i++)
                        if (this.pattern_identifier.exec(t[i]) && (i++, (n = this.pattern_timecode.exec(t[i])) && i < t.length)) {
                            for (i++, s = t[i], i++;
                                "" !== t[i] && i < t.length;) s = s + "\n" + t[i], i++;
                            s = e.trim(s).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), a.text.push(s), a.times.push({
                                start: 0 == mejs.Utility.convertSMPTEtoSeconds(n[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(n[1]),
                                stop: mejs.Utility.convertSMPTEtoSeconds(n[3]),
                                settings: n[5]
                            })
                        }
                    return a
                }
            },
            dfxp: {
                parse: function(t) {
                    t = e(t).filter("tt");
                    var i = 0;
                    i = t.children("div").eq(0);
                    var n = i.find("p");
                    i = t.find("#" + i.attr("style"));
                    var s, a;
                    if (t = {
                            text: [],
                            times: []
                        }, i.length && (a = i.removeAttr("id").get(0).attributes, a.length))
                        for (s = {}, i = 0; i < a.length; i++) s[a[i].name.split(":")[1]] = a[i].value;
                    for (i = 0; i < n.length; i++) {
                        var o;
                        if (a = {
                                start: null,
                                stop: null,
                                style: null
                            }, n.eq(i).attr("begin") && (a.start = mejs.Utility.convertSMPTEtoSeconds(n.eq(i).attr("begin"))), !a.start && n.eq(i - 1).attr("end") && (a.start = mejs.Utility.convertSMPTEtoSeconds(n.eq(i - 1).attr("end"))), n.eq(i).attr("end") && (a.stop = mejs.Utility.convertSMPTEtoSeconds(n.eq(i).attr("end"))), !a.stop && n.eq(i + 1).attr("begin") && (a.stop = mejs.Utility.convertSMPTEtoSeconds(n.eq(i + 1).attr("begin"))), s) {
                            o = "";
                            for (var r in s) o += r + ":" + s[r] + ";"
                        }
                        o && (a.style = o), 0 == a.start && (a.start = .2), t.times.push(a), a = e.trim(n.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), t.text.push(a), 0 == t.times.start && (t.times.start = 2)
                    }
                    return t
                }
            },
            split2: function(e, t) {
                return e.split(t)
            }
        }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function(e, t) {
            var i, n = [],
                s = "";
            for (i = 0; i < e.length; i++) s += e.substring(i, i + 1), t.test(s) && (n.push(s.replace(t, "")), s = "");
            return n.push(s), n
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            contextMenuItems: [{
                render: function(e) {
                    return "undefined" == typeof e.enterFullScreen ? null : mejs.i18n.t(e.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen")
                },
                click: function(e) {
                    e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
                }
            }, {
                render: function(e) {
                    return mejs.i18n.t(e.media.muted ? "Unmute" : "Mute")
                },
                click: function(e) {
                    e.setMuted(e.media.muted ? !1 : !0)
                }
            }, {
                isSeparator: !0
            }, {
                render: function() {
                    return mejs.i18n.t("Download Video")
                },
                click: function(e) {
                    window.location.href = e.media.currentSrc
                }
            }]
        }), e.extend(MediaElementPlayer.prototype, {
            buildcontextmenu: function(t) {
                t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(), t.container.bind("contextmenu", function(e) {
                    return t.isContextMenuEnabled ? (e.preventDefault(), t.renderContextMenu(e.clientX - 1, e.clientY - 1), !1) : void 0
                }), t.container.bind("click", function() {
                    t.contextMenu.hide()
                }), t.contextMenu.bind("mouseleave", function() {
                    t.startContextMenuTimer()
                })
            },
            cleancontextmenu: function(e) {
                e.contextMenu.remove()
            },
            isContextMenuEnabled: !0,
            enableContextMenu: function() {
                this.isContextMenuEnabled = !0
            },
            disableContextMenu: function() {
                this.isContextMenuEnabled = !1
            },
            contextMenuTimeout: null,
            startContextMenuTimer: function() {
                var e = this;
                e.killContextMenuTimer(), e.contextMenuTimer = setTimeout(function() {
                    e.hideContextMenu(), e.killContextMenuTimer()
                }, 750)
            },
            killContextMenuTimer: function() {
                var e = this.contextMenuTimer;
                null != e && (clearTimeout(e), delete e)
            },
            hideContextMenu: function() {
                this.contextMenu.hide()
            },
            renderContextMenu: function(t, i) {
                for (var n = this, s = "", a = n.options.contextMenuItems, o = 0, r = a.length; r > o; o++)
                    if (a[o].isSeparator) s += '<div class="mejs-contextmenu-separator"></div>';
                    else {
                        var l = a[o].render(n);
                        null != l && (s += '<div class="mejs-contextmenu-item" data-itemindex="' + o + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
                    }
                n.contextMenu.empty().append(e(s)).css({
                    top: i,
                    left: t
                }).show(), n.contextMenu.find(".mejs-contextmenu-item").each(function() {
                    var t = e(this),
                        i = parseInt(t.data("itemindex"), 10),
                        s = n.options.contextMenuItems[i];
                    "undefined" != typeof s.show && s.show(t, n), t.click(function() {
                        "undefined" != typeof s.click && s.click(n), n.contextMenu.hide()
                    })
                }), setTimeout(function() {
                    n.killControlsTimer("rev3")
                }, 100)
            }
        })
    }(mejs.$), function(e) {
        e.extend(mejs.MepDefaults, {
            postrollCloseText: mejs.i18n.t("Close")
        }), e.extend(MediaElementPlayer.prototype, {
            buildpostroll: function(t, i, n) {
                var s = this.container.find('link[rel="postroll"]').attr("href");
                "undefined" != typeof s && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), this.media.addEventListener("ended", function() {
                    e.ajax({
                        dataType: "html",
                        url: s,
                        success: function(e) {
                            n.find(".mejs-postroll-layer-content").html(e)
                        }
                    }), t.postroll.show()
                }, !1))
            }
        })
    }(mejs.$), navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}