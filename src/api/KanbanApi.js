import Constants from '../Constants';
import update from 'react-addons-update';
import 'whatwg-fetch';

let cards = []; // XXX Simulate remote API

// TODO Simulate latency for API replies (since, as is, optimistic updates rollback cannot be seen)

let KanbanAPI = {

    fetchCards() {
        console.log('fetchCards() - base:', Constants.API_URL);
        const HEADERS = { 'Content-type': 'application/json' };
        return fetch(Constants.API_URL + '/users.json', { headers: HEADERS })
            .then((response) => response.json())
            .then((jsonCards) => {
                cards = jsonCards;
                return jsonCards;
            });
    },

    addCard(card) {
        console.log('addCard', card);
        if (card.id === null) {
            card = Object.assign({}, card, { id: Date.now() }); // create a mutated Object
        }

        cards = update(cards, { $push: [card] });

        return new Promise(function (resolve, reject) {
            card.title.includes('Error')
                ? reject('Simulated error!')
                : resolve(card);
        });
    },

    updateCard(card, draftCard) {
        console.log('addCard', card, ' - ', draftCard);
        let cardIndex = cards.findIndex((c) => c.id === card.id);
        cards = update(cards, { [cardIndex]: { $set: draftCard } });
        return new Promise((resolve, reject) => resolve(cards));
    },

    addTask(cardId, task) {
        console.log('addTask for cardId:', cardId, ' - task: ', task);
        let cardIndex = cards.findIndex((card) => card.id === cardId);
        cards = update(cards, {
            [cardIndex]: {
                tasks: {
                    $push: [task]
                }
            }
        });

        // simulate server reply; update id
        task.id = 1337 + Date.now();
        return new Promise((resolve, reject) =>
            task.name.includes('Error')
                ? reject('Simulated error!')
                : resolve(
                    {
                        cardId: cardId,
                        task: task,
                        id: task.id
                    }));
    },

deleteTask(cardId, taskId, taskIndex) {
    console.log('deleteTask', cardId, ' - ', taskId);
    let cardIndex = cards.findIndex((card) => card.id === cardId);
    cards = update(cards, {
        [cardIndex]: {
            tasks: {
                $splice: [[taskIndex, 1]]
            }
        }
    });
    return new Promise((resolve, reject) => resolve(cards));
},

toggleTask(cardId, taskId, taskIndex) {
    console.log('toggleTask ', cardId, ' / ', taskId, ' / ', taskIndex);
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    cards = update(this.state.cards, { // https://facebook.github.io/react/docs/update.html#update
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

    return new Promise((resolve, reject) => resolve(cards));
}
};

export default KanbanAPI;