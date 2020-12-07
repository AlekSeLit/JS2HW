
const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('./VueShop'))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('Server started!')
})

app.get('/itemslist/:page', (req, res) => {
  const page = req.params.page
  fs.readFile(`./VueShop/database/page${page}.json`, 'utf8', (err, data) => {
    console.log(err)
    res.send(data)
  })
})

app.post('/itemslist', (req, res) => {
 
  const filePath = './VueShop/database/page3.json'

  fs.readFile(filePath, 'utf8', (err, data) => {
    const offset = 11
    const list = JSON.parse(data || '{}')
    const amountOfData = Object.keys(list).length
    const newID = offset + amountOfData + 1
    const newItem = req.body
    console.log(req.body)
    newItem.id = newID
    list[newItem.id] = newItem

    fs.writeFile(filePath, JSON.stringify(list), (err) => {
      if (err) {
        console.log(err)
      }
      res.send(list)
    })
  })
})
