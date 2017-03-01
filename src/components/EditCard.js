import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';
import CardStore from '../stores/CardStore';
import CardActionCreators from '../actions/CardActionCreators';

class EditCard extends Component {
    componentWillMount() {
        let card = CardStore.getCard(parseInt(this.props.params.card_id, 10));
        this.setState(Object.assign({}, card));
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.updateCard(
            CardStore.getCard(parseInt(this.props.params.card_id, 10)),
            this.state);
        this.props.router.push('/');
    }

    handleClose(e) {
        this.props.router.push('/');
    }

    render() {
        return (
            <CardForm draftCard={this.state}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        )
    }
}

EditCard.propTypes = {
    cardCallbacks: PropTypes.object,
    cards: PropTypes.array
}

export default EditCard;