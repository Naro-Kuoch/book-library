const {model,Schema} = require("mongoose");
const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
}, {collection:'books'})
const book = model("books", bookSchema);
module.exports = book