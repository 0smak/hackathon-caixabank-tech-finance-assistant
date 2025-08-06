import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";

const Pagination = ({ count, page, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleJumpToPage = (event) => {
    const newPage = Number(event.target.value) - 1;
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 2,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
        startIcon={<KeyboardArrowLeft />}
      >
        Previous
      </Button>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          {`Page ${page + 1} of ${totalPages}`}
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{ min: 1, max: totalPages }}
          sx={{ width: "100px", mx: 1, display: { xs: "none", sm: "flex" } }}
          onChange={handleJumpToPage}
          placeholder="Go to"
        />
      </Box>

      <Button
        variant="outlined"
        onClick={() =>
          onPageChange((prev) => Math.min(prev + 1, totalPages - 1))
        }
        disabled={page >= totalPages - 1}
        endIcon={<KeyboardArrowRight />}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
