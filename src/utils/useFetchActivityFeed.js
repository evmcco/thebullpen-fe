import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchActivityFeed(username, lastActivityId) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activityFeed, setActivityFeed] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/activityFeed/get_user_activity_feed`,
      params: { username, lastActivityId },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      console.log(res.data)
      setActivityFeed(prevActivity => {
        // build ids set to doublecheck for duplicates
        let ids = new Set(prevActivity.map(a => a.id))
        return [...prevActivity, ...res.data.filter(a => !ids.has(a.id))]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(err => {
      if (axios.isCancel(err)) return
      console.log(err)
      setError(true)
    })
    return () => cancel()


  }, [lastActivityId])

  return { loading, error, activityFeed, hasMore }
}
