const mongoose = require('mongoose');
// Connect to MongoDB
const dbUrl = "mongodb://localhost:27017/leave"
mongoose.connect(dbUrl)
.then(() => console.log('server connecteg to db successfully'))
.catch((err) => console.log(err));
