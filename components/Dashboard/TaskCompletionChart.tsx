'use client';

import { useState, useEffect } from 'react';

const TaskCompletionChart = () => {
  // Mock data for the chart
  const [chartData, setChartData] = useState([
    { day: 'Mon', completed: 4, pending: 2 },
    { day: 'Tue', completed: 2, pending: 3 },
    { day: 'Wed', completed: 6, pending: 1 },
    { day: 'Thu', completed: 3, pending: 4 },
    { day: 'Fri', completed: 5, pending: 2 },
    { day: 'Sat', completed: 1, pending: 3 },
    { day: 'Sun', completed: 7, pending: 0 },
  ]);

  // Calculate max value for scaling the chart
  const maxValue = Math.max(...chartData.map(d => d.completed + d.pending)) || 10;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Task Completion</h3>
        <div className="flex space-x-4">
          <button className="text-sm text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1">
            Week
          </button>
          <button className="text-sm text-gray-600 font-medium hover:text-indigo-600">
            Month
          </button>
          <button className="text-sm text-gray-600 font-medium hover:text-indigo-600">
            Year
          </button>
        </div>
      </div>

      <div className="flex items-end h-64 pt-8 space-x-2 md:space-x-4">
        {chartData.map((data, index) => {
          const completedHeight = (data.completed / maxValue) * 100;
          const pendingHeight = (data.pending / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-end justify-center h-full w-full">
                {/* Pending tasks bar */}
                <div 
                  className="w-3/5 bg-yellow-400 rounded-t-md transition-all duration-500 ease-out"
                  style={{ height: `${pendingHeight}%` }}
                ></div>
                
                {/* Completed tasks bar */}
                <div 
                  className="w-3/5 bg-green-500 rounded-t-md transition-all duration-500 ease-out"
                  style={{ height: `${completedHeight}%` }}
                ></div>
              </div>
              
              <div className="mt-2 text-xs text-gray-600">{data.day}</div>
              
              <div className="flex space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          <span className="text-xs text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
          <span className="text-xs text-gray-600">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionChart;