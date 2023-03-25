import Image from "next/image"
import QR from "../../public/qr.png"
import rolex from "../../public/rolex.jpg"
import sol from "../../public/solana.png"
import usdc from "../../public/usdc.png"
import useCreatePayQR from "@/hooks/useCreatePayQR"
import { useEffect, useState } from "react"
import { createQR } from "@solana/pay"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import {
  getPictureUrl,
  getProduct,
  getStore,
  getStoreFromID,
  getStoreFromSlug,
} from "@/lib/database"

const Checkout = () => {
  const [activeToken, setActiveToken] = useState("USDC")

  const { query } = useRouter()
  const {
    data: product,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery([query.p], getProduct)

  const successFunction = () => {}

  const { data, isLoading, error } = useQuery([product?.image], getPictureUrl)

  const { qrRef, url, amount } = useCreatePayQR(
    product?.price,
    product?.name,
    activeToken,
    successFunction,
    // store.solana_address
    "0xAddress"
  )

  // Show the QR code
  useEffect(() => {
    const qr = createQR(url, 512)
    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.className = "w-12 h-12"
      qrRef.current.innerHTML = ""
      qr.append(qrRef.current)
    }
  })

  // console.log("DEBUG HER: ", store.solana_address)

  if (!product && !productsLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-12">
        <h1 className="text-xl font-medium">Product pay-link was not found.</h1>
        <h2 className="text-sm font-light">
          Probably consult the merchant for details
        </h2>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center h-screen px-20 bg-neutral-100">
      <div className="flex flex-col justify-between flex-1 h-full p-10 bg-white shadow-md">
        <h1 className="text-xl font-bold">{product?.name}</h1>
        <div className="relative w-1/2 my-6 overflow-hidden rounded-md h-1/2 bg-neutral-50">
          {!isLoading && !error && (
            <Image
              src={data ? data : rolex}
              // src={rolex}
              alt="product image"
              fill
            />
          )}
          <div ref={qrRef} />
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Total: ${product?.price}</h1>
          <p className="mt-6 mb-2 text-base">You will pay</p>
          <div className="w-1/2 border-[0.5px] h-14  rounded-md flex flex-row items-center justify-between">
            <h1 className="mx-4 text-xl ">{product?.price}</h1>

            {activeToken === "USDC" ? (
              <div className="w-32 h-full cursor-pointer justify-center border-l-[0.5px] flex flex-row items-center ">
                <div
                  onClick={() => setActiveToken("SOL")}
                  className="relative w-10 h-10 mr-3 overflow-hidden"
                >
                  <Image src={usdc} alt="usdc logo" fill />
                </div>
                <h1 className="text-xl">{activeToken}</h1>
              </div>
            ) : (
              <div
                onClick={() => setActiveToken("USDC")}
                className="w-32 h-full cursor-pointer justify-center border-l-[0.5px] flex flex-row items-center "
              >
                <div className="relative w-10 h-10 mr-3 overflow-hidden">
                  <Image src={sol} alt="solana logo" fill />
                </div>
                <h1 className="text-xl">{activeToken}</h1>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="p-3 mt-6 text-white bg-blue-500 rounded-md"
        >
          Proceed to payment
        </button>
      </div>

      {/* <div ref={qrRef} className="flex flex-1 w-44 h-44" /> */}
      <div className="flex flex-col justify-between w-1/3 h-full p-8">
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-md bg-neutral-500 h-2/3"></div>
        <div className="flex flex-col">
          <h4 className="text-sm">
            Add your email and you will get notified you when the seller
            receives your payment
          </h4>
          <div className="flex flex-row items-center w-full my-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-2 rounded-md border-[0.5px] outline-none"
            />
            <button
              type="submit"
              className="p-2 px-3 ml-3 text-sm font-medium bg-yellow-400 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
