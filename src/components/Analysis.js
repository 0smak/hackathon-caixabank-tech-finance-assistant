import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { transactionsStore } from "../stores/transactionStore";

import { userSettingsStore } from "../stores/userSettingsStore";
import {
  getBudgetVsExpensesDataSet,
  getTimelineDataSet,
} from "../lib/analysis";
import { getMonthlyExpenses } from "../lib/transactionsUtils";
import BudgetVsExpenses from "./BudgetVsExpenses";
import ExportButton from "./ExportButton";
import MonthlyChart from "./MonthlyChart";
import TitleH3 from "./TitleH3";

function Analysis() {
  const transactions = useStore(transactionsStore);
  const budget = useStore(userSettingsStore).totalBudgetLimit;

  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");
  const [trendData, setTrendData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    if (reportType === "trend") {
      const dataSet = getTimelineDataSet(transactions, timeFrame);
      setTrendData(dataSet);
    } else {
      setTimeFrame("monthly");
      setBudgetData(
        getBudgetVsExpensesDataSet(getMonthlyExpenses(transactions), budget)
      );
    }
  }, [transactions, reportType, timeFrame, budget]);

  return (
    <Box sx={{ mt: 1, p: { xs: 0, md: 4 }, bgcolor: "background.default" }}>
      <Box sx={{ mb: 4 }}>
        <TitleH3>Advanced Analysis</TitleH3>
      </Box>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              label="Time Frame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              disabled={reportType === "budget"}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ExportButton
            data={reportType === "trend" ? trendData : budgetData}
            filename={
              reportType === "trend"
                ? "Income_and_Expenses_Trend.csv"
                : "Budget_vs_Actual_Expenses.csv"
            }
            headers={
              reportType === "trend"
                ? ["key", "Income", "Expense"]
                : ["key", "Budget", "Actual"]
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              padding: 2,
              boxShadow: "5px 5px 15px #00000015",
              borderRadius: 2,
            }}
          >
            {reportType === "trend" ? (
              <>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Income and Expenses Trend
                </Typography>
                <MonthlyChart data={trendData} />
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Budget vs. Actual Expenses
                </Typography>
                <BudgetVsExpenses data={budgetData} />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              padding: 2,
              boxShadow: "5px 5px 15px #00000015",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              padding: 2,
              boxShadow: "5px 5px 15px #00000015",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
