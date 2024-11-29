// FILE: Statistics.jsx
import React from 'react';

const Statistics = ({ statistics }) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-600">Total tasks</p>
        <p className="text-2xl font-bold text-indigo-600">{statistics.totalTasks}</p>
      </div>
      <div>
        <p className="text-gray-600">Tasks completed</p>
        <p className="text-2xl font-bold text-indigo-600">
          {statistics.percentCompleted}% ({Math.round((statistics.percentCompleted / 100) * statistics.totalTasks)} tasks)
        </p>
      </div>
      <div>
        <p className="text-gray-600">Tasks pending</p>
        <p className="text-2xl font-bold text-indigo-600">
          {statistics.percentPending}% ({Math.round((statistics.percentPending / 100) * statistics.totalTasks)} tasks)
        </p>
      </div>
      <div>
        <p className="text-gray-600">Average completion time</p>
        <p className="text-2xl font-bold text-indigo-600">{statistics.averageCompletionTime} hrs</p>
      </div>
    </div>
  );
};

export default Statistics;