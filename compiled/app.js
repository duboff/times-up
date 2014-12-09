/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var React = require('react');

var Input = require('./input');

React.renderComponent(
  Input(null),
  document.getElementById('name-input')
);

