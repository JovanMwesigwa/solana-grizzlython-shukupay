import { BsLink } from "react-icons/bs"

const ProductCard = () => {
  return (
    <div className="flex flex-col flex-1 my-2 ">
      <div className="flex flex-col w-full p-6 bg-white rounded-md shadow-sm h-60">
        <div className="flex items-center justify-between w-full">
          <h4 className="font-light text-neutral-400">
            Posted at Feb 07, 2023 at 02:41 PM
          </h4>

          <div className="cursor-pointer">
            <BsLink size={25} />
          </div>
        </div>

        <div className="flex flex-row flex-1 my-3">
          <div className="w-40 h-full rounded-md bg-neutral-300"></div>
          <div className="flex flex-col ml-4">
            <h1 className="text-xl font-medium">Brand new Bata Shoes</h1>
            <p className="max-w-xs text-sm font-extralight text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. veniam
              magni nisi quidem accusamus asperiores?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
