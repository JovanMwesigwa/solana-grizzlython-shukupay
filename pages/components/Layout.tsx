import { ReactNode, useEffect, useState } from "react"
import {
  Auth,
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

import NavbarComponent from "./NavbarComponent"
import Sidebar from "./Sidebar"
import { supabase } from "@/lib/supabaseClient"

const Layout = ({ children }: { children: ReactNode }) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data: any } = await supabaseClient.from("test").select("*")
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <div className="flex flex-row h-screen w-full">
        <div className="flex flex-1 bg-yellow-400 "></div>
        <div className="flex flex-1 justify-center px-6 flex-col">
          <Auth
            redirectTo="http://localhost:3000/dashboard"
            appearance={{
              theme: ThemeSupa,
              style: {
                container: {},
              },
            }}
            supabaseClient={supabaseClient}
            providers={["google"]}
            socialLayout="horizontal"
          />
        </div>
      </div>
    )

  const signout = () => supabaseClient.auth.signOut()

  return (
    <div className="relative flex flex-row w-full px-12 bg-neutral-50 ">
      <NavbarComponent signout={signout} />
      <Sidebar />
      <div className="w-1/4 h-screen" />
      <div className="flex flex-col flex-1 mt-16 ">{children}</div>
    </div>
  )
}

export default Layout
