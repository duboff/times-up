(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var React = require('react');
var Swiper = require('react-swiper');
var Input = require('./input');
var Swipe = require('./swipe');

React.initializeTouchEvents(true);

var React = require('react');

// var Reverter = require('./reverter');
var Nav = require('./nav');

React.renderComponent(
  Input(null),
  document.getElementById('name-input')
);


},{"./input":4,"./nav":5,"./swipe":7,"react":"react","react-swiper":9}],2:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var NameList = require('./name-list');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {items: [], text: '', globalList: [], gameStart: false};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  handlePassButton: function(e) {
    e.preventDefault();
    var itemsToAdd = this.state.items;
    var nextGlobalList = this.state.globalList.concat(itemsToAdd);
    this.setState({items: [], text: '', globalList: nextGlobalList});
  },
  handleGameButton: function(e) {

  },

  render: function() {
    return (    
      React.DOM.div(null, 
        NameList({items: this.state.items}), 
        React.DOM.form({onSubmit: this.handleSubmit}, 
          React.DOM.div({class: "form-control-wrapper"}, 
            React.DOM.input({type: "text", className: "form-control empty input-lg name-entry", placeholder: "Enter a name", onChange: this.onChange, value: this.state.text})
          ), 
          React.DOM.button({className: "btn btn-primary btn-block btn-raised"}, 'Submit name #' + (this.state.items.length + 1))
        ), 
        React.DOM.button({className: "btn btn-success btn-raised", onClick: this.handlePassButton}, "Next player"), 
        React.DOM.button({className: "btn btn-warning btn-raised", onClick: this.handleGameButton}, "Start Game")
      )
    );
  }
});
},{"./name-list":3}],3:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({displayName: 'exports',
   render: function() {
    var createItem = function(itemText) {
      return React.DOM.li(null, itemText);
    };
    return React.DOM.ul(null, this.props.items.map(createItem));
  }
});
},{}],4:[function(require,module,exports){
module.exports = require('./components/name-list');
module.exports = require('./components/input');


},{"./components/input":2,"./components/name-list":3}],5:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var HighlightedLink = React.createClass({displayName: 'HighlightedLink',
  getDefaultProps: function (){
    return {
      activeClassName : 'active'
    }
  },
  render: function() {
    var className = this.isActive() ? className = this.props.activeClassName : "";
    return (
      React.DOM.li({className: className, onClick: this._changeLocation}, 
        React.DOM.a(null, this.props.children)
      )
      );
  },
  _changeLocation: function (event) {
    event.stopPropagation();
    if (!this.isActive()) {
      window.history.pushState({}, '', this.props.href);
      this._owner._update();
    }
  },
  isActive: function() {
    return window.location.pathname === this.props.href
  },
})

var NavButton = React.createClass({displayName: 'NavButton',
  getInitialState: function () {
    return {
    };
  },
  componentDidMount: function () {
    window.addEventListener('popstate', this._update);
  },
  componentWillUnmount: function () {
    window.removeEventListener('popstate', this._update);
  },
  render: function () {
    var links = this.props.links.map(function (element, index) {
      return (
        HighlightedLink({key: "links" + index, href: element.href}, 
          element.title
        )
      );
      })
    return (
    React.DOM.ul({className: "nav nav-pills pull-right"}, 
      links
    )
    );
  },
  _update: function (route) {
    this.props.action && this.props.action(route)
    this.forceUpdate()
  }
});

module.exports = NavButton;
},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {currentName: '', names: []}
  },
  handleSwipe: function() {
    var names = this.state.names;
    var nextName = names.shift();
    var nextNames = names.concat(nextName);
    this.setState({currentName: nextName, names: nextNames});
  },

  render: function() {
    return (    
      React.DOM.div({onSwipe: "handleSwipe"}, 
        this.state.currentName
      )
    );
  }
});
},{}],7:[function(require,module,exports){
module.exports = require('./components/swipe');

},{"./components/swipe":6}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],9:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var React = require('react');
var merge = require('react/lib/merge');

var Swiper = React.createClass({displayName: 'Swiper',
  propTypes: {
    tagName: React.PropTypes.string,
    component: React.PropTypes.component,
    minSwipeLength: React.PropTypes.number,
    moveThreshold: React.PropTypes.number,
    onSwipe: React.PropTypes.func,
    onSwipeLeft: React.PropTypes.func,
    onSwipeUpLeft: React.PropTypes.func,
    onSwipeUp: React.PropTypes.func,
    onSwipeUpRight: React.PropTypes.func,
    onSwipeRight: React.PropTypes.func,
    onSwipeDownRight: React.PropTypes.func,
    onSwipeDown: React.PropTypes.func,
    onSwipeDownLeft: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      tagName: 'div',
      minSwipeLength: 75,
      moveThreshold: 10
    };
  },

  getInitialState: function () {
    return {
      direction: null,
      initialTouch: null,
      touch: null,
      swipeStart: null
    };
  },

  render: function() {
    var Component = this.props.component || React.DOM[this.props.tagName];
    return this.transferPropsTo(
      Component({onTouchStart: this.handleTouchStart, 
          onTouchEnd: this.handleTouchEnd, 
          onTouchCancel: this.handleTouchEnd, 
          onTouchMove: this.handleTouchMove}, 
        this.props.children
      )
    );
  },

  handleTouchStart: function (e) {
    if (e.touches.length !== 1) {
      return;
    }
    this._initiateSwipe(e.touches[0]);
  },

  handleTouchEnd: function (e) {
    if (!this.state.direction) {
      return;
    }
    if (this._getSwipeLength(this.state.initialTouch) > this.props.minSwipeLength) {
      var method = this._getEventMethodName();
      var evt = {
        type: this._getEventTypeName(),
        timeStampStart: this.state.swipeStart,
        timeStampEnd: new Date(),
        initialTouch: this.state.initialTouch,
        finalTouch: this.state.touch
      };
      this.props.onSwipe && this.props.onSwipe(evt);
      this.props[method] && this.props[method](evt);
      e.preventDefault();
    }
    this._resetSwipe();
  },

  handleTouchMove: function (e) {
    if (e.touches.length !== 1 || !this.state.direction) {
      return;
    }
    var touch = e.touches[0];
    var direction = this._getSwipeDirection(touch);
    if (this._isSwipeDirectionUnchanged(direction)) {
      this._updateSwipe(direction, touch);
      e.preventDefault();
      return;
    }
    this._resetSwipe();
  },

  _initiateSwipe: function (touch) {
    this.setState({direction: {x: null, y: null}, initialTouch: touch, touch: touch, swipeStart: new Date()});
  },

  _resetSwipe: function () {
    this.setState(this.getInitialState());
  },

  _updateSwipe: function (direction, touch) {
    this.setState({direction:direction, touch:touch});
  },

  _getSwipeLength: function (touch) {
    return this._getSwipeLengthX(touch) + this._getSwipeLengthY(touch);
  },

  _getSwipeLengthX: function (touch) {
    return Math.abs(touch.pageX - this.state.touch.pageX);
  },

  _getSwipeLengthY: function (touch) {
    return Math.abs(touch.pageY - this.state.touch.pageY);
  },

  _getSwipeDirection: function (touch) {
    var dir = merge({x: null, y: null}, this.state.direction);
    if (this._getSwipeLengthY(touch) > this.props.moveThreshold) {
      dir.y = this._getSwipeDirectionY(touch);
    }
    if (this._getSwipeLengthX(touch) > this.props.moveThreshold) {
      dir.x = this._getSwipeDirectionX(touch);
    }
    return dir;
  },

  _getSwipeDirectionX: function (touch) {
    return touch.pageX < this.state.touch.pageX ? 'Left' : 'Right';
  },

  _getSwipeDirectionY: function (touch) {
    return touch.pageY < this.state.touch.pageY ? 'Up' : 'Down';
  },

  _getSwipeDirectionName: function () {
    return (this.state.direction.y || '') + (this.state.direction.x || '');
  },

  _isSwipeDirectionUnchanged: function (direction) {
    return (!this.state.direction.x || this.state.direction.x === direction.x) &&
           (!this.state.direction.y || this.state.direction.y === direction.y);
  },

  _getEventMethodName: function () {
    return 'onSwipe' + this._getSwipeDirectionName();
  },

  _getEventTypeName: function () {
    return 'swipe' + this._getSwipeDirectionName();
  }
});

module.exports = Swiper;

},{"react":"react","react/lib/merge":12}],10:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":8}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))
},{"./invariant":10,"_process":8}],12:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule merge
 */

"use strict";

var mergeInto = require("./mergeInto");

/**
 * Shallow merges two structures into a return value, without mutating either.
 *
 * @param {?object} one Optional object with properties to merge from.
 * @param {?object} two Optional object with properties to merge from.
 * @return {object} The shallow extension of one by two.
 */
var merge = function(one, two) {
  var result = {};
  mergeInto(result, one);
  mergeInto(result, two);
  return result;
};

module.exports = merge;

},{"./mergeInto":14}],13:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeHelpers
 *
 * requiresPolyfills: Array.isArray
 */

"use strict";

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");

/**
 * Maximum number of levels to traverse. Will catch circular structures.
 * @const
 */
var MAX_MERGE_DEPTH = 36;

/**
 * We won't worry about edge cases like new String('x') or new Boolean(true).
 * Functions are considered terminals, and arrays are not.
 * @param {*} o The item/object/value to test.
 * @return {boolean} true iff the argument is a terminal.
 */
var isTerminal = function(o) {
  return typeof o !== 'object' || o === null;
};

var mergeHelpers = {

  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

  isTerminal: isTerminal,

  /**
   * Converts null/undefined values into empty object.
   *
   * @param {?Object=} arg Argument to be normalized (nullable optional)
   * @return {!Object}
   */
  normalizeMergeArg: function(arg) {
    return arg === undefined || arg === null ? {} : arg;
  },

  /**
   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
   * likely the caller's fault. If this function is ever called with anything
   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
   *
   * @param {*} one Array to merge into.
   * @param {*} two Array to merge from.
   */
  checkMergeArrayArgs: function(one, two) {
    ("production" !== process.env.NODE_ENV ? invariant(
      Array.isArray(one) && Array.isArray(two),
      'Tried to merge arrays, instead got %s and %s.',
      one,
      two
    ) : invariant(Array.isArray(one) && Array.isArray(two)));
  },

  /**
   * @param {*} one Object to merge into.
   * @param {*} two Object to merge from.
   */
  checkMergeObjectArgs: function(one, two) {
    mergeHelpers.checkMergeObjectArg(one);
    mergeHelpers.checkMergeObjectArg(two);
  },

  /**
   * @param {*} arg
   */
  checkMergeObjectArg: function(arg) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !isTerminal(arg) && !Array.isArray(arg),
      'Tried to merge an object, instead got %s.',
      arg
    ) : invariant(!isTerminal(arg) && !Array.isArray(arg)));
  },

  /**
   * @param {*} arg
   */
  checkMergeIntoObjectArg: function(arg) {
    ("production" !== process.env.NODE_ENV ? invariant(
      (!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg),
      'Tried to merge into an object, instead got %s.',
      arg
    ) : invariant((!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg)));
  },

  /**
   * Checks that a merge was not given a circular object or an object that had
   * too great of depth.
   *
   * @param {number} Level of recursion to validate against maximum.
   */
  checkMergeLevel: function(level) {
    ("production" !== process.env.NODE_ENV ? invariant(
      level < MAX_MERGE_DEPTH,
      'Maximum deep merge depth exceeded. You may be attempting to merge ' +
      'circular structures in an unsupported way.'
    ) : invariant(level < MAX_MERGE_DEPTH));
  },

  /**
   * Checks that the supplied merge strategy is valid.
   *
   * @param {string} Array merge strategy.
   */
  checkArrayStrategy: function(strategy) {
    ("production" !== process.env.NODE_ENV ? invariant(
      strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
      'You must provide an array strategy to deep merge functions to ' +
      'instruct the deep merge how to resolve merging two arrays.'
    ) : invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies));
  },

  /**
   * Set of possible behaviors of merge algorithms when encountering two Arrays
   * that must be merged together.
   * - `clobber`: The left `Array` is ignored.
   * - `indexByIndex`: The result is achieved by recursively deep merging at
   *   each index. (not yet supported.)
   */
  ArrayStrategies: keyMirror({
    Clobber: true,
    IndexByIndex: true
  })

};

module.exports = mergeHelpers;

}).call(this,require('_process'))
},{"./invariant":10,"./keyMirror":11,"_process":8}],14:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeInto
 * @typechecks static-only
 */

"use strict";

var mergeHelpers = require("./mergeHelpers");

var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;
var checkMergeIntoObjectArg = mergeHelpers.checkMergeIntoObjectArg;

/**
 * Shallow merges two structures by mutating the first parameter.
 *
 * @param {object|function} one Object to be merged into.
 * @param {?object} two Optional object with properties to merge from.
 */
function mergeInto(one, two) {
  checkMergeIntoObjectArg(one);
  if (two != null) {
    checkMergeObjectArg(two);
    for (var key in two) {
      if (!two.hasOwnProperty(key)) {
        continue;
      }
      one[key] = two[key];
    }
  }
}

module.exports = mergeInto;

},{"./mergeHelpers":13}]},{},[1]);
