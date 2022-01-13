const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const hostname = '127.0.0.1'
const port = 3000

const _products = [
  { id: 1, title: '二狗子 Pro', price: 500.01 },
  { id: 2, title: 'Iphone12 二狗子版', price: 10.99 },
  { id: 3, title: '王二狗 狗子', price: 19.99 }
]

app.use(express.json())

app.get('/products', (req, res) => {
  res.status(200).json(_products)
})


app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`)
})
