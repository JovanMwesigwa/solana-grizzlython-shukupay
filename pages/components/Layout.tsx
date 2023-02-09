import { ReactNode } from "react"
import NavbarComponent from "./NavbarComponent"
import Sidebar from "./Sidebar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row px-12 w-full relative bg-neutral-50 ">
      <NavbarComponent />
      <Sidebar />
      <div className="w-1/4 h-screen" />
      <div className="flex flex-col mt-16 flex-1 ">{children}</div>
    </div>
  )
}

export default Layout
