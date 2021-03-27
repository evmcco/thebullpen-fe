import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { BrowserRouter as Router, Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '0',
    width: '100%'
  },
  headerBar: {
    backgroundColor: '#14213d',
    borderBottom: 'solid 1px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    backgroundColor: '#424242',
    color: '#fafafa',
  },
  title: {
    flexGrow: 1,
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
    <div className={classes.root}>
      <AppBar className={classes.headerBar} position="static">
        <Toolbar>
          <div>
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
          <Typography variant="h6" className={classes.title}>
            Bullpen 🐂 📈
          </Typography>
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
