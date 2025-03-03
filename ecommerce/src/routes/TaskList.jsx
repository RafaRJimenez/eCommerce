import React, {useEffect, useState} from 'react';  
import { addNewTask, getTasks, updateTask, deleteTask  } from '../firebase/taskController';

const task = {
    title: "task 1",
    description: "description of task 1"
}

const TaskList = () => {
    // const [title, setTitle] = useState(task.title);
    // const [description, setDescription] = useState(task.description);
    const [task, setTask] = useState({ title: "", description: "" });
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState("add");


    const createNewTask = async () => {
        console.log(task);
      await addNewTask(task);
      setTask({ title: "", description: "" });
       initializeTasks();
    }

    const updateExistingTask = async () => {
        await updateTask(task.id, task);
        setTask({ title: "", description: "" });
        setMode("add");
        initializeTasks();
    }

    const initializeTasks = () => {
        getTasks().then(t => setTasks([...t]))
        .catch(e => console.error(e));  
    };

    const editTask = id => {
        setMode("update");
        const taskToEdit = tasks.find(t => t.id === id);
        setTask({...taskToEdit});
    }

    const removeTask = async id => {
        await deleteTask(id);
        initializeTasks();
    }

    useEffect(() => {
         initializeTasks();
    }, [])

    return (
        <div className='container'>
            <h1>Task List</h1>
            <h2>insert new task</h2>
            <input type="text" value={task.title} 
            onChange={e => setTask({...task, title: e.target.value})} 
            placeholder="task name" />
             <textarea type="text" 
             value={task.description} 
             rows={4}
            onChange={e => setTask({...task, description: e.target.value})} 
            placeholder="description" />
            <button
            onClick={() => mode === "add" ? createNewTask() : updateExistingTask()}
            >
                {mode === "add" ? "Add" : "Update"}
            </button>
            <button
            onClick={() => getTasks()}
            >get tasks</button>
            <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <button onClick={() => editTask(task.id)}>Edit</button>
                    <button onClick={() =>
                     window.confirm("seguro que quieres eliminar esta tarea?") &&
                     removeTask(task.id)
                     }>Delete</button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default TaskList;
