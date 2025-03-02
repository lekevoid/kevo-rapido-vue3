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

	pwa: {
		manifest: {
			name: "Kevo-Rapido",
			short_name: "KevoRapido",
			theme_color: "#008",
			icons: [
				{
					src: "icons/android-chrome-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "icons/android-chrome-512x512.png",
					sizes: "512x512",
					type: "image/png",
				},
				{
					src: "icons/apple-touch-icon.png",
					sizes: "180x180",
					type: "image/png",
				},
				{
					src: "icons/android-chrome-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any maskable",
				},
			],
		},
	},
});
