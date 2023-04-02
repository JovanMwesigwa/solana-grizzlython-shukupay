import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { IoIosArrowBack, IoMdClose } from "react-icons/io"
import Confirmed from "../Confirmed"
import { updateStoreTotalBalance } from "@/lib/database"
import { useMutation } from "react-query"

type Props = {
  qrRef: any
  price: number
  done: boolean
  setPaid: any
  setActive: any
}
const CheckoutScan = ({ done, setPaid, setActive, qrRef, price }: Props) => {
  const { query } = useRouter()

  return (
    <div className="relative flex flex-col items-center justify-between flex-1 h-full">
      {done ? (
        <div className="relative flex items-center justify-center flex-1 w-1/2 h-1/2">
          <Link
            href={`/store?s=${query.s}`}
            onClick={() => setActive("Product")}
            className="absolute top-0 cursor-pointer right-5"
          >
            <IoMdClose size={30} />
          </Link>

          <Confirmed setPaid={setPaid} />
        </div>
      ) : (
        <>
          <Link
            href={`/store?s=${query.s}`}
            onClick={() => setActive("Product")}
            className="absolute top-0 cursor-pointer right-5"
          >
            <IoMdClose size={30} />
          </Link>

          <div className="flex flex-col mb-5 ">
            <h1 className="text-3xl font-bold ">Your total is: ${price}</h1>
            <h5 className="text-lg font-light text-neutral-400">
              Scan with your wallet to pay
            </h5>
          </div>

          <div className="flex w-full h-full rounded-md">
            <div ref={qrRef} />
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutScan
