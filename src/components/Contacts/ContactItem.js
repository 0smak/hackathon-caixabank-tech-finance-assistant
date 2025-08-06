import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { memo } from "react";

const ContactItem = ({ user }) => (
  <ListItem key={user.id} sx={{ p: { xs: 0, sm: 2 } }}>
    <ListItemAvatar>
      <Avatar src={user.avatarUrl} />
    </ListItemAvatar>
    <ListItemText
      primary={user.name}
      secondary={`${user.email} | ${user.phone} | ${user.company.name}`}
    />
    <IconButton
      variant="contained"
      href={`mailto:${user.email}`}
      sx={{ mt: 2 }}
    >
      <MailOutlineIcon />
    </IconButton>
  </ListItem>
);

export default memo(ContactItem);
