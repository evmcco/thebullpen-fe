import React, { createContext, useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react";

export const FollowsContext = createContext()

const FollowsContextProvider = props => {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowing, setIsFollowing] = useState(null)
  const [followId, setFollowId] = useState(null)

  const { user, isAuthenticated } = useAuth0();
  let auth0User = isAuthenticated ? user["https://thebullpen.app/username"] : null

  // get followees of logged in user
  const getAuth0Follows = async (userProfile) => {
    const followsRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_follows`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: auth0User })
    })
    const followsData = await followsRes.json()

    let index = followsData.findIndex(follow => {
      return follow.followee_username === userProfile
    })
    setIsFollowing(index >= 0 ? true : false)
    setFollowId(followsData[index]?.follow_id)
  }

  // get followers of current profile
  const getUserFollowers = async (userProfile) => {
    const followersRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_followers`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userProfile })
    })
    const followersData = await followersRes.json()
    setFollowers(followersData)
  }

  // get followees of current profile
  const getUserFollowees = async (userProfile) => {
    const followsRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_follows`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userProfile })
    })
    const followsData = await followsRes.json()
    setFollowing(followsData)
  }


  return (
    <FollowsContext.Provider
      value={{
        getAuth0Follows,
        getUserFollowers,
        getUserFollowees,
        isFollowing,
        setIsFollowing,
        followId,
        setFollowId,
        followers,
        following,
      }}
    >
      {props.children}
    </FollowsContext.Provider>
  )
}

export default FollowsContextProvider
