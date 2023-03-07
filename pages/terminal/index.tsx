import Image from "next/image"
import { AiOutlineEnter, AiOutlineCloseCircle } from "react-icons/ai"
import { RiDeleteBack2Line } from "react-icons/ri"
import logo from "../../public/paynapple-lg.png"
import { useState } from "react"
import PayModal from "../components/ModalComponents/PayModal"
import { useMutation, useQuery } from "react-query"
import { getSquareCreds, getStore } from "@/lib/database"
import { useUser } from "@supabase/auth-helpers-react"
import usdc from "../../public/usdc.png"
import sol from "../../public/solana.png"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"

const Terminal = () => {
  const [price, setPrice] = useState<any>(null)
  const [hasPoint, setHasPoint] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<any>(null)
  const [activeToken, setActiveToken] = useState("USDC")

  const user = useUser()

  // const { store, loading } = useSelector((state: RootState) => state.store)

  const {
    data: store,
    isLoading: storeLoading,
    error: storeError,
  } = useQuery([user?.id], getStore)

  const updatePrice = (num: string) => {
    let newPrice

    if (num.includes(".")) {
      setHasPoint(true)
    }

    if (price === "0.00" || price === "0.0" || !price) {
      newPrice = num
    } else {
      newPrice = price + num
    }

    setPrice(newPrice)
  }

  const { data, isLoading, error } = useQuery([user?.id], getStore)

  const deleteLast = () => {
    let newPrice = price?.slice(0, -1)
    setPrice(newPrice)

    if (!price) {
      setHasPoint(false)
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    const overallPrice = totalPrice + Number(price)
    setTotalPrice(overallPrice)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { data: square } = useQuery([store?.store.id], getSquareCreds)

  // console.log("DEBUG: ", square)

  return (
    <div className="w-full bg-gray-900 h-screen flex flex-1 items-center justify-center">
      {isOpen && !isLoading && !error && Number(price) > 0 && (
        <PayModal
          address={data?.store.solana_address}
          price={Number(price)}
          square={square}
          store={store?.store}
          total={totalPrice}
          closeModal={closeModal}
          slug={data?.store.slug}
          name={data?.store.name}
          activeToken={activeToken}
        />
      )}
      <div className="h-16 w-16 rounded-full absolute top-3 left-3">
        <Image src={logo} fill alt="paynapple logo" />
      </div>
      <div className="text-white w-1/2 h-full flex flex-col">
        <div className=" flex flex-col justify-center flex-grow p-4">
          <div className="flex w-full flex-row items-center">
            {activeToken != "USDC" ? (
              <button
                onClick={() => setActiveToken("USDC")}
                className={`w-8 h-9  mr-9 px-5 relative `}
              >
                <Image src={sol} alt="solana logo" fill />
              </button>
            ) : (
              <button
                onClick={() => setActiveToken("SOL")}
                className={`w-8 h-9 px-5 mr-9 relative `}
              >
                <Image src={usdc} alt="usdc logo" fill />
              </button>
            )}
            <span className="text-lg text-gray-500 font-medium">
              {activeToken}
            </span>
          </div>

          <div className="my-5 bg-gray-800 rounded-lg p-4 flex justify-between items-center">
            <div className="text-lg font-light text-gray-600">
              Paynapple POS
            </div>
            <div className="flex items-center">
              <div className="text-xl font-bold">
                {activeToken === "USDC" && <span>$</span>}

                {price ? price : "0.00"}

                {activeToken === "SOL" && <span> SOL</span>}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 ">
            <button
              onClick={() => updatePrice("1")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              1
            </button>
            <button
              onClick={() => updatePrice("2")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              2
            </button>
            <button
              onClick={() => updatePrice("3")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              3
            </button>
            <button
              onClick={() => updatePrice("4")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              4
            </button>
            <button
              onClick={() => updatePrice("5")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              5
            </button>
            <button
              onClick={() => updatePrice("6")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              6
            </button>
            <button
              onClick={() => updatePrice("7")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              7
            </button>
            <button
              onClick={() => updatePrice("8")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              8
            </button>
            <button
              onClick={() => updatePrice("9")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              9
            </button>
            <button
              onClick={() => updatePrice("00")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              00
            </button>
            <button
              onClick={() => updatePrice("0")}
              className="bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              0
            </button>
            <button
              onClick={() => updatePrice(".")}
              disabled={hasPoint}
              className={`bg-gray-700 text-white rounded-lg p-4 text-2xl font-bold ${
                !hasPoint && "hover:bg-gray-600"
              }`}
            >
              .
            </button>
            <button
              onClick={() => {
                setPrice("0.00")
                setHasPoint(false)
              }}
              className="bg-pink-400 text-white flex items-center justify-center rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              <AiOutlineCloseCircle size={30} />
            </button>
            <button
              onClick={deleteLast}
              className="bg-yellow-400 text-white flex items-center justify-center rounded-lg p-4 text-2xl font-bold hover:bg-gray-600"
            >
              <RiDeleteBack2Line size={30} />
            </button>
            <button
              disabled={Number(price) <= 0 && !isLoading && !error}
              onClick={openModal}
              className={`bg-green-400 flex items-center justify-center text-white rounded-lg p-4 text-2xl font-bold ${
                Number(price) > 0 && !isLoading && !error && "hover:bg-gray-600"
              }`}
            >
              <AiOutlineEnter size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terminal
