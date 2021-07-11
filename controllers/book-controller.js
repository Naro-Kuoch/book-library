const { query } = require('express');
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
exports.getBooks = async (req,res)=>{
    param = req.query
    var respond ={}
    console.log("req books", req.query)
    await bookModel.find().then(books =>{
        if(Object.keys(param).length != 0){
            let start = (param.page-1)*param.size
            let end = param.page*param.size
            respond.size = param.size
            respond.totalPages = Math.ceil(books.length/param.size)
            respond.totalElements = books.length
            respond.page = param.page
            respond.content = books.slice(start,end)
            res.json(respond)
        }else
            res.json(books)
    }).catch(err =>{
        console.log(err)
    })
}
exports.getBookById = async (req,res)=>{
    console.log("req book ", req.params.id)
    await bookModel.find({id:req.params.id}).then(book =>{
        console.log("got book",book)
        res.json(book)
    }).catch(err=>{
        console.log(err)
    })
}