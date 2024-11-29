import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { FiEdit3, FiTrash, FiFilter } from 'react-icons/fi';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import API from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortBy, setSortBy] = useState('startTime');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  // Fetch tasks from the server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get('/tasks/');
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  // Helper functions for sorting and filtering
  const sortTasks = () => {
    return tasks.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filterTasks = () => {
    if (filterByStatus === 'all') return sortTasks();
    return sortTasks().filter(task => task.status === filterByStatus);
  };

  // CRUD operations
  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async (updatedTask) => {
    try {
      if (updatedTask._id) {
        const response = await API.patch(`/tasks/${updatedTask._id}`, updatedTask);
        setTasks(tasks.map(task => (task._id === updatedTask._id ? response.data : task)));
      } else {
        const response = await API.post('/tasks', updatedTask);
        setTasks([...tasks, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filterTasks().slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task List</h1>
        <div>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-4"
            onClick={handleCreateTask}
          >
            <FaPlus className="inline-block mr-2" /> Add Task
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            // Add delete selected tasks functionality here
          >
            <FaTrashAlt className="inline-block mr-2" /> Delete Selected
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-500" />
          <select
            className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="startTime">Start Time</option>
            <option value="endTime">End Time</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
          <select
            className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-500" />
          <select
            className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-center">Priority</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task._id}
                className={`border-b ${
                  task.status === 'finished'
                    ? 'bg-green-100'
                    : task.status === 'pending'
                    ? 'bg-yellow-100'
                    : 'bg-white'
                }`}
              >
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">
                  {new Date(task.startTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(task.endTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-2 rounded-full text-white ${
                      task.priority === 1
                        ? 'bg-green-400'
                        : task.priority === 2
                        ? 'bg-yellow-400'
                        : task.priority === 3
                        ? 'bg-orange-400'
                        : task.priority === 4
                        ? 'bg-red-400'
                        : 'bg-purple-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      task.status === 'finished'
                        ? 'bg-green-600'
                        : 'bg-yellow-400'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 mr-2"
                    onClick={() => handleEditTask(task)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        {Array.from({
          length: Math.ceil(filterTasks().length / tasksPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md mx-1 ${
              currentPage === index + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {showModal && (
        <TaskModal
          task={selectedTask}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TaskList;