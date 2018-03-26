 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const port = 8080;
 const dummyList = require('./dummy.json');

 app.use(bodyParser.json());

 // start the server
 app.listen(port, function () {
     console.log(`Development server is running at https://localhost:${port}`);
 });

 // Get the entire list
 app.get('/list', function (req, res) {
     res.json(dummyList)
 });

 // Get specific list item
 app.get('/list/:listItemIndex', function (req, res) {
     const listItemIndex = req.params.listItemIndex;
     if (dummyList[listItemIndex]) {
         res.json(dummyList[listItemIndex])
         return;
     }
     res.status(400).json({
         "error": `Cannot get the specified list item, because there is no list item with index: ${listItemIndex}`
     })
 });

 // Create a new list item
 app.post('/list', function (req, res) {
     const newListItem = req.body.content;

     if (newListItem) {
         dummyList.push({
             content: newListItem
         });
         console.log(dummyList);
         res.json(newListItem);
     }
 });

 // Update a list item
 app.put('/list/:listItemIndex', function (req, res) {
     const listItemIndex = req.params.listItemIndex;
     const updatedListItem = req.body.content;

     if (!updatedListItem) {
         res.status(400).json({
             "error": `Submitted list item cannot be empty`
         });
         return;
     }
     if (dummyList[listItemIndex]) {
         dummyList[listItemIndex] = {
             "content": updatedListItem
         };
         res.json(dummyList[listItemIndex]);

         return;
     }
     res.status(400).json({
         "error": `Cannot update that list item, because there is no item with index: ${listItemIndex}`
     })
 });

 // Delete a list item
 app.delete('/list/:listItemIndex', function (req, res) {
     const listItemIndex = req.params.listItemIndex;
     const updatedListItem = req.body.content;

     if (dummyList[listItemIndex]) {
         let removed = dummyList.splice(listItemIndex, 1);
         res.json({
             "message": "Success",
             "removed": removed
         });

         return;
     }
     res.status(400).json({
         "error": `Cannot delete that list item, because there is no item with index: ${listItemIndex}`
     })
 });