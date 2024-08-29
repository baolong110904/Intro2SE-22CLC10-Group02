import React from 'react';
import Card from './Card';
import LineChart from './LineChart';
import CountUp from 'react-countup';

const AnalyticsTeacher = () => {
  const userData = [
    { date: 'Mar 15', users: 3800 },
    { date: 'Mar 16', users: 3400 },
    { date: 'Mar 17', users: 2500 },
    { date: 'Mar 18', users: 2600 },
    { date: 'Mar 19', users: 3500 },
    { date: 'Mar 20', users: 3300 },
    { date: 'Mar 21', users: 4700 },
  ];

  const deviceData = [
    { label: "Phone", size: 60, count: 2570, color: "bg-green-500" },
    { label: "Tablet", size: 30, count: 1285, color: "bg-green-400" },
    { label: "Desktop", size: 8, count: 342, color: "bg-green-300" },
    { label: "Other", size: 2, count: 85, color: "bg-green-200" }
  ];

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Student Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title="Exercises Completed" value={<CountUp end={100} duration={2.5} />} />
        <Card title="Average Score" value={<CountUp end={8.8} duration={2.5} decimals={1} />} />
        <Card title="Ranking Change" value={<CountUp end={24} duration={2.5} prefix="+ " />} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-xl font-semibold mb-4">Student Overview</h2>
        <LineChart data={userData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Device Usage</h2>
        <div className="pb-4">
          <div className="overflow-hidden rounded-full h-3 bg-gray-200 flex">
            {deviceData.map((item, index) => (
              <div key={index} className={`h-full ${item.color}`} style={{width: `${item.size}%`, transition: 'width 1s ease-out'}}></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deviceData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm mb-2">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${item.color}`}></span>
                <span className="text-gray-500">{item.label}</span>
              </div>
              <Card title="" value={<CountUp end={item.count} duration={2.5} />} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTeacher;