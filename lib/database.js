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

export const updateStoreTotalBalance = async ({ slug, amount }) => {
  const result = await supabase.from("store").select().eq("slug", slug)

  const currentBal = result.data[0].total

  const newBal = Number(currentBal) + Number(amount)

  const { error } = await supabase
    .from("store")
    .update({ total: newBal })
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
