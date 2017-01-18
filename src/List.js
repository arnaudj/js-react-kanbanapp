import React, { Component } from 'react';
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
                key={'card' + card.id}
                />);

        return (
            <div className="list"><h1>{this.props.label}</h1>
                {cards}
            </div>);
    }
}

export default List;