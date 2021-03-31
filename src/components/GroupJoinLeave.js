import React, { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const GroupJoinLeave = (props) => {
  const [memberOf, setMemberOf] = useState(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const getMemberOf = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/memberof/${props.username}/${props.groupId}`)
      const data = await response.json()
      setMemberOf(data.exists)
    }
    getMemberOf()
  }, [])

  const joinGroup = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/join`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: props.username, groupId: props.groupId })
    })
    setClicked(true)
  }

  const leaveGroup = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/leave`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: props.username, groupId: props.groupId })
    })
    setClicked(true)
  }

  const useStyles = makeStyles({
    button: {
      backgroundColor: '#14213d',
      color: '#fafafa',
      height: 36,
      width: 100
    }
  });

  const classes = useStyles();


  return (
    <Button
      onClick={memberOf ? () => leaveGroup() : () => joinGroup()}
      disabled={clicked}
      className={classes.button}
      variant="contained">
      {memberOf == true ? "Leave" : memberOf == false ? "Join" : "..."}
    </Button >
  )

};

export default GroupJoinLeave;