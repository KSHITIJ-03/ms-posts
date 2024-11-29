const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/events', async (req, res) => {
    try {
        console.log('event recieved : ' + req.body.type);
        
        if(req.body.type === 'Post Created') {
            let {data} = req.body;
            if(data.post.includes('orange')) {
                data.status = 'rejected'
                await axios.post('http://event-bus-srv:4005/events', {
                    type : 'Remove Post',
                    data
                })
            } else {
                data.status = 'approved';
                await axios.post('http://event-bus-srv:4005/events', {
                    type : 'Remove Post',
                    data
                })
            }
        } else {
            console.log(false);
        }

        res.status(200).json({})
    } catch(err) {
        res.status(500).json("message : server internal error")
    }
})

app.listen(4004, () => {
    console.log('modService on port : 4004');
})