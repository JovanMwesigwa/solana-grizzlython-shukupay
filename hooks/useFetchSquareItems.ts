import { useState } from "react"

const useFetchSquareItems = (squareAccessToken: string) => {
  const [products, setProducts] = useState([])

  const request = async () => {
    try {
      const response = await fetch("api/squareproducts", {
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
    products,
  }
}

export default useFetchSquareItems
