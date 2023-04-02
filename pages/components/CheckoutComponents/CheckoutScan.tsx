import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { IoIosArrowBack, IoMdClose } from "react-icons/io"

type Props = {
  qrRef: any
  price: number
  setActive: any
}
const CheckoutScan = ({ setActive, qrRef, price }: Props) => {
  const { query } = useRouter()

  return (
    <div className="relative flex flex-col justify-between flex-1 h-full">
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
    </div>
  )
}

export default CheckoutScan
