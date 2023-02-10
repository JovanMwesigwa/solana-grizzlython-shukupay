import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"

const AddProduct = () => {
  return (
    <div className="flex flex-col flex-1 h-screen p-8 ">
      <div className="flex flex-row items-center justify-between w-full">
        <Link
          href="/dashboard"
          className="flex flex-row items-center p-2 px-4 text-base font-medium rounded-full bg-neutral-200"
        >
          <AiOutlineArrowLeft size={20} />
          <h1 className="ml-3">Dashboard</h1>
        </Link>
      </div>

      <div className="flex flex-row flex-1 my-6">
        {/* Editor */}
        <div className="flex flex-col flex-1 pr-6">
          <input
            type="text"
            className="p-5 text-2xl font-medium outline-none "
            placeholder="Title"
          />

          <div className="w-full bg-neutral-100 my-5 h-[0.5px]"></div>

          <textarea
            className="h-full p-5 outline-none"
            placeholder="Write something..."
          />
        </div>

        <div className="flex flex-col w-1/3 px-8 ">
          <div className="flex flex-row items-center mb-6">
            <button
              type="submit"
              className="w-full px-6 py-3 font-medium bg-yellow-400 rounded-full "
            >
              Publish now
            </button>
          </div>
          <div className="flex flex-col w-full h-full p-5 rounded-md bg-neutral-50 ">
            <h3 className="font-medium ">App item price</h3>
            <input
              type="number"
              className="p-2 my-4 bg-white rounded-md outline-none border-[0.5px]"
              placeholder="$"
            />

            <div className="flex flex-col mt-6 border-t-[0.5px] border-b-[0.5px] py-6">
              <h1 className="text-sm font-medium">
                Select currency to recieve payment for
              </h1>

              <div className="flex flex-row items-center justify-between w-full pt-5">
                <div className="w-10 h-10 bg-purple-700 rounded-full cursor-pointer"></div>
                <div className="w-10 h-10 bg-green-500 rounded-full cursor-pointer"></div>
                <div className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer"></div>
              </div>
            </div>

            <div className="w-full flex flex-row items-center border-b-[0.5px] py-6">
              <input type="checkbox" className="p-2 cursor-pointer" />
              <h4 className="ml-3 text-sm font-medium">
                Allow user to enter address and contact info?
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddProduct
