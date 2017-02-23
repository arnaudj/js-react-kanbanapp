import Constants from '../Constants';
import 'whatwg-fetch';

let KanbanAPI = {

    fetchCards() {
        console.log('fetchCards() - base:', Constants.API_URL);
        const HEADERS = { 'Content-type': 'application/json' };
        return fetch(Constants.API_URL + '/users.json', { headers: HEADERS })
            .then((response) => response.json());
    }
};

export default KanbanAPI;