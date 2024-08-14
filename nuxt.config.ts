export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      appURL: "http://localhost",
    },
  },
  routeRules: {
    "/**": { ssr: false },
  },
})
