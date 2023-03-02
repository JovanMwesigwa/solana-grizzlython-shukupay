import {
  Auth,
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-react"

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

type Props = {
  route?: any
}

const AuthComponent = ({ route }: Props) => {
  const supabaseClient = useSupabaseClient()
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-1 bg-yellow-400 "></div>
      <div className="flex flex-col justify-center flex-1 px-6">
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
}

export default AuthComponent
