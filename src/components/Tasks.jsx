import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [taskLists, setTaskLists] = useState([]);


  useEffect(() => {
    fetch('https://todolist-management-app.free.mockoapp.net/todos')
      .then(response => response.json())
      .then(data => setTaskLists(data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  
  const handleAddTaskList = () => {
    const newTask = {  };
    fetch('https://todolist-management-app.free.mockoapp.net/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      
      setTaskLists(oldTaskLists => [...oldTaskLists, data]);
    })
    .catch(error => console.error('There was an error!', error));
  };

  
  const handleDeleteTask = (taskId) => {
    fetch(`https://todolist-management-app.free.mockoapp.net/todos/${taskId}`, {
      method: 'DELETE',
    })
    .then(() => {
      /
      setTaskLists(taskLists.filter(task => task.id !== taskId));
    })
    .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <h1>Task List</h1>
      {taskLists.map(task => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddTaskList}>Add Task</button>
    </div>
  );
};

export default Tasks;
