import { createQR } from "@solana/pay"
import { useEffect, useState } from "react"
import Image from "next/image"

import logo from "../../../public/paynapple-lg.png"
import Confirmed from "../Confirmed"
import { updateStoreTotalBalance } from "@/lib/database"
import { useMutation } from "react-query"
import useCreatePayQR from "@/hooks/useCreatePayQR"

type Props = {
  closeModal: any
  price: any
  address: String
  slug: String
  activeToken: any
  name: String
  total: any
}

const PayModal = ({
  closeModal,
  name,
  address,
  total,
  activeToken,
  price,
  slug,
}: Props) => {
  const [showQR, setShowQR] = useState(false)
  const [done, setDone] = useState(false)

  const successFunction = () => {
    setDone(true)

    mutation.mutate({
      amount: total,
      slug,
    })
  }

  const { qrRef, url, amount } = useCreatePayQR(
    price,
    name,
    activeToken,
    successFunction,
    "0xShopAddress"
  )

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
    },
    onError(error) {
      console.log(error)
    },
  })

  // console.log("TOTAL: ", total)

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
                      {activeToken === "USDC" ? (
                        <>${amount.toString()} </>
                      ) : (
                        <>{amount.toString()} </>
                      )}
                      <span className="font-extralight">{activeToken}</span>
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
