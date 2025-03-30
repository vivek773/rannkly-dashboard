// Online Rating Index Chart
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Gazibad', value: 95.4, code: 430123 },
  { name: 'Noida', value: 90.2, code: 201302 },
  { name: 'Delhi', value: 88.1, code: 110034 },
  { name: 'Nagpur', value: 85.6, code: 129012 },
  { name: 'Lucknow', value: 82.3, code: 129012 },
  { name: 'Indore', value: 80.0, code: 129012 },
];

const COLORS = ['#FFAE4C', '#FF8042', '#FFBB28', '#FF483C', '#FF6E4A', '#FFA07A'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Oct 2024`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="value" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const { value } = payload;
  const cityData = data.find((d) => d.name === value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {value}
      </text>
      <text x={0} y={20} dy={16} textAnchor="middle" fill="#999" fontSize="12">
        ({cityData.code})
      </text>
    </g>
  );
};

const OnlineRatingIndexChart = ({ chartType = 'Bar Chart' }) => {
  const renderChart = () => {
    switch(chartType) {
      case 'Line Chart':
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#E6E6E6" tick={<CustomXAxisTick />} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Line type="monotone" dataKey="value" stroke="#FFAE4C" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        );
      case 'Pie Chart':
        return (
          <PieChart
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
      default:
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#E6E6E6" tick={<CustomXAxisTick />} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar dataKey="value" fill="#FFAE4C" barSize={8} radius={[10, 10, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default OnlineRatingIndexChart;