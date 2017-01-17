import React, { Component } from 'react';
import './Kanbanboard.css';

class Kanbanboard extends Component {
  render() {
    return (
      <div className="Kanbanboard">
        <div className="Kanbanboard-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="Kanbanboard-intro">
          To get started, edit <code>src/Kanbanboard.js</code> and save to reload.
        </p>
        <div>
          {this.props.cardsList.map( (item) => <p>Card: {item.title}</p> )}
        </div>
      </div>
    );
  }
}

export default Kanbanboard;
