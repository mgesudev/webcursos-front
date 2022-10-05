export const config = {
  BASE_BACKEND_URL: !!process.env.NEXT_PUBLIC_VERCEL_ENV
    ? process.env.NEXT_PUBLIC_BASE_BACKEND_URL
    : "http://localhost:4000",
}
