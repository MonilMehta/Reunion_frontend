import React, { useEffect, useState } from 'react';
import API from '../api';
import Statistics from './Statistics';
import PendingTaskSummary from './PendingTaskSummary';
import PriorityPendingTasks from './PriorityPendingTasks';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [pendingStatistics, setPendingStatistics] = useState(null);
  const [priorityPendingTasks, setPriorityPendingTasks] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks/');
      console.log(data);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStatistics = async () => {
    try {
      const { data } = await API.get('/tasks/statistics');
      setStatistics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingStatistics = async () => {
    try {
      const { data } = await API.get('/tasks/pending-tasks');
      setPendingStatistics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPriorityPendingTasks = async () => {
    try {
      const { data } = await API.get('/tasks/priority-pending-tasks');
      setPriorityPendingTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStatistics();
    fetchPendingStatistics();
    fetchPriorityPendingTasks();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
          {statistics && <Statistics statistics={statistics} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Task Summary</h3>
          {pendingStatistics && <PendingTaskSummary pendingStatistics={pendingStatistics} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Priority Pending Tasks</h3>
          {priorityPendingTasks && <PriorityPendingTasks priorityPendingTasks={priorityPendingTasks} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;