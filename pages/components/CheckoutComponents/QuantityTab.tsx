import { BsFillKeyboardFill } from "react-icons/bs"
import { HiMinus } from "react-icons/hi"
import { IoIosArrowBack, IoMdAdd } from "react-icons/io"

type Props = {
  setActive: any
  product: any
  setQty: any
  qty: number
  price: number
  setPrice: any
}

const QuantityTab = ({
  setQty,
  price,
  setPrice,
  qty,
  product,
  setActive,
}: Props) => {
  return (
    <>
      <div className="relative flex flex-col flex-1 h-full p-10">
        <div
          onClick={() => setActive("Product")}
          className="absolute top-0 cursor-pointer left-5"
        >
          <IoIosArrowBack size={30} />
        </div>
        <h1 className="mt-5 text-3xl font-bold">
          How many <span className="text-yellow-400">{product.name} </span>
          do you want?
        </h1>

        <div className="flex flex-col items-center justify-center w-full h-full p-2 ">
          <div className="flex flex-row items-center justify-between w-1/2 p-4 my-3 ">
            <button
              onClick={() => setQty((prev: number) => (prev += 1))}
              className="p-4 bg-yellow-400 rounded-md"
            >
              <IoMdAdd size={45} />
            </button>
            <h1 className="text-4xl">{qty}</h1>
            <button
              onClick={() => setQty((prev: number) => Math.max((prev -= 1), 1))}
              className="p-4 bg-yellow-400 rounded-md "
            >
              <HiMinus size={45} />
            </button>
          </div>

          <BsFillKeyboardFill size={35} />
        </div>
        <button
          type="submit"
          onClick={() => {
            setActive("PayOption")
            setPrice(Number(qty * product?.price))
          }}
          className="w-full p-3 mt-6 text-white bg-blue-500 rounded-md"
        >
          Proceed to checkout
        </button>
      </div>
    </>
  )
}

export default QuantityTab
