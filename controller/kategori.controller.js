import { prisma } from "../lib/prisma.js"

export const getAllKategori = async (req, res) => {
    try {
        const kategori = await prisma.kategori.findMany()
        res.json({
            message: 'Berhasil mengambil semua kategori',
            data: kategori
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        })
    }
}

export const createKategori = async (req, res) => {
    try {
        const { nama_kategori, deskripsi } = req.body

        if (!nama_kategori) {
            return res.status(400).json({ message: 'Nama kategori wajib diisi' })
        }

        const newKategori = await prisma.kategori.create({
            data: {
                nama_kategori,
                deskripsi
            }
        })

        res.status(201).json({
            message: 'Kategori berhasil ditambahkan',
            data: newKategori
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan kategori',
            error: error.message
        })
    }
}

export const updateKategori = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { nama_kategori, deskripsi } = req.body

        const existingKategori = await prisma.kategori.findUnique({ where: { id } })
        if (!existingKategori) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' })
        }

        const updatedKategori = await prisma.kategori.update({
            where: { id },
            data: {
                nama_kategori: nama_kategori || existingKategori.nama_kategori,
                deskripsi: deskripsi !== undefined ? deskripsi : existingKategori.deskripsi
            }
        })

        res.json({
            message: 'Kategori berhasil diupdate',
            data: updatedKategori
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengupdate kategori',
            error: error.message
        })
    }
}

export const deleteKategori = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const existingKategori = await prisma.kategori.findUnique({ where: { id } })
        if (!existingKategori) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' })
        }

        await prisma.kategori.delete({ where: { id } })

        res.json({
            message: 'Kategori berhasil dihapus'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus kategori',
            error: error.message
        })
    }
}
