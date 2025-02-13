const mongoose = require("mongoose")

const productschma = mongoose.Schema({
    Productname:{type:String, required:true},
    Productprice:{type:String, required:true},
    Productimage:[{type:String, required:true}],
})


const productmodel =  mongoose.model("product_collection", productschma)


module.exports = productmodel