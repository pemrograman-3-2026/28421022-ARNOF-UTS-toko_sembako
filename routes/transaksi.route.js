import express from 'express'

import { createTransaksi, getAllTransaksi, getTransaksiById, updateTransaksi, deleteTransaksi } from '../controller/transaksi.controller.js'

const router = express.Router()

router.get('/', getAllTransaksi)
router.post('/', createTransaksi)
router.get('/:id', getTransaksiById)
router.put('/:id', updateTransaksi)
router.delete('/:id', deleteTransaksi)

export default router