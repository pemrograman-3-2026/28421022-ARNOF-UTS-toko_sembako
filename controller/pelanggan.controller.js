import { prisma } from "../lib/prisma.js"

export const getAllPelanggan = async (req, res) => {
    try {
        const pelanggan = await prisma.pelanggan.findMany()
        res.json({
            message: 'Berhasil mengambil semua pelanggan',
            data: pelanggan
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        })
    }
}

export const createPelanggan = async (req, res) => {
    try {
        const { nama, no_telp, alamat } = req.body

        if (!nama) {
            return res.status(400).json({ message: 'Nama pelanggan wajib diisi' })
        }

        const newPelanggan = await prisma.pelanggan.create({
            data: {
                nama,
                no_telp,
                alamat
            }
        })

        res.status(201).json({
            message: 'Pelanggan berhasil ditambahkan',
            data: newPelanggan
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan pelanggan',
            error: error.message
        })
    }
}

export const updatePelanggan = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { nama, no_telp, alamat } = req.body

        const existingPelanggan = await prisma.pelanggan.findUnique({ where: { id } })
        if (!existingPelanggan) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan' })
        }

        const updatedPelanggan = await prisma.pelanggan.update({
            where: { id },
            data: {
                nama: nama || existingPelanggan.nama,
                no_telp: no_telp !== undefined ? no_telp : existingPelanggan.no_telp,
                alamat: alamat !== undefined ? alamat : existingPelanggan.alamat
            }
        })

        res.json({
            message: 'Pelanggan berhasil diupdate',
            data: updatedPelanggan
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengupdate pelanggan',
            error: error.message
        })
    }
}

export const deletePelanggan = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const existingPelanggan = await prisma.pelanggan.findUnique({ where: { id } })
        if (!existingPelanggan) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan' })
        }

        await prisma.pelanggan.delete({ where: { id } })

        res.json({
            message: 'Pelanggan berhasil dihapus'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus pelanggan',
            error: error.message
        })
    }
}
