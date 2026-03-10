import app from './src/index'
import { mkdir, writeFile, rm, cp } from 'fs/promises'
import { join } from 'path'

async function copyPublic() {
  // remove old dist
  await rm('dist', { recursive: true, force: true })
  // copy everything from public to dist
  await cp('public', 'dist', { recursive: true })
}

async function prerender() {
  const routes = ['/', '/sobre', '/servicos', '/contato']

  for (const route of routes) {
    const res = await app.request(route)
    const html = await res.text()
    const dir = route === '/' ? 'dist' : join('dist', route)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), html)
  }
  console.log('Prerendering complete')
}

async function build() {
  try {
    await copyPublic()
    await prerender()
    console.log('Build finished')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

build()
