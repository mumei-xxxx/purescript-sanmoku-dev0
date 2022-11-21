(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map12(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f) {
      return function(g) {
        return function(x) {
          return f(x)(g(x));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map8 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map8($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map8 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply1(map8(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure15 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply3(pure15(f))(a);
      };
    };
  };
  var applicativeFn = {
    pure: function(x) {
      return function(v) {
        return x;
      };
    },
    Apply0: function() {
      return applyFn;
    }
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind12 = bind(dictBind);
    return function(m) {
      return bind12(m)(identity3);
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure7 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr2 = foldr(dictFoldable);
      return function(f) {
        return foldr2(function($454) {
          return applySecond3(f($454));
        })(pure7(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty5;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append2(f(x))(acc);
          };
        })(mempty5);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure7 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind4(f)(function(f$prime) {
          return bind4(a)(function(a$prime) {
            return pure7(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error2) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error2) {
        setTimeout(function() {
          throw error2;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error2) {
        return left(error2);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error2) {
        k(left(error2))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size3 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size3 !== 0) {
          size3--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size3 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size3) % limit] = cb;
          size3++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error2) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step2 = aff;
      var fail = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step2 = bhead(step2);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step2 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step2)) {
                status = RETURN;
                fail = step2;
                step2 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step2 = util.fromRight(step2);
              }
              break;
            case CONTINUE:
              switch (step2.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step2._2;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step2 = util.right(step2._1);
                  } else {
                    status = STEP_BIND;
                    step2 = step2._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step2 = runSync(util.left, util.right, step2._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step2 = runAsync(util.left, step2._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step2 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step2._1);
                  step2 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step2._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step2._1) {
                    tmp.run();
                  }
                  step2 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step2 = sequential2(util, supervisor, step2._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step2 = interrupt || fail || step2;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail) {
                      status = CONTINUE;
                      step2 = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step2 = util.fromRight(step2);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step2);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step2 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step2 = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    step2 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step2 = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step2));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step2) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step2);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error2, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error2);
              status = COMPLETED;
              step2 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error2)), attempts, interrupt);
                }
                status = RETURN;
                step2 = null;
                fail = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step2 = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error2, par2, cb2) {
        var step2 = par2;
        var head = null;
        var tail = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step2.tag) {
              case FORKED:
                if (step2._3 === EMPTY) {
                  tmp = fibers[step2._1];
                  kills2[count++] = tmp.kill(error2, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head === null) {
                  break loop;
                }
                step2 = head._2;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head) {
                  tail = new Aff2(CONS, head, tail);
                }
                head = step2;
                step2 = step2._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head, tail) {
        var fail, step2, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step2 = null;
        } else {
          step2 = result;
          fail = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head === null) {
              cb(fail || step2)();
              return;
            }
            if (head._3 !== EMPTY) {
              return;
            }
            switch (head.tag) {
              case MAP:
                if (fail === null) {
                  head._3 = util.right(head._1(util.fromRight(step2)));
                  step2 = head._3;
                } else {
                  head._3 = fail;
                }
                break;
              case APPLY:
                lhs = head._1._3;
                rhs = head._2._3;
                if (fail) {
                  head._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(fail, null, null);
                      } else {
                        join3(fail, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head._3 = step2;
                }
                break;
              case ALT:
                lhs = head._1._3;
                rhs = head._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head._3 = fail;
                } else {
                  head._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head._2 : head._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(step2, null, null);
                      } else {
                        join3(step2, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail === null) {
              head = null;
            } else {
              head = tail._1;
              tail = tail._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step2 = par;
        var head = null;
        var tail = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step2)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head === null) {
                  break loop;
                }
                if (head._1 === EMPTY) {
                  head._1 = step2;
                  status = CONTINUE;
                  step2 = head._2;
                  head._2 = EMPTY;
                } else {
                  head._2 = step2;
                  step2 = head;
                  if (tail === null) {
                    head = null;
                  } else {
                    head = tail._1;
                    tail = tail._2;
                  }
                }
            }
          }
        root = step2;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error2, cb2) {
        interrupt = util.left(error2);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error2, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Control.Monad.Reader.Trans/index.js
  var ReaderT = function(x) {
    return x;
  };
  var runReaderT = function(v) {
    return v;
  };
  var monadTransReaderT = {
    lift: function(dictMonad) {
      return function($147) {
        return ReaderT($$const($147));
      };
    }
  };
  var lift3 = /* @__PURE__ */ lift(monadTransReaderT);
  var mapReaderT = function(f) {
    return function(v) {
      return function($148) {
        return f(v($148));
      };
    };
  };
  var functorReaderT = function(dictFunctor) {
    return {
      map: function() {
        var $149 = map(dictFunctor);
        return function($150) {
          return mapReaderT($149($150));
        };
      }()
    };
  };
  var applyReaderT = function(dictApply) {
    var apply3 = apply(dictApply);
    var functorReaderT1 = functorReaderT(dictApply.Functor0());
    return {
      apply: function(v) {
        return function(v1) {
          return function(r) {
            return apply3(v(r))(v1(r));
          };
        };
      },
      Functor0: function() {
        return functorReaderT1;
      }
    };
  };
  var bindReaderT = function(dictBind) {
    var bind4 = bind(dictBind);
    var applyReaderT1 = applyReaderT(dictBind.Apply0());
    return {
      bind: function(v) {
        return function(k) {
          return function(r) {
            return bind4(v(r))(function(a) {
              var v1 = k(a);
              return v1(r);
            });
          };
        };
      },
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var applicativeReaderT = function(dictApplicative) {
    var applyReaderT1 = applyReaderT(dictApplicative.Apply0());
    return {
      pure: function() {
        var $154 = pure(dictApplicative);
        return function($155) {
          return ReaderT($$const($154($155)));
        };
      }(),
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var monadReaderT = function(dictMonad) {
    var applicativeReaderT1 = applicativeReaderT(dictMonad.Applicative0());
    var bindReaderT1 = bindReaderT(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeReaderT1;
      },
      Bind1: function() {
        return bindReaderT1;
      }
    };
  };
  var monadAskReaderT = function(dictMonad) {
    var monadReaderT1 = monadReaderT(dictMonad);
    return {
      ask: pure(dictMonad.Applicative0()),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };
  var monadEffectReader = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadReaderT1 = monadReaderT(Monad0);
    return {
      liftEffect: function() {
        var $157 = lift3(Monad0);
        var $158 = liftEffect(dictMonadEffect);
        return function($159) {
          return $157($158($159));
        };
      }(),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };
  var monadTellReaderT = function(dictMonadTell) {
    var Monad1 = dictMonadTell.Monad1();
    var Semigroup0 = dictMonadTell.Semigroup0();
    var monadReaderT1 = monadReaderT(Monad1);
    return {
      tell: function() {
        var $163 = lift3(Monad1);
        var $164 = tell(dictMonadTell);
        return function($165) {
          return $163($164($165));
        };
      }(),
      Semigroup0: function() {
        return Semigroup0;
      },
      Monad1: function() {
        return monadReaderT1;
      }
    };
  };

  // output/Control.Monad.Writer.Trans/index.js
  var WriterT = function(x) {
    return x;
  };
  var runWriterT = function(v) {
    return v;
  };
  var monadTransWriterT = function(dictMonoid) {
    var mempty5 = mempty(dictMonoid);
    return {
      lift: function(dictMonad) {
        var bind4 = bind(dictMonad.Bind1());
        var pure7 = pure(dictMonad.Applicative0());
        return function(m) {
          return bind4(m)(function(a) {
            return pure7(new Tuple(a, mempty5));
          });
        };
      }
    };
  };
  var mapWriterT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorWriterT = function(dictFunctor) {
    var map8 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map8(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append2 = append(dictSemigroup);
    return function(dictApply) {
      var apply3 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map8 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append2(v3.value1)(v4.value1));
              };
            };
            return apply3(map8(k)(v))(v1);
          };
        },
        Functor0: function() {
          return functorWriterT1;
        }
      };
    };
  };
  var bindWriterT = function(dictSemigroup) {
    var append2 = append(dictSemigroup);
    var applyWriterT1 = applyWriterT(dictSemigroup);
    return function(dictBind) {
      var bind4 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map8 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind4(v)(function(v1) {
              var v2 = k(v1.value0);
              return map8(function(v3) {
                return new Tuple(v3.value0, append2(v1.value1)(v3.value1));
              })(v2);
            });
          };
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var applicativeWriterT = function(dictMonoid) {
    var mempty5 = mempty(dictMonoid);
    var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
    return function(dictApplicative) {
      var pure7 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a) {
          return pure7(new Tuple(a, mempty5));
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var monadWriterT = function(dictMonoid) {
    var applicativeWriterT1 = applicativeWriterT(dictMonoid);
    var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
    return function(dictMonad) {
      var applicativeWriterT2 = applicativeWriterT1(dictMonad.Applicative0());
      var bindWriterT2 = bindWriterT1(dictMonad.Bind1());
      return {
        Applicative0: function() {
          return applicativeWriterT2;
        },
        Bind1: function() {
          return bindWriterT2;
        }
      };
    };
  };
  var monadEffectWriter = function(dictMonoid) {
    var lift5 = lift(monadTransWriterT(dictMonoid));
    var monadWriterT1 = monadWriterT(dictMonoid);
    return function(dictMonadEffect) {
      var Monad0 = dictMonadEffect.Monad0();
      var monadWriterT22 = monadWriterT1(Monad0);
      return {
        liftEffect: function() {
          var $249 = lift5(Monad0);
          var $250 = liftEffect(dictMonadEffect);
          return function($251) {
            return $249($250($251));
          };
        }(),
        Monad0: function() {
          return monadWriterT22;
        }
      };
    };
  };
  var monadTellWriterT = function(dictMonoid) {
    var Semigroup0 = dictMonoid.Semigroup0();
    var monadWriterT1 = monadWriterT(dictMonoid);
    return function(dictMonad) {
      var monadWriterT22 = monadWriterT1(dictMonad);
      return {
        tell: function() {
          var $252 = pure(dictMonad.Applicative0());
          var $253 = Tuple.create(unit);
          return function($254) {
            return WriterT($252($253($254)));
          };
        }(),
        Semigroup0: function() {
          return Semigroup0;
        },
        Monad1: function() {
          return monadWriterT22;
        }
      };
    };
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map8) {
        return function(pure7) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure7([]);
                  case 1:
                    return map8(array1)(f(array[bot]));
                  case 2:
                    return apply3(map8(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map8(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply3(map8(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Control.Parallel/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential2 = sequential(dictParallel);
    var traverse_3 = traverse_(dictParallel.Applicative1());
    var parallel2 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_1 = traverse_3(dictFoldable);
      return function(f) {
        var $48 = traverse_1(function($50) {
          return parallel2(f($50));
        });
        return function($49) {
          return sequential2($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity5);
    };
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
      return val;
    };
  };
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($74) {
    return $$void2(launchAff($74));
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure2 = /* @__PURE__ */ pure(applicativeAff);
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($75) {
    return Canceler($$const(liftEffect2($75)));
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $82 = parallel(parallelAff);
        return function($83) {
          return $82(pure2($83));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v(err), v1(err)]);
        };
      };
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");
  function setAttribute(name16) {
    return function(value12) {
      return function(element) {
        return function() {
          element.setAttribute(name16, value12);
        };
      };
    };
  }
  function removeAttribute(name16) {
    return function(element) {
      return function() {
        element.removeAttribute(name16);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name16, value12) {
    if (typeof window !== "undefined") {
      var ty = window[name16];
      if (ty != null && value12 instanceof ty) {
        return just(value12);
      }
    }
    var obj = value12;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name16) {
        return just(value12);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name16) {
    return function(value12) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name16, value12);
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;
  var toEventTarget = unsafeCoerce2;
  var fromNode = /* @__PURE__ */ unsafeReadProtoTagged("Element");

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map2 = /* @__PURE__ */ map(functorEffect);
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map2(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };
  var body = function(doc) {
    return map2(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget2 = unsafeCoerce2;

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded = "DOMContentLoaded";

  // output/Jelly.Aff/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var pure3 = /* @__PURE__ */ pure(applicativeFn);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidCanceler));
  var discard22 = /* @__PURE__ */ discard2(bindAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var map3 = /* @__PURE__ */ map(functorMaybe);
  var awaitDomContentLoaded = /* @__PURE__ */ makeAff(function(callback) {
    return function __do() {
      var w = windowImpl();
      var rs = bindFlipped2(readyState)(bindFlipped2(document2)(windowImpl))();
      if (rs instanceof Loading) {
        var et = toEventTarget2(w);
        var listener = eventListener(pure3(callback(new Right(unit))))();
        addEventListener(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return mempty2();
    };
  });
  var awaitBody = /* @__PURE__ */ discard22(awaitDomContentLoaded)(function() {
    return bind1(liftEffect3(bindFlipped2(body)(bindFlipped2(document2)(windowImpl))))(function(htmlEl) {
      return pure22(map3(toNode2)(htmlEl));
    });
  });

  // output/Jelly.Signal/foreign.js
  var newChannelImpl = (initialValue) => () => ({
    subscriptions: /* @__PURE__ */ new Set(),
    value: initialValue
  });
  var modifyChannelImpl = (channel) => (fn) => () => {
    channel.value = fn(channel.value);
    channel.subscriptions.forEach((subscription) => {
      subscription.cleaner();
      subscription.cleaner = subscription.callback(channel.value)();
    });
  };
  var readChannel = (channel) => () => channel.value;
  var subscribeChannel = (channel) => (callback) => () => {
    const subscription = {
      callback,
      cleaner: callback(channel.value)()
    };
    channel.subscriptions.add(subscription);
    return () => {
      subscription.cleaner();
      channel.subscriptions.delete(subscription);
    };
  };

  // output/Jelly.Signal/index.js
  var map4 = /* @__PURE__ */ map(functorEffect);
  var apply2 = /* @__PURE__ */ apply(applyEffect);
  var pure4 = /* @__PURE__ */ pure(applicativeEffect);
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var applySecond2 = /* @__PURE__ */ applySecond(applyEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(/* @__PURE__ */ monoidEffect(monoidUnit)));
  var functorSignal = {
    map: function(f) {
      return function(v) {
        return {
          run: function(cb) {
            return v.run(function($97) {
              return cb(f($97));
            });
          },
          get: map4(f)(v.get)
        };
      };
    }
  };
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorSignal);
  var applySignal = {
    apply: function(v) {
      return function(v1) {
        return {
          run: function(cb) {
            return v.run(function(f) {
              return v1.run(function($98) {
                return cb(f($98));
              });
            });
          },
          get: apply2(v.get)(v1.get)
        };
      };
    },
    Functor0: function() {
      return functorSignal;
    }
  };
  var lift23 = /* @__PURE__ */ lift2(applySignal);
  var bindSignal = {
    bind: function(v) {
      return function(f) {
        return {
          run: function(cb) {
            return v.run(function(a) {
              var v1 = f(a);
              return v1.run(cb);
            });
          },
          get: function __do() {
            var a = v.get();
            var v1 = f(a);
            return v1.get();
          }
        };
      };
    },
    Apply0: function() {
      return applySignal;
    }
  };
  var semigroupSignal = function(dictSemigroup) {
    return {
      append: lift23(append(dictSemigroup))
    };
  };
  var applicativeSignal = {
    pure: function(a) {
      return {
        run: function(cb) {
          return cb(a);
        },
        get: pure4(a)
      };
    },
    Apply0: function() {
      return applySignal;
    }
  };
  var pure1 = /* @__PURE__ */ pure(applicativeSignal);
  var monoidSignal = function(dictMonoid) {
    var semigroupSignal1 = semigroupSignal(dictMonoid.Semigroup0());
    return {
      mempty: pure1(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupSignal1;
      }
    };
  };
  var subscribe = function(chn) {
    return {
      run: subscribeChannel(chn),
      get: readChannel(chn)
    };
  };
  var runSignal = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect7(v.run(identity6));
    };
  };
  var watchSignal = function(dictMonadEffect) {
    var bind12 = bind(dictMonadEffect.Monad0().Bind1());
    var liftEffect7 = liftEffect(dictMonadEffect);
    var runSignal1 = runSignal(dictMonadEffect);
    return function(sig) {
      return bind12(liftEffect7($$new(true)))(function(isInit) {
        return runSignal1(mapFlipped2(sig)(function(eff) {
          return function __do() {
            var init = read(isInit)();
            if (init) {
              return applySecond2(write(false)(isInit))(mempty3)();
            }
            ;
            return eff();
          };
        }));
      });
    };
  };
  var readSignal = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect7(v.get);
    };
  };
  var newChannel = function(dictMonadEffect) {
    var $99 = liftEffect(dictMonadEffect);
    return function($100) {
      return $99(newChannelImpl($100));
    };
  };
  var newState = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var bind12 = bind(Monad0.Bind1());
    var newChannel1 = newChannel(dictMonadEffect);
    var pure23 = pure(Monad0.Applicative0());
    return function(a) {
      return bind12(newChannel1(a))(function(chn) {
        return pure23(new Tuple(subscribe(chn), chn));
      });
    };
  };
  var modifyChannel = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(dictMonadEffect);
    return function(c) {
      return function(f) {
        return liftEffect7(modifyChannelImpl(c)(f));
      };
    };
  };
  var writeChannel = function(dictMonadEffect) {
    var modifyChannel1 = modifyChannel(dictMonadEffect);
    return function(c) {
      return function(a) {
        return modifyChannel1(c)($$const(a));
      };
    };
  };
  var writeChannel1 = /* @__PURE__ */ writeChannel(monadEffectEffect);
  var memoSignal = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var bind12 = bind(Monad0.Bind1());
    var newChannel1 = newChannel(dictMonadEffect);
    var runSignal1 = runSignal(dictMonadEffect);
    var pure23 = pure(Monad0.Applicative0());
    return function(sig) {
      return bind12(newChannel1(unit))(function(chn) {
        return bind12(runSignal1(mapFlipped2(sig)(function(eff) {
          return function __do() {
            var v = eff();
            writeChannel1(chn)(v.value0)();
            return v.value1;
          };
        })))(function(cln) {
          return pure23(new Tuple(subscribe(chn), cln));
        });
      });
    };
  };

  // output/Jelly.Hooks/index.js
  var monoidEffect2 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var semigroupEffect2 = /* @__PURE__ */ semigroupEffect(semigroupUnit);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorSignal);
  var writeChannel2 = /* @__PURE__ */ writeChannel(monadEffectEffect);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var lift4 = /* @__PURE__ */ lift(monadTransReaderT);
  var map5 = /* @__PURE__ */ map(functorSignal);
  var join2 = /* @__PURE__ */ join(bindSignal);
  var void1 = /* @__PURE__ */ $$void(functorEffect);
  var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidEffect2)(monadEffect));
  var monadHooks = /* @__PURE__ */ monadWriterT(monoidEffect2)(monadEffect);
  var monadEffectHooks = /* @__PURE__ */ monadEffectWriter(monoidEffect2)(monadEffectEffect);
  var memoSignal2 = /* @__PURE__ */ memoSignal(monadEffectHooks);
  var bindHooks = /* @__PURE__ */ bindWriterT(semigroupEffect2)(bindEffect);
  var bind2 = /* @__PURE__ */ bind(bindHooks);
  var discard23 = /* @__PURE__ */ discard3(bindHooks);
  var applicativeHooks = /* @__PURE__ */ applicativeWriterT(monoidEffect2)(applicativeEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeHooks);
  var useHooks = function(dict) {
    return dict.useHooks;
  };
  var useHooks_ = function(dictMonadHooks) {
    var void2 = $$void(dictMonadHooks.MonadEffect0().Monad0().Bind1().Apply0().Functor0());
    var useHooks1 = useHooks(dictMonadHooks);
    return function(sig) {
      return void2(useHooks1(sig));
    };
  };
  var useCleaner = function(dict) {
    return dict.useCleaner;
  };
  var useSubscriber = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var Monad0 = MonadEffect0.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind32 = bind(Bind1);
    var newState2 = newState(MonadEffect0);
    var pure23 = pure(Monad0.Applicative0());
    var liftEffect22 = liftEffect(MonadEffect0);
    var applySecond1 = applySecond(Bind1.Apply0());
    var discard33 = discard3(Bind1);
    var useCleaner1 = useCleaner(dictMonadHooks);
    var useHooks_1 = useHooks_(dictMonadHooks);
    return function(subscribe2) {
      return function(handler) {
        return bind32(newState2(pure23(unit)))(function(v) {
          return bind32(liftEffect22(subscribe2(function(e) {
            return writeChannel2(v.value1)(applySecond1(handler(e))(pure23(unit)));
          })))(function(sub2) {
            return discard33(useCleaner1(sub2))(function() {
              return useHooks_1(v.value0);
            });
          });
        });
      };
    };
  };
  var useEvent = function(dictMonadHooks) {
    var useSubscriber1 = useSubscriber(dictMonadHooks);
    return function(target5) {
      return function(eventType) {
        return function(handler) {
          var subscribe2 = function(callback) {
            return function __do() {
              var el2 = liftEffect4(eventListener(callback))();
              liftEffect4(addEventListener(eventType)(el2)(false)(target5))();
              return removeEventListener(eventType)(el2)(false)(target5);
            };
          };
          return useSubscriber1(subscribe2)(handler);
        };
      };
    };
  };
  var monadHooksReaderT = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var Monad0 = MonadEffect0.Monad0();
    var lift1 = lift4(Monad0);
    var bind32 = bind(bindReaderT(Monad0.Bind1()));
    var ask3 = ask(monadAskReaderT(Monad0));
    var useHooks1 = useHooks(dictMonadHooks);
    var monadEffectReader2 = monadEffectReader(MonadEffect0);
    return {
      useCleaner: function() {
        var $252 = useCleaner(dictMonadHooks);
        return function($253) {
          return lift1($252($253));
        };
      }(),
      useHooks: function(sig) {
        return bind32(ask3)(function(r) {
          return lift1(useHooks1(map5(flip(runReaderT)(r))(sig)));
        });
      },
      MonadEffect0: function() {
        return monadEffectReader2;
      }
    };
  };
  var monadHooksWriterTSignal = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var Monad0 = MonadEffect0.Monad0();
    var useCleaner1 = useCleaner(dictMonadHooks);
    var Bind1 = Monad0.Bind1();
    var useHooks1 = useHooks(dictMonadHooks);
    var Applicative0 = Monad0.Applicative0();
    return function(dictMonoid) {
      var monoidSignal3 = monoidSignal(dictMonoid);
      var lift1 = lift(monadTransWriterT(monoidSignal3))(Monad0);
      var bindWriterT2 = bindWriterT(semigroupSignal(dictMonoid.Semigroup0()))(Bind1);
      var bind32 = bind(bindWriterT2);
      var discard33 = discard3(bindWriterT2);
      var tell1 = tell(monadTellWriterT(monoidSignal3)(Monad0));
      var pure23 = pure(applicativeWriterT(monoidSignal3)(Applicative0));
      var monadEffectWriter2 = monadEffectWriter(monoidSignal3)(MonadEffect0);
      return {
        useCleaner: function($254) {
          return lift1(useCleaner1($254));
        },
        useHooks: function(sig) {
          return bind32(lift1(useHooks1(map5(runWriterT)(sig))))(function(sigAW) {
            return discard33(tell1(join2(map5(snd)(sigAW))))(function() {
              return pure23(map5(fst)(sigAW));
            });
          });
        },
        MonadEffect0: function() {
          return monadEffectWriter2;
        }
      };
    };
  };
  var runHooks = function(dictMonadEffect) {
    var liftEffect22 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect22(runWriterT(v));
    };
  };
  var runHooks1 = /* @__PURE__ */ runHooks(monadEffectEffect);
  var runHooks_ = function(m) {
    return void1(runHooks1(m));
  };
  var monadHooksHooks = {
    useCleaner: function(cleaner) {
      return tell2(cleaner);
    },
    useHooks: function(sig) {
      return bind2(memoSignal2(mapFlipped3(sig)(function(h) {
        return runHooks1(h);
      })))(function(v) {
        return discard23(tell2(v.value1))(function() {
          return pure12(v.value0);
        });
      });
    },
    MonadEffect0: function() {
      return monadEffectHooks;
    }
  };
  var liftHooks = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var Monad0 = MonadEffect0.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind32 = bind(Bind1);
    var runHooks2 = runHooks(MonadEffect0);
    var discard33 = discard3(Bind1);
    var useCleaner1 = useCleaner(dictMonadHooks);
    var pure23 = pure(Monad0.Applicative0());
    return function(m) {
      return bind32(runHooks2(m))(function(v) {
        return discard33(useCleaner1(v.value1))(function() {
          return pure23(v.value0);
        });
      });
    };
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value12) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value12);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value12) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons(head, tail);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Jelly.Prop/index.js
  var pure13 = /* @__PURE__ */ pure(applicativeSignal);
  var PropAttribute = /* @__PURE__ */ function() {
    function PropAttribute2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PropAttribute2.create = function(value0) {
      return function(value1) {
        return new PropAttribute2(value0, value1);
      };
    };
    return PropAttribute2;
  }();
  var PropHandler = /* @__PURE__ */ function() {
    function PropHandler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PropHandler2.create = function(value0) {
      return function(value1) {
        return new PropHandler2(value0, value1);
      };
    };
    return PropHandler2;
  }();
  var PropMountEffect = /* @__PURE__ */ function() {
    function PropMountEffect2(value0) {
      this.value0 = value0;
    }
    ;
    PropMountEffect2.create = function(value0) {
      return new PropMountEffect2(value0);
    };
    return PropMountEffect2;
  }();
  var attrValueString = /* @__PURE__ */ function() {
    return {
      toAttrValue: Just.create
    };
  }();
  var toAttrValue = function(dict) {
    return dict.toAttrValue;
  };
  var attr = function(dictAttrValue) {
    var toAttrValue3 = toAttrValue(dictAttrValue);
    return function(name16) {
      return function(value12) {
        return new PropAttribute(name16, pure13(toAttrValue3(value12)));
      };
    };
  };

  // output/Jelly.Component/index.js
  var pure5 = /* @__PURE__ */ pure(applicativeSignal);
  var textSig = function(dict) {
    return dict.textSig;
  };
  var text5 = function(dictComponent) {
    var $40 = textSig(dictComponent);
    return function($41) {
      return $40(pure5($41));
    };
  };
  var el = function(dict) {
    return dict.el;
  };

  // output/Jelly.Element/index.js
  var div2 = function(dictComponent) {
    return el(dictComponent)("div");
  };

  // output/Jelly.Hydrate/foreign.js
  var createDocumentType = (name16) => (publicId2) => (systemId2) => (doc) => () => doc.implementation.createDocumentType(name16, publicId2, systemId2);
  var convertInnerHtmlToNodes = (innerHtml) => () => {
    const div3 = document.createElement("div");
    div3.innerHTML = innerHtml;
    return Array.from(div3.childNodes);
  };
  var updateChildren = (elem2) => (children2) => () => {
    const prevNodes = Array.from(elem2.childNodes);
    const nodesSet = new Set(children2);
    const nodesToRemove = prevNodes.filter((node) => !nodesSet.has(node));
    nodesToRemove.forEach((node) => elem2.removeChild(node));
    let itrNode = elem2.firstChild;
    for (const node of children2) {
      if (itrNode === node) {
        itrNode = itrNode.nextSibling;
        continue;
      }
      if (itrNode === null) {
        elem2.appendChild(node);
        continue;
      }
      elem2.insertBefore(node, itrNode);
    }
  };

  // output/Web.DOM.Document/foreign.js
  var getEffProp2 = function(name16) {
    return function(doc) {
      return function() {
        return doc[name16];
      };
    };
  };
  var url = getEffProp2("URL");
  var documentURI = getEffProp2("documentURI");
  var origin2 = getEffProp2("origin");
  var compatMode = getEffProp2("compatMode");
  var characterSet = getEffProp2("characterSet");
  var contentType = getEffProp2("contentType");
  var _documentElement2 = getEffProp2("documentElement");
  function createElement(localName2) {
    return function(doc) {
      return function() {
        return doc.createElement(localName2);
      };
    };
  }
  function _createElementNS(ns) {
    return function(qualifiedName) {
      return function(doc) {
        return function() {
          return doc.createElementNS(ns, qualifiedName);
        };
      };
    };
  }
  function createTextNode(data) {
    return function(doc) {
      return function() {
        return doc.createTextNode(data);
      };
    };
  }

  // output/Web.DOM.Document/index.js
  var createElementNS = function($6) {
    return _createElementNS(toNullable($6));
  };

  // output/Web.DOM.DocumentType/foreign.js
  var getProp2 = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var name15 = getProp2("name");
  var publicId = getProp2("publicId");
  var systemId = getProp2("systemId");

  // output/Web.DOM.DocumentType/index.js
  var toNode4 = unsafeCoerce2;
  var fromNode2 = /* @__PURE__ */ unsafeReadProtoTagged("DocumentType");

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function setTextContent(value12) {
    return function(node) {
      return function() {
        node.textContent = value12;
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map6(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();
  var firstChild = /* @__PURE__ */ function() {
    var $25 = map6(toMaybe);
    return function($26) {
      return $25(_firstChild($26));
    };
  }();

  // output/Web.DOM.Text/index.js
  var toNode5 = unsafeCoerce2;
  var fromNode3 = /* @__PURE__ */ unsafeReadProtoTagged("Text");

  // output/Jelly.Hydrate/index.js
  var monoidSignal2 = /* @__PURE__ */ monoidSignal(monoidArray);
  var monadWriterT2 = /* @__PURE__ */ monadWriterT(monoidSignal2)(monadHooks);
  var semigroupSignal2 = /* @__PURE__ */ semigroupSignal(semigroupArray);
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorSignal);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var mempty4 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(/* @__PURE__ */ monoidEffect(monoidUnit)));
  var pure6 = /* @__PURE__ */ pure(applicativeSignal);
  var bind3 = /* @__PURE__ */ bind(bindHooks);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectHooks);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindEffect);
  var discard24 = /* @__PURE__ */ discard4(bindHooks);
  var map7 = /* @__PURE__ */ map(functorEffect);
  var map1 = /* @__PURE__ */ map(functorSignal);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableArray);
  var monadTellSignalArrayNodeH = /* @__PURE__ */ monadTellReaderT(/* @__PURE__ */ monadTellWriterT(monoidSignal2)(monadHooks));
  var tell3 = /* @__PURE__ */ tell(monadTellSignalArrayNodeH);
  var monadHooksHydrateM = /* @__PURE__ */ monadHooksReaderT(/* @__PURE__ */ monadHooksWriterTSignal(monadHooksHooks)(monoidArray));
  var liftHooks2 = /* @__PURE__ */ liftHooks(monadHooksHydrateM);
  var useHooks2 = /* @__PURE__ */ useHooks(monadHooksHydrateM);
  var monadEffectHydrateM = /* @__PURE__ */ monadEffectReader(/* @__PURE__ */ monadEffectWriter(monoidSignal2)(monadEffectHooks));
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectHydrateM);
  var readSignal2 = /* @__PURE__ */ readSignal(monadEffectHydrateM);
  var monadAskRefMaybeNodeHydra = /* @__PURE__ */ monadAskReaderT(monadWriterT2);
  var ask2 = /* @__PURE__ */ ask(monadAskRefMaybeNodeHydra);
  var bindHydrateM = /* @__PURE__ */ bindReaderT(/* @__PURE__ */ bindWriterT(semigroupSignal2)(bindHooks));
  var bind22 = /* @__PURE__ */ bind(bindHydrateM);
  var discard32 = /* @__PURE__ */ discard4(bindHydrateM);
  var applicativeHydrateM = /* @__PURE__ */ applicativeReaderT(/* @__PURE__ */ applicativeWriterT(monoidSignal2)(applicativeHooks));
  var pure14 = /* @__PURE__ */ pure(applicativeHydrateM);
  var runSignalRegister = function(dictMonadHooks) {
    return function(dictMonadEffect) {
      var runSignal2 = runSignal(dictMonadEffect);
      var watchSignal2 = watchSignal(dictMonadEffect);
      return function(doInitialize) {
        if (doInitialize) {
          return runSignal2;
        }
        ;
        return watchSignal2;
      };
    };
  };
  var useRegisterChildren = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var bind32 = bind(MonadEffect0.Monad0().Bind1());
    var runSignalRegister1 = runSignalRegister(dictMonadHooks)(MonadEffect0);
    var useCleaner2 = useCleaner(dictMonadHooks);
    return function(doInitialize) {
      return function(elem2) {
        return function(chlSig) {
          return bind32(runSignalRegister1(doInitialize)(mapFlipped4(chlSig)(function(chl) {
            return function __do() {
              updateChildren(elem2)(chl)();
              return mempty4();
            };
          })))(function(cleaner) {
            return useCleaner2(cleaner);
          });
        };
      };
    };
  };
  var useRegisterChildren1 = /* @__PURE__ */ useRegisterChildren(monadHooksHooks);
  var useRegisterProp = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var bind32 = bind(MonadEffect0.Monad0().Bind1());
    var runSignalRegister1 = runSignalRegister(dictMonadHooks)(MonadEffect0);
    var useCleaner2 = useCleaner(dictMonadHooks);
    var useEvent2 = useEvent(dictMonadHooks);
    return function(doInitialize) {
      return function(element) {
        return function(v) {
          if (v instanceof PropAttribute) {
            return bind32(runSignalRegister1(doInitialize)(mapFlipped4(v.value1)(function(value12) {
              return function __do() {
                (function() {
                  if (value12 instanceof Nothing) {
                    return removeAttribute(v.value0)(element)();
                  }
                  ;
                  if (value12 instanceof Just) {
                    return setAttribute(v.value0)(value12.value0)(element)();
                  }
                  ;
                  throw new Error("Failed pattern match at Jelly.Hydrate (line 43, column 7 - line 45, column 46): " + [value12.constructor.name]);
                })();
                return mempty4();
              };
            })))(function(cleaner) {
              return useCleaner2(cleaner);
            });
          }
          ;
          if (v instanceof PropHandler) {
            return useEvent2(toEventTarget(element))(v.value0)(v.value1);
          }
          ;
          if (v instanceof PropMountEffect) {
            return v.value0(element);
          }
          ;
          throw new Error("Failed pattern match at Jelly.Hydrate (line 40, column 40 - line 51, column 19): " + [v.constructor.name]);
        };
      };
    };
  };
  var useRegisterProps = function(dictMonadHooks) {
    var traverse_3 = traverse_(dictMonadHooks.MonadEffect0().Monad0().Applicative0())(foldableArray);
    var useRegisterProp1 = useRegisterProp(dictMonadHooks);
    return function(doInitialize) {
      return function(element) {
        return function(props) {
          return traverse_3(useRegisterProp1(doInitialize)(element))(props);
        };
      };
    };
  };
  var useRegisterProps1 = /* @__PURE__ */ useRegisterProps(monadHooksHydrateM);
  var useRegisterText = function(dictMonadHooks) {
    var MonadEffect0 = dictMonadHooks.MonadEffect0();
    var bind32 = bind(MonadEffect0.Monad0().Bind1());
    var runSignalRegister1 = runSignalRegister(dictMonadHooks)(MonadEffect0);
    var useCleaner2 = useCleaner(dictMonadHooks);
    return function(doInitialize) {
      return function(txt) {
        return function(txtSig) {
          return bind32(runSignalRegister1(doInitialize)(mapFlipped4(txtSig)(function(tx) {
            return function __do() {
              setTextContent(tx)(toNode5(txt))();
              return mempty4();
            };
          })))(function(cleaner) {
            return useCleaner2(cleaner);
          });
        };
      };
    };
  };
  var useRegisterText1 = /* @__PURE__ */ useRegisterText(monadHooksHydrateM);
  var hydrateNode = function(convertTo) {
    return function(convertFrom) {
      return function(make) {
        return bind22(ask2)(function(realNodeRef) {
          return bind22(liftEffect1(read(realNodeRef)))(function(maybeNode) {
            var v = function(v1) {
              return bind22(liftEffect1(make))(function(a) {
                return discard32(tell3(pure6([convertFrom(a)])))(function() {
                  return pure14(new Tuple(a, false));
                });
              });
            };
            if (maybeNode instanceof Just) {
              var $132 = convertTo(maybeNode.value0);
              if ($132 instanceof Just) {
                return bind22(liftEffect1(nextSibling(maybeNode.value0)))(function(ns) {
                  return discard32(liftEffect1(write(ns)(realNodeRef)))(function() {
                    return discard32(tell3(pure6([maybeNode.value0])))(function() {
                      return pure14(new Tuple($132.value0, true));
                    });
                  });
                });
              }
              ;
              return v(true);
            }
            ;
            return v(true);
          });
        });
      };
    };
  };
  var hydrate = function(v) {
    return function(node) {
      return bind3(liftEffect5(bindFlipped3($$new)(firstChild(node))))(function(realNodeRef) {
        return bind3(runWriterT(runReaderT(v)(realNodeRef)))(function(v1) {
          return useRegisterChildren1(true)(node)(v1.value1);
        });
      });
    };
  };
  var mount = function(cmp) {
    return function(node) {
      return discard24(liftEffect5(updateChildren(node)([])))(function() {
        return hydrate(cmp)(node);
      });
    };
  };
  var componentHydrateM = {
    el: function(tag) {
      return function(props) {
        return function(children2) {
          return bind22(liftEffect1(windowImpl))(function(w) {
            return bind22(liftEffect1(map7(toDocument)(document2(w))))(function(d) {
              return bind22(hydrateNode(fromNode)(toNode)(createElement(tag)(d)))(function(v) {
                return discard32(liftHooks2(hydrate(children2)(toNode(v.value0))))(function() {
                  return useRegisterProps1(!v.value1)(v.value0)(props);
                });
              });
            });
          });
        };
      };
    },
    elNS: function(namespace) {
      return function(tag) {
        return function(props) {
          return function(children2) {
            return bind22(liftEffect1(windowImpl))(function(w) {
              return bind22(liftEffect1(map7(toDocument)(document2(w))))(function(d) {
                return bind22(hydrateNode(fromNode)(toNode)(createElementNS(new Just(namespace))(tag)(d)))(function(v) {
                  return discard32(liftHooks2(hydrate(children2)(toNode(v.value0))))(function() {
                    return useRegisterProps1(!v.value1)(v.value0)(props);
                  });
                });
              });
            });
          };
        };
      };
    },
    elVoid: function(tag) {
      return function(props) {
        return bind22(liftEffect1(windowImpl))(function(w) {
          return bind22(liftEffect1(map7(toDocument)(document2(w))))(function(d) {
            return bind22(hydrateNode(fromNode)(toNode)(createElement(tag)(d)))(function(v) {
              return useRegisterProps1(!v.value1)(v.value0)(props);
            });
          });
        });
      };
    },
    textSig: function(ts) {
      return bind22(liftEffect1(windowImpl))(function(w) {
        return bind22(liftEffect1(map7(toDocument)(document2(w))))(function(d) {
          return bind22(hydrateNode(fromNode3)(toNode5)(createTextNode("")(d)))(function(v) {
            return useRegisterText1(!v.value1)(v.value0)(ts);
          });
        });
      });
    },
    rawSig: function(innerHtmlSig) {
      return bind22(ask2)(function(realNodeRef) {
        return bind22(useHooks2(map1(function($154) {
          return liftEffect1(convertInnerHtmlToNodes($154));
        })(innerHtmlSig)))(function(nodesSig) {
          var skipRef = function __do() {
            var maybeNode = read(realNodeRef)();
            if (maybeNode instanceof Just) {
              var ns = nextSibling(maybeNode.value0)();
              return write(ns)(realNodeRef)();
            }
            ;
            if (maybeNode instanceof Nothing) {
              return write(Nothing.value)(realNodeRef)();
            }
            ;
            throw new Error("Failed pattern match at Jelly.Hydrate (line 143, column 9 - line 147, column 47): " + [maybeNode.constructor.name]);
          };
          return bind22(readSignal2(nodesSig))(function(nodes) {
            return discard32(liftEffect1(for_2(nodes)(function(v) {
              return skipRef;
            })))(function() {
              return tell3(nodesSig);
            });
          });
        });
      });
    },
    doctype: function(name16) {
      return function(publicId2) {
        return function(systemId2) {
          return bind22(liftEffect1(windowImpl))(function(w) {
            return bind22(liftEffect1(map7(toDocument)(document2(w))))(function(d) {
              return bind22(hydrateNode(fromNode2)(toNode4)(createDocumentType(name16)(publicId2)(systemId2)(d)))(function() {
                return pure14(unit);
              });
            });
          });
        };
      };
    },
    MonadHooks0: function() {
      return monadHooksHydrateM;
    }
  };

  // output/Main/index.js
  var attr2 = /* @__PURE__ */ attr(attrValueString);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var component = function(dictComponent) {
    return div2(dictComponent)([attr2("class")("w-screen h-screen text-5xl flex justify-center items-center")])(text5(dictComponent)("Hello Jelly!"));
  };
  var component1 = /* @__PURE__ */ component(componentHydrateM);
  var main = /* @__PURE__ */ launchAff_(/* @__PURE__ */ bind(bindAff)(awaitBody)(function(bodyMaybe) {
    return liftEffect6(traverse_2(function() {
      var $10 = mount(component1);
      return function($11) {
        return runHooks_($10($11));
      };
    }())(bodyMaybe));
  }));

  // <stdin>
  main();
})();
