import { shopAddress, usdcAddress } from "@/lib/addresses"
import calculatePrice from "@/lib/calculatePrice"
import {
  FindReferenceError,
  ValidateTransferError,
  encodeURL,
  findReference,
  validateTransfer,
} from "@solana/pay"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { useEffect, useMemo, useRef, useState } from "react"

const useCreatePayQR = (
  price: any,
  name: String,
  activeToken: any,
  successFunction: any,
  storeAddress: any,
  done: boolean,
  setDone: any
) => {
  // Get a connection to Solana devnet
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)

  // ref to a div where we'll show the QR code
  const qrRef = useRef<HTMLDivElement>(null)

  const amount = useMemo(() => calculatePrice(price), [price])

  const splToken = new PublicKey(usdcAddress)

  // Unique address that we can listen for payments to
  const reference = useMemo(() => Keypair.generate().publicKey, [])

  // Solana Pay transfer params
  const nativeTransfer = {
    recipient: shopAddress,
    amount,
    reference,
    label: `Payment for ${name}`,
    message: "Thanks for your order! 🍪",
  }

  const splTransfer = {
    recipient: shopAddress,
    splToken,
    amount,
    reference,
    label: `Payment for ${name}`,
    message: "Thanks for your order! 🍪",
  }

  // Encode the params into the format shown
  const url = encodeURL(activeToken === "USDC" ? splTransfer : nativeTransfer)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!done) {
          // Check if there is any transaction for the reference
          const signatureInfo = await findReference(connection, reference, {
            finality: "confirmed",
          })
          // Validate that the transaction has the expected recipient, amount and SPL token
          const result = await validateTransfer(
            connection,
            signatureInfo.signature,
            {
              recipient: shopAddress,
              amount,
              splToken: usdcAddress,
              reference,
            },
            { commitment: "confirmed" }
          )

          await successFunction()

          // if (!result.transaction.signatures[0]) {
          //   console.log("DEBUG VALIDATED: ", result.transaction.signatures[0])

          //   setDone(true)
          // } else {
          //   setDone(false)
          // }

          return
        } else {
          return
        }
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          console.error("Transaction is invalid", e)
          return
        }
        console.error("Unknown error", e)
      }
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [amount])

  return {
    connection,
    qrRef,
    amount,
    reference,
    url,
  }
}

export default useCreatePayQR
