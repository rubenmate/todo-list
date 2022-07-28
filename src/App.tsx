import React, { ReactNode, SetStateAction, useState } from "react";
import { AiOutlineCheckSquare, AiOutlineGithub } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

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
        <li className="flex justify-between items-center w-full gap-x-1 text-2xl mb-2 border border-slate-600 rounded-sm p-2 shadow-xl">
            <div className="flex">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleCheckboxChange(task.id)}
                    className="mr-2"
                ></input>
                <p className="md:w-80">{task.name}</p>
            </div>
            <button className="bg-red-600 p-1 rounded-md" onClick={() => handleTodoDelete(task.id)}>
                <FaTrash className="text-gray-800" />
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
        <ul className="w-80">
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
        <form className="flex gap-x-2">
            <input
                className="text-slate-900 rounded-sm"
                type="text"
                placeholder="New task"
                value={newTaskText}
                onChange={(e) => onNewTaskTextChange(e.target.value)}
            />
            <button
                className="bg-blue-500 rounded-md h-10 p-2"
                onClick={(e) => {
                    e.preventDefault();
                    handleTodoAdd();
                    onNewTaskTextChange("");
                }}
            >
                <IoMdAddCircleOutline className="h-5 w-5" />
            </button>
        </form>
    );
};

const SearchFilterTaskForm: React.FC<{
    filterText: string;
    onFilterTextChange: React.Dispatch<SetStateAction<string>>;
}> = ({ filterText, onFilterTextChange }) => {
    function handleFiltersClean() {
        onFilterTextChange("");
    }
    return (
        <div className="flex mb-2">
            <input
                className="text-slate-900 rounded-sm"
                type="text"
                placeholder="Search tasks..."
                value={filterText}
                onChange={(e) => {
                    onFilterTextChange(e.target.value);
                }}
                onSubmit={(e) => e.preventDefault()}
            />
            <button className="bg-blue-500 rounded-md h-10 p-2 ml-2" onClick={handleFiltersClean}>
                Clear filters
            </button>
        </div>
    );
};

const Title: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <h1 className="text-6xl md:text-8xl font-bold mb-8">{children}</h1>;
};

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-4 max-w-5xl mx-auto">
            <AiOutlineCheckSquare className="w-10 h-10 text-white" />
            <a
                href="https://github.com/rubenmate/todo-list"
                target="_blank"
                className="flex items-center"
            >
                Source Code <AiOutlineGithub className="ml-1 w-8 h-8 text-white" />
            </a>
        </nav>
    );
};

const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex flex-col items-center max-w-4xl mx-auto">{children}</div>;
};

function App() {
    const [list, setList] = useState(TASKS);
    const [filterText, setFilterText] = useState("");
    const [newTaskText, setNewTaskText] = useState("");

    return (
        <>
            <Navbar />
            <AppWrapper>
                <Title>To-Do App</Title>
                <SearchFilterTaskForm filterText={filterText} onFilterTextChange={setFilterText} />
                <TaskList taskList={list} setList={setList} filterText={filterText} />
                <NewTaskForm
                    taskList={list}
                    setList={setList}
                    newTaskText={newTaskText}
                    onNewTaskTextChange={setNewTaskText}
                />
            </AppWrapper>
        </>
    );
}

export default App;
