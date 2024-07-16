import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "../server/public",
		emptyOutDir: true,
	},
	server: {
		proxy: {
			"/resolve": {
				target: "http://localhost:3001",
			},
		},
	},
});
