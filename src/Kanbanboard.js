import React, { Component } from 'react';
import List from './List';

class Kanbanboard extends Component {

  render() {
    return (
      <div className="app">
        <List id="todo" title="To Do" cards={
          this.props.cards.filter((card) => card.status === 'todo')
        } label="To Do" />

        <List id="in-progress" title="In Progress" cards={
          this.props.cards.filter((card) => card.status === 'in-progress')
        } label="In progress" />

        <List id="done" title="Done" cards={
          this.props.cards.filter((card) => card.status === 'done')
        } label="Done" />
      </div>
    );
  }
}

export default Kanbanboard;
