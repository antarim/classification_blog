import {styled} from "@mui/material";
import {useState} from "react";
import LayoutNavbar from "./LayoutNavbar";
import LayoutSidebar, {SIDEBAR_WIDTH} from "./LayoutSidebar";

const LayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const LayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('md')]: {
      paddingLeft: SIDEBAR_WIDTH
    }
  })
);

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const LayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const Layout = ({component: Component, ...rest}) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <LayoutRoot>
      <LayoutNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <LayoutSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Component {...rest}/>
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
};

export default Layout;