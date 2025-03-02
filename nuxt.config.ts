// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",

	devtools: { enabled: true },

	modules: ["@pinia/nuxt", "@vite-pwa/nuxt", "@vueuse/nuxt", "@nuxt/fonts"],

	fonts: {
		families: [{ name: "Roboto", provider: "google" }],
		defaults: {
			weights: [400, 900],
			styles: ["normal"],
		},
	},
});
