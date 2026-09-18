import 'dotenv/config';
import express from 'express';
import app from "./src/app.js";
import userRouter from './src/routes/userRouter.js';

//port conifguration
const PORT = process.env.E_PORT || 3000;

// React API calls
app.use(express.json());

app.use("/api/users", userRouter)


app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}!`);
});