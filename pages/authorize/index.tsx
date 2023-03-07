import Image from "next/image"
import { Circles } from "react-loader-spinner"
import { useEffect, useState } from "react"

import squareBg from "../../public/squarepos.jpg"

const Authorize = () => {
  const [baseUrl, setBaseUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    authorizeSquare()
  }, [])

  const authorizeSquare = async () => {
    try {
      setLoading(true)
      const response = await fetch("api/connect")
      const data = await response.json()
      setBaseUrl(data.base_url)
      console.log(data.base_url)
      setLoading(false)
    } catch (error) {
      setError("Could not connect you to square")
      setLoading(false)
    }
  }

  if (loading && !error)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Circles
          height="80"
          width="80"
          //   radius="9"
          color="blue"
          ariaLabel="loading"
        />
      </div>
    )

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="relative flex flex-1 w-full h-full">
        <Image src={squareBg} alt="pos people" fill />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {/* <p className="w-10 text-xs">{baseUrl}</p> */}
        <a
          href={baseUrl}
          className="p-3 px-8 text-lg font-medium text-white bg-blue-500 rounded-full cursor-pointer"
        >
          Connect Square
        </a>
      </div>
    </div>
  )
}

export default Authorize
