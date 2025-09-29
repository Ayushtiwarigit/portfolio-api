import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './app/dbConfig/dbConfig.js';
import setupRoutes from './app/routes/index.js';
// import morgan from 'morgan';
import mediasetup from "./app/routes/media.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(
  cors({
    origin: [
      "http://192.168.0.120:5173",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204
  })
);


app.use(express.json());

// app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, Ayush!');
});

connectDB(); 
setupRoutes(app);
mediasetup(app);

app.listen(PORT,HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});