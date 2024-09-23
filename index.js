process.on("uncaughtException", (err) => {
  console.log(err?.message || "Uncaught exception");
})


const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

const cors = require("cors");
const helmet = require("helmet")
const dotenv = require("dotenv")

dotenv.config();

const bookRouters = require("./routers/books")
const adminRouters = require("./routers/admin")
const errorHandlingMW = require("./middlewares/errors")



app.use(express.json())
app.use(cors());
app.use(helmet());

app.use("/api/books", bookRouters)
app.use("/api/admins", adminRouters)

app.use(errorHandlingMW);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
