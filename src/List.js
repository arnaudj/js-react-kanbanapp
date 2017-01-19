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
                id={card.id}
                status={card.status}
                taskCallbacks={this.props.taskCallbacks}
                key={'card' + card.id}
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
    taskCallbacks: PropTypes.object
};

export default List;