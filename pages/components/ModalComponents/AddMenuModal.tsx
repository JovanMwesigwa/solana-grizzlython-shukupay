import { useState } from "react"

const AddMenuModal = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-black uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded shadow outline-none active:bg-yellow-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Import Square menu
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-3">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}

                <div className="flex flex-row items-center justify-center p-3 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-xl font-semibold text-center">
                    Import store menu
                  </h3>
                </div>

                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      placeholder="Add a title for your menu"
                      className="w-full border-[1px] p-3 rounded-md outline-none mt-2"
                    />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}

export default AddMenuModal
