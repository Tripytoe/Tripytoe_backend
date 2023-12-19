const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongo = require("./config/db.js");
const multer = require("multer");
const User = require("./models/User");
const path = require("path");

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To Back-End");
});

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/user/upload/:id", upload.single("file"), async (req, res) => {
  console.log("req.body: ", req.body);
  const imageName = req.file.filename;
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        profile: imageName,
      }
    );
    return res.status(201).json({ result: user });
  } catch (err) {
    return res.status(500).json({ error: err, message: "Something went wrong while updating profile" });
  }
});

app.use("/user", require("./routes/user.js"));
app.use("/config", require("./routes/config.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
