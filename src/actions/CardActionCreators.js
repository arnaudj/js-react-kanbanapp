import AppDispatcher from '../AppDispatcher';
import constants from '../Constants';
import KanbanAPI from '../api/KanbanApi';

let CardActionCreators = {

    toggleCardDetails(cardId) {
        AppDispatcher.dispatch({
            type: constants.TOGGLE_CARD_DETAILS,
            payload: { cardId }
        });
    },
    fetchCards() {
        console.log('CardActionCreators.fetchCards()');
        AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
            request: constants.FETCH_CARDS,
            success: constants.FETCH_CARDS_SUCCESS,
            failure: constants.FETCH_CARDS_ERROR
        });
    },

    addCard(card) {
        AppDispatcher.dispatchAsync(KanbanAPI.addCard(card), {
            request: constants.CREATE_CARD,
            success: constants.CREATE_CARD_SUCCESS,
            failure: constants.CREATE_CARD_ERROR
        }, { card });
    },

    updateCard(card, draftCard) {
        AppDispatcher.dispatchAsync(KanbanAPI.updateCard(card, draftCard), {
            request: constants.UPDATE_CARD,
            success: constants.UPDATE_CARD_SUCCESS,
            failure: constants.UPDATE_CARD_ERROR
        }, { card, draftCard });
    },

};

export default CardActionCreators;