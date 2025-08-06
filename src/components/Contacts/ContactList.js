import { List, ListItem, ListItemText } from "@mui/material";
import ContactItem from "./ContactItem";
import { memo } from "react";

const ContactList = ({ contacts }) => {
  return (
    <List>
      {contacts.map((user) => (
        <ContactItem key={user.id} user={user} />
      ))}
      {!contacts.length && (
        <ListItem>
          <ListItemText
            primary="No contacts found"
            secondary="Try a different search term"
          />
        </ListItem>
      )}
    </List>
  );
};

export default memo(ContactList);
