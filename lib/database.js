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
    .eq("slug", slug.queryKey[0])
  const store = data[0]
  return { store, error }
}

export const getStoreFromID = async (ID) => {
  const { data, error } = await supabase
    .from("store")
    .select()
    .eq("id", ID.queryKey[0])
  const result = data[0]
  return result
}

export const updateStoreTotalBalance = async ({ slug, amount }) => {
  const { error } = await supabase
    .from("store")
    .update({ total: amount })
    .eq("slug", slug)
  return { error }
}

export const createStore = async (store) => {
  const { error } = await supabase.from("store").insert({
    name: store.name,
    owner: store.owner,
    bio: store.description,
    solana_address: store.solanaAddress,
    slug: store.slug,
    picture: store.picture,
    cover: store.cover,
  })
  return error
}

export const createProduct = async ({
  name,
  description,
  price,
  slug,
  store,
}) => {
  const { error } = await supabase.from("product").insert({
    name,
    description,
    price,
    slug,
    store,
  })
  return error
}

export const getProducts = async (store) => {
  const { data, error } = await supabase
    .from("product")
    .select()
    .eq("store", store.queryKey[1])
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
