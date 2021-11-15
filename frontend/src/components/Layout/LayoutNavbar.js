import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from '@mui/icons-material/Input';
import Typography from "@mui/material/Typography";
import {logout} from "../../redux/actions/auth";
import {ROOT, SIGN_IN} from "../../navigation/constants";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";

const LayoutNavbar = ({onMobileNavOpen, ...rest}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logout())
      .then(() => {
        history.push(SIGN_IN);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Box component={Link} to={ROOT} sx={{
          color: "inherit",
          textDecoration: "none",
          // "&hover":
        }}>
          <Typography variant="h2">
            Blog
          </Typography>
        </Box>
        <Box sx={{flexGrow: 1}}/>
        <Hidden mdDown>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon/>
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

LayoutNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default LayoutNavbar;