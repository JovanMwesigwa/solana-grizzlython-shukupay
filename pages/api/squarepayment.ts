import type { NextApiRequest, NextApiResponse } from "next"
import { Client, Environment, ApiError } from "square"
import { v4 } from "uuid"

type ResponseData = {
  response: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // console.log("SQUARE CREDS: ", squareAccessToken)

  const data = req.body

  const { squareAccessToken, amount, buyerEmail, payType } = JSON.parse(data)

  const client = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
  })

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

    res.status(200).json({ response: "Square payment created!" })
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
    res.status(200).json({ response: "Failed square payment!" })
  }
}

//   const res =  {
//     request,
//     payment,
//     paymentError,
//   }
