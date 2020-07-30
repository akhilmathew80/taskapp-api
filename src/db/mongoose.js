const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const me = new User({
//     name: "Micheal ",
//     email: "jul@gmail.com ",
//     password: "123Akhil "
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)
// })


// const task1 = new Tasks({
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log('Error', error)
// })