import { useState } from "react"
import { Client, Environment, ApiError } from "square"
import { v4 } from "uuid"

const usePaySquare = async (squareAccessToken: string) => {
  const client = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
  })

  const request = async (amount: any) => {
    try {
      const response = await client.paymentsApi.createPayment({
        sourceId: "EXTERNAL",
        idempotencyKey: v4(),
        amountMoney: {
          amount: amount,
          currency: "USD",
        },
        acceptPartialAuthorization: false,
        externalDetails: {
          type: "OTHER",
          source: "Terminal Payments",
        },
      })

      console.log(response.result)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    request
  }
}

export default usePaySquare