// FILE: PendingTaskSummary.jsx
import React from 'react';

const PendingTaskSummary = ({ pendingStatistics }) => {
    const timeLapsed = (pendingStatistics.totalTimeLapsed/60).toFixed(0);
  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-600">Total pending tasks</p>
        <p className="text-2xl font-bold text-indigo-600">{pendingStatistics.totalPendingTasks}</p>
      </div>
      <div>
        <p className="text-gray-600">Total time lapsed</p>
        <p className="text-2xl font-bold text-indigo-600">{timeLapsed} hrs</p>
      </div>
      <div>
        <p className="text-gray-600">Total time to end</p>
        <p className="text-2xl font-bold text-indigo-600">{pendingStatistics.totalTimeToEnd.toFixed(2)} hrs</p>
      </div>
    </div>
  );
};

export default PendingTaskSummary;