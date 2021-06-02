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
      setImage(achievements[props.username] ? achievements[props.username][0].image : null)
      setTooltip(achievements[props.username] ? achievements[props.username][0].title : null)
    } catch {
      return
    }
  }, [props.username])


  return (
    <div style={{position:'relative'}}>
      <span>{props.username}</span>
      <span title={tooltip} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}> {image}</span>
    </div>
  )
}


