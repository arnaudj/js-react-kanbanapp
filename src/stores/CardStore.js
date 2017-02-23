import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';
import { ReduceStore } from 'flux/utils';

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    reduce(state, action) {
        console.log('CardStore - action.type:', action.type);
        switch (action.type) {
            case Constants.FETCH_CARDS_SUCCESS:
                return action.payload.response;
            default:
                return state;
        }
    }
}

export default new CardStore(AppDispatcher);