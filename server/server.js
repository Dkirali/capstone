const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users')

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(cors({ 
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
