const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const posts = [];

app.post('/events', async(req, res) => {
    try {
        let {data, type} = req.body;
        console.log('event recieved : ' + type);
        
        if(type === 'Remove Post') {
            if(data.status === 'rejected') {
                posts.pop();
                data.status = 'removed';
                console.log('post is removed');
            }
        }
        res.status(200).json({
            status : 'success',
            message : 'post updated',
        })
    } catch(err) {
        res.status(500).json({status : 'fail', message : 'server internal error'})
    }
})

app.get('/posts', async(req,res) => {
    try {
        console.log('posts : ' + posts);
        res.status(200).json({
            status : 'success',
            message : 'post created',
            count : posts.length,
            posts
        })
    } catch(err) {
        res.status(500).json({status : 'fail', message : 'server internal error'})
    }
})

app.post('/posts/create', async (req, res) => {
    try {
        const post = req.body.content;
        posts.push(post);
        let status = 'pending'
        await axios.post('http://event-bus-srv:4005/events', {
            type : 'Post Created',
            data : {
                post, status
            }
        }).catch ((error) => {
            console.error('Error making request:', error.message);
        })

        res.status(201).json({
            status : 'success',
            message : 'post created',
            post
        })
    } catch(err) {
        res.status(500).json({status : 'fail', message : 'server internal error'})
    }
})


app.listen(4000, (req, res) => {
    console.log('v57');
    console.log('posts on 4000');
})
