import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  // This is a local, single-user study app — its bundled JLPT datasets
  // (vocab/kanji word lists) are the bulk of the size and don't benefit
  // from code-splitting the way a multi-route web app's code would.
  build: { chunkSizeWarningLimit: 2200 },
})
