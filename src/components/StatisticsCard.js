import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const StatisticsCard = ({ title, messages, component }) => (
  <Paper
    sx={{
      padding: 2,
      borderRadius: "8px",
      boxShadow: "2px 3px 25px #00000005",
    }}
  >
    <Typography variant="h6">{title}</Typography>
    {messages.map((message, index) => (
      <Typography component={component ?? "p"} key={index}>
        {message}
      </Typography>
    ))}
  </Paper>
);

export default StatisticsCard;
