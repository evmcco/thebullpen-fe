import React, { useEffect, useState } from "react";

export default function UsernameWithAchivements(props) {
  console.log(props.username)
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
    console.log('calling UE')
    try {
      setImage(achievements[props.username] ? achievements[props.username][0].image : null)
      setTooltip(achievements[props.username] ? achievements[props.username][0].title : null)
    } catch {
      return
    }
  }, [props.username])


  return (
    <>
      <span>{props.username}</span>
      <span title={tooltip}> {image}</span>
    </>
  )
}


