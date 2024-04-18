const express = require('express')
const fs = require('fs/promises')
const PORT = 3773

const app = express()

//let server know where the UI files at when user connects (middleware)
app.use(express.static('/public'))

app.use(express.json()) // allows to server and user interact with json

// send user the notes.html as a response once they are at that route
app.get('/notes',(req,res)=>{
    res.sendFile(__dirname+'/public/notes.html')
})

// if user connects to the server with any other possible route send them into index.html
app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.listen(PORT, ()=>{
    console.log('Server is running on port 3773')
})