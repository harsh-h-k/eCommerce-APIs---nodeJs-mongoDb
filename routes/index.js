const express = require('express')
const app = express()
const {authenticateToken} = require('../helpers/token')
const loginSignup = require('./loginSignup')
const userProfile = require('./userProfile')
const products = require('./products')

app.use("/public", loginSignup)
app.use("/user",authenticateToken, userProfile)
app.use("/products",authenticateToken, products)

module.exports = app