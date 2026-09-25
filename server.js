import 'dotenv/config';
import express from 'express';
import app from "./src/app.js";
import userRouter from './src/routes/userRouter.js';
import messagesRouter from './src/routes/messagesRouter.js';
//port conifguration
const PORT = process.env.E_PORT || 3000;

// React API calls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter)

app.use("/api/messages", messagesRouter)

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}!`);
});