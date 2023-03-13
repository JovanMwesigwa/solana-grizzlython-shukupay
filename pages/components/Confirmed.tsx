import { useEffect, useState } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { boolean } from "square/dist/schema"

type Props = {
  successFunction?: any
  done?: boolean
  setDone?: any
  setPaid?: any
}

export default function Confirmed({
  successFunction,
  done,
  setDone,
  setPaid,
}: Props) {
  const [percentage, setPercentage] = useState(0)
  const [text, setText] = useState("🍪")

  useEffect(() => {
    setPaid(true)

    const t1 = setTimeout(() => setPercentage(100), 100)
    const t2 = setTimeout(() => setText("✅"), 600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)

      // setDone(true)

      // // if (done) {
      // successFunction()

      // setDone(false)

      // }
    }
  }, [])

  return (
    <CircularProgressbar
      value={percentage}
      text={text}
      styles={buildStyles({
        pathColor: "#00BA00",
      })}
    />
  )
}
