import express from 'express'
import UserRoute from './routes/user.route.js'
import KategoriRoute from './routes/kategori.route.js'
import BarangRoute from './routes/barang.route.js'
import TransaksiRoute from './routes/transaksi.route.js'
import DetailTransaksiRoute from './routes/detail_transaksi.route.js'
import PelangganRoute from './routes/pelanggan.route.js'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const imagePath = express.static(path.join(process.cwd(), 'uploads'))
app.use('/image', imagePath)


app.get('/', (req, res) => {
    res.send("Toko Sembako is running!")
})

app.use('/user', UserRoute)
app.use('/kategori', KategoriRoute)
app.use('/barang', BarangRoute)
app.use('/transaksi', TransaksiRoute)
app.use('/detail_transaksi', DetailTransaksiRoute)
app.use('/pelanggan', PelangganRoute)

app.listen(3100, () => {
    console.log('Server started')
})