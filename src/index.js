import 'babel-polyfill'; // for Array.prototype.find* (96k dependency!)
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import KanbanboardContainer from './KanbanboardContainer';
import About from './About';

let Health = () => <h1>Health</h1>;

class App extends Component {
  render() {
    return (
      <div>
        <header>Menu</header>
        <Link to='/'>Index</Link>{' '}
        <Link to='/about'>About</Link>{' '}
        <Link to="/health">Health</Link>{' '}
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  // https://github.com/reacttraining/react-router/blob/master/docs/Introduction.md
  /**
   * x E.g, route '/' will render:
   * <App>
   *     <KanbanboardContainer />
   * </App>
   */
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={KanbanboardContainer} />
      <Route path="/about" component={About} />
      <Route path="/view/:viewCardId" component={KanbanboardContainer}/>
      <Route path="/health" component={Health} />
    </Route>
  </Router>,
  document.getElementById('root')
);
