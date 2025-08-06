import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import blue from "@mui/material/colors/blue";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CaixaBankLogo from "../assets/caixabank-icon-blue.png";
import CaixaBankLogoDark from "../assets/caixabank-icon.png";
import { getUser, logout } from "../stores/authStore";
import AlertBanner from "./AlertBanner";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { email } = getUser();
  const pathname = useLocation().pathname;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        className=".appBar"
        position="sticky"
        left={0}
        top={0}
        sx={{
          borderRadius: "0",
          backgroundColor: "var(--background-color)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
              },
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
            <img
              src={isDarkMode ? CaixaBankLogoDark : CaixaBankLogo}
              alt="caixabank logo"
              height="42px"
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { md: "block" },
              fontStyle: "italic",
              color: "var(--title-color)",
            }}
          >
            Personal Finance Assistant
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            {!email && (
              <>
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link className="link" to="/register">
                  Register
                </Link>
              </>
            )}
            {email && (
              <>
                <Link
                  className={`link ${pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Dashboard
                </Link>
                <Link
                  className={`link ${
                    pathname === "/transactions" ? "active" : ""
                  }`}
                  to="/transactions"
                >
                  Transactions
                </Link>
                <Link
                  className={`link ${pathname === "/analysis" ? "active" : ""}`}
                  to="/analysis"
                >
                  Analysis
                </Link>
                <Link
                  className={`link ${pathname === "/settings" ? "active" : ""}`}
                  to="/settings"
                >
                  Settings
                </Link>
                <Link
                  className={`link ${pathname === "/support" ? "active" : ""}`}
                  to="/support"
                >
                  Support
                </Link>
                <Divider orientation="vertical" flexItem />
                <Button variant="outlined" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={() => setNotificationOpen(true)}>
                <Badge color="error" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {notificationOpen && (
                <Box>
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      right: "-10px",
                      width: "300px",

                      boxShadow: "5px 5px 15px #00000015",
                      borderRadius: 2,
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        pt: 2,
                        pb: 1,
                        px: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">Notifications</Typography>
                      <IconButton onClick={() => setNotificationOpen(false)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        px: 2,
                        py: 0,
                      }}
                    >
                      <AlertBanner />
                    </Box>
                  </Paper>
                </Box>
              )}
            </Box>

            {email && (
              <Tooltip title={email} placement="left">
                <Avatar sx={{ bgcolor: blue[500] }}>
                  {email.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        position="fixed"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "80vw",
            borderRadius: "0 25px 25px 0",
            backgroundColor: "#fffffc",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: "0",
            display: "flex",
            flexDirection: "column",
            width: "80vw",
            height: "100%",
          }}
        >
          {/* Drawer navigation links */}
          {/* Instructions:
                        - Display navigation links inside the drawer.
                        - Links should be based on the user's authentication status.
                        - For example, show links like "Dashboard", "Transactions", "Settings" if authenticated.
                        - Use the `Link` component from `react-router-dom`. */}

          {!!email ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  height: "100%",
                }}
              >
                {" "}
                <Link
                  className={`link link-drawer ${
                    pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Dashboard
                </Link>
                <Link
                  className={`link link-drawer ${
                    pathname === "/transactions" ? "active" : ""
                  }`}
                  to="/transactions"
                >
                  Transactions
                </Link>
                <Link
                  className={`link link-drawer ${
                    pathname === "/analysis" ? "active" : ""
                  }`}
                  to="/analysis"
                >
                  Analysis
                </Link>
                <Link
                  className={`link link-drawer ${
                    pathname === "/settings" ? "active" : ""
                  }`}
                  to="/settings"
                >
                  Settings
                </Link>
                <Link
                  className={`link link-drawer ${
                    pathname === "/support" ? "active" : ""
                  }`}
                  to="/support"
                >
                  Support
                </Link>
              </Box>
              <Divider orientation="horizontal" flexItem />
              <Button
                sx={{
                  mt: 2,
                }}
                variant="outlined"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  height: "100%",
                }}
              >
                <Link className="link link-drawer" to="/login">
                  Login
                </Link>
                <Link className="link link-drawer" to="/register">
                  Register
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
