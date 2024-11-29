const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/events', (req, res) => {
    let event = req.body

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(4000);
        console.log(err.message);
    })

    axios.post('http://modservice-srv:4004/events', event).catch((err) => {
        console.log(4004);
        console.log(err.message);
    })


    // without await it's like fire and forget method
    // no need to get response back from the localhost 4004, 
    // otherwise it will cause delay and will be like request response method,
    // ie without response it won't get further

    res.send({status : 'OK'});
})

app.listen(4005, () => {
    console.log('event bus on 4005');
})