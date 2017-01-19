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
    }

    deleteTask(cardId, taskId, taskIndex) {
        console.log('deleteTask ', cardId, ' / ', taskId, ' / ', taskIndex);
    }























    toggleTask(cardId, taskId, taskIndex) {
        console.log('toggleTask ', cardId, ' / ', taskId, ' / ', taskIndex);
        let index = this.state.cardsList.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cardsList, { // https://facebook.github.io/react/docs/update.html#update
            [index]: {
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