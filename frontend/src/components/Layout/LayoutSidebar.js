import Box from "@mui/material/Box";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SidebarListItem from "./SidebarListItem";
import menuConfig from "../../navigation/menu.config";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {List} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {SIGN_IN} from "../../navigation/constants";


export const SIDEBAR_WIDTH = 160;

const LayoutSidebar = ({onMobileClose, openMobile}) => {
  const location = useLocation();
  const user = useSelector((state => state.auth.user));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {user ? (
          <>
            <AccountCircle/>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {user.username}
            </Typography>
          </>
        ) : (
          <>
            <Button
              component={NavLink}
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                  mr: 1
                }
              }}
              to={SIGN_IN}
            >
              <span>
                Sign In
              </span>
            </Button>
          </>
        )}
      </Box>
      <Divider/>
      <Box sx={{p: 1}}>
        <List>
          {menuConfig && menuConfig.map((item) => (
            <SidebarListItem
              key={item.text}
              to={item.to}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: SIDEBAR_WIDTH
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: SIDEBAR_WIDTH,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

LayoutSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

LayoutSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default LayoutSidebar;