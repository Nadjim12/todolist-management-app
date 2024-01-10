
import { useState } from 'react';

const Header = ({ handleAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTask(title);
    setTitle('');
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="Enter task title..."
        />
        <button type="submit">Add Task</button>
      </form>
    </header>
  );
};

export default Header;