const express = require('express')
const Joi = require('@hapi/joi')
const { insertItem, getItems, updateQuantity } = require('./db')

const router = express.Router()

const itemSchema = Joi.object().keys({
  name: Joi.string(),
  quantity: Joi.number().integer().min(0)
})

router.post('/item', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/items', (req, res) => {
  getItems()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.put('/item/:id/quantity/:quantity', (req, res) => {
  const { id, quantity } = req.params
  updateQuantity(id, parseInt(quantity))
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

module.exports = router
