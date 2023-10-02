export default function Sidebar(props) {
    const { currentTask, tasksList, setCurrentTask } = props;

    const taskElements = tasksList.map((task, index) => (
        <div
            key={task._id}
            onClick={e => changeTask(e)}
            id={task._id}
            className={`tasks-list--task ${
                task._id === currentTask._id ? "selected" : ""
            } `}
        >
            {task.title}
        </div>
    ));


    return (
        <div className="tasks-list--sidebar">
            <div className="tasks-list--container" id="sidebar">
                {taskElements}
            </div>
        </div>
    );

    // on click event handler when a task on the sidebar is clicked
    function changeTask(e) {
        const taskFound = tasksList.filter(task => {
            if (task._id === e.target.id) {
                return task
            }
        })[0]
        setCurrentTask(taskFound)
    }
}
