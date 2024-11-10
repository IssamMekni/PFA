import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HashLink } from 'react-router-hash-link';
import { Link , useLocation} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const Headerlinding = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", link: "/#hero-section" },
    { text: "Features", link: "/#features-section" },
    { text: "About Us", link: "/#about-us-section" },
    { text: "Contact", link: "/#contact-section" },
  ];

  const drawerList = () => (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          button
          component={"a"}
          href={item.link}
          key={index}
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar color="#fff">
        <Typography style={{color:"white"}} variant="h6" sx={{ flexGrow: 1 }}>
          Medical Lab
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
          </>
        ) : (
          menuItems.map((item, index) => (
            <Button
              style={{color:"white"}}
              component={HashLink}
              smooth
              to={item.link}
              key={index}
            >
              {item.text}
            </Button>
          ))
        )}
        <Button  sx={{color:"white" , marginLeft:{xs:3 , md:22}}} smooth component={Link} to="/login">
          Login
        </Button>
        <Button sx={{color:"white"}} component={Link} to="/signup">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};
const Headertest = () => {
  const location = useLocation(); // Get the current route's pathname

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Medical Website
        </Typography>

        {/* Conditionally render based on the current route */}
        {location.pathname === '/' && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </>
        )}

        {location.pathname === '/login' && (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}

        {location.pathname === '/signup' && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}

        {/* Default case if the route does not match any above */}
        {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};



const Header= ()=>{
  const location = useLocation(); // Get the current route's pathname

  return (<>
  { ['/', '/login' ,'/signup'].includes(location.pathname)||1?(
      <Headerlinding/>
        ):""}
  </>
  );
}

export default Header;
