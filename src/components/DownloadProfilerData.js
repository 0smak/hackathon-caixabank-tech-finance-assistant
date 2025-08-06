import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { profilerData } from "../utils/profilerData";

function DownloadProfilerData() {
  // Handle download functionality
  const handleDownload = () => {
    if (profilerData.length === 0) {
      alert("No profiler data available to download.");
      return;
    }

    const jsonData = JSON.stringify(profilerData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "profiler_data.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
    >
      Download Profiler Data
    </Button>
  );
}

export default DownloadProfilerData;
