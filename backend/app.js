const express = require("express")
const cors = require("cors")
require("dotenv").config({})
const notesRoutes = require("./routers/notes.routes")
const dbInit = require("./config/dbInit")

// Jalankan inisialisasi database
dbInit()

const app = express()
app.use(express.json())
app.use(cors())
app.use(notesRoutes)

module.exports = app
