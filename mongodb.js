//crud
// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
const {MongoClient,ObjectID}=require("mongodb")
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("unable to connect to db")
    }
    console.log("connected correctly")
    const db = client.db(databaseName)
    
    db.collection("tasks").deleteOne({
        description:"gym workout"
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    
})