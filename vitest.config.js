import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

// Test settings live here so vite.config.js (used by the deploy build) stays as it is.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
    },
  }),
)
