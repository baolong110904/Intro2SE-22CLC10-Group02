import React from 'react';
import Card from './Card';
import LineChart from './LineChart';

const Analytics = () => {
  const userData = [
    { date: 'Mar 15', users: 3800 },
    { date: 'Mar 16', users: 3400 },
    { date: 'Mar 17', users: 2500 },
    { date: 'Mar 18', users: 2600 },
    { date: 'Mar 19', users: 3500 },
    { date: 'Mar 20', users: 3300 },
    { date: 'Mar 21', users: 4700 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Setting</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title="Exercises Finished" value="100" />
        <Card title="Average Scores" value="8.8" />
        <Card title="Position" value="+ 24" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">User Overview</h2>
        <LineChart data={userData} />
      </div>
    </div>
  );
};

export default Analytics;