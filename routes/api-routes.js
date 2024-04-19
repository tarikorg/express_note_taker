const router = require('express').Router()
const {v4: generateID}= require('uuid')
const fs = require('fs/promises');

// read the json file but make it a function to call it when needed
async function readData(){
    const data = await fs.readFile('./db/db.json', 'utf-8')
    let parsedData = JSON.parse(data)
    return parsedData
}

// api/notes should read db.json and return data
// first get response will be the parsed json data out of readData
router.get('/notes', async (req, res)=>{
    const waitData = await readData()// readdata is a promise object so need await+async for this GET to work
    res.json(waitData)// respond the user the parse=>waited JSON data
})

// once user inputs data=> take the data=> add it to JSON file => respond back with updated one
// each one needs unique ID (will do it by npm uuid)

router.post('/notes', async (req,res)=>{
    const waitData = await readData()
    const id = generateID() // create and give unique id
    
    waitData.push({
        ...req.body,  //body of requested data(the user input) index.js has the body structure ready to deal with it
        id: id
    })
    
    // write the data in db.json
    await fs.writeFile('./db/db.json', JSON.stringify(waitData, null, 2))

    res.json(waitData)
})


//for bonus 
router.delete('/notes/:id', async(req, res)=>{
    const waitData = await readData() // read the current json we have
    const target = req.params.id // the target element's id we want to delete

    //the data after delete
    const currentData = waitData.filter((userObj) => userObj.id !== target)

    // respond with updated json if anything is deleted
    if(waitData.length > currentData.length){
      await fs.writeFile('./db/db.json', JSON.stringify(currentData, null, 2))
      res.json(currentData) //
    }


})

module.exports = router