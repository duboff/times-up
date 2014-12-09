(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var React = require('react');

var Input = require('./input');

React.renderComponent(
  Input(null),
  document.getElementById('name-input')
);


},{"./input":4,"react":"react"}],2:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var NameList = require('./name-list');
var SwipeCard = require('../../swipe-component');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {items: [], text: '', globalList: [], gameStart: false, cardClass: 'hidden'};
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
    this.setState({cardClass: ''})
  },
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.div({className: this.state.cardClass ? '' : 'hidden'}, 
          NameList({items: this.state.items}), 
          React.DOM.form({onSubmit: this.handleSubmit}, 
            React.DOM.input({type: "text", className: "form-control empty input-lg name-entry", placeholder: "Enter a name", onChange: this.onChange, value: this.state.text}), 
            React.DOM.button({className: "btn btn-primary btn-block btn-raised btn-sm"}, 'Submit name #' + (this.state.items.length + 1))
          ), 

          React.DOM.button({className: "btn btn-success btn-block", onClick: this.handlePassButton}, "Next player"), 
          React.DOM.button({className: "btn btn-warning btn-block", onClick: this.handleGameButton}, "Start Game")
        ), 
        SwipeCard({show: this.state.cardClass, names: this.state.globalList})
      )
    );
  }
});
},{"../../swipe-component":6,"./name-list":3}],3:[function(require,module,exports){
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
module.exports = require('./components/input');


},{"./components/input":2}],5:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({displayName: 'exports',
  getNames: function(props) {
    this.setState({list: props.names});
  },
  getInitialState: function() {
    return { list: []}
  },
  componentDidMount: function() {   
    this.getNames(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    this.getNames(nextProps);
  },
  handleSwipe: function() {
    var list = this.state.list;
    var nextName = list.shift();
    var nextNames = list.concat([nextName]);
    this.setState({list: nextNames});
  },
  handleGuessButton: function() {
    var list = this.state.list;
    list.shift();
    this.setState({list: list});
    alert('Wooo');
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.show, onSwipe: this.handleSwipe}, 
        React.DOM.h1(null, this.state.list[0]), 
        React.DOM.button({className: "btn btn-primary btn-block", onClick: this.handleSwipe}, "Pass"), 
        React.DOM.button({className: "btn btn-success btn-block", onClick: this.handleGuessButton}, "Guess")
      )
    );
  }
});
},{}],6:[function(require,module,exports){
module.exports = require('./components/swipe-component');

},{"./components/swipe-component":5}]},{},[1]);
