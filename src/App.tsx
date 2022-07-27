import { SetStateAction, useState } from "react";

type Task = {
    id: number;
    done: boolean;
    name: string;
    tags?: string[];
};

const TASKS: Task[] = [
    { id: 1, done: true, name: "Hacer la colada", tags: ["important"] },
    { id: 2, done: false, name: "Pintar la habitación", tags: ["important"] },
    { id: 3, done: true, name: "Leer 30 minutos", tags: ["not important"] },
    { id: 4, done: false, name: "Acabar la TodoApp" },
];

let id: number = TASKS.length;

const Task: React.FC<{
    task: Task;
    handleTodoDelete: Function;
    handleCheckboxChange: Function;
}> = ({ task, handleTodoDelete, handleCheckboxChange }) => {
    return (
        <li className="flex">
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleCheckboxChange(task.id)}
            ></input>
            <p>{task.name}</p>
            <button className="ml-5 p-1" onClick={() => handleTodoDelete(task.id)}>
                Delete
            </button>
        </li>
    );
};

const TaskList: React.FC<{
    taskList: typeof TASKS;
    setList: React.Dispatch<React.SetStateAction<Task[]>>;
    filterText: string;
}> = ({ taskList, setList, filterText }) => {
    function handleTodoDelete(index: number) {
        setList(taskList.filter(({ id }) => id !== index));
    }

    function handleCheckboxChange(id: number) {
        const index = taskList.findIndex((item) => item.id === id);

        const newTaskList = [...taskList];
        newTaskList.at(index)!.done = newTaskList.at(index)?.done ? false : true;
        setList(newTaskList);
    }

    return (
        <ul>
            {taskList
                .filter((task) => task.name.toLowerCase().match(filterText.toLowerCase()))
                .map((task: Task) => (
                    <Task
                        key={task.id}
                        task={task}
                        handleTodoDelete={handleTodoDelete}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                ))}
        </ul>
    );
};

const NewTaskForm: React.FC<{
    taskList: Task[];
    newTaskText: string;
    onNewTaskTextChange: React.Dispatch<React.SetStateAction<string>>;
    setList: React.Dispatch<React.SetStateAction<Task[]>>;
}> = ({ taskList, setList, newTaskText, onNewTaskTextChange }) => {
    function handleTodoAdd() {
        id += 1;
        setList([...taskList, { id: id, done: false, name: newTaskText }]);
    }
    return (
        <form>
            <input
                type="text"
                placeholder="New task"
                value={newTaskText}
                onChange={(e) => onNewTaskTextChange(e.target.value)}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleTodoAdd();
                    onNewTaskTextChange("");
                }}
            >
                +
            </button>
        </form>
    );
};

const SearchFilterTaskForm: React.FC<{
    filterText: string;
    onFilterTextChange: React.Dispatch<SetStateAction<string>>;
}> = ({ filterText, onFilterTextChange }) => {
    return (
        <div className="flex">
            <input
                type="text"
                placeholder="Search tasks..."
                value={filterText}
                onChange={(e) => {
                    onFilterTextChange(e.target.value);
                }}
                onSubmit={(e) => e.preventDefault()}
            />
            <div>
                Filter by tags <button>Important</button> <button>Not Important</button>{" "}
                <button>Daily</button>
            </div>
        </div>
    );
};

function App() {
    const [list, setList] = useState(TASKS);
    const [filterText, setFilterText] = useState("");
    const [newTaskText, setNewTaskText] = useState("");
    console.log(list);

    return (
        <>
            <h1>To-Do App</h1>
            <SearchFilterTaskForm filterText={filterText} onFilterTextChange={setFilterText} />
            <TaskList taskList={list} setList={setList} filterText={filterText} />
            <NewTaskForm
                taskList={list}
                setList={setList}
                newTaskText={newTaskText}
                onNewTaskTextChange={setNewTaskText}
            />
        </>
    );
}

export default App;
