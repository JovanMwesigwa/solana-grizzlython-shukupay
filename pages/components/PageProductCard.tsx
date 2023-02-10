import Image from "next/image"
import rolex from "../../public/rolex.jpg"
import Link from "next/link"

type Props = {
  route: String
}

const PageProductCard = ({ route }: Props) => {
  return (
    <Link
      href={route}
      className="w-72 mb-4 cursor-pointer border-[0.5px] flex flex-col rounded-md bg-white h-72"
    >
      <div className="relative flex flex-1 overflow-hidden bg-neutral-100">
        <Image src={rolex} fill alt="item image" />
        <Link
          href={route ? route : ""}
          className="absolute px-3 py-1 text-sm font-medium bg-white rounded-full hover:bg-yellow-400 bottom-3 right-3"
        >
          <h4>Get this!</h4>
        </Link>
      </div>
      <div className="flex flex-col justify-between p-3 ">
        <h1 className="text-base font-medium overflow-clip">
          quidem! Dignissimos, corporis. Meaty Rolex
        </h1>
        <button
          type="submit"
          className="w-1/3 mt-2 text-white bg-purple-600 rounded-md"
        >
          $20
        </button>
      </div>
    </Link>
  )
}

export default PageProductCard
