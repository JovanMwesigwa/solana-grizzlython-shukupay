import { FiShare } from "react-icons/fi"
import PageProductCard from "./components/PageProductCard"

const Store = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between w-full h-16 px-12 shadow-sm">
        <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-center border-[0.5px] p-2 px-4 rounded-full">
            <h1 className="font-medium">Contact</h1>
          </div>

          <div className="flex items-center mx-4 justify-center border-[0.5px] p-2 px-4 rounded-full">
            <h1 className="font-medium">Visit</h1>
          </div>

          <div className="flex items-center justify-center border-[0.5px] p-2 px-4 rounded-full">
            <FiShare size={22} />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-60 bg-neutral-300">
        <div className="absolute flex border-4 border-white rounded-full justify-self-auto w-44 h-44 bg-neutral-300 top-32"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-6 h-44">
        <h1 className="text-3xl font-bold">Oreal Thompson Payton</h1>
        <h3 className="w-1/2 text-lg text-center overflow-clip ">
          Entebbe Rd, Opposite UMEME Sub-Station
        </h3>
      </div>

      <div className="flex flex-col border-t-[0.5px] items-center py-6">
        <h4 className="text-sm font-medium text-neutral-500">
          FEATURED PRODUCTS
        </h4>

        <div className="flex flex-row flex-1 w-full max-w-screen-lg my-5 ">
          <div className="flex flex-row flex-wrap flex-1 justify-evenly ">
            <PageProductCard route="/pay/rolex-guy/123" />
            <PageProductCard route="pay/rolex-guy/123" />
            <PageProductCard route="pay/rolex-guy/123" />
            <PageProductCard route="pay/rolex-guy/123" />
          </div>
          <div className="flex w-1/3 p-8 flex-col border-[0.5px] rounded-md h-1/2 ">
            <h1 className="text-lg font-bold">
              <strong>Tip</strong>{" "}
              <span className="text-neutral-500">
                RolexGuy Entebbe Foods a{" "}
              </span>
              crypto-nyte 😉
            </h1>

            <div className="flex flex-row items-center border-[0.5px] rounded-md justify-between p-4 my-6 bg-neutral-50 full">
              <div className="w-10 h-10 bg-purple-700 rounded-full cursor-pointer"></div>
              <div className="w-10 h-10 bg-green-500 rounded-full cursor-pointer"></div>
              <div className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer"></div>
            </div>

            <textarea
              placeholder="Write them something.... (Optional)"
              className="p-4 mb-4 bg-neutral-50 rounded-md border-[0.5px] h-full outline-none"
            />

            <button
              className="py-3 mt-4 font-medium bg-yellow-400 rounded-full"
              type="submit"
            >
              Send $5 Tip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Store
