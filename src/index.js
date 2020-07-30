const express = require('express')
const User = require('./models/user')
const Tasks = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter, taskRouter)

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port)
})

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(Error('Please upload a Word format'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'),(req, res) => {
    res.send()
})