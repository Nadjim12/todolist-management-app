import { useState, useEffect } from 'react';

const Task = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskLists, setTaskLists] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const URL_API = "http://localhost:3000/todos"
    fetch(URL_API)
    .then(response => response.json())
    .then(data => setTaskLists(data))
    .catch(error => console.error('There was an error!', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = taskLists.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
        <h3>Created Tasks ({filteredTasks.length})</h3>
        {filteredTasks.map((task) => (
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
          Completed Tasks {completedCount} of {filteredTasks.length}
        </p>
      </div>
    </div>
  );
};

export default Task;