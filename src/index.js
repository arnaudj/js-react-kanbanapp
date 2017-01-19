import 'babel-polyfill'; // for Array.prototype.find* (96k dependency!)
import React from 'react';
import ReactDOM from 'react-dom';
import KanbanboardContainer from './KanbanboardContainer';
import './styles.css';

ReactDOM.render(
  <KanbanboardContainer />,
  document.getElementById('root')
);
