import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

const APP_SHELLS = [
  { basePath: '/learning', htmlPath: '/learning/index.html' },
  { basePath: '/hr', htmlPath: '/hr/index.html' },
  { basePath: '/superadmin', htmlPath: '/superadmin/index.html' },
]

const hasFileExtension = (pathname) => /\/[^/]+\.[^/]+$/.test(pathname)

const findAppShell = (requestUrl) => {
  if (!requestUrl) {
    return null
  }

  const { pathname } = new URL(requestUrl, 'http://localhost')
  const shell = APP_SHELLS.find(
    ({ basePath }) =>
      (pathname === basePath || pathname.startsWith(`${basePath}/`)) &&
      !hasFileExtension(pathname),
  )

  return shell?.htmlPath || null
}

const useAppShellFallback = (server) => {
  server.middlewares.use((req, _res, next) => {
    const appShell = findAppShell(req.url)

    if (appShell) {
      req.url = appShell
    }

    next()
  })
}

const appShellFallback = () => ({
  name: 'app-shell-fallback',
  configureServer: useAppShellFallback,
  configurePreviewServer: useAppShellFallback,
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), appShellFallback()],
  build: {
    rollupOptions: {
      input: {
        hr: resolve(rootDir, 'hr/index.html'),
        learning: resolve(rootDir, 'learning/index.html'),
        superadmin: resolve(rootDir, 'superadmin/index.html'),
      },
    },
  },
})
