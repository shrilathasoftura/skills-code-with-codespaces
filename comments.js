// Create Web Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Read comments.json
var comments = require('./comments.json');

// Get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
    var id = req.params.id;
    var comment = comments[id];
    res.json(comment);
});

// Create comment
app.post('/comments', function(req, res) {
    var comment = req.body;
    var id = comments.length;
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        res.json({message: 'Comment created', id: id});
    });
});

// Update comment
app.put('/comments/:id', function(req, res) {
    var id = req.params.id;
    var comment = req.body;
    comments[id] = comment;
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        res.json({message: 'Comment updated', id: id});
    });
});

// Delete comment
app.delete('/comments/:id', function(req, res) {
    var id = req.params.id;
    delete comments[id];
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        res.json({message: 'Comment deleted', id: id});
    });
});

// Start server
app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});