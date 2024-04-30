import express from 'express'
import cors from 'cors'



// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// app.use('/images', express.static(path.join(__dirname, 'images')));

// api endpoints
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})