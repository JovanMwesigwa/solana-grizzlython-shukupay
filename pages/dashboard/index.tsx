import { BsCalculatorFill } from "react-icons/bs"
import { FcPlus } from "react-icons/fc"
import { IoIosArrowForward } from "react-icons/io"
import { FcFrame } from "react-icons/fc"
import { FcKindle } from "react-icons/fc"
import { HiOutlineLightBulb } from "react-icons/hi"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import { getStore, getStoreBalance, getStoreFromID } from "../../lib/database"
import { useUser } from "@supabase/auth-helpers-react"
import Image from "next/image"
import Link from "next/link"
import sol from "../../public/solana.png"
import usdc from "../../public/usdc.png"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import Router from "next/router"

const Dashboard = () => {
  const user = useUser()

  const { error, loading, store, available } = useSelector(
    (state: RootState) => state.store
  )

  const {
    data,
    isLoading,
    error: storeError,
  } = useQuery([store.id], getStoreFromID)

  return (
    <Layout>
      <div className="flex flex-col w-full py-5">
        {/* top */}

        <div className="flex flex-col w-full p-8 bg-white shadow-sm">
          <div className="flex flex-row flex-1 w-full">
            {/*  */}

            <div className="flex flex-row flex-1">
              <div className="relative w-16 h-16 overflow-hidden bg-yellow-400 rounded-full">
                <Image
                  src={user?.user_metadata?.picture}
                  alt="User image"
                  fill
                />
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-medium">
                  Hi, {user?.user_metadata?.name}
                </h1>
                <p className="text-sm font-light cursor-pointer">
                  shukupay.com/myshop
                </p>
              </div>
            </div>
            {/*  */}

            {!isLoading && !error && (
              <Link href="/terminal" legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center h-10 px-4 text-white bg-black rounded-full"
                >
                  <BsCalculatorFill color="white" />
                  <h1 className="mx-3 text-sm font-medium">Start Terminal</h1>
                </a>
              </Link>
            )}
          </div>

          <div className="w-full h-[0.5px] bg-neutral-200 my-6" />

          {/*  */}
          <div className="flex flex-row flex-1 w-full">
            <div className="flex flex-row w-full mb-4">
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
          <h1 className="text-6xl font-bold ">${data?.total}</h1>
          <div className="flex flex-row items-center w-full mt-5 justify-evenly">
            {/*  */}

            <div className="flex flex-row items-center">
              <div className="w-5 h-5 mr-2 overflow-hidden rounded-sm relative">
                <Image src={sol} alt="solana logo" fill />
              </div>
              <h1>$0 SOL</h1>
            </div>

            <div className="flex flex-row items-center">
              <div className="w-5 h-5 mr-2 overflow-hidden rounded-sm relative">
                <Image src={usdc} alt="solana logo" fill />
              </div>
              <h1>$0 USDC</h1>
            </div>

            {/*  */}
          </div>
        </div>
        {/*  */}

        <div className="flex flex-row items-center my-8">
          <HiOutlineLightBulb size={25} />
          <h1 className="mx-3 text-lg font-medium">More ways to get paid</h1>
        </div>

        {/*  */}
        <div className="flex flex-row items-center justify-between w-full h-64">
          {/*  */}

          <div className="flex flex-col justify-between w-full h-full p-10 bg-white rounded-md shadow-sm cursor-pointer">
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

          <div className="flex flex-col justify-between w-full h-full p-10 mx-4 bg-white rounded-md shadow-sm cursor-pointer">
            <FcKindle size={35} />

            <h4 className="">Run own POS Terminal</h4>

            <p className="text-sm font-extralight text-neutral-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
            </p>
            {/*  */}

            <Link
              className="flex flex-row items-center"
              href="/terminal"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center  "
              >
                <h1 className="mr-1">Start</h1>
                <IoIosArrowForward />
              </a>
            </Link>
          </div>

          <div className="flex flex-col justify-between w-full h-full p-10 bg-white rounded-md shadow-sm cursor-pointer">
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

          {/*  */}
        </div>
      </div>
    </Layout>
  )
}
export default Dashboard
