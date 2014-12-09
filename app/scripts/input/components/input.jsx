/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var NameList = require('./name-list');
var SwipeCard = require('../../swipe-component');

module.exports = React.createClass({
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
      <div>
        <div className={this.state.cardClass ? '' : 'hidden'}>
          <NameList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control empty input-lg name-entry" placeholder="Enter a name" onChange={this.onChange} value={this.state.text} />
            <button className="btn btn-primary btn-block btn-raised btn-sm">{'Submit name #' + (this.state.items.length + 1)}</button>       
          </form>
    
          <button className="btn btn-success btn-block" onClick={this.handlePassButton}>Next player</button>
          <button className="btn btn-warning btn-block" onClick={this.handleGameButton}>Start Game</button>
        </div>
        <SwipeCard show={this.state.cardClass} names={this.state.items} />
      </div>
    );
  }
});