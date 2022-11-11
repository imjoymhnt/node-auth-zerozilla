require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoute = require("./routes/User");

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB Connected")
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Alive",
  });
});

app.use("/", userRoute);

app.listen(4000, () => console.log("App is running.."));
