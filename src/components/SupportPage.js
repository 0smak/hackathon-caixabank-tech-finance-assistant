import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Profiler, Suspense, useMemo, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { onRenderCallback } from "../utils/onRenderCallback";
import ContactList from "./Contacts/ContactList";
import DebugProfilerButton from "./DebugProfilerBtn";
import TitleH3 from "./TitleH3";

function SupportPage() {
  const { users, loading, error } = useFetchUser();
  const normalizedUsers = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        normalizedName: user.name.toLowerCase().replace(/\s/g, ""),
      })),
    [users]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = useMemo(() => {
    if (searchTerm.length) {
      const searchTermNormalized = searchTerm.toLowerCase().replace(/\s/g, "");
      return normalizedUsers.filter((user) =>
        user.normalizedName.includes(searchTermNormalized)
      );
    }
    return normalizedUsers;
  }, [searchTerm, normalizedUsers]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Cannot load support contacts
        </Typography>
        <Alert severity="error">
          <Typography variant="body1" color="inherit">
            An error occurred while loading the support contacts.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 1, p: { xs: 0, md: 4 }, bgcolor: "background.default" }}>
        <Box sx={{ mb: 2 }}>
          <TitleH3>Support Contacts</TitleH3>
        </Box>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2, mb: 4 }}
        />

        <Suspense fallback={<CircularProgress />}>
          <Paper
            sx={{ p: 3, borderRadius: 2, boxShadow: "5px 5px 15px #00000015" }}
          >
            <ContactList contacts={filteredUsers} />
          </Paper>
        </Suspense>
        <DebugProfilerButton />
      </Box>
    </Profiler>
  );
}

export default SupportPage;
