import app from './src/index'
import { mkdir, writeFile } from 'fs/promises'

async function prerender() {
  const routes = ['/', '/sobre', '/servicos', '/contato']

  for (const route of routes) {
    const res = await app.request(route)
    const html = await res.text()
    const dir = route === '/' ? 'dist' : `dist${route}`
    await mkdir(dir, { recursive: true })
    await writeFile(`${dir}/index.html`, html)
  }
  console.log('Prerendering complete')
}

prerender().catch(console.error)