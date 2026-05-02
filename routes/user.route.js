import express from "express"

import { login, register, getAllUsers, updateUser, deleteUser } from "../controller/user.controller.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)


router.get('/', getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router