const {successResponse , failResponse, errorResponse} = require('..//helpers/response')
const { v4: uuidv4 } = require('uuid')
const prodAndCatModel = require('../models/productsAndCategories')


// ADD APIs'
const addCategory = async(req, res) => {
    try{
        const {name} = req.body
        if(!name){
            return failResponse(req, res, "Enter name of category")
        }
        const category = new prodAndCatModel.category({
            id : uuidv4(),
            name
        })
        const result = await category.save()
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const addSubCategory = async(req, res) => {
    try{
        const {name, categoryId} = req.body
        if((!name) || (!categoryId)){
            return failResponse(req, res, "Enter name and categoryId of subCategory")
        }
        const subCategory = new prodAndCatModel.subCategory({
            id : uuidv4(),
            categoryId,
            name
        })
        const result = await subCategory.save()
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const addSubChildCategory = async(req, res) => {
    try{
        const {name, categoryId, subCategoryId} = req.body
        if((!name) || (!categoryId) || (!subCategoryId)){
            return failResponse(req, res, "Enter name ,categoryId  and subCategoryId of subChildCategory")
        }
        const subChildCategory = new prodAndCatModel.subChildCategory({
            id : uuidv4(),
            categoryId,
            subCategoryId,
            name
        })
        const result = await subChildCategory.save()
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const addGenderCategory = async(req, res) => {
    try{
        const {name} = req.body
        if(!name){
            return failResponse(req, res, "Enter name genderCategory")
        }
        const genderCategory = new prodAndCatModel.genderCategory({
            id : uuidv4(),
            name
        })
        const result = await genderCategory.save()
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const addProduct = async(req, res) => {
    try{
       const {imageUrl , title, description, amount, genderId, categoryId, subCategoryId, subChildCategoryId} = req.body
       if((!imageUrl)  || (!title) || (!description) || (!amount) || (!genderId) || (!categoryId) || (!subCategoryId) || (!subChildCategoryId)){
        return failResponse(req, res, "Enter imageUrl , title, description, amount, genderId, categoryId, subCategoryId and subChildCategoryId")
       }
       const products = new prodAndCatModel.products({
        id : uuidv4(),
        imageUrl , title, description, amount, genderId, categoryId, subCategoryId, subChildCategoryId
       })
       const result = await products.save()
       return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

// GET APIs' 
const getAllCategory = async(req, res) => {
    try{
        const result = await prodAndCatModel.category.find()
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const getAllSubCategory = async(req, res) => {
    try{
        const id = req.params.id
        const result = await prodAndCatModel.subCategory.find({
            categoryId : id
        })
       return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const getAllSubChildCategory = async(req, res) => {
    try{
        const id = req.params.id
        const result = await prodAndCatModel.subChildCategory.find({
            subCategoryId : id
        })
       return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const getAllGenderCategory = async(req, res) => {
    try{
       const result = await prodAndCatModel.genderCategory.find()
       return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const getAllProducts = async(req, res) => {
    try{
        let {title} = req.body
       const result = await prodAndCatModel.products.find({
        "title" : new RegExp(title,'i')
       })
       return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

// EDIT APIs' 
const editCategory = async(req, res) => {
    try{
        const {id} = req.body
        if(!id){
            return failResponse(req, req, "Please enter category id")
        }
        const data = await prodAndCatModel.category.updateOne({id}, {
            $set : {
                ...req.body
            }
        })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const editSubCategory = async(req, res) => {
    try{
        const {id} = req.body
        if(!id){
            return failResponse(req, req, "Please enter sub-category id")
        }
        const data = await prodAndCatModel.subCategory.updateOne({id}, {
            $set : {
                ...req.body
            }
        })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const editSubChildCategory = async(req, res) => {
    try{
        const {id} = req.body
        if(!id){
            return failResponse(req, req, "Please enter subChildCategory id")
        }
        const data = await prodAndCatModel.subChildCategory.updateOne({id}, {
            $set : {
                ...req.body
            }
        })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const editGenderCategory = async(req, res) => {
    try{
        const {id} = req.body
        if(!id){
            return failResponse(req, req, "Please enter gender category id")
        }
        const data = await prodAndCatModel.genderCategory.updateOne({id}, {
            $set : {
                ...req.body
            }
        })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const editProduct = async(req, res) => {
    try{
        const {id} = req.body
        if(!id){
            return failResponse(req, req, "Please enter product id")
        }
        const data = await prodAndCatModel.products.updateOne({id}, {
            $set : {
                ...req.body
            }
        })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

// DELETE APIs'
const deleteCategory = async(req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return failResponse(req, req, "Please enter category id to be deleted")
        }
        const result = await prodAndCatModel.category.remove({id})
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const deleteSubCategory = async(req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return failResponse(req, req, "Please enter sub category id to be deleted")
        }
        const result = await prodAndCatModel.subCategory.remove({id})
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const deleteSubChildCategory = async(req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return failResponse(req, req, "Please enter sub child category id to be deleted")
        }
        const result = await prodAndCatModel.subChildCategory.remove({id})
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const deleteGenderCategory = async(req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return failResponse(req, req, "Please enter gender id to be deleted")
        }
        const result = await prodAndCatModel.genderCategory.remove({id})
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const deleteProduct = async(req, res) => {
    try{
        const {id} = req.params
        if(!id){
            return failResponse(req, req, "Please enter product id to be deleted")
        }
        const result = await prodAndCatModel.products.remove({id})
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

module.exports = {
    addCategory,
    addSubCategory,
    addSubChildCategory,
    addGenderCategory,
    addProduct,
    getAllCategory,
    getAllSubCategory,
    getAllSubChildCategory,
    getAllGenderCategory,
    getAllProducts,
    editCategory,
    editSubCategory,
    editSubChildCategory,
    editGenderCategory,
    editProduct,
    deleteCategory,
    deleteSubCategory,
    deleteSubChildCategory,
    deleteGenderCategory,
    deleteProduct
}