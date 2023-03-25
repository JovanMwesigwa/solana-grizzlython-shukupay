import { getPictureUrl } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { BsLink } from "react-icons/bs"
import { useQuery } from "react-query"
import rolex from "../../public/rolex.jpg"

type Props = {
  route: String
  item: any
}

const ProductCard = ({ route, item }: Props) => {
  const { data, isLoading, error } = useQuery([item.image], getPictureUrl)

  return (
    <div className="flex flex-col flex-1 my-2 ">
      <div className="flex flex-col w-full p-6 bg-white rounded-md shadow-sm h-60">
        <div className="flex items-center justify-between w-full">
          <h4 className="font-light text-neutral-400">{item.created_at}</h4>

          <Link href={route ? route : ""} className="cursor-pointer">
            <BsLink size={25} />
          </Link>
        </div>

        <div className="flex flex-row flex-1 my-3">
          <div className="relative w-40 h-full overflow-hidden rounded-md bg-neutral-300">
            {!isLoading && !error && (
              <Image
                src={data ? data : rolex}
                // src={rolex}
                alt="itme image"
                fill
              />
            )}
          </div>
          <div className="flex flex-col ml-4">
            <h1 className="text-xl font-medium">{item.name}</h1>
            <p className="max-w-xs text-sm font-extralight text-neutral-300">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
