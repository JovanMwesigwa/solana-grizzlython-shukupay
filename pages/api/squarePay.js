import { Client, Environment, ApiError } from "square"
import { v4: uuidv4 } from "uuid"

require("dotenv").config()

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
})

const { locationsApi, customersApi } = client

async function getMerchantToken() {
  try {
    const { merchant } = await (
      await client.merchantsApi.listMerchants()
    ).result
    console.log(merchant)
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category)
        console.log(e.code)
        console.log(e.detail)
      })
    } else {
      console.log("Unexpected error occurred: ", error)
    }
  }
}

const createPayment = async () => {
  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: "EXTERNAL",
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount: 15,
        currency: "USD",
      },
      autocomplete: false,
      buyerEmailAddress: "jovanmwesigwa4@gmail.com",
      externalDetails: {
        type: "EXTERNAL",
        source: "Solana Pay",
      },
    })

    console.log(response.result)
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category)
        console.log(e.code)
        console.log(e.detail)
      })
    } else {
      console.log("Unexpected error occurred: ", error)
    }
  }
}

// createPayment()

// EAAAEH1PQbAf6fel7lHDpf9PnjB3xH7ytTKr4SxSvVoryMqrfnTvSXU30hXogQq3 -- Default
// EAAAEHF-lVrqQXmU2YRVdKNG-KmUpb1OGK39uWpYejNW_vcT8qxRwyTtBkWXU9Yv -- RolexGuy
