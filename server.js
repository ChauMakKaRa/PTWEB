const app = require("./app");

const config = require("./app/config");
const Mongodb = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await Mongodb.connect(config.db.uri);
        console.log("connected to the database");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    }catch (error) {
        console.log("cannot connectes to the database !", error);
        process.exit();     
    }
}

startServer();