import axios from "axios"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT
const api_key = process.env.API_KEY
