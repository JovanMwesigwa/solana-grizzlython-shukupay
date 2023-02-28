import AuthComponent from "@/pages/components/Auth/AuthComponent"
import AddStoreAddress from "@/pages/components/StoreComponents/AddStoreAddress"
import AddStoreImages from "@/pages/components/StoreComponents/AddStoreImages"
import AddStoreName from "@/pages/components/StoreComponents/AddStoreName"
import { useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"

const CreateStore = () => {
  const user = useUser()

  const [progress, setProgress] = useState<string>("name")
  const [store, setStore] = useState<any>({
    owner: user?.id,
    name: "",
    description: "",
    solanaAddress: "",
    slug: "",
    picture: "",
    cover: "",
  })

  const renderUI = () => {
    switch (progress) {
      case "name":
        return <AddStoreName setProgress={setProgress} setStore={setStore} />
      case "address":
        return <AddStoreAddress setProgress={setProgress} setStore={setStore} />
      case "images":
        return (
          <AddStoreImages
            setProgress={setProgress}
            setStore={setStore}
            store={store}
          />
        )
      default:
        return <AddStoreName setProgress={setProgress} />
    }
  }
  if (!user) return <AuthComponent />
  return (
    <div className="flex flex-row w-full h-screen">
      {renderUI()}
      <div className="flex flex-col flex-1 bg-yellow-400"></div>
    </div>
  )
}

export default CreateStore
