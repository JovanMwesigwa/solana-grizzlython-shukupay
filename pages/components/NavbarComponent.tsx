import Image from "next/image"
import logo from "../../public/paynapple-lg.png"

type Props = {
  user?: any
  signout: () => void
}
const NavbarComponent = ({ signout, user }: Props) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex flex-row items-center justify-between w-full h-16 px-12 bg-neutral-50">
      <div className="flex flex-row items-center justify-center">
        <div className="relative w-16 h-16 rounded-full">
          <Image src={logo} alt="paynapple logo" fill />
        </div>
        <h1 className="text-xl font-semibold">paynapple</h1>
      </div>

      <div className="flex flex-row items-center">
        <div className="relative w-8 h-8 overflow-hidden rounded-full cursor-pointer bg-neutral-200">
          <Image src={user?.user_metadata?.picture} alt="User image" fill />
        </div>
        <button
          onClick={signout}
          className="absolute px-4 py-1 bg-white rounded-md shadow-sm cursor-pointer right-4 top-14 hover:bg-black hover:text-white"
        >
          <p>Logout</p>
        </button>

        {/* <h1>Jovan</h1> */}
      </div>
    </nav>
  )
}

export default NavbarComponent
