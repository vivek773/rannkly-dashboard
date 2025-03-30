// Rating Review Chart
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
    appstore: 123,
    swiggy: 99,
    zomato: 87,
    tripadvisor: 109,
    code: 430123,
  },
  {
    name: "Noida",
    appstore: 150,
    swiggy: 120,
    zomato: 110,
    tripadvisor: 130,
    code: 201302,
  },
  {
    name: "Delhi",
    appstore: 180,
    swiggy: 140,
    zomato: 130,
    tripadvisor: 150,
    code: 110034,
  },
  {
    name: "Nagpur",
    appstore: 200,
    swiggy: 160,
    zomato: 150,
    tripadvisor: 170,
    code: 129012,
  },
  {
    name: "Lucknow",
    appstore: 220,
    swiggy: 180,
    zomato: 170,
    tripadvisor: 190,
    code: 129012,
  },
  {
    name: "Indore",
    appstore: 240,
    swiggy: 200,
    zomato: 190,
    tripadvisor: 210,
    code: 129012,
  },
];

const COLORS = {
  appstore: "#FFC536",
  swiggy: "#668EFB",
  zomato: "#23D19B",
  tripadvisor: "#FF6984",
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
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
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

const RatingsReviewsChart = ({ chartType = "Bar Chart" }) => {
  const pieData = data.flatMap((city) => [
    {
      name: city.name,
      type: "App Store",
      value: city.appstore,
      color: COLORS.appstore,
    },
    {
      name: city.name,
      type: "Swiggy",
      value: city.swiggy,
      color: COLORS.swiggy,
    },
    {
      name: city.name,
      type: "Zomato",
      value: city.zomato,
      color: COLORS.zomato,
    },
    {
      name: city.name,
      type: "TripAdvisor",
      value: city.tripadvisor,
      color: COLORS.tripadvisor,
    },
  ]);

  const legendPayload = [
    { value: "App Store", type: "circle", color: COLORS.appstore },
    { value: "Swiggy", type: "circle", color: COLORS.swiggy },
    { value: "Zomato", type: "circle", color: COLORS.zomato },
    { value: "TripAdvisor", type: "circle", color: COLORS.tripadvisor },
  ];

  const renderChart = () => {
    switch (chartType) {
      case "Line Chart":
        return (
          <LineChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6" />
            <XAxis type="number" stroke="#FFFFFF" />
            <YAxis dataKey="name" type="category" tick={<CustomYAxisTick />} />
            <Legend
              payload={legendPayload}
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="appstore" stroke={COLORS.appstore} />
            <Line type="monotone" dataKey="swiggy" stroke={COLORS.swiggy} />
            <Line type="monotone" dataKey="zomato" stroke={COLORS.zomato} />
            <Line
              type="monotone"
              dataKey="tripadvisor"
              stroke={COLORS.tripadvisor}
            />
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
          </PieChart>
        );
      default:
        return (
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6" />
            <XAxis type="number" stroke="#FFFFFF" />
            <YAxis dataKey="name" type="category" tick={<CustomYAxisTick />} />
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
              dataKey="appstore"
              stackId="a"
              fill={COLORS.appstore}
              barSize={8}
            />
            <Bar
              dataKey="swiggy"
              stackId="a"
              fill={COLORS.swiggy}
              barSize={8}
            />
            <Bar
              dataKey="zomato"
              stackId="a"
              fill={COLORS.zomato}
              barSize={8}
            />
            <Bar
              dataKey="tripadvisor"
              stackId="a"
              fill={COLORS.tripadvisor}
              barSize={8}
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

export default RatingsReviewsChart;
