import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  navRoot: {
    display: 'flex',
    position: 'fixed',
    zIndex: 9999,
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
    [theme.breakpoints.down('xs')]: {
      width: '150px',
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    [theme.breakpoints.down('xs')]: {
      width: '150px',
    },
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: 0,
  },
  drawerClose: {
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    left: -170,
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
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.lilac,
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgb(217 183 226 / 40%), 0px 4px 5px 0px rgb(217 183 226 / 40%), 0px 1px 10px 0px rgb(217 183 226 / 30%)',
    overflow: 'hidden'
  },
  links: {
    color: theme.palette.lilac,
    textDecoration: 'none',
  },
  listItem: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '8px',
    },
  },
  menuIconButton: {
    zIndex: theme.zIndex.drawer + 2,
    color: theme.palette.lilac,
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
  menuButtonOpen: {
    left: 110,
    position: 'absolute',

    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonClosed: {
    left: 5,
    position: 'absolute',

    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  icons: {
    color: theme.palette.lilac,
  },
  divider: {
    backgroundColor: theme.palette.lilac,
  }
}));

export default function MiniDrawer() {
  const { logout } = useAuth0();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.navRoot, 'nav-root')}>
      <div className={classes.toolbar}>
          {!open ?
          <div className={clsx({
            [classes.menuButtonOpen]: open,
            [classes.menuButtonClosed]: !open,
          })}>
            <IconButton onClick={handleDrawerOpen}
              className={classes.menuIconButton}
            >
              <MenuIcon />
            </IconButton>
            </div>
            :
            <div className={clsx({
              [classes.menuButtonOpen]: open,
              [classes.menuButtonClosed]: !open,
            })}>
            <IconButton onClick={handleDrawerClose}
              className={classes.menuIconButton}
            >
            <MenuOpenIcon />
          </IconButton>
          </div>
          }
        </div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerCustomStyle, 'nav-drawer', {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
        </div>

        <Divider className={classes.divider}/>
        <List>
          <Link to="/" className={classes.links} onClick={handleDrawerClose}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.icons}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>

          <Link to="/profile" className={classes.links} onClick={handleDrawerClose}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.icons}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItem>
          </Link>
        </List>

        <div style={{marginTop: 'auto'}}>
          <Divider className={classes.divider} />
          <ListItem button className={classes.listItem} onClick={() => logout({ returnTo: window.location.origin })}>
            <ListItemIcon className={classes.icons}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Log out'} />
          </ListItem>
        </div>
      </Drawer>
    </div>
  );
}
