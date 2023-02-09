const NavbarComponent = () => {
  return (
    <nav className="w-full h-16 bg-neutral-50 px-12 fixed top-0 left-0 right-0 z-10 flex flex-row items-center justify-between">
      <div className="w-12 h-12 rounded-full bg-yellow-400"></div>

      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
        {/* <h1>Jovan</h1> */}
      </div>
    </nav>
  )
}

export default NavbarComponent
