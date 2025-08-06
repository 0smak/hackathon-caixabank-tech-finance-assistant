import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TimelineChart({
  dataSet,
  lineConfig = [
    { key: "income", color: "#82ca9d", name: "Income" },
    { key: "expense", color: "#8884d8", name: "Expense" },
  ],
}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={dataSet}>
        <defs>
          {lineConfig.map((line) => (
            <linearGradient
              key={line.name}
              id={line.name}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={line.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={line.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background-color)",
          }}
          labelFormatter={(value) => (
            <span className="text-color">{value}</span>
          )}
        />
        <Legend />
        {lineConfig.map((line) => (
          <Area
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            name={line.name}
            fill={`url(#${line.name})`}
            baseValue="dataMin"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TimelineChart;
