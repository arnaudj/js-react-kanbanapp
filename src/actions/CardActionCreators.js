import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';
import KanbanAPI from '../api/KanbanApi';

let CardActionCreators = {

    fetchCards(){
        console.log('CardActionCreators.fetchCards()');
        AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
            request: Constants.FETCH_CARDS,
            success: Constants.FETCH_CARDS_SUCCESS,
            failure: Constants.FETCH_CARDS_ERROR
        });
    }

};

export default CardActionCreators;