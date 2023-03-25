import Image from "next/image"
import rolex from "../../public/rolex.jpg"
import Link from "next/link"
import { getPictureUrl } from "@/lib/database"
import { useQuery } from "react-query"

type Props = {
  route: any
  item: any
  name: any
}

const PageProductCard = ({ route, name, item }: Props) => {
  const { data, isLoading, error } = useQuery([item.image], getPictureUrl)
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
        {!isLoading && !error && (
          <Image
            src={data ? data : rolex}
            // src={rolex}
            alt="product image"
            fill
          />
        )}
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
      <div className="flex flex-col items-center justify-center p-2 ">
        <p className="text-xs font-medium overflow-clip">{item.name}</p>
      </div>
    </Link>
  )
}

export default PageProductCard
