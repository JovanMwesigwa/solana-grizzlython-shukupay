import { MdPostAdd } from "react-icons/md"
import { AiOutlineShopping } from "react-icons/ai"
import { FiExternalLink } from "react-icons/fi"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import { useQuery } from "react-query"
import { useUser } from "@supabase/auth-helpers-react"
import {
  getProducts,
  getSavedSquareMenu,
  getSquareCreds,
  getStore,
} from "@/lib/database"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { useEffect, useState } from "react"
import AddMenuModal from "../components/ModalComponents/AddMenuModal"
import useFetchSquareMenu from "@/hooks/useFetchSquareMenu"
import { BiCategory } from "react-icons/bi"
import { BsArrowReturnRight } from "react-icons/bs"
import { SiSquare } from "react-icons/si"

const Products = () => {
  const { store } = useSelector((state: RootState) => state.store)

  const { data: square } = useQuery([store.id], getSquareCreds)

  const [active, setActive] = useState<string>("Published")

  const { data, isLoading } = useQuery(["storeID", store.id], getProducts)

  const { request } = useFetchSquareMenu(square?.access_token)

  // const { data: savedSquareMenu } = useQuery([store.id], getSavedSquareMenu)

  const {
    data: squareItems,
    isLoading: menuItemsLoading,
    error: menuItemsError,
  } = useQuery([square?.access_token], request)

  // console.log("DEBUG HERE: ", squareItems.response.objects)
  // console.log("DEBUG PRODUCTS: ", savedSquareMenu)

  const renderProducts = () => {
    switch (active) {
      case "Published":
        return (
          <>
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
          </>
        )

      case "Square":
        return (
          <div className="flex flex-col w-full">
            {!square && !menuItemsLoading ? (
              <Link
                href="/authorize"
                className="p-3 px-6 rounded-md bg-neutral-100"
              >
                Connect your Square
              </Link>
            ) : (
              <>
                {squareItems ? (
                  <div>
                    {squareItems?.response?.objects?.map((item: any) => (
                      // <p key={item.id}>{item}</p>
                      <>
                        {item.type === "CATEGORY" ? (
                          <div
                            key={item.id}
                            className="flex flex-row items-center w-full h-24 p-4 mt-6 bg-white shadow-sm border-b-[0.5px] rounded-t-md"
                          >
                            <BiCategory size={35} />
                            <div className="flex flex-col ml-4">
                              <p className="text-[8px] text-purple-500">
                                CATEGORY
                              </p>
                              <h1 className="text-2xl">
                                {item.categoryData.name}
                              </h1>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={item.id}
                            className="flex flex-row items-center w-full h-16 p-4 pl-10 bg-white shadow-sm cursor-pointer hover:bg-neutral-50 "
                          >
                            <div className="flex flex-row items-center w-full pl-8">
                              <BsArrowReturnRight />
                              <h2 className="ml-4">{item.itemData.name}</h2>
                            </div>
                            <h2 className="text-sm font-medium">
                              <span className="mr-1 text-[8px] font-light">
                                {
                                  item.itemData.variations[0].itemVariationData
                                    .priceMoney.currency
                                }
                              </span>
                              {/* const formattedPrice = (price / 100).toFixed(2); */}
                              {(
                                item.itemData.variations[0].itemVariationData
                                  .priceMoney.amount / 100
                              ).toFixed(2)}
                            </h2>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <AddMenuModal />
                )}
              </>
            )}
          </div>
        )
      case "Other":
        return (
          <div className="flex flex-col items-center justify-center flex-1">
            <p className="text-sm text-gray-300">Import Other POS menu</p>
          </div>
        )
      default:
        return (
          <>
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
          </>
        )
    }
  }

  return (
    <Layout>
      <h1 className="text-xl font-medium">Product Menus</h1>
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
          <h1 className="ml-3 font-medium">Import square menu</h1>
        </div>

        <div className="flex flex-row items-center justify-center flex-1 p-5 bg-white rounded-md shadow-sm cursor-pointer">
          <AiOutlineShopping size={22} />
          <h1 className="ml-3 font-medium">Add Shop Page</h1>
        </div>
      </div>

      <div className="flex flex-row border-b-[0.5px] border-neutral-200 w-full my-4">
        <button
          onClick={() => setActive("Published")}
          className={`flex flex-col mr-6 border-b-[0.5px] ${
            active === "Published" && "border-black "
          } ${
            active != "Published" && "text-neutral-400"
          } cursor-pointer items-center`}
        >
          <h1 className="mb-2 font-medium">Paynapple {data?.data?.length}</h1>
        </button>

        <button
          onClick={() => setActive("Square")}
          className={`flex flex-col mr-6 border-b-[0.5px] ${
            active === "Square" && "border-black "
          } ${
            active != "Square" && "text-neutral-400"
          } cursor-pointer items-center`}
        >
          <h1 className="mb-2 font-medium ">Square </h1>
        </button>

        <button
          onClick={() => setActive("Other")}
          className={`flex flex-col mr-6 border-b-[0.5px] ${
            active === "Other" && "border-black "
          } ${
            active != "Other" && "text-neutral-400"
          } cursor-pointer items-center`}
        >
          <h1 className="mb-2 font-medium ">Other</h1>
        </button>
      </div>
      {renderProducts()}
    </Layout>
  )
}
export default Products
