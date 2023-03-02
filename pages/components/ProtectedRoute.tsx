import { ReactNode, useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import AuthComponent from "./Auth/AuthComponent"
import { useQuery } from "react-query"
import { getStore } from "@/lib/database"
import Router from "next/router"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUser()

  const [localUser, setLocalUser] = useState(null)
  const [localStore, setLocalStore] = useState(null)

  const { data, isLoading, error } = useQuery([user?.id], getStore)

  // fetch data
  useEffect(() => {
    const value = localStorage.getItem("user")
    const user = !!value ? JSON.parse(value) : undefined
    setLocalUser(user)

    const result = localStorage.getItem("store")
    const store = !!result ? JSON.parse(result) : undefined
    setLocalStore(store)

    // console.log("USER: ", user)
    // console.log("DEBUG: ", store)
  }, [])

  if (!user && !localUser) return <AuthComponent />

  if (!isLoading && user && !error && !data?.store) {
    Router.push("/store/new")
  }

  if (user && !localUser) {
    // save the local user to session
    localStorage.setItem("user", JSON.stringify(user))
  }

  if (data?.store && !localStore) {
    // save the local user to session
    localStorage.setItem("store", JSON.stringify(data.store))
  }

  return <>{children}</>
}

export default ProtectedRoute
