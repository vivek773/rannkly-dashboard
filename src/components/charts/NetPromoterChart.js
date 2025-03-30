// Net Promoter Score Chart;
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
    promoter: 800,
    detractor: 300,
    passive: 200,
    code: 430123,
  },
  { name: "Noida", promoter: 750, detractor: 350, passive: 250, code: 201302 },
  { name: "Delhi", promoter: 700, detractor: 400, passive: 300, code: 110034 },
  { name: "Nagpur", promoter: 650, detractor: 450, passive: 350, code: 129012 },
  {
    name: "Lucknow",
    promoter: 600,
    detractor: 500,
    passive: 400,
    code: 129012,
  },
  { name: "Indore", promoter: 550, detractor: 550, passive: 450, code: 129012 },
];

const COLORS = {
  promoter: "#FF8843",
  detractor: "#668EFB",
  passive: "#FF6984",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">
          {data.name} - {data.type}
        </p>
        <p className="value" style={{ color: payload[0].color }}>
          {`Value: ${data.value} (${(data.percent * 100).toFixed(1)}%)`}
        </p>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
  const { value } = payload;
  const cityData = data.find((d) => d.name === value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-10} y={0} dy={4} textAnchor="end" fill="#666">
        {value}
      </text>
      <text x={-10} y={15} dy={4} textAnchor="end" fill="#999" fontSize="12">
        ({cityData.code})
      </text>
    </g>
  );
};
const NetPromoterScoreChart = ({ chartType = "Bar Chart" }) => {
  const pieData = data.flatMap((city) => [
    {
      name: city.name,
      type: "Promoter",
      value: city.promoter,
      color: COLORS.promoter,
    },
    {
      name: city.name,
      type: "Detractor",
      value: city.detractor,
      color: COLORS.detractor,
    },
    {
      name: city.name,
      type: "Passive",
      value: city.passive,
      color: COLORS.passive,
    },
  ]);

  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  pieData.forEach((item) => {
    item.percent = item.value / total;
  });

  const legendPayload = [
    { value: "Promoter", type: "circle", color: COLORS.promoter },
    { value: "Detractor", type: "circle", color: COLORS.detractor },
    { value: "Passive", type: "circle", color: COLORS.passive },
  ];

  const renderChart = () => {
    switch (chartType) {
      case "Line Chart":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip content={<CustomTooltip />} />
            <Legend payload={legendPayload} />
            <Line type="monotone" dataKey="promoter" stroke={COLORS.promoter} />
            <Line
              type="monotone"
              dataKey="detractor"
              stroke={COLORS.detractor}
            />
            <Line type="monotone" dataKey="passive" stroke={COLORS.passive} />
          </LineChart>
        );
      case "Pie Chart":
        return (
          <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              nameKey="type"
              label={({ name, type, percent }) =>
                `${name} ${type}: ${(percent * 100).toFixed(1)}%`
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
          </PieChart>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" stroke="#FFFFFF" />
              <YAxis
                dataKey="name"
                type="category"
                tick={<CustomYAxisTick />}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Bar dataKey="promoter" stackId="a" fill="#FF8843" barSize={8} />
              <Bar dataKey="detractor" stackId="a" fill="#668EFB" barSize={8} />
              <Bar dataKey="passive" stackId="a" fill="#FF6984" barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default NetPromoterScoreChart;
