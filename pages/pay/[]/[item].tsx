const Checkout = () => {
  return (
    <div className="flex flex-row items-center h-screen px-20 bg-neutral-100">
      <div className="flex flex-col justify-between flex-1 h-full p-10 bg-white shadow-md">
        <h1 className="text-xl font-bold">Super Spicy Meaty Rolex</h1>

        <div className="w-1/2 my-6 rounded-md h-1/2 bg-neutral-50"></div>

        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Total: $25</h1>

          <p className="mt-6 mb-2 text-base">You will pay</p>
          <div className="w-1/2 border-[0.5px] h-14  rounded-md flex flex-row items-center justify-between">
            <h1 className="mx-4 text-xl ">0.0024526</h1>

            <div className="w-32 h-full cursor-pointer justify-center border-l-[0.5px] flex flex-row items-center ">
              <div className="w-10 h-10 mr-3 rounded-full bg-slate-400"></div>
              <h1 className="text-xl">SOL</h1>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="p-3 mt-6 text-white bg-blue-500 rounded-md"
        >
          Proceed to payment
        </button>
      </div>

      <div className="flex items-end w-1/3 h-full p-8 ">
        <div className="flex flex-col">
          <h4 className="text-sm">
            Add your email and you will get notified you when the seller
            receives your payment
          </h4>
          <div className="flex flex-row items-center w-full my-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-2 rounded-md border-[0.5px] outline-none"
            />
            <button
              type="submit"
              className="p-2 px-3 ml-3 text-sm font-medium bg-yellow-400 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
