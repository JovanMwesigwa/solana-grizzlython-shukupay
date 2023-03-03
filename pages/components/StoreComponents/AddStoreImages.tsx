import { createStore } from "@/lib/database"
import { addStore } from "@/state/features/store/storeSlice"
import Router from "next/router"
import { useState } from "react"
import { useMutation } from "react-query"
import { useDispatch } from "react-redux"

type Props = {
  store: any
  setStore: any
  setProgress: (arg: string) => void
}

const AddStoreImages = ({ setStore, store, setProgress }: Props) => {
  const [error, setError] = useState<string>("")
  const [picture, setPicture] = useState<string>("store_picture.url")
  const [cover, setCover] = useState<string>("store_cover.url")

  const dispatch = useDispatch()

  const mutation = useMutation(createStore, {
    onSuccess: (data: any) => {
      dispatch(addStore(data[0]))
      Router.push("/dashboard")
    },
  })

  const submit = () => {
    if (!picture || !cover) {
      return setError("Make sure you fill all fields")
    }

    setStore((prevState: any) => ({
      ...prevState,
      picture: picture,
      cover: cover,
    }))

    mutation.mutate(store)
  }
  return (
    <div className="flex flex-col justify-center flex-1 p-8">
      {mutation.isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center flex-1 my-4">
            <div className="w-12 h-12 my-4 bg-yellow-400 rounded-full"></div>
            <h1 className="text-2xl">Add your Store images</h1>
          </div>

          <div className="flex flex-col flex-1">
            <div className="relative flex items-center justify-center w-full rounded-md cursor-pointer bg-neutral-200 h-36"></div>
            <div className="w-24 h-24 my-4 rounded-full cursor-pointer bg-neutral-200"></div>
            <button
              disabled={mutation.isLoading}
              type="submit"
              onClick={submit}
              className="p-3 my-4 font-medium bg-yellow-400 rounded-md"
            >
              Next
            </button>
            <button
              onClick={() => setProgress("address")}
              className="my-3 text-sm"
              disabled={mutation.isLoading}
            >
              Skip
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default AddStoreImages
