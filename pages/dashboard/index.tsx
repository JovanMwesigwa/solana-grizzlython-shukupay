import { FiShare } from "react-icons/fi"
import { FcPlus } from "react-icons/fc"
import { IoIosArrowForward } from "react-icons/io"
import { FcFrame } from "react-icons/fc"
import { FcKindle } from "react-icons/fc"
import { HiOutlineLightBulb } from "react-icons/hi"
import Layout from "../components/Layout"

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col py-5">
        {/* top */}

        <div className="w-full bg-white shadow-sm flex p-8 flex-col">
          <div className="flex w-full flex-row  flex-1">
            {/*  */}

            <div className="flex flex-1 flex-row">
              <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
              <div className="flex flex-col ml-4">
                <h1 className="font-medium text-xl">Hi, unreal_joova</h1>
                <p className="font-light text-sm cursor-pointer">
                  shukupay.com/myshop
                </p>
              </div>
            </div>
            {/*  */}

            <button className="bg-black rounded-full text-white flex items-center px-4 h-10 flex-row">
              <FiShare />
              <h1 className="mx-3 font-medium text-sm">Share page</h1>
            </button>
          </div>

          <div className="w-full h-[0.5px] bg-neutral-200 my-6" />

          {/*  */}
          <div className="flex w-full flex-row flex-1">
            <div className="flex mb-4 w-full flex-row">
              <h1 className="text-2xl font-semibold">Earnings</h1>
              <select
                id="duration"
                className="px-4 mx-6 border-[0.5px] rounded-full"
                name="duration"
              >
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>

            {/*  */}
          </div>
          <h1 className="text-6xl font-bold ">$0</h1>
          <div className="flex w-full flex-row mt-5 items-center justify-evenly">
            {/*  */}

            <div className="flex flex-row items-center">
              <div className="w-4 h-4 rounded-sm mr-2 bg-purple-700"></div>
              <h1>$0 SOL</h1>
            </div>

            {/*  */}
            <div className="flex flex-row items-center">
              <div className="w-4 h-4 rounded-sm mr-2 bg-green-400"></div>
              <h1>$0 USDT</h1>
            </div>

            {/*  */}
            <div className="flex flex-row items-center">
              <div className="w-4 h-4 rounded-sm mr-2 bg-blue-500"></div>
              <h1>$0 USDC</h1>
            </div>
          </div>
        </div>
        {/*  */}

        <div className="flex flex-row items-center my-8">
          <HiOutlineLightBulb size={25} />
          <h1 className="text-lg mx-3 font-medium">More ways to get paid</h1>
        </div>

        {/*  */}
        <div className="flex w-full flex-row items-center justify-between h-64">
          {/*  */}

          <div className="h-full bg-white p-10 flex flex-col cursor-pointer justify-between w-full rounded-md shadow-sm">
            <FcFrame size={35} />

            <h4 className="">Connect Square POS</h4>

            <p className="text-sm font-extralight text-neutral-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
            </p>
            {/*  */}

            <div className="flex flex-row items-center ">
              <h1 className="mr-1">Set up</h1>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="h-full bg-white p-10 flex flex-col mx-4 cursor-pointer justify-between w-full rounded-md shadow-sm">
            <FcPlus size={35} />

            <h4 className="">Connect to Other POS</h4>

            <p className="text-sm font-extralight text-neutral-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
            </p>
            {/*  */}

            <div className="flex flex-row items-center ">
              <h1 className="mr-1">Set up</h1>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="h-full bg-white p-10 flex flex-col justify-between cursor-pointer w-full rounded-md shadow-sm">
            <FcKindle size={35} />

            <h4 className="">Run own POS Terminal</h4>

            <p className="text-sm font-extralight text-neutral-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
            </p>
            {/*  */}

            <div className="flex flex-row items-center ">
              <h1 className="mr-1">Set up</h1>
              <IoIosArrowForward />
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </Layout>
  )
}
export default Dashboard
