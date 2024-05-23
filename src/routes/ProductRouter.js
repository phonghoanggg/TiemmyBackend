const express = require("express")
const router = express.Router()
const ProductRouter = require('../controller/ProductController')
const { authUserMiddleWare } = require("../middleware/authMiddleware")

// Tạo mới sản phẩm
router.post('/create', ProductRouter.createProduct)
// update sản phẩm
router.put('/update/:id',authUserMiddleWare, ProductRouter.updateProduct)
// xem chi tiết
router.get('/get-details/:id', ProductRouter.getDetailsProduct)
// xóa
router.delete('/delete/:id', ProductRouter.deleteProduct)
router.get('/get-all', ProductRouter.getAllProduct)



module.exports = router