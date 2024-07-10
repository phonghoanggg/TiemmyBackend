const express = require("express")
const router = express.Router()
const ProductRouter = require('../controller/ProductController')
const { authMiddleWare , authUserMiddleWare} = require("../middleware/authMiddleware")

// Tạo mới sản phẩm
router.post('/create', ProductRouter.createProduct)
// update sản phẩm
router.put('/update/:id', ProductRouter.updateProduct)
// xem chi tiết
router.get('/get-details/:id', ProductRouter.getDetailsProduct)
// xóa
router.delete('/delete/:id',authMiddleWare, ProductRouter.deleteProduct)
router.get('/get-all', ProductRouter.getAllProduct)



module.exports = router