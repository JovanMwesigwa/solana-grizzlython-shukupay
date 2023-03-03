import Image from "next/image"
import rolex from "../../public/rolex.jpg"
import Link from "next/link"

type Props = {
  route: any
  item: any
  name: any
}

const PageProductCard = ({ route, name, item }: Props) => {
  return (
    <Link
      href={{
        pathname: route,
        query: {
          s: name,
          p: item.id,
        },
      }}
      className="w-44 mb-4 cursor-pointer border-[0.5px] flex flex-col rounded-md bg-white h-44"
    >
      <div className="relative flex flex-1 overflow-hidden bg-neutral-100">
        <Image src={rolex} fill alt="item image" />
        <Link
          href={{
            pathname: route,
            query: {
              s: name,
              p: item.id,
            },
          }}
          className="absolute px-3 py-1 text-sm font-medium bg-white rounded-full hover:bg-yellow-400 bottom-3 right-3"
        >
          <h4>${item.price}</h4>
        </Link>
      </div>
      <div className="flex flex-col p-2 items-center justify-center ">
        <p className="text-xs font-medium overflow-clip">{item.name}</p>
      </div>
    </Link>
  )
}

export default PageProductCard
