import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NoTransactions = ({ children }) => (
  <Box
    sx={{
      mt: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <SentimentDissatisfiedIcon
      sx={{
        fontSize: "100px",
      }}
    />
    <Typography variant="h6" sx={{ ml: 1 }}>
      {children}
    </Typography>
  </Box>
);

export default NoTransactions;
