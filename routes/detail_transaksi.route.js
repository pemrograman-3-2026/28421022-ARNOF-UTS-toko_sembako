import express from 'express'
import { getAllDetailTransaksi, deleteDetailTransaksi } from '../controller/detail_transaksi.controller.js'

const router = express.Router()

router.get('/', getAllDetailTransaksi)
router.delete('/:id', deleteDetailTransaksi)

export default router
