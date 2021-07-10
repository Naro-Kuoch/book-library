const bookModel = require('../models/book');
exports.addBook = (req,res)=>{
    const request = req.body
    console.log("req add book",request)
    const book = new bookModel({
        id:request.id,
        title:request.title,
        author:request.author,
        realYears:request.realYears,
        year:request.year,
        country:request.country,
        language:request.language,
        pages:request.pages,
        wikipediaLink:request.wikipediaLink,
        imageUrl:request.imageUrl
    })
    book.save().then(result => {
        console.log(result)
        res.send(book)
    }).catch(err=>{console.log(err)})
}