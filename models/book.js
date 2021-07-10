const {model,Schema} = require("mongoose");
const bookSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true

    },
    year:{
        type:String,
        require:true
    },
    realYears:{
        type:String,
        require:true
    },
    language:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    wikipediaLink:{
        type:String
    },
    imageUrl:{
        type:String
    }
}, {collection:'books'})
const book = model("books", bookSchema);
module.exports = book