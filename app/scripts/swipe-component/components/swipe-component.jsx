/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

module.exports = React.createClass({
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
      <div className={this.props.show} onSwipe={this.handleSwipe} >
        <h1>{this.state.list[0]}</h1>
        <button className="btn btn-primary btn-block" onClick={this.handleSwipe}>Pass</button>
        <button className="btn btn-success btn-block" onClick={this.handleGuessButton}>Guess</button>
      </div>
    );
  }
});