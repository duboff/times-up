/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var NameList = require('./name-list');
var Swipe = require('./swipe');

module.exports = React.createClass({
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
      <div>
        <NameList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <div class="form-control-wrapper">
            <input type="text" className="form-control empty input-lg name-entry" placeholder="Enter a name" onChange={this.onChange} value={this.state.text} />
          </div>
          <button className="btn btn-primary btn-block btn-raised">{'Submit name #' + (this.state.items.length + 1)}</button>       
        </form>
        <button className="btn btn-success btn-raised" onClick={this.handlePassButton}>Next player</button>
        <button className="btn btn-warning btn-raised" onClick={this.handleGameButton}>Start Game</button>
      </div>
    );
  }
});