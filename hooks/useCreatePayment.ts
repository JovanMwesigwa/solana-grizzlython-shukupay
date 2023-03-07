import { useState } from "react"
import { Client, Environment, ApiError } from "square"
import { v4 } from "uuid"

const useCreateSquarePayment = (squareAccessToken: string) => {
  const [payment, setPayment] = useState<any>(null)
  const [ paymentError, setPaymentError ] = useState<any>(null)

  const client = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
  })

  const request = async (
    amount: any,
    buyerEmail: string,
    payType: string
  ) => {
    try {
      const response = await client.paymentsApi.createPayment({
        sourceId: "EXTERNAL",
        idempotencyKey: v4(),
        amountMoney: {
          amount: amount,
          currency: "USD",
        },
        autocomplete: false,
        buyerEmailAddress: buyerEmail,
        externalDetails: {
          type: "EXTERNAL",
          source: payType,
        },
      })

      console.log("DEBUG AND TEST HERE ---------------------------",response.result)
      setPayment(response.result)
    } catch (error) {
      if (error instanceof ApiError) {
        error.result.errors.forEach(function (e: any) {
          console.log(e.category)
          console.log(e.code)
          console.log(e.detail)
        })
      } else {
        console.log("Unexpected error occurred: ", error)
      }
    }
    setPaymentError("Failed to create payment to square!")
  }

  return {
    request,
    payment,
    paymentError
  }
}

export default useCreateSquarePayment
