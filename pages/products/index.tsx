import { MdPostAdd } from "react-icons/md"
import { AiOutlineShopping } from "react-icons/ai"
import { FiExternalLink } from "react-icons/fi"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import { useQuery } from "react-query"
import { useUser } from "@supabase/auth-helpers-react"
import { getProducts, getStore } from "@/lib/database"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"

const Products = () => {
  const { store } = useSelector((state: RootState) => state.store)

  const { data, isLoading, error } = useQuery(
    ["storeID", store.id],
    getProducts
  )

  // console.log("DEBUG HERE: ", store)
  // console.log("DEBUG PRODUCTS: ", data?.data)

  return (
    <Layout>
      <h1 className="text-xl font-medium">Create a new product</h1>
      {/* Top cards */}

      <div className="flex flex-row w-full my-5">
        <Link
          href="/products/new"
          className="flex flex-row items-center justify-center flex-1 p-5 bg-white rounded-md shadow-sm cursor-pointer"
        >
          <MdPostAdd size={22} />
          <h1 className="ml-3 font-medium">Add Product</h1>
        </Link>

        <div className="flex flex-row items-center justify-center flex-1 p-5 mx-4 bg-white rounded-md shadow-sm cursor-pointer">
          <FiExternalLink size={22} />
          <h1 className="ml-3 font-medium">Add Pay Link</h1>
        </div>

        <div className="flex flex-row items-center justify-center flex-1 p-5 bg-white rounded-md shadow-sm cursor-pointer">
          <AiOutlineShopping size={22} />
          <h1 className="ml-3 font-medium">Add Shop Page</h1>
        </div>
      </div>

      <div className="flex flex-row border-b-[0.5px] border-neutral-200 w-full my-4">
        <div className="flex flex-col mr-6 border-b-[0.5px] border-black cursor-pointer items-center">
          <h1 className="mb-2 font-medium">Published {data?.data?.length}</h1>
        </div>

        <div className="flex flex-col items-center mr-6 cursor-pointer">
          <h1 className="mb-2 font-medium text-neutral-400">Scheduled </h1>
        </div>

        <div className="flex flex-col items-center mr-6 cursor-pointer">
          <h1 className="mb-2 font-medium text-neutral-400">Drafted</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {data?.data?.map((item: any) => (
            <ProductCard
              key={item.id}
              item={item}
              route={`/pay?s=${store?.slug}&p=${item.id}`}
            />
          ))}
        </>
      )}
    </Layout>
  )
}
export default Products
