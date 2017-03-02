import AppDispatcher from '../AppDispatcher';
import constants from '../Constants';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    getCard(id) {
        return this._state.find((card) => card.id === id);
    }

    getCardIndex(id) {
        return this._state.findIndex((card) => card.id === id);
    }

    reduce(state, action) {
        console.log('CardStore - action.type:', action.type, 'action.payload:', action.payload, "cards:", this.getState());

        switch (action.type) {
            case constants.FETCH_CARDS_SUCCESS:
                return action.payload.response;

            case constants.TOGGLE_CARD_DETAILS: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        'showDetails': {
                            $apply: (current) => current !== true ? true : false
                        }
                    }
                });
            }

            /**
             * Card creation
             */
            case constants.CREATE_CARD: {
                return update(this.getState(), { $push: [action.payload.card] });
            }

            case constants.CREATE_CARD_SUCCESS: {
                let cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        id: { $set: action.payload.response.id }
                    }
                });
            }

            case constants.CREATE_CARD_ERROR: {
                let cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), { $splice: [[cardIndex, 1]] });
            }

            /*
            * Card Update
            */
            case constants.UPDATE_CARD: {
                let cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        $set: action.payload.draftCard
                    }
                });
            }

            case constants.UPDATE_CARD_ERROR: {
                let cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        $set: action.payload.card
                    }
                });
            }


            /*
            * Task Creation
            */
            case constants.CREATE_TASK: {
                // optimistic local update
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $push: [action.payload.task] }
                    }
                });
            }

            case constants.CREATE_TASK_SUCCESS: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                let taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
                    task.id === action.payload.task.id
                ));
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: {
                                id: { $set: action.payload.response.id }
                            }
                        }
                    }
                });
            }

            case constants.CREATE_TASK_ERROR: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                let taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
                    task.id === action.payload.task.id
                ));
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [[taskIndex, 1]]
                        }
                    }
                });
            }

            /*
            * Task Deletion
            */
            case constants.DELETE_TASK: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $splice: [[action.payload.taskIndex, 1]] }
                    }
                });
            }

            case constants.DELETE_TASK_ERROR: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $splice: [[action.payload.taskIndex, 0, action.payload.task]] }
                    }
                });
            }

            /*
            * Task Toggling
            */
            case constants.TOGGLE_TASK: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: { done: { $apply: (done) => !done } }
                        }
                    }
                });
            }

            case constants.TOGGLE_TASK_ERROR: {
                let cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: { done: { $apply: (done) => !done } }
                        }
                    }
                });
            }

            default:
                return state;
        }
    }
}

export default new CardStore(AppDispatcher);