import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Home as HomeIcon,
  Event as EventIcon,
  Business as BusinessCenterIcon,
  People as PeopleIcon
} from "@material-ui/icons";

const items = [
  { text: "Home", link: "", Icon: HomeIcon },
  { text: "Appointments", link: "", Icon: EventIcon },
  { text: "Companies", link: "", Icon: BusinessCenterIcon },
  { text: "Customers", link: "", Icon: PeopleIcon }
];

export function Items() {
  return (
    <List>
      {items.map(({ text, Icon }) => (
        <ListItem button key={text}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
}
