import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './List';

class Kanbanboard extends Component {
  render() {

    let childrenWithPropsSet = this.props.children && React.cloneElement(this.props.children,
      {
        cards: this.props.cards,
        cardCallbacks: this.props.cardCallbacks
      });

    return (
      <div className="app">
        <Link to='/new' className="float-button">Add item</Link>

        <List id="todo" title="To Do" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'todo')
        } viewCardId={this.props.viewCardId} />

        <List id="in-progress" title="In Progress" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'in-progress')
        } viewCardId={this.props.viewCardId} />

        <List id="done" title="Done" taskCallbacks={this.props.taskCallbacks} cards={
          this.props.cards.filter((card) => card.status === 'done')
        } viewCardId={this.props.viewCardId} />

        {childrenWithPropsSet}
      </div>
    );
  }
};

Kanbanboard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  viewCardId: PropTypes.number
};

export default Kanbanboard;
