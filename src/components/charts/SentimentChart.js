// Sentiment Score Chart
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
  {
    name: "Gazibad",
    positive: 9087443,
    negative: 99,
    neutral: 87,
    mixed: 109,
    code: 430123,
  },
  {
    name: "Noida",
    positive: 8000000,
    negative: 150,
    neutral: 100,
    mixed: 120,
    code: 201302,
  },
  {
    name: "Delhi",
    positive: 7500000,
    negative: 200,
    neutral: 150,
    mixed: 130,
    code: 110034,
  },
  {
    name: "Nagpur",
    positive: 7000000,
    negative: 250,
    neutral: 200,
    mixed: 140,
    code: 129012,
  },
  {
    name: "Lucknow",
    positive: 6500000,
    negative: 300,
    neutral: 250,
    mixed: 150,
    code: 129012,
  },
  {
    name: "Indore",
    positive: 6000000,
    negative: 350,
    neutral: 300,
    mixed: 160,
    code: 129012,
  },
];

const COLORS = {
  positive: "#23D19B",
  negative: "#F5738D",
  neutral: "#FFC536",
  mixed: "#FF9A3B",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].payload.name}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="value"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value.toLocaleString()}`}
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

const SentimentScoreChart = ({ chartType = "Bar Chart" }) => {
  const pieData = data.flatMap((city) => {
    const total = city.positive + city.negative + city.neutral + city.mixed;
    return [
      {
        name: city.name,
        type: "Positive",
        value: city.positive,
        percent: city.positive / total,
        color: COLORS.positive,
      },
      {
        name: city.name,
        type: "Negative",
        value: city.negative,
        percent: city.negative / total,
        color: COLORS.negative,
      },
      {
        name: city.name,
        type: "Neutral",
        value: city.neutral,
        percent: city.neutral / total,
        color: COLORS.neutral,
      },
      {
        name: city.name,
        type: "Mixed",
        value: city.mixed,
        percent: city.mixed / total,
        color: COLORS.mixed,
      },
    ];
  });

  const legendPayload = [
    { value: "Positive", type: "circle", color: COLORS.positive },
    { value: "Negative", type: "circle", color: COLORS.negative },
    { value: "Neutral", type: "circle", color: COLORS.neutral },
    { value: "Mixed", type: "circle", color: COLORS.mixed },
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
            <Line
              type="monotone"
              dataKey="positive"
              stroke={COLORS.positive}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="negative"
              stroke={COLORS.negative}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="neutral"
              stroke={COLORS.neutral}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="mixed"
              stroke={COLORS.mixed}
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
              dataKey="percent"
              nameKey="type"
              label={({ name, type, percent }) =>
                `${name} ${type}: ${(percent * 100).toFixed(2)}%`
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
            <Tooltip
              content={<CustomTooltip />}
              formatter={(value, name, props) => [
                props.payload.value.toLocaleString(),
                props.payload.type,
              ]}
            />
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
              dataKey="positive"
              stackId="a"
              fill={COLORS.positive}
              barSize={8}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="negative"
              stackId="a"
              fill={COLORS.negative}
              barSize={8}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="neutral"
              stackId="a"
              fill={COLORS.neutral}
              barSize={8}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="mixed"
              stackId="a"
              fill={COLORS.mixed}
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

export default SentimentScoreChart;
