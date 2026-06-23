import { prisma } from "../lib/prisma.js"

export const getAllBarang = async (req, res) => {
    try {
        const barang = await prisma.barang.findMany({
            include: { kategori: true }
        });
        
        // Memastikan data yang dikirim ke frontend sudah bersih
        const dataBarang = barang.map(item => ({
            ...item,
            image: item.image || "" // Jika null/undefined, jadikan string kosong
        }));

        res.json({
            message: 'Berhasil mengambil semua barang',
            data: dataBarang
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
}

export const createBarang = async (req, res) => {
    try {
        const { nama_barang, harga, stok, kategori_id } = req.body
        const image = req.file ? req.file.filename : null 

        if (!nama_barang || harga === undefined || stok === undefined || !kategori_id) {
            return res.status(400).json({ message: 'Semua field (nama_barang, harga, stok, kategori_id) wajib diisi' })
        }

        const newBarang = await prisma.barang.create({
            data: {
                nama_barang,
                harga: parseInt(harga),
                stok: parseInt(stok),
                kategori_id: parseInt(kategori_id),
                image 
            }
        })

        res.status(201).json({
            message: 'Barang berhasil ditambahkan',
            data: newBarang
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan barang',
            error: error.message
        })
    }
}

export const updateBarang = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { nama_barang, harga, stok, kategori_id } = req.body
        const image = req.file ? req.file.filename : undefined

        const existingBarang = await prisma.barang.findUnique({ where: { id } })
        if (!existingBarang) {
            return res.status(404).json({ message: 'Barang tidak ditemukan' })
        }

        const updatedBarang = await prisma.barang.update({
            where: { id },
            data: {
                nama_barang: nama_barang || existingBarang.nama_barang,
                harga: harga !== undefined ? parseInt(harga) : existingBarang.harga,
                stok: stok !== undefined ? parseInt(stok) : existingBarang.stok,
                kategori_id: kategori_id !== undefined ? parseInt(kategori_id) : existingBarang.kategori_id,
                image: image !== undefined ? image : existingBarang.image 
            }
        })

        res.json({
            message: 'Barang berhasil diupdate',
            data: updatedBarang
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengupdate barang',
            error: error.message
        })
    }
}

export const deleteBarang = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const existingBarang = await prisma.barang.findUnique({ where: { id } })
        if (!existingBarang) {
            return res.status(404).json({ message: 'Barang tidak ditemukan' })
        }

        await prisma.barang.delete({ where: { id } })

        res.json({
            message: 'Barang berhasil dihapus'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus barang',
            error: error.message
        })
    }
}