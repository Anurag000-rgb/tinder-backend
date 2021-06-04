import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

const app = express();
const port = process.env.PORT || 8000
const connection_url = `mongodb+srv://admin:4jso7onYUxJCZD3c@cluster0.t5cls.mongodb.net/tinderdb?retryWrites=true&w=majority`;

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

app.get('/', (req, res) => {
    res.status(200).send('Hey.. This is the backend server of tinder 🔥 MERN stack; visit --> https://tinder-mernstack.netlify.app')
})

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/card', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})