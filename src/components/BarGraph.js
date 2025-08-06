import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarGraph({
  dataSet,
  barConfig = [
    { key: "balance", color: "#82ca9d", name: "Balance" },
    { key: "budget", color: "#8884d8", name: "Budget" },
  ],
  key = "key",
}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dataSet}>
        <XAxis dataKey={key} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background-color)",
          }}
          labelFormatter={(value) => (
            <span className="text-color">{value}</span>
          )}
          cursor={false}
        />
        <Legend />
        {barConfig.map((bar, idx) => (
          <Bar
            radius={[15, 15, 0, 0]}
            key={idx}
            dataKey={bar.key}
            fill={bar.color}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph;
