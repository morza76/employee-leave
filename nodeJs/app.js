require("dotenv").config();
const express = require('express');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/api/userRoutes');
const leaveRoutes = require('./routes/api/leaveRoutes');
require('./configs/db')
const User = require('./models/User');
const { default: mongoose } = require('mongoose');
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const credentials = require("./middleware/credential");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
const ROLES_LIST = require("./configs/roles_list");
const leaveController = require("./controllers/leaveController");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/users', userRoutes);

// protected routes
app.use(verifyJWT);
app.use('/leaves', leaveRoutes)




app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use((err, res) => {
  res.status(404).send(err.message);
});

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(3000, () => console.log(`server is running on port 3000`));
  });
// app.listen(3000, () =>{
//     console.log('server runing on port 3000');
// })