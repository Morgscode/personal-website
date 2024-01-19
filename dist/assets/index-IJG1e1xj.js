var mi = (w, O) => () => (O || w((O = { exports: {} }).exports, O), O.exports);
var or = mi((fr, Ut) => {
  function gi(w, O) {
    for (var N = 0; N < O.length; N++) {
      const L = O[N];
      if (typeof L != 'string' && !Array.isArray(L)) {
        for (const C in L)
          if (C !== 'default' && !(C in w)) {
            const B = Object.getOwnPropertyDescriptor(L, C);
            B &&
              Object.defineProperty(
                w,
                C,
                B.get ? B : { enumerable: !0, get: () => L[C] },
              );
          }
      }
    }
    return Object.freeze(
      Object.defineProperty(w, Symbol.toStringTag, { value: 'Module' }),
    );
  }
  (function () {
    const O = document.createElement('link').relList;
    if (O && O.supports && O.supports('modulepreload')) return;
    for (const C of document.querySelectorAll('link[rel="modulepreload"]'))
      L(C);
    new MutationObserver((C) => {
      for (const B of C)
        if (B.type === 'childList')
          for (const P of B.addedNodes)
            P.tagName === 'LINK' && P.rel === 'modulepreload' && L(P);
    }).observe(document, { childList: !0, subtree: !0 });
    function N(C) {
      const B = {};
      return (
        C.integrity && (B.integrity = C.integrity),
        C.referrerPolicy && (B.referrerPolicy = C.referrerPolicy),
        C.crossOrigin === 'use-credentials'
          ? (B.credentials = 'include')
          : C.crossOrigin === 'anonymous'
          ? (B.credentials = 'omit')
          : (B.credentials = 'same-origin'),
        B
      );
    }
    function L(C) {
      if (C.ep) return;
      C.ep = !0;
      const B = N(C);
      fetch(C.href, B);
    }
  })();
  var yi =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {};
  function Ti(w) {
    return w &&
      w.__esModule &&
      Object.prototype.hasOwnProperty.call(w, 'default')
      ? w.default
      : w;
  }
  var Kt = { exports: {} };
  /*!
   * ScrollMagic v2.0.8 (2020-08-14)
   * The javascript library for magical scroll interactions.
   * (c) 2020 Jan Paepke (@janpaepke)
   * Project Website: http://scrollmagic.io
   *
   * @version 2.0.8
   * @license Dual licensed under MIT license and GPL.
   * @author Jan Paepke - e-mail@janpaepke.de
   *
   * @file ScrollMagic main library.
   */ (function (w, O) {
    (function (N, L) {
      w.exports = L();
    })(yi, function () {
      var N = function () {
        P.log(
          2,
          "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.",
        );
      };
      (N.version = '2.0.8'),
        typeof window < 'u' && window.addEventListener('mousewheel', void 0);
      var L = 'data-scrollmagic-pin-spacer';
      N.Controller = function (o) {
        var g = 'ScrollMagic.Controller',
          S = 'FORWARD',
          R = 'REVERSE',
          s = 'PAUSED',
          M = C.defaults,
          u = this,
          T = P.extend({}, M, o),
          c = [],
          e = !1,
          r = 0,
          y = s,
          l = !0,
          D = 0,
          m = !0,
          $,
          I,
          Y = function () {
            for (var U in T)
              M.hasOwnProperty(U) ||
                (ee(2, 'WARNING: Unknown option "' + U + '"'), delete T[U]);
            if (((T.container = P.get.elements(T.container)[0]), !T.container))
              throw (
                (ee(
                  1,
                  'ERROR creating object ' +
                    g +
                    ': No valid scroll container supplied',
                ),
                g + ' init failed.')
              );
            (l =
              T.container === window ||
              T.container === document.body ||
              !document.body.contains(T.container)),
              l && (T.container = window),
              (D = W()),
              T.container.addEventListener('resize', fe),
              T.container.addEventListener('scroll', fe);
            var pe = parseInt(T.refreshInterval, 10);
            (T.refreshInterval = P.type.Number(pe) ? pe : M.refreshInterval),
              k(),
              ee(3, 'added new ' + g + ' controller (v' + N.version + ')');
          },
          k = function () {
            T.refreshInterval > 0 &&
              (I = window.setTimeout(ke, T.refreshInterval));
          },
          re = function () {
            return T.vertical
              ? P.get.scrollTop(T.container)
              : P.get.scrollLeft(T.container);
          },
          W = function () {
            return T.vertical
              ? P.get.height(T.container)
              : P.get.width(T.container);
          },
          ie = (this._setScrollPos = function (U) {
            T.vertical
              ? l
                ? window.scrollTo(P.get.scrollLeft(), U)
                : (T.container.scrollTop = U)
              : l
              ? window.scrollTo(U, P.get.scrollTop())
              : (T.container.scrollLeft = U);
          }),
          le = function () {
            if (m && e) {
              var U = P.type.Array(e) ? e : c.slice(0);
              e = !1;
              var pe = r;
              r = u.scrollPos();
              var Ee = r - pe;
              Ee !== 0 && (y = Ee > 0 ? S : R),
                y === R && U.reverse(),
                U.forEach(function (Me, Je) {
                  ee(
                    3,
                    'updating Scene ' +
                      (Je + 1) +
                      '/' +
                      U.length +
                      ' (' +
                      c.length +
                      ' total)',
                  ),
                    Me.update(!0);
                }),
                U.length === 0 &&
                  T.loglevel >= 3 &&
                  ee(3, 'updating 0 Scenes (nothing added to controller)');
            }
          },
          Z = function () {
            $ = P.rAF(le);
          },
          fe = function (U) {
            ee(3, 'event fired causing an update:', U.type),
              U.type == 'resize' && ((D = W()), (y = s)),
              e !== !0 && ((e = !0), Z());
          },
          ke = function () {
            if (!l && D != W()) {
              var U;
              try {
                U = new Event('resize', { bubbles: !1, cancelable: !1 });
              } catch {
                (U = document.createEvent('Event')),
                  U.initEvent('resize', !1, !1);
              }
              T.container.dispatchEvent(U);
            }
            c.forEach(function (pe, Ee) {
              pe.refresh();
            }),
              k();
          },
          ee = (this._log = function (U, pe) {
            T.loglevel >= U &&
              (Array.prototype.splice.call(arguments, 1, 0, '(' + g + ') ->'),
              P.log.apply(window, arguments));
          });
        this._options = T;
        var de = function (U) {
          if (U.length <= 1) return U;
          var pe = U.slice(0);
          return (
            pe.sort(function (Ee, Me) {
              return Ee.scrollOffset() > Me.scrollOffset() ? 1 : -1;
            }),
            pe
          );
        };
        return (
          (this.addScene = function (U) {
            if (P.type.Array(U))
              U.forEach(function (Ee, Me) {
                u.addScene(Ee);
              });
            else if (U instanceof N.Scene) {
              if (U.controller() !== u) U.addTo(u);
              else if (c.indexOf(U) < 0) {
                c.push(U),
                  (c = de(c)),
                  U.on('shift.controller_sort', function () {
                    c = de(c);
                  });
                for (var pe in T.globalSceneOptions)
                  U[pe] && U[pe].call(U, T.globalSceneOptions[pe]);
                ee(3, 'adding Scene (now ' + c.length + ' total)');
              }
            } else ee(1, "ERROR: invalid argument supplied for '.addScene()'");
            return u;
          }),
          (this.removeScene = function (U) {
            if (P.type.Array(U))
              U.forEach(function (Ee, Me) {
                u.removeScene(Ee);
              });
            else {
              var pe = c.indexOf(U);
              pe > -1 &&
                (U.off('shift.controller_sort'),
                c.splice(pe, 1),
                ee(3, 'removing Scene (now ' + c.length + ' left)'),
                U.remove());
            }
            return u;
          }),
          (this.updateScene = function (U, pe) {
            return (
              P.type.Array(U)
                ? U.forEach(function (Ee, Me) {
                    u.updateScene(Ee, pe);
                  })
                : pe
                ? U.update(!0)
                : e !== !0 &&
                  U instanceof N.Scene &&
                  ((e = e || []),
                  e.indexOf(U) == -1 && e.push(U),
                  (e = de(e)),
                  Z()),
              u
            );
          }),
          (this.update = function (U) {
            return fe({ type: 'resize' }), U && le(), u;
          }),
          (this.scrollTo = function (U, pe) {
            if (P.type.Number(U)) ie.call(T.container, U, pe);
            else if (U instanceof N.Scene)
              U.controller() === u
                ? u.scrollTo(U.scrollOffset(), pe)
                : ee(
                    2,
                    'scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.',
                    U,
                  );
            else if (P.type.Function(U)) ie = U;
            else {
              var Ee = P.get.elements(U)[0];
              if (Ee) {
                for (; Ee.parentNode.hasAttribute(L); ) Ee = Ee.parentNode;
                var Me = T.vertical ? 'top' : 'left',
                  Je = P.get.offset(T.container),
                  at = P.get.offset(Ee);
                l || (Je[Me] -= u.scrollPos()), u.scrollTo(at[Me] - Je[Me], pe);
              } else
                ee(
                  2,
                  'scrollTo(): The supplied argument is invalid. Scroll cancelled.',
                  U,
                );
            }
            return u;
          }),
          (this.scrollPos = function (U) {
            if (arguments.length)
              P.type.Function(U)
                ? (re = U)
                : ee(
                    2,
                    "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.",
                  );
            else return re.call(u);
            return u;
          }),
          (this.info = function (U) {
            var pe = {
              size: D,
              vertical: T.vertical,
              scrollPos: r,
              scrollDirection: y,
              container: T.container,
              isDocument: l,
            };
            if (arguments.length) {
              if (pe[U] !== void 0) return pe[U];
              ee(1, 'ERROR: option "' + U + '" is not available');
              return;
            } else return pe;
          }),
          (this.loglevel = function (U) {
            if (arguments.length) T.loglevel != U && (T.loglevel = U);
            else return T.loglevel;
            return u;
          }),
          (this.enabled = function (U) {
            if (arguments.length) m != U && ((m = !!U), u.updateScene(c, !0));
            else return m;
            return u;
          }),
          (this.destroy = function (U) {
            window.clearTimeout(I);
            for (var pe = c.length; pe--; ) c[pe].destroy(U);
            return (
              T.container.removeEventListener('resize', fe),
              T.container.removeEventListener('scroll', fe),
              P.cAF($),
              ee(
                3,
                'destroyed ' + g + ' (reset: ' + (U ? 'true' : 'false') + ')',
              ),
              null
            );
          }),
          Y(),
          u
        );
      };
      var C = {
        defaults: {
          container: window,
          vertical: !0,
          globalSceneOptions: {},
          loglevel: 2,
          refreshInterval: 100,
        },
      };
      (N.Controller.addOption = function (o, g) {
        C.defaults[o] = g;
      }),
        (N.Controller.extend = function (o) {
          var g = this;
          (N.Controller = function () {
            return (
              g.apply(this, arguments),
              (this.$super = P.extend({}, this)),
              o.apply(this, arguments) || this
            );
          }),
            P.extend(N.Controller, g),
            (N.Controller.prototype = g.prototype),
            (N.Controller.prototype.constructor = N.Controller);
        }),
        (N.Scene = function (o) {
          var g = 'ScrollMagic.Scene',
            S = 'BEFORE',
            R = 'DURING',
            s = 'AFTER',
            M = B.defaults,
            u = this,
            T = P.extend({}, M, o),
            c = S,
            e = 0,
            r = { start: 0, end: 0 },
            y = 0,
            l = !0,
            D,
            m,
            $ = function () {
              for (var X in T)
                M.hasOwnProperty(X) ||
                  (Y(2, 'WARNING: Unknown option "' + X + '"'), delete T[X]);
              for (var te in M) ke(te);
              Z();
            },
            I = {};
          (this.on = function (X, te) {
            return (
              P.type.Function(te)
                ? ((X = X.trim().split(' ')),
                  X.forEach(function (xe) {
                    var Ce = xe.split('.'),
                      me = Ce[0],
                      be = Ce[1];
                    me != '*' &&
                      (I[me] || (I[me] = []),
                      I[me].push({ namespace: be || '', callback: te }));
                  }))
                : Y(
                    1,
                    "ERROR when calling '.on()': Supplied callback for '" +
                      X +
                      "' is not a valid function!",
                  ),
              u
            );
          }),
            (this.off = function (X, te) {
              return X
                ? ((X = X.trim().split(' ')),
                  X.forEach(function (xe, Ce) {
                    var me = xe.split('.'),
                      be = me[0],
                      De = me[1] || '',
                      We = be === '*' ? Object.keys(I) : [be];
                    We.forEach(function (Xe) {
                      for (var He = I[Xe] || [], Ve = He.length; Ve--; ) {
                        var Ae = He[Ve];
                        Ae &&
                          (De === Ae.namespace || De === '*') &&
                          (!te || te == Ae.callback) &&
                          He.splice(Ve, 1);
                      }
                      He.length || delete I[Xe];
                    });
                  }),
                  u)
                : (Y(1, 'ERROR: Invalid event name supplied.'), u);
            }),
            (this.trigger = function (X, te) {
              if (X) {
                var xe = X.trim().split('.'),
                  Ce = xe[0],
                  me = xe[1],
                  be = I[Ce];
                Y(3, 'event fired:', Ce, te ? '->' : '', te || ''),
                  be &&
                    be.forEach(function (De, We) {
                      (!me || me === De.namespace) &&
                        De.callback.call(
                          u,
                          new N.Event(Ce, De.namespace, u, te),
                        );
                    });
              } else Y(1, 'ERROR: Invalid event name supplied.');
              return u;
            }),
            u
              .on('change.internal', function (X) {
                X.what !== 'loglevel' &&
                  X.what !== 'tweenChanges' &&
                  (X.what === 'triggerElement'
                    ? W()
                    : X.what === 'reverse' && u.update());
              })
              .on('shift.internal', function (X) {
                k(), u.update();
              });
          var Y = (this._log = function (X, te) {
            T.loglevel >= X &&
              (Array.prototype.splice.call(arguments, 1, 0, '(' + g + ') ->'),
              P.log.apply(window, arguments));
          });
          (this.addTo = function (X) {
            return (
              X instanceof N.Controller
                ? m != X &&
                  (m && m.removeScene(u),
                  (m = X),
                  Z(),
                  re(!0),
                  W(!0),
                  k(),
                  m.info('container').addEventListener('resize', ie),
                  X.addScene(u),
                  u.trigger('add', { controller: m }),
                  Y(3, 'added ' + g + ' to controller'),
                  u.update())
                : Y(
                    1,
                    "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller",
                  ),
              u
            );
          }),
            (this.enabled = function (X) {
              if (arguments.length) l != X && ((l = !!X), u.update(!0));
              else return l;
              return u;
            }),
            (this.remove = function () {
              if (m) {
                m.info('container').removeEventListener('resize', ie);
                var X = m;
                (m = void 0),
                  X.removeScene(u),
                  u.trigger('remove'),
                  Y(3, 'removed ' + g + ' from controller');
              }
              return u;
            }),
            (this.destroy = function (X) {
              return (
                u.trigger('destroy', { reset: X }),
                u.remove(),
                u.off('*.*'),
                Y(
                  3,
                  'destroyed ' + g + ' (reset: ' + (X ? 'true' : 'false') + ')',
                ),
                null
              );
            }),
            (this.update = function (X) {
              if (m)
                if (X)
                  if (m.enabled() && l) {
                    var te = m.info('scrollPos'),
                      xe;
                    T.duration > 0
                      ? (xe = (te - r.start) / (r.end - r.start))
                      : (xe = te >= r.start ? 1 : 0),
                      u.trigger('update', {
                        startPos: r.start,
                        endPos: r.end,
                        scrollPos: te,
                      }),
                      u.progress(xe);
                  } else ee && c === R && U(!0);
                else m.updateScene(u, !1);
              return u;
            }),
            (this.refresh = function () {
              return re(), W(), u;
            }),
            (this.progress = function (X) {
              if (arguments.length) {
                var te = !1,
                  xe = c,
                  Ce = m ? m.info('scrollDirection') : 'PAUSED',
                  me = T.reverse || X >= e;
                if (
                  (T.duration === 0
                    ? ((te = e != X),
                      (e = X < 1 && me ? 0 : 1),
                      (c = e === 0 ? S : R))
                    : X < 0 && c !== S && me
                    ? ((e = 0), (c = S), (te = !0))
                    : X >= 0 && X < 1 && me
                    ? ((e = X), (c = R), (te = !0))
                    : X >= 1 && c !== s
                    ? ((e = 1), (c = s), (te = !0))
                    : c === R && !me && U(),
                  te)
                ) {
                  var be = { progress: e, state: c, scrollDirection: Ce },
                    De = c != xe,
                    We = function (Xe) {
                      u.trigger(Xe, be);
                    };
                  De &&
                    xe !== R &&
                    (We('enter'), We(xe === S ? 'start' : 'end')),
                    We('progress'),
                    De &&
                      c !== R &&
                      (We(c === S ? 'start' : 'end'), We('leave'));
                }
                return u;
              } else return e;
            });
          var k = function () {
              (r = { start: y + T.offset }),
                m &&
                  T.triggerElement &&
                  (r.start -= m.info('size') * T.triggerHook),
                (r.end = r.start + T.duration);
            },
            re = function (X) {
              if (D) {
                var te = 'duration';
                fe(te, D.call(u)) &&
                  !X &&
                  (u.trigger('change', { what: te, newval: T[te] }),
                  u.trigger('shift', { reason: te }));
              }
            },
            W = function (X) {
              var te = 0,
                xe = T.triggerElement;
              if (m && (xe || y > 0)) {
                if (xe)
                  if (xe.parentNode) {
                    for (
                      var Ce = m.info(),
                        me = P.get.offset(Ce.container),
                        be = Ce.vertical ? 'top' : 'left';
                      xe.parentNode.hasAttribute(L);

                    )
                      xe = xe.parentNode;
                    var De = P.get.offset(xe);
                    Ce.isDocument || (me[be] -= m.scrollPos()),
                      (te = De[be] - me[be]);
                  } else
                    Y(
                      2,
                      'WARNING: triggerElement was removed from DOM and will be reset to',
                      void 0,
                    ),
                      u.triggerElement(void 0);
                var We = te != y;
                (y = te),
                  We &&
                    !X &&
                    u.trigger('shift', { reason: 'triggerElementPosition' });
              }
            },
            ie = function (X) {
              T.triggerHook > 0 &&
                u.trigger('shift', { reason: 'containerResize' });
            },
            le = P.extend(B.validate, {
              duration: function (X) {
                if (P.type.String(X) && X.match(/^(\.|\d)*\d+%$/)) {
                  var te = parseFloat(X) / 100;
                  X = function () {
                    return m ? m.info('size') * te : 0;
                  };
                }
                if (P.type.Function(X)) {
                  D = X;
                  try {
                    X = parseFloat(D.call(u));
                  } catch {
                    X = -1;
                  }
                }
                if (((X = parseFloat(X)), !P.type.Number(X) || X < 0))
                  throw D
                    ? ((D = void 0),
                      [
                        'Invalid return value of supplied function for option "duration":',
                        X,
                      ])
                    : ['Invalid value for option "duration":', X];
                return X;
              },
            }),
            Z = function (X) {
              (X = arguments.length ? [X] : Object.keys(le)),
                X.forEach(function (te, xe) {
                  var Ce;
                  if (le[te])
                    try {
                      Ce = le[te](T[te]);
                    } catch (be) {
                      Ce = M[te];
                      var me = P.type.String(be) ? [be] : be;
                      P.type.Array(me)
                        ? ((me[0] = 'ERROR: ' + me[0]),
                          me.unshift(1),
                          Y.apply(this, me))
                        : Y(
                            1,
                            "ERROR: Problem executing validation callback for option '" +
                              te +
                              "':",
                            be.message,
                          );
                    } finally {
                      T[te] = Ce;
                    }
                });
            },
            fe = function (X, te) {
              var xe = !1,
                Ce = T[X];
              return T[X] != te && ((T[X] = te), Z(X), (xe = Ce != T[X])), xe;
            },
            ke = function (X) {
              u[X] ||
                (u[X] = function (te) {
                  if (arguments.length)
                    X === 'duration' && (D = void 0),
                      fe(X, te) &&
                        (u.trigger('change', { what: X, newval: T[X] }),
                        B.shifts.indexOf(X) > -1 &&
                          u.trigger('shift', { reason: X }));
                  else return T[X];
                  return u;
                });
            };
          (this.controller = function () {
            return m;
          }),
            (this.state = function () {
              return c;
            }),
            (this.scrollOffset = function () {
              return r.start;
            }),
            (this.triggerPosition = function () {
              var X = T.offset;
              return (
                m &&
                  (T.triggerElement
                    ? (X += y)
                    : (X += m.info('size') * u.triggerHook())),
                X
              );
            });
          var ee, de;
          u.on('shift.internal', function (X) {
            var te = X.reason === 'duration';
            ((c === s && te) || (c === R && T.duration === 0)) && U(),
              te && pe();
          })
            .on('progress.internal', function (X) {
              U();
            })
            .on('add.internal', function (X) {
              pe();
            })
            .on('destroy.internal', function (X) {
              u.removePin(X.reset);
            });
          var U = function (X) {
              if (ee && m) {
                var te = m.info(),
                  xe = de.spacer.firstChild;
                if (!X && c === R) {
                  P.css(xe, 'position') != 'fixed' &&
                    (P.css(xe, { position: 'fixed' }), pe());
                  var Ce = P.get.offset(de.spacer, !0),
                    me =
                      T.reverse || T.duration === 0
                        ? te.scrollPos - r.start
                        : Math.round(e * T.duration * 10) / 10;
                  (Ce[te.vertical ? 'top' : 'left'] += me),
                    P.css(de.spacer.firstChild, { top: Ce.top, left: Ce.left });
                } else {
                  var be = {
                      position: de.inFlow ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                    },
                    De = P.css(xe, 'position') != be.position;
                  de.pushFollowers
                    ? T.duration > 0 &&
                      ((c === s &&
                        parseFloat(P.css(de.spacer, 'padding-top')) === 0) ||
                        (c === S &&
                          parseFloat(P.css(de.spacer, 'padding-bottom')) ===
                            0)) &&
                      (De = !0)
                    : (be[te.vertical ? 'top' : 'left'] = T.duration * e),
                    P.css(xe, be),
                    De && pe();
                }
              }
            },
            pe = function () {
              if (ee && m && de.inFlow) {
                var X = c === R,
                  te = m.info('vertical'),
                  xe = de.spacer.firstChild,
                  Ce = P.isMarginCollapseType(P.css(de.spacer, 'display')),
                  me = {};
                de.relSize.width || de.relSize.autoFullWidth
                  ? X
                    ? P.css(ee, { width: P.get.width(de.spacer) })
                    : P.css(ee, { width: '100%' })
                  : ((me['min-width'] = P.get.width(te ? ee : xe, !0, !0)),
                    (me.width = X ? me['min-width'] : 'auto')),
                  de.relSize.height
                    ? X
                      ? P.css(ee, {
                          height:
                            P.get.height(de.spacer) -
                            (de.pushFollowers ? T.duration : 0),
                        })
                      : P.css(ee, { height: '100%' })
                    : ((me['min-height'] = P.get.height(te ? xe : ee, !0, !Ce)),
                      (me.height = X ? me['min-height'] : 'auto')),
                  de.pushFollowers &&
                    ((me['padding' + (te ? 'Top' : 'Left')] = T.duration * e),
                    (me['padding' + (te ? 'Bottom' : 'Right')] =
                      T.duration * (1 - e))),
                  P.css(de.spacer, me);
              }
            },
            Ee = function () {
              m && ee && c === R && !m.info('isDocument') && U();
            },
            Me = function () {
              m &&
                ee &&
                c === R &&
                (((de.relSize.width || de.relSize.autoFullWidth) &&
                  P.get.width(window) != P.get.width(de.spacer.parentNode)) ||
                  (de.relSize.height &&
                    P.get.height(window) !=
                      P.get.height(de.spacer.parentNode))) &&
                pe();
            },
            Je = function (X) {
              m &&
                ee &&
                c === R &&
                !m.info('isDocument') &&
                (X.preventDefault(),
                m._setScrollPos(
                  m.info('scrollPos') -
                    ((X.wheelDelta ||
                      X[m.info('vertical') ? 'wheelDeltaY' : 'wheelDeltaX']) /
                      3 || -X.detail * 30),
                ));
            };
          (this.setPin = function (X, te) {
            var xe = {
                pushFollowers: !0,
                spacerClass: 'scrollmagic-pin-spacer',
              },
              Ce = te && te.hasOwnProperty('pushFollowers');
            if (((te = P.extend({}, xe, te)), (X = P.get.elements(X)[0]), X)) {
              if (P.css(X, 'position') === 'fixed')
                return (
                  Y(
                    1,
                    "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.",
                  ),
                  u
                );
            } else
              return (
                Y(
                  1,
                  "ERROR calling method 'setPin()': Invalid pin element supplied.",
                ),
                u
              );
            if (ee) {
              if (ee === X) return u;
              u.removePin();
            }
            ee = X;
            var me = ee.parentNode.style.display,
              be = [
                'top',
                'left',
                'bottom',
                'right',
                'margin',
                'marginLeft',
                'marginRight',
                'marginTop',
                'marginBottom',
              ];
            ee.parentNode.style.display = 'none';
            var De = P.css(ee, 'position') != 'absolute',
              We = P.css(ee, be.concat(['display'])),
              Xe = P.css(ee, ['width', 'height']);
            (ee.parentNode.style.display = me),
              !De &&
                te.pushFollowers &&
                (Y(
                  2,
                  'WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.',
                ),
                (te.pushFollowers = !1)),
              window.setTimeout(function () {
                ee &&
                  T.duration === 0 &&
                  Ce &&
                  te.pushFollowers &&
                  Y(
                    2,
                    'WARNING: pushFollowers =',
                    !0,
                    'has no effect, when scene duration is 0.',
                  );
              }, 0);
            var He = ee.parentNode.insertBefore(
                document.createElement('div'),
                ee,
              ),
              Ve = P.extend(We, {
                position: De ? 'relative' : 'absolute',
                boxSizing: 'content-box',
                mozBoxSizing: 'content-box',
                webkitBoxSizing: 'content-box',
              });
            if (
              (De || P.extend(Ve, P.css(ee, ['width', 'height'])),
              P.css(He, Ve),
              He.setAttribute(L, ''),
              P.addClass(He, te.spacerClass),
              (de = {
                spacer: He,
                relSize: {
                  width: Xe.width.slice(-1) === '%',
                  height: Xe.height.slice(-1) === '%',
                  autoFullWidth:
                    Xe.width === 'auto' &&
                    De &&
                    P.isMarginCollapseType(We.display),
                },
                pushFollowers: te.pushFollowers,
                inFlow: De,
              }),
              !ee.___origStyle)
            ) {
              ee.___origStyle = {};
              var Ae = ee.style,
                et = be.concat([
                  'width',
                  'height',
                  'position',
                  'boxSizing',
                  'mozBoxSizing',
                  'webkitBoxSizing',
                ]);
              et.forEach(function (nt) {
                ee.___origStyle[nt] = Ae[nt] || '';
              });
            }
            return (
              de.relSize.width && P.css(He, { width: Xe.width }),
              de.relSize.height && P.css(He, { height: Xe.height }),
              He.appendChild(ee),
              P.css(ee, {
                position: De ? 'relative' : 'absolute',
                margin: 'auto',
                top: 'auto',
                left: 'auto',
                bottom: 'auto',
                right: 'auto',
              }),
              (de.relSize.width || de.relSize.autoFullWidth) &&
                P.css(ee, {
                  boxSizing: 'border-box',
                  mozBoxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }),
              window.addEventListener('scroll', Ee),
              window.addEventListener('resize', Ee),
              window.addEventListener('resize', Me),
              ee.addEventListener('mousewheel', Je),
              ee.addEventListener('DOMMouseScroll', Je),
              Y(3, 'added pin'),
              U(),
              u
            );
          }),
            (this.removePin = function (X) {
              if (ee) {
                if ((c === R && U(!0), X || !m)) {
                  var te = de.spacer.firstChild;
                  if (te.hasAttribute(L)) {
                    var xe = de.spacer.style,
                      Ce = [
                        'margin',
                        'marginLeft',
                        'marginRight',
                        'marginTop',
                        'marginBottom',
                      ],
                      me = {};
                    Ce.forEach(function (be) {
                      me[be] = xe[be] || '';
                    }),
                      P.css(te, me);
                  }
                  de.spacer.parentNode.insertBefore(te, de.spacer),
                    de.spacer.parentNode.removeChild(de.spacer),
                    ee.parentNode.hasAttribute(L) ||
                      (P.css(ee, ee.___origStyle), delete ee.___origStyle);
                }
                window.removeEventListener('scroll', Ee),
                  window.removeEventListener('resize', Ee),
                  window.removeEventListener('resize', Me),
                  ee.removeEventListener('mousewheel', Je),
                  ee.removeEventListener('DOMMouseScroll', Je),
                  (ee = void 0),
                  Y(3, 'removed pin (reset: ' + (X ? 'true' : 'false') + ')');
              }
              return u;
            });
          var at,
            ot = [];
          return (
            u.on('destroy.internal', function (X) {
              u.removeClassToggle(X.reset);
            }),
            (this.setClassToggle = function (X, te) {
              var xe = P.get.elements(X);
              return xe.length === 0 || !P.type.String(te)
                ? (Y(
                    1,
                    "ERROR calling method 'setClassToggle()': Invalid " +
                      (xe.length === 0 ? 'element' : 'classes') +
                      ' supplied.',
                  ),
                  u)
                : (ot.length > 0 && u.removeClassToggle(),
                  (at = te),
                  (ot = xe),
                  u.on(
                    'enter.internal_class leave.internal_class',
                    function (Ce) {
                      var me = Ce.type === 'enter' ? P.addClass : P.removeClass;
                      ot.forEach(function (be, De) {
                        me(be, at);
                      });
                    },
                  ),
                  u);
            }),
            (this.removeClassToggle = function (X) {
              return (
                X &&
                  ot.forEach(function (te, xe) {
                    P.removeClass(te, at);
                  }),
                u.off('start.internal_class end.internal_class'),
                (at = void 0),
                (ot = []),
                u
              );
            }),
            $(),
            u
          );
        });
      var B = {
        defaults: {
          duration: 0,
          offset: 0,
          triggerElement: void 0,
          triggerHook: 0.5,
          reverse: !0,
          loglevel: 2,
        },
        validate: {
          offset: function (o) {
            if (((o = parseFloat(o)), !P.type.Number(o)))
              throw ['Invalid value for option "offset":', o];
            return o;
          },
          triggerElement: function (o) {
            if (((o = o || void 0), o)) {
              var g = P.get.elements(o)[0];
              if (g && g.parentNode) o = g;
              else
                throw [
                  'Element defined in option "triggerElement" was not found:',
                  o,
                ];
            }
            return o;
          },
          triggerHook: function (o) {
            var g = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
            if (P.type.Number(o)) o = Math.max(0, Math.min(parseFloat(o), 1));
            else if (o in g) o = g[o];
            else throw ['Invalid value for option "triggerHook": ', o];
            return o;
          },
          reverse: function (o) {
            return !!o;
          },
          loglevel: function (o) {
            if (((o = parseInt(o)), !P.type.Number(o) || o < 0 || o > 3))
              throw ['Invalid value for option "loglevel":', o];
            return o;
          },
        },
        shifts: ['duration', 'offset', 'triggerHook'],
      };
      (N.Scene.addOption = function (o, g, S, R) {
        o in B.defaults
          ? N._util.log(
              1,
              "[static] ScrollMagic.Scene -> Cannot add Scene option '" +
                o +
                "', because it already exists.",
            )
          : ((B.defaults[o] = g), (B.validate[o] = S), R && B.shifts.push(o));
      }),
        (N.Scene.extend = function (o) {
          var g = this;
          (N.Scene = function () {
            return (
              g.apply(this, arguments),
              (this.$super = P.extend({}, this)),
              o.apply(this, arguments) || this
            );
          }),
            P.extend(N.Scene, g),
            (N.Scene.prototype = g.prototype),
            (N.Scene.prototype.constructor = N.Scene);
        }),
        (N.Event = function (o, g, S, R) {
          R = R || {};
          for (var s in R) this[s] = R[s];
          return (
            (this.type = o),
            (this.target = this.currentTarget = S),
            (this.namespace = g || ''),
            (this.timeStamp = this.timestamp = Date.now()),
            this
          );
        });
      var P = (N._util = (function (o) {
        var g = {},
          S,
          R = function (I) {
            return parseFloat(I) || 0;
          },
          s = function (I) {
            return I.currentStyle ? I.currentStyle : o.getComputedStyle(I);
          },
          M = function (I, Y, k, re) {
            if (((Y = Y === document ? o : Y), Y === o)) re = !1;
            else if (!m.DomElement(Y)) return 0;
            I = I.charAt(0).toUpperCase() + I.substr(1).toLowerCase();
            var W =
              (k
                ? Y['offset' + I] || Y['outer' + I]
                : Y['client' + I] || Y['inner' + I]) || 0;
            if (k && re) {
              var ie = s(Y);
              W +=
                I === 'Height'
                  ? R(ie.marginTop) + R(ie.marginBottom)
                  : R(ie.marginLeft) + R(ie.marginRight);
            }
            return W;
          },
          u = function (I) {
            return I.replace(/^[^a-z]+([a-z])/g, '$1').replace(
              /-([a-z])/g,
              function (Y) {
                return Y[1].toUpperCase();
              },
            );
          };
        (g.extend = function (I) {
          for (I = I || {}, S = 1; S < arguments.length; S++)
            if (arguments[S])
              for (var Y in arguments[S])
                arguments[S].hasOwnProperty(Y) && (I[Y] = arguments[S][Y]);
          return I;
        }),
          (g.isMarginCollapseType = function (I) {
            return (
              ['block', 'flex', 'list-item', 'table', '-webkit-box'].indexOf(
                I,
              ) > -1
            );
          });
        var T = 0,
          c = ['ms', 'moz', 'webkit', 'o'],
          e = o.requestAnimationFrame,
          r = o.cancelAnimationFrame;
        for (S = 0; !e && S < c.length; ++S)
          (e = o[c[S] + 'RequestAnimationFrame']),
            (r =
              o[c[S] + 'CancelAnimationFrame'] ||
              o[c[S] + 'CancelRequestAnimationFrame']);
        e ||
          (e = function (I) {
            var Y = new Date().getTime(),
              k = Math.max(0, 16 - (Y - T)),
              re = o.setTimeout(function () {
                I(Y + k);
              }, k);
            return (T = Y + k), re;
          }),
          r ||
            (r = function (I) {
              o.clearTimeout(I);
            }),
          (g.rAF = e.bind(o)),
          (g.cAF = r.bind(o));
        var y = ['error', 'warn', 'log'],
          l = o.console || {};
        for (l.log = l.log || function () {}, S = 0; S < y.length; S++) {
          var D = y[S];
          l[D] || (l[D] = l.log);
        }
        g.log = function (I) {
          (I > y.length || I <= 0) && (I = y.length);
          var Y = new Date(),
            k =
              ('0' + Y.getHours()).slice(-2) +
              ':' +
              ('0' + Y.getMinutes()).slice(-2) +
              ':' +
              ('0' + Y.getSeconds()).slice(-2) +
              ':' +
              ('00' + Y.getMilliseconds()).slice(-3),
            re = y[I - 1],
            W = Array.prototype.splice.call(arguments, 1),
            ie = Function.prototype.bind.call(l[re], l);
          W.unshift(k), ie.apply(l, W);
        };
        var m = (g.type = function (I) {
          return Object.prototype.toString
            .call(I)
            .replace(/^\[object (.+)\]$/, '$1')
            .toLowerCase();
        });
        (m.String = function (I) {
          return m(I) === 'string';
        }),
          (m.Function = function (I) {
            return m(I) === 'function';
          }),
          (m.Array = function (I) {
            return Array.isArray(I);
          }),
          (m.Number = function (I) {
            return !m.Array(I) && I - parseFloat(I) + 1 >= 0;
          }),
          (m.DomElement = function (I) {
            return typeof HTMLElement == 'object' ||
              typeof HTMLElement == 'function'
              ? I instanceof HTMLElement || I instanceof SVGElement
              : I &&
                  typeof I == 'object' &&
                  I !== null &&
                  I.nodeType === 1 &&
                  typeof I.nodeName == 'string';
          });
        var $ = (g.get = {});
        return (
          ($.elements = function (I) {
            var Y = [];
            if (m.String(I))
              try {
                I = document.querySelectorAll(I);
              } catch {
                return Y;
              }
            if (m(I) === 'nodelist' || m.Array(I) || I instanceof NodeList)
              for (var k = 0, re = (Y.length = I.length); k < re; k++) {
                var W = I[k];
                Y[k] = m.DomElement(W) ? W : $.elements(W);
              }
            else (m.DomElement(I) || I === document || I === o) && (Y = [I]);
            return Y;
          }),
          ($.scrollTop = function (I) {
            return I && typeof I.scrollTop == 'number'
              ? I.scrollTop
              : o.pageYOffset || 0;
          }),
          ($.scrollLeft = function (I) {
            return I && typeof I.scrollLeft == 'number'
              ? I.scrollLeft
              : o.pageXOffset || 0;
          }),
          ($.width = function (I, Y, k) {
            return M('width', I, Y, k);
          }),
          ($.height = function (I, Y, k) {
            return M('height', I, Y, k);
          }),
          ($.offset = function (I, Y) {
            var k = { top: 0, left: 0 };
            if (I && I.getBoundingClientRect) {
              var re = I.getBoundingClientRect();
              (k.top = re.top),
                (k.left = re.left),
                Y || ((k.top += $.scrollTop()), (k.left += $.scrollLeft()));
            }
            return k;
          }),
          (g.addClass = function (I, Y) {
            Y && (I.classList ? I.classList.add(Y) : (I.className += ' ' + Y));
          }),
          (g.removeClass = function (I, Y) {
            Y &&
              (I.classList
                ? I.classList.remove(Y)
                : (I.className = I.className.replace(
                    new RegExp(
                      '(^|\\b)' + Y.split(' ').join('|') + '(\\b|$)',
                      'gi',
                    ),
                    ' ',
                  )));
          }),
          (g.css = function (I, Y) {
            if (m.String(Y)) return s(I)[u(Y)];
            if (m.Array(Y)) {
              var k = {},
                re = s(I);
              return (
                Y.forEach(function (le, Z) {
                  k[le] = re[u(le)];
                }),
                k
              );
            } else
              for (var W in Y) {
                var ie = Y[W];
                ie == parseFloat(ie) && (ie += 'px'), (I.style[u(W)] = ie);
              }
          }),
          g
        );
      })(window || {}));
      return (
        (N.Scene.prototype.addIndicators = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js",
            ),
            this
          );
        }),
        (N.Scene.prototype.removeIndicators = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js",
            ),
            this
          );
        }),
        (N.Scene.prototype.setTween = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js",
            ),
            this
          );
        }),
        (N.Scene.prototype.removeTween = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js",
            ),
            this
          );
        }),
        (N.Scene.prototype.setVelocity = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js",
            ),
            this
          );
        }),
        (N.Scene.prototype.removeVelocity = function () {
          return (
            N._util.log(
              1,
              "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js",
            ),
            this
          );
        }),
        N
      );
    });
  })(Kt);
  var bt = Kt.exports;
  const xi = Ti(bt),
    wi = gi({ __proto__: null, default: xi }, [bt]);
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   */ var Ge =
      typeof window < 'u'
        ? window
        : typeof Ut < 'u' && Ut.exports && typeof global < 'u'
        ? global
        : {},
    Re = (function (w) {
      var O = w.document,
        N = (w.GreenSockGlobals = w.GreenSockGlobals || w);
      if (N.TweenLite) return N.TweenLite;
      var L = function (n) {
          var d = n.split('.'),
            x = N,
            f;
          for (f = 0; f < d.length; f++) x[d[f]] = x = x[d[f]] || {};
          return x;
        },
        C = L('com.greensock'),
        B = 1e-8,
        P = function (n) {
          var d = [],
            x = n.length,
            f;
          for (f = 0; f !== x; d.push(n[f++]));
          return d;
        },
        o = function () {},
        g = (function () {
          var n = Object.prototype.toString,
            d = n.call([]);
          return function (x) {
            return (
              x != null &&
              (x instanceof Array ||
                (typeof x == 'object' && !!x.push && n.call(x) === d))
            );
          };
        })(),
        S,
        R,
        s,
        M,
        u,
        T = {},
        c = function (n, d, x, f) {
          (this.sc = T[n] ? T[n].sc : []),
            (T[n] = this),
            (this.gsClass = null),
            (this.func = x);
          var z = [];
          (this.check = function (q) {
            for (var Q = d.length, K = Q, J, ue, he, ce; --Q > -1; )
              (J = T[d[Q]] || new c(d[Q], [])).gsClass
                ? ((z[Q] = J.gsClass), K--)
                : q && J.sc.push(this);
            if (K === 0 && x)
              for (
                ue = ('com.greensock.' + n).split('.'),
                  he = ue.pop(),
                  ce = L(ue.join('.'))[he] = this.gsClass = x.apply(x, z),
                  f && (N[he] = ce),
                  Q = 0;
                Q < this.sc.length;
                Q++
              )
                this.sc[Q].check();
          }),
            this.check(!0);
        },
        e = (w._gsDefine = function (n, d, x, f) {
          return new c(n, d, x, f);
        }),
        r = (C._class = function (n, d, x) {
          return (
            (d = d || function () {}),
            e(
              n,
              [],
              function () {
                return d;
              },
              x,
            ),
            d
          );
        });
      e.globals = N;
      var y = [0, 0, 1, 1],
        l = r(
          'easing.Ease',
          function (n, d, x, f) {
            (this._func = n),
              (this._type = x || 0),
              (this._power = f || 0),
              (this._params = d ? y.concat(d) : y);
          },
          !0,
        ),
        D = (l.map = {}),
        m = (l.register = function (n, d, x, f) {
          for (
            var z = d.split(','),
              q = z.length,
              Q = (x || 'easeIn,easeOut,easeInOut').split(','),
              K,
              J,
              ue,
              he;
            --q > -1;

          )
            for (
              J = z[q],
                K = f ? r('easing.' + J, null, !0) : C.easing[J] || {},
                ue = Q.length;
              --ue > -1;

            )
              (he = Q[ue]),
                (D[J + '.' + he] =
                  D[he + J] =
                  K[he] =
                    n.getRatio ? n : n[he] || new n());
        });
      for (
        s = l.prototype,
          s._calcEnd = !1,
          s.getRatio = function (n) {
            if (this._func)
              return (
                (this._params[0] = n), this._func.apply(null, this._params)
              );
            var d = this._type,
              x = this._power,
              f = d === 1 ? 1 - n : d === 2 ? n : n < 0.5 ? n * 2 : (1 - n) * 2;
            return (
              x === 1
                ? (f *= f)
                : x === 2
                ? (f *= f * f)
                : x === 3
                ? (f *= f * f * f)
                : x === 4 && (f *= f * f * f * f),
              d === 1 ? 1 - f : d === 2 ? f : n < 0.5 ? f / 2 : 1 - f / 2
            );
          },
          S = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'],
          R = S.length;
        --R > -1;

      )
        (s = S[R] + ',Power' + R),
          m(new l(null, null, 1, R), s, 'easeOut', !0),
          m(
            new l(null, null, 2, R),
            s,
            'easeIn' + (R === 0 ? ',easeNone' : ''),
          ),
          m(new l(null, null, 3, R), s, 'easeInOut');
      (D.linear = C.easing.Linear.easeIn), (D.swing = C.easing.Quad.easeInOut);
      var $ = r('events.EventDispatcher', function (n) {
        (this._listeners = {}), (this._eventTarget = n || this);
      });
      (s = $.prototype),
        (s.addEventListener = function (n, d, x, f, z) {
          z = z || 0;
          var q = this._listeners[n],
            Q = 0,
            K,
            J;
          for (
            this === M && !u && M.wake(),
              q == null && (this._listeners[n] = q = []),
              J = q.length;
            --J > -1;

          )
            (K = q[J]),
              K.c === d && K.s === x
                ? q.splice(J, 1)
                : Q === 0 && K.pr < z && (Q = J + 1);
          q.splice(Q, 0, { c: d, s: x, up: f, pr: z });
        }),
        (s.removeEventListener = function (n, d) {
          var x = this._listeners[n],
            f;
          if (x) {
            for (f = x.length; --f > -1; )
              if (x[f].c === d) {
                x.splice(f, 1);
                return;
              }
          }
        }),
        (s.dispatchEvent = function (n) {
          var d = this._listeners[n],
            x,
            f,
            z;
          if (d)
            for (
              x = d.length, x > 1 && (d = d.slice(0)), f = this._eventTarget;
              --x > -1;

            )
              (z = d[x]),
                z &&
                  (z.up
                    ? z.c.call(z.s || f, { type: n, target: f })
                    : z.c.call(z.s || f));
        });
      var I = w.requestAnimationFrame,
        Y = w.cancelAnimationFrame,
        k =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        re = k();
      for (S = ['ms', 'moz', 'webkit', 'o'], R = S.length; --R > -1 && !I; )
        (I = w[S[R] + 'RequestAnimationFrame']),
          (Y =
            w[S[R] + 'CancelAnimationFrame'] ||
            w[S[R] + 'CancelRequestAnimationFrame']);
      r('Ticker', function (n, d) {
        var x = this,
          f = k(),
          z = d !== !1 && I ? 'auto' : !1,
          q = 500,
          Q = 33,
          K = 'tick',
          J,
          ue,
          he,
          ce,
          Ie,
          ge = function (Ne) {
            var lt = k() - re,
              ht,
              Ye;
            lt > q && (f += lt - Q),
              (re += lt),
              (x.time = (re - f) / 1e3),
              (ht = x.time - Ie),
              (!J || ht > 0 || Ne === !0) &&
                (x.frame++,
                (Ie += ht + (ht >= ce ? 0.004 : ce - ht)),
                (Ye = !0)),
              Ne !== !0 && (he = ue(ge)),
              Ye && x.dispatchEvent(K);
          };
        $.call(x),
          (x.time = x.frame = 0),
          (x.tick = function () {
            ge(!0);
          }),
          (x.lagSmoothing = function (Ne, lt) {
            if (!arguments.length) return q < 1 / B;
            (q = Ne || 1 / B), (Q = Math.min(lt, q, 0));
          }),
          (x.sleep = function () {
            he != null &&
              (!z || !Y ? clearTimeout(he) : Y(he),
              (ue = o),
              (he = null),
              x === M && (u = !1));
          }),
          (x.wake = function (Ne) {
            he !== null
              ? x.sleep()
              : Ne
              ? (f += -re + (re = k()))
              : x.frame > 10 && (re = k() - q + 5),
              (ue =
                J === 0
                  ? o
                  : !z || !I
                  ? function (lt) {
                      return setTimeout(lt, ((Ie - x.time) * 1e3 + 1) | 0);
                    }
                  : I),
              x === M && (u = !0),
              ge(2);
          }),
          (x.fps = function (Ne) {
            if (!arguments.length) return J;
            (J = Ne), (ce = 1 / (J || 60)), (Ie = this.time + ce), x.wake();
          }),
          (x.useRAF = function (Ne) {
            if (!arguments.length) return z;
            x.sleep(), (z = Ne), x.fps(J);
          }),
          x.fps(n),
          setTimeout(function () {
            z === 'auto' &&
              x.frame < 5 &&
              (O || {}).visibilityState !== 'hidden' &&
              x.useRAF(!1);
          }, 1500);
      }),
        (s = C.Ticker.prototype = new C.events.EventDispatcher()),
        (s.constructor = C.Ticker);
      var W = r('core.Animation', function (n, d) {
        if (
          ((this.vars = d = d || {}),
          (this._duration = this._totalDuration = n || 0),
          (this._delay = Number(d.delay) || 0),
          (this._timeScale = 1),
          (this._active = !!d.immediateRender),
          (this.data = d.data),
          (this._reversed = !!d.reversed),
          !!De)
        ) {
          u || M.wake();
          var x = this.vars.useFrames ? be : De;
          x.add(this, x._time), this.vars.paused && this.paused(!0);
        }
      });
      (M = W.ticker = new C.Ticker()),
        (s = W.prototype),
        (s._dirty = s._gc = s._initted = s._paused = !1),
        (s._totalTime = s._time = 0),
        (s._rawPrevTime = -1),
        (s._next = s._last = s._onUpdate = s._timeline = s.timeline = null),
        (s._paused = !1);
      var ie = function () {
        u &&
          k() - re > 2e3 &&
          ((O || {}).visibilityState !== 'hidden' || !M.lagSmoothing()) &&
          M.wake();
        var n = setTimeout(ie, 2e3);
        n.unref && n.unref();
      };
      ie(),
        (s.play = function (n, d) {
          return n != null && this.seek(n, d), this.reversed(!1).paused(!1);
        }),
        (s.pause = function (n, d) {
          return n != null && this.seek(n, d), this.paused(!0);
        }),
        (s.resume = function (n, d) {
          return n != null && this.seek(n, d), this.paused(!1);
        }),
        (s.seek = function (n, d) {
          return this.totalTime(Number(n), d !== !1);
        }),
        (s.restart = function (n, d) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(n ? -this._delay : 0, d !== !1, !0);
        }),
        (s.reverse = function (n, d) {
          return (
            n != null && this.seek(n || this.totalDuration(), d),
            this.reversed(!0).paused(!1)
          );
        }),
        (s.render = function (n, d, x) {}),
        (s.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (s.isActive = function () {
          var n = this._timeline,
            d = this._startTime,
            x;
          return (
            !n ||
            (!this._gc &&
              !this._paused &&
              n.isActive() &&
              (x = n.rawTime(!0)) >= d &&
              x < d + this.totalDuration() / this._timeScale - B)
          );
        }),
        (s._enabled = function (n, d) {
          return (
            u || M.wake(),
            (this._gc = !n),
            (this._active = this.isActive()),
            d !== !0 &&
              (n && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !n && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (s._kill = function (n, d) {
          return this._enabled(!1, !1);
        }),
        (s.kill = function (n, d) {
          return this._kill(n, d), this;
        }),
        (s._uncache = function (n) {
          for (var d = n ? this : this.timeline; d; )
            (d._dirty = !0), (d = d.timeline);
          return this;
        }),
        (s._swapSelfInParams = function (n) {
          for (var d = n.length, x = n.concat(); --d > -1; )
            n[d] === '{self}' && (x[d] = this);
          return x;
        }),
        (s._callback = function (n) {
          var d = this.vars,
            x = d[n],
            f = d[n + 'Params'],
            z = d[n + 'Scope'] || d.callbackScope || this,
            q = f ? f.length : 0;
          switch (q) {
            case 0:
              x.call(z);
              break;
            case 1:
              x.call(z, f[0]);
              break;
            case 2:
              x.call(z, f[0], f[1]);
              break;
            default:
              x.apply(z, f);
          }
        }),
        (s.eventCallback = function (n, d, x, f) {
          if ((n || '').substr(0, 2) === 'on') {
            var z = this.vars;
            if (arguments.length === 1) return z[n];
            d == null
              ? delete z[n]
              : ((z[n] = d),
                (z[n + 'Params'] =
                  g(x) && x.join('').indexOf('{self}') !== -1
                    ? this._swapSelfInParams(x)
                    : x),
                (z[n + 'Scope'] = f)),
              n === 'onUpdate' && (this._onUpdate = d);
          }
          return this;
        }),
        (s.delay = function (n) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + n - this._delay),
              (this._delay = n),
              this)
            : this._delay;
        }),
        (s.duration = function (n) {
          return arguments.length
            ? ((this._duration = this._totalDuration = n),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                n !== 0 &&
                this.totalTime(this._totalTime * (n / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (s.totalDuration = function (n) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(n) : this._totalDuration
          );
        }),
        (s.time = function (n, d) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(n > this._duration ? this._duration : n, d))
            : this._time;
        }),
        (s.totalTime = function (n, d, x) {
          if ((u || M.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (n < 0 && !x && (n += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var f = this._totalDuration,
                z = this._timeline;
              if (
                (n > f && !x && (n = f),
                (this._startTime =
                  (this._paused ? this._pauseTime : z._time) -
                  (this._reversed ? f - n : n) / this._timeScale),
                z._dirty || this._uncache(!1),
                z._timeline)
              )
                for (; z._timeline; )
                  z._timeline._time !==
                    (z._startTime + z._totalTime) / z._timeScale &&
                    z.totalTime(z._totalTime, !0),
                    (z = z._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== n || this._duration === 0) &&
                (ee.length && Xe(), this.render(n, d, !1), ee.length && Xe());
          }
          return this;
        }),
        (s.progress = s.totalProgress =
          function (n, d) {
            var x = this.duration();
            return arguments.length
              ? this.totalTime(x * n, d)
              : x
              ? this._time / x
              : this.ratio;
          }),
        (s.startTime = function (n) {
          return arguments.length
            ? (n !== this._startTime &&
                ((this._startTime = n),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, n - this._delay)),
              this)
            : this._startTime;
        }),
        (s.endTime = function (n) {
          return (
            this._startTime +
            (n != !1 ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (s.timeScale = function (n) {
          if (!arguments.length) return this._timeScale;
          var d, x;
          for (
            n = n || B,
              this._timeline &&
                this._timeline.smoothChildTiming &&
                ((d = this._pauseTime),
                (x = d || d === 0 ? d : this._timeline.totalTime()),
                (this._startTime =
                  x - ((x - this._startTime) * this._timeScale) / n)),
              this._timeScale = n,
              x = this.timeline;
            x && x.timeline;

          )
            (x._dirty = !0), x.totalDuration(), (x = x.timeline);
          return this;
        }),
        (s.reversed = function (n) {
          return arguments.length
            ? (n != this._reversed &&
                ((this._reversed = n),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0,
                )),
              this)
            : this._reversed;
        }),
        (s.paused = function (n) {
          if (!arguments.length) return this._paused;
          var d = this._timeline,
            x,
            f;
          return (
            n != this._paused &&
              d &&
              (!u && !n && M.wake(),
              (x = d.rawTime()),
              (f = x - this._pauseTime),
              !n &&
                d.smoothChildTiming &&
                ((this._startTime += f), this._uncache(!1)),
              (this._pauseTime = n ? x : null),
              (this._paused = n),
              (this._active = this.isActive()),
              !n &&
                f !== 0 &&
                this._initted &&
                this.duration() &&
                ((x = d.smoothChildTiming
                  ? this._totalTime
                  : (x - this._startTime) / this._timeScale),
                this.render(x, x === this._totalTime, !0))),
            this._gc && !n && this._enabled(!0, !1),
            this
          );
        });
      var le = r('core.SimpleTimeline', function (n) {
        W.call(this, 0, n),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      (s = le.prototype = new W()),
        (s.constructor = le),
        (s.kill()._gc = !1),
        (s._first = s._last = s._recent = null),
        (s._sortChildren = !1),
        (s.add = s.insert =
          function (n, d, x, f) {
            var z, q;
            if (
              ((n._startTime = Number(d || 0) + n._delay),
              n._paused &&
                this !== n._timeline &&
                (n._pauseTime =
                  this.rawTime() - (n._timeline.rawTime() - n._pauseTime)),
              n.timeline && n.timeline._remove(n, !0),
              (n.timeline = n._timeline = this),
              n._gc && n._enabled(!0, !0),
              (z = this._last),
              this._sortChildren)
            )
              for (q = n._startTime; z && z._startTime > q; ) z = z._prev;
            return (
              z
                ? ((n._next = z._next), (z._next = n))
                : ((n._next = this._first), (this._first = n)),
              n._next ? (n._next._prev = n) : (this._last = n),
              (n._prev = z),
              (this._recent = n),
              this._timeline && this._uncache(!0),
              this
            );
          }),
        (s._remove = function (n, d) {
          return (
            n.timeline === this &&
              (d || n._enabled(!1, !0),
              n._prev
                ? (n._prev._next = n._next)
                : this._first === n && (this._first = n._next),
              n._next
                ? (n._next._prev = n._prev)
                : this._last === n && (this._last = n._prev),
              (n._next = n._prev = n.timeline = null),
              n === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (s.render = function (n, d, x) {
          var f = this._first,
            z;
          for (this._totalTime = this._time = this._rawPrevTime = n; f; )
            (z = f._next),
              (f._active || (n >= f._startTime && !f._paused && !f._gc)) &&
                (f._reversed
                  ? f.render(
                      (f._dirty ? f.totalDuration() : f._totalDuration) -
                        (n - f._startTime) * f._timeScale,
                      d,
                      x,
                    )
                  : f.render((n - f._startTime) * f._timeScale, d, x)),
              (f = z);
        }),
        (s.rawTime = function () {
          return u || M.wake(), this._totalTime;
        });
      var Z = r(
          'TweenLite',
          function (n, d, x) {
            if (
              (W.call(this, d, x),
              (this.render = Z.prototype.render),
              n == null)
            )
              throw 'Cannot tween a null target.';
            this.target = n = typeof n != 'string' ? n : Z.selector(n) || n;
            var f =
                n.jquery ||
                (n.length &&
                  n !== w &&
                  n[0] &&
                  (n[0] === w || (n[0].nodeType && n[0].style && !n.nodeType))),
              z = this.vars.overwrite,
              q,
              Q,
              K;
            if (
              ((this._overwrite = z =
                z == null
                  ? me[Z.defaultOverwrite]
                  : typeof z == 'number'
                  ? z >> 0
                  : me[z]),
              (f || n instanceof Array || (n.push && g(n))) &&
                typeof n[0] != 'number')
            )
              for (
                this._targets = K = P(n),
                  this._propLookup = [],
                  this._siblings = [],
                  q = 0;
                q < K.length;
                q++
              ) {
                if (((Q = K[q]), Q)) {
                  if (typeof Q == 'string') {
                    (Q = K[q--] = Z.selector(Q)),
                      typeof Q == 'string' && K.splice(q + 1, 1);
                    continue;
                  } else if (
                    Q.length &&
                    Q !== w &&
                    Q[0] &&
                    (Q[0] === w || (Q[0].nodeType && Q[0].style && !Q.nodeType))
                  ) {
                    K.splice(q--, 1), (this._targets = K = K.concat(P(Q)));
                    continue;
                  }
                } else {
                  K.splice(q--, 1);
                  continue;
                }
                (this._siblings[q] = He(Q, this, !1)),
                  z === 1 &&
                    this._siblings[q].length > 1 &&
                    Ae(Q, this, null, 1, this._siblings[q]);
              }
            else
              (this._propLookup = {}),
                (this._siblings = He(n, this, !1)),
                z === 1 &&
                  this._siblings.length > 1 &&
                  Ae(n, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (d === 0 &&
                this._delay === 0 &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -B), this.render(Math.min(0, -this._delay)));
          },
          !0,
        ),
        fe = function (n) {
          return (
            n &&
            n.length &&
            n !== w &&
            n[0] &&
            (n[0] === w || (n[0].nodeType && n[0].style && !n.nodeType))
          );
        },
        ke = function (n, d) {
          var x = {},
            f;
          for (f in n)
            !Ce[f] &&
              (!(f in d) ||
                f === 'transform' ||
                f === 'x' ||
                f === 'y' ||
                f === 'width' ||
                f === 'height' ||
                f === 'className' ||
                f === 'border') &&
              (!X[f] || (X[f] && X[f]._autoCSS)) &&
              ((x[f] = n[f]), delete n[f]);
          n.css = x;
        };
      (s = Z.prototype = new W()),
        (s.constructor = Z),
        (s.kill()._gc = !1),
        (s.ratio = 0),
        (s._firstPT = s._targets = s._overwrittenProps = s._startAt = null),
        (s._notifyPluginsOfEnabled = s._lazy = !1),
        (Z.version = '2.1.3'),
        (Z.defaultEase = s._ease = new l(null, null, 1, 1)),
        (Z.defaultOverwrite = 'auto'),
        (Z.ticker = M),
        (Z.autoSleep = 120),
        (Z.lagSmoothing = function (n, d) {
          M.lagSmoothing(n, d);
        }),
        (Z.selector =
          w.$ ||
          w.jQuery ||
          function (n) {
            var d = w.$ || w.jQuery;
            return d
              ? ((Z.selector = d), d(n))
              : (O || (O = w.document),
                O
                  ? O.querySelectorAll
                    ? O.querySelectorAll(n)
                    : O.getElementById(n.charAt(0) === '#' ? n.substr(1) : n)
                  : n);
          });
      var ee = [],
        de = {},
        U = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        pe = /[\+-]=-?[\.\d]/,
        Ee = function (n) {
          for (var d = this._firstPT, x = 1e-6, f; d; )
            (f = d.blob
              ? n === 1 && this.end != null
                ? this.end
                : n
                ? this.join('')
                : this.start
              : d.c * n + d.s),
              d.m
                ? (f = d.m.call(
                    this._tween,
                    f,
                    this._target || d.t,
                    this._tween,
                  ))
                : f < x && f > -x && !d.blob && (f = 0),
              d.f ? (d.fp ? d.t[d.p](d.fp, f) : d.t[d.p](f)) : (d.t[d.p] = f),
              (d = d._next);
        },
        Me = function (n) {
          return ((n * 1e3) | 0) / 1e3 + '';
        },
        Je = function (n, d, x, f) {
          var z = [],
            q = 0,
            Q = '',
            K = 0,
            J,
            ue,
            he,
            ce,
            Ie,
            ge,
            Ne;
          for (
            z.start = n,
              z.end = d,
              n = z[0] = n + '',
              d = z[1] = d + '',
              x && (x(z), (n = z[0]), (d = z[1])),
              z.length = 0,
              J = n.match(U) || [],
              ue = d.match(U) || [],
              f &&
                ((f._next = null), (f.blob = 1), (z._firstPT = z._applyPT = f)),
              Ie = ue.length,
              ce = 0;
            ce < Ie;
            ce++
          )
            (Ne = ue[ce]),
              (ge = d.substr(q, d.indexOf(Ne, q) - q)),
              (Q += ge || !ce ? ge : ','),
              (q += ge.length),
              K ? (K = (K + 1) % 5) : ge.substr(-5) === 'rgba(' && (K = 1),
              Ne === J[ce] || J.length <= ce
                ? (Q += Ne)
                : (Q && (z.push(Q), (Q = '')),
                  (he = parseFloat(J[ce])),
                  z.push(he),
                  (z._firstPT = {
                    _next: z._firstPT,
                    t: z,
                    p: z.length - 1,
                    s: he,
                    c:
                      (Ne.charAt(1) === '='
                        ? parseInt(Ne.charAt(0) + '1', 10) *
                          parseFloat(Ne.substr(2))
                        : parseFloat(Ne) - he) || 0,
                    f: 0,
                    m: K && K < 4 ? Math.round : Me,
                  })),
              (q += Ne.length);
          return (
            (Q += d.substr(q)),
            Q && z.push(Q),
            (z.setRatio = Ee),
            pe.test(d) && (z.end = null),
            z
          );
        },
        at = function (n, d, x, f, z, q, Q, K, J) {
          typeof f == 'function' && (f = f(J || 0, n));
          var ue = typeof n[d],
            he =
              ue !== 'function'
                ? ''
                : d.indexOf('set') ||
                  typeof n['get' + d.substr(3)] != 'function'
                ? d
                : 'get' + d.substr(3),
            ce = x !== 'get' ? x : he ? (Q ? n[he](Q) : n[he]()) : n[d],
            Ie = typeof f == 'string' && f.charAt(1) === '=',
            ge = {
              t: n,
              p: d,
              s: ce,
              f: ue === 'function',
              pg: 0,
              n: z || d,
              m: q ? (typeof q == 'function' ? q : Math.round) : 0,
              pr: 0,
              c: Ie
                ? parseInt(f.charAt(0) + '1', 10) * parseFloat(f.substr(2))
                : parseFloat(f) - ce || 0,
            },
            Ne;
          if (
            ((typeof ce != 'number' || (typeof f != 'number' && !Ie)) &&
              (Q ||
              isNaN(ce) ||
              (!Ie && isNaN(f)) ||
              typeof ce == 'boolean' ||
              typeof f == 'boolean'
                ? ((ge.fp = Q),
                  (Ne = Je(
                    ce,
                    Ie
                      ? parseFloat(ge.s) +
                          ge.c +
                          (ge.s + '').replace(/[0-9\-\.]/g, '')
                      : f,
                    K || Z.defaultStringFilter,
                    ge,
                  )),
                  (ge = {
                    t: Ne,
                    p: 'setRatio',
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: z || d,
                    pr: 0,
                    m: 0,
                  }))
                : ((ge.s = parseFloat(ce)),
                  Ie || (ge.c = parseFloat(f) - ge.s || 0))),
            ge.c)
          )
            return (
              (ge._next = this._firstPT) && (ge._next._prev = ge),
              (this._firstPT = ge),
              ge
            );
        },
        ot = (Z._internals = {
          isArray: g,
          isSelector: fe,
          lazyTweens: ee,
          blobDif: Je,
        }),
        X = (Z._plugins = {}),
        te = (ot.tweenLookup = {}),
        xe = 0,
        Ce = (ot.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
          id: 1,
          yoyoEase: 1,
          stagger: 1,
        }),
        me = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        be = (W._rootFramesTimeline = new le()),
        De = (W._rootTimeline = new le()),
        We = 30,
        Xe = (ot.lazyRender = function () {
          var n = ee.length,
            d,
            x;
          for (de = {}, d = 0; d < n; d++)
            (x = ee[d]),
              x &&
                x._lazy !== !1 &&
                (x.render(x._lazy[0], x._lazy[1], !0), (x._lazy = !1));
          ee.length = 0;
        });
      (De._startTime = M.time),
        (be._startTime = M.frame),
        (De._active = be._active = !0),
        setTimeout(Xe, 1),
        (W._updateRoot = Z.render =
          function () {
            var n, d, x;
            if (
              (ee.length && Xe(),
              De.render((M.time - De._startTime) * De._timeScale, !1, !1),
              be.render((M.frame - be._startTime) * be._timeScale, !1, !1),
              ee.length && Xe(),
              M.frame >= We)
            ) {
              We = M.frame + (parseInt(Z.autoSleep, 10) || 120);
              for (x in te) {
                for (d = te[x].tweens, n = d.length; --n > -1; )
                  d[n]._gc && d.splice(n, 1);
                d.length === 0 && delete te[x];
              }
              if (
                ((x = De._first),
                (!x || x._paused) &&
                  Z.autoSleep &&
                  !be._first &&
                  M._listeners.tick.length === 1)
              ) {
                for (; x && x._paused; ) x = x._next;
                x || M.sleep();
              }
            }
          }),
        M.addEventListener('tick', W._updateRoot);
      var He = function (n, d, x) {
          var f = n._gsTweenID,
            z,
            q;
          if (
            (te[f || (n._gsTweenID = f = 't' + xe++)] ||
              (te[f] = { target: n, tweens: [] }),
            d && ((z = te[f].tweens), (z[(q = z.length)] = d), x))
          )
            for (; --q > -1; ) z[q] === d && z.splice(q, 1);
          return te[f].tweens;
        },
        Ve = function (n, d, x, f) {
          var z = n.vars.onOverwrite,
            q,
            Q;
          return (
            z && (q = z(n, d, x, f)),
            (z = Z.onOverwrite),
            z && (Q = z(n, d, x, f)),
            q !== !1 && Q !== !1
          );
        },
        Ae = function (n, d, x, f, z) {
          var q, Q, K, J;
          if (f === 1 || f >= 4) {
            for (J = z.length, q = 0; q < J; q++)
              if ((K = z[q]) !== d) K._gc || (K._kill(null, n, d) && (Q = !0));
              else if (f === 5) break;
            return Q;
          }
          var ue = d._startTime + B,
            he = [],
            ce = 0,
            Ie = d._duration === 0,
            ge;
          for (q = z.length; --q > -1; )
            (K = z[q]) === d ||
              K._gc ||
              K._paused ||
              (K._timeline !== d._timeline
                ? ((ge = ge || et(d, 0, Ie)),
                  et(K, ge, Ie) === 0 && (he[ce++] = K))
                : K._startTime <= ue &&
                  K._startTime + K.totalDuration() / K._timeScale > ue &&
                  (((Ie || !K._initted) && ue - K._startTime <= B * 2) ||
                    (he[ce++] = K)));
          for (q = ce; --q > -1; )
            if (
              ((K = he[q]),
              (J = K._firstPT),
              f === 2 && K._kill(x, n, d) && (Q = !0),
              f !== 2 || (!K._firstPT && K._initted && J))
            ) {
              if (f !== 2 && !Ve(K, d)) continue;
              K._enabled(!1, !1) && (Q = !0);
            }
          return Q;
        },
        et = function (n, d, x) {
          for (
            var f = n._timeline, z = f._timeScale, q = n._startTime;
            f._timeline;

          ) {
            if (((q += f._startTime), (z *= f._timeScale), f._paused))
              return -100;
            f = f._timeline;
          }
          return (
            (q /= z),
            q > d
              ? q - d
              : (x && q === d) || (!n._initted && q - d < 2 * B)
              ? B
              : (q += n.totalDuration() / n._timeScale / z) > d + B
              ? 0
              : q - d - B
          );
        };
      (s._init = function () {
        var n = this.vars,
          d = this._overwrittenProps,
          x = this._duration,
          f = !!n.immediateRender,
          z = n.ease,
          q = this._startAt,
          Q,
          K,
          J,
          ue,
          he,
          ce;
        if (n.startAt) {
          q && (q.render(-1, !0), q.kill()), (he = {});
          for (ue in n.startAt) he[ue] = n.startAt[ue];
          if (
            ((he.data = 'isStart'),
            (he.overwrite = !1),
            (he.immediateRender = !0),
            (he.lazy = f && n.lazy !== !1),
            (he.startAt = he.delay = null),
            (he.onUpdate = n.onUpdate),
            (he.onUpdateParams = n.onUpdateParams),
            (he.onUpdateScope = n.onUpdateScope || n.callbackScope || this),
            (this._startAt = Z.to(this.target || {}, 0, he)),
            f)
          ) {
            if (this._time > 0) this._startAt = null;
            else if (x !== 0) return;
          }
        } else if (n.runBackwards && x !== 0)
          if (q) q.render(-1, !0), q.kill(), (this._startAt = null);
          else {
            this._time !== 0 && (f = !1), (J = {});
            for (ue in n) (!Ce[ue] || ue === 'autoCSS') && (J[ue] = n[ue]);
            if (
              ((J.overwrite = 0),
              (J.data = 'isFromStart'),
              (J.lazy = f && n.lazy !== !1),
              (J.immediateRender = f),
              (this._startAt = Z.to(this.target, 0, J)),
              !f)
            )
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
            else if (this._time === 0) return;
          }
        if (
          ((this._ease = z =
            z
              ? z instanceof l
                ? z
                : typeof z == 'function'
                ? new l(z, n.easeParams)
                : D[z] || Z.defaultEase
              : Z.defaultEase),
          n.easeParams instanceof Array &&
            z.config &&
            (this._ease = z.config.apply(z, n.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (ce = this._targets.length, Q = 0; Q < ce; Q++)
            this._initProps(
              this._targets[Q],
              (this._propLookup[Q] = {}),
              this._siblings[Q],
              d ? d[Q] : null,
              Q,
            ) && (K = !0);
        else
          K = this._initProps(
            this.target,
            this._propLookup,
            this._siblings,
            d,
            0,
          );
        if (
          (K && Z._onPluginEvent('_onInitAllProps', this),
          d &&
            (this._firstPT ||
              (typeof this.target != 'function' && this._enabled(!1, !1))),
          n.runBackwards)
        )
          for (J = this._firstPT; J; )
            (J.s += J.c), (J.c = -J.c), (J = J._next);
        (this._onUpdate = n.onUpdate), (this._initted = !0);
      }),
        (s._initProps = function (n, d, x, f, z) {
          var q, Q, K, J, ue, he;
          if (n == null) return !1;
          de[n._gsTweenID] && Xe(),
            this.vars.css ||
              (n.style &&
                n !== w &&
                n.nodeType &&
                X.css &&
                this.vars.autoCSS !== !1 &&
                ke(this.vars, n));
          for (q in this.vars)
            if (((he = this.vars[q]), Ce[q]))
              he &&
                (he instanceof Array || (he.push && g(he))) &&
                he.join('').indexOf('{self}') !== -1 &&
                (this.vars[q] = he = this._swapSelfInParams(he, this));
            else if (
              X[q] &&
              (J = new X[q]())._onInitTween(n, this.vars[q], this, z)
            ) {
              for (
                this._firstPT = ue =
                  {
                    _next: this._firstPT,
                    t: J,
                    p: 'setRatio',
                    s: 0,
                    c: 1,
                    f: 1,
                    n: q,
                    pg: 1,
                    pr: J._priority,
                    m: 0,
                  },
                  Q = J._overwriteProps.length;
                --Q > -1;

              )
                d[J._overwriteProps[Q]] = this._firstPT;
              (J._priority || J._onInitAllProps) && (K = !0),
                (J._onDisable || J._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0),
                ue._next && (ue._next._prev = ue);
            } else
              d[q] = at.call(
                this,
                n,
                q,
                'get',
                he,
                q,
                0,
                null,
                this.vars.stringFilter,
                z,
              );
          return f && this._kill(f, n)
            ? this._initProps(n, d, x, f, z)
            : this._overwrite > 1 &&
              this._firstPT &&
              x.length > 1 &&
              Ae(n, this, d, this._overwrite, x)
            ? (this._kill(d, n), this._initProps(n, d, x, f, z))
            : (this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (de[n._gsTweenID] = !0),
              K);
        }),
        (s.render = function (n, d, x) {
          var f = this,
            z = f._time,
            q = f._duration,
            Q = f._rawPrevTime,
            K,
            J,
            ue,
            he;
          if (n >= q - B && n >= 0)
            (f._totalTime = f._time = q),
              (f.ratio = f._ease._calcEnd ? f._ease.getRatio(1) : 1),
              f._reversed ||
                ((K = !0),
                (J = 'onComplete'),
                (x = x || f._timeline.autoRemoveChildren)),
              q === 0 &&
                (f._initted || !f.vars.lazy || x) &&
                (f._startTime === f._timeline._duration && (n = 0),
                (Q < 0 ||
                  (n <= 0 && n >= -B) ||
                  (Q === B && f.data !== 'isPause')) &&
                  Q !== n &&
                  ((x = !0), Q > B && (J = 'onReverseComplete')),
                (f._rawPrevTime = he = !d || n || Q === n ? n : B));
          else if (n < B)
            (f._totalTime = f._time = 0),
              (f.ratio = f._ease._calcEnd ? f._ease.getRatio(0) : 0),
              (z !== 0 || (q === 0 && Q > 0)) &&
                ((J = 'onReverseComplete'), (K = f._reversed)),
              n > -B
                ? (n = 0)
                : n < 0 &&
                  ((f._active = !1),
                  q === 0 &&
                    (f._initted || !f.vars.lazy || x) &&
                    (Q >= 0 && !(Q === B && f.data === 'isPause') && (x = !0),
                    (f._rawPrevTime = he = !d || n || Q === n ? n : B))),
              (!f._initted || (f._startAt && f._startAt.progress())) &&
                (x = !0);
          else if (((f._totalTime = f._time = n), f._easeType)) {
            var ce = n / q,
              Ie = f._easeType,
              ge = f._easePower;
            (Ie === 1 || (Ie === 3 && ce >= 0.5)) && (ce = 1 - ce),
              Ie === 3 && (ce *= 2),
              ge === 1
                ? (ce *= ce)
                : ge === 2
                ? (ce *= ce * ce)
                : ge === 3
                ? (ce *= ce * ce * ce)
                : ge === 4 && (ce *= ce * ce * ce * ce),
              (f.ratio =
                Ie === 1
                  ? 1 - ce
                  : Ie === 2
                  ? ce
                  : n / q < 0.5
                  ? ce / 2
                  : 1 - ce / 2);
          } else f.ratio = f._ease.getRatio(n / q);
          if (!(f._time === z && !x)) {
            if (!f._initted) {
              if ((f._init(), !f._initted || f._gc)) return;
              if (
                !x &&
                f._firstPT &&
                ((f.vars.lazy !== !1 && f._duration) ||
                  (f.vars.lazy && !f._duration))
              ) {
                (f._time = f._totalTime = z),
                  (f._rawPrevTime = Q),
                  ee.push(f),
                  (f._lazy = [n, d]);
                return;
              }
              f._time && !K
                ? (f.ratio = f._ease.getRatio(f._time / q))
                : K &&
                  f._ease._calcEnd &&
                  (f.ratio = f._ease.getRatio(f._time === 0 ? 0 : 1));
            }
            for (
              f._lazy !== !1 && (f._lazy = !1),
                f._active ||
                  (!f._paused && f._time !== z && n >= 0 && (f._active = !0)),
                z === 0 &&
                  (f._startAt &&
                    (n >= 0
                      ? f._startAt.render(n, !0, x)
                      : J || (J = '_dummyGS')),
                  f.vars.onStart &&
                    (f._time !== 0 || q === 0) &&
                    (d || f._callback('onStart'))),
                ue = f._firstPT;
              ue;

            )
              ue.f
                ? ue.t[ue.p](ue.c * f.ratio + ue.s)
                : (ue.t[ue.p] = ue.c * f.ratio + ue.s),
                (ue = ue._next);
            f._onUpdate &&
              (n < 0 &&
                f._startAt &&
                n !== -1e-4 &&
                f._startAt.render(n, !0, x),
              d || ((f._time !== z || K || x) && f._callback('onUpdate'))),
              J &&
                (!f._gc || x) &&
                (n < 0 &&
                  f._startAt &&
                  !f._onUpdate &&
                  n !== -1e-4 &&
                  f._startAt.render(n, !0, x),
                K &&
                  (f._timeline.autoRemoveChildren && f._enabled(!1, !1),
                  (f._active = !1)),
                !d && f.vars[J] && f._callback(J),
                q === 0 &&
                  f._rawPrevTime === B &&
                  he !== B &&
                  (f._rawPrevTime = 0));
          }
        }),
        (s._kill = function (n, d, x) {
          if (
            (n === 'all' && (n = null),
            n == null && (d == null || d === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          d =
            typeof d != 'string'
              ? d || this._targets || this.target
              : Z.selector(d) || d;
          var f =
              x &&
              this._time &&
              x._startTime === this._startTime &&
              this._timeline === x._timeline,
            z = this._firstPT,
            q,
            Q,
            K,
            J,
            ue,
            he,
            ce,
            Ie,
            ge;
          if ((g(d) || fe(d)) && typeof d[0] != 'number')
            for (q = d.length; --q > -1; ) this._kill(n, d[q], x) && (he = !0);
          else {
            if (this._targets) {
              for (q = this._targets.length; --q > -1; )
                if (d === this._targets[q]) {
                  (ue = this._propLookup[q] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (Q = this._overwrittenProps[q] =
                      n ? this._overwrittenProps[q] || {} : 'all');
                  break;
                }
            } else {
              if (d !== this.target) return !1;
              (ue = this._propLookup),
                (Q = this._overwrittenProps =
                  n ? this._overwrittenProps || {} : 'all');
            }
            if (ue) {
              if (
                ((ce = n || ue),
                (Ie =
                  n !== Q &&
                  Q !== 'all' &&
                  n !== ue &&
                  (typeof n != 'object' || !n._tempKill)),
                x && (Z.onOverwrite || this.vars.onOverwrite))
              ) {
                for (K in ce) ue[K] && (ge || (ge = []), ge.push(K));
                if ((ge || !n) && !Ve(this, x, d, ge)) return !1;
              }
              for (K in ce)
                (J = ue[K]) &&
                  (f && (J.f ? J.t[J.p](J.s) : (J.t[J.p] = J.s), (he = !0)),
                  J.pg && J.t._kill(ce) && (he = !0),
                  (!J.pg || J.t._overwriteProps.length === 0) &&
                    (J._prev
                      ? (J._prev._next = J._next)
                      : J === this._firstPT && (this._firstPT = J._next),
                    J._next && (J._next._prev = J._prev),
                    (J._next = J._prev = null)),
                  delete ue[K]),
                  Ie && (Q[K] = 1);
              !this._firstPT && this._initted && z && this._enabled(!1, !1);
            }
          }
          return he;
        }),
        (s.invalidate = function () {
          this._notifyPluginsOfEnabled && Z._onPluginEvent('_onDisable', this);
          var n = this._time;
          return (
            (this._firstPT =
              this._overwrittenProps =
              this._startAt =
              this._onUpdate =
                null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            W.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -B), this.render(n, !1, this.vars.lazy !== !1)),
            this
          );
        }),
        (s._enabled = function (n, d) {
          if ((u || M.wake(), n && this._gc)) {
            var x = this._targets,
              f;
            if (x)
              for (f = x.length; --f > -1; )
                this._siblings[f] = He(x[f], this, !0);
            else this._siblings = He(this.target, this, !0);
          }
          return (
            W.prototype._enabled.call(this, n, d),
            this._notifyPluginsOfEnabled && this._firstPT
              ? Z._onPluginEvent(n ? '_onEnable' : '_onDisable', this)
              : !1
          );
        }),
        (Z.to = function (n, d, x) {
          return new Z(n, d, x);
        }),
        (Z.from = function (n, d, x) {
          return (
            (x.runBackwards = !0),
            (x.immediateRender = x.immediateRender != !1),
            new Z(n, d, x)
          );
        }),
        (Z.fromTo = function (n, d, x, f) {
          return (
            (f.startAt = x),
            (f.immediateRender =
              f.immediateRender != !1 && x.immediateRender != !1),
            new Z(n, d, f)
          );
        }),
        (Z.delayedCall = function (n, d, x, f, z) {
          return new Z(d, 0, {
            delay: n,
            onComplete: d,
            onCompleteParams: x,
            callbackScope: f,
            onReverseComplete: d,
            onReverseCompleteParams: x,
            immediateRender: !1,
            lazy: !1,
            useFrames: z,
            overwrite: 0,
          });
        }),
        (Z.set = function (n, d) {
          return new Z(n, 0, d);
        }),
        (Z.getTweensOf = function (n, d) {
          if (n == null) return [];
          n = typeof n != 'string' ? n : Z.selector(n) || n;
          var x, f, z, q;
          if ((g(n) || fe(n)) && typeof n[0] != 'number') {
            for (x = n.length, f = []; --x > -1; )
              f = f.concat(Z.getTweensOf(n[x], d));
            for (x = f.length; --x > -1; )
              for (q = f[x], z = x; --z > -1; ) q === f[z] && f.splice(x, 1);
          } else if (n._gsTweenID)
            for (f = He(n).concat(), x = f.length; --x > -1; )
              (f[x]._gc || (d && !f[x].isActive())) && f.splice(x, 1);
          return f || [];
        }),
        (Z.killTweensOf = Z.killDelayedCallsTo =
          function (n, d, x) {
            typeof d == 'object' && ((x = d), (d = !1));
            for (var f = Z.getTweensOf(n, d), z = f.length; --z > -1; )
              f[z]._kill(x, n);
          });
      var nt = r(
        'plugins.TweenPlugin',
        function (n, d) {
          (this._overwriteProps = (n || '').split(',')),
            (this._propName = this._overwriteProps[0]),
            (this._priority = d || 0),
            (this._super = nt.prototype);
        },
        !0,
      );
      if (
        ((s = nt.prototype),
        (nt.version = '1.19.0'),
        (nt.API = 2),
        (s._firstPT = null),
        (s._addTween = at),
        (s.setRatio = Ee),
        (s._kill = function (n) {
          var d = this._overwriteProps,
            x = this._firstPT,
            f;
          if (n[this._propName] != null) this._overwriteProps = [];
          else for (f = d.length; --f > -1; ) n[d[f]] != null && d.splice(f, 1);
          for (; x; )
            n[x.n] != null &&
              (x._next && (x._next._prev = x._prev),
              x._prev
                ? ((x._prev._next = x._next), (x._prev = null))
                : this._firstPT === x && (this._firstPT = x._next)),
              (x = x._next);
          return !1;
        }),
        (s._mod = s._roundProps =
          function (n) {
            for (var d = this._firstPT, x; d; )
              (x =
                n[this._propName] ||
                (d.n != null && n[d.n.split(this._propName + '_').join('')])),
                x &&
                  typeof x == 'function' &&
                  (d.f === 2 ? (d.t._applyPT.m = x) : (d.m = x)),
                (d = d._next);
          }),
        (Z._onPluginEvent = function (n, d) {
          var x = d._firstPT,
            f,
            z,
            q,
            Q,
            K;
          if (n === '_onInitAllProps') {
            for (; x; ) {
              for (K = x._next, z = q; z && z.pr > x.pr; ) z = z._next;
              (x._prev = z ? z._prev : Q) ? (x._prev._next = x) : (q = x),
                (x._next = z) ? (z._prev = x) : (Q = x),
                (x = K);
            }
            x = d._firstPT = q;
          }
          for (; x; )
            x.pg && typeof x.t[n] == 'function' && x.t[n]() && (f = !0),
              (x = x._next);
          return f;
        }),
        (nt.activate = function (n) {
          for (var d = n.length; --d > -1; )
            n[d].API === nt.API && (X[new n[d]()._propName] = n[d]);
          return !0;
        }),
        (e.plugin = function (n) {
          if (!n || !n.propName || !n.init || !n.API)
            throw 'illegal plugin definition.';
          var d = n.propName,
            x = n.priority || 0,
            f = n.overwriteProps,
            z = {
              init: '_onInitTween',
              set: 'setRatio',
              kill: '_kill',
              round: '_mod',
              mod: '_mod',
              initAll: '_onInitAllProps',
            },
            q = r(
              'plugins.' + d.charAt(0).toUpperCase() + d.substr(1) + 'Plugin',
              function () {
                nt.call(this, d, x), (this._overwriteProps = f || []);
              },
              n.global === !0,
            ),
            Q = (q.prototype = new nt(d)),
            K;
          (Q.constructor = q), (q.API = n.API);
          for (K in z) typeof n[K] == 'function' && (Q[z[K]] = n[K]);
          return (q.version = n.version), nt.activate([q]), q;
        }),
        (S = w._gsQueue),
        S)
      ) {
        for (R = 0; R < S.length; R++) S[R]();
        for (s in T)
          T[s].func ||
            w.console.log('GSAP encountered missing dependency: ' + s);
      }
      return (u = !1), Z;
    })(Ge),
    Ue = Ge.GreenSockGlobals,
    Wt = Ue.com.greensock,
    wt = Wt.core.SimpleTimeline,
    it = Wt.core.Animation,
    rt = Ue.Ease;
  Ue.Linear;
  var vi = Ue.Power1,
    Mt = Ue.Power2;
  Ue.Power3;
  Ue.Power4;
  var It = Ue.TweenPlugin;
  Wt.events.EventDispatcher;
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   */ Ge._gsDefine(
    'TimelineLite',
    ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
    function () {
      var w = function (e) {
          wt.call(this, e);
          var r = this,
            y = r.vars,
            l,
            D;
          (r._labels = {}),
            (r.autoRemoveChildren = !!y.autoRemoveChildren),
            (r.smoothChildTiming = !!y.smoothChildTiming),
            (r._sortChildren = !0),
            (r._onUpdate = y.onUpdate);
          for (D in y)
            (l = y[D]),
              B(l) &&
                l.join('').indexOf('{self}') !== -1 &&
                (y[D] = r._swapSelfInParams(l));
          B(y.tweens) && r.add(y.tweens, 0, y.align, y.stagger);
        },
        O = 1e-8,
        N = Re._internals,
        L = (w._internals = {}),
        C = N.isSelector,
        B = N.isArray,
        P = N.lazyTweens,
        o = N.lazyRender,
        g = Ge._gsDefine.globals,
        S = function (e) {
          var r = {},
            y;
          for (y in e) r[y] = e[y];
          return r;
        },
        R = function (e, r, y) {
          var l = e.cycle,
            D,
            m;
          for (D in l)
            (m = l[D]),
              (e[D] = typeof m == 'function' ? m(y, r[y], r) : m[y % m.length]);
          delete e.cycle;
        },
        s = (L.pauseCallback = function () {}),
        M = function (e) {
          var r = [],
            y = e.length,
            l;
          for (l = 0; l !== y; r.push(e[l++]));
          return r;
        },
        u = function (e, r, y, l) {
          var D = 'immediateRender';
          return D in r || (r[D] = !((y && y[D] === !1) || l)), r;
        },
        T = function (e) {
          if (typeof e == 'function') return e;
          var r = typeof e == 'object' ? e : { each: e },
            y = r.ease,
            l = r.from || 0,
            D = r.base || 0,
            m = {},
            $ = isNaN(l),
            I = r.axis,
            Y = { center: 0.5, end: 1 }[l] || 0;
          return function (k, re, W) {
            var ie = (W || r).length,
              le = m[ie],
              Z,
              fe,
              ke,
              ee,
              de,
              U,
              pe,
              Ee,
              Me;
            if (!le) {
              if (
                ((Me = r.grid === 'auto' ? 0 : (r.grid || [1 / 0])[0]), !Me)
              ) {
                for (
                  pe = -1 / 0;
                  pe < (pe = W[Me++].getBoundingClientRect().left) && Me < ie;

                );
                Me--;
              }
              for (
                le = m[ie] = [],
                  Z = $ ? Math.min(Me, ie) * Y - 0.5 : l % Me,
                  fe = $ ? (ie * Y) / Me - 0.5 : (l / Me) | 0,
                  pe = 0,
                  Ee = 1 / 0,
                  U = 0;
                U < ie;
                U++
              )
                (ke = (U % Me) - Z),
                  (ee = fe - ((U / Me) | 0)),
                  (le[U] = de =
                    I
                      ? Math.abs(I === 'y' ? ee : ke)
                      : Math.sqrt(ke * ke + ee * ee)),
                  de > pe && (pe = de),
                  de < Ee && (Ee = de);
              (le.max = pe - Ee),
                (le.min = Ee),
                (le.v = ie =
                  r.amount ||
                  r.each *
                    (Me > ie
                      ? ie - 1
                      : I
                      ? I === 'y'
                        ? ie / Me
                        : Me
                      : Math.max(Me, ie / Me)) ||
                  0),
                (le.b = ie < 0 ? D - ie : D);
            }
            return (
              (ie = (le[k] - le.min) / le.max),
              le.b + (y ? y.getRatio(ie) : ie) * le.v
            );
          };
        },
        c = (w.prototype = new wt());
      return (
        (w.version = '2.1.3'),
        (w.distribute = T),
        (c.constructor = w),
        (c.kill()._gc = c._forcingPlayhead = c._hasPause = !1),
        (c.to = function (e, r, y, l) {
          var D = (y.repeat && g.TweenMax) || Re;
          return r ? this.add(new D(e, r, y), l) : this.set(e, y, l);
        }),
        (c.from = function (e, r, y, l) {
          return this.add(
            ((y.repeat && g.TweenMax) || Re).from(e, r, u(this, y)),
            l,
          );
        }),
        (c.fromTo = function (e, r, y, l, D) {
          var m = (l.repeat && g.TweenMax) || Re;
          return (
            (l = u(this, l, y)),
            r ? this.add(m.fromTo(e, r, y, l), D) : this.set(e, l, D)
          );
        }),
        (c.staggerTo = function (e, r, y, l, D, m, $, I) {
          var Y = new w({
              onComplete: m,
              onCompleteParams: $,
              callbackScope: I,
              smoothChildTiming: this.smoothChildTiming,
            }),
            k = T(y.stagger || l),
            re = y.startAt,
            W = y.cycle,
            ie,
            le;
          for (
            typeof e == 'string' && (e = Re.selector(e) || e),
              e = e || [],
              C(e) && (e = M(e)),
              le = 0;
            le < e.length;
            le++
          )
            (ie = S(y)),
              re && ((ie.startAt = S(re)), re.cycle && R(ie.startAt, e, le)),
              W &&
                (R(ie, e, le),
                ie.duration != null && ((r = ie.duration), delete ie.duration)),
              Y.to(e[le], r, ie, k(le, e[le], e));
          return this.add(Y, D);
        }),
        (c.staggerFrom = function (e, r, y, l, D, m, $, I) {
          return (
            (y.runBackwards = !0),
            this.staggerTo(e, r, u(this, y), l, D, m, $, I)
          );
        }),
        (c.staggerFromTo = function (e, r, y, l, D, m, $, I, Y) {
          return (
            (l.startAt = y), this.staggerTo(e, r, u(this, l, y), D, m, $, I, Y)
          );
        }),
        (c.call = function (e, r, y, l) {
          return this.add(Re.delayedCall(0, e, r, y), l);
        }),
        (c.set = function (e, r, y) {
          return this.add(new Re(e, 0, u(this, r, null, !0)), y);
        }),
        (w.exportRoot = function (e, r) {
          (e = e || {}),
            e.smoothChildTiming == null && (e.smoothChildTiming = !0);
          var y = new w(e),
            l = y._timeline,
            D,
            m,
            $,
            I;
          for (
            r == null && (r = !0),
              l._remove(y, !0),
              y._startTime = 0,
              y._rawPrevTime = y._time = y._totalTime = l._time,
              $ = l._first;
            $;

          )
            (I = $._next),
              (!r || !($ instanceof Re && $.target === $.vars.onComplete)) &&
                ((m = $._startTime - $._delay), m < 0 && (D = 1), y.add($, m)),
              ($ = I);
          return l.add(y, 0), D && y.totalDuration(), y;
        }),
        (c.add = function (e, r, y, l) {
          var D = this,
            m,
            $,
            I,
            Y,
            k,
            re;
          if (
            (typeof r != 'number' && (r = D._parseTimeOrLabel(r, 0, !0, e)),
            !(e instanceof it))
          )
            if (e instanceof Array || (e && e.push && B(e))) {
              for (
                y = y || 'normal', l = l || 0, m = r, $ = e.length, I = 0;
                I < $;
                I++
              )
                B((Y = e[I])) && (Y = new w({ tweens: Y })),
                  D.add(Y, m),
                  typeof Y != 'string' &&
                    typeof Y != 'function' &&
                    (y === 'sequence'
                      ? (m = Y._startTime + Y.totalDuration() / Y._timeScale)
                      : y === 'start' && (Y._startTime -= Y.delay())),
                  (m += l);
              return D._uncache(!0);
            } else {
              if (typeof e == 'string') return D.addLabel(e, r);
              if (typeof e == 'function') e = Re.delayedCall(0, e);
              else
                throw (
                  'Cannot add ' +
                  e +
                  ' into the timeline; it is not a tween, timeline, function, or string.'
                );
            }
          if (
            (wt.prototype.add.call(D, e, r),
            (e._time || (!e._duration && e._initted)) &&
              ((m = (D.rawTime() - e._startTime) * e._timeScale),
              (!e._duration ||
                Math.abs(Math.max(0, Math.min(e.totalDuration(), m))) -
                  e._totalTime >
                  1e-5) &&
                e.render(m, !1, !1)),
            (D._gc || D._time === D._duration) &&
              !D._paused &&
              D._duration < D.duration())
          )
            for (k = D, re = k.rawTime() > e._startTime; k._timeline; )
              re && k._timeline.smoothChildTiming
                ? k.totalTime(k._totalTime, !0)
                : k._gc && k._enabled(!0, !1),
                (k = k._timeline);
          return D;
        }),
        (c.remove = function (e) {
          if (e instanceof it) {
            this._remove(e, !1);
            var r = (e._timeline = e.vars.useFrames
              ? it._rootFramesTimeline
              : it._rootTimeline);
            return (
              (e._startTime =
                (e._paused ? e._pauseTime : r._time) -
                (e._reversed
                  ? e.totalDuration() - e._totalTime
                  : e._totalTime) /
                  e._timeScale),
              this
            );
          } else if (e instanceof Array || (e && e.push && B(e))) {
            for (var y = e.length; --y > -1; ) this.remove(e[y]);
            return this;
          } else if (typeof e == 'string') return this.removeLabel(e);
          return this.kill(null, e);
        }),
        (c._remove = function (e, r) {
          wt.prototype._remove.call(this, e, r);
          var y = this._last;
          return (
            y
              ? this._time > this.duration() &&
                ((this._time = this._duration),
                (this._totalTime = this._totalDuration))
              : (this._time =
                  this._totalTime =
                  this._duration =
                  this._totalDuration =
                    0),
            this
          );
        }),
        (c.append = function (e, r) {
          return this.add(e, this._parseTimeOrLabel(null, r, !0, e));
        }),
        (c.insert = c.insertMultiple =
          function (e, r, y, l) {
            return this.add(e, r || 0, y, l);
          }),
        (c.appendMultiple = function (e, r, y, l) {
          return this.add(e, this._parseTimeOrLabel(null, r, !0, e), y, l);
        }),
        (c.addLabel = function (e, r) {
          return (this._labels[e] = this._parseTimeOrLabel(r)), this;
        }),
        (c.addPause = function (e, r, y, l) {
          var D = Re.delayedCall(0, s, y, l || this);
          return (
            (D.vars.onComplete = D.vars.onReverseComplete = r),
            (D.data = 'isPause'),
            (this._hasPause = !0),
            this.add(D, e)
          );
        }),
        (c.removeLabel = function (e) {
          return delete this._labels[e], this;
        }),
        (c.getLabelTime = function (e) {
          return this._labels[e] != null ? this._labels[e] : -1;
        }),
        (c._parseTimeOrLabel = function (e, r, y, l) {
          var D, m;
          if (l instanceof it && l.timeline === this) this.remove(l);
          else if (l && (l instanceof Array || (l.push && B(l))))
            for (m = l.length; --m > -1; )
              l[m] instanceof it && l[m].timeline === this && this.remove(l[m]);
          if (
            ((D =
              typeof e == 'number' && !r
                ? 0
                : this.duration() > 99999999999
                ? this.recent().endTime(!1)
                : this._duration),
            typeof r == 'string')
          )
            return this._parseTimeOrLabel(
              r,
              y && typeof e == 'number' && this._labels[r] == null ? e - D : 0,
              y,
            );
          if (
            ((r = r || 0),
            typeof e == 'string' && (isNaN(e) || this._labels[e] != null))
          ) {
            if (((m = e.indexOf('=')), m === -1))
              return this._labels[e] == null
                ? y
                  ? (this._labels[e] = D + r)
                  : r
                : this._labels[e] + r;
            (r = parseInt(e.charAt(m - 1) + '1', 10) * Number(e.substr(m + 1))),
              (e =
                m > 1 ? this._parseTimeOrLabel(e.substr(0, m - 1), 0, y) : D);
          } else e == null && (e = D);
          return Number(e) + r;
        }),
        (c.seek = function (e, r) {
          return this.totalTime(
            typeof e == 'number' ? e : this._parseTimeOrLabel(e),
            r !== !1,
          );
        }),
        (c.stop = function () {
          return this.paused(!0);
        }),
        (c.gotoAndPlay = function (e, r) {
          return this.play(e, r);
        }),
        (c.gotoAndStop = function (e, r) {
          return this.pause(e, r);
        }),
        (c.render = function (e, r, y) {
          this._gc && this._enabled(!0, !1);
          var l = this,
            D = l._time,
            m = l._dirty ? l.totalDuration() : l._totalDuration,
            $ = l._startTime,
            I = l._timeScale,
            Y = l._paused,
            k,
            re,
            W,
            ie,
            le,
            Z,
            fe,
            ke;
          if (
            (D !== l._time && (e += l._time - D),
            l._hasPause && !l._forcingPlayhead && !r)
          ) {
            if (e > D)
              for (k = l._first; k && k._startTime <= e && !Z; )
                k._duration ||
                  (k.data === 'isPause' &&
                    !k.ratio &&
                    !(k._startTime === 0 && l._rawPrevTime === 0) &&
                    (Z = k)),
                  (k = k._next);
            else
              for (k = l._last; k && k._startTime >= e && !Z; )
                k._duration ||
                  (k.data === 'isPause' && k._rawPrevTime > 0 && (Z = k)),
                  (k = k._prev);
            Z &&
              ((l._time = l._totalTime = e = Z._startTime),
              (ke =
                l._startTime +
                (l._reversed ? l._duration - e : e) / l._timeScale));
          }
          if (e >= m - O && e >= 0)
            (l._totalTime = l._time = m),
              l._reversed ||
                l._hasPausedChild() ||
                ((re = !0),
                (ie = 'onComplete'),
                (le = !!l._timeline.autoRemoveChildren),
                l._duration === 0 &&
                  ((e <= 0 && e >= -O) ||
                    l._rawPrevTime < 0 ||
                    l._rawPrevTime === O) &&
                  l._rawPrevTime !== e &&
                  l._first &&
                  ((le = !0),
                  l._rawPrevTime > O && (ie = 'onReverseComplete'))),
              (l._rawPrevTime =
                l._duration || !r || e || l._rawPrevTime === e ? e : O),
              (e = m + 1e-4);
          else if (e < O)
            if (
              ((l._totalTime = l._time = 0),
              e > -O && (e = 0),
              (D !== 0 ||
                (l._duration === 0 &&
                  l._rawPrevTime !== O &&
                  (l._rawPrevTime > 0 || (e < 0 && l._rawPrevTime >= 0)))) &&
                ((ie = 'onReverseComplete'), (re = l._reversed)),
              e < 0)
            )
              (l._active = !1),
                l._timeline.autoRemoveChildren && l._reversed
                  ? ((le = re = !0), (ie = 'onReverseComplete'))
                  : l._rawPrevTime >= 0 && l._first && (le = !0),
                (l._rawPrevTime = e);
            else {
              if (
                ((l._rawPrevTime =
                  l._duration || !r || e || l._rawPrevTime === e ? e : O),
                e === 0 && re)
              )
                for (k = l._first; k && k._startTime === 0; )
                  k._duration || (re = !1), (k = k._next);
              (e = 0), l._initted || (le = !0);
            }
          else l._totalTime = l._time = l._rawPrevTime = e;
          if (!((l._time === D || !l._first) && !y && !le && !Z)) {
            if (
              (l._initted || (l._initted = !0),
              l._active ||
                (!l._paused && l._time !== D && e > 0 && (l._active = !0)),
              D === 0 &&
                l.vars.onStart &&
                (l._time !== 0 || !l._duration) &&
                (r || l._callback('onStart')),
              (fe = l._time),
              fe >= D)
            )
              for (
                k = l._first;
                k && ((W = k._next), !(fe !== l._time || (l._paused && !Y)));

              )
                (k._active || (k._startTime <= fe && !k._paused && !k._gc)) &&
                  (Z === k && (l.pause(), (l._pauseTime = ke)),
                  k._reversed
                    ? k.render(
                        (k._dirty ? k.totalDuration() : k._totalDuration) -
                          (e - k._startTime) * k._timeScale,
                        r,
                        y,
                      )
                    : k.render((e - k._startTime) * k._timeScale, r, y)),
                  (k = W);
            else
              for (
                k = l._last;
                k && ((W = k._prev), !(fe !== l._time || (l._paused && !Y)));

              ) {
                if (k._active || (k._startTime <= D && !k._paused && !k._gc)) {
                  if (Z === k) {
                    for (Z = k._prev; Z && Z.endTime() > l._time; )
                      Z.render(
                        Z._reversed
                          ? Z.totalDuration() -
                              (e - Z._startTime) * Z._timeScale
                          : (e - Z._startTime) * Z._timeScale,
                        r,
                        y,
                      ),
                        (Z = Z._prev);
                    (Z = null), l.pause(), (l._pauseTime = ke);
                  }
                  k._reversed
                    ? k.render(
                        (k._dirty ? k.totalDuration() : k._totalDuration) -
                          (e - k._startTime) * k._timeScale,
                        r,
                        y,
                      )
                    : k.render((e - k._startTime) * k._timeScale, r, y);
                }
                k = W;
              }
            l._onUpdate && (r || (P.length && o(), l._callback('onUpdate'))),
              ie &&
                (l._gc ||
                  (($ === l._startTime || I !== l._timeScale) &&
                    (l._time === 0 || m >= l.totalDuration()) &&
                    (re &&
                      (P.length && o(),
                      l._timeline.autoRemoveChildren && l._enabled(!1, !1),
                      (l._active = !1)),
                    !r && l.vars[ie] && l._callback(ie))));
          }
        }),
        (c._hasPausedChild = function () {
          for (var e = this._first; e; ) {
            if (e._paused || (e instanceof w && e._hasPausedChild())) return !0;
            e = e._next;
          }
          return !1;
        }),
        (c.getChildren = function (e, r, y, l) {
          l = l || -9999999999;
          for (var D = [], m = this._first, $ = 0; m; )
            m._startTime < l ||
              (m instanceof Re
                ? r !== !1 && (D[$++] = m)
                : (y !== !1 && (D[$++] = m),
                  e !== !1 &&
                    ((D = D.concat(m.getChildren(!0, r, y))), ($ = D.length)))),
              (m = m._next);
          return D;
        }),
        (c.getTweensOf = function (e, r) {
          var y = this._gc,
            l = [],
            D = 0,
            m,
            $;
          for (
            y && this._enabled(!0, !0), m = Re.getTweensOf(e), $ = m.length;
            --$ > -1;

          )
            (m[$].timeline === this || (r && this._contains(m[$]))) &&
              (l[D++] = m[$]);
          return y && this._enabled(!1, !0), l;
        }),
        (c.recent = function () {
          return this._recent;
        }),
        (c._contains = function (e) {
          for (var r = e.timeline; r; ) {
            if (r === this) return !0;
            r = r.timeline;
          }
          return !1;
        }),
        (c.shiftChildren = function (e, r, y) {
          y = y || 0;
          for (var l = this._first, D = this._labels, m; l; )
            l._startTime >= y && (l._startTime += e), (l = l._next);
          if (r) for (m in D) D[m] >= y && (D[m] += e);
          return this._uncache(!0);
        }),
        (c._kill = function (e, r) {
          if (!e && !r) return this._enabled(!1, !1);
          for (
            var y = r ? this.getTweensOf(r) : this.getChildren(!0, !0, !1),
              l = y.length,
              D = !1;
            --l > -1;

          )
            y[l]._kill(e, r) && (D = !0);
          return D;
        }),
        (c.clear = function (e) {
          var r = this.getChildren(!1, !0, !0),
            y = r.length;
          for (this._time = this._totalTime = 0; --y > -1; )
            r[y]._enabled(!1, !1);
          return e !== !1 && (this._labels = {}), this._uncache(!0);
        }),
        (c.invalidate = function () {
          for (var e = this._first; e; ) e.invalidate(), (e = e._next);
          return it.prototype.invalidate.call(this);
        }),
        (c._enabled = function (e, r) {
          if (e === this._gc)
            for (var y = this._first; y; ) y._enabled(e, !0), (y = y._next);
          return wt.prototype._enabled.call(this, e, r);
        }),
        (c.totalTime = function (e, r, y) {
          this._forcingPlayhead = !0;
          var l = it.prototype.totalTime.apply(this, arguments);
          return (this._forcingPlayhead = !1), l;
        }),
        (c.duration = function (e) {
          return arguments.length
            ? (this.duration() !== 0 &&
                e !== 0 &&
                this.timeScale(this._duration / e),
              this)
            : (this._dirty && this.totalDuration(), this._duration);
        }),
        (c.totalDuration = function (e) {
          if (!arguments.length) {
            if (this._dirty) {
              for (
                var r = 0, y = this, l = y._last, D = 999999999999, m, $;
                l;

              )
                (m = l._prev),
                  l._dirty && l.totalDuration(),
                  l._startTime > D &&
                  y._sortChildren &&
                  !l._paused &&
                  !y._calculatingDuration
                    ? ((y._calculatingDuration = 1),
                      y.add(l, l._startTime - l._delay),
                      (y._calculatingDuration = 0))
                    : (D = l._startTime),
                  l._startTime < 0 &&
                    !l._paused &&
                    ((r -= l._startTime),
                    y._timeline.smoothChildTiming &&
                      ((y._startTime += l._startTime / y._timeScale),
                      (y._time -= l._startTime),
                      (y._totalTime -= l._startTime),
                      (y._rawPrevTime -= l._startTime)),
                    y.shiftChildren(-l._startTime, !1, -9999999999),
                    (D = 0)),
                  ($ = l._startTime + l._totalDuration / l._timeScale),
                  $ > r && (r = $),
                  (l = m);
              (y._duration = y._totalDuration = r), (y._dirty = !1);
            }
            return this._totalDuration;
          }
          return e && this.totalDuration()
            ? this.timeScale(this._totalDuration / e)
            : this;
        }),
        (c.paused = function (e) {
          if (e === !1 && this._paused)
            for (var r = this._first; r; )
              r._startTime === this._time &&
                r.data === 'isPause' &&
                (r._rawPrevTime = 0),
                (r = r._next);
          return it.prototype.paused.apply(this, arguments);
        }),
        (c.usesFrames = function () {
          for (var e = this._timeline; e._timeline; ) e = e._timeline;
          return e === it._rootFramesTimeline;
        }),
        (c.rawTime = function (e) {
          return e &&
            (this._paused ||
              (this._repeat && this.time() > 0 && this.totalProgress() < 1))
            ? this._totalTime % (this._duration + this._repeatDelay)
            : this._paused
            ? this._totalTime
            : (this._timeline.rawTime(e) - this._startTime) * this._timeScale;
        }),
        w
      );
    },
    !0,
  );
  var Tt = Ue.TimelineLite;
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   */ Ge._gsDefine(
    'TimelineMax',
    ['TimelineLite', 'TweenLite', 'easing.Ease'],
    function () {
      var w = function (g) {
          Tt.call(this, g),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._cycle = 0),
            (this._yoyo = !!this.vars.yoyo),
            (this._dirty = !0);
        },
        O = 1e-8,
        N = Re._internals,
        L = N.lazyTweens,
        C = N.lazyRender,
        B = Ge._gsDefine.globals,
        P = new rt(null, null, 1, 0),
        o = (w.prototype = new Tt());
      return (
        (o.constructor = w),
        (o.kill()._gc = !1),
        (w.version = '2.1.3'),
        (o.invalidate = function () {
          return (
            (this._yoyo = !!this.vars.yoyo),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            Tt.prototype.invalidate.call(this)
          );
        }),
        (o.addCallback = function (g, S, R, s) {
          return this.add(Re.delayedCall(0, g, R, s), S);
        }),
        (o.removeCallback = function (g, S) {
          if (g)
            if (S == null) this._kill(null, g);
            else
              for (
                var R = this.getTweensOf(g, !1),
                  s = R.length,
                  M = this._parseTimeOrLabel(S);
                --s > -1;

              )
                R[s]._startTime === M && R[s]._enabled(!1, !1);
          return this;
        }),
        (o.removePause = function (g) {
          return this.removeCallback(Tt._internals.pauseCallback, g);
        }),
        (o.tweenTo = function (g, S) {
          S = S || {};
          var R = {
              ease: P,
              useFrames: this.usesFrames(),
              immediateRender: !1,
              lazy: !1,
            },
            s = (S.repeat && B.TweenMax) || Re,
            M,
            u,
            T;
          for (u in S) R[u] = S[u];
          return (
            (R.time = this._parseTimeOrLabel(g)),
            (M =
              Math.abs(Number(R.time) - this._time) / this._timeScale || 0.001),
            (T = new s(this, M, R)),
            (R.onStart = function () {
              T.target.paused(!0),
                T.vars.time !== T.target.time() &&
                  M === T.duration() &&
                  !T.isFromTo &&
                  T.duration(
                    Math.abs(T.vars.time - T.target.time()) /
                      T.target._timeScale,
                  ).render(T.time(), !0, !0),
                S.onStart &&
                  S.onStart.apply(
                    S.onStartScope || S.callbackScope || T,
                    S.onStartParams || [],
                  );
            }),
            T
          );
        }),
        (o.tweenFromTo = function (g, S, R) {
          (R = R || {}),
            (g = this._parseTimeOrLabel(g)),
            (R.startAt = {
              onComplete: this.seek,
              onCompleteParams: [g],
              callbackScope: this,
            }),
            (R.immediateRender = R.immediateRender !== !1);
          var s = this.tweenTo(S, R);
          return (
            (s.isFromTo = 1),
            s.duration(Math.abs(s.vars.time - g) / this._timeScale || 0.001)
          );
        }),
        (o.render = function (g, S, R) {
          this._gc && this._enabled(!0, !1);
          var s = this,
            M = s._time,
            u = s._dirty ? s.totalDuration() : s._totalDuration,
            T = s._duration,
            c = s._totalTime,
            e = s._startTime,
            r = s._timeScale,
            y = s._rawPrevTime,
            l = s._paused,
            D = s._cycle,
            m,
            $,
            I,
            Y,
            k,
            re,
            W,
            ie,
            le;
          if ((M !== s._time && (g += s._time - M), g >= u - O && g >= 0))
            s._locked || ((s._totalTime = u), (s._cycle = s._repeat)),
              s._reversed ||
                s._hasPausedChild() ||
                (($ = !0),
                (Y = 'onComplete'),
                (k = !!s._timeline.autoRemoveChildren),
                s._duration === 0 &&
                  ((g <= 0 && g >= -O) || y < 0 || y === O) &&
                  y !== g &&
                  s._first &&
                  ((k = !0), y > O && (Y = 'onReverseComplete'))),
              (s._rawPrevTime =
                s._duration || !S || g || s._rawPrevTime === g ? g : O),
              s._yoyo && s._cycle & 1
                ? (s._time = g = 0)
                : ((s._time = T), (g = T + 1e-4));
          else if (g < O)
            if (
              (s._locked || (s._totalTime = s._cycle = 0),
              (s._time = 0),
              g > -O && (g = 0),
              (M !== 0 ||
                (T === 0 &&
                  y !== O &&
                  (y > 0 || (g < 0 && y >= 0)) &&
                  !s._locked)) &&
                ((Y = 'onReverseComplete'), ($ = s._reversed)),
              g < 0)
            )
              (s._active = !1),
                s._timeline.autoRemoveChildren && s._reversed
                  ? ((k = $ = !0), (Y = 'onReverseComplete'))
                  : y >= 0 && s._first && (k = !0),
                (s._rawPrevTime = g);
            else {
              if (
                ((s._rawPrevTime =
                  T || !S || g || s._rawPrevTime === g ? g : O),
                g === 0 && $)
              )
                for (m = s._first; m && m._startTime === 0; )
                  m._duration || ($ = !1), (m = m._next);
              (g = 0), s._initted || (k = !0);
            }
          else
            T === 0 && y < 0 && (k = !0),
              (s._time = s._rawPrevTime = g),
              s._locked ||
                ((s._totalTime = g),
                s._repeat !== 0 &&
                  ((re = T + s._repeatDelay),
                  (s._cycle = (s._totalTime / re) >> 0),
                  s._cycle &&
                    s._cycle === s._totalTime / re &&
                    c <= g &&
                    s._cycle--,
                  (s._time = s._totalTime - s._cycle * re),
                  s._yoyo && s._cycle & 1 && (s._time = T - s._time),
                  s._time > T
                    ? ((s._time = T), (g = T + 1e-4))
                    : s._time < 0
                    ? (s._time = g = 0)
                    : (g = s._time)));
          if (s._hasPause && !s._forcingPlayhead && !S) {
            if (((g = s._time), g > M || (s._repeat && D !== s._cycle)))
              for (m = s._first; m && m._startTime <= g && !W; )
                m._duration ||
                  (m.data === 'isPause' &&
                    !m.ratio &&
                    !(m._startTime === 0 && s._rawPrevTime === 0) &&
                    (W = m)),
                  (m = m._next);
            else
              for (m = s._last; m && m._startTime >= g && !W; )
                m._duration ||
                  (m.data === 'isPause' && m._rawPrevTime > 0 && (W = m)),
                  (m = m._prev);
            W &&
              ((le =
                s._startTime +
                (s._reversed ? s._duration - W._startTime : W._startTime) /
                  s._timeScale),
              W._startTime < T &&
                ((s._time = s._rawPrevTime = g = W._startTime),
                (s._totalTime =
                  g + s._cycle * (s._totalDuration + s._repeatDelay))));
          }
          if (s._cycle !== D && !s._locked) {
            var Z = s._yoyo && (D & 1) !== 0,
              fe = Z === (s._yoyo && (s._cycle & 1) !== 0),
              ke = s._totalTime,
              ee = s._cycle,
              de = s._rawPrevTime,
              U = s._time;
            if (
              ((s._totalTime = D * T),
              s._cycle < D ? (Z = !Z) : (s._totalTime += T),
              (s._time = M),
              (s._rawPrevTime = T === 0 ? y - 1e-4 : y),
              (s._cycle = D),
              (s._locked = !0),
              (M = Z ? 0 : T),
              s.render(M, S, T === 0),
              S ||
                s._gc ||
                (s.vars.onRepeat &&
                  ((s._cycle = ee), (s._locked = !1), s._callback('onRepeat'))),
              M !== s._time ||
                (fe &&
                  ((s._cycle = D),
                  (s._locked = !0),
                  (M = Z ? T + 1e-4 : -1e-4),
                  s.render(M, !0, !1)),
                (s._locked = !1),
                s._paused && !l))
            )
              return;
            (s._time = U),
              (s._totalTime = ke),
              (s._cycle = ee),
              (s._rawPrevTime = de);
          }
          if ((s._time === M || !s._first) && !R && !k && !W) {
            c !== s._totalTime && s._onUpdate && (S || s._callback('onUpdate'));
            return;
          } else s._initted || (s._initted = !0);
          if (
            (s._active ||
              (!s._paused && s._totalTime !== c && g > 0 && (s._active = !0)),
            c === 0 &&
              s.vars.onStart &&
              (s._totalTime !== 0 || !s._totalDuration) &&
              (S || s._callback('onStart')),
            (ie = s._time),
            ie >= M)
          )
            for (
              m = s._first;
              m && ((I = m._next), !(ie !== s._time || (s._paused && !l)));

            )
              (m._active ||
                (m._startTime <= s._time && !m._paused && !m._gc)) &&
                (W === m && (s.pause(), (s._pauseTime = le)),
                m._reversed
                  ? m.render(
                      (m._dirty ? m.totalDuration() : m._totalDuration) -
                        (g - m._startTime) * m._timeScale,
                      S,
                      R,
                    )
                  : m.render((g - m._startTime) * m._timeScale, S, R)),
                (m = I);
          else
            for (
              m = s._last;
              m && ((I = m._prev), !(ie !== s._time || (s._paused && !l)));

            ) {
              if (m._active || (m._startTime <= M && !m._paused && !m._gc)) {
                if (W === m) {
                  for (W = m._prev; W && W.endTime() > s._time; )
                    W.render(
                      W._reversed
                        ? W.totalDuration() - (g - W._startTime) * W._timeScale
                        : (g - W._startTime) * W._timeScale,
                      S,
                      R,
                    ),
                      (W = W._prev);
                  (W = null), s.pause(), (s._pauseTime = le);
                }
                m._reversed
                  ? m.render(
                      (m._dirty ? m.totalDuration() : m._totalDuration) -
                        (g - m._startTime) * m._timeScale,
                      S,
                      R,
                    )
                  : m.render((g - m._startTime) * m._timeScale, S, R);
              }
              m = I;
            }
          s._onUpdate && (S || (L.length && C(), s._callback('onUpdate'))),
            Y &&
              (s._locked ||
                s._gc ||
                ((e === s._startTime || r !== s._timeScale) &&
                  (s._time === 0 || u >= s.totalDuration()) &&
                  ($ &&
                    (L.length && C(),
                    s._timeline.autoRemoveChildren && s._enabled(!1, !1),
                    (s._active = !1)),
                  !S && s.vars[Y] && s._callback(Y))));
        }),
        (o.getActive = function (g, S, R) {
          var s = [],
            M = this.getChildren(g || g == null, S || g == null, !!R),
            u = 0,
            T = M.length,
            c,
            e;
          for (c = 0; c < T; c++) (e = M[c]), e.isActive() && (s[u++] = e);
          return s;
        }),
        (o.getLabelAfter = function (g) {
          g || (g !== 0 && (g = this._time));
          var S = this.getLabelsArray(),
            R = S.length,
            s;
          for (s = 0; s < R; s++) if (S[s].time > g) return S[s].name;
          return null;
        }),
        (o.getLabelBefore = function (g) {
          g == null && (g = this._time);
          for (var S = this.getLabelsArray(), R = S.length; --R > -1; )
            if (S[R].time < g) return S[R].name;
          return null;
        }),
        (o.getLabelsArray = function () {
          var g = [],
            S = 0,
            R;
          for (R in this._labels) g[S++] = { time: this._labels[R], name: R };
          return (
            g.sort(function (s, M) {
              return s.time - M.time;
            }),
            g
          );
        }),
        (o.invalidate = function () {
          return (this._locked = !1), Tt.prototype.invalidate.call(this);
        }),
        (o.progress = function (g, S) {
          return arguments.length
            ? this.totalTime(
                this.duration() * (this._yoyo && this._cycle & 1 ? 1 - g : g) +
                  this._cycle * (this._duration + this._repeatDelay),
                S,
              )
            : this._time / this.duration() || 0;
        }),
        (o.totalProgress = function (g, S) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * g, S)
            : this._totalTime / this.totalDuration() || 0;
        }),
        (o.totalDuration = function (g) {
          return arguments.length
            ? this._repeat === -1 || !g
              ? this
              : this.timeScale(this.totalDuration() / g)
            : (this._dirty &&
                (Tt.prototype.totalDuration.call(this),
                (this._totalDuration =
                  this._repeat === -1
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat)),
              this._totalDuration);
        }),
        (o.time = function (g, S) {
          if (!arguments.length) return this._time;
          this._dirty && this.totalDuration();
          var R = this._duration,
            s = this._cycle,
            M = s * (R + this._repeatDelay);
          return (
            g > R && (g = R),
            this.totalTime(
              this._yoyo && s & 1 ? R - g + M : this._repeat ? g + M : g,
              S,
            )
          );
        }),
        (o.repeat = function (g) {
          return arguments.length
            ? ((this._repeat = g), this._uncache(!0))
            : this._repeat;
        }),
        (o.repeatDelay = function (g) {
          return arguments.length
            ? ((this._repeatDelay = g), this._uncache(!0))
            : this._repeatDelay;
        }),
        (o.yoyo = function (g) {
          return arguments.length ? ((this._yoyo = g), this) : this._yoyo;
        }),
        (o.currentLabel = function (g) {
          return arguments.length
            ? this.seek(g, !0)
            : this.getLabelBefore(this._time + O);
        }),
        w
      );
    },
    !0,
  );
  var Pt = Ue.TimelineMax;
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ Ge._gsDefine(
    'TweenMax',
    ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
    function () {
      var w = function (u) {
          var T = [],
            c = u.length,
            e;
          for (e = 0; e !== c; T.push(u[e++]));
          return T;
        },
        O = function (u, T, c) {
          var e = u.cycle,
            r,
            y;
          for (r in e)
            (y = e[r]),
              (u[r] = typeof y == 'function' ? y(c, T[c], T) : y[c % y.length]);
          delete u.cycle;
        },
        N = function (u) {
          if (typeof u == 'function') return u;
          var T = typeof u == 'object' ? u : { each: u },
            c = T.ease,
            e = T.from || 0,
            r = T.base || 0,
            y = {},
            l = isNaN(e),
            D = T.axis,
            m = { center: 0.5, end: 1 }[e] || 0;
          return function ($, I, Y) {
            var k = (Y || T).length,
              re = y[k],
              W,
              ie,
              le,
              Z,
              fe,
              ke,
              ee,
              de,
              U;
            if (!re) {
              if (((U = T.grid === 'auto' ? 0 : (T.grid || [1 / 0])[0]), !U)) {
                for (
                  ee = -1 / 0;
                  ee < (ee = Y[U++].getBoundingClientRect().left) && U < k;

                );
                U--;
              }
              for (
                re = y[k] = [],
                  W = l ? Math.min(U, k) * m - 0.5 : e % U,
                  ie = l ? (k * m) / U - 0.5 : (e / U) | 0,
                  ee = 0,
                  de = 1 / 0,
                  ke = 0;
                ke < k;
                ke++
              )
                (le = (ke % U) - W),
                  (Z = ie - ((ke / U) | 0)),
                  (re[ke] = fe =
                    D
                      ? Math.abs(D === 'y' ? Z : le)
                      : Math.sqrt(le * le + Z * Z)),
                  fe > ee && (ee = fe),
                  fe < de && (de = fe);
              (re.max = ee - de),
                (re.min = de),
                (re.v = k =
                  T.amount ||
                  T.each *
                    (U > k
                      ? k - 1
                      : D
                      ? D === 'y'
                        ? k / U
                        : U
                      : Math.max(U, k / U)) ||
                  0),
                (re.b = k < 0 ? r - k : r);
            }
            return (
              (k = (re[$] - re.min) / re.max),
              re.b + (c ? c.getRatio(k) : k) * re.v
            );
          };
        },
        L = function (u, T, c) {
          Re.call(this, u, T, c),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = L.prototype.render);
        },
        C = 1e-8,
        B = Re._internals,
        P = B.isSelector,
        o = B.isArray,
        g = (L.prototype = Re.to({}, 0.1, {})),
        S = [];
      (L.version = '2.1.3'),
        (g.constructor = L),
        (g.kill()._gc = !1),
        (L.killTweensOf = L.killDelayedCallsTo = Re.killTweensOf),
        (L.getTweensOf = Re.getTweensOf),
        (L.lagSmoothing = Re.lagSmoothing),
        (L.ticker = Re.ticker),
        (L.render = Re.render),
        (L.distribute = N),
        (g.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            Re.prototype.invalidate.call(this)
          );
        }),
        (g.updateTo = function (u, T) {
          var c = this,
            e = c.ratio,
            r = c.vars.immediateRender || u.immediateRender,
            y;
          T &&
            c._startTime < c._timeline._time &&
            ((c._startTime = c._timeline._time),
            c._uncache(!1),
            c._gc
              ? c._enabled(!0, !1)
              : c._timeline.insert(c, c._startTime - c._delay));
          for (y in u) c.vars[y] = u[y];
          if (c._initted || r) {
            if (T) (c._initted = !1), r && c.render(0, !0, !0);
            else if (
              (c._gc && c._enabled(!0, !1),
              c._notifyPluginsOfEnabled &&
                c._firstPT &&
                Re._onPluginEvent('_onDisable', c),
              c._time / c._duration > 0.998)
            ) {
              var l = c._totalTime;
              c.render(0, !0, !1), (c._initted = !1), c.render(l, !0, !1);
            } else if (((c._initted = !1), c._init(), c._time > 0 || r))
              for (var D = 1 / (1 - e), m = c._firstPT, $; m; )
                ($ = m.s + m.c), (m.c *= D), (m.s = $ - m.c), (m = m._next);
          }
          return c;
        }),
        (g.render = function (u, T, c) {
          this._initted ||
            (this._duration === 0 && this.vars.repeat && this.invalidate());
          var e = this,
            r = e._dirty ? e.totalDuration() : e._totalDuration,
            y = e._time,
            l = e._totalTime,
            D = e._cycle,
            m = e._duration,
            $ = e._rawPrevTime,
            I,
            Y,
            k,
            re,
            W,
            ie,
            le,
            Z,
            fe;
          if (
            (u >= r - C && u >= 0
              ? ((e._totalTime = r),
                (e._cycle = e._repeat),
                e._yoyo && e._cycle & 1
                  ? ((e._time = 0),
                    (e.ratio = e._ease._calcEnd ? e._ease.getRatio(0) : 0))
                  : ((e._time = m),
                    (e.ratio = e._ease._calcEnd ? e._ease.getRatio(1) : 1)),
                e._reversed ||
                  ((I = !0),
                  (Y = 'onComplete'),
                  (c = c || e._timeline.autoRemoveChildren)),
                m === 0 &&
                  (e._initted || !e.vars.lazy || c) &&
                  (e._startTime === e._timeline._duration && (u = 0),
                  ($ < 0 ||
                    (u <= 0 && u >= -C) ||
                    ($ === C && e.data !== 'isPause')) &&
                    $ !== u &&
                    ((c = !0), $ > C && (Y = 'onReverseComplete')),
                  (e._rawPrevTime = Z = !T || u || $ === u ? u : C)))
              : u < C
              ? ((e._totalTime = e._time = e._cycle = 0),
                (e.ratio = e._ease._calcEnd ? e._ease.getRatio(0) : 0),
                (l !== 0 || (m === 0 && $ > 0)) &&
                  ((Y = 'onReverseComplete'), (I = e._reversed)),
                u > -C
                  ? (u = 0)
                  : u < 0 &&
                    ((e._active = !1),
                    m === 0 &&
                      (e._initted || !e.vars.lazy || c) &&
                      ($ >= 0 && (c = !0),
                      (e._rawPrevTime = Z = !T || u || $ === u ? u : C))),
                e._initted || (c = !0))
              : ((e._totalTime = e._time = u),
                e._repeat !== 0 &&
                  ((re = m + e._repeatDelay),
                  (e._cycle = (e._totalTime / re) >> 0),
                  e._cycle !== 0 &&
                    e._cycle === e._totalTime / re &&
                    l <= u &&
                    e._cycle--,
                  (e._time = e._totalTime - e._cycle * re),
                  e._yoyo &&
                    e._cycle & 1 &&
                    ((e._time = m - e._time),
                    (fe = e._yoyoEase || e.vars.yoyoEase),
                    fe &&
                      (e._yoyoEase ||
                        (fe === !0 && !e._initted
                          ? ((fe = e.vars.ease),
                            (e._yoyoEase = fe =
                              fe
                                ? fe instanceof rt
                                  ? fe
                                  : typeof fe == 'function'
                                  ? new rt(fe, e.vars.easeParams)
                                  : rt.map[fe] || Re.defaultEase
                                : Re.defaultEase))
                          : (e._yoyoEase = fe =
                              fe === !0
                                ? e._ease
                                : fe instanceof rt
                                ? fe
                                : rt.map[fe])),
                      (e.ratio = fe ? 1 - fe.getRatio((m - e._time) / m) : 0))),
                  e._time > m ? (e._time = m) : e._time < 0 && (e._time = 0)),
                e._easeType && !fe
                  ? ((W = e._time / m),
                    (ie = e._easeType),
                    (le = e._easePower),
                    (ie === 1 || (ie === 3 && W >= 0.5)) && (W = 1 - W),
                    ie === 3 && (W *= 2),
                    le === 1
                      ? (W *= W)
                      : le === 2
                      ? (W *= W * W)
                      : le === 3
                      ? (W *= W * W * W)
                      : le === 4 && (W *= W * W * W * W),
                    (e.ratio =
                      ie === 1
                        ? 1 - W
                        : ie === 2
                        ? W
                        : e._time / m < 0.5
                        ? W / 2
                        : 1 - W / 2))
                  : fe || (e.ratio = e._ease.getRatio(e._time / m))),
            y === e._time && !c && D === e._cycle)
          ) {
            l !== e._totalTime && e._onUpdate && (T || e._callback('onUpdate'));
            return;
          } else if (!e._initted) {
            if ((e._init(), !e._initted || e._gc)) return;
            if (
              !c &&
              e._firstPT &&
              ((e.vars.lazy !== !1 && e._duration) ||
                (e.vars.lazy && !e._duration))
            ) {
              (e._time = y),
                (e._totalTime = l),
                (e._rawPrevTime = $),
                (e._cycle = D),
                B.lazyTweens.push(e),
                (e._lazy = [u, T]);
              return;
            }
            e._time && !I && !fe
              ? (e.ratio = e._ease.getRatio(e._time / m))
              : I &&
                this._ease._calcEnd &&
                !fe &&
                (e.ratio = e._ease.getRatio(e._time === 0 ? 0 : 1));
          }
          for (
            e._lazy !== !1 && (e._lazy = !1),
              e._active ||
                (!e._paused && e._time !== y && u >= 0 && (e._active = !0)),
              l === 0 &&
                (e._initted === 2 && u > 0 && e._init(),
                e._startAt &&
                  (u >= 0
                    ? e._startAt.render(u, !0, c)
                    : Y || (Y = '_dummyGS')),
                e.vars.onStart &&
                  (e._totalTime !== 0 || m === 0) &&
                  (T || e._callback('onStart'))),
              k = e._firstPT;
            k;

          )
            k.f
              ? k.t[k.p](k.c * e.ratio + k.s)
              : (k.t[k.p] = k.c * e.ratio + k.s),
              (k = k._next);
          e._onUpdate &&
            (u < 0 && e._startAt && e._startTime && e._startAt.render(u, !0, c),
            T || ((e._totalTime !== l || Y) && e._callback('onUpdate'))),
            e._cycle !== D &&
              (T || e._gc || (e.vars.onRepeat && e._callback('onRepeat'))),
            Y &&
              (!e._gc || c) &&
              (u < 0 &&
                e._startAt &&
                !e._onUpdate &&
                e._startTime &&
                e._startAt.render(u, !0, c),
              I &&
                (e._timeline.autoRemoveChildren && e._enabled(!1, !1),
                (e._active = !1)),
              !T && e.vars[Y] && e._callback(Y),
              m === 0 &&
                e._rawPrevTime === C &&
                Z !== C &&
                (e._rawPrevTime = 0));
        }),
        (L.to = function (u, T, c) {
          return new L(u, T, c);
        }),
        (L.from = function (u, T, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = c.immediateRender != !1),
            new L(u, T, c)
          );
        }),
        (L.fromTo = function (u, T, c, e) {
          return (
            (e.startAt = c),
            (e.immediateRender =
              e.immediateRender != !1 && c.immediateRender != !1),
            new L(u, T, e)
          );
        }),
        (L.staggerTo = L.allTo =
          function (u, T, c, e, r, y, l) {
            var D = [],
              m = N(c.stagger || e),
              $ = c.cycle,
              I = (c.startAt || S).cycle,
              Y,
              k,
              re,
              W;
            for (
              o(u) ||
                (typeof u == 'string' && (u = Re.selector(u) || u),
                P(u) && (u = w(u))),
                u = u || [],
                Y = u.length - 1,
                re = 0;
              re <= Y;
              re++
            ) {
              k = {};
              for (W in c) k[W] = c[W];
              if (
                ($ &&
                  (O(k, u, re),
                  k.duration != null && ((T = k.duration), delete k.duration)),
                I)
              ) {
                I = k.startAt = {};
                for (W in c.startAt) I[W] = c.startAt[W];
                O(k.startAt, u, re);
              }
              (k.delay = m(re, u[re], u) + (k.delay || 0)),
                re === Y &&
                  r &&
                  (k.onComplete = function () {
                    c.onComplete &&
                      c.onComplete.apply(c.onCompleteScope || this, arguments),
                      r.apply(l || c.callbackScope || this, y || S);
                  }),
                (D[re] = new L(u[re], T, k));
            }
            return D;
          }),
        (L.staggerFrom = L.allFrom =
          function (u, T, c, e, r, y, l) {
            return (
              (c.runBackwards = !0),
              (c.immediateRender = c.immediateRender != !1),
              L.staggerTo(u, T, c, e, r, y, l)
            );
          }),
        (L.staggerFromTo = L.allFromTo =
          function (u, T, c, e, r, y, l, D) {
            return (
              (e.startAt = c),
              (e.immediateRender =
                e.immediateRender != !1 && c.immediateRender != !1),
              L.staggerTo(u, T, e, r, y, l, D)
            );
          }),
        (L.delayedCall = function (u, T, c, e, r) {
          return new L(T, 0, {
            delay: u,
            onComplete: T,
            onCompleteParams: c,
            callbackScope: e,
            onReverseComplete: T,
            onReverseCompleteParams: c,
            immediateRender: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (L.set = function (u, T) {
          return new L(u, 0, T);
        }),
        (L.isTweening = function (u) {
          return Re.getTweensOf(u, !0).length > 0;
        });
      var R = function (u, T) {
          for (var c = [], e = 0, r = u._first; r; )
            r instanceof Re
              ? (c[e++] = r)
              : (T && (c[e++] = r), (c = c.concat(R(r, T))), (e = c.length)),
              (r = r._next);
          return c;
        },
        s = (L.getAllTweens = function (u) {
          return R(it._rootTimeline, u).concat(R(it._rootFramesTimeline, u));
        });
      (L.killAll = function (u, T, c, e) {
        T == null && (T = !0), c == null && (c = !0);
        var r = s(e != !1),
          y = r.length,
          l = T && c && e,
          D,
          m,
          $;
        for ($ = 0; $ < y; $++)
          (m = r[$]),
            (l ||
              m instanceof wt ||
              ((D = m.target === m.vars.onComplete) && c) ||
              (T && !D)) &&
              (u
                ? m.totalTime(m._reversed ? 0 : m.totalDuration())
                : m._enabled(!1, !1));
      }),
        (L.killChildTweensOf = function (u, T) {
          if (u != null) {
            var c = B.tweenLookup,
              e,
              r,
              y,
              l,
              D;
            if (
              (typeof u == 'string' && (u = Re.selector(u) || u),
              P(u) && (u = w(u)),
              o(u))
            ) {
              for (l = u.length; --l > -1; ) L.killChildTweensOf(u[l], T);
              return;
            }
            e = [];
            for (y in c)
              for (r = c[y].target.parentNode; r; )
                r === u && (e = e.concat(c[y].tweens)), (r = r.parentNode);
            for (D = e.length, l = 0; l < D; l++)
              T && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1);
          }
        });
      var M = function (u, T, c, e) {
        (T = T !== !1), (c = c !== !1), (e = e !== !1);
        for (var r = s(e), y = T && c && e, l = r.length, D, m; --l > -1; )
          (m = r[l]),
            (y ||
              m instanceof wt ||
              ((D = m.target === m.vars.onComplete) && c) ||
              (T && !D)) &&
              m.paused(u);
      };
      return (
        (L.pauseAll = function (u, T, c) {
          M(!0, u, T, c);
        }),
        (L.resumeAll = function (u, T, c) {
          M(!1, u, T, c);
        }),
        (L.globalTimeScale = function (u) {
          var T = it._rootTimeline,
            c = Re.ticker.time;
          return arguments.length
            ? ((u = u || C),
              (T._startTime = c - ((c - T._startTime) * T._timeScale) / u),
              (T = it._rootFramesTimeline),
              (c = Re.ticker.frame),
              (T._startTime = c - ((c - T._startTime) * T._timeScale) / u),
              (T._timeScale = it._rootTimeline._timeScale = u),
              u)
            : T._timeScale;
        }),
        (g.progress = function (u, T) {
          return arguments.length
            ? this.totalTime(
                this.duration() * (this._yoyo && this._cycle & 1 ? 1 - u : u) +
                  this._cycle * (this._duration + this._repeatDelay),
                T,
              )
            : this.duration()
            ? this._time / this._duration
            : this.ratio;
        }),
        (g.totalProgress = function (u, T) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * u, T)
            : this._totalTime / this.totalDuration();
        }),
        (g.time = function (u, T) {
          if (!arguments.length) return this._time;
          this._dirty && this.totalDuration();
          var c = this._duration,
            e = this._cycle,
            r = e * (c + this._repeatDelay);
          return (
            u > c && (u = c),
            this.totalTime(
              this._yoyo && e & 1 ? c - u + r : this._repeat ? u + r : u,
              T,
            )
          );
        }),
        (g.duration = function (u) {
          return arguments.length
            ? it.prototype.duration.call(this, u)
            : this._duration;
        }),
        (g.totalDuration = function (u) {
          return arguments.length
            ? this._repeat === -1
              ? this
              : this.duration(
                  (u - this._repeat * this._repeatDelay) / (this._repeat + 1),
                )
            : (this._dirty &&
                ((this._totalDuration =
                  this._repeat === -1
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (g.repeat = function (u) {
          return arguments.length
            ? ((this._repeat = u), this._uncache(!0))
            : this._repeat;
        }),
        (g.repeatDelay = function (u) {
          return arguments.length
            ? ((this._repeatDelay = u), this._uncache(!0))
            : this._repeatDelay;
        }),
        (g.yoyo = function (u) {
          return arguments.length ? ((this._yoyo = u), this) : this._yoyo;
        }),
        L
      );
    },
    !0,
  );
  var bi = Ue.TweenMax;
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   */ Ge._gsDefine(
    'plugins.CSSPlugin',
    ['plugins.TweenPlugin', 'TweenLite'],
    function () {
      var w = function () {
          It.call(this, 'css'),
            (this._overwriteProps.length = 0),
            (this.setRatio = w.prototype.setRatio);
        },
        O = Ge._gsDefine.globals,
        N,
        L,
        C,
        B,
        P = {},
        o = (w.prototype = new It('css'));
      (o.constructor = w),
        (w.version = '2.1.3'),
        (w.API = 2),
        (w.defaultTransformPerspective = 0),
        (w.defaultSkewType = 'compensated'),
        (w.defaultSmoothOrigin = !0),
        (o = 'px'),
        (w.suffixMap = {
          top: o,
          right: o,
          bottom: o,
          left: o,
          width: o,
          height: o,
          fontSize: o,
          padding: o,
          margin: o,
          perspective: o,
          lineHeight: '',
        });
      var g = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        S = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        R = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
        M = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        u = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        c = /opacity:([^;]*)/i,
        e = /alpha\(opacity *=.+?\)/i,
        r = /^(rgb|hsl)/,
        y = /([A-Z])/g,
        l = /-([a-z])/gi,
        D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        m = function (i, t) {
          return t.toUpperCase();
        },
        $ = /(?:Left|Right|Width)/i,
        I = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        Y = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        k = /,(?=[^\)]*(?:\(|$))/gi,
        re = /[\s,\(]/i,
        W = Math.PI / 180,
        ie = 180 / Math.PI,
        le = {},
        Z = { style: {} },
        fe = Ge.document || {
          createElement: function () {
            return Z;
          },
        },
        ke = function (i, t) {
          var h = fe.createElementNS
            ? fe.createElementNS(t || 'http://www.w3.org/1999/xhtml', i)
            : fe.createElement(i);
          return h.style ? h : fe.createElement(i);
        },
        ee = ke('div'),
        de = ke('img'),
        U = (w._internals = { _specialProps: P }),
        pe = (Ge.navigator || {}).userAgent || '',
        Ee,
        Me,
        Je,
        at,
        ot,
        X,
        te = (function () {
          var i = pe.indexOf('Android'),
            t = ke('a');
          return (
            (Je =
              pe.indexOf('Safari') !== -1 &&
              pe.indexOf('Chrome') === -1 &&
              (i === -1 || parseFloat(pe.substr(i + 8, 2)) > 3)),
            (ot =
              Je && parseFloat(pe.substr(pe.indexOf('Version/') + 8, 2)) < 6),
            (at = pe.indexOf('Firefox') !== -1),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(pe) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(pe)) &&
              (X = parseFloat(RegExp.$1)),
            t
              ? ((t.style.cssText = 'top:1px;opacity:.55;'),
                /^0.55/.test(t.style.opacity))
              : !1
          );
        })(),
        xe = function (i) {
          return T.test(
            typeof i == 'string'
              ? i
              : (i.currentStyle ? i.currentStyle.filter : i.style.filter) || '',
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        },
        Ce = function (i) {
          Ge.console && console.log(i);
        },
        me,
        be,
        De = '',
        We = '',
        Xe = function (i, t) {
          t = t || ee;
          var h = t.style,
            p,
            a;
          if (h[i] !== void 0) return i;
          for (
            i = i.charAt(0).toUpperCase() + i.substr(1),
              p = ['O', 'Moz', 'ms', 'Ms', 'Webkit'],
              a = 5;
            --a > -1 && h[p[a] + i] === void 0;

          );
          return a >= 0
            ? ((We = a === 3 ? 'ms' : p[a]),
              (De = '-' + We.toLowerCase() + '-'),
              We + i)
            : null;
        },
        He =
          typeof window < 'u'
            ? window
            : fe.defaultView || { getComputedStyle: function () {} },
        Ve = function (i) {
          return He.getComputedStyle(i);
        },
        Ae = (w.getStyle = function (i, t, h, p, a) {
          var v;
          return !te && t === 'opacity'
            ? xe(i)
            : (!p && i.style[t]
                ? (v = i.style[t])
                : (h = h || Ve(i))
                ? (v =
                    h[t] ||
                    h.getPropertyValue(t) ||
                    h.getPropertyValue(t.replace(y, '-$1').toLowerCase()))
                : i.currentStyle && (v = i.currentStyle[t]),
              a != null &&
              (!v || v === 'none' || v === 'auto' || v === 'auto auto')
                ? a
                : v);
        }),
        et = (U.convertToPixels = function (i, t, h, p, a) {
          if (p === 'px' || (!p && t !== 'lineHeight')) return h;
          if (p === 'auto' || !h) return 0;
          var v = $.test(t),
            _ = i,
            b = ee.style,
            E = h < 0,
            j = h === 1,
            F,
            H,
            A;
          if ((E && (h = -h), j && (h *= 100), t === 'lineHeight' && !p))
            (H = Ve(i).lineHeight),
              (i.style.lineHeight = h),
              (F = parseFloat(Ve(i).lineHeight)),
              (i.style.lineHeight = H);
          else if (p === '%' && t.indexOf('border') !== -1)
            F = (h / 100) * (v ? i.clientWidth : i.clientHeight);
          else {
            if (
              ((b.cssText =
                'border:0 solid red;position:' +
                Ae(i, 'position') +
                ';line-height:0;'),
              p === '%' || !_.appendChild || p.charAt(0) === 'v' || p === 'rem')
            ) {
              if (
                ((_ = i.parentNode || fe.body),
                Ae(_, 'display').indexOf('flex') !== -1 &&
                  (b.position = 'absolute'),
                (H = _._gsCache),
                (A = Re.ticker.frame),
                H && v && H.time === A)
              )
                return (H.width * h) / 100;
              b[v ? 'width' : 'height'] = h + p;
            } else b[v ? 'borderLeftWidth' : 'borderTopWidth'] = h + p;
            _.appendChild(ee),
              (F = parseFloat(ee[v ? 'offsetWidth' : 'offsetHeight'])),
              _.removeChild(ee),
              v &&
                p === '%' &&
                w.cacheWidths !== !1 &&
                ((H = _._gsCache = _._gsCache || {}),
                (H.time = A),
                (H.width = (F / h) * 100)),
              F === 0 && !a && (F = et(i, t, h, p, !0));
          }
          return j && (F /= 100), E ? -F : F;
        }),
        nt = (U.calculateOffset = function (i, t, h) {
          if (Ae(i, 'position', h) !== 'absolute') return 0;
          var p = t === 'left' ? 'Left' : 'Top',
            a = Ae(i, 'margin' + p, h);
          return (
            i['offset' + p] - (et(i, t, parseFloat(a), a.replace(u, '')) || 0)
          );
        }),
        n = function (i, t) {
          var h = {},
            p,
            a,
            v;
          if ((t = t || Ve(i)))
            if ((p = t.length))
              for (; --p > -1; )
                (v = t[p]),
                  (v.indexOf('-transform') === -1 || Bt === v) &&
                    (h[v.replace(l, m)] = t.getPropertyValue(v));
            else
              for (p in t)
                (p.indexOf('Transform') === -1 || Ze === p) && (h[p] = t[p]);
          else if ((t = i.currentStyle || i.style))
            for (p in t)
              typeof p == 'string' &&
                h[p] === void 0 &&
                (h[p.replace(l, m)] = t[p]);
          return (
            te || (h.opacity = xe(i)),
            (a = Ct(i, t, !1)),
            (h.rotation = a.rotation),
            (h.skewX = a.skewX),
            (h.scaleX = a.scaleX),
            (h.scaleY = a.scaleY),
            (h.x = a.x),
            (h.y = a.y),
            ft &&
              ((h.z = a.z),
              (h.rotationX = a.rotationX),
              (h.rotationY = a.rotationY),
              (h.scaleZ = a.scaleZ)),
            h.filters && delete h.filters,
            h
          );
        },
        d = function (i, t, h, p, a) {
          var v = {},
            _ = i.style,
            b,
            E,
            j;
          for (E in h)
            E !== 'cssText' &&
              E !== 'length' &&
              isNaN(E) &&
              (t[E] !== (b = h[E]) || (a && a[E])) &&
              E.indexOf('Origin') === -1 &&
              (typeof b == 'number' || typeof b == 'string') &&
              ((v[E] =
                b === 'auto' && (E === 'left' || E === 'top')
                  ? nt(i, E)
                  : (b === '' || b === 'auto' || b === 'none') &&
                    typeof t[E] == 'string' &&
                    t[E].replace(M, '') !== ''
                  ? 0
                  : b),
              _[E] !== void 0 && (j = new ht(_, E, _[E], j)));
          if (p) for (E in p) E !== 'className' && (v[E] = p[E]);
          return { difs: v, firstMPT: j };
        },
        x = { width: ['Left', 'Right'], height: ['Top', 'Bottom'] },
        f = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
        z = function (i, t, h) {
          if ((i.nodeName + '').toLowerCase() === 'svg')
            return (h || Ve(i))[t] || 0;
          if (i.getCTM && jt(i)) return i.getBBox()[t] || 0;
          var p = parseFloat(t === 'width' ? i.offsetWidth : i.offsetHeight),
            a = x[t],
            v = a.length;
          for (h = h || Ve(i); --v > -1; )
            (p -= parseFloat(Ae(i, 'padding' + a[v], h, !0)) || 0),
              (p -= parseFloat(Ae(i, 'border' + a[v] + 'Width', h, !0)) || 0);
          return p;
        },
        q = function (i, t) {
          if (i === 'contain' || i === 'auto' || i === 'auto auto')
            return i + ' ';
          (i == null || i === '') && (i = '0 0');
          var h = i.split(' '),
            p =
              i.indexOf('left') !== -1
                ? '0%'
                : i.indexOf('right') !== -1
                ? '100%'
                : h[0],
            a =
              i.indexOf('top') !== -1
                ? '0%'
                : i.indexOf('bottom') !== -1
                ? '100%'
                : h[1],
            v;
          if (h.length > 3 && !t) {
            for (
              h = i.split(', ').join(',').split(','), i = [], v = 0;
              v < h.length;
              v++
            )
              i.push(q(h[v]));
            return i.join(',');
          }
          return (
            a == null
              ? (a = p === 'center' ? '50%' : '0')
              : a === 'center' && (a = '50%'),
            (p === 'center' ||
              (isNaN(parseFloat(p)) && (p + '').indexOf('=') === -1)) &&
              (p = '50%'),
            (i = p + ' ' + a + (h.length > 2 ? ' ' + h[2] : '')),
            t &&
              ((t.oxp = p.indexOf('%') !== -1),
              (t.oyp = a.indexOf('%') !== -1),
              (t.oxr = p.charAt(1) === '='),
              (t.oyr = a.charAt(1) === '='),
              (t.ox = parseFloat(p.replace(M, ''))),
              (t.oy = parseFloat(a.replace(M, ''))),
              (t.v = i)),
            t || i
          );
        },
        Q = function (i, t) {
          return (
            typeof i == 'function' && (i = i(be, me)),
            typeof i == 'string' && i.charAt(1) === '='
              ? parseInt(i.charAt(0) + '1', 10) * parseFloat(i.substr(2))
              : parseFloat(i) - parseFloat(t) || 0
          );
        },
        K = function (i, t) {
          typeof i == 'function' && (i = i(be, me));
          var h = typeof i == 'string' && i.charAt(1) === '=';
          return (
            typeof i == 'string' &&
              i.charAt(i.length - 2) === 'v' &&
              (i =
                (h ? i.substr(0, 2) : 0) +
                window['inner' + (i.substr(-2) === 'vh' ? 'Height' : 'Width')] *
                  (parseFloat(h ? i.substr(2) : i) / 100)),
            i == null
              ? t
              : h
              ? parseInt(i.charAt(0) + '1', 10) * parseFloat(i.substr(2)) + t
              : parseFloat(i) || 0
          );
        },
        J = function (i, t, h, p) {
          var a = 1e-6,
            v,
            _,
            b,
            E,
            j;
          return (
            typeof i == 'function' && (i = i(be, me)),
            i == null
              ? (E = t)
              : typeof i == 'number'
              ? (E = i)
              : ((v = 360),
                (_ = i.split('_')),
                (j = i.charAt(1) === '='),
                (b =
                  (j
                    ? parseInt(i.charAt(0) + '1', 10) *
                      parseFloat(_[0].substr(2))
                    : parseFloat(_[0])) *
                    (i.indexOf('rad') === -1 ? 1 : ie) -
                  (j ? 0 : t)),
                _.length &&
                  (p && (p[h] = t + b),
                  i.indexOf('short') !== -1 &&
                    ((b = b % v),
                    b !== b % (v / 2) && (b = b < 0 ? b + v : b - v)),
                  i.indexOf('_cw') !== -1 && b < 0
                    ? (b = ((b + v * 9999999999) % v) - ((b / v) | 0) * v)
                    : i.indexOf('ccw') !== -1 &&
                      b > 0 &&
                      (b = ((b - v * 9999999999) % v) - ((b / v) | 0) * v)),
                (E = t + b)),
            E < a && E > -a && (E = 0),
            E
          );
        },
        ue = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        he = function (i, t, h) {
          return (
            (i = i < 0 ? i + 1 : i > 1 ? i - 1 : i),
            ((i * 6 < 1
              ? t + (h - t) * i * 6
              : i < 0.5
              ? h
              : i * 3 < 2
              ? t + (h - t) * (2 / 3 - i) * 6
              : t) *
              255 +
              0.5) |
              0
          );
        },
        ce = (w.parseColor = function (i, t) {
          var h, p, a, v, _, b, E, j, F, H, A;
          if (!i) h = ue.black;
          else if (typeof i == 'number') h = [i >> 16, (i >> 8) & 255, i & 255];
          else {
            if (
              (i.charAt(i.length - 1) === ',' &&
                (i = i.substr(0, i.length - 1)),
              ue[i])
            )
              h = ue[i];
            else if (i.charAt(0) === '#')
              i.length === 4 &&
                ((p = i.charAt(1)),
                (a = i.charAt(2)),
                (v = i.charAt(3)),
                (i = '#' + p + p + a + a + v + v)),
                (i = parseInt(i.substr(1), 16)),
                (h = [i >> 16, (i >> 8) & 255, i & 255]);
            else if (i.substr(0, 3) === 'hsl') {
              if (((h = A = i.match(g)), !t))
                (_ = (Number(h[0]) % 360) / 360),
                  (b = Number(h[1]) / 100),
                  (E = Number(h[2]) / 100),
                  (a = E <= 0.5 ? E * (b + 1) : E + b - E * b),
                  (p = E * 2 - a),
                  h.length > 3 && (h[3] = Number(h[3])),
                  (h[0] = he(_ + 1 / 3, p, a)),
                  (h[1] = he(_, p, a)),
                  (h[2] = he(_ - 1 / 3, p, a));
              else if (i.indexOf('=') !== -1) return i.match(S);
            } else h = i.match(g) || ue.transparent;
            (h[0] = Number(h[0])),
              (h[1] = Number(h[1])),
              (h[2] = Number(h[2])),
              h.length > 3 && (h[3] = Number(h[3]));
          }
          return (
            t &&
              !A &&
              ((p = h[0] / 255),
              (a = h[1] / 255),
              (v = h[2] / 255),
              (j = Math.max(p, a, v)),
              (F = Math.min(p, a, v)),
              (E = (j + F) / 2),
              j === F
                ? (_ = b = 0)
                : ((H = j - F),
                  (b = E > 0.5 ? H / (2 - j - F) : H / (j + F)),
                  (_ =
                    j === p
                      ? (a - v) / H + (a < v ? 6 : 0)
                      : j === a
                      ? (v - p) / H + 2
                      : (p - a) / H + 4),
                  (_ *= 60)),
              (h[0] = (_ + 0.5) | 0),
              (h[1] = (b * 100 + 0.5) | 0),
              (h[2] = (E * 100 + 0.5) | 0)),
            h
          );
        }),
        Ie = function (i, t) {
          var h = i.match(ge) || [],
            p = 0,
            a = '',
            v,
            _,
            b;
          if (!h.length) return i;
          for (v = 0; v < h.length; v++)
            (_ = h[v]),
              (b = i.substr(p, i.indexOf(_, p) - p)),
              (p += b.length + _.length),
              (_ = ce(_, t)),
              _.length === 3 && _.push(1),
              (a +=
                b +
                (t
                  ? 'hsla(' + _[0] + ',' + _[1] + '%,' + _[2] + '%,' + _[3]
                  : 'rgba(' + _.join(',')) +
                ')');
          return a + i.substr(p);
        },
        ge =
          '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b';
      for (o in ue) ge += '|' + o + '\\b';
      (ge = new RegExp(ge + ')', 'gi')),
        (w.colorStringFilter = function (i) {
          var t = i[0] + ' ' + i[1],
            h;
          ge.test(t) &&
            ((h = t.indexOf('hsl(') !== -1 || t.indexOf('hsla(') !== -1),
            (i[0] = Ie(i[0], h)),
            (i[1] = Ie(i[1], h))),
            (ge.lastIndex = 0);
        }),
        Re.defaultStringFilter ||
          (Re.defaultStringFilter = w.colorStringFilter);
      var Ne = function (i, t, h, p) {
          if (i == null)
            return function (A) {
              return A;
            };
          var a = t ? (i.match(ge) || [''])[0] : '',
            v = i.split(a).join('').match(R) || [],
            _ = i.substr(0, i.indexOf(v[0])),
            b = i.charAt(i.length - 1) === ')' ? ')' : '',
            E = i.indexOf(' ') !== -1 ? ' ' : ',',
            j = v.length,
            F = j > 0 ? v[0].replace(g, '') : '',
            H;
          return j
            ? t
              ? ((H = function (A) {
                  var ne, se, G, ae;
                  if (typeof A == 'number') A += F;
                  else if (p && k.test(A)) {
                    for (
                      ae = A.replace(k, '|').split('|'), G = 0;
                      G < ae.length;
                      G++
                    )
                      ae[G] = H(ae[G]);
                    return ae.join(',');
                  }
                  if (
                    ((ne = (A.match(ge) || [a])[0]),
                    (se = A.split(ne).join('').match(R) || []),
                    (G = se.length),
                    j > G--)
                  )
                    for (; ++G < j; ) se[G] = h ? se[((G - 1) / 2) | 0] : v[G];
                  return (
                    _ +
                    se.join(E) +
                    E +
                    ne +
                    b +
                    (A.indexOf('inset') !== -1 ? ' inset' : '')
                  );
                }),
                H)
              : ((H = function (A) {
                  var ne, se, G;
                  if (typeof A == 'number') A += F;
                  else if (p && k.test(A)) {
                    for (
                      se = A.replace(k, '|').split('|'), G = 0;
                      G < se.length;
                      G++
                    )
                      se[G] = H(se[G]);
                    return se.join(',');
                  }
                  if (
                    ((ne = A.match(E === ',' ? R : s) || []),
                    (G = ne.length),
                    j > G--)
                  )
                    for (; ++G < j; ) ne[G] = h ? ne[((G - 1) / 2) | 0] : v[G];
                  return (
                    ((_ && A !== 'none' && A.substr(0, A.indexOf(ne[0]))) ||
                      _) +
                    ne.join(E) +
                    b
                  );
                }),
                H)
            : function (A) {
                return A;
              };
        },
        lt = function (i) {
          return (
            (i = i.split(',')),
            function (t, h, p, a, v, _, b) {
              var E = (h + '').split(' '),
                j;
              for (b = {}, j = 0; j < 4; j++)
                b[i[j]] = E[j] = E[j] || E[((j - 1) / 2) >> 0];
              return a.parse(t, b, v, _);
            }
          );
        };
      U._setPluginRatio = function (i) {
        this.plugin.setRatio(i);
        for (
          var t = this.data,
            h = t.proxy,
            p = t.firstMPT,
            a = 1e-6,
            v,
            _,
            b,
            E,
            j;
          p;

        )
          (v = h[p.v]),
            p.r ? (v = p.r(v)) : v < a && v > -a && (v = 0),
            (p.t[p.p] = v),
            (p = p._next);
        if (
          (t.autoRotate &&
            (t.autoRotate.rotation = t.mod
              ? t.mod.call(this._tween, h.rotation, this.t, this._tween)
              : h.rotation),
          i === 1 || i === 0)
        )
          for (p = t.firstMPT, j = i === 1 ? 'e' : 'b'; p; ) {
            if (((_ = p.t), !_.type)) _[j] = _.s + _.xs0;
            else if (_.type === 1) {
              for (E = _.xs0 + _.s + _.xs1, b = 1; b < _.l; b++)
                E += _['xn' + b] + _['xs' + (b + 1)];
              _[j] = E;
            }
            p = p._next;
          }
      };
      var ht = function (i, t, h, p, a) {
        (this.t = i),
          (this.p = t),
          (this.v = h),
          (this.r = a),
          p && ((p._prev = this), (this._next = p));
      };
      U._parseToProxy = function (i, t, h, p, a, v) {
        var _ = p,
          b = {},
          E = {},
          j = h._transform,
          F = le,
          H,
          A,
          ne,
          se,
          G;
        for (
          h._transform = null,
            le = t,
            p = G = h.parse(i, t, p, a),
            le = F,
            v &&
              ((h._transform = j),
              _ && ((_._prev = null), _._prev && (_._prev._next = null)));
          p && p !== _;

        ) {
          if (
            p.type <= 1 &&
            ((A = p.p),
            (E[A] = p.s + p.c),
            (b[A] = p.s),
            v || ((se = new ht(p, 's', A, se, p.r)), (p.c = 0)),
            p.type === 1)
          )
            for (H = p.l; --H > 0; )
              (ne = 'xn' + H),
                (A = p.p + '_' + ne),
                (E[A] = p.data[ne]),
                (b[A] = p[ne]),
                v || (se = new ht(p, ne, A, se, p.rxp[ne]));
          p = p._next;
        }
        return { proxy: b, end: E, firstMPT: se, pt: G };
      };
      var Ye = (U.CSSPropTween = function (i, t, h, p, a, v, _, b, E, j, F) {
          (this.t = i),
            (this.p = t),
            (this.s = h),
            (this.c = p),
            (this.n = _ || t),
            i instanceof Ye || B.push(this.n),
            (this.r = b && (typeof b == 'function' ? b : Math.round)),
            (this.type = v || 0),
            E && ((this.pr = E), (N = !0)),
            (this.b = j === void 0 ? h : j),
            (this.e = F === void 0 ? h + p : F),
            a && ((this._next = a), (a._prev = this));
        }),
        Dt = function (i, t, h, p, a, v) {
          var _ = new Ye(i, t, h, p - h, a, -1, v);
          return (_.b = h), (_.e = _.xs0 = p), _;
        },
        Rt = (w.parseComplex = function (i, t, h, p, a, v, _, b, E, j) {
          (h = h || v || ''),
            typeof p == 'function' && (p = p(be, me)),
            (_ = new Ye(i, t, 0, 0, _, j ? 2 : 1, null, !1, b, h, p)),
            (p += ''),
            a &&
              ge.test(p + h) &&
              ((p = [h, p]), w.colorStringFilter(p), (h = p[0]), (p = p[1]));
          var F = h.split(', ').join(',').split(' '),
            H = p.split(', ').join(',').split(' '),
            A = F.length,
            ne = Ee !== !1,
            se,
            G,
            ae,
            V,
            oe,
            ye,
            we,
            ve,
            Te,
            Se,
            Fe,
            Pe,
            Le;
          for (
            (p.indexOf(',') !== -1 || h.indexOf(',') !== -1) &&
              ((p + h).indexOf('rgb') !== -1 || (p + h).indexOf('hsl') !== -1
                ? ((F = F.join(' ').replace(k, ', ').split(' ')),
                  (H = H.join(' ').replace(k, ', ').split(' ')))
                : ((F = F.join(' ').split(',').join(', ').split(' ')),
                  (H = H.join(' ').split(',').join(', ').split(' '))),
              (A = F.length)),
              A !== H.length && ((F = (v || '').split(' ')), (A = F.length)),
              _.plugin = E,
              _.setRatio = j,
              ge.lastIndex = 0,
              se = 0;
            se < A;
            se++
          )
            if (
              ((V = F[se]),
              (oe = H[se] + ''),
              (ve = parseFloat(V)),
              ve || ve === 0)
            )
              _.appendXtra(
                '',
                ve,
                Q(oe, ve),
                oe.replace(S, ''),
                ne && oe.indexOf('px') !== -1 ? Math.round : !1,
                !0,
              );
            else if (a && ge.test(V))
              (Pe = oe.indexOf(')') + 1),
                (Pe = ')' + (Pe ? oe.substr(Pe) : '')),
                (Le = oe.indexOf('hsl') !== -1 && te),
                (Se = oe),
                (V = ce(V, Le)),
                (oe = ce(oe, Le)),
                (Te = V.length + oe.length > 6),
                Te && !te && oe[3] === 0
                  ? ((_['xs' + _.l] += _.l ? ' transparent' : 'transparent'),
                    (_.e = _.e.split(H[se]).join('transparent')))
                  : (te || (Te = !1),
                    Le
                      ? _.appendXtra(
                          Se.substr(0, Se.indexOf('hsl')) +
                            (Te ? 'hsla(' : 'hsl('),
                          V[0],
                          Q(oe[0], V[0]),
                          ',',
                          !1,
                          !0,
                        )
                          .appendXtra('', V[1], Q(oe[1], V[1]), '%,', !1)
                          .appendXtra(
                            '',
                            V[2],
                            Q(oe[2], V[2]),
                            Te ? '%,' : '%' + Pe,
                            !1,
                          )
                      : _.appendXtra(
                          Se.substr(0, Se.indexOf('rgb')) +
                            (Te ? 'rgba(' : 'rgb('),
                          V[0],
                          oe[0] - V[0],
                          ',',
                          Math.round,
                          !0,
                        )
                          .appendXtra('', V[1], oe[1] - V[1], ',', Math.round)
                          .appendXtra(
                            '',
                            V[2],
                            oe[2] - V[2],
                            Te ? ',' : Pe,
                            Math.round,
                          ),
                    Te &&
                      ((V = V.length < 4 ? 1 : V[3]),
                      _.appendXtra(
                        '',
                        V,
                        (oe.length < 4 ? 1 : oe[3]) - V,
                        Pe,
                        !1,
                      ))),
                (ge.lastIndex = 0);
            else if (((ye = V.match(g)), !ye))
              _['xs' + _.l] += _.l || _['xs' + _.l] ? ' ' + oe : oe;
            else {
              if (((we = oe.match(S)), !we || we.length !== ye.length))
                return _;
              for (ae = 0, G = 0; G < ye.length; G++)
                (Fe = ye[G]),
                  (Se = V.indexOf(Fe, ae)),
                  _.appendXtra(
                    V.substr(ae, Se - ae),
                    Number(Fe),
                    Q(we[G], Fe),
                    '',
                    ne && V.substr(Se + Fe.length, 2) === 'px'
                      ? Math.round
                      : !1,
                    G === 0,
                  ),
                  (ae = Se + Fe.length);
              _['xs' + _.l] += V.substr(ae);
            }
          if (p.indexOf('=') !== -1 && _.data) {
            for (Pe = _.xs0 + _.data.s, se = 1; se < _.l; se++)
              Pe += _['xs' + se] + _.data['xn' + se];
            _.e = Pe + _['xs' + se];
          }
          return _.l || ((_.type = -1), (_.xs0 = _.e)), _.xfirst || _;
        }),
        $e = 9;
      for (o = Ye.prototype, o.l = o.pr = 0; --$e > 0; )
        (o['xn' + $e] = 0), (o['xs' + $e] = '');
      (o.xs0 = ''),
        (o._next =
          o._prev =
          o.xfirst =
          o.data =
          o.plugin =
          o.setRatio =
          o.rxp =
            null),
        (o.appendXtra = function (i, t, h, p, a, v) {
          var _ = this,
            b = _.l;
          return (
            (_['xs' + b] += v && (b || _['xs' + b]) ? ' ' + i : i || ''),
            !h && b !== 0 && !_.plugin
              ? ((_['xs' + b] += t + (p || '')), _)
              : (_.l++,
                (_.type = _.setRatio ? 2 : 1),
                (_['xs' + _.l] = p || ''),
                b > 0
                  ? ((_.data['xn' + b] = t + h),
                    (_.rxp['xn' + b] = a),
                    (_['xn' + b] = t),
                    _.plugin ||
                      ((_.xfirst = new Ye(
                        _,
                        'xn' + b,
                        t,
                        h,
                        _.xfirst || _,
                        0,
                        _.n,
                        a,
                        _.pr,
                      )),
                      (_.xfirst.xs0 = 0)),
                    _)
                  : ((_.data = { s: t + h }),
                    (_.rxp = {}),
                    (_.s = t),
                    (_.c = h),
                    (_.r = a),
                    _))
          );
        });
      var Vt = function (i, t) {
          (t = t || {}),
            (this.p = (t.prefix && Xe(i)) || i),
            (P[i] = P[this.p] = this),
            (this.format =
              t.formatter ||
              Ne(t.defaultValue, t.color, t.collapsible, t.multi)),
            t.parser && (this.parse = t.parser),
            (this.clrs = t.color),
            (this.multi = t.multi),
            (this.keyword = t.keyword),
            (this.dflt = t.defaultValue),
            (this.allowFunc = t.allowFunc),
            (this.pr = t.priority || 0);
        },
        Be = (U._registerComplexSpecialProp = function (i, t, h) {
          typeof t != 'object' && (t = { parser: h });
          var p = i.split(','),
            a = t.defaultValue,
            v;
          for (h = h || [a], v = 0; v < p.length; v++)
            (t.prefix = v === 0 && t.prefix),
              (t.defaultValue = h[v] || a),
              new Vt(p[v], t);
        }),
        ai = (U._registerPluginProp = function (i) {
          if (!P[i]) {
            var t = i.charAt(0).toUpperCase() + i.substr(1) + 'Plugin';
            Be(i, {
              parser: function (h, p, a, v, _, b, E) {
                var j = O.com.greensock.plugins[t];
                return j
                  ? (j._cssRegister(), P[a].parse(h, p, a, v, _, b, E))
                  : (Ce('Error: ' + t + ' js file not loaded.'), _);
              },
            });
          }
        });
      (o = Vt.prototype),
        (o.parseComplex = function (i, t, h, p, a, v) {
          var _ = this.keyword,
            b,
            E,
            j,
            F,
            H,
            A;
          if (
            (this.multi &&
              (k.test(h) || k.test(t)
                ? ((E = t.replace(k, '|').split('|')),
                  (j = h.replace(k, '|').split('|')))
                : _ && ((E = [t]), (j = [h]))),
            j)
          ) {
            for (
              F = j.length > E.length ? j.length : E.length, b = 0;
              b < F;
              b++
            )
              (t = E[b] = E[b] || this.dflt),
                (h = j[b] = j[b] || this.dflt),
                _ &&
                  ((H = t.indexOf(_)),
                  (A = h.indexOf(_)),
                  H !== A &&
                    (A === -1
                      ? (E[b] = E[b].split(_).join(''))
                      : H === -1 && (E[b] += ' ' + _)));
            (t = E.join(', ')), (h = j.join(', '));
          }
          return Rt(i, this.p, t, h, this.clrs, this.dflt, p, this.pr, a, v);
        }),
        (o.parse = function (i, t, h, p, a, v, _) {
          return this.parseComplex(
            i.style,
            this.format(Ae(i, this.p, C, !1, this.dflt)),
            this.format(t),
            a,
            v,
          );
        }),
        (w.registerSpecialProp = function (i, t, h) {
          Be(i, {
            parser: function (p, a, v, _, b, E, j) {
              var F = new Ye(p, v, 0, 0, b, 2, v, !1, h);
              return (F.plugin = E), (F.setRatio = t(p, a, _._tween, v)), F;
            },
            priority: h,
          });
        }),
        (w.useSVGTransformAttr = !0);
      var $t =
          'scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent'.split(
            ',',
          ),
        Ze = Xe('transform'),
        Bt = De + 'transform',
        Ot = Xe('transformOrigin'),
        ft = Xe('perspective') !== null,
        Ft = (U.Transform = function () {
          (this.perspective = parseFloat(w.defaultTransformPerspective) || 0),
            (this.force3D =
              w.defaultForce3D === !1 || !ft ? !1 : w.defaultForce3D || 'auto');
        }),
        oi = Ge.SVGElement,
        pt,
        Zt = function (i, t, h) {
          var p = fe.createElementNS('http://www.w3.org/2000/svg', i),
            a = /([a-z])([A-Z])/g,
            v;
          for (v in h)
            p.setAttributeNS(null, v.replace(a, '$1-$2').toLowerCase(), h[v]);
          return t.appendChild(p), p;
        },
        mt = fe.documentElement || {},
        li = (function () {
          var i = X || (/Android/i.test(pe) && !Ge.chrome),
            t,
            h,
            p;
          return (
            fe.createElementNS &&
              mt.appendChild &&
              !i &&
              ((t = Zt('svg', mt)),
              (h = Zt('rect', t, { width: 100, height: 50, x: 100 })),
              (p = h.getBoundingClientRect().width),
              (h.style[Ot] = '50% 50%'),
              (h.style[Ze] = 'scaleX(0.5)'),
              (i = p === h.getBoundingClientRect().width && !(at && ft)),
              mt.removeChild(t)),
            i
          );
        })(),
        Xt = function (i, t, h, p, a, v) {
          var _ = i._gsTransform,
            b = Yt(i, !0),
            E,
            j,
            F,
            H,
            A,
            ne,
            se,
            G,
            ae,
            V,
            oe,
            ye,
            we,
            ve;
          _ && ((we = _.xOrigin), (ve = _.yOrigin)),
            (!p || (E = p.split(' ')).length < 2) &&
              ((se = i.getBBox()),
              se.x === 0 &&
                se.y === 0 &&
                se.width + se.height === 0 &&
                (se = {
                  x:
                    parseFloat(
                      i.hasAttribute('x')
                        ? i.getAttribute('x')
                        : i.hasAttribute('cx')
                        ? i.getAttribute('cx')
                        : 0,
                    ) || 0,
                  y:
                    parseFloat(
                      i.hasAttribute('y')
                        ? i.getAttribute('y')
                        : i.hasAttribute('cy')
                        ? i.getAttribute('cy')
                        : 0,
                    ) || 0,
                  width: 0,
                  height: 0,
                }),
              (t = q(t).split(' ')),
              (E = [
                (t[0].indexOf('%') !== -1
                  ? (parseFloat(t[0]) / 100) * se.width
                  : parseFloat(t[0])) + se.x,
                (t[1].indexOf('%') !== -1
                  ? (parseFloat(t[1]) / 100) * se.height
                  : parseFloat(t[1])) + se.y,
              ])),
            (h.xOrigin = H = parseFloat(E[0])),
            (h.yOrigin = A = parseFloat(E[1])),
            p &&
              b !== qt &&
              ((ne = b[0]),
              (se = b[1]),
              (G = b[2]),
              (ae = b[3]),
              (V = b[4]),
              (oe = b[5]),
              (ye = ne * ae - se * G),
              ye &&
                ((j = H * (ae / ye) + A * (-G / ye) + (G * oe - ae * V) / ye),
                (F = H * (-se / ye) + A * (ne / ye) - (ne * oe - se * V) / ye),
                (H = h.xOrigin = E[0] = j),
                (A = h.yOrigin = E[1] = F))),
            _ &&
              (v && ((h.xOffset = _.xOffset), (h.yOffset = _.yOffset), (_ = h)),
              a || (a !== !1 && w.defaultSmoothOrigin !== !1)
                ? ((j = H - we),
                  (F = A - ve),
                  (_.xOffset += j * b[0] + F * b[2] - j),
                  (_.yOffset += j * b[1] + F * b[3] - F))
                : (_.xOffset = _.yOffset = 0)),
            v || i.setAttribute('data-svg-origin', E.join(' '));
        },
        Qt = function (i) {
          var t = ke(
              'svg',
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute('xmlns')) ||
                'http://www.w3.org/2000/svg',
            ),
            h = this.parentNode,
            p = this.nextSibling,
            a = this.style.cssText,
            v;
          if (
            (mt.appendChild(t),
            t.appendChild(this),
            (this.style.display = 'block'),
            i)
          )
            try {
              (v = this.getBBox()),
                (this._originalGetBBox = this.getBBox),
                (this.getBBox = Qt);
            } catch {}
          else this._originalGetBBox && (v = this._originalGetBBox());
          return (
            p ? h.insertBefore(this, p) : h.appendChild(this),
            mt.removeChild(t),
            (this.style.cssText = a),
            v
          );
        },
        fi = function (i) {
          try {
            return i.getBBox();
          } catch {
            return Qt.call(i, !0);
          }
        },
        jt = function (i) {
          return !!(
            oi &&
            i.getCTM &&
            (!i.parentNode || i.ownerSVGElement) &&
            fi(i)
          );
        },
        qt = [1, 0, 0, 1, 0, 0],
        Yt = function (i, t) {
          var h = i._gsTransform || new Ft(),
            p = 1e5,
            a = i.style,
            v,
            _,
            b,
            E,
            j,
            F,
            H;
          if (
            (Ze
              ? (_ = Ae(i, Bt, null, !0))
              : i.currentStyle &&
                ((_ = i.currentStyle.filter.match(I)),
                (_ =
                  _ && _.length === 4
                    ? [
                        _[0].substr(4),
                        Number(_[2].substr(4)),
                        Number(_[1].substr(4)),
                        _[3].substr(4),
                        h.x || 0,
                        h.y || 0,
                      ].join(',')
                    : '')),
            (v = !_ || _ === 'none' || _ === 'matrix(1, 0, 0, 1, 0, 0)'),
            Ze &&
              v &&
              !i.offsetParent &&
              i !== mt &&
              ((E = a.display),
              (a.display = 'block'),
              (H = i.parentNode),
              (!H || !i.offsetParent) &&
                ((j = 1), (F = i.nextSibling), mt.appendChild(i)),
              (_ = Ae(i, Bt, null, !0)),
              (v = !_ || _ === 'none' || _ === 'matrix(1, 0, 0, 1, 0, 0)'),
              E ? (a.display = E) : At(a, 'display'),
              j &&
                (F
                  ? H.insertBefore(i, F)
                  : H
                  ? H.appendChild(i)
                  : mt.removeChild(i))),
            (h.svg || (i.getCTM && jt(i))) &&
              (v &&
                (a[Ze] + '').indexOf('matrix') !== -1 &&
                ((_ = a[Ze]), (v = 0)),
              (b = i.getAttribute('transform')),
              v &&
                b &&
                ((b = i.transform.baseVal.consolidate().matrix),
                (_ =
                  'matrix(' +
                  b.a +
                  ',' +
                  b.b +
                  ',' +
                  b.c +
                  ',' +
                  b.d +
                  ',' +
                  b.e +
                  ',' +
                  b.f +
                  ')'),
                (v = 0))),
            v)
          )
            return qt;
          for (b = (_ || '').match(g) || [], $e = b.length; --$e > -1; )
            (E = Number(b[$e])),
              (b[$e] = (j = E - (E |= 0))
                ? ((j * p + (j < 0 ? -0.5 : 0.5)) | 0) / p + E
                : E);
          return t && b.length > 6 ? [b[0], b[1], b[4], b[5], b[12], b[13]] : b;
        },
        Ct = (U.getTransform = function (i, t, h, p) {
          if (i._gsTransform && h && !p) return i._gsTransform;
          var a = h ? i._gsTransform || new Ft() : new Ft(),
            v = a.scaleX < 0,
            _ = 2e-5,
            b = 1e5,
            E =
              (ft &&
                (parseFloat(Ae(i, Ot, t, !1, '0 0 0').split(' ')[2]) ||
                  a.zOrigin)) ||
              0,
            j = parseFloat(w.defaultTransformPerspective) || 0,
            F,
            H,
            A,
            ne,
            se,
            G;
          if (
            ((a.svg = !!(i.getCTM && jt(i))),
            a.svg &&
              (Xt(
                i,
                Ae(i, Ot, t, !1, '50% 50%') + '',
                a,
                i.getAttribute('data-svg-origin'),
              ),
              (pt = w.useSVGTransformAttr || li)),
            (F = Yt(i)),
            F !== qt)
          ) {
            if (F.length === 16) {
              var ae = F[0],
                V = F[1],
                oe = F[2],
                ye = F[3],
                we = F[4],
                ve = F[5],
                Te = F[6],
                Se = F[7],
                Fe = F[8],
                Pe = F[9],
                Le = F[10],
                ct = F[12],
                _t = F[13],
                Ke = F[14],
                tt = F[11],
                _e = Math.atan2(Te, Le),
                je,
                qe,
                dt,
                ze,
                Oe;
              a.zOrigin &&
                ((Ke = -a.zOrigin),
                (ct = Fe * Ke - F[12]),
                (_t = Pe * Ke - F[13]),
                (Ke = Le * Ke + a.zOrigin - F[14])),
                (a.rotationX = _e * ie),
                _e &&
                  ((ze = Math.cos(-_e)),
                  (Oe = Math.sin(-_e)),
                  (je = we * ze + Fe * Oe),
                  (qe = ve * ze + Pe * Oe),
                  (dt = Te * ze + Le * Oe),
                  (Fe = we * -Oe + Fe * ze),
                  (Pe = ve * -Oe + Pe * ze),
                  (Le = Te * -Oe + Le * ze),
                  (tt = Se * -Oe + tt * ze),
                  (we = je),
                  (ve = qe),
                  (Te = dt)),
                (_e = Math.atan2(-oe, Le)),
                (a.rotationY = _e * ie),
                _e &&
                  ((ze = Math.cos(-_e)),
                  (Oe = Math.sin(-_e)),
                  (je = ae * ze - Fe * Oe),
                  (qe = V * ze - Pe * Oe),
                  (dt = oe * ze - Le * Oe),
                  (Pe = V * Oe + Pe * ze),
                  (Le = oe * Oe + Le * ze),
                  (tt = ye * Oe + tt * ze),
                  (ae = je),
                  (V = qe),
                  (oe = dt)),
                (_e = Math.atan2(V, ae)),
                (a.rotation = _e * ie),
                _e &&
                  ((ze = Math.cos(_e)),
                  (Oe = Math.sin(_e)),
                  (je = ae * ze + V * Oe),
                  (qe = we * ze + ve * Oe),
                  (dt = Fe * ze + Pe * Oe),
                  (V = V * ze - ae * Oe),
                  (ve = ve * ze - we * Oe),
                  (Pe = Pe * ze - Fe * Oe),
                  (ae = je),
                  (we = qe),
                  (Fe = dt)),
                a.rotationX &&
                  Math.abs(a.rotationX) + Math.abs(a.rotation) > 359.9 &&
                  ((a.rotationX = a.rotation = 0),
                  (a.rotationY = 180 - a.rotationY)),
                (_e = Math.atan2(we, ve)),
                (a.scaleX =
                  ((Math.sqrt(ae * ae + V * V + oe * oe) * b + 0.5) | 0) / b),
                (a.scaleY = ((Math.sqrt(ve * ve + Te * Te) * b + 0.5) | 0) / b),
                (a.scaleZ =
                  ((Math.sqrt(Fe * Fe + Pe * Pe + Le * Le) * b + 0.5) | 0) / b),
                (ae /= a.scaleX),
                (we /= a.scaleY),
                (V /= a.scaleX),
                (ve /= a.scaleY),
                Math.abs(_e) > _
                  ? ((a.skewX = _e * ie),
                    (we = 0),
                    a.skewType !== 'simple' && (a.scaleY *= 1 / Math.cos(_e)))
                  : (a.skewX = 0),
                (a.perspective = tt ? 1 / (tt < 0 ? -tt : tt) : 0),
                (a.x = ct),
                (a.y = _t),
                (a.z = Ke),
                a.svg &&
                  ((a.x -= a.xOrigin - (a.xOrigin * ae - a.yOrigin * we)),
                  (a.y -= a.yOrigin - (a.yOrigin * V - a.xOrigin * ve)));
            } else if (
              !ft ||
              p ||
              !F.length ||
              a.x !== F[4] ||
              a.y !== F[5] ||
              (!a.rotationX && !a.rotationY)
            ) {
              var Qe = F.length >= 6,
                ut = Qe ? F[0] : 1,
                st = F[1] || 0,
                kt = F[2] || 0,
                Et = Qe ? F[3] : 1;
              (a.x = F[4] || 0),
                (a.y = F[5] || 0),
                (A = Math.sqrt(ut * ut + st * st)),
                (ne = Math.sqrt(Et * Et + kt * kt)),
                (se = ut || st ? Math.atan2(st, ut) * ie : a.rotation || 0),
                (G = kt || Et ? Math.atan2(kt, Et) * ie + se : a.skewX || 0),
                (a.scaleX = A),
                (a.scaleY = ne),
                (a.rotation = se),
                (a.skewX = G),
                ft &&
                  ((a.rotationX = a.rotationY = a.z = 0),
                  (a.perspective = j),
                  (a.scaleZ = 1)),
                a.svg &&
                  ((a.x -= a.xOrigin - (a.xOrigin * ut + a.yOrigin * kt)),
                  (a.y -= a.yOrigin - (a.xOrigin * st + a.yOrigin * Et)));
            }
            Math.abs(a.skewX) > 90 &&
              Math.abs(a.skewX) < 270 &&
              (v
                ? ((a.scaleX *= -1),
                  (a.skewX += a.rotation <= 0 ? 180 : -180),
                  (a.rotation += a.rotation <= 0 ? 180 : -180))
                : ((a.scaleY *= -1), (a.skewX += a.skewX <= 0 ? 180 : -180))),
              (a.zOrigin = E);
            for (H in a) a[H] < _ && a[H] > -_ && (a[H] = 0);
          }
          return (
            h &&
              ((i._gsTransform = a),
              a.svg &&
                (pt && i.style[Ze]
                  ? Re.delayedCall(0.001, function () {
                      At(i.style, Ze);
                    })
                  : !pt &&
                    i.getAttribute('transform') &&
                    Re.delayedCall(0.001, function () {
                      i.removeAttribute('transform');
                    }))),
            a
          );
        }),
        ui = function (i) {
          var t = this.data,
            h = -t.rotation * W,
            p = h + t.skewX * W,
            a = 1e5,
            v = ((Math.cos(h) * t.scaleX * a) | 0) / a,
            _ = ((Math.sin(h) * t.scaleX * a) | 0) / a,
            b = ((Math.sin(p) * -t.scaleY * a) | 0) / a,
            E = ((Math.cos(p) * t.scaleY * a) | 0) / a,
            j = this.t.style,
            F = this.t.currentStyle,
            H,
            A;
          if (F) {
            (A = _), (_ = -b), (b = -A), (H = F.filter), (j.filter = '');
            var ne = this.t.offsetWidth,
              se = this.t.offsetHeight,
              G = F.position !== 'absolute',
              ae =
                'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                v +
                ', M12=' +
                _ +
                ', M21=' +
                b +
                ', M22=' +
                E,
              V = t.x + (ne * t.xPercent) / 100,
              oe = t.y + (se * t.yPercent) / 100,
              ye,
              we;
            if (
              (t.ox != null &&
                ((ye = (t.oxp ? ne * t.ox * 0.01 : t.ox) - ne / 2),
                (we = (t.oyp ? se * t.oy * 0.01 : t.oy) - se / 2),
                (V += ye - (ye * v + we * _)),
                (oe += we - (ye * b + we * E))),
              G
                ? ((ye = ne / 2),
                  (we = se / 2),
                  (ae +=
                    ', Dx=' +
                    (ye - (ye * v + we * _) + V) +
                    ', Dy=' +
                    (we - (ye * b + we * E) + oe) +
                    ')'))
                : (ae += ", sizingMethod='auto expand')"),
              H.indexOf('DXImageTransform.Microsoft.Matrix(') !== -1
                ? (j.filter = H.replace(Y, ae))
                : (j.filter = ae + ' ' + H),
              (i === 0 || i === 1) &&
                v === 1 &&
                _ === 0 &&
                b === 0 &&
                E === 1 &&
                (!G || ae.indexOf('Dx=0, Dy=0') !== -1) &&
                (!T.test(H) || parseFloat(RegExp.$1) === 100) &&
                H.indexOf(H.indexOf('Alpha')) === -1 &&
                j.removeAttribute('filter'),
              !G)
            ) {
              var ve = X < 8 ? 1 : -1,
                Te,
                Se,
                Fe;
              for (
                ye = t.ieOffsetX || 0,
                  we = t.ieOffsetY || 0,
                  t.ieOffsetX = Math.round(
                    (ne - ((v < 0 ? -v : v) * ne + (_ < 0 ? -_ : _) * se)) / 2 +
                      V,
                  ),
                  t.ieOffsetY = Math.round(
                    (se - ((E < 0 ? -E : E) * se + (b < 0 ? -b : b) * ne)) / 2 +
                      oe,
                  ),
                  $e = 0;
                $e < 4;
                $e++
              )
                (Se = f[$e]),
                  (Te = F[Se]),
                  (A =
                    Te.indexOf('px') !== -1
                      ? parseFloat(Te)
                      : et(this.t, Se, parseFloat(Te), Te.replace(u, '')) || 0),
                  A !== t[Se]
                    ? (Fe = $e < 2 ? -t.ieOffsetX : -t.ieOffsetY)
                    : (Fe = $e < 2 ? ye - t.ieOffsetX : we - t.ieOffsetY),
                  (j[Se] =
                    (t[Se] = Math.round(
                      A - Fe * ($e === 0 || $e === 2 ? 1 : ve),
                    )) + 'px');
            }
          }
        },
        hi =
          (U.set3DTransformRatio =
          U.setTransformRatio =
            function (i) {
              var t = this.data,
                h = this.t.style,
                p = t.rotation,
                a = t.rotationX,
                v = t.rotationY,
                _ = t.scaleX,
                b = t.scaleY,
                E = t.scaleZ,
                j = t.x,
                F = t.y,
                H = t.z,
                A = t.svg,
                ne = t.perspective,
                se = t.force3D,
                G = t.skewY,
                ae = t.skewX,
                V,
                oe,
                ye,
                we,
                ve,
                Te,
                Se,
                Fe,
                Pe,
                Le,
                ct,
                _t,
                Ke,
                tt,
                _e,
                je,
                qe,
                dt,
                ze,
                Oe,
                Qe,
                ut,
                st;
              if (
                (G && ((ae += G), (p += G)),
                ((((i === 1 || i === 0) &&
                  se === 'auto' &&
                  (this.tween._totalTime === this.tween._totalDuration ||
                    !this.tween._totalTime)) ||
                  !se) &&
                  !H &&
                  !ne &&
                  !v &&
                  !a &&
                  E === 1) ||
                  (pt && A) ||
                  !ft)
              ) {
                p || ae || A
                  ? ((p *= W),
                    (ut = ae * W),
                    (st = 1e5),
                    (oe = Math.cos(p) * _),
                    (ve = Math.sin(p) * _),
                    (ye = Math.sin(p - ut) * -b),
                    (Te = Math.cos(p - ut) * b),
                    ut &&
                      t.skewType === 'simple' &&
                      ((V = Math.tan(ut - G * W)),
                      (V = Math.sqrt(1 + V * V)),
                      (ye *= V),
                      (Te *= V),
                      G &&
                        ((V = Math.tan(G * W)),
                        (V = Math.sqrt(1 + V * V)),
                        (oe *= V),
                        (ve *= V))),
                    A &&
                      ((j +=
                        t.xOrigin -
                        (t.xOrigin * oe + t.yOrigin * ye) +
                        t.xOffset),
                      (F +=
                        t.yOrigin -
                        (t.xOrigin * ve + t.yOrigin * Te) +
                        t.yOffset),
                      pt &&
                        (t.xPercent || t.yPercent) &&
                        ((_e = this.t.getBBox()),
                        (j += t.xPercent * 0.01 * _e.width),
                        (F += t.yPercent * 0.01 * _e.height)),
                      (_e = 1e-6),
                      j < _e && j > -_e && (j = 0),
                      F < _e && F > -_e && (F = 0)),
                    (ze =
                      ((oe * st) | 0) / st +
                      ',' +
                      ((ve * st) | 0) / st +
                      ',' +
                      ((ye * st) | 0) / st +
                      ',' +
                      ((Te * st) | 0) / st +
                      ',' +
                      j +
                      ',' +
                      F +
                      ')'),
                    A && pt
                      ? this.t.setAttribute('transform', 'matrix(' + ze)
                      : (h[Ze] =
                          (t.xPercent || t.yPercent
                            ? 'translate(' +
                              t.xPercent +
                              '%,' +
                              t.yPercent +
                              '%) matrix('
                            : 'matrix(') + ze))
                  : (h[Ze] =
                      (t.xPercent || t.yPercent
                        ? 'translate(' +
                          t.xPercent +
                          '%,' +
                          t.yPercent +
                          '%) matrix('
                        : 'matrix(') +
                      _ +
                      ',0,0,' +
                      b +
                      ',' +
                      j +
                      ',' +
                      F +
                      ')');
                return;
              }
              if (
                (at &&
                  ((_e = 1e-4),
                  _ < _e && _ > -_e && (_ = E = 2e-5),
                  b < _e && b > -_e && (b = E = 2e-5),
                  ne && !t.z && !t.rotationX && !t.rotationY && (ne = 0)),
                p || ae)
              )
                (p *= W),
                  (je = oe = Math.cos(p)),
                  (qe = ve = Math.sin(p)),
                  ae &&
                    ((p -= ae * W),
                    (je = Math.cos(p)),
                    (qe = Math.sin(p)),
                    t.skewType === 'simple' &&
                      ((V = Math.tan((ae - G) * W)),
                      (V = Math.sqrt(1 + V * V)),
                      (je *= V),
                      (qe *= V),
                      t.skewY &&
                        ((V = Math.tan(G * W)),
                        (V = Math.sqrt(1 + V * V)),
                        (oe *= V),
                        (ve *= V)))),
                  (ye = -qe),
                  (Te = je);
              else if (!v && !a && E === 1 && !ne && !A) {
                h[Ze] =
                  (t.xPercent || t.yPercent
                    ? 'translate(' +
                      t.xPercent +
                      '%,' +
                      t.yPercent +
                      '%) translate3d('
                    : 'translate3d(') +
                  j +
                  'px,' +
                  F +
                  'px,' +
                  H +
                  'px)' +
                  (_ !== 1 || b !== 1 ? ' scale(' + _ + ',' + b + ')' : '');
                return;
              } else (oe = Te = 1), (ye = ve = 0);
              (Le = 1),
                (we = Se = Fe = Pe = ct = _t = 0),
                (Ke = ne ? -1 / ne : 0),
                (tt = t.zOrigin),
                (_e = 1e-6),
                (Oe = ','),
                (Qe = '0'),
                (p = v * W),
                p &&
                  ((je = Math.cos(p)),
                  (qe = Math.sin(p)),
                  (Fe = -qe),
                  (ct = Ke * -qe),
                  (we = oe * qe),
                  (Se = ve * qe),
                  (Le = je),
                  (Ke *= je),
                  (oe *= je),
                  (ve *= je)),
                (p = a * W),
                p &&
                  ((je = Math.cos(p)),
                  (qe = Math.sin(p)),
                  (V = ye * je + we * qe),
                  (dt = Te * je + Se * qe),
                  (Pe = Le * qe),
                  (_t = Ke * qe),
                  (we = ye * -qe + we * je),
                  (Se = Te * -qe + Se * je),
                  (Le = Le * je),
                  (Ke = Ke * je),
                  (ye = V),
                  (Te = dt)),
                E !== 1 && ((we *= E), (Se *= E), (Le *= E), (Ke *= E)),
                b !== 1 && ((ye *= b), (Te *= b), (Pe *= b), (_t *= b)),
                _ !== 1 && ((oe *= _), (ve *= _), (Fe *= _), (ct *= _)),
                (tt || A) &&
                  (tt &&
                    ((j += we * -tt), (F += Se * -tt), (H += Le * -tt + tt)),
                  A &&
                    ((j +=
                      t.xOrigin -
                      (t.xOrigin * oe + t.yOrigin * ye) +
                      t.xOffset),
                    (F +=
                      t.yOrigin -
                      (t.xOrigin * ve + t.yOrigin * Te) +
                      t.yOffset)),
                  j < _e && j > -_e && (j = Qe),
                  F < _e && F > -_e && (F = Qe),
                  H < _e && H > -_e && (H = 0)),
                (ze =
                  t.xPercent || t.yPercent
                    ? 'translate(' +
                      t.xPercent +
                      '%,' +
                      t.yPercent +
                      '%) matrix3d('
                    : 'matrix3d('),
                (ze +=
                  (oe < _e && oe > -_e ? Qe : oe) +
                  Oe +
                  (ve < _e && ve > -_e ? Qe : ve) +
                  Oe +
                  (Fe < _e && Fe > -_e ? Qe : Fe)),
                (ze +=
                  Oe +
                  (ct < _e && ct > -_e ? Qe : ct) +
                  Oe +
                  (ye < _e && ye > -_e ? Qe : ye) +
                  Oe +
                  (Te < _e && Te > -_e ? Qe : Te)),
                a || v || E !== 1
                  ? ((ze +=
                      Oe +
                      (Pe < _e && Pe > -_e ? Qe : Pe) +
                      Oe +
                      (_t < _e && _t > -_e ? Qe : _t) +
                      Oe +
                      (we < _e && we > -_e ? Qe : we)),
                    (ze +=
                      Oe +
                      (Se < _e && Se > -_e ? Qe : Se) +
                      Oe +
                      (Le < _e && Le > -_e ? Qe : Le) +
                      Oe +
                      (Ke < _e && Ke > -_e ? Qe : Ke) +
                      Oe))
                  : (ze += ',0,0,0,0,1,0,'),
                (ze += j + Oe + F + Oe + H + Oe + (ne ? 1 + -H / ne : 1) + ')'),
                (h[Ze] = ze);
            });
      (o = Ft.prototype),
        (o.x =
          o.y =
          o.z =
          o.skewX =
          o.skewY =
          o.rotation =
          o.rotationX =
          o.rotationY =
          o.zOrigin =
          o.xPercent =
          o.yPercent =
          o.xOffset =
          o.yOffset =
            0),
        (o.scaleX = o.scaleY = o.scaleZ = 1),
        Be(
          'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin',
          {
            parser: function (i, t, h, p, a, v, _) {
              if (p._lastParsedTransform === _) return a;
              p._lastParsedTransform = _;
              var b = _.scale && typeof _.scale == 'function' ? _.scale : 0;
              b && (_.scale = b(be, i));
              var E = i._gsTransform,
                j = i.style,
                F = 1e-6,
                H = $t.length,
                A = _,
                ne = {},
                se = 'transformOrigin',
                G = Ct(i, C, !0, A.parseTransform),
                ae =
                  A.transform &&
                  (typeof A.transform == 'function'
                    ? A.transform(be, me)
                    : A.transform),
                V,
                oe,
                ye,
                we,
                ve,
                Te,
                Se,
                Fe,
                Pe;
              if (
                ((G.skewType = A.skewType || G.skewType || w.defaultSkewType),
                (p._transform = G),
                'rotationZ' in A && (A.rotation = A.rotationZ),
                ae && typeof ae == 'string' && Ze)
              )
                (oe = ee.style),
                  (oe[Ze] = ae),
                  (oe.display = 'block'),
                  (oe.position = 'absolute'),
                  ae.indexOf('%') !== -1 &&
                    ((oe.width = Ae(i, 'width')),
                    (oe.height = Ae(i, 'height'))),
                  fe.body.appendChild(ee),
                  (V = Ct(ee, null, !1)),
                  G.skewType === 'simple' &&
                    (V.scaleY *= Math.cos(V.skewX * W)),
                  G.svg &&
                    ((Te = G.xOrigin),
                    (Se = G.yOrigin),
                    (V.x -= G.xOffset),
                    (V.y -= G.yOffset),
                    (A.transformOrigin || A.svgOrigin) &&
                      ((ae = {}),
                      Xt(
                        i,
                        q(A.transformOrigin),
                        ae,
                        A.svgOrigin,
                        A.smoothOrigin,
                        !0,
                      ),
                      (Te = ae.xOrigin),
                      (Se = ae.yOrigin),
                      (V.x -= ae.xOffset - G.xOffset),
                      (V.y -= ae.yOffset - G.yOffset)),
                    (Te || Se) &&
                      ((Fe = Yt(ee, !0)),
                      (V.x -= Te - (Te * Fe[0] + Se * Fe[2])),
                      (V.y -= Se - (Te * Fe[1] + Se * Fe[3])))),
                  fe.body.removeChild(ee),
                  V.perspective || (V.perspective = G.perspective),
                  A.xPercent != null &&
                    (V.xPercent = K(A.xPercent, G.xPercent)),
                  A.yPercent != null &&
                    (V.yPercent = K(A.yPercent, G.yPercent));
              else if (typeof A == 'object') {
                if (
                  ((V = {
                    scaleX: K(A.scaleX != null ? A.scaleX : A.scale, G.scaleX),
                    scaleY: K(A.scaleY != null ? A.scaleY : A.scale, G.scaleY),
                    scaleZ: K(A.scaleZ, G.scaleZ),
                    x: K(A.x, G.x),
                    y: K(A.y, G.y),
                    z: K(A.z, G.z),
                    xPercent: K(A.xPercent, G.xPercent),
                    yPercent: K(A.yPercent, G.yPercent),
                    perspective: K(A.transformPerspective, G.perspective),
                  }),
                  (ve = A.directionalRotation),
                  ve != null)
                )
                  if (typeof ve == 'object') for (oe in ve) A[oe] = ve[oe];
                  else A.rotation = ve;
                typeof A.x == 'string' &&
                  A.x.indexOf('%') !== -1 &&
                  ((V.x = 0), (V.xPercent = K(A.x, G.xPercent))),
                  typeof A.y == 'string' &&
                    A.y.indexOf('%') !== -1 &&
                    ((V.y = 0), (V.yPercent = K(A.y, G.yPercent))),
                  (V.rotation = J(
                    'rotation' in A
                      ? A.rotation
                      : 'shortRotation' in A
                      ? A.shortRotation + '_short'
                      : G.rotation,
                    G.rotation,
                    'rotation',
                    ne,
                  )),
                  ft &&
                    ((V.rotationX = J(
                      'rotationX' in A
                        ? A.rotationX
                        : 'shortRotationX' in A
                        ? A.shortRotationX + '_short'
                        : G.rotationX || 0,
                      G.rotationX,
                      'rotationX',
                      ne,
                    )),
                    (V.rotationY = J(
                      'rotationY' in A
                        ? A.rotationY
                        : 'shortRotationY' in A
                        ? A.shortRotationY + '_short'
                        : G.rotationY || 0,
                      G.rotationY,
                      'rotationY',
                      ne,
                    ))),
                  (V.skewX = J(A.skewX, G.skewX)),
                  (V.skewY = J(A.skewY, G.skewY));
              }
              for (
                ft && A.force3D != null && ((G.force3D = A.force3D), (we = !0)),
                  ye =
                    G.force3D ||
                    G.z ||
                    G.rotationX ||
                    G.rotationY ||
                    V.z ||
                    V.rotationX ||
                    V.rotationY ||
                    V.perspective,
                  !ye && A.scale != null && (V.scaleZ = 1);
                --H > -1;

              )
                (Pe = $t[H]),
                  (ae = V[Pe] - G[Pe]),
                  (ae > F || ae < -F || A[Pe] != null || le[Pe] != null) &&
                    ((we = !0),
                    (a = new Ye(G, Pe, G[Pe], ae, a)),
                    Pe in ne && (a.e = ne[Pe]),
                    (a.xs0 = 0),
                    (a.plugin = v),
                    p._overwriteProps.push(a.n));
              return (
                (ae =
                  typeof A.transformOrigin == 'function'
                    ? A.transformOrigin(be, me)
                    : A.transformOrigin),
                G.svg &&
                  (ae || A.svgOrigin) &&
                  ((Te = G.xOffset),
                  (Se = G.yOffset),
                  Xt(i, q(ae), V, A.svgOrigin, A.smoothOrigin),
                  (a = Dt(G, 'xOrigin', (E ? G : V).xOrigin, V.xOrigin, a, se)),
                  (a = Dt(G, 'yOrigin', (E ? G : V).yOrigin, V.yOrigin, a, se)),
                  (Te !== G.xOffset || Se !== G.yOffset) &&
                    ((a = Dt(
                      G,
                      'xOffset',
                      E ? Te : G.xOffset,
                      G.xOffset,
                      a,
                      se,
                    )),
                    (a = Dt(
                      G,
                      'yOffset',
                      E ? Se : G.yOffset,
                      G.yOffset,
                      a,
                      se,
                    ))),
                  (ae = '0px 0px')),
                (ae || (ft && ye && G.zOrigin)) &&
                  (Ze
                    ? ((we = !0),
                      (Pe = Ot),
                      ae ||
                        ((ae = (Ae(i, Pe, C, !1, '50% 50%') + '').split(' ')),
                        (ae = ae[0] + ' ' + ae[1] + ' ' + G.zOrigin + 'px')),
                      (ae += ''),
                      (a = new Ye(j, Pe, 0, 0, a, -1, se)),
                      (a.b = j[Pe]),
                      (a.plugin = v),
                      ft
                        ? ((oe = G.zOrigin),
                          (ae = ae.split(' ')),
                          (G.zOrigin =
                            (ae.length > 2 ? parseFloat(ae[2]) : oe) || 0),
                          (a.xs0 = a.e =
                            ae[0] + ' ' + (ae[1] || '50%') + ' 0px'),
                          (a = new Ye(G, 'zOrigin', 0, 0, a, -1, a.n)),
                          (a.b = oe),
                          (a.xs0 = a.e = G.zOrigin))
                        : (a.xs0 = a.e = ae))
                    : q(ae + '', G)),
                we &&
                  (p._transformType =
                    !(G.svg && pt) && (ye || this._transformType === 3)
                      ? 3
                      : 2),
                b && (_.scale = b),
                a
              );
            },
            allowFunc: !0,
            prefix: !0,
          },
        ),
        Be('boxShadow', {
          defaultValue: '0px 0px 0px 0px #999',
          prefix: !0,
          color: !0,
          multi: !0,
          keyword: 'inset',
        }),
        Be('clipPath', {
          defaultValue: 'inset(0%)',
          prefix: !0,
          multi: !0,
          formatter: Ne('inset(0% 0% 0% 0%)', !1, !0),
        }),
        Be('borderRadius', {
          defaultValue: '0px',
          parser: function (i, t, h, p, a, v) {
            t = this.format(t);
            var _ = [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomRightRadius',
                'borderBottomLeftRadius',
              ],
              b = i.style,
              E,
              j,
              F,
              H,
              A,
              ne,
              se,
              G,
              ae,
              V,
              oe,
              ye,
              we,
              ve,
              Te,
              Se;
            for (
              ae = parseFloat(i.offsetWidth),
                V = parseFloat(i.offsetHeight),
                E = t.split(' '),
                j = 0;
              j < _.length;
              j++
            )
              this.p.indexOf('border') && (_[j] = Xe(_[j])),
                (A = H = Ae(i, _[j], C, !1, '0px')),
                A.indexOf(' ') !== -1 &&
                  ((H = A.split(' ')), (A = H[0]), (H = H[1])),
                (ne = F = E[j]),
                (se = parseFloat(A)),
                (ye = A.substr((se + '').length)),
                (we = ne.charAt(1) === '='),
                we
                  ? ((G = parseInt(ne.charAt(0) + '1', 10)),
                    (ne = ne.substr(2)),
                    (G *= parseFloat(ne)),
                    (oe = ne.substr((G + '').length - (G < 0 ? 1 : 0)) || ''))
                  : ((G = parseFloat(ne)), (oe = ne.substr((G + '').length))),
                oe === '' && (oe = L[h] || ye),
                oe !== ye &&
                  ((ve = et(i, 'borderLeft', se, ye)),
                  (Te = et(i, 'borderTop', se, ye)),
                  oe === '%'
                    ? ((A = (ve / ae) * 100 + '%'), (H = (Te / V) * 100 + '%'))
                    : oe === 'em'
                    ? ((Se = et(i, 'borderLeft', 1, 'em')),
                      (A = ve / Se + 'em'),
                      (H = Te / Se + 'em'))
                    : ((A = ve + 'px'), (H = Te + 'px')),
                  we &&
                    ((ne = parseFloat(A) + G + oe),
                    (F = parseFloat(H) + G + oe))),
                (a = Rt(b, _[j], A + ' ' + H, ne + ' ' + F, !1, '0px', a));
            return a;
          },
          prefix: !0,
          formatter: Ne('0px 0px 0px 0px', !1, !0),
        }),
        Be(
          'borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius',
          {
            defaultValue: '0px',
            parser: function (i, t, h, p, a, v) {
              return Rt(
                i.style,
                h,
                this.format(Ae(i, h, C, !1, '0px 0px')),
                this.format(t),
                !1,
                '0px',
                a,
              );
            },
            prefix: !0,
            formatter: Ne('0px 0px', !1, !0),
          },
        ),
        Be('backgroundPosition', {
          defaultValue: '0 0',
          parser: function (i, t, h, p, a, v) {
            var _ = 'background-position',
              b = C || Ve(i),
              E = this.format(
                (b
                  ? X
                    ? b.getPropertyValue(_ + '-x') +
                      ' ' +
                      b.getPropertyValue(_ + '-y')
                    : b.getPropertyValue(_)
                  : i.currentStyle.backgroundPositionX +
                    ' ' +
                    i.currentStyle.backgroundPositionY) || '0 0',
              ),
              j = this.format(t),
              F,
              H,
              A,
              ne,
              se,
              G;
            if (
              (E.indexOf('%') !== -1) != (j.indexOf('%') !== -1) &&
              j.split(',').length < 2 &&
              ((G = Ae(i, 'backgroundImage').replace(D, '')), G && G !== 'none')
            ) {
              for (
                F = E.split(' '),
                  H = j.split(' '),
                  de.setAttribute('src', G),
                  A = 2;
                --A > -1;

              )
                (E = F[A]),
                  (ne = E.indexOf('%') !== -1),
                  ne !== (H[A].indexOf('%') !== -1) &&
                    ((se =
                      A === 0
                        ? i.offsetWidth - de.width
                        : i.offsetHeight - de.height),
                    (F[A] = ne
                      ? (parseFloat(E) / 100) * se + 'px'
                      : (parseFloat(E) / se) * 100 + '%'));
              E = F.join(' ');
            }
            return this.parseComplex(i.style, E, j, a, v);
          },
          formatter: q,
        }),
        Be('backgroundSize', {
          defaultValue: '0 0',
          formatter: function (i) {
            return (
              (i += ''),
              i.substr(0, 2) === 'co'
                ? i
                : q(i.indexOf(' ') === -1 ? i + ' ' + i : i)
            );
          },
        }),
        Be('perspective', { defaultValue: '0px', prefix: !0 }),
        Be('perspectiveOrigin', { defaultValue: '50% 50%', prefix: !0 }),
        Be('transformStyle', { prefix: !0 }),
        Be('backfaceVisibility', { prefix: !0 }),
        Be('userSelect', { prefix: !0 }),
        Be('margin', {
          parser: lt('marginTop,marginRight,marginBottom,marginLeft'),
        }),
        Be('padding', {
          parser: lt('paddingTop,paddingRight,paddingBottom,paddingLeft'),
        }),
        Be('clip', {
          defaultValue: 'rect(0px,0px,0px,0px)',
          parser: function (i, t, h, p, a, v) {
            var _, b, E;
            return (
              X < 9
                ? ((b = i.currentStyle),
                  (E = X < 8 ? ' ' : ','),
                  (_ =
                    'rect(' +
                    b.clipTop +
                    E +
                    b.clipRight +
                    E +
                    b.clipBottom +
                    E +
                    b.clipLeft +
                    ')'),
                  (t = this.format(t).split(',').join(E)))
                : ((_ = this.format(Ae(i, this.p, C, !1, this.dflt))),
                  (t = this.format(t))),
              this.parseComplex(i.style, _, t, a, v)
            );
          },
        }),
        Be('textShadow', {
          defaultValue: '0px 0px 0px #999',
          color: !0,
          multi: !0,
        }),
        Be('autoRound,strictUnits', {
          parser: function (i, t, h, p, a) {
            return a;
          },
        }),
        Be('border', {
          defaultValue: '0px solid #000',
          parser: function (i, t, h, p, a, v) {
            var _ = Ae(i, 'borderTopWidth', C, !1, '0px'),
              b = this.format(t).split(' '),
              E = b[0].replace(u, '');
            return (
              E !== 'px' &&
                (_ = parseFloat(_) / et(i, 'borderTopWidth', 1, E) + E),
              this.parseComplex(
                i.style,
                this.format(
                  _ +
                    ' ' +
                    Ae(i, 'borderTopStyle', C, !1, 'solid') +
                    ' ' +
                    Ae(i, 'borderTopColor', C, !1, '#000'),
                ),
                b.join(' '),
                a,
                v,
              )
            );
          },
          color: !0,
          formatter: function (i) {
            var t = i.split(' ');
            return (
              t[0] +
              ' ' +
              (t[1] || 'solid') +
              ' ' +
              (i.match(ge) || ['#000'])[0]
            );
          },
        }),
        Be('borderWidth', {
          parser: lt(
            'borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth',
          ),
        }),
        Be('float,cssFloat,styleFloat', {
          parser: function (i, t, h, p, a, v) {
            var _ = i.style,
              b = 'cssFloat' in _ ? 'cssFloat' : 'styleFloat';
            return new Ye(_, b, 0, 0, a, -1, h, !1, 0, _[b], t);
          },
        });
      var ci = function (i) {
        var t = this.t,
          h = t.filter || Ae(this.data, 'filter') || '',
          p = (this.s + this.c * i) | 0,
          a;
        p === 100 &&
          (h.indexOf('atrix(') === -1 &&
          h.indexOf('radient(') === -1 &&
          h.indexOf('oader(') === -1
            ? (t.removeAttribute('filter'), (a = !Ae(this.data, 'filter')))
            : ((t.filter = h.replace(e, '')), (a = !0))),
          a ||
            (this.xn1 && (t.filter = h = h || 'alpha(opacity=' + p + ')'),
            h.indexOf('pacity') === -1
              ? (p !== 0 || !this.xn1) &&
                (t.filter = h + ' alpha(opacity=' + p + ')')
              : (t.filter = h.replace(T, 'opacity=' + p)));
      };
      Be('opacity,alpha,autoAlpha', {
        defaultValue: '1',
        parser: function (i, t, h, p, a, v) {
          var _ = parseFloat(Ae(i, 'opacity', C, !1, '1')),
            b = i.style,
            E = h === 'autoAlpha';
          return (
            typeof t == 'string' &&
              t.charAt(1) === '=' &&
              (t =
                (t.charAt(0) === '-' ? -1 : 1) * parseFloat(t.substr(2)) + _),
            E &&
              _ === 1 &&
              Ae(i, 'visibility', C) === 'hidden' &&
              t !== 0 &&
              (_ = 0),
            te
              ? (a = new Ye(b, 'opacity', _, t - _, a))
              : ((a = new Ye(b, 'opacity', _ * 100, (t - _) * 100, a)),
                (a.xn1 = E ? 1 : 0),
                (b.zoom = 1),
                (a.type = 2),
                (a.b = 'alpha(opacity=' + a.s + ')'),
                (a.e = 'alpha(opacity=' + (a.s + a.c) + ')'),
                (a.data = i),
                (a.plugin = v),
                (a.setRatio = ci)),
            E &&
              ((a = new Ye(
                b,
                'visibility',
                0,
                0,
                a,
                -1,
                null,
                !1,
                0,
                _ !== 0 ? 'inherit' : 'hidden',
                t === 0 ? 'hidden' : 'inherit',
              )),
              (a.xs0 = 'inherit'),
              p._overwriteProps.push(a.n),
              p._overwriteProps.push(h)),
            a
          );
        },
      });
      var At = function (i, t) {
          t &&
            (i.removeProperty
              ? ((t.substr(0, 2) === 'ms' || t.substr(0, 6) === 'webkit') &&
                  (t = '-' + t),
                i.removeProperty(t.replace(y, '-$1').toLowerCase()))
              : i.removeAttribute(t));
        },
        _i = function (i) {
          if (((this.t._gsClassPT = this), i === 1 || i === 0)) {
            this.t.setAttribute('class', i === 0 ? this.b : this.e);
            for (var t = this.data, h = this.t.style; t; )
              t.v ? (h[t.p] = t.v) : At(h, t.p), (t = t._next);
            i === 1 && this.t._gsClassPT === this && (this.t._gsClassPT = null);
          } else
            this.t.getAttribute('class') !== this.e &&
              this.t.setAttribute('class', this.e);
        };
      Be('className', {
        parser: function (i, t, h, p, a, v, _) {
          var b = i.getAttribute('class') || '',
            E = i.style.cssText,
            j,
            F,
            H,
            A,
            ne;
          if (
            ((a = p._classNamePT = new Ye(i, h, 0, 0, a, 2)),
            (a.setRatio = _i),
            (a.pr = -11),
            (N = !0),
            (a.b = b),
            (F = n(i, C)),
            (H = i._gsClassPT),
            H)
          ) {
            for (A = {}, ne = H.data; ne; ) (A[ne.p] = 1), (ne = ne._next);
            H.setRatio(1);
          }
          return (
            (i._gsClassPT = a),
            (a.e =
              t.charAt(1) !== '='
                ? t
                : b.replace(
                    new RegExp('(?:\\s|^)' + t.substr(2) + '(?![\\w-])'),
                    '',
                  ) + (t.charAt(0) === '+' ? ' ' + t.substr(2) : '')),
            i.setAttribute('class', a.e),
            (j = d(i, F, n(i), _, A)),
            i.setAttribute('class', b),
            (a.data = j.firstMPT),
            i.style.cssText !== E && (i.style.cssText = E),
            (a = a.xfirst = p.parse(i, j.difs, a, v)),
            a
          );
        },
      });
      var di = function (i) {
        if (
          (i === 1 || i === 0) &&
          this.data._totalTime === this.data._totalDuration &&
          this.data.data !== 'isFromStart'
        ) {
          var t = this.t.style,
            h = P.transform.parse,
            p,
            a,
            v,
            _,
            b;
          if (this.e === 'all') (t.cssText = ''), (_ = !0);
          else
            for (
              p = this.e.split(' ').join('').split(','), v = p.length;
              --v > -1;

            )
              (a = p[v]),
                P[a] &&
                  (P[a].parse === h
                    ? (_ = !0)
                    : (a = a === 'transformOrigin' ? Ot : P[a].p)),
                At(t, a);
          _ &&
            (At(t, Ze),
            (b = this.t._gsTransform),
            b &&
              (b.svg &&
                (this.t.removeAttribute('data-svg-origin'),
                this.t.removeAttribute('transform')),
              delete this.t._gsTransform));
        }
      };
      for (
        Be('clearProps', {
          parser: function (i, t, h, p, a) {
            return (
              (a = new Ye(i, h, 0, 0, a, 2)),
              (a.setRatio = di),
              (a.e = t),
              (a.pr = -10),
              (a.data = p._tween),
              (N = !0),
              a
            );
          },
        }),
          o = 'bezier,throwProps,physicsProps,physics2D'.split(','),
          $e = o.length;
        $e--;

      )
        ai(o[$e]);
      (o = w.prototype),
        (o._firstPT = o._lastParsedTransform = o._transform = null),
        (o._onInitTween = function (i, t, h, p) {
          if (!i.nodeType) return !1;
          (this._target = me = i),
            (this._tween = h),
            (this._vars = t),
            (be = p),
            (Ee = t.autoRound),
            (N = !1),
            (L = t.suffixMap || w.suffixMap),
            (C = Ve(i)),
            (B = this._overwriteProps);
          var a = i.style,
            v,
            _,
            b,
            E,
            j,
            F,
            H,
            A,
            ne;
          if (
            (Me &&
              a.zIndex === '' &&
              ((v = Ae(i, 'zIndex', C)),
              (v === 'auto' || v === '') && this._addLazySet(a, 'zIndex', 0)),
            typeof t == 'string' &&
              ((E = a.cssText),
              (v = n(i, C)),
              (a.cssText = E + ';' + t),
              (v = d(i, v, n(i)).difs),
              !te && c.test(t) && (v.opacity = parseFloat(RegExp.$1)),
              (t = v),
              (a.cssText = E)),
            t.className
              ? (this._firstPT = _ =
                  P.className.parse(
                    i,
                    t.className,
                    'className',
                    this,
                    null,
                    null,
                    t,
                  ))
              : (this._firstPT = _ = this.parse(i, t, null)),
            this._transformType)
          ) {
            for (
              ne = this._transformType === 3,
                Ze
                  ? Je &&
                    ((Me = !0),
                    a.zIndex === '' &&
                      ((H = Ae(i, 'zIndex', C)),
                      (H === 'auto' || H === '') &&
                        this._addLazySet(a, 'zIndex', 0)),
                    ot &&
                      this._addLazySet(
                        a,
                        'WebkitBackfaceVisibility',
                        this._vars.WebkitBackfaceVisibility ||
                          (ne ? 'visible' : 'hidden'),
                      ))
                  : (a.zoom = 1),
                b = _;
              b && b._next;

            )
              b = b._next;
            (A = new Ye(i, 'transform', 0, 0, null, 2)),
              this._linkCSSP(A, null, b),
              (A.setRatio = Ze ? hi : ui),
              (A.data = this._transform || Ct(i, C, !0)),
              (A.tween = h),
              (A.pr = -1),
              B.pop();
          }
          if (N) {
            for (; _; ) {
              for (F = _._next, b = E; b && b.pr > _.pr; ) b = b._next;
              (_._prev = b ? b._prev : j) ? (_._prev._next = _) : (E = _),
                (_._next = b) ? (b._prev = _) : (j = _),
                (_ = F);
            }
            this._firstPT = E;
          }
          return !0;
        }),
        (o.parse = function (i, t, h, p) {
          var a = i.style,
            v,
            _,
            b,
            E,
            j,
            F,
            H,
            A,
            ne,
            se;
          for (v in t) {
            if (
              ((F = t[v]),
              (_ = P[v]),
              typeof F == 'function' && !(_ && _.allowFunc) && (F = F(be, me)),
              _)
            )
              h = _.parse(i, F, v, this, h, p, t);
            else if (v.substr(0, 2) === '--') {
              this._tween._propLookup[v] = this._addTween.call(
                this._tween,
                i.style,
                'setProperty',
                Ve(i).getPropertyValue(v) + '',
                F + '',
                v,
                !1,
                v,
              );
              continue;
            } else
              (j = Ae(i, v, C) + ''),
                (ne = typeof F == 'string'),
                v === 'color' ||
                v === 'fill' ||
                v === 'stroke' ||
                v.indexOf('Color') !== -1 ||
                (ne && r.test(F))
                  ? (ne ||
                      ((F = ce(F)),
                      (F =
                        (F.length > 3 ? 'rgba(' : 'rgb(') + F.join(',') + ')')),
                    (h = Rt(a, v, j, F, !0, 'transparent', h, 0, p)))
                  : ne && re.test(F)
                  ? (h = Rt(a, v, j, F, !0, null, h, 0, p))
                  : ((b = parseFloat(j)),
                    (H = b || b === 0 ? j.substr((b + '').length) : ''),
                    (j === '' || j === 'auto') &&
                      (v === 'width' || v === 'height'
                        ? ((b = z(i, v, C)), (H = 'px'))
                        : v === 'left' || v === 'top'
                        ? ((b = nt(i, v, C)), (H = 'px'))
                        : ((b = v !== 'opacity' ? 0 : 1), (H = ''))),
                    (se = ne && F.charAt(1) === '='),
                    se
                      ? ((E = parseInt(F.charAt(0) + '1', 10)),
                        (F = F.substr(2)),
                        (E *= parseFloat(F)),
                        (A = F.replace(u, '')))
                      : ((E = parseFloat(F)), (A = ne ? F.replace(u, '') : '')),
                    A === '' && (A = v in L ? L[v] : H),
                    (F = E || E === 0 ? (se ? E + b : E) + A : t[v]),
                    H !== A &&
                      (A !== '' || v === 'lineHeight') &&
                      (E || E === 0) &&
                      b &&
                      ((b = et(i, v, b, H)),
                      A === '%'
                        ? ((b /= et(i, v, 100, '%') / 100),
                          t.strictUnits !== !0 && (j = b + '%'))
                        : A === 'em' || A === 'rem' || A === 'vw' || A === 'vh'
                        ? (b /= et(i, v, 1, A))
                        : A !== 'px' && ((E = et(i, v, E, A)), (A = 'px')),
                      se && (E || E === 0) && (F = E + b + A)),
                    se && (E += b),
                    (b || b === 0) && (E || E === 0)
                      ? ((h = new Ye(
                          a,
                          v,
                          b,
                          E - b,
                          h,
                          0,
                          v,
                          Ee !== !1 && (A === 'px' || v === 'zIndex'),
                          0,
                          j,
                          F,
                        )),
                        (h.xs0 = A))
                      : a[v] === void 0 ||
                        (!F && (F + '' == 'NaN' || F == null))
                      ? Ce('invalid ' + v + ' tween value: ' + t[v])
                      : ((h = new Ye(
                          a,
                          v,
                          E || b || 0,
                          0,
                          h,
                          -1,
                          v,
                          !1,
                          0,
                          j,
                          F,
                        )),
                        (h.xs0 =
                          F === 'none' &&
                          (v === 'display' || v.indexOf('Style') !== -1)
                            ? j
                            : F)));
            p && h && !h.plugin && (h.plugin = p);
          }
          return h;
        }),
        (o.setRatio = function (i) {
          var t = this._firstPT,
            h = 1e-6,
            p,
            a,
            v;
          if (
            i === 1 &&
            (this._tween._time === this._tween._duration ||
              this._tween._time === 0)
          )
            for (; t; ) {
              if (t.type !== 2)
                if (t.r && t.type !== -1) {
                  if (((p = t.r(t.s + t.c)), !t.type)) t.t[t.p] = p + t.xs0;
                  else if (t.type === 1) {
                    for (v = t.l, a = t.xs0 + p + t.xs1, v = 1; v < t.l; v++)
                      a += t['xn' + v] + t['xs' + (v + 1)];
                    t.t[t.p] = a;
                  }
                } else t.t[t.p] = t.e;
              else t.setRatio(i);
              t = t._next;
            }
          else if (
            i ||
            !(
              this._tween._time === this._tween._duration ||
              this._tween._time === 0
            ) ||
            this._tween._rawPrevTime === -1e-6
          )
            for (; t; ) {
              if (
                ((p = t.c * i + t.s),
                t.r ? (p = t.r(p)) : p < h && p > -h && (p = 0),
                !t.type)
              )
                t.t[t.p] = p + t.xs0;
              else if (t.type === 1)
                if (((v = t.l), v === 2))
                  t.t[t.p] = t.xs0 + p + t.xs1 + t.xn1 + t.xs2;
                else if (v === 3)
                  t.t[t.p] = t.xs0 + p + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3;
                else if (v === 4)
                  t.t[t.p] =
                    t.xs0 +
                    p +
                    t.xs1 +
                    t.xn1 +
                    t.xs2 +
                    t.xn2 +
                    t.xs3 +
                    t.xn3 +
                    t.xs4;
                else if (v === 5)
                  t.t[t.p] =
                    t.xs0 +
                    p +
                    t.xs1 +
                    t.xn1 +
                    t.xs2 +
                    t.xn2 +
                    t.xs3 +
                    t.xn3 +
                    t.xs4 +
                    t.xn4 +
                    t.xs5;
                else {
                  for (a = t.xs0 + p + t.xs1, v = 1; v < t.l; v++)
                    a += t['xn' + v] + t['xs' + (v + 1)];
                  t.t[t.p] = a;
                }
              else
                t.type === -1
                  ? (t.t[t.p] = t.xs0)
                  : t.setRatio && t.setRatio(i);
              t = t._next;
            }
          else
            for (; t; )
              t.type !== 2 ? (t.t[t.p] = t.b) : t.setRatio(i), (t = t._next);
        }),
        (o._enableTransforms = function (i) {
          (this._transform = this._transform || Ct(this._target, C, !0)),
            (this._transformType =
              !(this._transform.svg && pt) && (i || this._transformType === 3)
                ? 3
                : 2);
        });
      var pi = function (i) {
        (this.t[this.p] = this.e),
          this.data._linkCSSP(this, this._next, null, !0);
      };
      (o._addLazySet = function (i, t, h) {
        var p = (this._firstPT = new Ye(i, t, 0, 0, this._firstPT, 2));
        (p.e = h), (p.setRatio = pi), (p.data = this);
      }),
        (o._linkCSSP = function (i, t, h, p) {
          return (
            i &&
              (t && (t._prev = i),
              i._next && (i._next._prev = i._prev),
              i._prev
                ? (i._prev._next = i._next)
                : this._firstPT === i && ((this._firstPT = i._next), (p = !0)),
              h
                ? (h._next = i)
                : !p && this._firstPT === null && (this._firstPT = i),
              (i._next = t),
              (i._prev = h)),
            i
          );
        }),
        (o._mod = function (i) {
          for (var t = this._firstPT; t; )
            typeof i[t.p] == 'function' && (t.r = i[t.p]), (t = t._next);
        }),
        (o._kill = function (i) {
          var t = i,
            h,
            p,
            a;
          if (i.autoAlpha || i.alpha) {
            t = {};
            for (p in i) t[p] = i[p];
            (t.opacity = 1), t.autoAlpha && (t.visibility = 1);
          }
          for (
            i.className &&
              (h = this._classNamePT) &&
              ((a = h.xfirst),
              a && a._prev
                ? this._linkCSSP(a._prev, h._next, a._prev._prev)
                : a === this._firstPT && (this._firstPT = h._next),
              h._next && this._linkCSSP(h._next, h._next._next, a._prev),
              (this._classNamePT = null)),
              h = this._firstPT;
            h;

          )
            h.plugin &&
              h.plugin !== p &&
              h.plugin._kill &&
              (h.plugin._kill(i), (p = h.plugin)),
              (h = h._next);
          return It.prototype._kill.call(this, t);
        });
      var zt = function (i, t, h) {
        var p, a, v, _;
        if (i.slice) {
          for (a = i.length; --a > -1; ) zt(i[a], t, h);
          return;
        }
        for (p = i.childNodes, a = p.length; --a > -1; )
          (v = p[a]),
            (_ = v.type),
            v.style && (t.push(n(v)), h && h.push(v)),
            (_ === 1 || _ === 9 || _ === 11) &&
              v.childNodes.length &&
              zt(v, t, h);
      };
      return (
        (w.cascadeTo = function (i, t, h) {
          var p = Re.to(i, t, h),
            a = [p],
            v = [],
            _ = [],
            b = [],
            E = Re._internals.reservedProps,
            j,
            F,
            H,
            A;
          for (
            i = p._targets || p.target,
              zt(i, v, b),
              p.render(t, !0, !0),
              zt(i, _),
              p.render(0, !0, !0),
              p._enabled(!0),
              j = b.length;
            --j > -1;

          )
            if (((F = d(b[j], v[j], _[j])), F.firstMPT)) {
              F = F.difs;
              for (H in h) E[H] && (F[H] = h[H]);
              A = {};
              for (H in F) A[H] = v[j][H];
              a.push(Re.fromTo(b[j], t, A, F));
            }
          return a;
        }),
        It.activate([w]),
        w
      );
    },
    !0,
  );
  var Pi = Ue.CSSPlugin;
  /*!
   * VERSION: 0.6.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   */ var Si = Ge._gsDefine.plugin({
    propName: 'attr',
    API: 2,
    version: '0.6.1',
    init: function (w, O, N, L) {
      var C, B;
      if (typeof w.setAttribute != 'function') return !1;
      for (C in O)
        (B = O[C]),
          typeof B == 'function' && (B = B(L, w)),
          this._addTween(
            w,
            'setAttribute',
            w.getAttribute(C) + '',
            B + '',
            C,
            !1,
            C,
          ),
          this._overwriteProps.push(C);
      return !0;
    },
  });
  /*!
   * VERSION: 1.6.0
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ var Jt = Ge._gsDefine.plugin({
      propName: 'roundProps',
      version: '1.7.0',
      priority: -1,
      API: 2,
      init: function (w, O, N) {
        return (this._tween = N), !0;
      },
    }),
    Ri = function (w) {
      var O = w < 1 ? Math.pow(10, (w + '').length - 2) : 1;
      return function (N) {
        return ((Math.round(N / w) * w * O) | 0) / O;
      };
    },
    Oi = function (w, O) {
      for (; w; ) !w.f && !w.blob && (w.m = O || Math.round), (w = w._next);
    },
    ei = Jt.prototype;
  ei._onInitAllProps = function () {
    var w = this._tween,
      O = w.vars.roundProps,
      N = {},
      L = w._propLookup.roundProps,
      C,
      B,
      P,
      o;
    if (typeof O == 'object' && !O.push) for (o in O) N[o] = Ri(O[o]);
    else
      for (typeof O == 'string' && (O = O.split(',')), P = O.length; --P > -1; )
        N[O[P]] = Math.round;
    for (o in N)
      for (C = w._firstPT; C; )
        (B = C._next),
          C.pg
            ? C.t._mod(N)
            : C.n === o &&
              (C.f === 2 && C.t
                ? Oi(C.t._firstPT, N[o])
                : (this._add(C.t, o, C.s, C.c, N[o]),
                  B && (B._prev = C._prev),
                  C._prev
                    ? (C._prev._next = B)
                    : w._firstPT === C && (w._firstPT = B),
                  (C._next = C._prev = null),
                  (w._propLookup[o] = L))),
          (C = B);
    return !1;
  };
  ei._add = function (w, O, N, L, C) {
    this._addTween(w, O, N, N + L, O, C || Math.round),
      this._overwriteProps.push(O);
  };
  /*!
   * VERSION: 0.3.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ var ti = Ge._gsDefine.plugin({
    propName: 'directionalRotation',
    version: '0.3.1',
    API: 2,
    init: function (w, O, N, L) {
      typeof O != 'object' && (O = { rotation: O }), (this.finals = {});
      var C = O.useRadians === !0 ? Math.PI * 2 : 360,
        B = 1e-6,
        P,
        o,
        g,
        S,
        R,
        s;
      for (P in O)
        P !== 'useRadians' &&
          ((S = O[P]),
          typeof S == 'function' && (S = S(L, w)),
          (s = (S + '').split('_')),
          (o = s[0]),
          (g = parseFloat(
            typeof w[P] != 'function'
              ? w[P]
              : w[
                  P.indexOf('set') ||
                  typeof w['get' + P.substr(3)] != 'function'
                    ? P
                    : 'get' + P.substr(3)
                ](),
          )),
          (S = this.finals[P] =
            typeof o == 'string' && o.charAt(1) === '='
              ? g + parseInt(o.charAt(0) + '1', 10) * Number(o.substr(2))
              : Number(o) || 0),
          (R = S - g),
          s.length &&
            ((o = s.join('_')),
            o.indexOf('short') !== -1 &&
              ((R = R % C), R !== R % (C / 2) && (R = R < 0 ? R + C : R - C)),
            o.indexOf('_cw') !== -1 && R < 0
              ? (R = ((R + C * 9999999999) % C) - ((R / C) | 0) * C)
              : o.indexOf('ccw') !== -1 &&
                R > 0 &&
                (R = ((R - C * 9999999999) % C) - ((R / C) | 0) * C)),
          (R > B || R < -B) &&
            (this._addTween(w, P, g, g + R, P), this._overwriteProps.push(P)));
      return !0;
    },
    set: function (w) {
      var O;
      if (w !== 1) this._super.setRatio.call(this, w);
      else
        for (O = this._firstPT; O; )
          O.f ? O.t[O.p](this.finals[O.p]) : (O.t[O.p] = this.finals[O.p]),
            (O = O._next);
    },
  });
  ti._autoCSS = !0;
  /*!
   * VERSION: 1.3.9
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ var Ci = 180 / Math.PI,
    gt = [],
    vt = [],
    xt = [],
    Nt = {},
    Ai = Ge._gsDefine.globals,
    St = function (w, O, N, L) {
      N === L && (N = L - (L - O) / 1e6),
        w === O && (O = w + (N - w) / 1e6),
        (this.a = w),
        (this.b = O),
        (this.c = N),
        (this.d = L),
        (this.da = L - w),
        (this.ca = N - w),
        (this.ba = O - w);
    },
    ki =
      ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,',
    Gt = function (w, O, N, L) {
      var C = { a: w },
        B = {},
        P = {},
        o = { c: L },
        g = (w + O) / 2,
        S = (O + N) / 2,
        R = (N + L) / 2,
        s = (g + S) / 2,
        M = (S + R) / 2,
        u = (M - s) / 8;
      return (
        (C.b = g + (w - g) / 4),
        (B.b = s + u),
        (C.c = B.a = (C.b + B.b) / 2),
        (B.c = P.a = (s + M) / 2),
        (P.b = M - u),
        (o.b = R + (L - R) / 4),
        (P.c = o.a = (P.b + o.b) / 2),
        [C, B, P, o]
      );
    },
    Ei = function (w, O, N, L, C) {
      var B = w.length - 1,
        P = 0,
        o = w[0].a,
        g,
        S,
        R,
        s,
        M,
        u,
        T,
        c,
        e,
        r,
        y,
        l,
        D;
      for (g = 0; g < B; g++)
        (M = w[P]),
          (S = M.a),
          (R = M.d),
          (s = w[P + 1].d),
          C
            ? ((y = gt[g]),
              (l = vt[g]),
              (D = ((l + y) * O * 0.25) / (L ? 0.5 : xt[g] || 0.5)),
              (u = R - (R - S) * (L ? O * 0.5 : y !== 0 ? D / y : 0)),
              (T = R + (s - R) * (L ? O * 0.5 : l !== 0 ? D / l : 0)),
              (c = R - (u + (((T - u) * ((y * 3) / (y + l) + 0.5)) / 4 || 0))))
            : ((u = R - (R - S) * O * 0.5),
              (T = R + (s - R) * O * 0.5),
              (c = R - (u + T) / 2)),
          (u += c),
          (T += c),
          (M.c = e = u),
          g !== 0 ? (M.b = o) : (M.b = o = M.a + (M.c - M.a) * 0.6),
          (M.da = R - S),
          (M.ca = e - S),
          (M.ba = o - S),
          N
            ? ((r = Gt(S, o, e, R)),
              w.splice(P, 1, r[0], r[1], r[2], r[3]),
              (P += 4))
            : P++,
          (o = T);
      (M = w[P]),
        (M.b = o),
        (M.c = o + (M.d - o) * 0.4),
        (M.da = M.d - M.a),
        (M.ca = M.c - M.a),
        (M.ba = o - M.a),
        N &&
          ((r = Gt(M.a, o, M.c, M.d)), w.splice(P, 1, r[0], r[1], r[2], r[3]));
    },
    Mi = function (w, O, N, L) {
      var C = [],
        B,
        P,
        o,
        g,
        S,
        R;
      if (L)
        for (w = [L].concat(w), P = w.length; --P > -1; )
          typeof (R = w[P][O]) == 'string' &&
            R.charAt(1) === '=' &&
            (w[P][O] = L[O] + Number(R.charAt(0) + R.substr(2)));
      if (((B = w.length - 2), B < 0))
        return (C[0] = new St(w[0][O], 0, 0, w[0][O])), C;
      for (P = 0; P < B; P++)
        (o = w[P][O]),
          (g = w[P + 1][O]),
          (C[P] = new St(o, 0, 0, g)),
          N &&
            ((S = w[P + 2][O]),
            (gt[P] = (gt[P] || 0) + (g - o) * (g - o)),
            (vt[P] = (vt[P] || 0) + (S - g) * (S - g)));
      return (C[P] = new St(w[P][O], 0, 0, w[P + 1][O])), C;
    },
    ii = function (w, O, N, L, C, B) {
      var P = {},
        o = [],
        g = B || w[0],
        S,
        R,
        s,
        M,
        u,
        T,
        c,
        e;
      (C = typeof C == 'string' ? ',' + C + ',' : ki), O == null && (O = 1);
      for (R in w[0]) o.push(R);
      if (w.length > 1) {
        for (e = w[w.length - 1], c = !0, S = o.length; --S > -1; )
          if (((R = o[S]), Math.abs(g[R] - e[R]) > 0.05)) {
            c = !1;
            break;
          }
        c &&
          ((w = w.concat()),
          B && w.unshift(B),
          w.push(w[1]),
          (B = w[w.length - 3]));
      }
      for (gt.length = vt.length = xt.length = 0, S = o.length; --S > -1; )
        (R = o[S]),
          (Nt[R] = C.indexOf(',' + R + ',') !== -1),
          (P[R] = Mi(w, R, Nt[R], B));
      for (S = gt.length; --S > -1; )
        (gt[S] = Math.sqrt(gt[S])), (vt[S] = Math.sqrt(vt[S]));
      if (!L) {
        for (S = o.length; --S > -1; )
          if (Nt[R])
            for (s = P[o[S]], T = s.length - 1, M = 0; M < T; M++)
              (u = s[M + 1].da / vt[M] + s[M].da / gt[M] || 0),
                (xt[M] = (xt[M] || 0) + u * u);
        for (S = xt.length; --S > -1; ) xt[S] = Math.sqrt(xt[S]);
      }
      for (S = o.length, M = N ? 4 : 1; --S > -1; )
        (R = o[S]),
          (s = P[R]),
          Ei(s, O, N, L, Nt[R]),
          c && (s.splice(0, M), s.splice(s.length - M, M));
      return P;
    },
    Di = function (w, O, N) {
      O = O || 'soft';
      var L = {},
        C = O === 'cubic' ? 3 : 2,
        B = O === 'soft',
        P = [],
        o,
        g,
        S,
        R,
        s,
        M,
        u,
        T,
        c,
        e,
        r;
      if ((B && N && (w = [N].concat(w)), w == null || w.length < C + 1))
        throw 'invalid Bezier data';
      for (c in w[0]) P.push(c);
      for (M = P.length; --M > -1; ) {
        for (c = P[M], L[c] = s = [], e = 0, T = w.length, u = 0; u < T; u++)
          (o =
            N == null
              ? w[u][c]
              : typeof (r = w[u][c]) == 'string' && r.charAt(1) === '='
              ? N[c] + Number(r.charAt(0) + r.substr(2))
              : Number(r)),
            B && u > 1 && u < T - 1 && (s[e++] = (o + s[e - 2]) / 2),
            (s[e++] = o);
        for (T = e - C + 1, e = 0, u = 0; u < T; u += C)
          (o = s[u]),
            (g = s[u + 1]),
            (S = s[u + 2]),
            (R = C === 2 ? 0 : s[u + 3]),
            (s[e++] = r =
              C === 3
                ? new St(o, g, S, R)
                : new St(o, (2 * g + o) / 3, (2 * g + S) / 3, S));
        s.length = e;
      }
      return L;
    },
    Fi = function (w, O, N) {
      for (
        var L = 1 / N, C = w.length, B, P, o, g, S, R, s, M, u, T, c;
        --C > -1;

      )
        for (
          T = w[C],
            o = T.a,
            g = T.d - o,
            S = T.c - o,
            R = T.b - o,
            B = P = 0,
            M = 1;
          M <= N;
          M++
        )
          (s = L * M),
            (u = 1 - s),
            (B = P - (P = (s * s * g + 3 * u * (s * S + u * R)) * s)),
            (c = C * N + M - 1),
            (O[c] = (O[c] || 0) + B * B);
    },
    zi = function (w, O) {
      O = O >> 0 || 6;
      var N = [],
        L = [],
        C = 0,
        B = 0,
        P = O - 1,
        o = [],
        g = [],
        S,
        R,
        s,
        M;
      for (S in w) Fi(w[S], N, O);
      for (s = N.length, R = 0; R < s; R++)
        (C += Math.sqrt(N[R])),
          (M = R % O),
          (g[M] = C),
          M === P &&
            ((B += C),
            (M = (R / O) >> 0),
            (o[M] = g),
            (L[M] = B),
            (C = 0),
            (g = []));
      return { length: B, lengths: L, segments: o };
    },
    yt = Ge._gsDefine.plugin({
      propName: 'bezier',
      priority: -1,
      version: '1.3.9',
      API: 2,
      global: !0,
      init: function (w, O, N) {
        (this._target = w),
          O instanceof Array && (O = { values: O }),
          (this._func = {}),
          (this._mod = {}),
          (this._props = []),
          (this._timeRes =
            O.timeResolution == null ? 6 : parseInt(O.timeResolution, 10));
        var L = O.values || [],
          C = {},
          B = L[0],
          P = O.autoRotate || N.vars.orientToBezier,
          o,
          g,
          S,
          R,
          s;
        this._autoRotate = P
          ? P instanceof Array
            ? P
            : [['x', 'y', 'rotation', P === !0 ? 0 : Number(P) || 0]]
          : null;
        for (o in B) this._props.push(o);
        for (S = this._props.length; --S > -1; )
          (o = this._props[S]),
            this._overwriteProps.push(o),
            (g = this._func[o] = typeof w[o] == 'function'),
            (C[o] = g
              ? w[
                  o.indexOf('set') ||
                  typeof w['get' + o.substr(3)] != 'function'
                    ? o
                    : 'get' + o.substr(3)
                ]()
              : parseFloat(w[o])),
            s || (C[o] !== L[0][o] && (s = C));
        if (
          ((this._beziers =
            O.type !== 'cubic' && O.type !== 'quadratic' && O.type !== 'soft'
              ? ii(
                  L,
                  isNaN(O.curviness) ? 1 : O.curviness,
                  !1,
                  O.type === 'thruBasic',
                  O.correlate,
                  s,
                )
              : Di(L, O.type, C)),
          (this._segCount = this._beziers[o].length),
          this._timeRes)
        ) {
          var M = zi(this._beziers, this._timeRes);
          (this._length = M.length),
            (this._lengths = M.lengths),
            (this._segments = M.segments),
            (this._l1 = this._li = this._s1 = this._si = 0),
            (this._l2 = this._lengths[0]),
            (this._curSeg = this._segments[0]),
            (this._s2 = this._curSeg[0]),
            (this._prec = 1 / this._curSeg.length);
        }
        if ((P = this._autoRotate))
          for (
            this._initialRotations = [],
              P[0] instanceof Array || (this._autoRotate = P = [P]),
              S = P.length;
            --S > -1;

          ) {
            for (R = 0; R < 3; R++)
              (o = P[S][R]),
                (this._func[o] =
                  typeof w[o] == 'function'
                    ? w[
                        o.indexOf('set') ||
                        typeof w['get' + o.substr(3)] != 'function'
                          ? o
                          : 'get' + o.substr(3)
                      ]
                    : !1);
            (o = P[S][2]),
              (this._initialRotations[S] =
                (this._func[o]
                  ? this._func[o].call(this._target)
                  : this._target[o]) || 0),
              this._overwriteProps.push(o);
          }
        return (this._startRatio = N.vars.runBackwards ? 1 : 0), !0;
      },
      set: function (w) {
        var O = this._segCount,
          N = this._func,
          L = this._target,
          C = w !== this._startRatio,
          B,
          P,
          o,
          g,
          S,
          R,
          s,
          M,
          u,
          T,
          c;
        if (!this._timeRes)
          (B = w < 0 ? 0 : w >= 1 ? O - 1 : (O * w) >> 0),
            (R = (w - B * (1 / O)) * O);
        else {
          if (
            ((u = this._lengths),
            (T = this._curSeg),
            (c = w * this._length),
            (o = this._li),
            c > this._l2 && o < O - 1)
          ) {
            for (M = O - 1; o < M && (this._l2 = u[++o]) <= c; );
            (this._l1 = u[o - 1]),
              (this._li = o),
              (this._curSeg = T = this._segments[o]),
              (this._s2 = T[(this._s1 = this._si = 0)]);
          } else if (c < this._l1 && o > 0) {
            for (; o > 0 && (this._l1 = u[--o]) >= c; );
            o === 0 && c < this._l1 ? (this._l1 = 0) : o++,
              (this._l2 = u[o]),
              (this._li = o),
              (this._curSeg = T = this._segments[o]),
              (this._s1 = T[(this._si = T.length - 1) - 1] || 0),
              (this._s2 = T[this._si]);
          }
          if (
            ((B = o),
            (c -= this._l1),
            (o = this._si),
            c > this._s2 && o < T.length - 1)
          ) {
            for (M = T.length - 1; o < M && (this._s2 = T[++o]) <= c; );
            (this._s1 = T[o - 1]), (this._si = o);
          } else if (c < this._s1 && o > 0) {
            for (; o > 0 && (this._s1 = T[--o]) >= c; );
            o === 0 && c < this._s1 ? (this._s1 = 0) : o++,
              (this._s2 = T[o]),
              (this._si = o);
          }
          R =
            w === 1
              ? 1
              : (o + (c - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
        }
        for (P = 1 - R, o = this._props.length; --o > -1; )
          (g = this._props[o]),
            (S = this._beziers[g][B]),
            (s = (R * R * S.da + 3 * P * (R * S.ca + P * S.ba)) * R + S.a),
            this._mod[g] && (s = this._mod[g](s, L)),
            N[g] ? L[g](s) : (L[g] = s);
        if (this._autoRotate) {
          var e = this._autoRotate,
            r,
            y,
            l,
            D,
            m,
            $,
            I;
          for (o = e.length; --o > -1; )
            (g = e[o][2]),
              ($ = e[o][3] || 0),
              (I = e[o][4] === !0 ? 1 : Ci),
              (S = this._beziers[e[o][0]]),
              (r = this._beziers[e[o][1]]),
              S &&
                r &&
                ((S = S[B]),
                (r = r[B]),
                (y = S.a + (S.b - S.a) * R),
                (D = S.b + (S.c - S.b) * R),
                (y += (D - y) * R),
                (D += (S.c + (S.d - S.c) * R - D) * R),
                (l = r.a + (r.b - r.a) * R),
                (m = r.b + (r.c - r.b) * R),
                (l += (m - l) * R),
                (m += (r.c + (r.d - r.c) * R - m) * R),
                (s = C
                  ? Math.atan2(m - l, D - y) * I + $
                  : this._initialRotations[o]),
                this._mod[g] && (s = this._mod[g](s, L)),
                N[g] ? L[g](s) : (L[g] = s));
        }
      },
    }),
    ri = yt.prototype;
  yt.bezierThrough = ii;
  yt.cubicToQuadratic = Gt;
  yt._autoCSS = !0;
  yt.quadraticToCubic = function (w, O, N) {
    return new St(w, (2 * O + w) / 3, (2 * O + N) / 3, N);
  };
  yt._cssRegister = function () {
    var w = Ai.CSSPlugin;
    if (w) {
      var O = w._internals,
        N = O._parseToProxy,
        L = O._setPluginRatio,
        C = O.CSSPropTween;
      O._registerComplexSpecialProp('bezier', {
        parser: function (B, P, o, g, S, R) {
          P instanceof Array && (P = { values: P }), (R = new yt());
          var s = P.values,
            M = s.length - 1,
            u = [],
            T = {},
            c,
            e,
            r;
          if (M < 0) return S;
          for (c = 0; c <= M; c++)
            (r = N(B, s[c], g, S, R, M !== c)), (u[c] = r.end);
          for (e in P) T[e] = P[e];
          return (
            (T.values = u),
            (S = new C(B, 'bezier', 0, 0, r.pt, 2)),
            (S.data = r),
            (S.plugin = R),
            (S.setRatio = L),
            T.autoRotate === 0 && (T.autoRotate = !0),
            T.autoRotate &&
              !(T.autoRotate instanceof Array) &&
              ((c = T.autoRotate === !0 ? 0 : Number(T.autoRotate)),
              (T.autoRotate =
                r.end.left != null
                  ? [['left', 'top', 'rotation', c, !1]]
                  : r.end.x != null
                  ? [['x', 'y', 'rotation', c, !1]]
                  : !1)),
            T.autoRotate &&
              (g._transform || g._enableTransforms(!1),
              (r.autoRotate = g._target._gsTransform),
              (r.proxy.rotation = r.autoRotate.rotation || 0),
              g._overwriteProps.push('rotation')),
            R._onInitTween(r.proxy, T, g._tween),
            S
          );
        },
      });
    }
  };
  ri._mod = function (w) {
    for (var O = this._overwriteProps, N = O.length, L; --N > -1; )
      (L = w[O[N]]), L && typeof L == 'function' && (this._mod[O[N]] = L);
  };
  ri._kill = function (w) {
    var O = this._props,
      N,
      L;
    for (N in this._beziers)
      if (N in w)
        for (
          delete this._beziers[N], delete this._func[N], L = O.length;
          --L > -1;

        )
          O[L] === N && O.splice(L, 1);
    if (((O = this._autoRotate), O))
      for (L = O.length; --L > -1; ) w[O[L][2]] && O.splice(L, 1);
    return this._super._kill.call(this, w);
  };
  /*!
   * VERSION: 1.16.1
   * DATE: 2018-08-27
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ Ge._gsDefine(
    'easing.Back',
    ['easing.Ease'],
    function () {
      var w = Ge.GreenSockGlobals || Ge,
        O = w.com.greensock,
        N = Math.PI * 2,
        L = Math.PI / 2,
        C = O._class,
        B = function (r, y) {
          var l = C('easing.' + r, function () {}, !0),
            D = (l.prototype = new rt());
          return (D.constructor = l), (D.getRatio = y), l;
        },
        P = rt.register || function () {},
        o = function (r, y, l, D, m) {
          var $ = C(
            'easing.' + r,
            { easeOut: new y(), easeIn: new l(), easeInOut: new D() },
            !0,
          );
          return P($, r), $;
        },
        g = function (r, y, l) {
          (this.t = r),
            (this.v = y),
            l &&
              ((this.next = l),
              (l.prev = this),
              (this.c = l.v - y),
              (this.gap = l.t - r));
        },
        S = function (r, y) {
          var l = C(
              'easing.' + r,
              function (m) {
                (this._p1 = m || m === 0 ? m : 1.70158),
                  (this._p2 = this._p1 * 1.525);
              },
              !0,
            ),
            D = (l.prototype = new rt());
          return (
            (D.constructor = l),
            (D.getRatio = y),
            (D.config = function (m) {
              return new l(m);
            }),
            l
          );
        },
        R = o(
          'Back',
          S('BackOut', function (r) {
            return (r = r - 1) * r * ((this._p1 + 1) * r + this._p1) + 1;
          }),
          S('BackIn', function (r) {
            return r * r * ((this._p1 + 1) * r - this._p1);
          }),
          S('BackInOut', function (r) {
            return (r *= 2) < 1
              ? 0.5 * r * r * ((this._p2 + 1) * r - this._p2)
              : 0.5 * ((r -= 2) * r * ((this._p2 + 1) * r + this._p2) + 2);
          }),
        ),
        s = C(
          'easing.SlowMo',
          function (r, y, l) {
            (y = y || y === 0 ? y : 0.7),
              r == null ? (r = 0.7) : r > 1 && (r = 1),
              (this._p = r !== 1 ? y : 0),
              (this._p1 = (1 - r) / 2),
              (this._p2 = r),
              (this._p3 = this._p1 + this._p2),
              (this._calcEnd = l === !0);
          },
          !0,
        ),
        M = (s.prototype = new rt()),
        u,
        T,
        c,
        e;
      return (
        (M.constructor = s),
        (M.getRatio = function (r) {
          var y = r + (0.5 - r) * this._p;
          return r < this._p1
            ? this._calcEnd
              ? 1 - (r = 1 - r / this._p1) * r
              : y - (r = 1 - r / this._p1) * r * r * r * y
            : r > this._p3
            ? this._calcEnd
              ? r === 1
                ? 0
                : 1 - (r = (r - this._p3) / this._p1) * r
              : y + (r - y) * (r = (r - this._p3) / this._p1) * r * r * r
            : this._calcEnd
            ? 1
            : y;
        }),
        (s.ease = new s(0.7, 0.7)),
        (M.config = s.config =
          function (r, y, l) {
            return new s(r, y, l);
          }),
        (u = C(
          'easing.SteppedEase',
          function (r, y) {
            (r = r || 1),
              (this._p1 = 1 / r),
              (this._p2 = r + (y ? 0 : 1)),
              (this._p3 = y ? 1 : 0);
          },
          !0,
        )),
        (M = u.prototype = new rt()),
        (M.constructor = u),
        (M.getRatio = function (r) {
          return (
            r < 0 ? (r = 0) : r >= 1 && (r = 0.999999999),
            (((this._p2 * r) | 0) + this._p3) * this._p1
          );
        }),
        (M.config = u.config =
          function (r, y) {
            return new u(r, y);
          }),
        (T = C(
          'easing.ExpoScaleEase',
          function (r, y, l) {
            (this._p1 = Math.log(y / r)),
              (this._p2 = y - r),
              (this._p3 = r),
              (this._ease = l);
          },
          !0,
        )),
        (M = T.prototype = new rt()),
        (M.constructor = T),
        (M.getRatio = function (r) {
          return (
            this._ease && (r = this._ease.getRatio(r)),
            (this._p3 * Math.exp(this._p1 * r) - this._p3) / this._p2
          );
        }),
        (M.config = T.config =
          function (r, y, l) {
            return new T(r, y, l);
          }),
        (c = C(
          'easing.RoughEase',
          function (r) {
            r = r || {};
            for (
              var y = r.taper || 'none',
                l = [],
                D = 0,
                m = (r.points || 20) | 0,
                $ = m,
                I = r.randomize !== !1,
                Y = r.clamp === !0,
                k = r.template instanceof rt ? r.template : null,
                re = typeof r.strength == 'number' ? r.strength * 0.4 : 0.4,
                W,
                ie,
                le,
                Z,
                fe,
                ke;
              --$ > -1;

            )
              (W = I ? Math.random() : (1 / m) * $),
                (ie = k ? k.getRatio(W) : W),
                y === 'none'
                  ? (le = re)
                  : y === 'out'
                  ? ((Z = 1 - W), (le = Z * Z * re))
                  : y === 'in'
                  ? (le = W * W * re)
                  : W < 0.5
                  ? ((Z = W * 2), (le = Z * Z * 0.5 * re))
                  : ((Z = (1 - W) * 2), (le = Z * Z * 0.5 * re)),
                I
                  ? (ie += Math.random() * le - le * 0.5)
                  : $ % 2
                  ? (ie += le * 0.5)
                  : (ie -= le * 0.5),
                Y && (ie > 1 ? (ie = 1) : ie < 0 && (ie = 0)),
                (l[D++] = { x: W, y: ie });
            for (
              l.sort(function (ee, de) {
                return ee.x - de.x;
              }),
                ke = new g(1, 1, null),
                $ = m;
              --$ > -1;

            )
              (fe = l[$]), (ke = new g(fe.x, fe.y, ke));
            this._prev = new g(0, 0, ke.t !== 0 ? ke : ke.next);
          },
          !0,
        )),
        (M = c.prototype = new rt()),
        (M.constructor = c),
        (M.getRatio = function (r) {
          var y = this._prev;
          if (r > y.t) {
            for (; y.next && r >= y.t; ) y = y.next;
            y = y.prev;
          } else for (; y.prev && r <= y.t; ) y = y.prev;
          return (this._prev = y), y.v + ((r - y.t) / y.gap) * y.c;
        }),
        (M.config = function (r) {
          return new c(r);
        }),
        (c.ease = new c()),
        o(
          'Bounce',
          B('BounceOut', function (r) {
            return r < 1 / 2.75
              ? 7.5625 * r * r
              : r < 2 / 2.75
              ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75
              : r < 2.5 / 2.75
              ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375
              : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
          }),
          B('BounceIn', function (r) {
            return (r = 1 - r) < 1 / 2.75
              ? 1 - 7.5625 * r * r
              : r < 2 / 2.75
              ? 1 - (7.5625 * (r -= 1.5 / 2.75) * r + 0.75)
              : r < 2.5 / 2.75
              ? 1 - (7.5625 * (r -= 2.25 / 2.75) * r + 0.9375)
              : 1 - (7.5625 * (r -= 2.625 / 2.75) * r + 0.984375);
          }),
          B('BounceInOut', function (r) {
            var y = r < 0.5;
            return (
              y ? (r = 1 - r * 2) : (r = r * 2 - 1),
              r < 1 / 2.75
                ? (r = 7.5625 * r * r)
                : r < 2 / 2.75
                ? (r = 7.5625 * (r -= 1.5 / 2.75) * r + 0.75)
                : r < 2.5 / 2.75
                ? (r = 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375)
                : (r = 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375),
              y ? (1 - r) * 0.5 : r * 0.5 + 0.5
            );
          }),
        ),
        o(
          'Circ',
          B('CircOut', function (r) {
            return Math.sqrt(1 - (r = r - 1) * r);
          }),
          B('CircIn', function (r) {
            return -(Math.sqrt(1 - r * r) - 1);
          }),
          B('CircInOut', function (r) {
            return (r *= 2) < 1
              ? -0.5 * (Math.sqrt(1 - r * r) - 1)
              : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
          }),
        ),
        (e = function (r, y, l) {
          var D = C(
              'easing.' + r,
              function ($, I) {
                (this._p1 = $ >= 1 ? $ : 1),
                  (this._p2 = (I || l) / ($ < 1 ? $ : 1)),
                  (this._p3 = (this._p2 / N) * (Math.asin(1 / this._p1) || 0)),
                  (this._p2 = N / this._p2);
              },
              !0,
            ),
            m = (D.prototype = new rt());
          return (
            (m.constructor = D),
            (m.getRatio = y),
            (m.config = function ($, I) {
              return new D($, I);
            }),
            D
          );
        }),
        o(
          'Elastic',
          e(
            'ElasticOut',
            function (r) {
              return (
                this._p1 *
                  Math.pow(2, -10 * r) *
                  Math.sin((r - this._p3) * this._p2) +
                1
              );
            },
            0.3,
          ),
          e(
            'ElasticIn',
            function (r) {
              return -(
                this._p1 *
                Math.pow(2, 10 * (r -= 1)) *
                Math.sin((r - this._p3) * this._p2)
              );
            },
            0.3,
          ),
          e(
            'ElasticInOut',
            function (r) {
              return (r *= 2) < 1
                ? -0.5 *
                    (this._p1 *
                      Math.pow(2, 10 * (r -= 1)) *
                      Math.sin((r - this._p3) * this._p2))
                : this._p1 *
                    Math.pow(2, -10 * (r -= 1)) *
                    Math.sin((r - this._p3) * this._p2) *
                    0.5 +
                    1;
            },
            0.45,
          ),
        ),
        o(
          'Expo',
          B('ExpoOut', function (r) {
            return 1 - Math.pow(2, -10 * r);
          }),
          B('ExpoIn', function (r) {
            return Math.pow(2, 10 * (r - 1)) - 0.001;
          }),
          B('ExpoInOut', function (r) {
            return (r *= 2) < 1
              ? 0.5 * Math.pow(2, 10 * (r - 1))
              : 0.5 * (2 - Math.pow(2, -10 * (r - 1)));
          }),
        ),
        o(
          'Sine',
          B('SineOut', function (r) {
            return Math.sin(r * L);
          }),
          B('SineIn', function (r) {
            return -Math.cos(r * L) + 1;
          }),
          B('SineInOut', function (r) {
            return -0.5 * (Math.cos(Math.PI * r) - 1);
          }),
        ),
        C(
          'easing.EaseLookup',
          {
            find: function (r) {
              return rt.map[r];
            },
          },
          !0,
        ),
        P(w.SlowMo, 'SlowMo', 'ease,'),
        P(c, 'RoughEase', 'ease,'),
        P(u, 'SteppedEase', 'ease,'),
        R
      );
    },
    !0,
  );
  var Ii = Ue.Back,
    Ni = Ue.Elastic,
    Li = Ue.Bounce,
    Bi = Ue.RoughEase,
    Xi = Ue.SlowMo,
    ji = Ue.SteppedEase,
    qi = Ue.Circ,
    Yi = Ue.Expo,
    Gi = Ue.Sine,
    Ui = Ue.ExpoScaleEase;
  /*!
   * VERSION: 2.1.3
   * DATE: 2019-05-17
   * UPDATES AND DOCS AT: http://greensock.com
   *
   * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
   * This work is subject to the terms at http://greensock.com/standard-license or for
   * Club GreenSock members, the software agreement that was issued with your membership.
   *
   * @author: Jack Doyle, jack@greensock.com
   **/ var Ht = bi;
  Ht._autoActivated = [
    Tt,
    Pt,
    Pi,
    Si,
    yt,
    Jt,
    ti,
    Ii,
    Ni,
    Li,
    Bi,
    Xi,
    ji,
    qi,
    Yi,
    Gi,
    Ui,
  ];
  /*!
   * @file ScrollMagic GSAP Animation Plugin.
   *
   * requires: GSAP ~1.14
   * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
   * Greensock License info at http://www.greensock.com/licensing/
   */ var Wi = function (w, O, N) {
      var L = O,
        C = 'animation.gsap',
        B = window.console || {},
        P = Function.prototype.bind.call(B.error || B.log || function () {}, B);
      w ||
        P(
          '(' +
            C +
            ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.",
        ),
        L ||
          P(
            '(' +
              C +
              ') -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.',
          ),
        w.Scene.addOption('tweenChanges', !1, function (o) {
          return !!o;
        }),
        w.Scene.extend(function () {
          var o = this,
            g,
            S = function () {
              o._log &&
                (Array.prototype.splice.call(
                  arguments,
                  1,
                  0,
                  '(' + C + ')',
                  '->',
                ),
                o._log.apply(this, arguments));
            };
          o.on('progress.plugin_gsap', function () {
            R();
          }),
            o.on('destroy.plugin_gsap', function (s) {
              o.removeTween(s.reset);
            });
          var R = function () {
            if (g) {
              var s = o.progress(),
                M = o.state();
              g.repeat && g.repeat() === -1
                ? M === 'DURING' && g.paused()
                  ? g.play()
                  : M !== 'DURING' && !g.paused() && g.pause()
                : s != g.progress() &&
                  (o.duration() === 0
                    ? s > 0
                      ? g.play()
                      : g.reverse()
                    : o.tweenChanges() && g.tweenTo
                    ? g.tweenTo(s * g.duration())
                    : g.progress(s).pause());
            }
          };
          (o.setTween = function (s, M, u) {
            var T;
            arguments.length > 1 &&
              (arguments.length < 3 && ((u = M), (M = 1)), (s = L.to(s, M, u)));
            try {
              N ? (T = new N({ smoothChildTiming: !0 }).add(s)) : (T = s),
                T.pause();
            } catch {
              return (
                S(
                  1,
                  "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject",
                ),
                o
              );
            }
            if (
              (g && o.removeTween(),
              (g = T),
              s.repeat && s.repeat() === -1 && (g.repeat(-1), g.yoyo(s.yoyo())),
              o.tweenChanges() &&
                !g.tweenTo &&
                S(
                  2,
                  'WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.',
                ),
              g && o.controller() && o.triggerElement() && o.loglevel() >= 2)
            ) {
              var c = L.getTweensOf(o.triggerElement()),
                e = o.controller().info('vertical');
              c.forEach(function ($, I) {
                var Y = $.vars.css || $.vars,
                  k = e
                    ? Y.top !== void 0 || Y.bottom !== void 0
                    : Y.left !== void 0 || Y.right !== void 0;
                if (k)
                  return (
                    S(
                      2,
                      'WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!',
                    ),
                    !1
                  );
              });
            }
            if (parseFloat(L.version) >= 1.14)
              for (
                var r = g.getChildren ? g.getChildren(!0, !0, !1) : [g],
                  y = function () {
                    S(
                      2,
                      'WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another',
                    );
                  },
                  l = 0,
                  D,
                  m;
                l < r.length;
                l++
              )
                (D = r[l]),
                  m !== y &&
                    ((m = D.vars.onOverwrite),
                    (D.vars.onOverwrite = function () {
                      m && m.apply(this, arguments), y.apply(this, arguments);
                    }));
            return S(3, 'added tween'), R(), o;
          }),
            (o.removeTween = function (s) {
              return (
                g &&
                  (s && g.progress(0).pause(),
                  g.kill(),
                  (g = void 0),
                  S(
                    3,
                    'removed tween (reset: ' + (s ? 'true' : 'false') + ')',
                  )),
                o
              );
            });
        });
    },
    Hi = { ScrollMagicPluginGsap: Wi };
  Hi.ScrollMagicPluginGsap(wi, Ht, Pt);
  const Lt = new bt.Controller();
  function Vi(w) {
    const N = w.innerText.split(' ').map((L) =>
      L.split('')
        .map((P) => `<span>${P}</span>`)
        .join(''),
    );
    return (w.innerHTML = N.join(' ')), w;
  }
  function $i() {
    if (document.querySelectorAll('.firstSceneItem')) {
      let C = new Pt();
      C.staggerFromTo(
        '.firstSceneItem',
        0.6,
        { x: '-50px', opacity: 0 },
        { x: '15px', opacity: 1, ease: Mt.easeInOut },
        '0.1',
      ).staggerFromTo(
        '.firstSceneItem',
        0.6,
        { x: '15px' },
        { x: 0, ease: vi.easeInOut },
        '0.1',
        '-=0.1',
      ),
        C.delay(1);
    }
    if (document.querySelectorAll('.textStagger1')) {
      let C = new Pt();
      C.staggerFromTo(
        '.textStagger1',
        0.6,
        { x: '10px', opacity: 0 },
        { x: '30px', opacity: 1, ease: Mt.easeInOut },
        '0.1',
      ).staggerFromTo(
        '.textStagger1',
        0.6,
        { x: '30px' },
        { x: 0, ease: Mt.easeInOut },
        '0.1',
        '-=0.2',
      ),
        new bt.Scene({
          triggerElement: '#aboutSceneTrigger',
          triggerHook: 'onCenter',
          reverse: !1,
        })
          .setTween(C)
          .addTo(Lt);
    }
    const N = document.querySelectorAll('.skill-col');
    N &&
      N.forEach((C) => {
        const B = Ht.fromTo(
          C,
          1,
          { y: '50px', opacity: 0, scale: 0.8, boxShadow: 0 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            boxShadow: '20px 20px 60px #d4d4d4, -20px -20px 60px #ffffff;',
            ease: Mt.easeOut,
          },
          '0.15',
        );
        new bt.Scene({ triggerElement: C, triggerHook: 0.7, reverse: !0 })
          .setTween(B)
          .addTo(Lt);
      });
    const L = document.querySelectorAll(
      '.heading__primary:not(.anim-false), .heading__secondary:not(.anim-false)',
    );
    window.innerWidth >= 576 &&
      L.forEach((C) => {
        C = Vi(C);
        const B = C.querySelectorAll('span'),
          P = new Pt();
        P.staggerFromTo(
          B,
          0.35,
          { y: 20, x: 20, opacity: 0 },
          { y: 0, x: 0, opacity: 1, ease: Mt.easeOut },
          '0.05',
          '-=0.025',
        ),
          new bt.Scene({ triggerElement: C, triggerHook: 0.7, reverse: !1 })
            .setTween(P)
            .addTo(Lt);
      });
  }
  function Zi() {
    const w = document.querySelectorAll('.personal-project'),
      O = document.querySelectorAll('.project-slide'),
      N = document.querySelectorAll('.project-slide__shadow');
    O &&
      N &&
      O.forEach((L, C) => {
        const B = new Pt();
        let P, o;
        B.fromTo(L, 2, { y: '-25px' }, { y: 0 }),
          B.fromTo(
            N[C],
            2,
            { boxShadow: '0 10px 6px -6px #212121' },
            { boxShadow: '0 20px 12px -3px #000000' },
            '-=2',
          ),
          window.width > 1200
            ? ((P = w[C]), (o = 0.25))
            : window.innerWidth <= 1024 && window.innerWidth > 768
            ? ((P = w[C]), (o = 0.3))
            : window.innerWidth <= 768 && window.innerWidth > 576
            ? ((P = w[C]), (o = 0.15))
            : window.innerWidth <= 576
            ? ((P = L), (o = 0.1))
            : ((P = w[C]), (o = 0.15));
        let g = new bt.Scene({ triggerElement: P, triggerHook: o, reverse: !0 })
          .setTween(B)
          .addTo(Lt);
        return (
          g.on('start', function () {
            this.reverse = !1;
          }),
          g.on('end', function () {
            this.reverse = !0;
          }),
          g
        );
      });
  }
  const ni = document.querySelector('.nav__container'),
    Qi = document.querySelector('.nav__button'),
    Ki = document.querySelector('.nav__close'),
    Ji = () => {
      ni.classList.add('nav__active');
    },
    er = () => {
      ni.classList.remove('nav__active');
    };
  function tr() {
    Qi.addEventListener('click', Ji), Ki.addEventListener('click', er);
  }
  function ir(w) {
    w.forEach((O) => {
      O.intersectionRatio > 0 &&
        ((O.target.src = O.target.dataset.src),
        setTimeout(function () {
          O.target.classList.add('visible');
        }, 300),
        si.unobserve(O.target));
    });
  }
  const si = new IntersectionObserver(ir, {
    rootMargin: '100px',
    threshold: 0,
  });
  function rr() {
    let w = document.querySelectorAll('img.lazyloaded');
    w.length > 0 &&
      w.forEach((O) => {
        si.observe(O);
      });
  }
  function nr() {
    const w = document.querySelector('#portfolioContactSubmit');
    w.disabled = !0;
    const O = document.querySelector('#portfolioContactForm');
    if (O && O.checkValidity()) {
      const N = sr(O);
      fetch(`${window.location.origin}/.netlify/functions/mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: N,
      })
        .then((C) => (O.reset(), C.json()))
        .then((C) => console.log(C))
        .catch((C) => console.log(C))
        .finally(() => (w.disabled = !1));
    } else
      alert(`Incorrect form submission.
Form requires a name, email address and short message.`),
        (w.disabled = !1);
  }
  function sr(w) {
    const O = new FormData(w);
    let N = new Object();
    return O.forEach((C, B) => (N[B] = C)), JSON.stringify(N);
  }
  function ar() {
    const w = document.querySelector('#portfolioContactSubmit');
    w && w.addEventListener('click', nr);
  }
  window.addEventListener('DOMContentLoaded', () => {
    tr(), rr(), ar();
  });
  window.addEventListener('load', () => {
    $i(), Zi();
  });
});
export default or();
