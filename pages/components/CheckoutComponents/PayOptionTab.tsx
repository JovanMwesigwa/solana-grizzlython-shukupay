import { IoIosArrowBack } from "react-icons/io"

type Props = {
  token: any
  price: number
  setToken: any
  setActive: any
}

const PayOptionTab = ({ setActive, setToken, token, price }: Props) => {
  return (
    <div className="relative flex flex-col items-center h-full my-5 justify-evenly">
      <div
        onClick={() => setActive("AddOns")}
        className="absolute top-0 cursor-pointer left-5"
      >
        <IoIosArrowBack size={30} />
      </div>

      <div className="flex flex-col ">
        <h1 className="mt-5 text-3xl font-bold">How would you like to pay?</h1>
        <h5 className="text-lg font-light text-neutral-400">
          Total Spend will be: ${price}
        </h5>
      </div>

      <div className="flex flex-row items-center w-1/2 my-6">
        <div
          className={`flex items-center justify-center w-1/2 p-4 mr-3 text-xl font-medium ${
            token === "USDC" && "bg-yellow-400"
          } ${
            token != "USDC" && "border-dotted border=[0.5px]"
          } rounded-md cursor-pointer`}
          onClick={() => setToken("USDC")}
        >
          <h1>USDC</h1>
        </div>

        <div
          className={`flex items-center justify-center w-1/2 p-4 ml-3 text-xl font-medium ${
            token != "SOL" && "border-dotted  border-[0.5px]"
          } rounded-md cursor-pointer ${token === "SOL" && "bg-yellow-400"}`}
          onClick={() => setToken("SOL")}
        >
          <h1>SOL</h1>
        </div>
      </div>

      <button
        type="submit"
        onClick={() => setActive("Scan")}
        className="w-full p-3 mt-6 text-white bg-blue-500 rounded-md"
      >
        Proceed to checkout
      </button>
    </div>
  )
}
export default PayOptionTab
