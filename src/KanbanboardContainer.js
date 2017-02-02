import React, { Component } from 'react';
import Constants from './Constants';
import 'whatwg-fetch';
import update from 'react-addons-update';

class KanbanboardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cardsList: [],
        }
    }

    render() {
        //console.log(this.state.cardsList[1]);
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cardsList,
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
        let newTask = { id: Date.now(), done: false, name: taskName }
        let cardIndex = this.state.cardsList.findIndex((card) => card.id === cardId);
        let nextCards = update(this.state.cardsList, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });
        this.setState({ cardsList: nextCards });

        this.dummyRESTAddTask(newTask, nextCards, prevState);
    }

    dummyRESTAddTask(newTask, nextCards, prevState) {
        setTimeout(() => {
            if (newTask.name === 'Invalid') { // rollback state on fake invalid task
                this.setState({ cardsList: prevState.cardsList });
                return;
            }
            // simulate server reply; update id
            newTask.id = Date.now();
            this.setState({ cardsList: nextCards });
        }, 1500);
    }

    deleteTask(cardId, taskId, taskIndex) {
        console.log('deleteTask ', cardId, ' / ', taskId, ' / ', taskIndex);
        let cardIndex = this.state.cardsList.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cardsList, {
            [cardIndex]: {
                tasks: {
                    $splice: [[taskIndex, 1]]
                }
            }
        });
        this.setState({ cardsList: nextState });
    }

    toggleTask(cardId, taskId, taskIndex) {
        console.log('toggleTask ', cardId, ' / ', taskId, ' / ', taskIndex);
        let cardIndex = this.state.cardsList.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cardsList, { // https://facebook.github.io/react/docs/update.html#update
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

        this.setState({ cardsList: nextState });
    }

    componentDidMount() {
        console.log('u:', Constants.API_URL);
        const HEADERS = { 'Content-type': 'application/json' };
        fetch(Constants.API_URL + '/users.json', { headers: HEADERS })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ cardsList: json });
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    addCard(card) {
        console.log('addCard', card);
        if (card.id === null) {
            card = Object.assign({}, card, { id: Date.now() }); // create a mutated Object
        }
        let nextState = update(this.state.cardsList, { $push: [card] });
        this.setState({ cardsList: nextState });
    }

    updateCard(card) {
        console.log('updateCard', card);
        let cardIndex = this.state.cardsList.findIndex((c) => c.id === card.id);
        let nextState = update(
            this.state.cardsList, {
                [cardIndex]: { $set: card }
            });
        this.setState({ cardsList: nextState });
    }
}
export default KanbanboardContainer;