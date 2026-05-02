import { prisma } from "../lib/prisma.js"

export const getAllTransaksi = async (req, res) => {
    try {
        const transaksi = await prisma.transaksi.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                detail_transaksi: {
                    include: {
                        barang: true
                    }
                }
            },
            orderBy: {
                tanggal_transaksi: 'desc'
            }
        })
        res.json({
            message: 'Berhasil mengambil semua transaksi',
            data: transaksi
        })
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        })
    }
}

export const createTransaksi = async (req, res) => {
    try {
        
        const { user_id, items } = req.body

        if (!user_id || !items || items.length === 0) {
            return res.status(400).json({ message: 'User ID dan items tidak boleh kosong' })
        }

        
        const transaksiResult = await prisma.$transaction(async (tx) => {
            let total_harga = 0;
            const detailTransaksiData = [];

            
            for (const item of items) {
                const barang = await tx.barang.findUnique({ where: { id: parseInt(item.barang_id) } });
                
                if (!barang) {
                    throw new Error(`Barang dengan ID ${item.barang_id} tidak ditemukan`);
                }
                
                if (barang.stok < item.jumlah) {
                    throw new Error(`Stok barang ${barang.nama_barang} tidak mencukupi (Sisa: ${barang.stok})`);
                }

                const subtotal = barang.harga * item.jumlah;
                total_harga += subtotal;

                detailTransaksiData.push({
                    barang_id: parseInt(item.barang_id),
                    jumlah: parseInt(item.jumlah),
                    harga_satuan: barang.harga,
                    subtotal: subtotal
                });

                
                await tx.barang.update({
                    where: { id: barang.id },
                    data: { stok: barang.stok - item.jumlah }
                });
            }

           
            const newTransaksi = await tx.transaksi.create({
                data: {
                    user_id: parseInt(user_id),
                    total_harga: total_harga,
                    detail_transaksi: {
                        create: detailTransaksiData
                    }
                },
                include: {
                    detail_transaksi: true
                }
            });

            return newTransaksi;
        });

        res.status(201).json({
            message: 'Transaksi berhasil dibuat',
            data: transaksiResult
        })
    } catch (error) {
        res.status(400).json({
            message: 'Terjadi kesalahan saat memproses transaksi',
            error: error.message
        })
    }
}
