import { createQR } from "@solana/pay"
import { useEffect, useState } from "react"
import Image from "next/image"

import logo from "../../../public/paynapple-lg.png"
import Confirmed from "../Confirmed"
import { updateStoreTotalBalance } from "@/lib/database"
import { useMutation } from "react-query"
import useCreatePayQR from "@/hooks/useCreatePayQR"
import useCreateSquarePayment from "@/hooks/useCreatePayment"

type Props = {
  closeModal: any
  price: any
  address: String
  slug: String
  activeToken: any
  name: String
  total: any
  store: any
  square: any
}

const PayModal = ({
  closeModal,
  name,
  square,
  address,
  total,
  store,
  activeToken,
  price,
  slug,
}: Props) => {
  const [showQR, setShowQR] = useState(false)
  const [done, setDone] = useState(false)
  const [paid, setPaid] = useState(false)

  const { request, payment, paymentError } = useCreateSquarePayment(
    square?.access_token
  )

  const successFunction = () => {
    //
    setDone(true)

    if (!paid && !done) {
      mutation.mutate({
        amount: price,
        slug,
        total: Number(total),
      })
    }
  }

  const { qrRef, url, amount } = useCreatePayQR(
    price,
    name,
    activeToken,
    successFunction,
    store.solana_address,
    done,
    setDone
  )

  // Show the QR code
  useEffect(() => {
    if (!done) {
      const qr = createQR(url, 512)
      if (qrRef.current && amount.isGreaterThan(0)) {
        qrRef.current.innerHTML = ""
        qr.append(qrRef.current)
      }
    }
  })

  const mutation = useMutation(updateStoreTotalBalance, {
    onSuccess: async () => {
      console.log("SUCCESS")
      await request(price, "user@gmail.com", "SOL Terminal Payment")
      // setDone(false)
      setPaid(false)
    },
    onError(error) {
      console.log(error)
      // setDone(false)
      setPaid(false)
    },
  })

  // console.log("TOTAL: ", square)

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
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
            <Confirmed setPaid={setPaid} />
          ) : (
            <>
              {showQR ? (
                <div className="flex items-center ">
                  <div ref={qrRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-between w-full h-full p-5 ">
                  {/*  */}
                  <div className="flex flex-row items-center">
                    <div className="relative w-12 h-12 rounded-full">
                      <Image src={logo} alt="paynapple logo" fill />
                    </div>
                    <h1>Order total</h1>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h1 className="mb-3 text-2xl font-medium">Pay</h1>
                    <h1 className="my-4 text-4xl font-semibold text-purple-300">
                      {activeToken === "USDC" ? (
                        <>${amount.toString()} </>
                      ) : (
                        <>{amount.toString()} </>
                      )}
                      <span className="font-extralight">{activeToken}</span>
                    </h1>

                    <h3 className="my-3 text-lg">To Address</h3>

                    <p className="text-sm text-gray-300 cursor-pointer">
                      {address}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-full px-12 ">
                    <button
                      onClick={() => setShowQR(true)}
                      className="w-full p-3 font-semibold text-black bg-yellow-400 rounded-md"
                    >
                      Open QR
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full p-3 mt-5 text-red-400"
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
