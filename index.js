import express from 'express';

const app = express()
app.use(express.json())

app.get('/animal', async (req, res) => {
    res.send('dogs')
})    

app.post('/animal', async (req, res) => {
    const race = req.body;
    res.send(`${race.name} has  been added`);

})

const port = 5103
app.listen(port, () => {
     console.log(`We are listening ${port}`)
})