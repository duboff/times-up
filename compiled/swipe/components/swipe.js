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