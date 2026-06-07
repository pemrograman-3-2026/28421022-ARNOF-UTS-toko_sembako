import express from 'express'
import { createPelanggan, deletePelanggan, getAllPelanggan, updatePelanggan } from '../controller/pelanggan.controller.js'

const router = express.Router()

router.get('/', getAllPelanggan)
router.post('/', createPelanggan)
router.put('/:id', updatePelanggan)
router.delete('/:id', deletePelanggan)

export default router
