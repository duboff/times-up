/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({
   render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return (<ul className="name-list">{this.props.items.map(createItem)}</ul>);
  }
});