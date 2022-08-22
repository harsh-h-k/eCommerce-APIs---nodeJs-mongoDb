const express = require('express')
const router = express.Router()
const productsCont = require("../controller/productsCont")

// Add - category, subCategory, subChildCategory, genderCategory and products 
router.post("/addCategory", productsCont.addCategory)
router.post("/addSubCategory", productsCont.addSubCategory)
router.post("/addSubChildCategory", productsCont.addSubChildCategory)
router.post("/addGenderCategory", productsCont.addGenderCategory)
router.post("/addProduct", productsCont.addProduct)

// Get All categories, subCategories, subChildCategories, genderCategories, genderCategories and products ( filter by title of products )
router.get("/getAllCategory", productsCont.getAllCategory)
router.get("/getAllSubCategory/:id", productsCont.getAllSubCategory)
router.get("/getAllSubChildCategory/:id", productsCont.getAllSubChildCategory)
router.get("/getAllGenderCategory",  productsCont.getAllGenderCategory)
router.post("/getAllProducts", productsCont.getAllProducts)

// Edit all category, subCategory , subChildCategory, genderCategory and product 
router.post("/editCategory", productsCont.editCategory)
router.post("/editSubCategory", productsCont.editSubCategory)
router.post("/editSubChildCategory", productsCont.editSubChildCategory)
router.post("/editGenderCategory", productsCont.editGenderCategory)
router.post("/editProduct", productsCont.editProduct)

// Delete By id - category, subCategory , subChildCategory, genderCategory and product 
router.delete("/deleteCategory/:id", productsCont.deleteCategory)
router.delete("/deleteSubCategory/:id", productsCont.deleteSubCategory)
router.delete("/deleteSubChildCategory/:id", productsCont.deleteSubChildCategory)
router.delete("/deleteGenderCategory/:id", productsCont.deleteGenderCategory)
router.delete("/deleteProduct/:id", productsCont.deleteProduct)

module.exports = router