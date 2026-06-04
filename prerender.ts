import app from './src/app.tsx'
import { mkdir, writeFile, rm, cp } from 'fs/promises'
import { join } from 'path'

async function copyPublic() {
  // remove old dist
  await rm('dist', { recursive: true, force: true })
  // copy everything from public to dist
  await cp('public', 'dist', { recursive: true, verbatimSymlinks: false })
}

async function prerender() {
  const routes = ['/', '/sobre', '/servicos', '/contato']

  // Process routes in parallel for better performance
  await Promise.all(routes.map(async (route) => {
    try {
      const res = await app.request(route)
      if (!res.ok) {
        console.warn(`⚠️  Route ${route} returned ${res.status}`)
        return
      }
      const html = await res.text()
      const dir = route === '/' ? 'dist' : join('dist', route)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, 'index.html'), html, 'utf-8')
      console.log(`✓ Prerendered: ${route}`)
    } catch (err) {
      console.error(`✗ Failed to prerender ${route}:`, err)
    }
  }))
  
  console.log('\n✅ Prerendering complete')
}

async function build() {
  try {
    console.log('🚀 Starting build process...\n')
    await copyPublic()
    console.log('✓ Public files copied\n')
    await prerender()
    console.log('\n✅ Build finished successfully')
  } catch (e) {
    console.error('❌ Build failed:', e)
    process.exit(1)
  }
}

build()
