/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: February 7, 2016
 */
!(function () {
  "use strict";
  function e(e) {
    e.fn.swiper = function (a) {
      var s;
      return (
        e(this).each(function () {
          var e = new t(this, a);
          s || (s = e);
        }),
        s
      );
    };
  }
  var a,
    t = function (e, s) {
      function r(e) {
        return Math.floor(e);
      }
      function i() {
        y.autoplayTimeoutId = setTimeout(function () {
          y.params.loop
            ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y))
            : y.isEnd
            ? s.autoplayStopOnLast
              ? y.stopAutoplay()
              : (y._slideTo(0), y.emit("onAutoplay", y))
            : (y._slideNext(), y.emit("onAutoplay", y));
        }, y.params.autoplay);
      }
      function n(e, t) {
        var s = a(e.target);
        if (!s.is(t))
          if ("string" == typeof t) s = s.parents(t);
          else if (t.nodeType) {
            var r;
            return (
              s.parents().each(function (e, a) {
                a === t && (r = t);
              }),
              r ? t : void 0
            );
          }
        if (0 !== s.length) return s[0];
      }
      function o(e, a) {
        a = a || {};
        var t = window.MutationObserver || window.WebkitMutationObserver,
          s = new t(function (e) {
            e.forEach(function (e) {
              y.onResize(!0), y.emit("onObserverUpdate", y, e);
            });
          });
        s.observe(e, {
          attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
          childList: "undefined" == typeof a.childList ? !0 : a.childList,
          characterData:
            "undefined" == typeof a.characterData ? !0 : a.characterData,
        }),
          y.observers.push(s);
      }
      function l(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = e.keyCode || e.charCode;
        if (
          !y.params.allowSwipeToNext &&
          ((y.isHorizontal() && 39 === a) || (!y.isHorizontal() && 40 === a))
        )
          return !1;
        if (
          !y.params.allowSwipeToPrev &&
          ((y.isHorizontal() && 37 === a) || (!y.isHorizontal() && 38 === a))
        )
          return !1;
        if (
          !(
            e.shiftKey ||
            e.altKey ||
            e.ctrlKey ||
            e.metaKey ||
            (document.activeElement &&
              document.activeElement.nodeName &&
              ("input" === document.activeElement.nodeName.toLowerCase() ||
                "textarea" === document.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (37 === a || 39 === a || 38 === a || 40 === a) {
            var t = !1;
            if (
              y.container.parents(".swiper-slide").length > 0 &&
              0 === y.container.parents(".swiper-slide-active").length
            )
              return;
            var s = { left: window.pageXOffset, top: window.pageYOffset },
              r = window.innerWidth,
              i = window.innerHeight,
              n = y.container.offset();
            y.rtl && (n.left = n.left - y.container[0].scrollLeft);
            for (
              var o = [
                  [n.left, n.top],
                  [n.left + y.width, n.top],
                  [n.left, n.top + y.height],
                  [n.left + y.width, n.top + y.height],
                ],
                l = 0;
              l < o.length;
              l++
            ) {
              var p = o[l];
              p[0] >= s.left &&
                p[0] <= s.left + r &&
                p[1] >= s.top &&
                p[1] <= s.top + i &&
                (t = !0);
            }
            if (!t) return;
          }
          y.isHorizontal()
            ? ((37 === a || 39 === a) &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              ((39 === a && !y.rtl) || (37 === a && y.rtl)) && y.slideNext(),
              ((37 === a && !y.rtl) || (39 === a && y.rtl)) && y.slidePrev())
            : ((38 === a || 40 === a) &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              40 === a && y.slideNext(),
              38 === a && y.slidePrev());
        }
      }
      function p(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = y.mousewheel.event,
          t = 0,
          s = y.rtl ? -1 : 1;
        if ("mousewheel" === a)
          if (y.params.mousewheelForceToAxis)
            if (y.isHorizontal()) {
              if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
              t = e.wheelDeltaX * s;
            } else {
              if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
              t = e.wheelDeltaY;
            }
          else
            t =
              Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)
                ? -e.wheelDeltaX * s
                : -e.wheelDeltaY;
        else if ("DOMMouseScroll" === a) t = -e.detail;
        else if ("wheel" === a)
          if (y.params.mousewheelForceToAxis)
            if (y.isHorizontal()) {
              if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
              t = -e.deltaX * s;
            } else {
              if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
              t = -e.deltaY;
            }
          else
            t =
              Math.abs(e.deltaX) > Math.abs(e.deltaY)
                ? -e.deltaX * s
                : -e.deltaY;
        if (0 !== t) {
          if ((y.params.mousewheelInvert && (t = -t), y.params.freeMode)) {
            var r =
                y.getWrapperTranslate() + t * y.params.mousewheelSensitivity,
              i = y.isBeginning,
              n = y.isEnd;
            if (
              (r >= y.minTranslate() && (r = y.minTranslate()),
              r <= y.maxTranslate() && (r = y.maxTranslate()),
              y.setWrapperTransition(0),
              y.setWrapperTranslate(r),
              y.updateProgress(),
              y.updateActiveIndex(),
              ((!i && y.isBeginning) || (!n && y.isEnd)) && y.updateClasses(),
              y.params.freeModeSticky
                ? (clearTimeout(y.mousewheel.timeout),
                  (y.mousewheel.timeout = setTimeout(function () {
                    y.slideReset();
                  }, 300)))
                : y.params.lazyLoading && y.lazy && y.lazy.load(),
              0 === r || r === y.maxTranslate())
            )
              return;
          } else {
            if (new window.Date().getTime() - y.mousewheel.lastScrollTime > 60)
              if (0 > t)
                if ((y.isEnd && !y.params.loop) || y.animating) {
                  if (y.params.mousewheelReleaseOnEdges) return !0;
                } else y.slideNext();
              else if ((y.isBeginning && !y.params.loop) || y.animating) {
                if (y.params.mousewheelReleaseOnEdges) return !0;
              } else y.slidePrev();
            y.mousewheel.lastScrollTime = new window.Date().getTime();
          }
          return (
            y.params.autoplay && y.stopAutoplay(),
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            !1
          );
        }
      }
      function d(e, t) {
        e = a(e);
        var s,
          r,
          i,
          n = y.rtl ? -1 : 1;
        (s = e.attr("data-swiper-parallax") || "0"),
          (r = e.attr("data-swiper-parallax-x")),
          (i = e.attr("data-swiper-parallax-y")),
          r || i
            ? ((r = r || "0"), (i = i || "0"))
            : y.isHorizontal()
            ? ((r = s), (i = "0"))
            : ((i = s), (r = "0")),
          (r =
            r.indexOf("%") >= 0
              ? parseInt(r, 10) * t * n + "%"
              : r * t * n + "px"),
          (i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px"),
          e.transform("translate3d(" + r + ", " + i + ",0px)");
      }
      function u(e) {
        return (
          0 !== e.indexOf("on") &&
            (e =
              e[0] !== e[0].toUpperCase()
                ? "on" + e[0].toUpperCase() + e.substring(1)
                : "on" + e),
          e
        );
      }
      if (!(this instanceof t)) return new t(e, s);
      var c = {
          direction: "horizontal",
          touchEventsTarget: "container",
          initialSlide: 0,
          speed: 300,
          autoplay: !1,
          autoplayDisableOnInteraction: !0,
          autoplayStopOnLast: !1,
          iOSEdgeSwipeDetection: !1,
          iOSEdgeSwipeThreshold: 20,
          freeMode: !1,
          freeModeMomentum: !0,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: !0,
          freeModeMomentumBounceRatio: 1,
          freeModeSticky: !1,
          freeModeMinimumVelocity: 0.02,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
          flip: { slideShadows: !0, limitRotation: !0 },
          cube: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
          fade: { crossFade: !1 },
          parallax: !1,
          scrollbar: null,
          scrollbarHide: !0,
          scrollbarDraggable: !1,
          scrollbarSnapOnRelease: !1,
          keyboardControl: !1,
          mousewheelControl: !1,
          mousewheelReleaseOnEdges: !1,
          mousewheelInvert: !1,
          mousewheelForceToAxis: !1,
          mousewheelSensitivity: 1,
          hashnav: !1,
          breakpoints: void 0,
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: "column",
          slidesPerGroup: 1,
          centeredSlides: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          onlyExternal: !1,
          threshold: 0,
          touchMoveStopPropagation: !0,
          uniqueNavElements: !0,
          pagination: null,
          paginationElement: "span",
          paginationClickable: !1,
          paginationHide: !1,
          paginationBulletRender: null,
          paginationProgressRender: null,
          paginationFractionRender: null,
          paginationCustomRender: null,
          paginationType: "bullets",
          resistance: !0,
          resistanceRatio: 0.85,
          nextButton: null,
          prevButton: null,
          watchSlidesProgress: !1,
          watchSlidesVisibility: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          lazyLoading: !1,
          lazyLoadingInPrevNext: !1,
          lazyLoadingInPrevNextAmount: 1,
          lazyLoadingOnTransitionStart: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          control: void 0,
          controlInverse: !1,
          controlBy: "slide",
          allowSwipeToPrev: !0,
          allowSwipeToNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          slideClass: "swiper-slide",
          slideActiveClass: "swiper-slide-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slidePrevClass: "swiper-slide-prev",
          wrapperClass: "swiper-wrapper",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          buttonDisabledClass: "swiper-button-disabled",
          paginationCurrentClass: "swiper-pagination-current",
          paginationTotalClass: "swiper-pagination-total",
          paginationHiddenClass: "swiper-pagination-hidden",
          paginationProgressbarClass: "swiper-pagination-progressbar",
          observer: !1,
          observeParents: !1,
          a11y: !1,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          runCallbacksOnInit: !0,
        },
        m = s && s.virtualTranslate;
      s = s || {};
      var f = {};
      for (var g in s)
        if (
          "object" != typeof s[g] ||
          null === s[g] ||
          s[g].nodeType ||
          s[g] === window ||
          s[g] === document ||
          ("undefined" != typeof Dom7 && s[g] instanceof Dom7) ||
          ("undefined" != typeof jQuery && s[g] instanceof jQuery)
        )
          f[g] = s[g];
        else {
          f[g] = {};
          for (var h in s[g]) f[g][h] = s[g][h];
        }
      for (var v in c)
        if ("undefined" == typeof s[v]) s[v] = c[v];
        else if ("object" == typeof s[v])
          for (var w in c[v])
            "undefined" == typeof s[v][w] && (s[v][w] = c[v][w]);
      var y = this;
      if (
        ((y.params = s),
        (y.originalParams = f),
        (y.classNames = []),
        "undefined" != typeof a && "undefined" != typeof Dom7 && (a = Dom7),
        ("undefined" != typeof a ||
          (a =
            "undefined" == typeof Dom7
              ? window.Dom7 || window.Zepto || window.jQuery
              : Dom7)) &&
          ((y.$ = a),
          (y.currentBreakpoint = void 0),
          (y.getActiveBreakpoint = function () {
            if (!y.params.breakpoints) return !1;
            var e,
              a = !1,
              t = [];
            for (e in y.params.breakpoints)
              y.params.breakpoints.hasOwnProperty(e) && t.push(e);
            t.sort(function (e, a) {
              return parseInt(e, 10) > parseInt(a, 10);
            });
            for (var s = 0; s < t.length; s++)
              (e = t[s]), e >= window.innerWidth && !a && (a = e);
            return a || "max";
          }),
          (y.setBreakpoint = function () {
            var e = y.getActiveBreakpoint();
            if (e && y.currentBreakpoint !== e) {
              var a =
                  e in y.params.breakpoints
                    ? y.params.breakpoints[e]
                    : y.originalParams,
                t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;
              for (var s in a) y.params[s] = a[s];
              (y.currentBreakpoint = e), t && y.destroyLoop && y.reLoop(!0);
            }
          }),
          y.params.breakpoints && y.setBreakpoint(),
          (y.container = a(e)),
          0 !== y.container.length))
      ) {
        if (y.container.length > 1) {
          var b = [];
          return (
            y.container.each(function () {
              b.push(new t(this, s));
            }),
            b
          );
        }
        (y.container[0].swiper = y),
          y.container.data("swiper", y),
          y.classNames.push("swiper-container-" + y.params.direction),
          y.params.freeMode && y.classNames.push("swiper-container-free-mode"),
          y.support.flexbox ||
            (y.classNames.push("swiper-container-no-flexbox"),
            (y.params.slidesPerColumn = 1)),
          y.params.autoHeight &&
            y.classNames.push("swiper-container-autoheight"),
          (y.params.parallax || y.params.watchSlidesVisibility) &&
            (y.params.watchSlidesProgress = !0),
          ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 &&
            (y.support.transforms3d
              ? ((y.params.watchSlidesProgress = !0),
                y.classNames.push("swiper-container-3d"))
              : (y.params.effect = "slide")),
          "slide" !== y.params.effect &&
            y.classNames.push("swiper-container-" + y.params.effect),
          "cube" === y.params.effect &&
            ((y.params.resistanceRatio = 0),
            (y.params.slidesPerView = 1),
            (y.params.slidesPerColumn = 1),
            (y.params.slidesPerGroup = 1),
            (y.params.centeredSlides = !1),
            (y.params.spaceBetween = 0),
            (y.params.virtualTranslate = !0),
            (y.params.setWrapperSize = !1)),
          ("fade" === y.params.effect || "flip" === y.params.effect) &&
            ((y.params.slidesPerView = 1),
            (y.params.slidesPerColumn = 1),
            (y.params.slidesPerGroup = 1),
            (y.params.watchSlidesProgress = !0),
            (y.params.spaceBetween = 0),
            (y.params.setWrapperSize = !1),
            "undefined" == typeof m && (y.params.virtualTranslate = !0)),
          y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1),
          (y.wrapper = y.container.children("." + y.params.wrapperClass)),
          y.params.pagination &&
            ((y.paginationContainer = a(y.params.pagination)),
            y.params.uniqueNavElements &&
              "string" == typeof y.params.pagination &&
              y.paginationContainer.length > 1 &&
              1 === y.container.find(y.params.pagination).length &&
              (y.paginationContainer = y.container.find(y.params.pagination)),
            "bullets" === y.params.paginationType &&
            y.params.paginationClickable
              ? y.paginationContainer.addClass("swiper-pagination-clickable")
              : (y.params.paginationClickable = !1),
            y.paginationContainer.addClass(
              "swiper-pagination-" + y.params.paginationType
            )),
          (y.params.nextButton || y.params.prevButton) &&
            (y.params.nextButton &&
              ((y.nextButton = a(y.params.nextButton)),
              y.params.uniqueNavElements &&
                "string" == typeof y.params.nextButton &&
                y.nextButton.length > 1 &&
                1 === y.container.find(y.params.nextButton).length &&
                (y.nextButton = y.container.find(y.params.nextButton))),
            y.params.prevButton &&
              ((y.prevButton = a(y.params.prevButton)),
              y.params.uniqueNavElements &&
                "string" == typeof y.params.prevButton &&
                y.prevButton.length > 1 &&
                1 === y.container.find(y.params.prevButton).length &&
                (y.prevButton = y.container.find(y.params.prevButton)))),
          (y.isHorizontal = function () {
            return "horizontal" === y.params.direction;
          }),
          (y.rtl =
            y.isHorizontal() &&
            ("rtl" === y.container[0].dir.toLowerCase() ||
              "rtl" === y.container.css("direction"))),
          y.rtl && y.classNames.push("swiper-container-rtl"),
          y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")),
          y.params.slidesPerColumn > 1 &&
            y.classNames.push("swiper-container-multirow"),
          y.device.android && y.classNames.push("swiper-container-android"),
          y.container.addClass(y.classNames.join(" ")),
          (y.translate = 0),
          (y.progress = 0),
          (y.velocity = 0),
          (y.lockSwipeToNext = function () {
            y.params.allowSwipeToNext = !1;
          }),
          (y.lockSwipeToPrev = function () {
            y.params.allowSwipeToPrev = !1;
          }),
          (y.lockSwipes = function () {
            y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1;
          }),
          (y.unlockSwipeToNext = function () {
            y.params.allowSwipeToNext = !0;
          }),
          (y.unlockSwipeToPrev = function () {
            y.params.allowSwipeToPrev = !0;
          }),
          (y.unlockSwipes = function () {
            y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0;
          }),
          y.params.grabCursor &&
            ((y.container[0].style.cursor = "move"),
            (y.container[0].style.cursor = "-webkit-grab"),
            (y.container[0].style.cursor = "-moz-grab"),
            (y.container[0].style.cursor = "grab")),
          (y.imagesToLoad = []),
          (y.imagesLoaded = 0),
          (y.loadImage = function (e, a, t, s, r) {
            function i() {
              r && r();
            }
            var n;
            e.complete && s
              ? i()
              : a
              ? ((n = new window.Image()),
                (n.onload = i),
                (n.onerror = i),
                t && (n.srcset = t),
                a && (n.src = a))
              : i();
          }),
          (y.preloadImages = function () {
            function e() {
              "undefined" != typeof y &&
                null !== y &&
                (void 0 !== y.imagesLoaded && y.imagesLoaded++,
                y.imagesLoaded === y.imagesToLoad.length &&
                  (y.params.updateOnImagesReady && y.update(),
                  y.emit("onImagesReady", y)));
            }
            y.imagesToLoad = y.container.find("img");
            for (var a = 0; a < y.imagesToLoad.length; a++)
              y.loadImage(
                y.imagesToLoad[a],
                y.imagesToLoad[a].currentSrc ||
                  y.imagesToLoad[a].getAttribute("src"),
                y.imagesToLoad[a].srcset ||
                  y.imagesToLoad[a].getAttribute("srcset"),
                !0,
                e
              );
          }),
          (y.autoplayTimeoutId = void 0),
          (y.autoplaying = !1),
          (y.autoplayPaused = !1),
          (y.startAutoplay = function () {
            return "undefined" != typeof y.autoplayTimeoutId
              ? !1
              : y.params.autoplay
              ? y.autoplaying
                ? !1
                : ((y.autoplaying = !0), y.emit("onAutoplayStart", y), void i())
              : !1;
          }),
          (y.stopAutoplay = function (e) {
            y.autoplayTimeoutId &&
              (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
              (y.autoplaying = !1),
              (y.autoplayTimeoutId = void 0),
              y.emit("onAutoplayStop", y));
          }),
          (y.pauseAutoplay = function (e) {
            y.autoplayPaused ||
              (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
              (y.autoplayPaused = !0),
              0 === e
                ? ((y.autoplayPaused = !1), i())
                : y.wrapper.transitionEnd(function () {
                    y &&
                      ((y.autoplayPaused = !1),
                      y.autoplaying ? i() : y.stopAutoplay());
                  }));
          }),
          (y.minTranslate = function () {
            return -y.snapGrid[0];
          }),
          (y.maxTranslate = function () {
            return -y.snapGrid[y.snapGrid.length - 1];
          }),
          (y.updateAutoHeight = function () {
            var e = y.slides.eq(y.activeIndex)[0];
            if ("undefined" != typeof e) {
              var a = e.offsetHeight;
              a && y.wrapper.css("height", a + "px");
            }
          }),
          (y.updateContainerSize = function () {
            var e, a;
            (e =
              "undefined" != typeof y.params.width
                ? y.params.width
                : y.container[0].clientWidth),
              (a =
                "undefined" != typeof y.params.height
                  ? y.params.height
                  : y.container[0].clientHeight),
              (0 === e && y.isHorizontal()) ||
                (0 === a && !y.isHorizontal()) ||
                ((e =
                  e -
                  parseInt(y.container.css("padding-left"), 10) -
                  parseInt(y.container.css("padding-right"), 10)),
                (a =
                  a -
                  parseInt(y.container.css("padding-top"), 10) -
                  parseInt(y.container.css("padding-bottom"), 10)),
                (y.width = e),
                (y.height = a),
                (y.size = y.isHorizontal() ? y.width : y.height));
          }),
          (y.updateSlidesSize = function () {
            (y.slides = y.wrapper.children("." + y.params.slideClass)),
              (y.snapGrid = []),
              (y.slidesGrid = []),
              (y.slidesSizesGrid = []);
            var e,
              a = y.params.spaceBetween,
              t = -y.params.slidesOffsetBefore,
              s = 0,
              i = 0;
            if ("undefined" != typeof y.size) {
              "string" == typeof a &&
                a.indexOf("%") >= 0 &&
                (a = (parseFloat(a.replace("%", "")) / 100) * y.size),
                (y.virtualSize = -a),
                y.rtl
                  ? y.slides.css({ marginLeft: "", marginTop: "" })
                  : y.slides.css({ marginRight: "", marginBottom: "" });
              var n;
              y.params.slidesPerColumn > 1 &&
                ((n =
                  Math.floor(y.slides.length / y.params.slidesPerColumn) ===
                  y.slides.length / y.params.slidesPerColumn
                    ? y.slides.length
                    : Math.ceil(y.slides.length / y.params.slidesPerColumn) *
                      y.params.slidesPerColumn),
                "auto" !== y.params.slidesPerView &&
                  "row" === y.params.slidesPerColumnFill &&
                  (n = Math.max(
                    n,
                    y.params.slidesPerView * y.params.slidesPerColumn
                  )));
              var o,
                l = y.params.slidesPerColumn,
                p = n / l,
                d = p - (y.params.slidesPerColumn * p - y.slides.length);
              for (e = 0; e < y.slides.length; e++) {
                o = 0;
                var u = y.slides.eq(e);
                if (y.params.slidesPerColumn > 1) {
                  var c, m, f;
                  "column" === y.params.slidesPerColumnFill
                    ? ((m = Math.floor(e / l)),
                      (f = e - m * l),
                      (m > d || (m === d && f === l - 1)) &&
                        ++f >= l &&
                        ((f = 0), m++),
                      (c = m + (f * n) / l),
                      u.css({
                        "-webkit-box-ordinal-group": c,
                        "-moz-box-ordinal-group": c,
                        "-ms-flex-order": c,
                        "-webkit-order": c,
                        order: c,
                      }))
                    : ((f = Math.floor(e / p)), (m = e - f * p)),
                    u
                      .css({
                        "margin-top":
                          0 !== f &&
                          y.params.spaceBetween &&
                          y.params.spaceBetween + "px",
                      })
                      .attr("data-swiper-column", m)
                      .attr("data-swiper-row", f);
                }
                "none" !== u.css("display") &&
                  ("auto" === y.params.slidesPerView
                    ? ((o = y.isHorizontal()
                        ? u.outerWidth(!0)
                        : u.outerHeight(!0)),
                      y.params.roundLengths && (o = r(o)))
                    : ((o =
                        (y.size - (y.params.slidesPerView - 1) * a) /
                        y.params.slidesPerView),
                      y.params.roundLengths && (o = r(o)),
                      y.isHorizontal()
                        ? (y.slides[e].style.width = o + "px")
                        : (y.slides[e].style.height = o + "px")),
                  (y.slides[e].swiperSlideSize = o),
                  y.slidesSizesGrid.push(o),
                  y.params.centeredSlides
                    ? ((t = t + o / 2 + s / 2 + a),
                      0 === e && (t = t - y.size / 2 - a),
                      Math.abs(t) < 0.001 && (t = 0),
                      i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t),
                      y.slidesGrid.push(t))
                    : (i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t),
                      y.slidesGrid.push(t),
                      (t = t + o + a)),
                  (y.virtualSize += o + a),
                  (s = o),
                  i++);
              }
              y.virtualSize =
                Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
              var g;
              if (
                (y.rtl &&
                  y.wrongRTL &&
                  ("slide" === y.params.effect ||
                    "coverflow" === y.params.effect) &&
                  y.wrapper.css({
                    width: y.virtualSize + y.params.spaceBetween + "px",
                  }),
                (!y.support.flexbox || y.params.setWrapperSize) &&
                  (y.isHorizontal()
                    ? y.wrapper.css({
                        width: y.virtualSize + y.params.spaceBetween + "px",
                      })
                    : y.wrapper.css({
                        height: y.virtualSize + y.params.spaceBetween + "px",
                      })),
                y.params.slidesPerColumn > 1 &&
                  ((y.virtualSize = (o + y.params.spaceBetween) * n),
                  (y.virtualSize =
                    Math.ceil(y.virtualSize / y.params.slidesPerColumn) -
                    y.params.spaceBetween),
                  y.wrapper.css({
                    width: y.virtualSize + y.params.spaceBetween + "px",
                  }),
                  y.params.centeredSlides))
              ) {
                for (g = [], e = 0; e < y.snapGrid.length; e++)
                  y.snapGrid[e] < y.virtualSize + y.snapGrid[0] &&
                    g.push(y.snapGrid[e]);
                y.snapGrid = g;
              }
              if (!y.params.centeredSlides) {
                for (g = [], e = 0; e < y.snapGrid.length; e++)
                  y.snapGrid[e] <= y.virtualSize - y.size &&
                    g.push(y.snapGrid[e]);
                (y.snapGrid = g),
                  Math.floor(y.virtualSize - y.size) -
                    Math.floor(y.snapGrid[y.snapGrid.length - 1]) >
                    1 && y.snapGrid.push(y.virtualSize - y.size);
              }
              0 === y.snapGrid.length && (y.snapGrid = [0]),
                0 !== y.params.spaceBetween &&
                  (y.isHorizontal()
                    ? y.rtl
                      ? y.slides.css({ marginLeft: a + "px" })
                      : y.slides.css({ marginRight: a + "px" })
                    : y.slides.css({ marginBottom: a + "px" })),
                y.params.watchSlidesProgress && y.updateSlidesOffset();
            }
          }),
          (y.updateSlidesOffset = function () {
            for (var e = 0; e < y.slides.length; e++)
              y.slides[e].swiperSlideOffset = y.isHorizontal()
                ? y.slides[e].offsetLeft
                : y.slides[e].offsetTop;
          }),
          (y.updateSlidesProgress = function (e) {
            if (
              ("undefined" == typeof e && (e = y.translate || 0),
              0 !== y.slides.length)
            ) {
              "undefined" == typeof y.slides[0].swiperSlideOffset &&
                y.updateSlidesOffset();
              var a = -e;
              y.rtl && (a = e),
                y.slides.removeClass(y.params.slideVisibleClass);
              for (var t = 0; t < y.slides.length; t++) {
                var s = y.slides[t],
                  r =
                    (a - s.swiperSlideOffset) /
                    (s.swiperSlideSize + y.params.spaceBetween);
                if (y.params.watchSlidesVisibility) {
                  var i = -(a - s.swiperSlideOffset),
                    n = i + y.slidesSizesGrid[t],
                    o =
                      (i >= 0 && i < y.size) ||
                      (n > 0 && n <= y.size) ||
                      (0 >= i && n >= y.size);
                  o && y.slides.eq(t).addClass(y.params.slideVisibleClass);
                }
                s.progress = y.rtl ? -r : r;
              }
            }
          }),
          (y.updateProgress = function (e) {
            "undefined" == typeof e && (e = y.translate || 0);
            var a = y.maxTranslate() - y.minTranslate(),
              t = y.isBeginning,
              s = y.isEnd;
            0 === a
              ? ((y.progress = 0), (y.isBeginning = y.isEnd = !0))
              : ((y.progress = (e - y.minTranslate()) / a),
                (y.isBeginning = y.progress <= 0),
                (y.isEnd = y.progress >= 1)),
              y.isBeginning && !t && y.emit("onReachBeginning", y),
              y.isEnd && !s && y.emit("onReachEnd", y),
              y.params.watchSlidesProgress && y.updateSlidesProgress(e),
              y.emit("onProgress", y, y.progress);
          }),
          (y.updateActiveIndex = function () {
            var e,
              a,
              t,
              s = y.rtl ? y.translate : -y.translate;
            for (a = 0; a < y.slidesGrid.length; a++)
              "undefined" != typeof y.slidesGrid[a + 1]
                ? s >= y.slidesGrid[a] &&
                  s <
                    y.slidesGrid[a + 1] -
                      (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2
                  ? (e = a)
                  : s >= y.slidesGrid[a] &&
                    s < y.slidesGrid[a + 1] &&
                    (e = a + 1)
                : s >= y.slidesGrid[a] && (e = a);
            (0 > e || "undefined" == typeof e) && (e = 0),
              (t = Math.floor(e / y.params.slidesPerGroup)),
              t >= y.snapGrid.length && (t = y.snapGrid.length - 1),
              e !== y.activeIndex &&
                ((y.snapIndex = t),
                (y.previousIndex = y.activeIndex),
                (y.activeIndex = e),
                y.updateClasses());
          }),
          (y.updateClasses = function () {
            y.slides.removeClass(
              y.params.slideActiveClass +
                " " +
                y.params.slideNextClass +
                " " +
                y.params.slidePrevClass
            );
            var e = y.slides.eq(y.activeIndex);
            e.addClass(y.params.slideActiveClass);
            var t = e
              .next("." + y.params.slideClass)
              .addClass(y.params.slideNextClass);
            y.params.loop &&
              0 === t.length &&
              y.slides.eq(0).addClass(y.params.slideNextClass);
            var s = e
              .prev("." + y.params.slideClass)
              .addClass(y.params.slidePrevClass);
            if (
              (y.params.loop &&
                0 === s.length &&
                y.slides.eq(-1).addClass(y.params.slidePrevClass),
              y.paginationContainer && y.paginationContainer.length > 0)
            ) {
              var r,
                i = y.params.loop
                  ? Math.ceil(
                      (y.slides.length - 2 * y.loopedSlides) /
                        y.params.slidesPerGroup
                    )
                  : y.snapGrid.length;
              if (
                (y.params.loop
                  ? ((r = Math.ceil(
                      (y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup
                    )),
                    r > y.slides.length - 1 - 2 * y.loopedSlides &&
                      (r -= y.slides.length - 2 * y.loopedSlides),
                    r > i - 1 && (r -= i),
                    0 > r &&
                      "bullets" !== y.params.paginationType &&
                      (r = i + r))
                  : (r =
                      "undefined" != typeof y.snapIndex
                        ? y.snapIndex
                        : y.activeIndex || 0),
                "bullets" === y.params.paginationType &&
                  y.bullets &&
                  y.bullets.length > 0 &&
                  (y.bullets.removeClass(y.params.bulletActiveClass),
                  y.paginationContainer.length > 1
                    ? y.bullets.each(function () {
                        a(this).index() === r &&
                          a(this).addClass(y.params.bulletActiveClass);
                      })
                    : y.bullets.eq(r).addClass(y.params.bulletActiveClass)),
                "fraction" === y.params.paginationType &&
                  (y.paginationContainer
                    .find("." + y.params.paginationCurrentClass)
                    .text(r + 1),
                  y.paginationContainer
                    .find("." + y.params.paginationTotalClass)
                    .text(i)),
                "progress" === y.params.paginationType)
              ) {
                var n = (r + 1) / i,
                  o = n,
                  l = 1;
                y.isHorizontal() || ((l = n), (o = 1)),
                  y.paginationContainer
                    .find("." + y.params.paginationProgressbarClass)
                    .transform(
                      "translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")"
                    )
                    .transition(y.params.speed);
              }
              "custom" === y.params.paginationType &&
                y.params.paginationCustomRender &&
                (y.paginationContainer.html(
                  y.params.paginationCustomRender(y, r + 1, i)
                ),
                y.emit("onPaginationRendered", y, y.paginationContainer[0]));
            }
            y.params.loop ||
              (y.params.prevButton &&
                y.prevButton &&
                y.prevButton.length > 0 &&
                (y.isBeginning
                  ? (y.prevButton.addClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.disable(y.prevButton))
                  : (y.prevButton.removeClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))),
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.isEnd
                  ? (y.nextButton.addClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.disable(y.nextButton))
                  : (y.nextButton.removeClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))));
          }),
          (y.updatePagination = function () {
            if (
              y.params.pagination &&
              y.paginationContainer &&
              y.paginationContainer.length > 0
            ) {
              var e = "";
              if ("bullets" === y.params.paginationType) {
                for (
                  var a = y.params.loop
                      ? Math.ceil(
                          (y.slides.length - 2 * y.loopedSlides) /
                            y.params.slidesPerGroup
                        )
                      : y.snapGrid.length,
                    t = 0;
                  a > t;
                  t++
                )
                  e += y.params.paginationBulletRender
                    ? y.params.paginationBulletRender(t, y.params.bulletClass)
                    : "<" +
                      y.params.paginationElement +
                      ' class="' +
                      y.params.bulletClass +
                      '"></' +
                      y.params.paginationElement +
                      ">";
                y.paginationContainer.html(e),
                  (y.bullets = y.paginationContainer.find(
                    "." + y.params.bulletClass
                  )),
                  y.params.paginationClickable &&
                    y.params.a11y &&
                    y.a11y &&
                    y.a11y.initPagination();
              }
              "fraction" === y.params.paginationType &&
                ((e = y.params.paginationFractionRender
                  ? y.params.paginationFractionRender(
                      y,
                      y.params.paginationCurrentClass,
                      y.params.paginationTotalClass
                    )
                  : '<span class="' +
                    y.params.paginationCurrentClass +
                    '"></span> / <span class="' +
                    y.params.paginationTotalClass +
                    '"></span>'),
                y.paginationContainer.html(e)),
                "progress" === y.params.paginationType &&
                  ((e = y.params.paginationProgressRender
                    ? y.params.paginationProgressRender(
                        y,
                        y.params.paginationProgressbarClass
                      )
                    : '<span class="' +
                      y.params.paginationProgressbarClass +
                      '"></span>'),
                  y.paginationContainer.html(e)),
                "custom" !== y.params.paginationType &&
                  y.emit("onPaginationRendered", y, y.paginationContainer[0]);
            }
          }),
          (y.update = function (e) {
            function a() {
              (s = Math.min(
                Math.max(y.translate, y.maxTranslate()),
                y.minTranslate()
              )),
                y.setWrapperTranslate(s),
                y.updateActiveIndex(),
                y.updateClasses();
            }
            if (
              (y.updateContainerSize(),
              y.updateSlidesSize(),
              y.updateProgress(),
              y.updatePagination(),
              y.updateClasses(),
              y.params.scrollbar && y.scrollbar && y.scrollbar.set(),
              e)
            ) {
              var t, s;
              y.controller &&
                y.controller.spline &&
                (y.controller.spline = void 0),
                y.params.freeMode
                  ? (a(), y.params.autoHeight && y.updateAutoHeight())
                  : ((t =
                      ("auto" === y.params.slidesPerView ||
                        y.params.slidesPerView > 1) &&
                      y.isEnd &&
                      !y.params.centeredSlides
                        ? y.slideTo(y.slides.length - 1, 0, !1, !0)
                        : y.slideTo(y.activeIndex, 0, !1, !0)),
                    t || a());
            } else y.params.autoHeight && y.updateAutoHeight();
          }),
          (y.onResize = function (e) {
            y.params.breakpoints && y.setBreakpoint();
            var a = y.params.allowSwipeToPrev,
              t = y.params.allowSwipeToNext;
            (y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0),
              y.updateContainerSize(),
              y.updateSlidesSize(),
              ("auto" === y.params.slidesPerView || y.params.freeMode || e) &&
                y.updatePagination(),
              y.params.scrollbar && y.scrollbar && y.scrollbar.set(),
              y.controller &&
                y.controller.spline &&
                (y.controller.spline = void 0);
            var s = !1;
            if (y.params.freeMode) {
              var r = Math.min(
                Math.max(y.translate, y.maxTranslate()),
                y.minTranslate()
              );
              y.setWrapperTranslate(r),
                y.updateActiveIndex(),
                y.updateClasses(),
                y.params.autoHeight && y.updateAutoHeight();
            } else
              y.updateClasses(),
                (s =
                  ("auto" === y.params.slidesPerView ||
                    y.params.slidesPerView > 1) &&
                  y.isEnd &&
                  !y.params.centeredSlides
                    ? y.slideTo(y.slides.length - 1, 0, !1, !0)
                    : y.slideTo(y.activeIndex, 0, !1, !0));
            y.params.lazyLoading && !s && y.lazy && y.lazy.load(),
              (y.params.allowSwipeToPrev = a),
              (y.params.allowSwipeToNext = t);
          });
        var x = ["mousedown", "mousemove", "mouseup"];
        window.navigator.pointerEnabled
          ? (x = ["pointerdown", "pointermove", "pointerup"])
          : window.navigator.msPointerEnabled &&
            (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
          (y.touchEvents = {
            start:
              y.support.touch || !y.params.simulateTouch ? "touchstart" : x[0],
            move:
              y.support.touch || !y.params.simulateTouch ? "touchmove" : x[1],
            end: y.support.touch || !y.params.simulateTouch ? "touchend" : x[2],
          }),
          (window.navigator.pointerEnabled ||
            window.navigator.msPointerEnabled) &&
            ("container" === y.params.touchEventsTarget
              ? y.container
              : y.wrapper
            ).addClass("swiper-wp8-" + y.params.direction),
          (y.initEvents = function (e) {
            var a = e ? "off" : "on",
              t = e ? "removeEventListener" : "addEventListener",
              r =
                "container" === y.params.touchEventsTarget
                  ? y.container[0]
                  : y.wrapper[0],
              i = y.support.touch ? r : document,
              n = y.params.nested ? !0 : !1;
            y.browser.ie
              ? (r[t](y.touchEvents.start, y.onTouchStart, !1),
                i[t](y.touchEvents.move, y.onTouchMove, n),
                i[t](y.touchEvents.end, y.onTouchEnd, !1))
              : (y.support.touch &&
                  (r[t](y.touchEvents.start, y.onTouchStart, !1),
                  r[t](y.touchEvents.move, y.onTouchMove, n),
                  r[t](y.touchEvents.end, y.onTouchEnd, !1)),
                !s.simulateTouch ||
                  y.device.ios ||
                  y.device.android ||
                  (r[t]("mousedown", y.onTouchStart, !1),
                  document[t]("mousemove", y.onTouchMove, n),
                  document[t]("mouseup", y.onTouchEnd, !1))),
              window[t]("resize", y.onResize),
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.nextButton[a]("click", y.onClickNext),
                y.params.a11y &&
                  y.a11y &&
                  y.nextButton[a]("keydown", y.a11y.onEnterKey)),
              y.params.prevButton &&
                y.prevButton &&
                y.prevButton.length > 0 &&
                (y.prevButton[a]("click", y.onClickPrev),
                y.params.a11y &&
                  y.a11y &&
                  y.prevButton[a]("keydown", y.a11y.onEnterKey)),
              y.params.pagination &&
                y.params.paginationClickable &&
                (y.paginationContainer[a](
                  "click",
                  "." + y.params.bulletClass,
                  y.onClickIndex
                ),
                y.params.a11y &&
                  y.a11y &&
                  y.paginationContainer[a](
                    "keydown",
                    "." + y.params.bulletClass,
                    y.a11y.onEnterKey
                  )),
              (y.params.preventClicks || y.params.preventClicksPropagation) &&
                r[t]("click", y.preventClicks, !0);
          }),
          (y.attachEvents = function () {
            y.initEvents();
          }),
          (y.detachEvents = function () {
            y.initEvents(!0);
          }),
          (y.allowClick = !0),
          (y.preventClicks = function (e) {
            y.allowClick ||
              (y.params.preventClicks && e.preventDefault(),
              y.params.preventClicksPropagation &&
                y.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation()));
          }),
          (y.onClickNext = function (e) {
            e.preventDefault(), (!y.isEnd || y.params.loop) && y.slideNext();
          }),
          (y.onClickPrev = function (e) {
            e.preventDefault(),
              (!y.isBeginning || y.params.loop) && y.slidePrev();
          }),
          (y.onClickIndex = function (e) {
            e.preventDefault();
            var t = a(this).index() * y.params.slidesPerGroup;
            y.params.loop && (t += y.loopedSlides), y.slideTo(t);
          }),
          (y.updateClickedSlide = function (e) {
            var t = n(e, "." + y.params.slideClass),
              s = !1;
            if (t)
              for (var r = 0; r < y.slides.length; r++)
                y.slides[r] === t && (s = !0);
            if (!t || !s)
              return (y.clickedSlide = void 0), void (y.clickedIndex = void 0);
            if (
              ((y.clickedSlide = t),
              (y.clickedIndex = a(t).index()),
              y.params.slideToClickedSlide &&
                void 0 !== y.clickedIndex &&
                y.clickedIndex !== y.activeIndex)
            ) {
              var i,
                o = y.clickedIndex;
              if (y.params.loop) {
                if (y.animating) return;
                (i = a(y.clickedSlide).attr("data-swiper-slide-index")),
                  y.params.centeredSlides
                    ? o < y.loopedSlides - y.params.slidesPerView / 2 ||
                      o >
                        y.slides.length -
                          y.loopedSlides +
                          y.params.slidesPerView / 2
                      ? (y.fixLoop(),
                        (o = y.wrapper
                          .children(
                            "." +
                              y.params.slideClass +
                              '[data-swiper-slide-index="' +
                              i +
                              '"]:not(.swiper-slide-duplicate)'
                          )
                          .eq(0)
                          .index()),
                        setTimeout(function () {
                          y.slideTo(o);
                        }, 0))
                      : y.slideTo(o)
                    : o > y.slides.length - y.params.slidesPerView
                    ? (y.fixLoop(),
                      (o = y.wrapper
                        .children(
                          "." +
                            y.params.slideClass +
                            '[data-swiper-slide-index="' +
                            i +
                            '"]:not(.swiper-slide-duplicate)'
                        )
                        .eq(0)
                        .index()),
                      setTimeout(function () {
                        y.slideTo(o);
                      }, 0))
                    : y.slideTo(o);
              } else y.slideTo(o);
            }
          });
        var T,
          S,
          C,
          z,
          M,
          P,
          I,
          k,
          E,
          B,
          D = "input, select, textarea, button",
          L = Date.now(),
          H = [];
        (y.animating = !1),
          (y.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
          });
        var G, A;
        if (
          ((y.onTouchStart = function (e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              (G = "touchstart" === e.type),
              G || !("which" in e) || 3 !== e.which)
            ) {
              if (y.params.noSwiping && n(e, "." + y.params.noSwipingClass))
                return void (y.allowClick = !0);
              if (!y.params.swipeHandler || n(e, y.params.swipeHandler)) {
                var t = (y.touches.currentX =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  s = (y.touches.currentY =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY);
                if (
                  !(
                    y.device.ios &&
                    y.params.iOSEdgeSwipeDetection &&
                    t <= y.params.iOSEdgeSwipeThreshold
                  )
                ) {
                  if (
                    ((T = !0),
                    (S = !1),
                    (C = !0),
                    (M = void 0),
                    (A = void 0),
                    (y.touches.startX = t),
                    (y.touches.startY = s),
                    (z = Date.now()),
                    (y.allowClick = !0),
                    y.updateContainerSize(),
                    (y.swipeDirection = void 0),
                    y.params.threshold > 0 && (k = !1),
                    "touchstart" !== e.type)
                  ) {
                    var r = !0;
                    a(e.target).is(D) && (r = !1),
                      document.activeElement &&
                        a(document.activeElement).is(D) &&
                        document.activeElement.blur(),
                      r && e.preventDefault();
                  }
                  y.emit("onTouchStart", y, e);
                }
              }
            }
          }),
          (y.onTouchMove = function (e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              !G || "mousemove" !== e.type)
            ) {
              if (e.preventedByNestedSwiper)
                return (
                  (y.touches.startX =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  void (y.touches.startY =
                    "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY)
                );
              if (y.params.onlyExternal)
                return (
                  (y.allowClick = !1),
                  void (
                    T &&
                    ((y.touches.startX = y.touches.currentX =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    (y.touches.startY = y.touches.currentY =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY),
                    (z = Date.now()))
                  )
                );
              if (
                G &&
                document.activeElement &&
                e.target === document.activeElement &&
                a(e.target).is(D)
              )
                return (S = !0), void (y.allowClick = !1);
              if (
                (C && y.emit("onTouchMove", y, e),
                !(e.targetTouches && e.targetTouches.length > 1))
              ) {
                if (
                  ((y.touches.currentX =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (y.touches.currentY =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY),
                  "undefined" == typeof M)
                ) {
                  var t =
                    (180 *
                      Math.atan2(
                        Math.abs(y.touches.currentY - y.touches.startY),
                        Math.abs(y.touches.currentX - y.touches.startX)
                      )) /
                    Math.PI;
                  M = y.isHorizontal()
                    ? t > y.params.touchAngle
                    : 90 - t > y.params.touchAngle;
                }
                if (
                  (M && y.emit("onTouchMoveOpposite", y, e),
                  "undefined" == typeof A &&
                    y.browser.ieTouch &&
                    (y.touches.currentX !== y.touches.startX ||
                      y.touches.currentY !== y.touches.startY) &&
                    (A = !0),
                  T)
                ) {
                  if (M) return void (T = !1);
                  if (A || !y.browser.ieTouch) {
                    (y.allowClick = !1),
                      y.emit("onSliderMove", y, e),
                      e.preventDefault(),
                      y.params.touchMoveStopPropagation &&
                        !y.params.nested &&
                        e.stopPropagation(),
                      S ||
                        (s.loop && y.fixLoop(),
                        (I = y.getWrapperTranslate()),
                        y.setWrapperTransition(0),
                        y.animating &&
                          y.wrapper.trigger(
                            "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"
                          ),
                        y.params.autoplay &&
                          y.autoplaying &&
                          (y.params.autoplayDisableOnInteraction
                            ? y.stopAutoplay()
                            : y.pauseAutoplay()),
                        (B = !1),
                        y.params.grabCursor &&
                          ((y.container[0].style.cursor = "move"),
                          (y.container[0].style.cursor = "-webkit-grabbing"),
                          (y.container[0].style.cursor = "-moz-grabbin"),
                          (y.container[0].style.cursor = "grabbing"))),
                      (S = !0);
                    var r = (y.touches.diff = y.isHorizontal()
                      ? y.touches.currentX - y.touches.startX
                      : y.touches.currentY - y.touches.startY);
                    (r *= y.params.touchRatio),
                      y.rtl && (r = -r),
                      (y.swipeDirection = r > 0 ? "prev" : "next"),
                      (P = r + I);
                    var i = !0;
                    if (
                      (r > 0 && P > y.minTranslate()
                        ? ((i = !1),
                          y.params.resistance &&
                            (P =
                              y.minTranslate() -
                              1 +
                              Math.pow(
                                -y.minTranslate() + I + r,
                                y.params.resistanceRatio
                              )))
                        : 0 > r &&
                          P < y.maxTranslate() &&
                          ((i = !1),
                          y.params.resistance &&
                            (P =
                              y.maxTranslate() +
                              1 -
                              Math.pow(
                                y.maxTranslate() - I - r,
                                y.params.resistanceRatio
                              ))),
                      i && (e.preventedByNestedSwiper = !0),
                      !y.params.allowSwipeToNext &&
                        "next" === y.swipeDirection &&
                        I > P &&
                        (P = I),
                      !y.params.allowSwipeToPrev &&
                        "prev" === y.swipeDirection &&
                        P > I &&
                        (P = I),
                      y.params.followFinger)
                    ) {
                      if (y.params.threshold > 0) {
                        if (!(Math.abs(r) > y.params.threshold || k))
                          return void (P = I);
                        if (!k)
                          return (
                            (k = !0),
                            (y.touches.startX = y.touches.currentX),
                            (y.touches.startY = y.touches.currentY),
                            (P = I),
                            void (y.touches.diff = y.isHorizontal()
                              ? y.touches.currentX - y.touches.startX
                              : y.touches.currentY - y.touches.startY)
                          );
                      }
                      (y.params.freeMode || y.params.watchSlidesProgress) &&
                        y.updateActiveIndex(),
                        y.params.freeMode &&
                          (0 === H.length &&
                            H.push({
                              position:
                                y.touches[
                                  y.isHorizontal() ? "startX" : "startY"
                                ],
                              time: z,
                            }),
                          H.push({
                            position:
                              y.touches[
                                y.isHorizontal() ? "currentX" : "currentY"
                              ],
                            time: new window.Date().getTime(),
                          })),
                        y.updateProgress(P),
                        y.setWrapperTranslate(P);
                    }
                  }
                }
              }
            }
          }),
          (y.onTouchEnd = function (e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              C && y.emit("onTouchEnd", y, e),
              (C = !1),
              T)
            ) {
              y.params.grabCursor &&
                S &&
                T &&
                ((y.container[0].style.cursor = "move"),
                (y.container[0].style.cursor = "-webkit-grab"),
                (y.container[0].style.cursor = "-moz-grab"),
                (y.container[0].style.cursor = "grab"));
              var t = Date.now(),
                s = t - z;
              if (
                (y.allowClick &&
                  (y.updateClickedSlide(e),
                  y.emit("onTap", y, e),
                  300 > s &&
                    t - L > 300 &&
                    (E && clearTimeout(E),
                    (E = setTimeout(function () {
                      y &&
                        (y.params.paginationHide &&
                          y.paginationContainer.length > 0 &&
                          !a(e.target).hasClass(y.params.bulletClass) &&
                          y.paginationContainer.toggleClass(
                            y.params.paginationHiddenClass
                          ),
                        y.emit("onClick", y, e));
                    }, 300))),
                  300 > s &&
                    300 > t - L &&
                    (E && clearTimeout(E), y.emit("onDoubleTap", y, e))),
                (L = Date.now()),
                setTimeout(function () {
                  y && (y.allowClick = !0);
                }, 0),
                !T ||
                  !S ||
                  !y.swipeDirection ||
                  0 === y.touches.diff ||
                  P === I)
              )
                return void (T = S = !1);
              T = S = !1;
              var r;
              if (
                ((r = y.params.followFinger
                  ? y.rtl
                    ? y.translate
                    : -y.translate
                  : -P),
                y.params.freeMode)
              ) {
                if (r < -y.minTranslate()) return void y.slideTo(y.activeIndex);
                if (r > -y.maxTranslate())
                  return void (y.slides.length < y.snapGrid.length
                    ? y.slideTo(y.snapGrid.length - 1)
                    : y.slideTo(y.slides.length - 1));
                if (y.params.freeModeMomentum) {
                  if (H.length > 1) {
                    var i = H.pop(),
                      n = H.pop(),
                      o = i.position - n.position,
                      l = i.time - n.time;
                    (y.velocity = o / l),
                      (y.velocity = y.velocity / 2),
                      Math.abs(y.velocity) < y.params.freeModeMinimumVelocity &&
                        (y.velocity = 0),
                      (l > 150 || new window.Date().getTime() - i.time > 300) &&
                        (y.velocity = 0);
                  } else y.velocity = 0;
                  H.length = 0;
                  var p = 1e3 * y.params.freeModeMomentumRatio,
                    d = y.velocity * p,
                    u = y.translate + d;
                  y.rtl && (u = -u);
                  var c,
                    m = !1,
                    f =
                      20 *
                      Math.abs(y.velocity) *
                      y.params.freeModeMomentumBounceRatio;
                  if (u < y.maxTranslate())
                    y.params.freeModeMomentumBounce
                      ? (u + y.maxTranslate() < -f &&
                          (u = y.maxTranslate() - f),
                        (c = y.maxTranslate()),
                        (m = !0),
                        (B = !0))
                      : (u = y.maxTranslate());
                  else if (u > y.minTranslate())
                    y.params.freeModeMomentumBounce
                      ? (u - y.minTranslate() > f && (u = y.minTranslate() + f),
                        (c = y.minTranslate()),
                        (m = !0),
                        (B = !0))
                      : (u = y.minTranslate());
                  else if (y.params.freeModeSticky) {
                    var g,
                      h = 0;
                    for (h = 0; h < y.snapGrid.length; h += 1)
                      if (y.snapGrid[h] > -u) {
                        g = h;
                        break;
                      }
                    (u =
                      Math.abs(y.snapGrid[g] - u) <
                        Math.abs(y.snapGrid[g - 1] - u) ||
                      "next" === y.swipeDirection
                        ? y.snapGrid[g]
                        : y.snapGrid[g - 1]),
                      y.rtl || (u = -u);
                  }
                  if (0 !== y.velocity)
                    p = y.rtl
                      ? Math.abs((-u - y.translate) / y.velocity)
                      : Math.abs((u - y.translate) / y.velocity);
                  else if (y.params.freeModeSticky) return void y.slideReset();
                  y.params.freeModeMomentumBounce && m
                    ? (y.updateProgress(c),
                      y.setWrapperTransition(p),
                      y.setWrapperTranslate(u),
                      y.onTransitionStart(),
                      (y.animating = !0),
                      y.wrapper.transitionEnd(function () {
                        y &&
                          B &&
                          (y.emit("onMomentumBounce", y),
                          y.setWrapperTransition(y.params.speed),
                          y.setWrapperTranslate(c),
                          y.wrapper.transitionEnd(function () {
                            y && y.onTransitionEnd();
                          }));
                      }))
                    : y.velocity
                    ? (y.updateProgress(u),
                      y.setWrapperTransition(p),
                      y.setWrapperTranslate(u),
                      y.onTransitionStart(),
                      y.animating ||
                        ((y.animating = !0),
                        y.wrapper.transitionEnd(function () {
                          y && y.onTransitionEnd();
                        })))
                    : y.updateProgress(u),
                    y.updateActiveIndex();
                }
                return void (
                  (!y.params.freeModeMomentum || s >= y.params.longSwipesMs) &&
                  (y.updateProgress(), y.updateActiveIndex())
                );
              }
              var v,
                w = 0,
                b = y.slidesSizesGrid[0];
              for (v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup)
                "undefined" != typeof y.slidesGrid[v + y.params.slidesPerGroup]
                  ? r >= y.slidesGrid[v] &&
                    r < y.slidesGrid[v + y.params.slidesPerGroup] &&
                    ((w = v),
                    (b =
                      y.slidesGrid[v + y.params.slidesPerGroup] -
                      y.slidesGrid[v]))
                  : r >= y.slidesGrid[v] &&
                    ((w = v),
                    (b =
                      y.slidesGrid[y.slidesGrid.length - 1] -
                      y.slidesGrid[y.slidesGrid.length - 2]));
              var x = (r - y.slidesGrid[w]) / b;
              if (s > y.params.longSwipesMs) {
                if (!y.params.longSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection &&
                  (x >= y.params.longSwipesRatio
                    ? y.slideTo(w + y.params.slidesPerGroup)
                    : y.slideTo(w)),
                  "prev" === y.swipeDirection &&
                    (x > 1 - y.params.longSwipesRatio
                      ? y.slideTo(w + y.params.slidesPerGroup)
                      : y.slideTo(w));
              } else {
                if (!y.params.shortSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection &&
                  y.slideTo(w + y.params.slidesPerGroup),
                  "prev" === y.swipeDirection && y.slideTo(w);
              }
            }
          }),
          (y._slideTo = function (e, a) {
            return y.slideTo(e, a, !0, !0);
          }),
          (y.slideTo = function (e, a, t, s) {
            "undefined" == typeof t && (t = !0),
              "undefined" == typeof e && (e = 0),
              0 > e && (e = 0),
              (y.snapIndex = Math.floor(e / y.params.slidesPerGroup)),
              y.snapIndex >= y.snapGrid.length &&
                (y.snapIndex = y.snapGrid.length - 1);
            var r = -y.snapGrid[y.snapIndex];
            y.params.autoplay &&
              y.autoplaying &&
              (s || !y.params.autoplayDisableOnInteraction
                ? y.pauseAutoplay(a)
                : y.stopAutoplay()),
              y.updateProgress(r);
            for (var i = 0; i < y.slidesGrid.length; i++)
              -Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) &&
                (e = i);
            return !y.params.allowSwipeToNext &&
              r < y.translate &&
              r < y.minTranslate()
              ? !1
              : !y.params.allowSwipeToPrev &&
                r > y.translate &&
                r > y.maxTranslate() &&
                (y.activeIndex || 0) !== e
              ? !1
              : ("undefined" == typeof a && (a = y.params.speed),
                (y.previousIndex = y.activeIndex || 0),
                (y.activeIndex = e),
                (y.rtl && -r === y.translate) || (!y.rtl && r === y.translate)
                  ? (y.params.autoHeight && y.updateAutoHeight(),
                    y.updateClasses(),
                    "slide" !== y.params.effect && y.setWrapperTranslate(r),
                    !1)
                  : (y.updateClasses(),
                    y.onTransitionStart(t),
                    0 === a
                      ? (y.setWrapperTranslate(r),
                        y.setWrapperTransition(0),
                        y.onTransitionEnd(t))
                      : (y.setWrapperTranslate(r),
                        y.setWrapperTransition(a),
                        y.animating ||
                          ((y.animating = !0),
                          y.wrapper.transitionEnd(function () {
                            y && y.onTransitionEnd(t);
                          }))),
                    !0));
          }),
          (y.onTransitionStart = function (e) {
            "undefined" == typeof e && (e = !0),
              y.params.autoHeight && y.updateAutoHeight(),
              y.lazy && y.lazy.onTransitionStart(),
              e &&
                (y.emit("onTransitionStart", y),
                y.activeIndex !== y.previousIndex &&
                  (y.emit("onSlideChangeStart", y),
                  y.activeIndex > y.previousIndex
                    ? y.emit("onSlideNextStart", y)
                    : y.emit("onSlidePrevStart", y)));
          }),
          (y.onTransitionEnd = function (e) {
            (y.animating = !1),
              y.setWrapperTransition(0),
              "undefined" == typeof e && (e = !0),
              y.lazy && y.lazy.onTransitionEnd(),
              e &&
                (y.emit("onTransitionEnd", y),
                y.activeIndex !== y.previousIndex &&
                  (y.emit("onSlideChangeEnd", y),
                  y.activeIndex > y.previousIndex
                    ? y.emit("onSlideNextEnd", y)
                    : y.emit("onSlidePrevEnd", y))),
              y.params.hashnav && y.hashnav && y.hashnav.setHash();
          }),
          (y.slideNext = function (e, a, t) {
            if (y.params.loop) {
              if (y.animating) return !1;
              y.fixLoop();
              y.container[0].clientLeft;
              return y.slideTo(
                y.activeIndex + y.params.slidesPerGroup,
                a,
                e,
                t
              );
            }
            return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
          }),
          (y._slideNext = function (e) {
            return y.slideNext(!0, e, !0);
          }),
          (y.slidePrev = function (e, a, t) {
            if (y.params.loop) {
              if (y.animating) return !1;
              y.fixLoop();
              y.container[0].clientLeft;
              return y.slideTo(y.activeIndex - 1, a, e, t);
            }
            return y.slideTo(y.activeIndex - 1, a, e, t);
          }),
          (y._slidePrev = function (e) {
            return y.slidePrev(!0, e, !0);
          }),
          (y.slideReset = function (e, a, t) {
            return y.slideTo(y.activeIndex, a, e);
          }),
          (y.setWrapperTransition = function (e, a) {
            y.wrapper.transition(e),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                y.effects[y.params.effect].setTransition(e),
              y.params.parallax && y.parallax && y.parallax.setTransition(e),
              y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e),
              y.params.control &&
                y.controller &&
                y.controller.setTransition(e, a),
              y.emit("onSetTransition", y, e);
          }),
          (y.setWrapperTranslate = function (e, a, t) {
            var s = 0,
              i = 0,
              n = 0;
            y.isHorizontal() ? (s = y.rtl ? -e : e) : (i = e),
              y.params.roundLengths && ((s = r(s)), (i = r(i))),
              y.params.virtualTranslate ||
                (y.support.transforms3d
                  ? y.wrapper.transform(
                      "translate3d(" + s + "px, " + i + "px, " + n + "px)"
                    )
                  : y.wrapper.transform("translate(" + s + "px, " + i + "px)")),
              (y.translate = y.isHorizontal() ? s : i);
            var o,
              l = y.maxTranslate() - y.minTranslate();
            (o = 0 === l ? 0 : (e - y.minTranslate()) / l),
              o !== y.progress && y.updateProgress(e),
              a && y.updateActiveIndex(),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                y.effects[y.params.effect].setTranslate(y.translate),
              y.params.parallax &&
                y.parallax &&
                y.parallax.setTranslate(y.translate),
              y.params.scrollbar &&
                y.scrollbar &&
                y.scrollbar.setTranslate(y.translate),
              y.params.control &&
                y.controller &&
                y.controller.setTranslate(y.translate, t),
              y.emit("onSetTranslate", y, y.translate);
          }),
          (y.getTranslate = function (e, a) {
            var t, s, r, i;
            return (
              "undefined" == typeof a && (a = "x"),
              y.params.virtualTranslate
                ? y.rtl
                  ? -y.translate
                  : y.translate
                : ((r = window.getComputedStyle(e, null)),
                  window.WebKitCSSMatrix
                    ? ((s = r.transform || r.webkitTransform),
                      s.split(",").length > 6 &&
                        (s = s
                          .split(", ")
                          .map(function (e) {
                            return e.replace(",", ".");
                          })
                          .join(", ")),
                      (i = new window.WebKitCSSMatrix("none" === s ? "" : s)))
                    : ((i =
                        r.MozTransform ||
                        r.OTransform ||
                        r.MsTransform ||
                        r.msTransform ||
                        r.transform ||
                        r
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,")),
                      (t = i.toString().split(","))),
                  "x" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m41
                      : 16 === t.length
                      ? parseFloat(t[12])
                      : parseFloat(t[4])),
                  "y" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m42
                      : 16 === t.length
                      ? parseFloat(t[13])
                      : parseFloat(t[5])),
                  y.rtl && s && (s = -s),
                  s || 0)
            );
          }),
          (y.getWrapperTranslate = function (e) {
            return (
              "undefined" == typeof e && (e = y.isHorizontal() ? "x" : "y"),
              y.getTranslate(y.wrapper[0], e)
            );
          }),
          (y.observers = []),
          (y.initObservers = function () {
            if (y.params.observeParents)
              for (var e = y.container.parents(), a = 0; a < e.length; a++)
                o(e[a]);
            o(y.container[0], { childList: !1 }),
              o(y.wrapper[0], { attributes: !1 });
          }),
          (y.disconnectObservers = function () {
            for (var e = 0; e < y.observers.length; e++)
              y.observers[e].disconnect();
            y.observers = [];
          }),
          (y.createLoop = function () {
            y.wrapper
              .children(
                "." + y.params.slideClass + "." + y.params.slideDuplicateClass
              )
              .remove();
            var e = y.wrapper.children("." + y.params.slideClass);
            "auto" !== y.params.slidesPerView ||
              y.params.loopedSlides ||
              (y.params.loopedSlides = e.length),
              (y.loopedSlides = parseInt(
                y.params.loopedSlides || y.params.slidesPerView,
                10
              )),
              (y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides),
              y.loopedSlides > e.length && (y.loopedSlides = e.length);
            var t,
              s = [],
              r = [];
            for (
              e.each(function (t, i) {
                var n = a(this);
                t < y.loopedSlides && r.push(i),
                  t < e.length && t >= e.length - y.loopedSlides && s.push(i),
                  n.attr("data-swiper-slide-index", t);
              }),
                t = 0;
              t < r.length;
              t++
            )
              y.wrapper.append(
                a(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass)
              );
            for (t = s.length - 1; t >= 0; t--)
              y.wrapper.prepend(
                a(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass)
              );
          }),
          (y.destroyLoop = function () {
            y.wrapper
              .children(
                "." + y.params.slideClass + "." + y.params.slideDuplicateClass
              )
              .remove(),
              y.slides.removeAttr("data-swiper-slide-index");
          }),
          (y.reLoop = function (e) {
            var a = y.activeIndex - y.loopedSlides;
            y.destroyLoop(),
              y.createLoop(),
              y.updateSlidesSize(),
              e && y.slideTo(a + y.loopedSlides, 0, !1);
          }),
          (y.fixLoop = function () {
            var e;
            y.activeIndex < y.loopedSlides
              ? ((e = y.slides.length - 3 * y.loopedSlides + y.activeIndex),
                (e += y.loopedSlides),
                y.slideTo(e, 0, !1, !0))
              : (("auto" === y.params.slidesPerView &&
                  y.activeIndex >= 2 * y.loopedSlides) ||
                  y.activeIndex >
                    y.slides.length - 2 * y.params.slidesPerView) &&
                ((e = -y.slides.length + y.activeIndex + y.loopedSlides),
                (e += y.loopedSlides),
                y.slideTo(e, 0, !1, !0));
          }),
          (y.appendSlide = function (e) {
            if (
              (y.params.loop && y.destroyLoop(),
              "object" == typeof e && e.length)
            )
              for (var a = 0; a < e.length; a++) e[a] && y.wrapper.append(e[a]);
            else y.wrapper.append(e);
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0);
          }),
          (y.prependSlide = function (e) {
            y.params.loop && y.destroyLoop();
            var a = y.activeIndex + 1;
            if ("object" == typeof e && e.length) {
              for (var t = 0; t < e.length; t++)
                e[t] && y.wrapper.prepend(e[t]);
              a = y.activeIndex + e.length;
            } else y.wrapper.prepend(e);
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0),
              y.slideTo(a, 0, !1);
          }),
          (y.removeSlide = function (e) {
            y.params.loop &&
              (y.destroyLoop(),
              (y.slides = y.wrapper.children("." + y.params.slideClass)));
            var a,
              t = y.activeIndex;
            if ("object" == typeof e && e.length) {
              for (var s = 0; s < e.length; s++)
                (a = e[s]),
                  y.slides[a] && y.slides.eq(a).remove(),
                  t > a && t--;
              t = Math.max(t, 0);
            } else
              (a = e),
                y.slides[a] && y.slides.eq(a).remove(),
                t > a && t--,
                (t = Math.max(t, 0));
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0),
              y.params.loop
                ? y.slideTo(t + y.loopedSlides, 0, !1)
                : y.slideTo(t, 0, !1);
          }),
          (y.removeAllSlides = function () {
            for (var e = [], a = 0; a < y.slides.length; a++) e.push(a);
            y.removeSlide(e);
          }),
          (y.effects = {
            fade: {
              setTranslate: function () {
                for (var e = 0; e < y.slides.length; e++) {
                  var a = y.slides.eq(e),
                    t = a[0].swiperSlideOffset,
                    s = -t;
                  y.params.virtualTranslate || (s -= y.translate);
                  var r = 0;
                  y.isHorizontal() || ((r = s), (s = 0));
                  var i = y.params.fade.crossFade
                    ? Math.max(1 - Math.abs(a[0].progress), 0)
                    : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                  a.css({ opacity: i }).transform(
                    "translate3d(" + s + "px, " + r + "px, 0px)"
                  );
                }
              },
              setTransition: function (e) {
                if (
                  (y.slides.transition(e), y.params.virtualTranslate && 0 !== e)
                ) {
                  var a = !1;
                  y.slides.transitionEnd(function () {
                    if (!a && y) {
                      (a = !0), (y.animating = !1);
                      for (
                        var e = [
                            "webkitTransitionEnd",
                            "transitionend",
                            "oTransitionEnd",
                            "MSTransitionEnd",
                            "msTransitionEnd",
                          ],
                          t = 0;
                        t < e.length;
                        t++
                      )
                        y.wrapper.trigger(e[t]);
                    }
                  });
                }
              },
            },
            flip: {
              setTranslate: function () {
                for (var e = 0; e < y.slides.length; e++) {
                  var t = y.slides.eq(e),
                    s = t[0].progress;
                  y.params.flip.limitRotation &&
                    (s = Math.max(Math.min(t[0].progress, 1), -1));
                  var r = t[0].swiperSlideOffset,
                    i = -180 * s,
                    n = i,
                    o = 0,
                    l = -r,
                    p = 0;
                  if (
                    (y.isHorizontal()
                      ? y.rtl && (n = -n)
                      : ((p = l), (l = 0), (o = -n), (n = 0)),
                    (t[0].style.zIndex =
                      -Math.abs(Math.round(s)) + y.slides.length),
                    y.params.flip.slideShadows)
                  ) {
                    var d = y.isHorizontal()
                        ? t.find(".swiper-slide-shadow-left")
                        : t.find(".swiper-slide-shadow-top"),
                      u = y.isHorizontal()
                        ? t.find(".swiper-slide-shadow-right")
                        : t.find(".swiper-slide-shadow-bottom");
                    0 === d.length &&
                      ((d = a(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      t.append(d)),
                      0 === u.length &&
                        ((u = a(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        t.append(u)),
                      d.length && (d[0].style.opacity = Math.max(-s, 0)),
                      u.length && (u[0].style.opacity = Math.max(s, 0));
                  }
                  t.transform(
                    "translate3d(" +
                      l +
                      "px, " +
                      p +
                      "px, 0px) rotateX(" +
                      o +
                      "deg) rotateY(" +
                      n +
                      "deg)"
                  );
                }
              },
              setTransition: function (e) {
                if (
                  (y.slides
                    .transition(e)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e),
                  y.params.virtualTranslate && 0 !== e)
                ) {
                  var t = !1;
                  y.slides.eq(y.activeIndex).transitionEnd(function () {
                    if (
                      !t &&
                      y &&
                      a(this).hasClass(y.params.slideActiveClass)
                    ) {
                      (t = !0), (y.animating = !1);
                      for (
                        var e = [
                            "webkitTransitionEnd",
                            "transitionend",
                            "oTransitionEnd",
                            "MSTransitionEnd",
                            "msTransitionEnd",
                          ],
                          s = 0;
                        s < e.length;
                        s++
                      )
                        y.wrapper.trigger(e[s]);
                    }
                  });
                }
              },
            },
            cube: {
              setTranslate: function () {
                var e,
                  t = 0;
                y.params.cube.shadow &&
                  (y.isHorizontal()
                    ? ((e = y.wrapper.find(".swiper-cube-shadow")),
                      0 === e.length &&
                        ((e = a('<div class="swiper-cube-shadow"></div>')),
                        y.wrapper.append(e)),
                      e.css({ height: y.width + "px" }))
                    : ((e = y.container.find(".swiper-cube-shadow")),
                      0 === e.length &&
                        ((e = a('<div class="swiper-cube-shadow"></div>')),
                        y.container.append(e))));
                for (var s = 0; s < y.slides.length; s++) {
                  var r = y.slides.eq(s),
                    i = 90 * s,
                    n = Math.floor(i / 360);
                  y.rtl && ((i = -i), (n = Math.floor(-i / 360)));
                  var o = Math.max(Math.min(r[0].progress, 1), -1),
                    l = 0,
                    p = 0,
                    d = 0;
                  s % 4 === 0
                    ? ((l = 4 * -n * y.size), (d = 0))
                    : (s - 1) % 4 === 0
                    ? ((l = 0), (d = 4 * -n * y.size))
                    : (s - 2) % 4 === 0
                    ? ((l = y.size + 4 * n * y.size), (d = y.size))
                    : (s - 3) % 4 === 0 &&
                      ((l = -y.size), (d = 3 * y.size + 4 * y.size * n)),
                    y.rtl && (l = -l),
                    y.isHorizontal() || ((p = l), (l = 0));
                  var u =
                    "rotateX(" +
                    (y.isHorizontal() ? 0 : -i) +
                    "deg) rotateY(" +
                    (y.isHorizontal() ? i : 0) +
                    "deg) translate3d(" +
                    l +
                    "px, " +
                    p +
                    "px, " +
                    d +
                    "px)";
                  if (
                    (1 >= o &&
                      o > -1 &&
                      ((t = 90 * s + 90 * o), y.rtl && (t = 90 * -s - 90 * o)),
                    r.transform(u),
                    y.params.cube.slideShadows)
                  ) {
                    var c = y.isHorizontal()
                        ? r.find(".swiper-slide-shadow-left")
                        : r.find(".swiper-slide-shadow-top"),
                      m = y.isHorizontal()
                        ? r.find(".swiper-slide-shadow-right")
                        : r.find(".swiper-slide-shadow-bottom");
                    0 === c.length &&
                      ((c = a(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      r.append(c)),
                      0 === m.length &&
                        ((m = a(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        r.append(m)),
                      c.length && (c[0].style.opacity = Math.max(-o, 0)),
                      m.length && (m[0].style.opacity = Math.max(o, 0));
                  }
                }
                if (
                  (y.wrapper.css({
                    "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "transform-origin": "50% 50% -" + y.size / 2 + "px",
                  }),
                  y.params.cube.shadow)
                )
                  if (y.isHorizontal())
                    e.transform(
                      "translate3d(0px, " +
                        (y.width / 2 + y.params.cube.shadowOffset) +
                        "px, " +
                        -y.width / 2 +
                        "px) rotateX(90deg) rotateZ(0deg) scale(" +
                        y.params.cube.shadowScale +
                        ")"
                    );
                  else {
                    var f = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                      g =
                        1.5 -
                        (Math.sin((2 * f * Math.PI) / 360) / 2 +
                          Math.cos((2 * f * Math.PI) / 360) / 2),
                      h = y.params.cube.shadowScale,
                      v = y.params.cube.shadowScale / g,
                      w = y.params.cube.shadowOffset;
                    e.transform(
                      "scale3d(" +
                        h +
                        ", 1, " +
                        v +
                        ") translate3d(0px, " +
                        (y.height / 2 + w) +
                        "px, " +
                        -y.height / 2 / v +
                        "px) rotateX(-90deg)"
                    );
                  }
                var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
                y.wrapper.transform(
                  "translate3d(0px,0," +
                    b +
                    "px) rotateX(" +
                    (y.isHorizontal() ? 0 : t) +
                    "deg) rotateY(" +
                    (y.isHorizontal() ? -t : 0) +
                    "deg)"
                );
              },
              setTransition: function (e) {
                y.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  y.params.cube.shadow &&
                    !y.isHorizontal() &&
                    y.container.find(".swiper-cube-shadow").transition(e);
              },
            },
            coverflow: {
              setTranslate: function () {
                for (
                  var e = y.translate,
                    t = y.isHorizontal() ? -e + y.width / 2 : -e + y.height / 2,
                    s = y.isHorizontal()
                      ? y.params.coverflow.rotate
                      : -y.params.coverflow.rotate,
                    r = y.params.coverflow.depth,
                    i = 0,
                    n = y.slides.length;
                  n > i;
                  i++
                ) {
                  var o = y.slides.eq(i),
                    l = y.slidesSizesGrid[i],
                    p = o[0].swiperSlideOffset,
                    d = ((t - p - l / 2) / l) * y.params.coverflow.modifier,
                    u = y.isHorizontal() ? s * d : 0,
                    c = y.isHorizontal() ? 0 : s * d,
                    m = -r * Math.abs(d),
                    f = y.isHorizontal() ? 0 : y.params.coverflow.stretch * d,
                    g = y.isHorizontal() ? y.params.coverflow.stretch * d : 0;
                  Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(f) < 0.001 && (f = 0),
                    Math.abs(m) < 0.001 && (m = 0),
                    Math.abs(u) < 0.001 && (u = 0),
                    Math.abs(c) < 0.001 && (c = 0);
                  var h =
                    "translate3d(" +
                    g +
                    "px," +
                    f +
                    "px," +
                    m +
                    "px)  rotateX(" +
                    c +
                    "deg) rotateY(" +
                    u +
                    "deg)";
                  if (
                    (o.transform(h),
                    (o[0].style.zIndex = -Math.abs(Math.round(d)) + 1),
                    y.params.coverflow.slideShadows)
                  ) {
                    var v = y.isHorizontal()
                        ? o.find(".swiper-slide-shadow-left")
                        : o.find(".swiper-slide-shadow-top"),
                      w = y.isHorizontal()
                        ? o.find(".swiper-slide-shadow-right")
                        : o.find(".swiper-slide-shadow-bottom");
                    0 === v.length &&
                      ((v = a(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      o.append(v)),
                      0 === w.length &&
                        ((w = a(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        o.append(w)),
                      v.length && (v[0].style.opacity = d > 0 ? d : 0),
                      w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
                  }
                }
                if (y.browser.ie) {
                  var b = y.wrapper[0].style;
                  b.perspectiveOrigin = t + "px 50%";
                }
              },
              setTransition: function (e) {
                y.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e);
              },
            },
          }),
          (y.lazy = {
            initialImageLoaded: !1,
            loadImageInSlide: function (e, t) {
              if (
                "undefined" != typeof e &&
                ("undefined" == typeof t && (t = !0), 0 !== y.slides.length)
              ) {
                var s = y.slides.eq(e),
                  r = s.find(
                    ".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)"
                  );
                !s.hasClass("swiper-lazy") ||
                  s.hasClass("swiper-lazy-loaded") ||
                  s.hasClass("swiper-lazy-loading") ||
                  (r = r.add(s[0])),
                  0 !== r.length &&
                    r.each(function () {
                      var e = a(this);
                      e.addClass("swiper-lazy-loading");
                      var r = e.attr("data-background"),
                        i = e.attr("data-src"),
                        n = e.attr("data-srcset");
                      y.loadImage(e[0], i || r, n, !1, function () {
                        if (
                          (r
                            ? (e.css("background-image", 'url("' + r + '")'),
                              e.removeAttr("data-background"))
                            : (n &&
                                (e.attr("srcset", n),
                                e.removeAttr("data-srcset")),
                              i &&
                                (e.attr("src", i), e.removeAttr("data-src"))),
                          e
                            .addClass("swiper-lazy-loaded")
                            .removeClass("swiper-lazy-loading"),
                          s.find(".swiper-lazy-preloader, .preloader").remove(),
                          y.params.loop && t)
                        ) {
                          var a = s.attr("data-swiper-slide-index");
                          if (s.hasClass(y.params.slideDuplicateClass)) {
                            var o = y.wrapper.children(
                              '[data-swiper-slide-index="' +
                                a +
                                '"]:not(.' +
                                y.params.slideDuplicateClass +
                                ")"
                            );
                            y.lazy.loadImageInSlide(o.index(), !1);
                          } else {
                            var l = y.wrapper.children(
                              "." +
                                y.params.slideDuplicateClass +
                                '[data-swiper-slide-index="' +
                                a +
                                '"]'
                            );
                            y.lazy.loadImageInSlide(l.index(), !1);
                          }
                        }
                        y.emit("onLazyImageReady", y, s[0], e[0]);
                      }),
                        y.emit("onLazyImageLoad", y, s[0], e[0]);
                    });
              }
            },
            load: function () {
              var e;
              if (y.params.watchSlidesVisibility)
                y.wrapper
                  .children("." + y.params.slideVisibleClass)
                  .each(function () {
                    y.lazy.loadImageInSlide(a(this).index());
                  });
              else if (y.params.slidesPerView > 1)
                for (
                  e = y.activeIndex;
                  e < y.activeIndex + y.params.slidesPerView;
                  e++
                )
                  y.slides[e] && y.lazy.loadImageInSlide(e);
              else y.lazy.loadImageInSlide(y.activeIndex);
              if (y.params.lazyLoadingInPrevNext)
                if (
                  y.params.slidesPerView > 1 ||
                  (y.params.lazyLoadingInPrevNextAmount &&
                    y.params.lazyLoadingInPrevNextAmount > 1)
                ) {
                  var t = y.params.lazyLoadingInPrevNextAmount,
                    s = y.params.slidesPerView,
                    r = Math.min(
                      y.activeIndex + s + Math.max(t, s),
                      y.slides.length
                    ),
                    i = Math.max(y.activeIndex - Math.max(s, t), 0);
                  for (e = y.activeIndex + y.params.slidesPerView; r > e; e++)
                    y.slides[e] && y.lazy.loadImageInSlide(e);
                  for (e = i; e < y.activeIndex; e++)
                    y.slides[e] && y.lazy.loadImageInSlide(e);
                } else {
                  var n = y.wrapper.children("." + y.params.slideNextClass);
                  n.length > 0 && y.lazy.loadImageInSlide(n.index());
                  var o = y.wrapper.children("." + y.params.slidePrevClass);
                  o.length > 0 && y.lazy.loadImageInSlide(o.index());
                }
            },
            onTransitionStart: function () {
              y.params.lazyLoading &&
                (y.params.lazyLoadingOnTransitionStart ||
                  (!y.params.lazyLoadingOnTransitionStart &&
                    !y.lazy.initialImageLoaded)) &&
                y.lazy.load();
            },
            onTransitionEnd: function () {
              y.params.lazyLoading &&
                !y.params.lazyLoadingOnTransitionStart &&
                y.lazy.load();
            },
          }),
          (y.scrollbar = {
            isTouched: !1,
            setDragPosition: function (e) {
              var a = y.scrollbar,
                t = y.isHorizontal()
                  ? "touchstart" === e.type || "touchmove" === e.type
                    ? e.targetTouches[0].pageX
                    : e.pageX || e.clientX
                  : "touchstart" === e.type || "touchmove" === e.type
                  ? e.targetTouches[0].pageY
                  : e.pageY || e.clientY,
                s =
                  t -
                  a.track.offset()[y.isHorizontal() ? "left" : "top"] -
                  a.dragSize / 2,
                r = -y.minTranslate() * a.moveDivider,
                i = -y.maxTranslate() * a.moveDivider;
              r > s ? (s = r) : s > i && (s = i),
                (s = -s / a.moveDivider),
                y.updateProgress(s),
                y.setWrapperTranslate(s, !0);
            },
            dragStart: function (e) {
              var a = y.scrollbar;
              (a.isTouched = !0),
                e.preventDefault(),
                e.stopPropagation(),
                a.setDragPosition(e),
                clearTimeout(a.dragTimeout),
                a.track.transition(0),
                y.params.scrollbarHide && a.track.css("opacity", 1),
                y.wrapper.transition(100),
                a.drag.transition(100),
                y.emit("onScrollbarDragStart", y);
            },
            dragMove: function (e) {
              var a = y.scrollbar;
              a.isTouched &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                a.setDragPosition(e),
                y.wrapper.transition(0),
                a.track.transition(0),
                a.drag.transition(0),
                y.emit("onScrollbarDragMove", y));
            },
            dragEnd: function (e) {
              var a = y.scrollbar;
              a.isTouched &&
                ((a.isTouched = !1),
                y.params.scrollbarHide &&
                  (clearTimeout(a.dragTimeout),
                  (a.dragTimeout = setTimeout(function () {
                    a.track.css("opacity", 0), a.track.transition(400);
                  }, 1e3))),
                y.emit("onScrollbarDragEnd", y),
                y.params.scrollbarSnapOnRelease && y.slideReset());
            },
            enableDraggable: function () {
              var e = y.scrollbar,
                t = y.support.touch ? e.track : document;
              a(e.track).on(y.touchEvents.start, e.dragStart),
                a(t).on(y.touchEvents.move, e.dragMove),
                a(t).on(y.touchEvents.end, e.dragEnd);
            },
            disableDraggable: function () {
              var e = y.scrollbar,
                t = y.support.touch ? e.track : document;
              a(e.track).off(y.touchEvents.start, e.dragStart),
                a(t).off(y.touchEvents.move, e.dragMove),
                a(t).off(y.touchEvents.end, e.dragEnd);
            },
            set: function () {
              if (y.params.scrollbar) {
                var e = y.scrollbar;
                (e.track = a(y.params.scrollbar)),
                  y.params.uniqueNavElements &&
                    "string" == typeof y.params.scrollbar &&
                    e.track.length > 1 &&
                    1 === y.container.find(y.params.scrollbar).length &&
                    (e.track = y.container.find(y.params.scrollbar)),
                  (e.drag = e.track.find(".swiper-scrollbar-drag")),
                  0 === e.drag.length &&
                    ((e.drag = a('<div class="swiper-scrollbar-drag"></div>')),
                    e.track.append(e.drag)),
                  (e.drag[0].style.width = ""),
                  (e.drag[0].style.height = ""),
                  (e.trackSize = y.isHorizontal()
                    ? e.track[0].offsetWidth
                    : e.track[0].offsetHeight),
                  (e.divider = y.size / y.virtualSize),
                  (e.moveDivider = e.divider * (e.trackSize / y.size)),
                  (e.dragSize = e.trackSize * e.divider),
                  y.isHorizontal()
                    ? (e.drag[0].style.width = e.dragSize + "px")
                    : (e.drag[0].style.height = e.dragSize + "px"),
                  e.divider >= 1
                    ? (e.track[0].style.display = "none")
                    : (e.track[0].style.display = ""),
                  y.params.scrollbarHide && (e.track[0].style.opacity = 0);
              }
            },
            setTranslate: function () {
              if (y.params.scrollbar) {
                var e,
                  a = y.scrollbar,
                  t = (y.translate || 0, a.dragSize);
                (e = (a.trackSize - a.dragSize) * y.progress),
                  y.rtl && y.isHorizontal()
                    ? ((e = -e),
                      e > 0
                        ? ((t = a.dragSize - e), (e = 0))
                        : -e + a.dragSize > a.trackSize &&
                          (t = a.trackSize + e))
                    : 0 > e
                    ? ((t = a.dragSize + e), (e = 0))
                    : e + a.dragSize > a.trackSize && (t = a.trackSize - e),
                  y.isHorizontal()
                    ? (y.support.transforms3d
                        ? a.drag.transform("translate3d(" + e + "px, 0, 0)")
                        : a.drag.transform("translateX(" + e + "px)"),
                      (a.drag[0].style.width = t + "px"))
                    : (y.support.transforms3d
                        ? a.drag.transform("translate3d(0px, " + e + "px, 0)")
                        : a.drag.transform("translateY(" + e + "px)"),
                      (a.drag[0].style.height = t + "px")),
                  y.params.scrollbarHide &&
                    (clearTimeout(a.timeout),
                    (a.track[0].style.opacity = 1),
                    (a.timeout = setTimeout(function () {
                      (a.track[0].style.opacity = 0), a.track.transition(400);
                    }, 1e3)));
              }
            },
            setTransition: function (e) {
              y.params.scrollbar && y.scrollbar.drag.transition(e);
            },
          }),
          (y.controller = {
            LinearSpline: function (e, a) {
              (this.x = e), (this.y = a), (this.lastIndex = e.length - 1);
              var t, s;
              this.x.length;
              this.interpolate = function (e) {
                return e
                  ? ((s = r(this.x, e)),
                    (t = s - 1),
                    ((e - this.x[t]) * (this.y[s] - this.y[t])) /
                      (this.x[s] - this.x[t]) +
                      this.y[t])
                  : 0;
              };
              var r = (function () {
                var e, a, t;
                return function (s, r) {
                  for (a = -1, e = s.length; e - a > 1; )
                    s[(t = (e + a) >> 1)] <= r ? (a = t) : (e = t);
                  return e;
                };
              })();
            },
            getInterpolateFunction: function (e) {
              y.controller.spline ||
                (y.controller.spline = y.params.loop
                  ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid)
                  : new y.controller.LinearSpline(y.snapGrid, e.snapGrid));
            },
            setTranslate: function (e, a) {
              function s(a) {
                (e =
                  a.rtl && "horizontal" === a.params.direction
                    ? -y.translate
                    : y.translate),
                  "slide" === y.params.controlBy &&
                    (y.controller.getInterpolateFunction(a),
                    (i = -y.controller.spline.interpolate(-e))),
                  (i && "container" !== y.params.controlBy) ||
                    ((r =
                      (a.maxTranslate() - a.minTranslate()) /
                      (y.maxTranslate() - y.minTranslate())),
                    (i = (e - y.minTranslate()) * r + a.minTranslate())),
                  y.params.controlInverse && (i = a.maxTranslate() - i),
                  a.updateProgress(i),
                  a.setWrapperTranslate(i, !1, y),
                  a.updateActiveIndex();
              }
              var r,
                i,
                n = y.params.control;
              if (y.isArray(n))
                for (var o = 0; o < n.length; o++)
                  n[o] !== a && n[o] instanceof t && s(n[o]);
              else n instanceof t && a !== n && s(n);
            },
            setTransition: function (e, a) {
              function s(a) {
                a.setWrapperTransition(e, y),
                  0 !== e &&
                    (a.onTransitionStart(),
                    a.wrapper.transitionEnd(function () {
                      i &&
                        (a.params.loop &&
                          "slide" === y.params.controlBy &&
                          a.fixLoop(),
                        a.onTransitionEnd());
                    }));
              }
              var r,
                i = y.params.control;
              if (y.isArray(i))
                for (r = 0; r < i.length; r++)
                  i[r] !== a && i[r] instanceof t && s(i[r]);
              else i instanceof t && a !== i && s(i);
            },
          }),
          (y.hashnav = {
            init: function () {
              if (y.params.hashnav) {
                y.hashnav.initialized = !0;
                var e = document.location.hash.replace("#", "");
                if (e)
                  for (var a = 0, t = 0, s = y.slides.length; s > t; t++) {
                    var r = y.slides.eq(t),
                      i = r.attr("data-hash");
                    if (i === e && !r.hasClass(y.params.slideDuplicateClass)) {
                      var n = r.index();
                      y.slideTo(n, a, y.params.runCallbacksOnInit, !0);
                    }
                  }
              }
            },
            setHash: function () {
              y.hashnav.initialized &&
                y.params.hashnav &&
                (document.location.hash =
                  y.slides.eq(y.activeIndex).attr("data-hash") || "");
            },
          }),
          (y.disableKeyboardControl = function () {
            (y.params.keyboardControl = !1), a(document).off("keydown", l);
          }),
          (y.enableKeyboardControl = function () {
            (y.params.keyboardControl = !0), a(document).on("keydown", l);
          }),
          (y.mousewheel = {
            event: !1,
            lastScrollTime: new window.Date().getTime(),
          }),
          y.params.mousewheelControl)
        ) {
          try {
            new window.WheelEvent("wheel"), (y.mousewheel.event = "wheel");
          } catch (O) {
            (window.WheelEvent ||
              (y.container[0] && "wheel" in y.container[0])) &&
              (y.mousewheel.event = "wheel");
          }
          !y.mousewheel.event && window.WheelEvent,
            y.mousewheel.event ||
              void 0 === document.onmousewheel ||
              (y.mousewheel.event = "mousewheel"),
            y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll");
        }
        (y.disableMousewheelControl = function () {
          return y.mousewheel.event
            ? (y.container.off(y.mousewheel.event, p), !0)
            : !1;
        }),
          (y.enableMousewheelControl = function () {
            return y.mousewheel.event
              ? (y.container.on(y.mousewheel.event, p), !0)
              : !1;
          }),
          (y.parallax = {
            setTranslate: function () {
              y.container
                .children(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function () {
                  d(this, y.progress);
                }),
                y.slides.each(function () {
                  var e = a(this);
                  e.find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  ).each(function () {
                    var a = Math.min(Math.max(e[0].progress, -1), 1);
                    d(this, a);
                  });
                });
            },
            setTransition: function (e) {
              "undefined" == typeof e && (e = y.params.speed),
                y.container
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  )
                  .each(function () {
                    var t = a(this),
                      s =
                        parseInt(t.attr("data-swiper-parallax-duration"), 10) ||
                        e;
                    0 === e && (s = 0), t.transition(s);
                  });
            },
          }),
          (y._plugins = []);
        for (var N in y.plugins) {
          var R = y.plugins[N](y, y.params[N]);
          R && y._plugins.push(R);
        }
        return (
          (y.callPlugins = function (e) {
            for (var a = 0; a < y._plugins.length; a++)
              e in y._plugins[a] &&
                y._plugins[a][e](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
          }),
          (y.emitterEventListeners = {}),
          (y.emit = function (e) {
            y.params[e] &&
              y.params[e](
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
            var a;
            if (y.emitterEventListeners[e])
              for (a = 0; a < y.emitterEventListeners[e].length; a++)
                y.emitterEventListeners[e][a](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
            y.callPlugins &&
              y.callPlugins(
                e,
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
          }),
          (y.on = function (e, a) {
            return (
              (e = u(e)),
              y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []),
              y.emitterEventListeners[e].push(a),
              y
            );
          }),
          (y.off = function (e, a) {
            var t;
            if (((e = u(e)), "undefined" == typeof a))
              return (y.emitterEventListeners[e] = []), y;
            if (
              y.emitterEventListeners[e] &&
              0 !== y.emitterEventListeners[e].length
            ) {
              for (t = 0; t < y.emitterEventListeners[e].length; t++)
                y.emitterEventListeners[e][t] === a &&
                  y.emitterEventListeners[e].splice(t, 1);
              return y;
            }
          }),
          (y.once = function (e, a) {
            e = u(e);
            var t = function () {
              a(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4]
              ),
                y.off(e, t);
            };
            return y.on(e, t), y;
          }),
          (y.a11y = {
            makeFocusable: function (e) {
              return e.attr("tabIndex", "0"), e;
            },
            addRole: function (e, a) {
              return e.attr("role", a), e;
            },
            addLabel: function (e, a) {
              return e.attr("aria-label", a), e;
            },
            disable: function (e) {
              return e.attr("aria-disabled", !0), e;
            },
            enable: function (e) {
              return e.attr("aria-disabled", !1), e;
            },
            onEnterKey: function (e) {
              13 === e.keyCode &&
                (a(e.target).is(y.params.nextButton)
                  ? (y.onClickNext(e),
                    y.isEnd
                      ? y.a11y.notify(y.params.lastSlideMessage)
                      : y.a11y.notify(y.params.nextSlideMessage))
                  : a(e.target).is(y.params.prevButton) &&
                    (y.onClickPrev(e),
                    y.isBeginning
                      ? y.a11y.notify(y.params.firstSlideMessage)
                      : y.a11y.notify(y.params.prevSlideMessage)),
                a(e.target).is("." + y.params.bulletClass) &&
                  a(e.target)[0].click());
            },
            liveRegion: a(
              '<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'
            ),
            notify: function (e) {
              var a = y.a11y.liveRegion;
              0 !== a.length && (a.html(""), a.html(e));
            },
            init: function () {
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.a11y.makeFocusable(y.nextButton),
                y.a11y.addRole(y.nextButton, "button"),
                y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)),
                y.params.prevButton &&
                  y.prevButton &&
                  y.prevButton.length > 0 &&
                  (y.a11y.makeFocusable(y.prevButton),
                  y.a11y.addRole(y.prevButton, "button"),
                  y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)),
                a(y.container).append(y.a11y.liveRegion);
            },
            initPagination: function () {
              y.params.pagination &&
                y.params.paginationClickable &&
                y.bullets &&
                y.bullets.length &&
                y.bullets.each(function () {
                  var e = a(this);
                  y.a11y.makeFocusable(e),
                    y.a11y.addRole(e, "button"),
                    y.a11y.addLabel(
                      e,
                      y.params.paginationBulletMessage.replace(
                        /{{index}}/,
                        e.index() + 1
                      )
                    );
                });
            },
            destroy: function () {
              y.a11y.liveRegion &&
                y.a11y.liveRegion.length > 0 &&
                y.a11y.liveRegion.remove();
            },
          }),
          (y.init = function () {
            y.params.loop && y.createLoop(),
              y.updateContainerSize(),
              y.updateSlidesSize(),
              y.updatePagination(),
              y.params.scrollbar &&
                y.scrollbar &&
                (y.scrollbar.set(),
                y.params.scrollbarDraggable && y.scrollbar.enableDraggable()),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                (y.params.loop || y.updateProgress(),
                y.effects[y.params.effect].setTranslate()),
              y.params.loop
                ? y.slideTo(
                    y.params.initialSlide + y.loopedSlides,
                    0,
                    y.params.runCallbacksOnInit
                  )
                : (y.slideTo(
                    y.params.initialSlide,
                    0,
                    y.params.runCallbacksOnInit
                  ),
                  0 === y.params.initialSlide &&
                    (y.parallax &&
                      y.params.parallax &&
                      y.parallax.setTranslate(),
                    y.lazy &&
                      y.params.lazyLoading &&
                      (y.lazy.load(), (y.lazy.initialImageLoaded = !0)))),
              y.attachEvents(),
              y.params.observer && y.support.observer && y.initObservers(),
              y.params.preloadImages &&
                !y.params.lazyLoading &&
                y.preloadImages(),
              y.params.autoplay && y.startAutoplay(),
              y.params.keyboardControl &&
                y.enableKeyboardControl &&
                y.enableKeyboardControl(),
              y.params.mousewheelControl &&
                y.enableMousewheelControl &&
                y.enableMousewheelControl(),
              y.params.hashnav && y.hashnav && y.hashnav.init(),
              y.params.a11y && y.a11y && y.a11y.init(),
              y.emit("onInit", y);
          }),
          (y.cleanupStyles = function () {
            y.container.removeClass(y.classNames.join(" ")).removeAttr("style"),
              y.wrapper.removeAttr("style"),
              y.slides &&
                y.slides.length &&
                y.slides
                  .removeClass(
                    [
                      y.params.slideVisibleClass,
                      y.params.slideActiveClass,
                      y.params.slideNextClass,
                      y.params.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row"),
              y.paginationContainer &&
                y.paginationContainer.length &&
                y.paginationContainer.removeClass(
                  y.params.paginationHiddenClass
                ),
              y.bullets &&
                y.bullets.length &&
                y.bullets.removeClass(y.params.bulletActiveClass),
              y.params.prevButton &&
                a(y.params.prevButton).removeClass(
                  y.params.buttonDisabledClass
                ),
              y.params.nextButton &&
                a(y.params.nextButton).removeClass(
                  y.params.buttonDisabledClass
                ),
              y.params.scrollbar &&
                y.scrollbar &&
                (y.scrollbar.track &&
                  y.scrollbar.track.length &&
                  y.scrollbar.track.removeAttr("style"),
                y.scrollbar.drag &&
                  y.scrollbar.drag.length &&
                  y.scrollbar.drag.removeAttr("style"));
          }),
          (y.destroy = function (e, a) {
            y.detachEvents(),
              y.stopAutoplay(),
              y.params.scrollbar &&
                y.scrollbar &&
                y.params.scrollbarDraggable &&
                y.scrollbar.disableDraggable(),
              y.params.loop && y.destroyLoop(),
              a && y.cleanupStyles(),
              y.disconnectObservers(),
              y.params.keyboardControl &&
                y.disableKeyboardControl &&
                y.disableKeyboardControl(),
              y.params.mousewheelControl &&
                y.disableMousewheelControl &&
                y.disableMousewheelControl(),
              y.params.a11y && y.a11y && y.a11y.destroy(),
              y.emit("onDestroy"),
              e !== !1 && (y = null);
          }),
          y.init(),
          y
        );
      }
    };
  t.prototype = {
    isSafari: (function () {
      var e = navigator.userAgent.toLowerCase();
      return (
        e.indexOf("safari") >= 0 &&
        e.indexOf("chrome") < 0 &&
        e.indexOf("android") < 0
      );
    })(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      navigator.userAgent
    ),
    isArray: function (e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch:
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 1) ||
        (window.navigator.pointerEnabled &&
          window.navigator.maxTouchPoints > 1),
    },
    device: (function () {
      var e = navigator.userAgent,
        a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        t = e.match(/(iPad).*OS\s([\d_]+)/),
        s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
      return { ios: t || r || s, android: a };
    })(),
    support: {
      touch:
        (window.Modernizr && Modernizr.touch === !0) ||
        (function () {
          return !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch)
          );
        })(),
      transforms3d:
        (window.Modernizr && Modernizr.csstransforms3d === !0) ||
        (function () {
          var e = document.createElement("div").style;
          return (
            "webkitPerspective" in e ||
            "MozPerspective" in e ||
            "OPerspective" in e ||
            "MsPerspective" in e ||
            "perspective" in e
          );
        })(),
      flexbox: (function () {
        for (
          var e = document.createElement("div").style,
            a =
              "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                " "
              ),
            t = 0;
          t < a.length;
          t++
        )
          if (a[t] in e) return !0;
      })(),
      observer: (function () {
        return (
          "MutationObserver" in window || "WebkitMutationObserver" in window
        );
      })(),
    },
    plugins: {},
  };
  for (var s = ["jQuery", "Zepto", "Dom7"], r = 0; r < s.length; r++)
    window[s[r]] && e(window[s[r]]);
  var i;
  (i =
    "undefined" == typeof Dom7
      ? window.Dom7 || window.Zepto || window.jQuery
      : Dom7),
    i &&
      ("transitionEnd" in i.fn ||
        (i.fn.transitionEnd = function (e) {
          function a(i) {
            if (i.target === this)
              for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a);
          }
          var t,
            s = [
              "webkitTransitionEnd",
              "transitionend",
              "oTransitionEnd",
              "MSTransitionEnd",
              "msTransitionEnd",
            ],
            r = this;
          if (e) for (t = 0; t < s.length; t++) r.on(s[t], a);
          return this;
        }),
      "transform" in i.fn ||
        (i.fn.transform = function (e) {
          for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform =
              t.MsTransform =
              t.msTransform =
              t.MozTransform =
              t.OTransform =
              t.transform =
                e;
          }
          return this;
        }),
      "transition" in i.fn ||
        (i.fn.transition = function (e) {
          "string" != typeof e && (e += "ms");
          for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration =
              t.MsTransitionDuration =
              t.msTransitionDuration =
              t.MozTransitionDuration =
              t.OTransitionDuration =
              t.transitionDuration =
                e;
          }
          return this;
        })),
    (window.Swiper = t);
})(),
  "undefined" != typeof module
    ? (module.exports = window.Swiper)
    : "function" == typeof define &&
      define.amd &&
      define([], function () {
        "use strict";
        return window.Swiper;
      });

/*! WOW - v1.1.2 - 2015-08-19
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.createEvent = function (a, b, c, d) {
        var e;
        return (
          null == b && (b = !1),
          null == c && (c = !1),
          null == d && (d = null),
          null != document.createEvent
            ? ((e = document.createEvent("CustomEvent")),
              e.initCustomEvent(a, b, c, d))
            : null != document.createEventObject
            ? ((e = document.createEventObject()), (e.eventType = a))
            : (e.eventName = a),
          e
        );
      }),
      (a.prototype.emitEvent = function (a, b) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(b)
          : b in (null != a)
          ? a[b]()
          : "on" + b in (null != a)
          ? a["on" + b]()
          : void 0;
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          null != a.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer
            )),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass));
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      var c, d, e, f, g;
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        (f = b[c]),
                          g.push(
                            function () {
                              var a, b, c, d;
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                (e = c[a]), d.push(this.doSync(e));
                              return d;
                            }.call(a)
                          );
                      return g;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler
            ),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.resetAnimation = function (a) {
          var b;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          d = [];
          for (c in b)
            (e = b[c]),
              (a["" + c] = e),
              d.push(
                function () {
                  var b, d, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    (f = g[b]),
                      h.push(
                        (a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                          e)
                      );
                  return h;
                }.call(this)
              );
          return d;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
          return g;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}).call(this);

// Generated by CoffeeScript 1.6.2
/*
 jQuery Waypoints - v2.0.3
 Copyright (c) 2011-2013 Caleb Troughton
 Dual licensed under the MIT license and GPL license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i);
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {};
        }
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke(this, "disable");
      },
      enable: function () {
        return d._invoke(this, "enable");
      },
      destroy: function () {
        return d._invoke(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.load(function () {
      return n[m]("refresh");
    });
  });
}).call(this);

/*
 Tether jQuery
 Copyright © 2014-2016 HubSpot - MIT License
 https://github.com/HubSpot/tether
*/
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e(require, exports, module))
    : (t.Tether = e());
})(this, function (t, e, o) {
  "use strict";
  function i(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(t) {
    var e = getComputedStyle(t),
      o = e.position;
    if ("fixed" === o) return t;
    for (var i = t; (i = i.parentNode); ) {
      var n = void 0;
      try {
        n = getComputedStyle(i);
      } catch (r) {}
      if ("undefined" == typeof n || null === n) return i;
      var s = n,
        a = s.overflow,
        f = s.overflowX,
        h = s.overflowY;
      if (
        /(auto|scroll)/.test(a + h + f) &&
        ("absolute" !== o ||
          ["relative", "absolute", "fixed"].indexOf(n.position) >= 0)
      )
        return i;
    }
    return document.body;
  }
  function r(t) {
    var e = void 0;
    t === document
      ? ((e = document), (t = document.documentElement))
      : (e = t.ownerDocument);
    var o = e.documentElement,
      i = {},
      n = t.getBoundingClientRect();
    for (var r in n) i[r] = n[r];
    var s = x(e);
    return (
      (i.top -= s.top),
      (i.left -= s.left),
      "undefined" == typeof i.width &&
        (i.width = document.body.scrollWidth - i.left - i.right),
      "undefined" == typeof i.height &&
        (i.height = document.body.scrollHeight - i.top - i.bottom),
      (i.top = i.top - o.clientTop),
      (i.left = i.left - o.clientLeft),
      (i.right = e.body.clientWidth - i.width - i.left),
      (i.bottom = e.body.clientHeight - i.height - i.top),
      i
    );
  }
  function s(t) {
    return t.offsetParent || document.documentElement;
  }
  function a() {
    var t = document.createElement("div");
    (t.style.width = "100%"), (t.style.height = "200px");
    var e = document.createElement("div");
    f(e.style, {
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden",
    }),
      e.appendChild(t),
      document.body.appendChild(e);
    var o = t.offsetWidth;
    e.style.overflow = "scroll";
    var i = t.offsetWidth;
    o === i && (i = e.clientWidth), document.body.removeChild(e);
    var n = o - i;
    return { width: n, height: n };
  }
  function f() {
    var t =
        arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
      e = [];
    return (
      Array.prototype.push.apply(e, arguments),
      e.slice(1).forEach(function (e) {
        if (e) for (var o in e) ({}).hasOwnProperty.call(e, o) && (t[o] = e[o]);
      }),
      t
    );
  }
  function h(t, e) {
    if ("undefined" != typeof t.classList)
      e.split(" ").forEach(function (e) {
        e.trim() && t.classList.remove(e);
      });
    else {
      var o = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
        i = u(t).replace(o, " ");
      p(t, i);
    }
  }
  function l(t, e) {
    if ("undefined" != typeof t.classList)
      e.split(" ").forEach(function (e) {
        e.trim() && t.classList.add(e);
      });
    else {
      h(t, e);
      var o = u(t) + (" " + e);
      p(t, o);
    }
  }
  function d(t, e) {
    if ("undefined" != typeof t.classList) return t.classList.contains(e);
    var o = u(t);
    return new RegExp("(^| )" + e + "( |$)", "gi").test(o);
  }
  function u(t) {
    return t.className instanceof SVGAnimatedString
      ? t.className.baseVal
      : t.className;
  }
  function p(t, e) {
    t.setAttribute("class", e);
  }
  function c(t, e, o) {
    o.forEach(function (o) {
      -1 === e.indexOf(o) && d(t, o) && h(t, o);
    }),
      e.forEach(function (e) {
        d(t, e) || l(t, e);
      });
  }
  function i(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function g(t, e) {
    var o = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
    return t + o >= e && e >= t - o;
  }
  function m() {
    return "undefined" != typeof performance &&
      "undefined" != typeof performance.now
      ? performance.now()
      : +new Date();
  }
  function v() {
    for (
      var t = { top: 0, left: 0 }, e = arguments.length, o = Array(e), i = 0;
      e > i;
      i++
    )
      o[i] = arguments[i];
    return (
      o.forEach(function (e) {
        var o = e.top,
          i = e.left;
        "string" == typeof o && (o = parseFloat(o, 10)),
          "string" == typeof i && (i = parseFloat(i, 10)),
          (t.top += o),
          (t.left += i);
      }),
      t
    );
  }
  function y(t, e) {
    return (
      "string" == typeof t.left &&
        -1 !== t.left.indexOf("%") &&
        (t.left = (parseFloat(t.left, 10) / 100) * e.width),
      "string" == typeof t.top &&
        -1 !== t.top.indexOf("%") &&
        (t.top = (parseFloat(t.top, 10) / 100) * e.height),
      t
    );
  }
  function b(t, e) {
    return (
      "scrollParent" === e
        ? (e = t.scrollParent)
        : "window" === e &&
          (e = [
            pageXOffset,
            pageYOffset,
            innerWidth + pageXOffset,
            innerHeight + pageYOffset,
          ]),
      e === document && (e = e.documentElement),
      "undefined" != typeof e.nodeType &&
        !(function () {
          var t = r(e),
            o = t,
            i = getComputedStyle(e);
          (e = [o.left, o.top, t.width + o.left, t.height + o.top]),
            U.forEach(function (t, o) {
              (t = t[0].toUpperCase() + t.substr(1)),
                "Top" === t || "Left" === t
                  ? (e[o] += parseFloat(i["border" + t + "Width"]))
                  : (e[o] -= parseFloat(i["border" + t + "Width"]));
            });
        })(),
      e
    );
  }
  var w = (function () {
      function t(t, e) {
        for (var o = 0; o < e.length; o++) {
          var i = e[o];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
      };
    })(),
    C = void 0;
  "undefined" == typeof C && (C = { modules: [] });
  var O = (function () {
      var t = 0;
      return function () {
        return ++t;
      };
    })(),
    E = {},
    x = function (t) {
      var e = t._tetherZeroElement;
      "undefined" == typeof e &&
        ((e = t.createElement("div")),
        e.setAttribute("data-tether-id", O()),
        f(e.style, { top: 0, left: 0, position: "absolute" }),
        t.body.appendChild(e),
        (t._tetherZeroElement = e));
      var o = e.getAttribute("data-tether-id");
      if ("undefined" == typeof E[o]) {
        E[o] = {};
        var i = e.getBoundingClientRect();
        for (var n in i) E[o][n] = i[n];
        T(function () {
          delete E[o];
        });
      }
      return E[o];
    },
    A = [],
    T = function (t) {
      A.push(t);
    },
    S = function () {
      for (var t = void 0; (t = A.pop()); ) t();
    },
    W = (function () {
      function t() {
        i(this, t);
      }
      return (
        w(t, [
          {
            key: "on",
            value: function (t, e, o) {
              var i =
                arguments.length <= 3 || void 0 === arguments[3]
                  ? !1
                  : arguments[3];
              "undefined" == typeof this.bindings && (this.bindings = {}),
                "undefined" == typeof this.bindings[t] &&
                  (this.bindings[t] = []),
                this.bindings[t].push({ handler: e, ctx: o, once: i });
            },
          },
          {
            key: "once",
            value: function (t, e, o) {
              this.on(t, e, o, !0);
            },
          },
          {
            key: "off",
            value: function (t, e) {
              if (
                "undefined" == typeof this.bindings ||
                "undefined" == typeof this.bindings[t]
              )
                if ("undefined" == typeof e) delete this.bindings[t];
                else
                  for (var o = 0; o < this.bindings[t].length; )
                    this.bindings[t][o].handler === e
                      ? this.bindings[t].splice(o, 1)
                      : ++o;
            },
          },
          {
            key: "trigger",
            value: function (t) {
              if ("undefined" != typeof this.bindings && this.bindings[t]) {
                for (
                  var e = 0,
                    o = arguments.length,
                    i = Array(o > 1 ? o - 1 : 0),
                    n = 1;
                  o > n;
                  n++
                )
                  i[n - 1] = arguments[n];
                for (; e < this.bindings[t].length; ) {
                  var r = this.bindings[t][e],
                    s = r.handler,
                    a = r.ctx,
                    f = r.once,
                    h = a;
                  "undefined" == typeof h && (h = this),
                    s.apply(h, i),
                    f ? this.bindings[t].splice(e, 1) : ++e;
                }
              }
            },
          },
        ]),
        t
      );
    })();
  C.Utils = {
    getScrollParent: n,
    getBounds: r,
    getOffsetParent: s,
    extend: f,
    addClass: l,
    removeClass: h,
    hasClass: d,
    updateClasses: c,
    defer: T,
    flush: S,
    uniqueId: O,
    Evented: W,
    getScrollBarSize: a,
  };
  var M = (function () {
      function t(t, e) {
        var o = [],
          i = !0,
          n = !1,
          r = void 0;
        try {
          for (
            var s, a = t[Symbol.iterator]();
            !(i = (s = a.next()).done) &&
            (o.push(s.value), !e || o.length !== e);
            i = !0
          );
        } catch (f) {
          (n = !0), (r = f);
        } finally {
          try {
            !i && a["return"] && a["return"]();
          } finally {
            if (n) throw r;
          }
        }
        return o;
      }
      return function (e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })(),
    w = (function () {
      function t(t, e) {
        for (var o = 0; o < e.length; o++) {
          var i = e[o];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
      };
    })();
  if ("undefined" == typeof C)
    throw new Error("You must include the utils.js file before tether.js");
  var P = C.Utils,
    n = P.getScrollParent,
    r = P.getBounds,
    s = P.getOffsetParent,
    f = P.extend,
    l = P.addClass,
    h = P.removeClass,
    c = P.updateClasses,
    T = P.defer,
    S = P.flush,
    a = P.getScrollBarSize,
    k = (function () {
      if ("undefined" == typeof document) return "";
      for (
        var t = document.createElement("div"),
          e = [
            "transform",
            "webkitTransform",
            "OTransform",
            "MozTransform",
            "msTransform",
          ],
          o = 0;
        o < e.length;
        ++o
      ) {
        var i = e[o];
        if (void 0 !== t.style[i]) return i;
      }
    })(),
    B = [],
    _ = function () {
      B.forEach(function (t) {
        t.position(!1);
      }),
        S();
    };
  !(function () {
    var t = null,
      e = null,
      o = null,
      i = function n() {
        return "undefined" != typeof e && e > 16
          ? ((e = Math.min(e - 16, 250)), void (o = setTimeout(n, 250)))
          : void (
              ("undefined" != typeof t && m() - t < 10) ||
              ("undefined" != typeof o && (clearTimeout(o), (o = null)),
              (t = m()),
              _(),
              (e = m() - t))
            );
      };
    "undefined" != typeof window &&
      ["resize", "scroll", "touchmove"].forEach(function (t) {
        window.addEventListener(t, i);
      });
  })();
  var z = { center: "center", left: "right", right: "left" },
    F = { middle: "middle", top: "bottom", bottom: "top" },
    L = {
      top: 0,
      left: 0,
      middle: "50%",
      center: "50%",
      bottom: "100%",
      right: "100%",
    },
    Y = function (t, e) {
      var o = t.left,
        i = t.top;
      return (
        "auto" === o && (o = z[e.left]),
        "auto" === i && (i = F[e.top]),
        { left: o, top: i }
      );
    },
    H = function (t) {
      var e = t.left,
        o = t.top;
      return (
        "undefined" != typeof L[t.left] && (e = L[t.left]),
        "undefined" != typeof L[t.top] && (o = L[t.top]),
        { left: e, top: o }
      );
    },
    X = function (t) {
      var e = t.split(" "),
        o = M(e, 2),
        i = o[0],
        n = o[1];
      return { top: i, left: n };
    },
    j = X,
    N = (function () {
      function t(e) {
        var o = this;
        i(this, t),
          (this.position = this.position.bind(this)),
          B.push(this),
          (this.history = []),
          this.setOptions(e, !1),
          C.modules.forEach(function (t) {
            "undefined" != typeof t.initialize && t.initialize.call(o);
          }),
          this.position();
      }
      return (
        w(t, [
          {
            key: "getClass",
            value: function () {
              var t =
                  arguments.length <= 0 || void 0 === arguments[0]
                    ? ""
                    : arguments[0],
                e = this.options.classes;
              return "undefined" != typeof e && e[t]
                ? this.options.classes[t]
                : this.options.classPrefix
                ? this.options.classPrefix + "-" + t
                : t;
            },
          },
          {
            key: "setOptions",
            value: function (t) {
              var e = this,
                o =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? !0
                    : arguments[1],
                i = {
                  offset: "0 0",
                  targetOffset: "0 0",
                  targetAttachment: "auto auto",
                  classPrefix: "tether",
                };
              this.options = f(i, t);
              var r = this.options,
                s = r.element,
                a = r.target,
                h = r.targetModifier;
              if (
                ((this.element = s),
                (this.target = a),
                (this.targetModifier = h),
                "viewport" === this.target
                  ? ((this.target = document.body),
                    (this.targetModifier = "visible"))
                  : "scroll-handle" === this.target &&
                    ((this.target = document.body),
                    (this.targetModifier = "scroll-handle")),
                ["element", "target"].forEach(function (t) {
                  if ("undefined" == typeof e[t])
                    throw new Error(
                      "Tether Error: Both element and target must be defined"
                    );
                  "undefined" != typeof e[t].jquery
                    ? (e[t] = e[t][0])
                    : "string" == typeof e[t] &&
                      (e[t] = document.querySelector(e[t]));
                }),
                l(this.element, this.getClass("element")),
                this.options.addTargetClasses !== !1 &&
                  l(this.target, this.getClass("target")),
                !this.options.attachment)
              )
                throw new Error("Tether Error: You must provide an attachment");
              (this.targetAttachment = j(this.options.targetAttachment)),
                (this.attachment = j(this.options.attachment)),
                (this.offset = X(this.options.offset)),
                (this.targetOffset = X(this.options.targetOffset)),
                "undefined" != typeof this.scrollParent && this.disable(),
                "scroll-handle" === this.targetModifier
                  ? (this.scrollParent = this.target)
                  : (this.scrollParent = n(this.target)),
                this.options.enabled !== !1 && this.enable(o);
            },
          },
          {
            key: "getTargetBounds",
            value: function () {
              if ("undefined" == typeof this.targetModifier)
                return r(this.target);
              if ("visible" === this.targetModifier) {
                if (this.target === document.body)
                  return {
                    top: pageYOffset,
                    left: pageXOffset,
                    height: innerHeight,
                    width: innerWidth,
                  };
                var t = r(this.target),
                  e = {
                    height: t.height,
                    width: t.width,
                    top: t.top,
                    left: t.left,
                  };
                return (
                  (e.height = Math.min(
                    e.height,
                    t.height - (pageYOffset - t.top)
                  )),
                  (e.height = Math.min(
                    e.height,
                    t.height - (t.top + t.height - (pageYOffset + innerHeight))
                  )),
                  (e.height = Math.min(innerHeight, e.height)),
                  (e.height -= 2),
                  (e.width = Math.min(
                    e.width,
                    t.width - (pageXOffset - t.left)
                  )),
                  (e.width = Math.min(
                    e.width,
                    t.width - (t.left + t.width - (pageXOffset + innerWidth))
                  )),
                  (e.width = Math.min(innerWidth, e.width)),
                  (e.width -= 2),
                  e.top < pageYOffset && (e.top = pageYOffset),
                  e.left < pageXOffset && (e.left = pageXOffset),
                  e
                );
              }
              if ("scroll-handle" === this.targetModifier) {
                var t = void 0,
                  o = this.target;
                o === document.body
                  ? ((o = document.documentElement),
                    (t = {
                      left: pageXOffset,
                      top: pageYOffset,
                      height: innerHeight,
                      width: innerWidth,
                    }))
                  : (t = r(o));
                var i = getComputedStyle(o),
                  n =
                    o.scrollWidth > o.clientWidth ||
                    [i.overflow, i.overflowX].indexOf("scroll") >= 0 ||
                    this.target !== document.body,
                  s = 0;
                n && (s = 15);
                var a =
                    t.height -
                    parseFloat(i.borderTopWidth) -
                    parseFloat(i.borderBottomWidth) -
                    s,
                  e = {
                    width: 15,
                    height: 0.975 * a * (a / o.scrollHeight),
                    left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15,
                  },
                  f = 0;
                408 > a &&
                  this.target === document.body &&
                  (f = -11e-5 * Math.pow(a, 2) - 0.00727 * a + 22.58),
                  this.target !== document.body &&
                    (e.height = Math.max(e.height, 24));
                var h = this.target.scrollTop / (o.scrollHeight - a);
                return (
                  (e.top =
                    h * (a - e.height - f) +
                    t.top +
                    parseFloat(i.borderTopWidth)),
                  this.target === document.body &&
                    (e.height = Math.max(e.height, 24)),
                  e
                );
              }
            },
          },
          {
            key: "clearCache",
            value: function () {
              this._cache = {};
            },
          },
          {
            key: "cache",
            value: function (t, e) {
              return (
                "undefined" == typeof this._cache && (this._cache = {}),
                "undefined" == typeof this._cache[t] &&
                  (this._cache[t] = e.call(this)),
                this._cache[t]
              );
            },
          },
          {
            key: "enable",
            value: function () {
              var t =
                arguments.length <= 0 || void 0 === arguments[0]
                  ? !0
                  : arguments[0];
              this.options.addTargetClasses !== !1 &&
                l(this.target, this.getClass("enabled")),
                l(this.element, this.getClass("enabled")),
                (this.enabled = !0),
                this.scrollParent !== document &&
                  this.scrollParent.addEventListener("scroll", this.position),
                t && this.position();
            },
          },
          {
            key: "disable",
            value: function () {
              h(this.target, this.getClass("enabled")),
                h(this.element, this.getClass("enabled")),
                (this.enabled = !1),
                "undefined" != typeof this.scrollParent &&
                  this.scrollParent.removeEventListener(
                    "scroll",
                    this.position
                  );
            },
          },
          {
            key: "destroy",
            value: function () {
              var t = this;
              this.disable(),
                B.forEach(function (e, o) {
                  return e === t ? void B.splice(o, 1) : void 0;
                });
            },
          },
          {
            key: "updateAttachClasses",
            value: function (t, e) {
              var o = this;
              (t = t || this.attachment), (e = e || this.targetAttachment);
              var i = ["left", "top", "bottom", "right", "middle", "center"];
              "undefined" != typeof this._addAttachClasses &&
                this._addAttachClasses.length &&
                this._addAttachClasses.splice(0, this._addAttachClasses.length),
                "undefined" == typeof this._addAttachClasses &&
                  (this._addAttachClasses = []);
              var n = this._addAttachClasses;
              t.top && n.push(this.getClass("element-attached") + "-" + t.top),
                t.left &&
                  n.push(this.getClass("element-attached") + "-" + t.left),
                e.top && n.push(this.getClass("target-attached") + "-" + e.top),
                e.left &&
                  n.push(this.getClass("target-attached") + "-" + e.left);
              var r = [];
              i.forEach(function (t) {
                r.push(o.getClass("element-attached") + "-" + t),
                  r.push(o.getClass("target-attached") + "-" + t);
              }),
                T(function () {
                  "undefined" != typeof o._addAttachClasses &&
                    (c(o.element, o._addAttachClasses, r),
                    o.options.addTargetClasses !== !1 &&
                      c(o.target, o._addAttachClasses, r),
                    delete o._addAttachClasses);
                });
            },
          },
          {
            key: "position",
            value: function () {
              var t = this,
                e =
                  arguments.length <= 0 || void 0 === arguments[0]
                    ? !0
                    : arguments[0];
              if (this.enabled) {
                this.clearCache();
                var o = Y(this.targetAttachment, this.attachment);
                this.updateAttachClasses(this.attachment, o);
                var i = this.cache("element-bounds", function () {
                    return r(t.element);
                  }),
                  n = i.width,
                  f = i.height;
                if (0 === n && 0 === f && "undefined" != typeof this.lastSize) {
                  var h = this.lastSize;
                  (n = h.width), (f = h.height);
                } else this.lastSize = { width: n, height: f };
                var l = this.cache("target-bounds", function () {
                    return t.getTargetBounds();
                  }),
                  d = l,
                  u = y(H(this.attachment), { width: n, height: f }),
                  p = y(H(o), d),
                  c = y(this.offset, { width: n, height: f }),
                  g = y(this.targetOffset, d);
                (u = v(u, c)), (p = v(p, g));
                for (
                  var m = l.left + p.left - u.left,
                    b = l.top + p.top - u.top,
                    w = 0;
                  w < C.modules.length;
                  ++w
                ) {
                  var O = C.modules[w],
                    E = O.position.call(this, {
                      left: m,
                      top: b,
                      targetAttachment: o,
                      targetPos: l,
                      elementPos: i,
                      offset: u,
                      targetOffset: p,
                      manualOffset: c,
                      manualTargetOffset: g,
                      scrollbarSize: A,
                      attachment: this.attachment,
                    });
                  if (E === !1) return !1;
                  "undefined" != typeof E &&
                    "object" == typeof E &&
                    ((b = E.top), (m = E.left));
                }
                var x = {
                    page: { top: b, left: m },
                    viewport: {
                      top: b - pageYOffset,
                      bottom: pageYOffset - b - f + innerHeight,
                      left: m - pageXOffset,
                      right: pageXOffset - m - n + innerWidth,
                    },
                  },
                  A = void 0;
                return (
                  document.body.scrollWidth > window.innerWidth &&
                    ((A = this.cache("scrollbar-size", a)),
                    (x.viewport.bottom -= A.height)),
                  document.body.scrollHeight > window.innerHeight &&
                    ((A = this.cache("scrollbar-size", a)),
                    (x.viewport.right -= A.width)),
                  (-1 ===
                    ["", "static"].indexOf(document.body.style.position) ||
                    -1 ===
                      ["", "static"].indexOf(
                        document.body.parentElement.style.position
                      )) &&
                    ((x.page.bottom = document.body.scrollHeight - b - f),
                    (x.page.right = document.body.scrollWidth - m - n)),
                  "undefined" != typeof this.options.optimizations &&
                    this.options.optimizations.moveElement !== !1 &&
                    "undefined" == typeof this.targetModifier &&
                    !(function () {
                      var e = t.cache("target-offsetparent", function () {
                          return s(t.target);
                        }),
                        o = t.cache("target-offsetparent-bounds", function () {
                          return r(e);
                        }),
                        i = getComputedStyle(e),
                        n = o,
                        a = {};
                      if (
                        (["Top", "Left", "Bottom", "Right"].forEach(function (
                          t
                        ) {
                          a[t.toLowerCase()] = parseFloat(
                            i["border" + t + "Width"]
                          );
                        }),
                        (o.right =
                          document.body.scrollWidth -
                          o.left -
                          n.width +
                          a.right),
                        (o.bottom =
                          document.body.scrollHeight -
                          o.top -
                          n.height +
                          a.bottom),
                        x.page.top >= o.top + a.top &&
                          x.page.bottom >= o.bottom &&
                          x.page.left >= o.left + a.left &&
                          x.page.right >= o.right)
                      ) {
                        var f = e.scrollTop,
                          h = e.scrollLeft;
                        x.offset = {
                          top: x.page.top - o.top + f - a.top,
                          left: x.page.left - o.left + h - a.left,
                        };
                      }
                    })(),
                  this.move(x),
                  this.history.unshift(x),
                  this.history.length > 3 && this.history.pop(),
                  e && S(),
                  !0
                );
              }
            },
          },
          {
            key: "move",
            value: function (t) {
              var e = this;
              if ("undefined" != typeof this.element.parentNode) {
                var o = {};
                for (var i in t) {
                  o[i] = {};
                  for (var n in t[i]) {
                    for (var r = !1, a = 0; a < this.history.length; ++a) {
                      var h = this.history[a];
                      if ("undefined" != typeof h[i] && !g(h[i][n], t[i][n])) {
                        r = !0;
                        break;
                      }
                    }
                    r || (o[i][n] = !0);
                  }
                }
                var l = { top: "", left: "", right: "", bottom: "" },
                  d = function (t, o) {
                    var i = "undefined" != typeof e.options.optimizations,
                      n = i ? e.options.optimizations.gpu : null;
                    if (n !== !1) {
                      var r = void 0,
                        s = void 0;
                      t.top
                        ? ((l.top = 0), (r = o.top))
                        : ((l.bottom = 0), (r = -o.bottom)),
                        t.left
                          ? ((l.left = 0), (s = o.left))
                          : ((l.right = 0), (s = -o.right)),
                        (l[k] =
                          "translateX(" +
                          Math.round(s) +
                          "px) translateY(" +
                          Math.round(r) +
                          "px)"),
                        "msTransform" !== k && (l[k] += " translateZ(0)");
                    } else
                      t.top
                        ? (l.top = o.top + "px")
                        : (l.bottom = o.bottom + "px"),
                        t.left
                          ? (l.left = o.left + "px")
                          : (l.right = o.right + "px");
                  },
                  u = !1;
                if (
                  ((o.page.top || o.page.bottom) &&
                  (o.page.left || o.page.right)
                    ? ((l.position = "absolute"), d(o.page, t.page))
                    : (o.viewport.top || o.viewport.bottom) &&
                      (o.viewport.left || o.viewport.right)
                    ? ((l.position = "fixed"), d(o.viewport, t.viewport))
                    : "undefined" != typeof o.offset &&
                      o.offset.top &&
                      o.offset.left
                    ? !(function () {
                        l.position = "absolute";
                        var i = e.cache("target-offsetparent", function () {
                          return s(e.target);
                        });
                        s(e.element) !== i &&
                          T(function () {
                            e.element.parentNode.removeChild(e.element),
                              i.appendChild(e.element);
                          }),
                          d(o.offset, t.offset),
                          (u = !0);
                      })()
                    : ((l.position = "absolute"),
                      d({ top: !0, left: !0 }, t.page)),
                  !u)
                ) {
                  for (
                    var p = !0, c = this.element.parentNode;
                    c && "BODY" !== c.tagName;

                  ) {
                    if ("static" !== getComputedStyle(c).position) {
                      p = !1;
                      break;
                    }
                    c = c.parentNode;
                  }
                  p ||
                    (this.element.parentNode.removeChild(this.element),
                    document.body.appendChild(this.element));
                }
                var m = {},
                  v = !1;
                for (var n in l) {
                  var y = l[n],
                    b = this.element.style[n];
                  "" !== b &&
                    "" !== y &&
                    ["top", "left", "bottom", "right"].indexOf(n) >= 0 &&
                    ((b = parseFloat(b)), (y = parseFloat(y))),
                    b !== y && ((v = !0), (m[n] = y));
                }
                v &&
                  T(function () {
                    f(e.element.style, m);
                  });
              }
            },
          },
        ]),
        t
      );
    })();
  (N.modules = []), (C.position = _);
  var R = f(N, C),
    M = (function () {
      function t(t, e) {
        var o = [],
          i = !0,
          n = !1,
          r = void 0;
        try {
          for (
            var s, a = t[Symbol.iterator]();
            !(i = (s = a.next()).done) &&
            (o.push(s.value), !e || o.length !== e);
            i = !0
          );
        } catch (f) {
          (n = !0), (r = f);
        } finally {
          try {
            !i && a["return"] && a["return"]();
          } finally {
            if (n) throw r;
          }
        }
        return o;
      }
      return function (e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })(),
    P = C.Utils,
    r = P.getBounds,
    f = P.extend,
    c = P.updateClasses,
    T = P.defer,
    U = ["left", "top", "right", "bottom"];
  C.modules.push({
    position: function (t) {
      var e = this,
        o = t.top,
        i = t.left,
        n = t.targetAttachment;
      if (!this.options.constraints) return !0;
      var s = this.cache("element-bounds", function () {
          return r(e.element);
        }),
        a = s.height,
        h = s.width;
      if (0 === h && 0 === a && "undefined" != typeof this.lastSize) {
        var l = this.lastSize;
        (h = l.width), (a = l.height);
      }
      var d = this.cache("target-bounds", function () {
          return e.getTargetBounds();
        }),
        u = d.height,
        p = d.width,
        g = [this.getClass("pinned"), this.getClass("out-of-bounds")];
      this.options.constraints.forEach(function (t) {
        var e = t.outOfBoundsClass,
          o = t.pinnedClass;
        e && g.push(e), o && g.push(o);
      }),
        g.forEach(function (t) {
          ["left", "top", "right", "bottom"].forEach(function (e) {
            g.push(t + "-" + e);
          });
        });
      var m = [],
        v = f({}, n),
        y = f({}, this.attachment);
      return (
        this.options.constraints.forEach(function (t) {
          var r = t.to,
            s = t.attachment,
            f = t.pin;
          "undefined" == typeof s && (s = "");
          var l = void 0,
            d = void 0;
          if (s.indexOf(" ") >= 0) {
            var c = s.split(" "),
              g = M(c, 2);
            (d = g[0]), (l = g[1]);
          } else l = d = s;
          var w = b(e, r);
          ("target" === d || "both" === d) &&
            (o < w[1] && "top" === v.top && ((o += u), (v.top = "bottom")),
            o + a > w[3] && "bottom" === v.top && ((o -= u), (v.top = "top"))),
            "together" === d &&
              (o < w[1] &&
                "top" === v.top &&
                ("bottom" === y.top
                  ? ((o += u), (v.top = "bottom"), (o += a), (y.top = "top"))
                  : "top" === y.top &&
                    ((o += u),
                    (v.top = "bottom"),
                    (o -= a),
                    (y.top = "bottom"))),
              o + a > w[3] &&
                "bottom" === v.top &&
                ("top" === y.top
                  ? ((o -= u), (v.top = "top"), (o -= a), (y.top = "bottom"))
                  : "bottom" === y.top &&
                    ((o -= u), (v.top = "top"), (o += a), (y.top = "top"))),
              "middle" === v.top &&
                (o + a > w[3] && "top" === y.top
                  ? ((o -= a), (y.top = "bottom"))
                  : o < w[1] &&
                    "bottom" === y.top &&
                    ((o += a), (y.top = "top")))),
            ("target" === l || "both" === l) &&
              (i < w[0] && "left" === v.left && ((i += p), (v.left = "right")),
              i + h > w[2] &&
                "right" === v.left &&
                ((i -= p), (v.left = "left"))),
            "together" === l &&
              (i < w[0] && "left" === v.left
                ? "right" === y.left
                  ? ((i += p), (v.left = "right"), (i += h), (y.left = "left"))
                  : "left" === y.left &&
                    ((i += p), (v.left = "right"), (i -= h), (y.left = "right"))
                : i + h > w[2] && "right" === v.left
                ? "left" === y.left
                  ? ((i -= p), (v.left = "left"), (i -= h), (y.left = "right"))
                  : "right" === y.left &&
                    ((i -= p), (v.left = "left"), (i += h), (y.left = "left"))
                : "center" === v.left &&
                  (i + h > w[2] && "left" === y.left
                    ? ((i -= h), (y.left = "right"))
                    : i < w[0] &&
                      "right" === y.left &&
                      ((i += h), (y.left = "left")))),
            ("element" === d || "both" === d) &&
              (o < w[1] && "bottom" === y.top && ((o += a), (y.top = "top")),
              o + a > w[3] &&
                "top" === y.top &&
                ((o -= a), (y.top = "bottom"))),
            ("element" === l || "both" === l) &&
              (i < w[0] && "right" === y.left && ((i += h), (y.left = "left")),
              i + h > w[2] &&
                "left" === y.left &&
                ((i -= h), (y.left = "right"))),
            "string" == typeof f
              ? (f = f.split(",").map(function (t) {
                  return t.trim();
                }))
              : f === !0 && (f = ["top", "left", "right", "bottom"]),
            (f = f || []);
          var C = [],
            O = [];
          o < w[1] &&
            (f.indexOf("top") >= 0
              ? ((o = w[1]), C.push("top"))
              : O.push("top")),
            o + a > w[3] &&
              (f.indexOf("bottom") >= 0
                ? ((o = w[3] - a), C.push("bottom"))
                : O.push("bottom")),
            i < w[0] &&
              (f.indexOf("left") >= 0
                ? ((i = w[0]), C.push("left"))
                : O.push("left")),
            i + h > w[2] &&
              (f.indexOf("right") >= 0
                ? ((i = w[2] - h), C.push("right"))
                : O.push("right")),
            C.length &&
              !(function () {
                var t = void 0;
                (t =
                  "undefined" != typeof e.options.pinnedClass
                    ? e.options.pinnedClass
                    : e.getClass("pinned")),
                  m.push(t),
                  C.forEach(function (e) {
                    m.push(t + "-" + e);
                  });
              })(),
            O.length &&
              !(function () {
                var t = void 0;
                (t =
                  "undefined" != typeof e.options.outOfBoundsClass
                    ? e.options.outOfBoundsClass
                    : e.getClass("out-of-bounds")),
                  m.push(t),
                  O.forEach(function (e) {
                    m.push(t + "-" + e);
                  });
              })(),
            (C.indexOf("left") >= 0 || C.indexOf("right") >= 0) &&
              (y.left = v.left = !1),
            (C.indexOf("top") >= 0 || C.indexOf("bottom") >= 0) &&
              (y.top = v.top = !1),
            (v.top !== n.top ||
              v.left !== n.left ||
              y.top !== e.attachment.top ||
              y.left !== e.attachment.left) &&
              e.updateAttachClasses(y, v);
        }),
        T(function () {
          e.options.addTargetClasses !== !1 && c(e.target, m, g),
            c(e.element, m, g);
        }),
        { top: o, left: i }
      );
    },
  });
  var P = C.Utils,
    r = P.getBounds,
    c = P.updateClasses,
    T = P.defer;
  C.modules.push({
    position: function (t) {
      var e = this,
        o = t.top,
        i = t.left,
        n = this.cache("element-bounds", function () {
          return r(e.element);
        }),
        s = n.height,
        a = n.width,
        f = this.getTargetBounds(),
        h = o + s,
        l = i + a,
        d = [];
      o <= f.bottom &&
        h >= f.top &&
        ["left", "right"].forEach(function (t) {
          var e = f[t];
          (e === i || e === l) && d.push(t);
        }),
        i <= f.right &&
          l >= f.left &&
          ["top", "bottom"].forEach(function (t) {
            var e = f[t];
            (e === o || e === h) && d.push(t);
          });
      var u = [],
        p = [],
        g = ["left", "top", "right", "bottom"];
      return (
        u.push(this.getClass("abutted")),
        g.forEach(function (t) {
          u.push(e.getClass("abutted") + "-" + t);
        }),
        d.length && p.push(this.getClass("abutted")),
        d.forEach(function (t) {
          p.push(e.getClass("abutted") + "-" + t);
        }),
        T(function () {
          e.options.addTargetClasses !== !1 && c(e.target, p, u),
            c(e.element, p, u);
        }),
        !0
      );
    },
  });
  var M = (function () {
    function t(t, e) {
      var o = [],
        i = !0,
        n = !1,
        r = void 0;
      try {
        for (
          var s, a = t[Symbol.iterator]();
          !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e);
          i = !0
        );
      } catch (f) {
        (n = !0), (r = f);
      } finally {
        try {
          !i && a["return"] && a["return"]();
        } finally {
          if (n) throw r;
        }
      }
      return o;
    }
    return function (e, o) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, o);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    };
  })();
  return (
    C.modules.push({
      position: function (t) {
        var e = t.top,
          o = t.left;
        if (this.options.shift) {
          var i = this.options.shift;
          "function" == typeof this.options.shift &&
            (i = this.options.shift.call(this, { top: e, left: o }));
          var n = void 0,
            r = void 0;
          if ("string" == typeof i) {
            (i = i.split(" ")), (i[1] = i[1] || i[0]);
            var s = i,
              a = M(s, 2);
            (n = a[0]),
              (r = a[1]),
              (n = parseFloat(n, 10)),
              (r = parseFloat(r, 10));
          } else (n = i.top), (r = i.left);
          return (e += n), (o += r), { top: e, left: o };
        }
      },
    }),
    R
  );
});

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", e)
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.EvEmitter = e());
})("undefined" != typeof window ? window : this, function () {
  function t() {}
  var e = t.prototype;
  return (
    (e.on = function (t, e) {
      if (t && e) {
        var i = (this._events = this._events || {}),
          n = (i[t] = i[t] || []);
        return -1 == n.indexOf(e) && n.push(e), this;
      }
    }),
    (e.once = function (t, e) {
      if (t && e) {
        this.on(t, e);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[t] = i[t] || {});
        return (n[e] = !0), this;
      }
    }),
    (e.off = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (e.emitEvent = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        e = e || [];
        for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
          var s = r && r[o];
          s && (this.off(t, o), delete r[o]),
            o.apply(this, e),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    t
  );
}),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })(window, function (t, e) {
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function n(t) {
      var e = [];
      if (Array.isArray(t)) e = t;
      else if ("number" == typeof t.length)
        for (var i = 0; i < t.length; i++) e.push(t[i]);
      else e.push(t);
      return e;
    }
    function o(t, e, r) {
      return this instanceof o
        ? ("string" == typeof t && (t = document.querySelectorAll(t)),
          (this.elements = n(t)),
          (this.options = i({}, this.options)),
          "function" == typeof e ? (r = e) : i(this.options, e),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(t, e, r);
    }
    function r(t) {
      this.img = t;
    }
    function s(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var h = t.jQuery,
      a = t.console;
    (o.prototype = Object.create(e.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = t.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function t(t, i, n) {
          setTimeout(function () {
            e.progress(t, i, n);
          });
        }
        var e = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      (r.prototype = Object.create(e.prototype)),
      (r.prototype.check = function () {
        var t = this.getIsImageComplete();
        return t
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var t = this.getIsImageComplete();
        t &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery),
          e &&
            ((h = e),
            (h.fn.imagesLoaded = function (t, e) {
              var i = new o(this, t, e);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/*!
 * jquery.counterup.js 1.0
 *
 * https://github.com/bfintal/Counter-Up
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
(function ($) {
  "use strict";

  $.fn.counterUp = function (options) {
    // Defaults
    var settings = $.extend(
      {
        time: 400,
        delay: 10,
      },
      options
    );

    return this.each(function () {
      // Store the object
      var $this = $(this);
      var $settings = settings;

      var counterUpper = function () {
        var num = $this.text();
        var nums = [num];

        var divisions = $settings.time / $settings.delay;
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, "");
        var isInt = /^[0-9]+$/.test(num);
        var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
        var decimalPlaces = isFloat ? (num.split(".")[1] || []).length : 0;

        // Generate list of incremental numbers to display
        for (var i = divisions; i >= 1; i--) {
          // Preserve as int if input was int
          var newNum = parseInt((num / divisions) * i);

          // Preserve float if input was float
          if (isFloat) {
            newNum = parseFloat((num / divisions) * i).toFixed(decimalPlaces);
          }

          // Preserve commas if input had commas
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum
                .toString()
                .replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
            }
          }

          nums.unshift(newNum);
        }

        $this.data("counterup-nums", nums);
        $this.text("0");

        // Updates the number until we're done
        var f = function () {
          $this.text($this.data("counterup-nums").shift());
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), $settings.delay);
          } else {
            delete $this.data("counterup-nums");
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
          }
        };
        $this.data("counterup-func", f);

        // Start the count up
        setTimeout($this.data("counterup-func"), $settings.delay);
      };

      // Perform counts when the element gets into view
      $this.waypoint(counterUpper, { offset: "100%", triggerOnce: true });
    });
  };
})(jQuery);

/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
  if (typeof define == "function" && define.amd) {
    // AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var inviewObjects = [],
    viewportSize,
    viewportOffset,
    d = document,
    w = window,
    documentElement = d.documentElement,
    timer;

  $.event.special.inview = {
    add: function (data) {
      inviewObjects.push({ data: data, $element: $(this), element: this });
      // Use setInterval in order to also make sure this captures elements within
      // "overflow:scroll" elements or elements that appeared in the dom tree due to
      // dom manipulation and reflow
      // old: $(window).scroll(checkInView);
      //
      // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
      // intervals while the user scrolls. Therefore the inview event might fire a bit late there
      //
      // Don't waste cycles with an interval until we get at least one element that
      // has bound to the inview event.
      if (!timer && inviewObjects.length) {
        timer = setInterval(checkInView, 250);
      }
    },

    remove: function (data) {
      for (var i = 0; i < inviewObjects.length; i++) {
        var inviewObject = inviewObjects[i];
        if (
          inviewObject.element === this &&
          inviewObject.data.guid === data.guid
        ) {
          inviewObjects.splice(i, 1);
          break;
        }
      }

      // Clear interval when we no longer have any elements listening
      if (!inviewObjects.length) {
        clearInterval(timer);
        timer = null;
      }
    },
  };

  function getViewportSize() {
    var mode,
      domObject,
      size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) {
        // IE, Gecko
        domObject =
          mode === "CSS1Compat"
            ? documentElement // Standards
            : d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width: domObject.clientWidth,
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft,
    };
  }

  function checkInView() {
    if (!inviewObjects.length) {
      return;
    }

    var i = 0,
      $elements = $.map(inviewObjects, function (inviewObject) {
        var selector = inviewObject.data.selector,
          $element = inviewObject.$element;
        return selector ? $element.find(selector) : $element;
      });

    viewportSize = viewportSize || getViewportSize();
    viewportOffset = viewportOffset || getViewportOffset();

    for (; i < inviewObjects.length; i++) {
      // Ignore elements that are not in the DOM tree
      if (!$.contains(documentElement, $elements[i][0])) {
        continue;
      }

      var $element = $($elements[i]),
        elementSize = {
          height: $element[0].offsetHeight,
          width: $element[0].offsetWidth,
        },
        elementOffset = $element.offset(),
        inView = $element.data("inview");

      // Don't ask me why because I haven't figured out yet:
      // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
      // Even though it sounds weird:
      // It seems that the execution of this function is interferred by the onresize/onscroll event
      // where viewportOffset and viewportSize are unset
      if (!viewportOffset || !viewportSize) {
        return;
      }

      if (
        elementOffset.top + elementSize.height > viewportOffset.top &&
        elementOffset.top < viewportOffset.top + viewportSize.height &&
        elementOffset.left + elementSize.width > viewportOffset.left &&
        elementOffset.left < viewportOffset.left + viewportSize.width
      ) {
        if (!inView) {
          $element.data("inview", true).trigger("inview", [true]);
        }
      } else if (inView) {
        $element.data("inview", false).trigger("inview", [false]);
      }
    }
  }

  $(w).on("scroll resize scrollstop", function () {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function () {
      viewportOffset = null;
    });
  }
});

/*! lightgallery - v1.3.9 - 2017-02-05
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2017 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(a.jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    function b(b, d) {
      if (
        ((this.el = b),
        (this.$el = a(b)),
        (this.s = a.extend({}, c, d)),
        this.s.dynamic &&
          "undefined" !== this.s.dynamicEl &&
          this.s.dynamicEl.constructor === Array &&
          !this.s.dynamicEl.length)
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return (
        (this.modules = {}),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.hideBartimeout = !1),
        (this.isTouch = "ontouchstart" in document.documentElement),
        this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
        this.s.dynamic
          ? (this.$items = this.s.dynamicEl)
          : "this" === this.s.selector
          ? (this.$items = this.$el)
          : "" !== this.s.selector
          ? this.s.selectWithin
            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
            : (this.$items = this.$el.find(a(this.s.selector)))
          : (this.$items = this.$el.children()),
        (this.$slide = ""),
        (this.$outer = ""),
        this.init(),
        this
      );
    }
    var c = {
      mode: "lg-slide",
      cssEasing: "ease",
      easing: "linear",
      speed: 600,
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !0,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: !1,
      iframeMaxWidth: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
    };
    (b.prototype.init = function () {
      var b = this;
      b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
      var c = window.location.hash;
      c.indexOf("lg=" + this.s.galleryId) > 0 &&
        ((b.index = parseInt(c.split("&slide=")[1], 10)),
        a("body").addClass("lg-from-hash"),
        a("body").hasClass("lg-on") ||
          (setTimeout(function () {
            b.build(b.index);
          }),
          a("body").addClass("lg-on"))),
        b.s.dynamic
          ? (b.$el.trigger("onBeforeOpen.lg"),
            (b.index = b.s.index || 0),
            a("body").hasClass("lg-on") ||
              setTimeout(function () {
                b.build(b.index), a("body").addClass("lg-on");
              }))
          : b.$items.on("click.lgcustom", function (c) {
              try {
                c.preventDefault(), c.preventDefault();
              } catch (a) {
                c.returnValue = !1;
              }
              b.$el.trigger("onBeforeOpen.lg"),
                (b.index = b.s.index || b.$items.index(this)),
                a("body").hasClass("lg-on") ||
                  (b.build(b.index), a("body").addClass("lg-on"));
            });
    }),
      (b.prototype.build = function (b) {
        var c = this;
        c.structure(),
          a.each(a.fn.lightGallery.modules, function (b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
          }),
          c.slide(b, !1, !1, !1),
          c.s.keyPress && c.keyPress(),
          c.$items.length > 1 &&
            (c.arrow(),
            setTimeout(function () {
              c.enableDrag(), c.enableSwipe();
            }, 50),
            c.s.mousewheel && c.mousewheel()),
          c.counter(),
          c.closeGallery(),
          c.$el.trigger("onAfterOpen.lg"),
          c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
            c.$outer.removeClass("lg-hide-items"),
              clearTimeout(c.hideBartimeout),
              (c.hideBartimeout = setTimeout(function () {
                c.$outer.addClass("lg-hide-items");
              }, c.s.hideBarsDelay));
          }),
          c.$outer.trigger("mousemove.lg");
      }),
      (b.prototype.structure = function () {
        var b,
          c = "",
          d = "",
          e = 0,
          f = "",
          g = this;
        for (
          a("body").append('<div class="lg-backdrop"></div>'),
            a(".lg-backdrop").css(
              "transition-duration",
              this.s.backdropDuration + "ms"
            ),
            e = 0;
          e < this.$items.length;
          e++
        )
          c += '<div class="lg-item"></div>';
        if (
          (this.s.controls &&
            this.$items.length > 1 &&
            (d =
              '<div class="lg-actions"><div class="lg-prev lg-icon">' +
              this.s.prevHtml +
              '</div><div class="lg-next lg-icon">' +
              this.s.nextHtml +
              "</div></div>"),
          ".lg-sub-html" === this.s.appendSubHtmlTo &&
            (f = '<div class="lg-sub-html"></div>'),
          (b =
            '<div class="lg-outer ' +
            this.s.addClass +
            " " +
            this.s.startClass +
            '"><div class="lg" style="width:' +
            this.s.width +
            "; height:" +
            this.s.height +
            '"><div class="lg-inner">' +
            c +
            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
            d +
            f +
            "</div></div>"),
          a("body").append(b),
          (this.$outer = a(".lg-outer")),
          (this.$slide = this.$outer.find(".lg-item")),
          this.s.useLeft
            ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide"))
            : this.$outer.addClass("lg-use-css3"),
          g.setTop(),
          a(window).on("resize.lg orientationchange.lg", function () {
            setTimeout(function () {
              g.setTop();
            }, 100);
          }),
          this.$slide.eq(this.index).addClass("lg-current"),
          this.doCss()
            ? this.$outer.addClass("lg-css3")
            : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
          this.$outer.addClass(this.s.mode),
          this.s.enableDrag &&
            this.$items.length > 1 &&
            this.$outer.addClass("lg-grab"),
          this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
          this.doCss())
        ) {
          var h = this.$outer.find(".lg-inner");
          h.css("transition-timing-function", this.s.cssEasing),
            h.css("transition-duration", this.s.speed + "ms");
        }
        setTimeout(function () {
          a(".lg-backdrop").addClass("in");
        }),
          setTimeout(function () {
            g.$outer.addClass("lg-visible");
          }, this.s.backdropDuration),
          this.s.download &&
            this.$outer
              .find(".lg-toolbar")
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
              ),
          (this.prevScrollTop = a(window).scrollTop());
      }),
      (b.prototype.setTop = function () {
        if ("100%" !== this.s.height) {
          var b = a(window).height(),
            c = (b - parseInt(this.s.height, 10)) / 2,
            d = this.$outer.find(".lg");
          b >= parseInt(this.s.height, 10)
            ? d.css("top", c + "px")
            : d.css("top", "0px");
        }
      }),
      (b.prototype.doCss = function () {
        var a = function () {
          var a = [
              "transition",
              "MozTransition",
              "WebkitTransition",
              "OTransition",
              "msTransition",
              "KhtmlTransition",
            ],
            b = document.documentElement,
            c = 0;
          for (c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
        };
        return !!a();
      }),
      (b.prototype.isVideo = function (a, b) {
        var c;
        if (
          ((c = this.s.dynamic
            ? this.s.dynamicEl[b].html
            : this.$items.eq(b).attr("data-html")),
          !a && c)
        )
          return { html5: !0 };
        var d = a.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
          ),
          e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
          f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
          g = a.match(
            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
          );
        return d
          ? { youtube: d }
          : e
          ? { vimeo: e }
          : f
          ? { dailymotion: f }
          : g
          ? { vk: g }
          : void 0;
      }),
      (b.prototype.counter = function () {
        this.s.counter &&
          a(this.s.appendCounterTo).append(
            '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              "</span></div>"
          );
      }),
      (b.prototype.addHtml = function (b) {
        var c,
          d,
          e = null;
        if (
          (this.s.dynamic
            ? this.s.dynamicEl[b].subHtmlUrl
              ? (c = this.s.dynamicEl[b].subHtmlUrl)
              : (e = this.s.dynamicEl[b].subHtml)
            : ((d = this.$items.eq(b)),
              d.attr("data-sub-html-url")
                ? (c = d.attr("data-sub-html-url"))
                : ((e = d.attr("data-sub-html")),
                  this.s.getCaptionFromTitleOrAlt &&
                    !e &&
                    (e =
                      d.attr("title") || d.find("img").first().attr("alt")))),
          !c)
        )
          if ("undefined" != typeof e && null !== e) {
            var f = e.substring(0, 1);
            ("." !== f && "#" !== f) ||
              (e =
                this.s.subHtmlSelectorRelative && !this.s.dynamic
                  ? d.find(e).html()
                  : a(e).html());
          } else e = "";
        ".lg-sub-html" === this.s.appendSubHtmlTo
          ? c
            ? this.$outer.find(this.s.appendSubHtmlTo).load(c)
            : this.$outer.find(this.s.appendSubHtmlTo).html(e)
          : c
          ? this.$slide.eq(b).load(c)
          : this.$slide.eq(b).append(e),
          "undefined" != typeof e &&
            null !== e &&
            ("" === e
              ? this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
          this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
      }),
      (b.prototype.preload = function (a) {
        var b = 1,
          c = 1;
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++)
          this.loadContent(a + b, !1, 0);
        for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
          this.loadContent(a - c, !1, 0);
      }),
      (b.prototype.loadContent = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = !1,
          m = function (b) {
            for (var c = [], d = [], e = 0; e < b.length; e++) {
              var g = b[e].split(" ");
              "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1]);
            }
            for (var h = a(window).width(), i = 0; i < c.length; i++)
              if (parseInt(c[i], 10) > h) {
                f = d[i];
                break;
              }
          };
        if (k.s.dynamic) {
          if (
            (k.s.dynamicEl[b].poster &&
              ((l = !0), (g = k.s.dynamicEl[b].poster)),
            (j = k.s.dynamicEl[b].html),
            (f = k.s.dynamicEl[b].src),
            k.s.dynamicEl[b].responsive)
          ) {
            var n = k.s.dynamicEl[b].responsive.split(",");
            m(n);
          }
          (h = k.s.dynamicEl[b].srcset), (i = k.s.dynamicEl[b].sizes);
        } else {
          if (
            (k.$items.eq(b).attr("data-poster") &&
              ((l = !0), (g = k.$items.eq(b).attr("data-poster"))),
            (j = k.$items.eq(b).attr("data-html")),
            (f =
              k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src")),
            k.$items.eq(b).attr("data-responsive"))
          ) {
            var o = k.$items.eq(b).attr("data-responsive").split(",");
            m(o);
          }
          (h = k.$items.eq(b).attr("data-srcset")),
            (i = k.$items.eq(b).attr("data-sizes"));
        }
        var p = !1;
        k.s.dynamic
          ? k.s.dynamicEl[b].iframe && (p = !0)
          : "true" === k.$items.eq(b).attr("data-iframe") && (p = !0);
        var q = k.isVideo(f, b);
        if (!k.$slide.eq(b).hasClass("lg-loaded")) {
          if (p)
            k.$slide
              .eq(b)
              .prepend(
                '<div class="lg-video-cont" style="max-width:' +
                  k.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  f +
                  '"  allowfullscreen="true"></iframe></div></div>'
              );
          else if (l) {
            var r = "";
            (r =
              q && q.youtube
                ? "lg-has-youtube"
                : q && q.vimeo
                ? "lg-has-vimeo"
                : "lg-has-html5"),
              k.$slide
                .eq(b)
                .prepend(
                  '<div class="lg-video-cont ' +
                    r +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    g +
                    '" /></div></div>'
                );
          } else
            q
              ? (k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                  ),
                k.$el.trigger("hasVideo.lg", [b, f, j]))
              : k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                      f +
                      '" /></div>'
                  );
          if (
            (k.$el.trigger("onAferAppendSlide.lg", [b]),
            (e = k.$slide.eq(b).find(".lg-object")),
            i && e.attr("sizes", i),
            h)
          ) {
            e.attr("srcset", h);
            try {
              picturefill({ elements: [e[0]] });
            } catch (a) {
              console.error(
                "Make sure you have included Picturefill version 2"
              );
            }
          }
          ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b),
            k.$slide.eq(b).addClass("lg-loaded");
        }
        k.$slide
          .eq(b)
          .find(".lg-object")
          .on("load.lg error.lg", function () {
            var c = 0;
            d && !a("body").hasClass("lg-from-hash") && (c = d),
              setTimeout(function () {
                k.$slide.eq(b).addClass("lg-complete"),
                  k.$el.trigger("onSlideItemLoad.lg", [b, d || 0]);
              }, c);
          }),
          q && q.html5 && !l && k.$slide.eq(b).addClass("lg-complete"),
          c === !0 &&
            (k.$slide.eq(b).hasClass("lg-complete")
              ? k.preload(b)
              : k.$slide
                  .eq(b)
                  .find(".lg-object")
                  .on("load.lg error.lg", function () {
                    k.preload(b);
                  }));
      }),
      (b.prototype.slide = function (b, c, d, e) {
        var f = this.$outer.find(".lg-current").index(),
          g = this;
        if (!g.lGalleryOn || f !== b) {
          var h = this.$slide.length,
            i = g.lGalleryOn ? this.s.speed : 0;
          if (!g.lgBusy) {
            if (this.s.download) {
              var j;
              (j = g.s.dynamic
                ? g.s.dynamicEl[b].downloadUrl !== !1 &&
                  (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                : "false" !== g.$items.eq(b).attr("data-download-url") &&
                  (g.$items.eq(b).attr("data-download-url") ||
                    g.$items.eq(b).attr("href") ||
                    g.$items.eq(b).attr("data-src"))),
                j
                  ? (a("#lg-download").attr("href", j),
                    g.$outer.removeClass("lg-hide-download"))
                  : g.$outer.addClass("lg-hide-download");
            }
            if (
              (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]),
              (g.lgBusy = !0),
              clearTimeout(g.hideBartimeout),
              ".lg-sub-html" === this.s.appendSubHtmlTo &&
                setTimeout(function () {
                  g.addHtml(b);
                }, i),
              this.arrowDisable(b),
              e || (b < f ? (e = "prev") : b > f && (e = "next")),
              c)
            ) {
              this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
              var k, l;
              h > 2
                ? ((k = b - 1),
                  (l = b + 1),
                  0 === b && f === h - 1
                    ? ((l = 0), (k = h - 1))
                    : b === h - 1 && 0 === f && ((l = 0), (k = h - 1)))
                : ((k = 0), (l = 1)),
                "prev" === e
                  ? g.$slide.eq(l).addClass("lg-next-slide")
                  : g.$slide.eq(k).addClass("lg-prev-slide"),
                g.$slide.eq(b).addClass("lg-current");
            } else
              g.$outer.addClass("lg-no-trans"),
                this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                "prev" === e
                  ? (this.$slide.eq(b).addClass("lg-prev-slide"),
                    this.$slide.eq(f).addClass("lg-next-slide"))
                  : (this.$slide.eq(b).addClass("lg-next-slide"),
                    this.$slide.eq(f).addClass("lg-prev-slide")),
                setTimeout(function () {
                  g.$slide.removeClass("lg-current"),
                    g.$slide.eq(b).addClass("lg-current"),
                    g.$outer.removeClass("lg-no-trans");
                }, 50);
            g.lGalleryOn
              ? (setTimeout(function () {
                  g.loadContent(b, !0, 0);
                }, this.s.speed + 50),
                setTimeout(function () {
                  (g.lgBusy = !1),
                    g.$el.trigger("onAfterSlide.lg", [f, b, c, d]);
                }, this.s.speed))
              : (g.loadContent(b, !0, g.s.backdropDuration),
                (g.lgBusy = !1),
                g.$el.trigger("onAfterSlide.lg", [f, b, c, d])),
              (g.lGalleryOn = !0),
              this.s.counter && a("#lg-counter-current").text(b + 1);
          }
        }
      }),
      (b.prototype.goToNextSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index + 1 < b.$slide.length
              ? (b.index++,
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : c
              ? ((b.index = 0),
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-right-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-right-end");
                }, 400)));
      }),
      (b.prototype.goToPrevSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index > 0
              ? (b.index--,
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : c
              ? ((b.index = b.$items.length - 1),
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-left-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-left-end");
                }, 400)));
      }),
      (b.prototype.keyPress = function () {
        var b = this;
        this.$items.length > 1 &&
          a(window).on("keyup.lg", function (a) {
            b.$items.length > 1 &&
              (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()),
              39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()));
          }),
          a(window).on("keydown.lg", function (a) {
            b.s.escKey === !0 &&
              27 === a.keyCode &&
              (a.preventDefault(),
              b.$outer.hasClass("lg-thumb-open")
                ? b.$outer.removeClass("lg-thumb-open")
                : b.destroy());
          });
      }),
      (b.prototype.arrow = function () {
        var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function () {
          a.goToPrevSlide();
        }),
          this.$outer.find(".lg-next").on("click.lg", function () {
            a.goToNextSlide();
          });
      }),
      (b.prototype.arrowDisable = function (a) {
        !this.s.loop &&
          this.s.hideControlOnEnd &&
          (a + 1 < this.$slide.length
            ? this.$outer
                .find(".lg-next")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-next")
                .attr("disabled", "disabled")
                .addClass("disabled"),
          a > 0
            ? this.$outer
                .find(".lg-prev")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-prev")
                .attr("disabled", "disabled")
                .addClass("disabled"));
      }),
      (b.prototype.setTranslate = function (a, b, c) {
        this.s.useLeft
          ? a.css("left", b)
          : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" });
      }),
      (b.prototype.touchMove = function (b, c) {
        var d = c - b;
        Math.abs(d) > 15 &&
          (this.$outer.addClass("lg-dragging"),
          this.setTranslate(this.$slide.eq(this.index), d, 0),
          this.setTranslate(
            a(".lg-prev-slide"),
            -this.$slide.eq(this.index).width() + d,
            0
          ),
          this.setTranslate(
            a(".lg-next-slide"),
            this.$slide.eq(this.index).width() + d,
            0
          ));
      }),
      (b.prototype.touchEnd = function (a) {
        var b = this;
        "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
          this.$slide
            .not(".lg-current, .lg-prev-slide, .lg-next-slide")
            .css("opacity", "0"),
          setTimeout(function () {
            b.$outer.removeClass("lg-dragging"),
              a < 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToNextSlide(!0)
                : a > 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToPrevSlide(!0)
                : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"),
              b.$slide.removeAttr("style");
          }),
          setTimeout(function () {
            b.$outer.hasClass("lg-dragging") ||
              "lg-slide" === b.s.mode ||
              b.$outer.removeClass("lg-slide");
          }, b.s.speed + 100);
      }),
      (b.prototype.enableSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1;
        a.s.enableSwipe &&
          a.isTouch &&
          a.doCss() &&
          (a.$slide.on("touchstart.lg", function (c) {
            a.$outer.hasClass("lg-zoomed") ||
              a.lgBusy ||
              (c.preventDefault(),
              a.manageSwipeClass(),
              (b = c.originalEvent.targetTouches[0].pageX));
          }),
          a.$slide.on("touchmove.lg", function (e) {
            a.$outer.hasClass("lg-zoomed") ||
              (e.preventDefault(),
              (c = e.originalEvent.targetTouches[0].pageX),
              a.touchMove(b, c),
              (d = !0));
          }),
          a.$slide.on("touchend.lg", function () {
            a.$outer.hasClass("lg-zoomed") ||
              (d
                ? ((d = !1), a.touchEnd(c - b))
                : a.$el.trigger("onSlideClick.lg"));
          }));
      }),
      (b.prototype.enableDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1;
        b.s.enableDrag &&
          !b.isTouch &&
          b.doCss() &&
          (b.$slide.on("mousedown.lg", function (d) {
            b.$outer.hasClass("lg-zoomed") ||
              ((a(d.target).hasClass("lg-object") ||
                a(d.target).hasClass("lg-video-play")) &&
                (d.preventDefault(),
                b.lgBusy ||
                  (b.manageSwipeClass(),
                  (c = d.pageX),
                  (e = !0),
                  (b.$outer.scrollLeft += 1),
                  (b.$outer.scrollLeft -= 1),
                  b.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
                  b.$el.trigger("onDragstart.lg"))));
          }),
          a(window).on("mousemove.lg", function (a) {
            e &&
              ((f = !0),
              (d = a.pageX),
              b.touchMove(c, d),
              b.$el.trigger("onDragmove.lg"));
          }),
          a(window).on("mouseup.lg", function (g) {
            f
              ? ((f = !1), b.touchEnd(d - c), b.$el.trigger("onDragend.lg"))
              : (a(g.target).hasClass("lg-object") ||
                  a(g.target).hasClass("lg-video-play")) &&
                b.$el.trigger("onSlideClick.lg"),
              e &&
                ((e = !1),
                b.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
          }));
      }),
      (b.prototype.manageSwipeClass = function () {
        var a = this.index + 1,
          b = this.index - 1;
        this.s.loop &&
          this.$slide.length > 2 &&
          (0 === this.index
            ? (b = this.$slide.length - 1)
            : this.index === this.$slide.length - 1 && (a = 0)),
          this.$slide.removeClass("lg-next-slide lg-prev-slide"),
          b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"),
          this.$slide.eq(a).addClass("lg-next-slide");
      }),
      (b.prototype.mousewheel = function () {
        var a = this;
        a.$outer.on("mousewheel.lg", function (b) {
          b.deltaY &&
            (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
            b.preventDefault());
        });
      }),
      (b.prototype.closeGallery = function () {
        var b = this,
          c = !1;
        this.$outer.find(".lg-close").on("click.lg", function () {
          b.destroy();
        }),
          b.s.closable &&
            (b.$outer.on("mousedown.lg", function (b) {
              c = !!(
                a(b.target).is(".lg-outer") ||
                a(b.target).is(".lg-item ") ||
                a(b.target).is(".lg-img-wrap")
              );
            }),
            b.$outer.on("mouseup.lg", function (d) {
              (a(d.target).is(".lg-outer") ||
                a(d.target).is(".lg-item ") ||
                (a(d.target).is(".lg-img-wrap") && c)) &&
                (b.$outer.hasClass("lg-dragging") || b.destroy());
            }));
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        b ||
          (c.$el.trigger("onBeforeClose.lg"),
          a(window).scrollTop(c.prevScrollTop)),
          b &&
            (c.s.dynamic || this.$items.off("click.lg click.lgcustom"),
            a.removeData(c.el, "lightGallery")),
          this.$el.off(".lg.tm"),
          a.each(a.fn.lightGallery.modules, function (a) {
            c.modules[a] && c.modules[a].destroy();
          }),
          (this.lGalleryOn = !1),
          clearTimeout(c.hideBartimeout),
          (this.hideBartimeout = !1),
          a(window).off(".lg"),
          a("body").removeClass("lg-on lg-from-hash"),
          c.$outer && c.$outer.removeClass("lg-visible"),
          a(".lg-backdrop").removeClass("in"),
          setTimeout(function () {
            c.$outer && c.$outer.remove(),
              a(".lg-backdrop").remove(),
              b || c.$el.trigger("onCloseAfter.lg");
          }, c.s.backdropDuration + 50);
      }),
      (a.fn.lightGallery = function (c) {
        return this.each(function () {
          if (a.data(this, "lightGallery"))
            try {
              a(this).data("lightGallery").init();
            } catch (a) {
              console.error("lightGallery has not initiated properly");
            }
          else a.data(this, "lightGallery", new b(this, c));
        });
      }),
      (a.fn.lightGallery.modules = {});
  })();
});

// Light Gallery Video
(function ($, window, document, undefined) {
  "use strict";

  var defaults = {
    videoMaxWidth: "855px",
    youtubePlayerParams: false,
    vimeoPlayerParams: false,
    dailymotionPlayerParams: false,
    vkPlayerParams: false,
    videojs: false,
    videojsOptions: {},
  };

  var Video = function (element) {
    this.core = $(element).data("lightGallery");

    this.$el = $(element);
    this.core.s = $.extend({}, defaults, this.core.s);
    this.videoLoaded = false;

    this.init();

    return this;
  };

  Video.prototype.init = function () {
    var _this = this;

    // Event triggered when video url found without poster
    _this.core.$el.on("hasVideo.lg.tm", function (event, index, src, html) {
      _this.core.$slide
        .eq(index)
        .find(".lg-video")
        .append(_this.loadVideo(src, "lg-object", true, index, html));
      if (html) {
        if (_this.core.s.videojs) {
          try {
            videojs(
              _this.core.$slide.eq(index).find(".lg-html5").get(0),
              _this.core.s.videojsOptions,
              function () {
                if (!_this.videoLoaded) {
                  this.play();
                }
              }
            );
          } catch (e) {
            console.error("Make sure you have included videojs");
          }
        } else {
          _this.core.$slide.eq(index).find(".lg-html5").get(0).play();
        }
      }
    });

    // Set max width for video
    _this.core.$el.on("onAferAppendSlide.lg.tm", function (event, index) {
      _this.core.$slide
        .eq(index)
        .find(".lg-video-cont")
        .css("max-width", _this.core.s.videoMaxWidth);
      _this.videoLoaded = true;
    });

    var loadOnClick = function ($el) {
      // check slide has poster
      if (
        $el.find(".lg-object").hasClass("lg-has-poster") &&
        $el.find(".lg-object").is(":visible")
      ) {
        // check already video element present
        if (!$el.hasClass("lg-has-video")) {
          $el.addClass("lg-video-playing lg-has-video");

          var _src;
          var _html;
          var _loadVideo = function (_src, _html) {
            $el
              .find(".lg-video")
              .append(
                _this.loadVideo(_src, "", false, _this.core.index, _html)
              );

            if (_html) {
              if (_this.core.s.videojs) {
                try {
                  videojs(
                    _this.core.$slide
                      .eq(_this.core.index)
                      .find(".lg-html5")
                      .get(0),
                    _this.core.s.videojsOptions,
                    function () {
                      this.play();
                    }
                  );
                } catch (e) {
                  console.error("Make sure you have included videojs");
                }
              } else {
                _this.core.$slide
                  .eq(_this.core.index)
                  .find(".lg-html5")
                  .get(0)
                  .play();
              }
            }
          };

          if (_this.core.s.dynamic) {
            _src = _this.core.s.dynamicEl[_this.core.index].src;
            _html = _this.core.s.dynamicEl[_this.core.index].html;

            _loadVideo(_src, _html);
          } else {
            _src =
              _this.core.$items.eq(_this.core.index).attr("href") ||
              _this.core.$items.eq(_this.core.index).attr("data-src");
            _html = _this.core.$items.eq(_this.core.index).attr("data-html");

            _loadVideo(_src, _html);
          }

          var $tempImg = $el.find(".lg-object");
          $el.find(".lg-video").append($tempImg);

          // @todo loading icon for html5 videos also
          // for showing the loading indicator while loading video
          if (!$el.find(".lg-video-object").hasClass("lg-html5")) {
            $el.removeClass("lg-complete");
            $el.find(".lg-video-object").on("load.lg error.lg", function () {
              $el.addClass("lg-complete");
            });
          }
        } else {
          var youtubePlayer = $el.find(".lg-youtube").get(0);
          var vimeoPlayer = $el.find(".lg-vimeo").get(0);
          var dailymotionPlayer = $el.find(".lg-dailymotion").get(0);
          var html5Player = $el.find(".lg-html5").get(0);
          if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          } else if (vimeoPlayer) {
            try {
              $f(vimeoPlayer).api("play");
            } catch (e) {
              console.error("Make sure you have included froogaloop2 js");
            }
          } else if (dailymotionPlayer) {
            dailymotionPlayer.contentWindow.postMessage("play", "*");
          } else if (html5Player) {
            if (_this.core.s.videojs) {
              try {
                videojs(html5Player).play();
              } catch (e) {
                console.error("Make sure you have included videojs");
              }
            } else {
              html5Player.play();
            }
          }

          $el.addClass("lg-video-playing");
        }
      }
    };

    if (
      _this.core.doCss() &&
      _this.core.$items.length > 1 &&
      ((_this.core.s.enableSwipe && _this.core.isTouch) ||
        (_this.core.s.enableDrag && !_this.core.isTouch))
    ) {
      _this.core.$el.on("onSlideClick.lg.tm", function () {
        var $el = _this.core.$slide.eq(_this.core.index);
        loadOnClick($el);
      });
    } else {
      // For IE 9 and bellow
      _this.core.$slide.on("click.lg", function () {
        loadOnClick($(this));
      });
    }

    _this.core.$el.on(
      "onBeforeSlide.lg.tm",
      function (event, prevIndex, index) {
        var $videoSlide = _this.core.$slide.eq(prevIndex);
        var youtubePlayer = $videoSlide.find(".lg-youtube").get(0);
        var vimeoPlayer = $videoSlide.find(".lg-vimeo").get(0);
        var dailymotionPlayer = $videoSlide.find(".lg-dailymotion").get(0);
        var vkPlayer = $videoSlide.find(".lg-vk").get(0);
        var html5Player = $videoSlide.find(".lg-html5").get(0);
        if (youtubePlayer) {
          youtubePlayer.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        } else if (vimeoPlayer) {
          try {
            $f(vimeoPlayer).api("pause");
          } catch (e) {
            console.error("Make sure you have included froogaloop2 js");
          }
        } else if (dailymotionPlayer) {
          dailymotionPlayer.contentWindow.postMessage("pause", "*");
        } else if (html5Player) {
          if (_this.core.s.videojs) {
            try {
              videojs(html5Player).pause();
            } catch (e) {
              console.error("Make sure you have included videojs");
            }
          } else {
            html5Player.pause();
          }
        }
        if (vkPlayer) {
          $(vkPlayer).attr(
            "src",
            $(vkPlayer).attr("src").replace("&autoplay", "&noplay")
          );
        }

        var _src;
        if (_this.core.s.dynamic) {
          _src = _this.core.s.dynamicEl[index].src;
        } else {
          _src =
            _this.core.$items.eq(index).attr("href") ||
            _this.core.$items.eq(index).attr("data-src");
        }

        var _isVideo = _this.core.isVideo(_src, index) || {};
        if (
          _isVideo.youtube ||
          _isVideo.vimeo ||
          _isVideo.dailymotion ||
          _isVideo.vk
        ) {
          _this.core.$outer.addClass("lg-hide-download");
        }

        //$videoSlide.addClass('lg-complete');
      }
    );

    _this.core.$el.on("onAfterSlide.lg.tm", function (event, prevIndex) {
      _this.core.$slide.eq(prevIndex).removeClass("lg-video-playing");
    });
  };

  Video.prototype.loadVideo = function (src, addClass, noposter, index, html) {
    var video = "";
    var autoplay = 1;
    var a = "";
    var isVideo = this.core.isVideo(src, index) || {};

    // Enable autoplay for first video if poster doesn't exist
    if (noposter) {
      if (this.videoLoaded) {
        autoplay = 0;
      } else {
        autoplay = 1;
      }
    }

    if (isVideo.youtube) {
      a = "?wmode=opaque&autoplay=" + autoplay + "&enablejsapi=1";
      if (this.core.s.youtubePlayerParams) {
        a = a + "&" + $.param(this.core.s.youtubePlayerParams);
      }

      video =
        '<iframe class="lg-video-object lg-youtube ' +
        addClass +
        '" width="560" height="315" src="//www.youtube.com/embed/' +
        isVideo.youtube[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>';
    } else if (isVideo.vimeo) {
      a = "?autoplay=" + autoplay + "&api=1";
      if (this.core.s.vimeoPlayerParams) {
        a = a + "&" + $.param(this.core.s.vimeoPlayerParams);
      }

      video =
        '<iframe class="lg-video-object lg-vimeo ' +
        addClass +
        '" width="560" height="315"  src="//player.vimeo.com/video/' +
        isVideo.vimeo[1] +
        a +
        '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
    } else if (isVideo.dailymotion) {
      a = "?wmode=opaque&autoplay=" + autoplay + "&api=postMessage";
      if (this.core.s.dailymotionPlayerParams) {
        a = a + "&" + $.param(this.core.s.dailymotionPlayerParams);
      }

      video =
        '<iframe class="lg-video-object lg-dailymotion ' +
        addClass +
        '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
        isVideo.dailymotion[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>';
    } else if (isVideo.html5) {
      var fL = html.substring(0, 1);
      if (fL === "." || fL === "#") {
        html = $(html).html();
      }

      video = html;
    } else if (isVideo.vk) {
      a = "&autoplay=" + autoplay;
      if (this.core.s.vkPlayerParams) {
        a = a + "&" + $.param(this.core.s.vkPlayerParams);
      }

      video =
        '<iframe class="lg-video-object lg-vk ' +
        addClass +
        '" width="560" height="315" src="http://vk.com/video_ext.php?' +
        isVideo.vk[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>';
    }

    return video;
  };

  Video.prototype.destroy = function () {
    this.videoLoaded = false;
  };

  $.fn.lightGallery.modules.video = Video;
})(jQuery, window, document);
