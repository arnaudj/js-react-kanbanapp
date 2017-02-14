import 'babel-polyfill'; // for Array.prototype.find* (96k dependency!)
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { Router, Route, hashHistory, Link } from 'react-router';
import KanbanboardContainer from './components/KanbanboardContainer';
import Kanbanboard from './components/Kanbanboard';
import About from './About';
import NewCard from './components/NewCard';
import EditCard from './components/EditCard';

let Health = () => <h1>Health</h1>;
let handle404 = () => <span>Not found</span>;

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
    <Route component={App}>
      <Route component={KanbanboardContainer}>
        <Route path="/" component={Kanbanboard}>
          <Route path="new" component={NewCard} />
          <Route path="edit/:card_id" component={EditCard} />
          <Route path="view/:viewCardId" component={KanbanboardContainer} />
        </Route>
      </Route>
      <Route path="/about" component={About} />
      <Route path="/health" component={Health} />
    </Route>
    <Route path="*" component={handle404} />
  </Router>,
  document.getElementById('root')
);
