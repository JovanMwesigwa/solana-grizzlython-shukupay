import AuthComponent from "@/pages/components/Auth/AuthComponent"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import sol from "../../../public/solana.png"
import usdc from "../../../public/usdc.png"
import Image from "next/image"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { createProduct, getStore } from "@/lib/database"
import { Router, useRouter } from "next/router"

const AddProduct = () => {
  const user = useUser()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<any>(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { data, isLoading, error: storeError } = useQuery([user?.id], getStore)

  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      // Router.push("/dashboard")
      setError("")
      setTitle("")
      setPrice(0)
      setDescription("")
      setSuccess(true)
    },
    onError: (error) => {
      console.log("COMP ERROR:", error)
    },
  })

  const submit = () => {
    if (!title || !price || !description) {
      return setError("Make sure you fill all fields")
    }

    mutation.mutate({
      name: title,
      description,
      price,
      slug: title,
      store: data?.store.id,
    })
  }

  function handleGoBack() {
    router.back()
  }

  if (!user) return <AuthComponent />

  return (
    <div className="flex flex-col flex-1 h-screen p-8 ">
      <div className="flex flex-row items-center justify-between w-full">
        <div
          onClick={handleGoBack}
          className="flex flex-row items-center p-2 px-4 cursor-pointer text-base font-medium rounded-full bg-neutral-200"
        >
          <AiOutlineArrowLeft size={20} />
          <h1 className="ml-3">Dashboard</h1>
        </div>
        {error && (
          <div className="flex absolute top-12 left-1/3 bg-red-200 px-5 border-2 text-red-600 font-medium border-red-400 rounded-md ">
            <p className="text-center">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex absolute top-12 left-1/3 bg-green-200 px-5 border-2 text-green-600 font-medium border-green-400 rounded-md ">
            <p className="text-center">Published!</p>
          </div>
        )}
      </div>

      {mutation.isLoading ? (
        <div className="flex flex-1 items-center">
          <h4>Loading...</h4>
        </div>
      ) : (
        <>
          <div className="flex flex-row flex-1 my-6">
            {/* Editor */}
            <div className="flex flex-col flex-1 pr-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="p-5 text-2xl font-medium outline-none "
                placeholder="Title"
              />

              <div className="w-full bg-neutral-100 my-5 h-[0.5px]"></div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-full p-5 outline-none"
                placeholder="Write something..."
              />
            </div>

            <div className="flex flex-col w-1/3 px-8 ">
              <div className="flex flex-row items-center mb-6">
                <button
                  onClick={submit}
                  type="submit"
                  className="w-full px-6 py-3 font-medium bg-yellow-400 rounded-full "
                >
                  Publish now
                </button>
              </div>
              <div className="flex flex-col w-full h-full p-5 rounded-md bg-neutral-50 ">
                <h3 className="font-medium ">App item price</h3>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="p-2 my-4 bg-white rounded-md outline-none border-[0.5px]"
                  placeholder="$"
                />

                <div className="flex flex-col mt-6 border-t-[0.5px] border-b-[0.5px] py-6">
                  <h1 className="text-sm font-medium">
                    Select currency to recieve payment for
                  </h1>

                  <div className="flex flex-row items-center justify-between w-full pt-5">
                    <div className="w-10 h-10 cursor-pointer relative overflow-hidden">
                      <Image src={sol} alt="solana logo" fill />
                    </div>

                    <div className="w-10 h-10 cursor-pointer relative overflow-hidden">
                      <Image src={usdc} alt="solana logo" fill />
                    </div>

                    <div className="w-10 h-10 bg-green-500 rounded-full cursor-pointer"></div>
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
        </>
      )}
    </div>
  )
}
export default AddProduct
