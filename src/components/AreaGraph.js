import { Typography } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateHistoricalBalance } from "../lib/transactionsUtils";
import { memo } from "react";

function AreaGraph({
  title = "Balance over time",
  data,
  dataKey = "balance",
  dateKey = "date",
  strokeColor = "#8884d8",
  gradientId = "colorUv",
}) {
  const chartData = calculateHistoricalBalance(data);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {!!chartData?.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey={dateKey} tickMargin={15} />
            <YAxis tickFormatter={(value) => value + " €"} tickMargin={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background-color)",
              }}
              labelFormatter={(value) => (
                <span className="text-color">{value}</span>
              )}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              baseValue="dataMin"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Typography component="p" sx={{ mt: 1 }}>
          There are no transactions available.
        </Typography>
      )}
    </>
  );
}

export default memo(AreaGraph);
