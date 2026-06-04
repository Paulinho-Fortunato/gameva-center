import { Hono } from 'hono'
import { renderer } from './renderer'
import Layout from './index'

const app = new Hono()

app.get('*', renderer)

app.get('/', (c) => {
  return c.render(
    <Layout>
      <h1>Gameva Center</h1>
      <p>Bem-vindo ao Gameva Center</p>
    </Layout>
  )
})

app.get('/sobre', (c) => {
  return c.render(
    <Layout>
      <h1>Sobre</h1>
      <p>Sobre o Gameva Center</p>
    </Layout>
  )
})

app.get('/servicos', (c) => {
  return c.render(
    <Layout>
      <h1>Serviços</h1>
      <p>Nossos serviços</p>
    </Layout>
  )
})

app.get('/contato', (c) => {
  return c.render(
    <Layout>
      <h1>Contato</h1>
      <p>Entre em contato conosco</p>
    </Layout>
  )
})

export default app
