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
