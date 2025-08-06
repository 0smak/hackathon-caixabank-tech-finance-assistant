import React, { Profiler, Suspense } from "react";
import { useStore } from "@nanostores/react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";
import { TRANSACTION_TYPE } from "../constants/transactionType";
import TitleH3 from "./TitleH3";

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);

  const totalIncome = transactions.reduce((acc, c) => {
    if (c.type === TRANSACTION_TYPE.INCOME) {
      return acc + c.amount;
    }
    return acc;
  }, 0);

  const totalExpense = transactions.reduce((acc, c) => {
    if (c.type === TRANSACTION_TYPE.EXPENSE) {
      return acc + c.amount;
    }
    return acc;
  }, 0);

  const balance = totalIncome - totalExpense;

  const getBoxColor = (amount) => {
    if (amount >= 0) {
      return {
        bg: "var(--success-color)",
        fg: "var(--success-color-fg)",
      };
    } else if (amount < 0) {
      return {
        bg: "var(--error-color)",
        fg: "var(--error-color-fg)",
      };
    }
  };

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: { xs: 0, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TitleH3>Dashboard</TitleH3>
          <Grid
            container
            spacing={2}
            sx={{ my: 2, justifyContent: "flex-end" }}
          >
            <Grid>
              <ExportButton
                headers={[
                  "id",
                  "description",
                  "amount",
                  "type",
                  "category",
                  "date",
                ]}
                data={transactions.map((t) => {
                  return {
                    ...t,
                    amount: t.amount.toFixed(2),
                  };
                })}
                filename="transactions_data.csv"
                label="Export Transactions as CSV"
              />
            </Grid>
            <Grid>
              <DownloadProfilerData />
            </Grid>
          </Grid>
        </Box>

        {/* Totals Section */}
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "2px 3px 25px #00000005",
                borderRadius: 2,
                backgroundColor: "var(--info-color)",
                color: "var(--info-color-fg)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                sx={{ textAlign: "center", margin: "auto", fontSize: "2rem" }}
              >
                {totalIncome.toLocaleString()} €
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "2px 3px 25px #00000005",
                borderRadius: 2,
                backgroundColor: "var(--info-color)",
                color: "var(--info-color-fg)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-expenses"
                sx={{ textAlign: "center", margin: "auto", fontSize: "2rem" }}
              >
                -{totalExpense.toLocaleString()} €
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "2px 3px 25px #00000005",
                borderRadius: 2,
                backgroundColor: getBoxColor(balance).bg,
                color: getBoxColor(balance).fg,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography
                variant="h5"
                data-testid="balance"
                sx={{ textAlign: "center", margin: "auto", fontSize: "2rem" }}
              >
                {balance.toLocaleString()} €
              </Typography>
            </Paper>
            {balance < 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Your balance is negative, you have exceeded your budget limit.
              </Alert>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "2px 3px 25px #00000005",
                borderRadius: 2,
              }}
            >
              <Suspense fallback={<CircularProgress />}>
                <AnalysisGraph />
              </Suspense>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "2px 3px 25px #00000005",
                borderRadius: 2,
              }}
            >
              <Suspense fallback={<CircularProgress />}>
                <BalanceOverTime />
              </Suspense>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Suspense fallback={<CircularProgress />}>
              <Statistics />
            </Suspense>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Suspense fallback={<CircularProgress />}>
              <Recommendations />
            </Suspense>
          </Grid>
        </Grid>
        <Suspense fallback={<CircularProgress />}>
          <RecentTransactions />
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
