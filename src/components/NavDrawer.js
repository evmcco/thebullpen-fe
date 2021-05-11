import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.grey[800],
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  bodyShift: {
    marginLeft: 170,
    width: `calc(100% - ${170}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, .5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

  },
  drawerCustomStyle: {
    backgroundColor: theme.palette.lilac,
    color: theme.palette.grey[900],
    // top: '64px',
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  },
  links: {
    color: theme.palette.grey[900],
    textDecoration: 'none',
  }
}));

export default function MiniDrawer() {
  const { logout } = useAuth0();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerCustomStyle]: true
          }),
        }}
      >
        <div className={classes.toolbar}>
        {open ?
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          :
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRightIcon />
          </IconButton>
          }
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.links}>
            <ListItem button>
              <ListItemIcon style={{color: '#212121'}}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>

          <Link to="/profile" className={classes.links}>
            <ListItem button>
              <ListItemIcon style={{color: '#212121'}}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItem>
          </Link>
        </List>

        <div style={{marginTop: 'auto'}}>
          <Divider />
          <ListItem button onClick={() => logout({ returnTo: window.location.origin })}>
            <ListItemIcon style={{color: '#212121'}}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Log out'} />
          </ListItem>
        </div>
      </Drawer>
    </div>
  );
}
