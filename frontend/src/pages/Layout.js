import React, {useState} from "react";
import {makeStyles} from '@mui/styles';
import {Link, useHistory} from "react-router-dom";
import {SIGN_IN, ROOT, SIGN_UP} from "../navigation/constants";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {CssBaseline} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/auth";
import Grid from "@mui/material/Grid";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "rgba(255,255,255, 1)",
    '&:hover': {
      color: "rgba(255,255,255, 0.9)",
    }
  },
  stretch: {
    flexGrow: 1
  }
}));

export default function Layout({children}) {
  const classes = useStyles();
  const user = useSelector((state => state.auth.user));
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout())
      .then(() => history.push(SIGN_IN));
  }

  // TODO: Extract Appbar to it's own component
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar elevation={0}>
        <Toolbar>
          <Link className={classes.link} to={ROOT}>
            <Typography variant="h6">
              Blog
            </Typography>
          </Link>
          <Link className={classes.link} to={ROOT}>
            <Typography variant="h5">
              Create Post
            </Typography>
          </Link>
          {user ? (
            <Grid container alignItems="center">
              <Grid item flexGrow={1}/>
              <Grid item>
                {user.username}
              </Grid>
              <Grid item>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle/>

                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to={ROOT} onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item flexGrow={1}/>
              <Grid item>
                <Link className={classes.link} to={SIGN_IN}>
                  <Typography variant="h6">
                    Sign In
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.link} to={SIGN_UP}>
                  <Typography variant="h6">
                    Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </main>
    </div>
  );
}