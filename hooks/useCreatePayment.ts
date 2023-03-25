import { useState } from "react"

const useCreateSquarePayment = (squareAccessToken: string) => {
  const [payment, setPayment] = useState<any>(null)
  const [paymentError, setPaymentError] = useState<any>(null)

  const request = async (amount: any, buyerEmail: string, payType: string) => {
    try {
      const response = await fetch("api/squarepayment", {
        method: "POST",
        body: JSON.stringify({
          squareAccessToken,
          amount,
          buyerEmail,
          payType,
        }),
      })
      const data = await response.json()
    } catch (error) {
      console.log("Unexpected error occurred: ", error)
    }
    // setPaymentError("Failed to create payment to square!")
  }

  return {
    request,
    payment,
    paymentError,
  }
}

export default useCreateSquarePayment
