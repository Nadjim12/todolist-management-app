import { useState, useEffect } from 'react';

const Task = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskLists, setTaskLists] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const URL_API = "http://localhost:3000/todos"
    fetch(URL _API)
    .then(response => response.json())
    .then(data => setTaskLists(data))
    .catch(error => console.error('There was an error!', error));
}, []);

const handleSearch = (event) => {
    setSearchTerm(event.target.value);
};


const handleAddTaskList = () => {
    const newTask = { title: 'My New Task', description: 'This is my new task.' 
};
    };
    fetch('https://todolist-management-app.free.mockoapp.net/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      
      setTaskLists([...taskLists, data]);
    })
    .catch(error => console.error('There was an error!', error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`https://todolist-management-app.free.mockoapp.net/todos/${taskId}`, {
      method: 'DELETE',
    })
    .then(() => {
      
      setTaskLists(taskLists.filter(task => task.id !== taskId));
    })
    .catch(error => console.error('There was an error!', error));
  };

const handleRenameTask = (taskId, newName) => {
    setTaskLists(taskLists.map(task => task.id === taskId ? {...task, name: newName} : task));
};

const handleCompleteTask = (taskId) => {
    setTaskLists(taskLists.map(task => task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task));
    setCompletedCount(taskLists.filter(task => task.isCompleted).length);
};

return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search tasks..."
        />
      </div>
      <div>
        <button onClick={handleAddTaskList}>Add a new task list</button>
      </div>
      <div>
        <button>Create tasks</button>
      </div>
      <div>
        <h3>Created Tasks ({taskLists.length})</h3>
        {taskLists.map((task) => (
          <div key={task.id}>
            <span>{task.name}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleRenameTask(task.id, 'New Name')}>Rename</button>
            <button onClick={() => handleCompleteTask(task.id)}>
              {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        ))}
      </div>
      <div>
        <p>
          Completed Tasks {completedCount} of {taskLists.length}
        </p>
      </div>
    </div>
  );
};

export default Task;