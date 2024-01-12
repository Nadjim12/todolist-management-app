import React, { useState } from 'react';
import Tasks from './components/Tasks';  
import './App.css';
import Highlighter from 'react-highlight-words';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [editValue, setEditValue] = useState('');

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

  const editTaskFunc = (task) => {
    setEditMode(true);
    setEditTask(task);
  };

  const updateTask = (task) => {
    setTasks(tasks.map((item) => (item === editTask ? task : item)));
    setEditMode(false);
    setEditValue('');
  };

  const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input type="text" placeholder="Search tasks" onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={() => addTask(newTask)}>Add a new task</button>
      </div>
      <div>
        <h2>Tasks ({filteredTasks.length})</h2>
        {filteredTasks.map((task, index) => (
          <div key={index}>
            {editMode && editTask === task ? (
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            ) : (
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={task}
              />
            )}
            <button onClick={() => completeTask(task)}>Complete</button>
            <button onClick={() => deleteTask(task)}>Delete</button>
            {editMode && editTask === task ? (
              <button onClick={() => updateTask(editValue)}>Update</button>
            ) : (
              <button onClick={() => editTaskFunc(task)}>Edit</button>
            )}
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