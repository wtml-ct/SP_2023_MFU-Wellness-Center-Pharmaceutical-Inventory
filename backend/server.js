// FOR LOCALHOST
const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv')
dotenv.config();

const indexRoutes = require("./routes/indexRoutes")

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Backend Application" });
});

app.use("/api",indexRoutes)

app.get("*", (req, res) => {
    res.status(404).send({ message : "404 Not Found"});
});

app.listen(process.env.PORT, () => {
    //   console.log(require('crypto').randomBytes(64).toString('hex'))
      console.log(`Server is running on port ${process.env.PORT}.`);
});