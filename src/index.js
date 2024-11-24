const express = require("express");
require("dotenv").config();
const connectDb = require("./config/database");
const userRouter = require("./routes/userRouter");
const imageRouter = require("./routes/imageRouter");
const cors = require("cors");
const cardRouter = require("./routes/foodCardRouter");
const app = express();
const corsOptions = {
  origin: [process.env.LOCAL_FRONTEND_URL, process.env.FRONTEND_URL],
  method: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRouter);
app.use("/api/", imageRouter);
app.use("/api/", cardRouter);

connectDb()
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed" + err);
  });
