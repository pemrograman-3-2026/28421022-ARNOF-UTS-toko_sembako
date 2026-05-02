import express from 'express'
import { createBarang, deleteBarang, getAllBarang, updateBarang } from '../controller/barang.controller.js'

const router = express.Router()

router.get('/', getAllBarang)
router.post('/', createBarang)
router.put('/:id', updateBarang)
router.delete('/:id', deleteBarang)

export default router
