import { prisma } from "../lib/prisma.js"

export const getAllDetailTransaksi = async (req, res) => {
    try {
        const data = await prisma.detail_transaksi.findMany()
        res.json({
            message: 'Berhasil mengambil semua detail transaksi',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        })
    }
}

export const deleteDetailTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.detail_transaksi.delete({
            where: { id: parseInt(id) }
        });
        res.json({
            message: 'Berhasil menghapus detail transaksi',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        })
    }
}
