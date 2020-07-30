// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true  }, (error, client) => {
    if(error){
        return console.log('Connection to database failed!');
    }

    const db = client.db(databaseName)
    /*db.collection('users').findOne({name: 'Akhil', age: 2}, (error, result) => {
        if(error){
            return console.log('Unable to find user')
        }

        console.log(result)
    })

    db.collection('users').find({ name: 'Amal'}).toArray((error, users) => {
        if(error){
            console.log('Unable to find users!')
        }
        console.log(users)
    })

    db.collection('tasks').findOne({ _id: new ObjectID('5f152c370b7d6c48cc407bcd')}, (error, tasks) => {
            if(error){
                console.log('Unable to find users!')
            }
            console.log(tasks)
        })
    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5f152ac44def411b9ca9795a")
    },{
        $inc: {
            age: 9
        }
    })

    updatePromise.then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed: false
    },
    {
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })*/

    /*db.collection('users').deleteOne({
        name: 'Mathew'
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })*/

    db.collection('users').deleteMany({
        name: 'Akhil'
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })
})