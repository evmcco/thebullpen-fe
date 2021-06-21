import React, { useState, useRef, useCallback } from 'react'
import CardsList from "../containers/CardsList"
import ActivityCard from "./ActivityCard"

import useFetchActivityFeed from '../utils/useFetchActivityFeed'


const ActivityFeed = ({username}) => {
  const [lastActivityId, setLastActivityId] = useState(0)

  const {
    activityFeed,
    hasMore,
    loading,
    error
  } = useFetchActivityFeed(username, lastActivityId)
  const observer = useRef()

  const lastActivityElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        if (node) {
          setLastActivityId(Number(node.id))
        }
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, hasMore])


  const Loader = () => {
    return (
      <div className="loader-wrapper" style={{height: '100px'}}>
        <div className="loader" />
      </div>
    )
  }

  return (
    activityFeed.length > 0 ?
    <CardsList>
      {activityFeed.map((activity, index) => {
        if (activityFeed.length === index + 1) {
          return (
            <div ref={lastActivityElementRef} key={activity.id} id={activity.id}>
              <ActivityCard activity={activity} />
            </div>
          )
        } else {
          return (
            <div key={activity.id}>
              <ActivityCard activity={activity} />
            </div>
          )
        }
      }
      )}
      {loading ? <Loader /> : <div style={{height: '100px'}}></div>}
      {error && 'There was an error during your request. Please refresh the page.'}
    </CardsList>
    :
    <div>
      <p>There is no recent activity in your feed.</p>
    </div>

  )
}

export default ActivityFeed
