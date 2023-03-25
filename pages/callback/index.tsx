import { addSquareCreds, getStore } from "@/lib/database"
import { RootState } from "@/state/store"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"

const SquareCallback = () => {
  const router = useRouter()

  const user = useUser()

  const dispatch = useDispatch()
  
  const [clientData, setClientData] = useState<null | {}>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  // const { code, state } = router.query

  // console.log(router.query)

  const {
    data: store,
    isLoading,
    error: storeError,
  } = useQuery([user?.id], getStore)

  useEffect(() => {
    if (router.query && store) {
      clientSquareData(router.query)
    }
  }, [router.query, store])

  const clientSquareData = async (query: any) => {
    try {
      const userData: any = {
        code: query.code,
        response_type: query.response_type,
        state: query.state,
        store: store?.store?.id,
      }
      setLoading(true)
      const response = await fetch("api/callback", {
        method: "POST",
        body: JSON.stringify(userData),
      })
      const data = await response.json()

      // setBaseUrl(data.base_url)
      // console.log("TEST HERE: ----", data.message)
      // console.log("TEST HERE: ----", store)

      setLoading(false)
    } catch (error) {
      setError("Could not connect you to square")
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-screen">
      <h1>Your square POS was successfully connected!</h1>
      <Link href="/dashboard">
      <div className="p-2 px-8 py-4 my-5 font-medium text-black bg-yellow-500 rounded-full ">Go back to Paynapple</div>
      </Link>
    </div>
  )
}

export default SquareCallback
