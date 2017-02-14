import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
    render() {
        const cards = this.props.cards.map((card) =>
            <Card
                title={card.title}
                description={card.description}
                color={card.color}
                tasks={card.tasks}
                id={typeof (card.id) === 'string' ? parseInt(card.id, 10) : card.id  }
                status={card.status}
                taskCallbacks={this.props.taskCallbacks}
                key={'card' + card.id}
                startExpanded={this.props.viewCardId === card.id}
                />);

        return (
            <div className="list"><h1>{this.props.title}</h1>
                {cards}
            </div>);
    }
};

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    viewCardId: PropTypes.number
};

export default List;