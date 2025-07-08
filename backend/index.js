import { createServer } from "http";

import app from "./app.js";
import connectToDb from "./db/db.js";

const server = createServer(app);

const PORT = process.env.PORT || 5000;

connectToDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  });