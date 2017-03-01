import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
    render() {
        const cards = this.props.cards.map((card) =>
            <Card
                key={'card' + card.id}
                {...card}
                id={typeof (card.id) === 'string' ? parseInt(card.id, 10) : card.id}
                startExpanded={this.props.viewCardId === card.id}
            />);

        return (
            <div className="list"><h1>{this.props.title}</h1>
                {cards}
            </div>);
    }
};

List.propTypes = {
    // XXX Needed as in book?: id: PropTypes.string.isRequired
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    viewCardId: PropTypes.number
};

export default List;