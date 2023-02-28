import { ReactNode, useEffect, useState } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import NavbarComponent from "./NavbarComponent"
import Sidebar from "./Sidebar"
import { supabase } from "@/lib/supabaseClient"
import AuthComponent from "./Auth/AuthComponent"
import { useQuery } from "react-query"
import { getStore } from "@/lib/database"
import Router from "next/router"

const Layout = ({ children }: { children: ReactNode }) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  const { data, isLoading, error } = useQuery([user?.id], getStore)

  // console.log(data?.store)

  if (!user) return <AuthComponent />

  if (!isLoading && user && !error && !data?.store) {
    Router.push("/store/new")
  }

  const signout = () => supabaseClient.auth.signOut()

  return (
    <div className="relative flex flex-row w-full px-12 bg-neutral-50 ">
      <NavbarComponent signout={signout} user={user} />
      <Sidebar store={data?.store} />
      <div className="w-1/4 h-screen" />
      <div className="flex flex-col flex-1 mt-16 ">{children}</div>
    </div>
  )
}

export default Layout
