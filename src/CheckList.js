import React, { Component } from 'react';

class CheckList extends Component {
    render() {
        const tasks = this.props.tasks.map((task) => (
            <li className="checklist__task" key={'task' + task.id}>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href={'#' + task.id} className="checklist__task--remove" />
            </li>
        )
        );

        return (<div className="checklist">
            {/* Expand tasks: */}
            <ul>{tasks}</ul>
        </div>
        );
    }
}

export default CheckList;