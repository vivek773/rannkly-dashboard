// Responded Unresponded Chart
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Gazibad", responded: 800, unresponded: 200, code: 430123 },
  { name: "Noida", responded: 750, unresponded: 250, code: 201302 },
  { name: "Delhi", responded: 700, unresponded: 300, code: 110034 },
  { name: "Nagpur", responded: 650, unresponded: 350, code: 129012 },
  { name: "Lucknow", responded: 600, unresponded: 400, code: 129012 },
  { name: "Indore", responded: 550, unresponded: 450, code: 129012 },
];

const COLORS = {
  responded: "#137CFC",
  unresponded: "#B0DFFE",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].payload.name}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="value"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value} (${Math.round(
              (entry.value / total) * 100
            )}%)`}
          </p>
        ))}
        <p className="total">Total: {total}</p>
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

const RespondedUnrespondedChart = ({ chartType = "Bar Chart" }) => {
  const pieData = data.flatMap((city) => [
    {
      name: city.name,
      type: "Responded",
      value: city.responded,
      color: COLORS.responded,
    },
    {
      name: city.name,
      type: "Unresponded",
      value: city.unresponded,
      color: COLORS.unresponded,
    },
  ]);

  const legendPayload = [
    { value: "Responded", type: "circle", color: COLORS.responded },
    { value: "Unresponded", type: "circle", color: COLORS.unresponded },
  ];

  const renderChart = () => {
    switch (chartType) {
      case "Line Chart":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#E6E6E6" tick={<CustomXAxisTick />} />
            <Legend
              payload={legendPayload}
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend payload={legendPayload} />
            <Line
              type="monotone"
              dataKey="responded"
              stroke={COLORS.responded}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="unresponded"
              stroke={COLORS.unresponded}
              strokeWidth={2}
            />
          </LineChart>
        );
      case "Pie Chart":
        return (
          <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 40 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              nameKey="type"
              label={({ name, type, percent }) =>
                `${name} ${type}: ${Math.round(percent * 100)}%`
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              payload={legendPayload}
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend payload={legendPayload} />
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
            <Legend
              payload={legendPayload}
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar
              dataKey="responded"
              stackId="a"
              fill={COLORS.responded}
              barSize={8}
            />
            <Bar
              dataKey="unresponded"
              stackId="a"
              fill={COLORS.unresponded}
              barSize={8}
              radius={[10, 10, 0, 0]}
            />
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

export default RespondedUnrespondedChart;
