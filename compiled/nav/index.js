/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

var HighlightedLink = React.createClass({displayName: 'HighlightedLink',
  getDefaultProps: function (){
    return {
      activeClassName : 'active'
    }
  },
  render: function() {
    var className = this.isActive() ? className = this.props.activeClassName : "";
    return (
      React.DOM.li({className: className, onClick: this._changeLocation}, 
        React.DOM.a(null, this.props.children)
      )
      );
  },
  _changeLocation: function (event) {
    event.stopPropagation();
    if (!this.isActive()) {
      window.history.pushState({}, '', this.props.href);
      this._owner._update();
    }
  },
  isActive: function() {
    return window.location.pathname === this.props.href
  },
})

var NavButton = React.createClass({displayName: 'NavButton',
  getInitialState: function () {
    return {
    };
  },
  componentDidMount: function () {
    window.addEventListener('popstate', this._update);
  },
  componentWillUnmount: function () {
    window.removeEventListener('popstate', this._update);
  },
  render: function () {
    var links = this.props.links.map(function (element, index) {
      return (
        HighlightedLink({key: "links" + index, href: element.href}, 
          element.title
        )
      );
      })
    return (
    React.DOM.ul({className: "nav nav-pills pull-right"}, 
      links
    )
    );
  },
  _update: function (route) {
    this.props.action && this.props.action(route)
    this.forceUpdate()
  }
});

module.exports = NavButton;