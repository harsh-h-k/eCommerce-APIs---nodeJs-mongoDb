const mongoose = require('mongoose')

// Category --------------- (Cloth, footwear, watches)
const categorySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, { timestamps : true })

const category = mongoose.model("category", categorySchema)

// subCategory ---------------- (Tshirt, jeans, shoes, slippers, strap watch, smart watch)
const subCategorySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    categoryId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, { timestamps : true })

const subCategory = mongoose.model("subCategory", subCategorySchema)

// subChildCategory------------ (round neck , v neck ,ripped jeans, tempered jeans )
const subChildCategorySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    categoryId : {
        type : String,
        required : true
    },
    subCategoryId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, { timestamps : true })

const subChildCategory = mongoose.model("subChildCategory", subChildCategorySchema)

// genderCategory -------- (Men's , Kid's , Woman's )
const genderCategorySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, { timestamps : true })

const genderCategory = mongoose.model("genderCategory", genderCategorySchema)

// products --------- (final products)
const productSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    genderId: {
        type : String,
        required : true
    } ,
    categoryId : {
        type : String,
        required : true
    },
    subCategoryId : {
        type : String,
        required : true
    },
    subChildCategoryId : {
        type : String,
        required : true
    }
}, { timestamps : true })

const products = mongoose.model("products", productSchema)

module.exports = {
    category,
    subCategory,
    subChildCategory,
    genderCategory,
    products
}