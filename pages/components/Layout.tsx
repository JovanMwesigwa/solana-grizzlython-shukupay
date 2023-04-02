import { ReactNode, useEffect, useState } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import NavbarComponent from "./NavbarComponent"
import Sidebar from "./Sidebar"
import { supabase } from "@/lib/supabaseClient"
import AuthComponent from "./Auth/AuthComponent"
import { useQuery } from "react-query"
import { getStore } from "@/lib/database"
import Router from "next/router"
import type { RootState } from "../../state/store"
import { useSelector, useDispatch } from "react-redux"
import { fetchedUser, removeUser } from "@/state/features/user/userSlice"
import { addStore } from "@/state/features/store/storeSlice"

const Layout = ({ children }: { children: ReactNode }) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const dispatch = useDispatch()

  const {
    loading,
    error: userStateError,
    authenticated,
    user: userState,
  } = useSelector((state: RootState) => state.user)

  const { store, available } = useSelector((state: RootState) => state.store)

  const { data, isLoading, error } = useQuery([user?.id], getStore)

  useEffect(() => {
    if (!authenticated && user) {
      dispatch(fetchedUser(user))
    }

    if (data?.store && !available) {
      // console.log("STORE AVAILABLE: ", data)
      dispatch(addStore(data.store))
    }
  }, [userState, user, store, data])

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <h5>Loading...</h5>
      </div>
    )

  if (!user) return <AuthComponent />

  if (!data?.store && !isLoading && !error) {
    // if (!data?.store) {
    Router.push("/store/new")
  }

  const signout = async () => {
    supabaseClient.auth.signOut()
    dispatch(removeUser())
    // Router.reload()
  }

  // console.log("REDUXED LOAD: ", data?.store)
  // console.log("REDUXED USER: ", available)
  // console.log("REDUXED USER: ", authenticated)
  // console.log("REDUXED ERROR: ", userStateError)

  return (
    <div className="relative flex flex-row w-full px-12 bg-neutral-50 ">
      <NavbarComponent signout={signout} user={user} />
      {/* <Sidebar store={data?.store} /> */}
      <Sidebar store={store} />
      <div className="w-1/4 h-screen" />
      <div className="flex flex-col flex-1 mt-16 ">{children}</div>
    </div>
  )
}

export default Layout

export async function getServerSideProps(context: any) {}
