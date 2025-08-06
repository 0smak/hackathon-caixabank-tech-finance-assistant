import Button from "@mui/material/Button";
import { showProfilerData } from "../utils/showProfilerData";

const DebugProfilerButton = () => (
  <Button
    onClick={showProfilerData}
    variant="contained"
    color="primary"
    sx={{
      m: "2rem auto",
      display: "block",
    }}
  >
    Log Profiler Data
  </Button>
);

export default DebugProfilerButton;
