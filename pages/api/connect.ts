
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { Environment, Client } from 'square'
import md5 from 'md5'
import { writeTokensOnSuccess, displayError, displayStateError } from './messages'



const {NEXT_PUBLIC_SQ_ENVIRONMENT, NEXT_PUBLIC_SQ_APPLICATION_ID, NEXT_PUBLIC_SQ_APPLICATION_SECRET } = process.env

let basePath: any;
let environment: any;
let content: any;


if (NEXT_PUBLIC_SQ_ENVIRONMENT?.toLowerCase() === 'production') {
  basePath = `https://connect.squareup.com`
  environment = Environment.Production

} else if (NEXT_PUBLIC_SQ_ENVIRONMENT?.toLowerCase() === 'sandbox') {
  basePath = `https://connect.squareupsandbox.com`
  environment = Environment.Sandbox

} else {
  console.warn('Unsupported value for SQ_ENVIRONMENT in .env file.')
  process.exit(1)
}

// Check if example secrets were set
if (!NEXT_PUBLIC_SQ_APPLICATION_ID || !NEXT_PUBLIC_SQ_APPLICATION_SECRET) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'Missing secrets! Configure set values for SQ_APPLICATION_ID and SQ_APPLICATION_SECRET in a .env file.'
  )
  process.exit(1)
}

// Configure Square defcault client
const squareClient = new Client({
  environment: environment,
  userAgentDetail: 'sample_app_oauth_node', // Remove or replace this detail when building your own app
})

// Configure Square OAuth API instance
const oauthInstance = squareClient.oAuthApi

// INCLUDE PERMISSIONS YOU WANT YOUR SELLER TO GRANT YOUR APPLICATION
const scopes = [
  'ITEMS_READ',
  'MERCHANT_PROFILE_READ',
  'PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS',
  'PAYMENTS_WRITE',
  'PAYMENTS_READ',
]



type Data = {
  base_url: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Set the Auth_State cookie with a random md5 string to protect against cross-site request forgery.
  // Auth_State will expire in 300 seconds (5 mins) after the page is loaded.
  var state = md5(Date.now().toString())
  var url =
    basePath +
    `/oauth2/authorize?client_id=${NEXT_PUBLIC_SQ_APPLICATION_ID}&` +
    `response_type=code&` +
    `scope=${scopes.join('+')}` +
    `&state=` +
    state
  res.status(200).json({ base_url: url })
}

