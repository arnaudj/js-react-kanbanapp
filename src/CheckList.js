import React, { Component, PropTypes } from 'react';

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
            <input type="text"
                className="checklist--add-task"
                placeholder="Type then hit Enter to add a task"
                ref={ // called upon component mount (reference) or after dismount (null, for GC) - http://reactjs.cn/react/docs/more-about-refs.html
                    (input) => input != null ? input.focus() : null
                } />
        </div>
        );
    }
};

CheckList.propTypes = {
    cardId: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
    }))
};

export default CheckList;