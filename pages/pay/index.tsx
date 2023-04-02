import Image from "next/image"
import QR from "../../public/qr.png"
import rolex from "../../public/rolex.jpg"
import sol from "../../public/solana.png"
import usdc from "../../public/usdc.png"
import useCreatePayQR from "@/hooks/useCreatePayQR"
import { useEffect, useState } from "react"
import { createQR } from "@solana/pay"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import {
  getPictureUrl,
  getProduct,
  getStore,
  getStoreFromID,
  getStoreFromSlug,
  updateStoreTotalBalance,
} from "@/lib/database"
import ProductTab from "../components/CheckoutComponents/ProductTab"
import QuantityTab from "../components/CheckoutComponents/QuantityTab"
import PayOptionTab from "../components/CheckoutComponents/PayOptionTab"
import CheckoutScan from "../components/CheckoutComponents/CheckoutScan"

const Checkout = () => {
  const [activeToken, setActiveToken] = useState("USDC")
  const [active, setActive] = useState("Product")
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState(5)

  const [done, setDone] = useState(false)
  const [token, setToken] = useState("USDC")
  const [storeAddress, setStoreAddress] = useState("0xAddressStore")
  const [storeBalance, setStoreBalance] = useState("")
  const [paid, setPaid] = useState(false)

  const { query } = useRouter()
  const {
    data: product,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery([query.p], getProduct)

  const mutation = useMutation(updateStoreTotalBalance, {
    onSuccess: async () => {
      console.log("SUCCESS")
      // await request(price, "user@gmail.com", "Paynapple: Item checkout order...")
      setPaid(false)
    },
    onError(error) {
      console.log(error)
      // setDone(false)
      setPaid(false)
    },
  })

  const successFunction = () => {
    //
    setDone(true)

    if (!paid && !done) {
      mutation.mutate({
        amount: price,
        slug: query.s,
        total: Number(storeBalance),
      })
      // updateStoreState()
    }
  }

  const { data, isLoading, error } = useQuery([product?.image], getPictureUrl)

  const { qrRef, url, amount } = useCreatePayQR(
    // product?.price,
    price,
    product?.name,
    activeToken,
    successFunction,
    storeAddress,
    done,
    setDone
  )

  // Show the QR code
  useEffect(() => {
    if (!done) {
      const qr = createQR(url, 512)
      if (qrRef.current && amount.isGreaterThan(0)) {
        qrRef.current.className = "w-12 h-12"
        qrRef.current.innerHTML = ""
        qr.append(qrRef.current)
      }
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

  const renderUI = () => {
    switch (active) {
      case "Product":
        return (
          <ProductTab
            activeToken={activeToken}
            data={data}
            error={error}
            isLoading={isLoading}
            product={product}
            rolex={rolex}
            setActiveToken={setActiveToken}
            sol={sol}
            usdc={usdc}
            setActive={setActive}
            storeName={query.s}
          />
        )

      case "AddOns":
        return (
          <QuantityTab
            product={product}
            qty={qty}
            setActive={setActive}
            setQty={setQty}
            price={price}
            setPrice={setPrice}
          />
        )
      case "PayOption":
        return (
          <PayOptionTab
            setActive={setActive}
            setToken={setToken}
            token={token}
            price={price}
            storeId={product?.store}
            // setStoreSlug={setStoreSlug}
            setStoreBalance={setStoreBalance}
            setStoreAddress={setStoreAddress}
          />
        )
      case "Scan":
        return (
          <CheckoutScan
            done={done}
            setPaid={setPaid}
            setActive={setActive}
            price={price}
            qrRef={qrRef}
          />
        )
      default:
        return <div className="">Failed</div>
    }
  }

  return (
    <div className="flex flex-row items-center h-screen px-20 bg-neutral-100">
      <div className="flex flex-col justify-between flex-1 h-full p-10 bg-white shadow-md">
        <div className="h-full">{renderUI()}</div>

        <a href="http://google.com" target="_blank" rel="noopener noreferrer">
          <h5 className="font-light text-center text-neutral-300">
            Powered by Paynapple
          </h5>
        </a>
      </div>

      {/* <div ref={qrRef} className="flex flex-1 w-44 h-44" /> */}
      <div className="flex flex-col justify-between w-1/3 h-full p-8">
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-md bg-neutral-200 h-3/6"></div>
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
