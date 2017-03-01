import React, { Component } from 'react';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';
import 'whatwg-fetch';

class KanbanboardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        }
    }

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            viewCardId: parseInt(this.props.params.viewCardId, 10),
        });

        return kanbanBoard;
    }
}

// https://facebook.github.io/flux/docs/flux-utils.html#container
KanbanboardContainer.getStores = () => ([CardStore]);
KanbanboardContainer.calculateState = (prevState) => {
    console.log('KanbanboardContainer.calculateState:', CardStore.getState());
    return { cards: CardStore.getState() };
}

export default Container.create(KanbanboardContainer); // as container