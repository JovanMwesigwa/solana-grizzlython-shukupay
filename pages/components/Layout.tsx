import { ReactNode } from "react"
import NavbarComponent from "./NavbarComponent"
import Sidebar from "./Sidebar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row relative bg-neutral-50 flex-1 ">
      <NavbarComponent />
      <Sidebar />
      <div className="w-1/4 h-screen ml-10" />
      <div className="flex flex-col p-10">{children}</div>
    </div>
  )
}

export default Layout
