import {
  createQR,
  encodeURL,
  TransferRequestURLFields,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import { useEffect, useMemo, useRef, useState } from "react"
import { Keypair } from "@solana/web3.js"
import { useRouter } from "next/router"
import { shopAddress, usdcAddress } from "../../../lib/addresses"
import calculatePrice from "../../../lib/calculatePrice"
import Image from "next/image"

import logo from "../../../public/paynapple-lg.png"
import Confirmed from "../Confirmed"
import { updateStoreTotalBalance } from "@/lib/database"
import { useMutation } from "react-query"

type Props = {
  closeModal: any
  price: any
  address: String
  slug: String
  name: String
}

const PayModal = ({ closeModal, name, address, price, slug }: Props) => {
  const [showQR, setShowQR] = useState(false)
  const [done, setDone] = useState(false)

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
  const urlParams: TransferRequestURLFields = {
    recipient: shopAddress,
    splToken,
    amount,
    reference,
    label: `Payment for ${name}`,
    message: "Thanks for your order! 🍪",
  }

  // Encode the params into the format shown
  const url = encodeURL(urlParams)

  // Show the QR code
  useEffect(() => {
    const qr = createQR(url, 512)
    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = ""
      qr.append(qrRef.current)
    }
  })

  const mutation = useMutation(updateStoreTotalBalance, {
    onSuccess: () => {
      console.log("SUCCESS")
      // setDone(false)
    },
    onError(error, variables, context) {
      console.log(error)
      // setDone(false)
    },
  })

  /* Add a new useEffect to detect payment */
  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        })
        // Validate that the transaction has the expected recipient, amount and SPL token
        await validateTransfer(
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

        setDone(true)

        mutation.mutate({
          amount,
          slug,
        })

        return
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center h-screen px-4 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-40"></div>
        </div>

        {/* Modal content */}
        <div
          className={`inline-block align-bottom text-white ${
            !showQR && "h-4/5"
          } ${done && "p-12"} ${
            !done && "bg-gray-900"
          } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {done ? (
            <Confirmed />
          ) : (
            <>
              {showQR ? (
                <div className="flex items-center ">
                  <div ref={qrRef} />
                </div>
              ) : (
                <div className="flex flex-col h-full justify-between p-5 w-full items-center ">
                  {/*  */}
                  <div className="flex flex-row items-center">
                    <div className="w-12 h-12 relative rounded-full">
                      <Image src={logo} alt="paynapple logo" fill />
                    </div>
                    <h1>Order total</h1>
                  </div>

                  <div className="flex  flex-col items-center justify-center">
                    <h1 className="text-2xl font-medium mb-3">Pay</h1>
                    <h1 className="text-4xl my-4 font-semibold text-purple-300">
                      ${amount.toString()}{" "}
                      <span className="font-extralight">SOL</span>
                    </h1>

                    <h3 className="text-lg my-3">To Address</h3>

                    <p className="cursor-pointer text-sm text-gray-300">
                      {address}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-full px-12 ">
                    <button
                      onClick={() => setShowQR(true)}
                      className="bg-yellow-400 p-3 w-full text-black font-semibold rounded-md"
                    >
                      Open QR
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full p-3  mt-5 text-red-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PayModal
