/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
