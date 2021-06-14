import React, {useEffect, useState} from 'react'
import LazyLoad from 'react-lazyload'
import CardsList from "../containers/CardsList"
import ActivityCard from "./ActivityCard"


const ActivityFeed = ({username}) => {
  const [activityFeed, setActivityFeed] = useState([])

  useEffect(() => {
    const getActivityFeed = async () => {
      const activityFeedRes = await fetch(`${process.env.REACT_APP_API_URL}/activityFeed/get_user_activity_feed`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
      const feedData = await activityFeedRes.json()
      console.log(feedData)
      setActivityFeed(feedData)
    }
    getActivityFeed()
  }, [])

  const Loader = () => {
    return (
      <div className="loader-wrapper" style={{height: '100px'}}>
        <div className="loader" />
      </div>
    )
  }

  return (
    activityFeed.length > 0 ?
    <CardsList title="Activity">
      {activityFeed.map((activity, index) => (
        <LazyLoad key={activity.id} placeholder={<Loader />} once>
          <ActivityCard
            key={activity.id}
            activity={activity}
          />

        </LazyLoad>
        )
      )}
    </CardsList>
    :
    <div>
      <p>There is no recent activity in your feed.</p>
    </div>

  )
}

export default ActivityFeed
