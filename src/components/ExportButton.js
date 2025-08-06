import { memo, useCallback } from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const ExportButton = memo(function ExportButton({
  data,
  headers,
  filename = "data.csv",
  label = "Export CSV",
}) {
  const convertArrayOfObjectsToCSV = (data, headers) => {
    if (!data || data.length === 0) return "";
    const headerRow = headers.join(",") + "\n";

    const rows = data
      .map((item) => {
        return headers
          .map((header) => {
            return item[header.toLowerCase()] !== undefined
              ? item[header.toLowerCase()]
              : "";
          })
          .join(",");
      })
      .join("\n");
    return headerRow + rows;
  };

  const handleExport = useCallback(() => {
    const csv = convertArrayOfObjectsToCSV(data, headers);
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filename, data, headers]);

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      disabled={!data || data.length === 0}
    >
      {label}
    </Button>
  );
});
export default ExportButton;
