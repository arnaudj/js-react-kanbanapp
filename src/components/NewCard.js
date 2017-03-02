import React, { Component } from 'react';
import CardForm from './CardForm';
import DraftStore from '../stores/DraftStore';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';

class NewCard extends Component {
    componentDidMount() {
        setTimeout(() => CardActionCreators.createDraft(), 0)
    }

    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.addCard(this.state.draft);
        this.props.router.push('/'); // https://github.com/ReactTraining/react-router/blob/master/docs/API.md#pushpathorloc
    }

    handleClose(e) {
        this.props.router.push('/');
    }

    render() {
        return (
            <CardForm draftCard={this.state.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
    draft: DraftStore.getState()
});
export default Container.create(NewCard);