(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var React = require('react');
var Reverter = require('./reverter');
var Nav = require('./nav');

React.renderComponent(
  Reverter(null),
  document.getElementById('reverter')
);

React.renderComponent(
  Nav({links: links}),
  document.getElementById('navigation')
)
},{"./nav":2,"./reverter":4,"react":"react"}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var revert = require('../services/revert.js')

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function () {
    return {
      message : 'Always a pleasure scaffolding your apps.'
    };
  },
  reverse: function () {
    this.setState({
      message : revert(this.state.message)
    });
  },
  render: function () {
    return (
        React.DOM.div(null, 
          React.DOM.p({ref: "p", className: "lead"}, this.state.message), 
          React.DOM.p(null, 
            React.DOM.button({
              type: "button", 
              className: "btn btn-success", 
              ref: "button", 
              onClick: this.reverse}, 
              React.DOM.span({className: "glyphicon glyphicon-refresh"}), 
                "Click me!"
            )
          )
        )
      );
  }
});

},{"../services/revert.js":5}],4:[function(require,module,exports){
module.exports = require('./components/reverter');

},{"./components/reverter":3}],5:[function(require,module,exports){
module.exports = function revert (text) {
  return text.split('').reverse().join('');
}

},{}]},{},[1]);
