import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import { Link } from 'react-router';

class Card extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            showDetails: this.props.startExpanded
        };
    }

    _toggleDetails = () => { // Use Property initializer syntax, to bind this - https://babeljs.io/docs/plugins/transform-class-properties/
        this.setState({ showDetails: !this.state.showDetails });
    }

    render() {
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{ __html: marked(this.props.description) }}></span>
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        const viewCardLink = <Link to={'/view/' + this.props.id} target="_blank">Open in new tab</Link>;

        return (
            <div className="card">
                <div style={sideColor} />
                <div className="card__edit"><Link to={'/edit/' + this.props.id}>&#9998;</Link></div>
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
                    onClick={this._toggleDetails}>
                    {this.props.title}</div>
                {cardDetails}
                {viewCardLink}
            </div>
        );
    }
};

let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 80) {
            return new Error(`${propName} in ${componentName} is longer than 80 characters`);
        }
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: titlePropType,
    description: PropTypes.string.isRequired,
    color: PropTypes.string,
    status: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    startExpanded: PropTypes.bool
};

export default Card;