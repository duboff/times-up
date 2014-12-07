/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({displayName: 'exports',
   render: function() {
    var createItem = function(itemText) {
      return React.DOM.li(null, itemText);
    };
    return (React.DOM.ul({className: "name-list"}, this.props.items.map(createItem)));
  }
});