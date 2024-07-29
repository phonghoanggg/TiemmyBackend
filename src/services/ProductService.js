const Product = require('../models/ProductModel')


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, image, type, price, countInStock,rating,description} = newProduct

        try {
            const checkProduct = await Product.findOne({
                name:name
            })
            if(checkProduct !== null) {
                resolve({
                    status:"ERR",
                    message:"The name of product is exist "
                })
            }
            const newsProduct = await Product.create({
                name, image, type, price, countInStock,rating,description
            })
            if(newsProduct) {
                resolve({
                    status:"OK",
                    message:"SUCCESS",
                    data: newsProduct
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}
const updateProduct = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null) {
                resolve({
                    status:"OK",
                    message:"The product is not defined "
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status:"OK",
                message:"SUCCESS",
                data: updatedProduct
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pruduct = await Product.findOne({
                _id: id
            })

            if(pruduct === null) {
                resolve({
                    status:"ERR",
                    message:"The pruduct is not defined "
                })
            }
            resolve({
                status:"OK",
                message:"get detail user success",
                data: pruduct
            })
        } catch(e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if(checkProduct === null) {
                resolve({
                    status:"OK",
                    message:"The deleted is not defined "
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status:"OK",
                message:"Delete product success",
            })
        } catch(e) {
            reject(e)
        }
    })
}
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})
            resolve({
                status:"OK",
                message:"Delete product success",
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getAllProduct = (limit, page, sort,filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            //  tổng số sản phẩm
            const totalProduct = await Product.count()
            // xử lý filter
            if(filter) {
                const label = filter[0]
                const allObjectFilter = await Product.find({[label]: {'$regex': filter[1]}}).limit(limit).skip(page  * limit)
                resolve({
                    status:"OK",
                    message:"Get filter product success",
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    // tổng số trang = tổng số sản phẩm / số sản phẩm 1 trang
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            // xử lý sort theo trường
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page  * limit).sort(objectSort)
                resolve({
                    status:"OK",
                    message:"Get all product success",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    // tổng số trang = tổng số sản phẩm / số sản phẩm 1 trang
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            // limit là tham sô hiển thị số sản phẩm trên 1 trang, skip là số phần tử sẽ bỏ qua đối với 1 mảng
            const allProduct = await Product.find().limit(limit).skip(page  * limit)
            resolve({
                status:"OK",
                message:"Get all product success",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                // tổng số trang = tổng số sản phẩm / số sản phẩm 1 trang
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch(e) {
            reject(e)
        }
    })
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct
}