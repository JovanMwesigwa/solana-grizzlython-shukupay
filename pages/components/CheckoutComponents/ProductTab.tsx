import Image from "next/image"
import Link from "next/link"
import { IoMdClose } from "react-icons/io"

type Props = {
  product: any
  setActive: any
  activeToken: String
  storeName: any
  data: any
  isLoading: boolean
  rolex: any
  error: any
  setActiveToken: any
  usdc: any
  sol: any
}

const ProductTab = ({
  activeToken,
  data,
  setActive,
  isLoading,
  error,
  product,
  rolex,
  usdc,
  setActiveToken,
  sol,
  storeName,
}: Props) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-bold">{product?.name}</h1>

        <Link
          href={`/store?s=${storeName}`}
          onClick={() => setActive("Product")}
          className=""
        >
          <IoMdClose size={30} />
        </Link>
      </div>

      <div className="relative w-1/2 my-6 overflow-hidden rounded-md h-1/2 bg-neutral-50">
        {!isLoading && !error && (
          <Image
            src={data ? data : rolex}
            // src={rolex}
            alt="product image"
            fill
          />
        )}
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

        <button
          type="submit"
          onClick={() => setActive("AddOns")}
          className="p-3 mt-6 text-white bg-blue-500 rounded-md"
        >
          Proceed to checkout
        </button>
      </div>
    </>
  )
}

export default ProductTab
