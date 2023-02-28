import { useState } from "react"

type Props = {
  setStore: any
  setProgress: (arg: string) => void
}

const AddStoreAddress = ({ setProgress, setStore }: Props) => {
  const [error, setError] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  const submit = () => {
    if (!address) {
      return setError("Please paste your store Solana address")
    }

    setStore((prevState: any) => ({
      ...prevState,
      solanaAddress: address,
    }))

    setProgress("images")
  }
  return (
    <div className="flex flex-col justify-center flex-1 p-8">
      <div className="flex flex-col items-center justify-center flex-1 my-4">
        <div className="w-12 h-12 my-4 bg-yellow-400 rounded-full"></div>
        <h1 className="text-2xl">Add your Solana Address</h1>
      </div>

      <div className="flex flex-col flex-1">
        {error && <h4 className="text-sm text-center text-red-400">{error}</h4>}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Paste your address here.."
          className="p-2 w-full my-3 outline-none bg-neutral-50 border-[0.5px] rounded-md"
        />
        <button
          type="submit"
          onClick={submit}
          className="p-3 my-4 font-medium bg-yellow-400 rounded-md"
        >
          Next
        </button>
        <button onClick={() => setProgress("name")} className="my-3 text-sm">
          Back
        </button>
      </div>
    </div>
  )
}
export default AddStoreAddress
