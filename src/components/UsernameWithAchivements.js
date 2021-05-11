import React, { useEffect, useState } from "react";

export default function UsernameWithAchivements(props) {
  const achievements = {
    "slimjc": [
      {
        image: "🥇",
        title: "2021 Kenstonky Derby 1st Place"
      }
    ],
    "1984": [
      {
        image: "🥈",
        title: "2021 Kenstonky Derby 2nd Place"
      }
    ],
    "beatthevig": [
      {
        image: "🥉",
        title: "2021 Kenstonky Derby 3rd Place"
      }
    ],
    "wwlyle": [
      {
        image: "💩",
        title: "2021 Kenstonky Derby Last Place"
      }
    ]
  }

  const [image, setImage] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    try {
      setImage(achievements[props.username][0].image)
      setTooltip(achievements[props.username][0].title)
    } catch {
      return
    }
  }, [])


  return (
    <>
      <span title={tooltip}>{image} </span>
      <span>{props.username}</span>
    </>
  )
}


