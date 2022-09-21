import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { List, Divider, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import x7bannerLogo from '../assets/images/x7banner.png'

const drawerWidth = 240;

export default function ResponsiveDrawer({ mobileOpen, setMobileOpen }: any) {

  interface RDListItemProps {
    path: string,
    text: string,
    itemKey: string,
    icon: string
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img alt="X7 banner logo" src={x7bannerLogo} width={"100%"}></img>
      </Toolbar>
      <Divider />

      <List>
        <RDListItem text={"Dashboard"} path={"/"} itemKey={"home"} icon={"dashboard"} />
        <RDListItem text={"Trade"} path={"/trade"} itemKey={"trade"} icon={"candlestick_chart"} />
        <RDListItem text={"Ecosystem"} path={"/ecosystem"} itemKey={"ecosystem"} icon={"hub"} />
        <RDListItem text={"Community"} path={"/community"} itemKey={"community"} icon={"forum"} />
        <RDListItem text={"Resources V1"} path={"/v1"} itemKey={"resources-v1"} icon={"inventory"} />
        {/* <RDListItem text={"Resources V2"} path={"/v2"} itemKey={"resources-v2"} icon={"local_shipping"} /> */}
      </List>
    </div>
  );


  function RDListItem({ path, text, itemKey, icon }: RDListItemProps) {
    return (
      <ListItem key={itemKey} disablePadding>
        <Link to={path} onClick={() => { if (mobileOpen) handleDrawerToggle() }} style={{ color: "inherit", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <Icon>
                {icon}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </Link>
      </ListItem>)
  }

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
