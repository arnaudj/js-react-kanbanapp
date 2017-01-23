import React, { Component, PropTypes } from 'react';
import List from './List';

class Kanbanboard extends Component {

  render() {
    return (
      <div className="app">
        <h1>Kanbanboard</h1>
        <List id="todo" title="To Do" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'todo')
        } viewCardId={this.props.viewCardId} />

        <List id="in-progress" title="In Progress" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'in-progress')
        } viewCardId={this.props.viewCardId} />

        <List id="done" title="Done" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'done')
        } viewCardId={this.props.viewCardId} />
      </div>
    );
  }
};

Kanbanboard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  viewCardId: PropTypes.number
};

export default Kanbanboard;
