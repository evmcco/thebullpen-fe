import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import logo from "../assets/bullpenLogoNavy.png"

import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

import TopNavLinkBanner from './TopNavLinkBanner'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '0',
    width: '100%'
  },
  headerBar: {
    backgroundColor: theme.palette.lilac,
    color: theme.palette.grey[900]
  },
  menuButton: {
    flexGrow: 1
  },
  menu: {
    backgroundColor: '#424242',
    color: '#fafafa',
  },
  logoContainer: {
    flexGrow: 5,
    display: 'flex',
    height: '30px',
  },
  logo: {
    height: '30px'
  },
}));

export default function TopNav() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <div className={classes.root}>
        <AppBar className={classes.headerBar} position="static">
          <Toolbar>
            <div className={classes.menuContainer}>
              <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/">
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                </Link>
                {isAuthenticated && <Link to="/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>}
              </Menu>
            </div>
            <Box justifyContent="center" className={classes.logoContainer}>
              <Link to="/">
                <img className={classes.logo} src={logo} />
              </Link>
            </Box>
            <div className={classes.authButtonContainer}>
              {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
            </div>
          </Toolbar>
        </AppBar>
        {isAuthenticated && <TopNavLinkBanner />}
      </div >
    </div >
  );
}
