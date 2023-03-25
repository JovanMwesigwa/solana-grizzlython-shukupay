import { getStore } from "@/lib/database"
import { useUser } from "@supabase/auth-helpers-react"
import Router from "next/router"
import { useState } from "react"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import slugify from "slugify"

type Props = {
  setProgress: (arg: string) => void
  setStore?: any
}

const AddStoreName = ({ setProgress, setStore }: Props) => {
  const user = useUser()

  const [error, setError] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const { data, isLoading, error: storeError } = useQuery([user?.id], getStore)

  const submit = () => {
    if (!name || !description) {
      return setError("Make sure you fill all fields")
    }

    setStore((prevState: any) => ({
      ...prevState,
      owner: prevState.owner ? prevState.owner : user?.id,
      name: name,
      slug: slugify(name.toLowerCase()),
      description: description,
    }))

    setProgress("address")
  }

  if (data?.store && !isLoading && !storeError) {
    Router.push("/dashboard")
  }

  return (
    <div className="flex flex-col justify-center flex-1 p-8">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
        <h1 className="text-2xl">Welcome aboard</h1>
        <h1 className="text-2xl">Time to create your store!</h1>
      </div>

      <div className="flex flex-col flex-1">
        {error && <h4 className="text-sm text-center text-red-400">{error}</h4>}
        <input
          type="text"
          onBlur={() => setError("")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Store name"
          className="p-2 w-full my-3 outline-none bg-neutral-50 border-[0.5px] rounded-md"
        />
        <textarea
          value={description}
          onBlur={() => setError("")}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 w-full my-3 outline-none bg-neutral-50 border-[0.5px] rounded-md"
        />

        <button
          type="submit"
          onClick={submit}
          className="p-3 my-4 font-medium bg-yellow-400 rounded-md"
        >
          Create my store
        </button>
      </div>
    </div>
  )
}
export default AddStoreName
