import React, { Component } from 'react';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';
import 'whatwg-fetch';
import update from 'react-addons-update';

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
            taskCallbacks: {
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            },
            cardCallbacks: {
                addCard: this.addCard.bind(this),
                updateCard: this.updateCard.bind(this),
                updateStatus: this.updateCardStatus,
            }
        });

        return kanbanBoard;
    }

    addTask(cardId, taskName) {
        console.log('addTask ', cardId, ' / ', taskName);
        const prevState = this.state;

        // optimistic local update
        let newTask = { id: Date.now(), done: false, name: taskName };
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let nextCards = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });
        this.setState({ cards: nextCards });

        this.dummyRESTAddTask(newTask, nextCards, prevState);
    }

    dummyRESTAddTask(newTask, nextCards, prevState) {
        setTimeout(() => {
            if (newTask.name === 'Invalid') { // rollback state on fake invalid task
                this.setState({ cards: prevState.cards });
                return;
            }
            // simulate server reply; update id
            newTask.id = Date.now();
            this.setState({ cards: nextCards });
        }, 1500);
    }

    deleteTask(cardId, taskId, taskIndex) {
        console.log('deleteTask ', cardId, ' / ', taskId, ' / ', taskIndex);
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $splice: [[taskIndex, 1]]
                }
            }
        });
        this.setState({ cards: nextState });
    }

    toggleTask(cardId, taskId, taskIndex) {
        console.log('toggleTask ', cardId, ' / ', taskId, ' / ', taskIndex);
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, { // https://facebook.github.io/react/docs/update.html#update
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (isDone) => {
                                return !isDone;
                            }
                        }
                    }
                }
            }
        }
        );

        this.setState({ cards: nextState });
    }

    addCard(card) {
        console.log('addCard', card);
        if (card.id === null) {
            card = Object.assign({}, card, { id: Date.now() }); // create a mutated Object
        }
        let nextState = update(this.state.cards, { $push: [card] });
        this.setState({ cards: nextState });
    }

    updateCard(card) {
        console.log('updateCard', card);
        let cardIndex = this.state.cards.findIndex((c) => c.id === card.id);
        let nextState = update(
            this.state.cards, {
                [cardIndex]: { $set: card }
            });
        this.setState({ cards: nextState });
    }
}

// https://facebook.github.io/flux/docs/flux-utils.html#container
KanbanboardContainer.getStores = () => ([CardStore]);
KanbanboardContainer.calculateState = (prevState) => {
    console.log('KanbanboardContainer.calculateState:', CardStore.getState());
    return { cards: CardStore.getState() };
}

export default Container.create(KanbanboardContainer); // as container