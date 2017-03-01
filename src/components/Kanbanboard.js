import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './List';

class Kanbanboard extends Component {
  render() {
    return (
      <div className="app">
        <Link to='/new' className="float-button">+</Link>

        <List id="todo" title="To Do" cards={
          this.props.cards.filter((card) => card.status === 'todo')
        } viewCardId={this.props.viewCardId} />

        <List id="in-progress" title="In Progress" cards={
          this.props.cards.filter((card) => card.status === 'in-progress')
        } viewCardId={this.props.viewCardId} />

        <List id="done" title="Done" cards={
          this.props.cards.filter((card) => card.status === 'done')
        } viewCardId={this.props.viewCardId} />

        {this.props.children}
      </div>
    );
  }
};

Kanbanboard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  viewCardId: PropTypes.number
};

export default Kanbanboard;
