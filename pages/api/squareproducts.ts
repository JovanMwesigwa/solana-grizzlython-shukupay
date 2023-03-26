import type { NextApiRequest, NextApiResponse } from "next"
import { Client, Environment, ApiError } from "square"
import JSONBig from "json-bigint"

type Data = {
  response: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body

  const { squareAccessToken } = JSON.parse(data)

  const client = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
  })
  try {
    const response = await client.catalogApi.listCatalog(undefined, "ITEM")

    // console.log(response.result)

    res.json({
      response: JSONBig.parse(JSONBig.stringify(response.result)),
    })
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
    res.status(500).json({
      response: "Failed to fetch items",
    })
  }
}
