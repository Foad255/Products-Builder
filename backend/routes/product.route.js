import express from 'express'

import {createProducts, getProducts, updateProducts, deleteProducts} from '../controllers/product.controller.js'


const router = express.Router()


router.post('/', createProducts)

router.get('/', getProducts)

router.delete('/:id',deleteProducts)

router.patch('/:id' , updateProducts)

export default router