import { useState } from "react";

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

const Task: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <li className="flex">
            <input type="checkbox" checked={task.done}></input>
            <p>{task.name}</p>
            <button className="ml-5 p-1">Delete</button>
        </li>
    );
};

const TaskList: React.FC<{ taskList: typeof TASKS }> = ({ taskList }) => {
    return (
        <ul>
            {taskList.map((task: Task) => (
                <Task key={task.id} task={task} />
            ))}
        </ul>
    );
};

const NewTaskForm = () => {
    return (
        <form>
            <input type="text" placeholder="New task" />
            <button>+</button>
        </form>
    );
};

const SearchFilterTaskForm = () => {
    return (
        <div className="flex">
            <form>
                <input type="text" placeholder="Search tasks..." />
            </form>
            <div>
                Filter by tags <button>Important</button> <button>Not Important</button>{" "}
                <button>Daily</button>
            </div>
        </div>
    );
};

function App() {
    const [list, setList] = useState(TASKS);
    return (
        <>
            <h1>To-Do App</h1>
            <SearchFilterTaskForm />
            <TaskList taskList={list} />
            <NewTaskForm />
        </>
    );
}

export default App;
