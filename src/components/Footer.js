import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import Search from "@mui/icons-material/Search";
import bgImage from "../assets/bgmaps.png";
import bgImageDark from "../assets/bgmaps-dark.png";
import Link from "@mui/material/Link";

const Footer = ({ isDarkMode }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 4,
        backgroundImage: `url(${isDarkMode ? bgImageDark : bgImage})`,
        bgSize: "cover",
        bgPosition: "center",
      }}
    >
      {/* Search bar */}
      <Box maxWidth={500} mx="auto" mt={2} mb={4}>
        <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            sx={{ flex: 1, px: 1 }}
            placeholder="Find your branch..."
          />
          <Button type="submit">Search</Button>
        </Paper>
      </Box>

      <Typography sx={{ textAlign: "center" }}>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 2, gap: "10px" }}
      >
        <Link
          href="https://facebook.com/caixabank"
          target="_blank"
          rel="noreferrer noopener"
          sx={{ color: "var(--link-color)", textDecoration: "none" }}
        >
          <Facebook />
        </Link>
        <Link
          href="https://x.com/caixabank"
          target="_blank"
          rel="noreferrer noopener"
          sx={{ color: "var(--link-color)", textDecoration: "none" }}
        >
          <Twitter />
        </Link>
        <Link
          href="https://instagram.com/caixabank"
          target="_blank"
          rel="noreferrer noopener"
          sx={{ color: "var(--link-color)", textDecoration: "none" }}
        >
          <Instagram />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: "10px",

          "& > *:not(:last-child)": {
            position: "relative",
            "&::after": {
              content: '"|"',
              position: "relative",
              marginLeft: "10px",
            },
          },
        }}
      >
        <Link
          href="/"
          target="_blank"
          rel="noreferrer noopener"
          sx={{
            color: "var(--link-color)",
            textDecorationColor: "currentColor",
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/"
          target="_blank"
          rel="noreferrer noopener"
          sx={{
            color: "var(--link-color)",
            textDecorationColor: "currentColor",
          }}
        >
          Terms of Service
        </Link>
        <Link
          href="/"
          target="_blank"
          rel="noreferrer noopener"
          sx={{
            color: "var(--link-color)",
            textDecorationColor: "currentColor",
          }}
        >
          Cookie Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
