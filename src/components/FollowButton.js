import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const FollowButton = ({auth0Following, username, auth0User, isFollowing, setIsFollowing}) => {
  // const [isFollowing, setIsFollowing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [followId, setFollowId] = useState(null)

  useEffect(() => {
    setIsFollowing(false)
    auth0Following.forEach(follow => {
      if (follow.followee_username === username) {
        setIsFollowing(true)
        setFollowId(follow.follow_id)
      }
    })
  }, [username, auth0Following, isFollowing])


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
      setIsFollowing(true)
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
        followId: followId,
      })
    })
    .then(() => {
      setIsFollowing(false)
      setFollowId(null)
    })
    .catch(err => console.log(err.message))
  }



  const useStyles = makeStyles((theme) => ({
    button: {
      color: theme.palette.lilac,
      height: 30,
      width: 75,
      fontSize: 12
    }
  }))
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFollowing ? isHovered ? 'unfollow' : 'following' : 'follow'}
    </Button>
  )
}

export default FollowButton
