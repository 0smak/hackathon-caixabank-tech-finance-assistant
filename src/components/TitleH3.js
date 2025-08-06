import Typography from "@mui/material/Typography";

const TitleH3 = ({ children }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        color: "var(--title-color)",
        fontSize: "42px",
        fontWeight: "bold",
        marginBottom: "0",
      }}
    >
      {children}
    </Typography>
  );
};

export default TitleH3;
