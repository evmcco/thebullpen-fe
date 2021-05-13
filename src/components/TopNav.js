import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

import logo from "../assets/bullpenLogoLilac.png"

import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './LoginButton'

import TopNavLinkBanner from './TopNavLinkBanner'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '0',
    width: '100%'
  },
  headerBar: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.lilac,
    boxShadow: 'none'
  },
  toolBar: {
    minHeight: '56px'
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
    position: 'absolute',
    top: 13,
    left: 0,
    right: 0,
  },
  logo: {
    height: '30px',
  },
  // logoLink: {
  //   marginLeft: '57px',
  //   [theme.breakpoints.down('xs')]: {
  //     marginLeft: '40px',
  //   },
  // },
  logoLinkNoLeftMargin: {
    marginLeft: 0
  },
  authButtonContainer: {
    marginLeft: 'auto',
  }
}));

export default function TopNav() {
  const classes = useStyles();

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <div className={classes.root}>
        <AppBar className={classes.headerBar} position="static">
          <Toolbar className={classes.toolBar}>
            <Box justifyContent="center" className={classes.logoContainer}>
              <Link to="/" className={isAuthenticated ? classes.logoLink : classes.logoLinkNoLeftMargin}>
                <img className={ classes.logo } src={logo} />
              </Link>
            </Box>
            <div className={classes.authButtonContainer}>
              {!isAuthenticated && <LoginButton />}
            </div>
          </Toolbar>
        </AppBar>
        {isAuthenticated && <TopNavLinkBanner />}
      </div >
    </div >
  );
}
