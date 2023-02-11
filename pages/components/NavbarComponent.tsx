type Props = {
  signout: () => void
}
const NavbarComponent = ({ signout }: Props) => {
  return (
    <nav className="w-full h-16 bg-neutral-50 px-12 fixed top-0 left-0 right-0 z-10 flex flex-row items-center justify-between">
      <div className="w-12 h-12 rounded-full bg-yellow-400"></div>

      <div className="flex flex-row items-center">
        <div className="w-8 h-8 relative rounded-full  cursor-pointer bg-neutral-200"></div>
        <button
          onClick={signout}
          className="cursor-pointer absolute right-4 top-14 rounded-md shadow-sm hover:bg-black hover:text-white py-1 bg-white px-4"
        >
          <p>Logout</p>
        </button>

        {/* <h1>Jovan</h1> */}
      </div>
    </nav>
  )
}

export default NavbarComponent
