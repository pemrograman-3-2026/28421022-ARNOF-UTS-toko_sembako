import express from 'express'
import UserRoute from './routes/user.route.js'
import KategoriRoute from './routes/kategori.route.js'
import BarangRoute from './routes/barang.route.js'
import TransaksiRoute from './routes/transaksi.route.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Toko Sembako is running!")
})

app.use('/user', UserRoute)
app.use('/kategori', KategoriRoute)
app.use('/barang', BarangRoute)
app.use('/transaksi', TransaksiRoute)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})