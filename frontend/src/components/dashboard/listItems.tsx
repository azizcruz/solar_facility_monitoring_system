import { SolarPower } from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <SolarPower />
      </ListItemIcon>
      <ListItemText primary="My Facilities" />
    </ListItemButton>
  </>
);
