const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");
console.log(config.db.uri);
mongoose.connect(config.db.uri)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
});