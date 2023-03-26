import { useState } from "react"

const useFetchSquareMenu = (squareAccessToken: string) => {
  const [menuItems, setMenuItems] = useState([])

  const request = async () => {
    try {
      const response = await fetch("api/squaremenu", {
        method: "POST",
        body: JSON.stringify({
          squareAccessToken,
        }),
      })
      const data = await response.json()
      return data
      //   setMenuItems(data.response)
    } catch (error) {
      console.log("Unexpected error occurred: ", error)
    }
    // setPaymentError("Failed to create payment to square!")
  }

  return {
    request,
    menuItems,
  }
}

export default useFetchSquareMenu
