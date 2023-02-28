import Image from "next/image"
import { AiOutlineEnter, AiOutlineCloseCircle } from "react-icons/ai"
import { RiDeleteBack2Line } from "react-icons/ri"
import logo from "../../public/paynapple-lg.png"
import { useState } from "react"
import PayModal from "../components/ModalComponents/PayModal"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { getStoreFromSlug, updateStoreTotalBalance } from "@/lib/database"

const Terminal = () => {
  const [price, setPrice] = useState<any>(null)
  const [hasPoint, setHasPoint] = useState<boolean>(false)

  const { query } = useRouter()

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

  const { data, isLoading, error } = useQuery([query.s], getStoreFromSlug)

  const deleteLast = () => {
    let newPrice = price?.slice(0, -1)
    setPrice(newPrice)

    if (!price) {
      setHasPoint(false)
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="w-full bg-gray-900 h-screen flex flex-1 items-center justify-center">
      {isOpen && Number(price) > 0 && (
        <PayModal
          address={data?.store.solana_address}
          price={Number(price)}
          closeModal={closeModal}
          slug={data?.store.slug}
          name={data?.store.name}
        />
      )}
      <div className="h-16 w-16 rounded-full absolute top-3 left-3">
        <Image src={logo} fill alt="paynapple logo" />
      </div>
      <div className="text-white w-1/2 h-full flex flex-col">
        <div className=" flex flex-col justify-center flex-grow p-4">
          <div className="my-5 bg-gray-800 rounded-lg p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Paynapple POS</div>
            <div className="flex items-center">
              <div className="text-xl font-bold">${price ? price : "0.00"}</div>
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
