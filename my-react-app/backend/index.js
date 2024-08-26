const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 5000;
var cors = require('cors')

connectToMongo();
 app.use(cors())

// Middleware
app.use(express.json());


// Available routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
