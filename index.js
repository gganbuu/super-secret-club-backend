import app from "./src/app.js";

const PORT = process.env.E_PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}!`);
});