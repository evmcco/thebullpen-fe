import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import SettingsIcon from '@material-ui/icons/Settings';

import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  navRoot: {
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
  linksList: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  links: {
    color: theme.palette.lilac,
    textDecoration: 'none',
  },
  listItem: {
    '&:hover': {backgroundColor: 'rgb(217 183 226 / 10%)'},
  },
  chevronButton: {
    color: theme.palette.lilac,
  },
  icons: {
    color: theme.palette.lilac,
  },
  divider: {
    backgroundColor: theme.palette.lilac,
  }
}));

export default function MiniDrawer() {
  const { logout, user } = useAuth0();

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
        {open ?
          <IconButton onClick={handleDrawerClose} className={classes.chevronButton}>
            <ChevronLeftIcon />
          </IconButton>
          :
          <IconButton onClick={handleDrawerOpen} className={classes.chevronButton}>
            <ChevronRightIcon />
          </IconButton>
          }
        </div>
        <Divider className={classes.divider}/>
        <List className={classes.linksList}>
          <Link to="/" className={classes.links} onClick={handleDrawerClose}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.icons}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>

          <Link to={`/p/${user["https://thebullpen.app/username"]}`} className={classes.links} onClick={handleDrawerClose}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.icons}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItem>
          </Link>

        </List>

        <div style={{marginTop: 'auto'}}>
          <Link to={`/profile`} className={classes.links} onClick={handleDrawerClose}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.icons}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItem>
          </Link>
          <Divider className={classes.divider}/>
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
