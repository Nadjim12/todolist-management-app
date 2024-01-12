import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  console.log(taskLists); 

  useEffect(() => {
    fetch('https://wild-rose-walrus-suit.cyclic.app/todos')
      .then(response => response.json())
      .then(data => setTaskLists(data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  const handleAddTaskList = () => {
    const newTask = {};
    fetch('https://wild-rose-walrus-suit.cyclic.app/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      setTaskLists(oldTaskLists => [...oldTaskLists, data]);
      console.log('Task added:', data);
    })
    .catch(error => console.error('There was an error!', error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`https://wild-rose-walrus-suit.cyclic.app/todos/${taskId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTaskLists(taskLists.filter(task => task.id !== taskId));
      console.log('Task deleted:', taskId);
    })
    .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <input type="text" placeholder="Search tasks" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={handleAddTaskList}>Add a new task</button>

      <h1>Task List</h1>
      {taskLists && taskLists.filter(task => task.title.includes(searchTerm)).map(task => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

