(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./components/swipe-component');

},{"./components/swipe-component":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
