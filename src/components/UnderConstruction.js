import React from "react";

import Link from '@material-ui/core/Link';
import Logo from "../assets/bullpenLogoLilac.png"

import { makeStyles } from '@material-ui/core/styles';

const UnderConstruction = () => {
  const useStyles = makeStyles((theme) => ({
    body: {
      margin: "0 5%",
      textAlign: "center"
    },
    logo: {
      margin: "30px 0px",
      maxWidth: 400,
      width: "80%"
    },
    link: {
      color: theme.palette.lilac
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <h1>Welcome to</h1>
      <img className={classes.logo} src={Logo} />
      <h2>If you're already a member, log in to continue to the app.</h2>
      <h2>If not, visit <Link className={classes.link} href="https://join.bullpen.fi">join.bullpen.fi</Link> to get hype and join the beta list!</h2>
    </div>
  )
}

export default UnderConstruction