import React, { useState } from 'react';
import Tasks from './components/Tasks';  
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setNewTask(''); 
  };

  const completeTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
  };

  const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input type="text" placeholder="Search tasks" onChange={(e) => setSearchTerm(e.target.value)} /> {/* Search field */}
        <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} /> {/* Task input field */}
        <button onClick={() => addTask(newTask)}>Add a new task</button> {/* Add task button */}
      </div>
      <div>
        <h2>Tasks ({filteredTasks.length})</h2>
        {filteredTasks.map((task, index) => (
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

      <Tasks />
    </div>
  );
}

export default App;
