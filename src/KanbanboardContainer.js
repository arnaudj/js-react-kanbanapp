import React, { Component } from 'react';
import Kanbanboard from './Kanbanboard';
import * as Constants from './Constants';
import 'whatwg-fetch';
import update from 'react-addons-update'

class KanbanboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsList: [],
        }
    }

    render() {
        //console.log(this.state.cardsList[1]);
        return (
            <Kanbanboard
                cards={this.state.cardsList}
                taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }}
                />
        );
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
}

export default KanbanboardContainer;