var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true },
    description: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;