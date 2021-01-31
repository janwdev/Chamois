"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.dbDeletedUsers = exports.dbTweets = exports.dbUsers = void 0;
const Mongo = require("mongodb");
const secret = require("./secrets");
let dbUsersCollectionName = "Users";
let dbTweetsCollectionName = "Chamis";
let dbDeletedUsersCollectionName = "UsersDel";
let databaseName = "Chamoise";
async function connectToDatabase() {
    let databaseUrl;
    let startArgs = process.argv.slice(2);
    console.log(startArgs);
    switch (startArgs[0]) {
        case "local":
            databaseUrl = "mongodb://localhost:27017";
            console.log("running local");
            break;
        case "remote":
            databaseUrl = "mongodb+srv://" + secret.dbServerUserName + ":" + secret.dbServerPW + "@chamois.d7p8p.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";
            console.log("running remote");
            break;
        default:
            console.log("no or wrong argument given, running local");
            databaseUrl = "mongodb://localhost:27017";
    }
    let options = { useNewUrlParser: true, useUnifiedTopology: true }; // Vorgegeben, danach suchen
    let mongoClient = new Mongo.MongoClient(databaseUrl, options);
    await mongoClient.connect();
    exports.dbUsers = mongoClient.db(databaseName).collection(dbUsersCollectionName);
    exports.dbTweets = mongoClient.db(databaseName).collection(dbTweetsCollectionName);
    exports.dbDeletedUsers = mongoClient.db(databaseName).collection(dbDeletedUsersCollectionName);
    console.log("Database connection", exports.dbUsers != undefined);
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map