import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function SidebarListItem({to, icon, text, ...rest}) {
  const active = false;

  return (
    <ListItem
      disableRipple
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
      {...rest}
    >
      <Button
        component={NavLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
        to={to}
      >
        {icon && icon}
        <span>
          {text}
        </span>
      </Button>
    </ListItem>
  );
}

SidebarListItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element
}

export default SidebarListItem;