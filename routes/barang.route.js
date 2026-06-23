import multer from 'multer'
import express from 'express'
import { createBarang, deleteBarang, getAllBarang, updateBarang } from '../controller/barang.controller.js'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.get('/', getAllBarang)
router.post('/', upload.single('image'), createBarang)
router.put('/:id', upload.single('image'), updateBarang)
router.delete('/:id', deleteBarang)

export default router