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
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
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

export default Header;
