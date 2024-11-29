// FILE: PriorityPendingTasks.jsx
import React from 'react';

const PriorityPendingTasks = ({ priorityPendingTasks }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-gray-600">Priority Pending Tasks</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Priority</th>
            <th className="py-2 px-4 border-b">Time Lapsed (hrs)</th>
            <th className="py-2 px-4 border-b">Time to Finish (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(priorityPendingTasks.timeLapsedByPriority).map((priority) => (
            <tr key={priority}>
              <td className="py-2 px-4 border-b text-center">{priority}</td>
              <td className="py-2 px-4 border-b text-center">
                {priorityPendingTasks.timeLapsedByPriority[priority].toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {priorityPendingTasks.timeToFinishByPriority[priority].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriorityPendingTasks;