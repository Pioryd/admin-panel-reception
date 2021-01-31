import React from "react";
import { Link } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Home as HomeIcon,
  Event as EventIcon,
  Business as BusinessCenterIcon,
  People as PeopleIcon
} from "@material-ui/icons";

const items = [
  { text: "Home", link: "/home", Icon: HomeIcon },
  { text: "Appointments", link: "/appointments", Icon: EventIcon },
  { text: "Companies", link: "/companies", Icon: BusinessCenterIcon },
  { text: "Customers", link: "/customers", Icon: PeopleIcon }
];

export default function Items() {
  return (
    <List>
      {items.map(({ text, link, Icon }) => (
        <ListItem button key={text} component={Link} to={link}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
}
