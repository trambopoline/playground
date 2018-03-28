const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rdb = require('rethinkdb');
require('rethinkdb-init')(rdb);
require('dotenv').config();
// const rdb = require('./database');
const app = express();

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const listTableName = 'listItem';
let connection = null;

//Create the database and table if it doesn't exist already
rdb.init({
    host,
    port: dbPort,
    db: dbName
},
    [listTableName])
    .then(function (conn)
    {
        console.log(conn)
    });

rdb.connect({
    host,
    port: dbPort,
    db: dbName
}, function (err, conn)
    {
        if (err) throw err;
        connection = conn;
    });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({
        error: error.message
    });
});

const server = app.listen(port, function () {
    console.log(`App is listening on http://${host}:${port}`);
});

// Get the entire list
app.get('/list', function (req, res) {
    rdb.table(listTableName).run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
});

// Get specific list item
app.get('/list/:listItemKey', function (req, res) {
    const listItemKey = req.params.listItemKey;
    rdb.table(listTableName).get(listItemKey).run(connection, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json(result);
            return;
        }
        res.status(400).json({
            "error": `There is no list item with ID ${listItemKey}`
        });
    });
});

// Create a new list item
app.post('/list', function (req, res) {
    const newListItem = req.body.content;
    if (!newListItem) {
        res.status(400).json({
            "error": `Submitted list items must have a non-empty 'content' field`
        });
        return;
    }
    rdb.table(listTableName).insert({
        "content": newListItem
    }).run(connection, function (err, result) {
        if (err) throw err;
        if (result.inserted === 1) {
            res.json(result.generated_keys[0]);
            // console.log(result);
            return;
        }
    });
});

// Update a list item
app.put('/list/:listItemKey', function (req, res) {
    const listItemKey = req.params.listItemKey;
    const updatedListItem = req.body.content;
    if (!updatedListItem) {
        res.status(400).json({
            "error": `Submitted list items must have a non-empty 'content' field`
        });
        return;
    }
    rdb.table(listTableName).get(listItemKey).update({
        "content": updatedListItem
    }).run(connection, function (err, result) {
        if (err) throw err;
        if (result.replaced === 1 || result.unchanged === 1) {
            res.json(listItemKey);
            return;
        }
        res.status(400).json({
            "error": `There is no list item with ID ${listItemKey}`
        });
    });

});

// Delete a list item
app.delete('/list/:listItemKey', function (req, res) {
    const listItemKey = req.params.listItemKey;

    rdb.table(listTableName).get(listItemKey).delete().run(connection, function (err, result) {
        if (err) throw err;
        if (result.deleted === 1) {
            res.json(listItemKey);
            return;
        }
        res.status(400).json({
            "error": `There is no list item with ID ${listItemKey}`
        });
    });
});