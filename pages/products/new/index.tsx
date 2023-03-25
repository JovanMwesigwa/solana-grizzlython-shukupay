import AuthComponent from "@/pages/components/Auth/AuthComponent"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"
import sol from "../../../public/solana.png"
import usdc from "../../../public/usdc.png"
import Image from "next/image"
import React, { useRef, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { createProduct, getStore } from "@/lib/database"
import { Router, useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { MdOutlineAddAPhoto } from "react-icons/md"

const AddProduct = () => {
  const { store } = useSelector((state: RootState) => state.store)

  const user = useUser()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<any>(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [photo, setPhoto] = useState<string | null>(null)
  const [photoToUpload, setPhotoToUpload] = useState<any>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation(createProduct, {
    onSuccess: (data) => {
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
      store: store?.id,
      picture: photoToUpload,
    })
  }

  function handleGoBack() {
    router.back()
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(null)
    setPhotoToUpload(null)
    const uploadedPhoto = event.target.files?.[0]
    setPhoto(uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : null)
    setPhotoToUpload(uploadedPhoto)
  }

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // console.log("STORE: ", store)

  if (!user) return <AuthComponent />

  return (
    <div className="flex flex-col flex-1 h-screen p-8 ">
      <div className="flex flex-row items-center justify-between w-full">
        <div
          onClick={handleGoBack}
          className="flex flex-row items-center p-2 px-4 text-base font-medium rounded-full cursor-pointer bg-neutral-200"
        >
          <AiOutlineArrowLeft size={20} />
          <h1 className="mx-4 ml-3">Back</h1>
        </div>
        {error && (
          <div className="absolute flex px-5 font-medium text-red-600 bg-red-200 border-2 border-red-400 rounded-md top-12 left-1/3 ">
            <p className="text-center">{error}</p>
          </div>
        )}
        {success && (
          <div className="absolute flex px-5 font-medium text-green-600 bg-green-200 border-2 border-green-400 rounded-md top-12 left-1/3 ">
            <p className="text-center">Published!</p>
          </div>
        )}
      </div>

      {mutation.isLoading ? (
        <div className="flex items-center flex-1">
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

              <div
                onClick={handleContainerClick}
                className="flex items-center justify-center w-20 rounded-md cursor-pointer h-28 bg-neutral-200"
              >
                {photo ? (
                  <Image src={photo} alt="uploaded" width={100} height={100} />
                ) : (
                  <label htmlFor="photo-upload">
                    <MdOutlineAddAPhoto size={25} color="#adaaaa" />
                  </label>
                )}

                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                  ref={fileInputRef}
                />
                {/* <MdOutlineAddAPhoto size={25} color="#adaaaa" /> */}
              </div>
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
                    <div className="relative w-10 h-10 overflow-hidden cursor-pointer">
                      <Image src={sol} alt="solana logo" fill />
                    </div>

                    <div className="relative w-10 h-10 overflow-hidden cursor-pointer">
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
