import React, { useState, useContext } from 'react'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { FollowsContext } from "../contexts/FollowsContext"


const FollowButton = ({username, auth0User}) => {
  const [isHovered, setIsHovered] = useState(false)
  const followsContext = useContext(FollowsContext)


  const handleFollowClick = () => {
    fetch(`${process.env.REACT_APP_API_URL}/follows/add_follow`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        followerUsername: auth0User,
        followeeUsername: username
      })
    })
    .then(() => {
      followsContext.setIsFollowing(true)
    })
    .catch(err => console.log(err.message))
  }
  const handleUnfollowClick = () => {
    fetch(`${process.env.REACT_APP_API_URL}/follows/remove_follow`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        followId: followsContext.followId,
      })
    })
    .then(() => {
      followsContext.setIsFollowing(false)
      followsContext.setFollowId(null)
    })
    .catch(err => console.log(err.message))
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.lilac,
      height: 30,
      width: 90,
      fontSize: 12
    }
  }))
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={followsContext.isFollowing ? handleUnfollowClick : handleFollowClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {followsContext.isFollowing ? isHovered ? 'unfollow' : 'following' : 'follow'}
    </Button>
  )
}

export default FollowButton
