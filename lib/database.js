import { supabase } from "./supabaseClient"

export const getStore = async (user) => {
  const { data, error } = await supabase
    .from("store")
    .select()
    .eq("owner", user.queryKey[0])
  // console.log("DEBUG HERE ----", data, error)
  const store = data[0]
  return { store, error }
}

export const getStoreFromSlug = async (slug) => {
  const { data, error } = await supabase
    .from("store")
    .select()
    .eq("slug", slug.queryKey[1])
  const store = data[0]
  return { store, error }
}

export const getStoreFromID = async (ID) => {
  const storeID = ID.queryKey ? ID.queryKey[0] : ID
  const { data, error } = await supabase
    .from("store")
    .select()
    .eq("id", storeID)
  const result = data[0]
  return result
}

export const getStoreBalance = async (ID) => {
  const { data, error } = await supabase
    .from("store")
    .select("total")
    .eq("id", ID.queryKey[0])
  console.log("STORE BALANCE: ", data)
  const result = data[0]
  return result
}

export const updateStoreTotalBalance = async ({ slug, amount, total }) => {
  // console.log("UPDATED PAY", amount, total)
  const { error } = await supabase
    .from("store")
    .update({ total: amount + total })
    .eq("slug", slug)
  return { error }
}

export const createStore = async (store) => {
  const { error, data } = await supabase
    .from("store")
    .insert({
      name: store.name,
      owner: store.owner,
      bio: store.description,
      solana_address: store.solanaAddress,
      slug: store.slug,
      picture: store.picture,
      cover: store.cover,
    })
    .select()
  return data
}

export const createProduct = async ({
  name,
  description,
  price,
  slug,
  store,
  picture,
}) => {
  const image = await uploadProductImage(picture, store)
  // console.log("PORUDCT PIC: ", image, store)
  const { data } = await supabase
    .from("product")
    .insert({
      name,
      description,
      price,
      slug,
      store,
      image,
    })
    .select()
  return data
}

export const getProducts = async (store) => {
  const { data, error } = await supabase
    .from("product")
    .select()
    .eq("store", store.queryKey[1])
    .order("created_at", { ascending: false })
  return { data, error }
}

export const getProduct = async (ID) => {
  const { data, error } = await supabase
    .from("product")
    .select()
    .eq("id", ID.queryKey[0])
  const result = data[0]
  return result
}

export const addSquareCreds = async ({
  store,
  access_token,
  refresh_token,
  merchant_id,
  expires_at,
}) => {
  const { data } = await supabase
    .from("square")
    .insert({
      store,
      access_token,
      refresh_token,
      merchant_id,
      expires_at,
    })
    .select()
  return data
}

export const getSquareCreds = async (storeID) => {
  const { data, error } = await supabase
    .from("square")
    .select()
    .eq("store", storeID.queryKey[0])
  const result = data[0]
  return result
}

export const uploadProductImage = async (pic, store) => {
  const timestamp = Date.now()
  const newName = `${timestamp}-${pic.name}`

  const { data, error } = await supabase.storage
    .from("paynapple-bucket")
    .upload(`products/${newName}`, pic, {
      cacheControl: "3600",
      upsert: false,
    })

  return data.path
}

export const getPictureUrl = async (path) => {
  let response

  if (path) {
    const { data, error } = await supabase.storage
      .from("paynapple-bucket")
      .createSignedUrl(path.queryKey[0], 60)
    response = data.signedUrl
  }

  return response
}
