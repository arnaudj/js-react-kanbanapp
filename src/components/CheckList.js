import React, { Component, PropTypes } from 'react';
import TaskActionCreators from '../actions/TaskActionCreators';

class CheckList extends Component {

    _onAddTaskKeyPress(e) {
        if (e.key === 'Enter') {
            const newTask = { id: Date.now(), name: e.target.value, done: false };
            TaskActionCreators.addTask(this.props.cardId, newTask);
            e.target.value = '';
        }
    }

    render() {
        const tasks = this.props.tasks.map((task, taskIndex) => (
            <li className="checklist__task" key={'task' + task.id}>
                <input type="checkbox"
                    defaultChecked={task.done}
                    onChange={TaskActionCreators.toggleTask.bind(null, this.props.cardId, task, taskIndex)} />

                {task.name}{' '}

                <a href={'#'} className="checklist__task--remove"
                    onClick={TaskActionCreators.deleteTask.bind(null, this.props.cardId, task, taskIndex)}
                />
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
                }
                onKeyPress={this._onAddTaskKeyPress.bind(this)}
            />
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
    })),
};

export default CheckList;