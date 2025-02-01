import express from 'express'
import {connectDB} from './config/db.js'
import productRoutes from './routes/product.route.js'
import path from "path"
import dotenv from 'dotenv'

dotenv.config(); 

const __dirname = path.resolve()

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get("*",(req,res) => {
        res.sendFile(express.static(path.join(__dirname , 'frontend', 'dist', 'index.html')))
    } )
    
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}...`)
})