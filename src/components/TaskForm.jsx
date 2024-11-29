import React, { useState } from 'react';
import API from '../api';

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({
    title: '',
    startTime: '',
    endTime: '',
    priority: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', { ...task, status: 'pending' });
      refreshTasks();
      setTask({ title: '', startTime: '', endTime: '', priority: 1 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        value={task.startTime}
        onChange={(e) => setTask({ ...task, startTime: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        value={task.endTime}
        onChange={(e) => setTask({ ...task, endTime: e.target.value })}
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        {[1, 2, 3, 4, 5].map((p) => (
          <option key={p} value={p}>
            Priority {p}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
