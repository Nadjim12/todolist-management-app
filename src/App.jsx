import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input type="text" placeholder="Search tasks" />
        <button onClick={addTask}>Add a new task list</button>
        <button onClick={addTask}>Create tasks</button>
      </div>
      <div>
        <h2>Tasks ({tasks.length})</h2>
        {tasks.map((task, index) => (
          <div key={index}>
            <p>{task}</p>
            <button onClick={() => completeTask(task)}>Complete</button>
            <button onClick={() => deleteTask(task)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Completed Tasks ({completedTasks.length} of {tasks.length})</h2>
        {completedTasks.map((task, index) => (
          <div key={index}>
            <p>{task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App; 