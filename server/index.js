import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import employeeRoute from './routes/employeeRoute.js'
import errorhandler from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

//Route Middlware
app.use("/api", employeeRoute)

//Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})

//Error Middleware
app.use(errorhandler)


//connecting to DB and start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

/*app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors());*/

