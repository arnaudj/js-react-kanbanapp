import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
    //constructor(){super();}

    render() {
        return (<div>{this.props.label}
            {
                this.props.cards.map((card) =>
                    <Card title={card.title}
                        description={card.description}
                        tasks={card.tasks}
                        id={card.id}
                        key={'card' + card.id}
                        />)
            }</div>);
    }
}

export default List;