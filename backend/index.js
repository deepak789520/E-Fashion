import express from "express"; //import express form installed express package
import connectdb from "./database.js";
import { signupRouter } from "./routes/signup.js";
import { loginRouter } from "./routes/login.js";
import { userRouter } from "./routes/userdetails.js";
import { addressrouter } from "./routes/address.js";
import { productRouter } from "./routes/products.js";
import { orderRouter } from "./routes/order.js";
import { striperouter } from "./routes/payment.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();



const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api',signupRouter)
app.use('/api',loginRouter)
app.use('/api',userRouter)
app.use('/api',addressrouter)
app.use('/api',productRouter)
app.use('/api',orderRouter)
app.use('/api',striperouter)

connectdb() //it will connect to mangoDB
app.listen(port,()=>
{
    console.log(`connected to port ${port} `)
})