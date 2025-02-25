import React, {useEffect, useState} from 'react';  
import { addNewTask, getTasks } from '../firebase/taskController';

const task = {
    title: "task 1",
    description: "description of task 1"
}

const TaskList = () => {
    // const [title, setTitle] = useState(task.title);
    // const [description, setDescription] = useState(task.description);
    const [task, setTask] = useState({ title: "", description: "" });
    const [tasks, setTasks] = useState([]);
    const createNewTask = async () => {
        console.log(task);
      await addNewTask(task);
      setTask({ title: "", description: "" });
       initializeTasks();
    }

    const initializeTasks = () => {
        getTasks().then(t => setTasks([...t]))
        .catch(e => console.error(e));  
    };

    useEffect(() => {
        initializeTasks();
    }, [])

    return (
        <div>
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
            onClick={createNewTask}
            > submit task</button>
            <button
            onClick={getTasks}
            >get tasks</button>
            <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default TaskList;
