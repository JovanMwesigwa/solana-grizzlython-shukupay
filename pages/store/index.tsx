import { FiShare } from "react-icons/fi"
import PageProductCard from "../components/PageProductCard"
import { useQuery } from "react-query"
import { getProducts, getSquareCreds, getStoreFromSlug } from "@/lib/database"
import { useRouter } from "next/router"
import Image from "next/image"
import logo from "../../public/paynapple-lg.png"
import sol from "../../public/solana.png"
import usdc from "../../public/usdc.png"
import useFetchSquareItems from "@/hooks/useFetchSquareItems"

const Store = () => {
  const { query } = useRouter()

  const { data, isLoading } = useQuery(
    ["fetchStore", query.s],
    getStoreFromSlug
  )

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery(["storeID", data?.store?.id], getProducts)

  const { data: square } = useQuery([data?.store?.id], getSquareCreds)

  const { request } = useFetchSquareItems(square?.access_token)

  const {
    data: squareItems,
    isLoading: menuItemsLoading,
    error: menuItemsError,
  } = useQuery([square?.access_token], request)

  // console.log("DEUBG HERE: ", squareItems.response.objects)

  if (isLoading || menuItemsLoading)
    return (
      <div className="flex items-center justify-center">
        <p>Loading....</p>
      </div>
    )

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-row items-center justify-between w-full h-16 px-12 shadow-sm">
        <div className="flex flex-row items-center justify-center">
          <div className="relative w-16 h-16 rounded-full">
            <Image src={logo} alt="paynapple logo" fill />
          </div>
          <h1 className="text-xl font-semibold">paynapple</h1>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center cursor-pointer justify-center border-[0.5px] p-2 px-4 rounded-full">
            <h1 className="font-medium">Contact</h1>
          </div>

          <div className="flex items-center mx-4 cursor-pointer justify-center border-[0.5px] p-2 px-4 rounded-full">
            <h1 className="font-medium">Visit</h1>
          </div>

          <div className="flex items-center justify-center border-[0.5px] p-2 px-4 rounded-full">
            <FiShare size={22} />
          </div>
        </div>
      </div>

      {/* <div className="relative flex flex-col items-center justify-center w-full h-60 bg-neutral-300">
        <div className="absolute flex border-4 border-white rounded-full justify-self-auto w-44 h-44 bg-neutral-300 top-32"></div>
      </div> */}

      {/* <div className="flex flex-col items-center justify-center w-full mt-6 h-44">
        <h1 className="text-3xl font-bold">{data?.store?.name}</h1>
        <h3 className="w-1/2 text-lg text-center overflow-clip ">
          {data?.store?.bio}
        </h3>
      </div> */}

      <div className="flex flex-col border-t-[0.5px] items-center py-6">
        <h4 className="text-sm font-medium text-neutral-500">
          FEATURED / {data?.store?.name}
        </h4>

        <div className="flex flex-row flex-1 w-full my-5 md:max-w-screen-lg ">
          {productsError ? (
            <h4>Something went wrong when fetching the store products</h4>
          ) : (
            <>
              {productsLoading ? (
                <div className="flex items-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap flex-1 justify-evenly ">
                  {products?.data?.map((item: any) => (
                    <PageProductCard
                      key={item.id}
                      item={item}
                      route="/pay"
                      name={data?.store?.slug}
                    />
                  ))}

                  {!menuItemsLoading &&
                    !menuItemsError &&
                    squareItems?.response?.objects?.map((item: any) => (
                      <div
                        key={item.id}
                        className="w-44 mb-4 cursor-pointer border-[0.5px] flex flex-col rounded-md bg-white h-44"
                      >
                        <div className="relative flex flex-1 bg-neutral-100">
                          <h1 className="absolute z-10 px-4 py-1 text-sm font-medium text-black bg-white rounded-full bottom-3 right-3">
                            <span className="text-[8px] mr-1">
                              {
                                item?.itemData?.variations[0]?.itemVariationData
                                  .priceMoney.currency
                              }
                            </span>
                            {(
                              item?.itemData?.variations[0]?.itemVariationData
                                ?.priceMoney?.amount / 100
                            ).toFixed(2)}
                          </h1>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-white">
                          <h1 className="text-xs font-medium text-black">
                            {item?.itemData?.name}
                          </h1>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* {!menuItemsLoading && (
                <div className="w-44 mb-4 cursor-pointer border-[0.5px] flex flex-col rounded-md bg-white h-44"></div>
              )} */}
            </>
          )}
          <div className="relative flex w-1/3 h-full" />
          <div className="flex w-1/3 fixed right-10 p-8 flex-col border-[0.5px] rounded-md  ">
            <h1 className="text-lg font-bold">
              <strong>Tip</strong>{" "}
              <span className="text-neutral-500">{data?.store?.name} </span>
              crypto-nyte 😉
            </h1>

            <div className="flex flex-row items-center border-[0.5px] rounded-md justify-between p-4 my-6 bg-neutral-50 full">
              <div className="relative w-8 h-8 overflow-hidden cursor-pointer">
                <Image src={sol} alt="solana logo" fill />
              </div>

              <div className="relative w-8 h-8 overflow-hidden cursor-pointer">
                <Image src={usdc} alt="solana logo" fill />
              </div>

              <div className="w-10 h-10 bg-green-500 rounded-full cursor-pointer"></div>
            </div>

            <textarea
              placeholder="Write them something.... (Optional)"
              className="p-4 mb-4 bg-neutral-50 rounded-md border-[0.5px] h-full outline-none"
            />

            <button
              className="py-3 mt-4 font-medium bg-yellow-400 rounded-full"
              type="submit"
            >
              Send $5 Tip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
