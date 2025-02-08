import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite"

export default defineConfig({

    base: '/MnistDetection/', 
    // make the @ as a alias to the src folder (opitional but recomended)
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
})