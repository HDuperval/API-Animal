import express from 'express';
import { getAllanimals, createAnimal, updateAnimal } from './src/animals.js';

const app = express()
app.use(express.json())

app.get('/animals', async (req, res) => {

    try{
        const result = await getAllanimals()
         res.status(200).send(result)
    } catch (error){
        res.status(500).send(error)
    }   
        
        //res.send('Dogs')
})    

app.post('/animals', async (req, res) => {
    const animal = req.body;

    try{
        const result = await createAnimal(animal)
        res.status(201).send(result)
    }catch(error){
         res.status(500).send(error)
}

})

app.patch('/animals/:id', async (req, res) => {
    const updateInput = req.body
    const { id } = req.params
    // const id = req.params.id  (same)

    if (!updateInput) {
        res.status(400).send("empty body")
        return
    }
    try {

        const result = await updateAnimal(id, updateInput)
        res.status(202).send(result)

    } catch (error) {
        res.status(500).send(error)
    }

})

const port = 5103
app.listen(port, () => {
    console.log(`We are listening ${port}`)
})

