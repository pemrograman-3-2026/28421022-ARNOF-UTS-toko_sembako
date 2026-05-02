import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    try {
        const body = req.body
        const password = req.body.password

        const username = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })
        if (username) {
            return res.status(400).json({
                message: 'Username already exists'
            })
        }
        const hashPassword = bcrypt.hashSync(password, 12)

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                password: hashPassword,
                no_telp: body.no_telp,
                role: body.role || 'KASIR'
            }
        })

        res.status(201).json({
            message: 'User created successfully',
            data: { id: newUser.id, username: newUser.username, role: newUser.role }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const body = req.body
        const username = body.username
        const password = body.password

        const isusernameexist = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!isusernameexist) {
            return res.status(401).json({
                message: 'Username not found'
            })
        }

        const hashPassword = isusernameexist.password

        if (!bcrypt.compareSync(password, hashPassword)) {
            return res.status(401).json({
                message: 'Password not match'
            })
        }

        res.json({
            message: 'User logged in successfully',
            data: {
                id: isusernameexist.id,
                username: isusernameexist.username,
                role: isusernameexist.role,
                no_telp: isusernameexist.no_telp
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
}

// CRUD Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, role: true, no_telp: true, created_at: true }
        })
        res.json({ message: 'Success get all users', data: users })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { username, no_telp, role, password } = req.body

        const existingUser = await prisma.user.findUnique({ where: { id } })
        if (!existingUser) return res.status(404).json({ message: 'User not found' })

        const updateData = {
            username: username || existingUser.username,
            no_telp: no_telp !== undefined ? no_telp : existingUser.no_telp,
            role: role || existingUser.role
        }

        if (password) {
            updateData.password = bcrypt.hashSync(password, 12)
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            select: { id: true, username: true, role: true, no_telp: true }
        })

        res.json({ message: 'User updated successfully', data: updatedUser })
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const existingUser = await prisma.user.findUnique({ where: { id } })
        if (!existingUser) return res.status(404).json({ message: 'User not found' })

        await prisma.user.delete({ where: { id } })
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message })
    }
}