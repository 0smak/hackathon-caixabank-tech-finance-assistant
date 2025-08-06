import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { useNotification } from "../Context/NotificationContext";
import { expenseCategories } from "../constants/categories";
import { transactionsStore } from "../stores/transactionStore";
import { userSettingsStore } from "../stores/userSettingsStore";
import { filterByExpenses, sumTransactions } from "../lib/transactionsUtils";
import TitleH3 from "./TitleH3";

function Settings() {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);
  const { showNotification } = useNotification();

  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(
    userSettings.alertsEnabled
  );
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(
    userSettings.totalBudgetLimit
  );
  const [categoryLimits, setCategoryLimits] = useState({
    ...userSettings.categoryLimits,
  });

  const expensesSumatory = sumTransactions(filterByExpenses(transactions));

  const handleSave = (e) => {
    e.preventDefault();
    const totalCategoryLimit = Object.values(categoryLimits).reduce(
      (acc, limit) => acc + Number(limit ?? 0),
      0
    );

    if (totalCategoryLimit > Number(totalBudgetLimit)) {
      const errMsg =
        "Total category limits exceed the total budget limit. Please update the total budget limit.";
      showNotification(errMsg);
      setError(errMsg);
      setSuccessMessage("");
      return;
    }

    setError("");
    setSuccessMessage("Settings saved successfully.");

    const updatedSettings = {
      ...userSettings,
      totalBudgetLimit: Number(totalBudgetLimit),
      categoryLimits: categoryLimits,
      budgetExceeded: expensesSumatory > Number(totalBudgetLimit),
    };
    setBudgetExceeded(userSettings.budgetExceeded);

    if (userSettings.budgetExceeded) {
      showNotification("You have exceeded your budget limit!");
    }

    userSettingsStore.set(updatedSettings);
  };

  const handleCategoryLimitsChange = (e) => {
    const { name, value } = e.target;
    setCategoryLimits((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      sx={{ mt: 1, p: { xs: 0, md: 4 }, bgcolor: "background.default" }}
    >
      <Box sx={{ mb: 4 }}>
        <TitleH3>Settings</TitleH3>
      </Box>

      <FormControlLabel
        control={<Switch color="primary" />}
        label="Enable Alerts"
        checked={alertsEnabled}
        role="switch"
        name="alertsEnabled"
        aria-checked={alertsEnabled}
        onChange={(e) => setAlertsEnabled(e.target.checked)}
      />

      <Paper
        sx={{
          padding: 2,
          mt: 2,
          boxShadow: "5px 5px 15px #00000015",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Total Budget Limit (€)
        </Typography>

        <TextField
          label="Total Budget Limit (€)"
          name="totalBudgetLimit"
          value={totalBudgetLimit}
          onChange={(e) => setTotalBudgetLimit(e.target.value)}
          type="number"
          fullWidth={true}
          margin="normal"
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.01",
            },
          }}
        />
      </Paper>

      <Paper
        sx={{
          padding: 2,
          mt: 2,
          boxShadow: "5px 5px 15px #00000015",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Category Budget Limits (€)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1, width: "100%" }}>
          {expenseCategories.map((category) => (
            <Grid xs={12} sm={6} md={4} key={category.name}>
              <TextField
                label={category.emoji + " " + category.name + " (€)"}
                type="number"
                value={categoryLimits[category.name]}
                onChange={handleCategoryLimitsChange}
                fullWidth
                margin="normal"
                InputProps={{
                  inputProps: {
                    min: 0,
                    step: "0.01",
                  },
                }}
                name={category.name}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ boxShadow: 2 }}
          type="submit"
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {budgetExceeded && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You have exceeded your budget limit of {totalBudgetLimit} €!
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Settings;
