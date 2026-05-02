import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from '../generated/prisma/client.ts'

const adapter = new PrismaMariaDb({
    host: 'Localhost',
    user: 'root',
    password: '',
    database: 'db_uts_toko_sembako'
})

const prisma = new PrismaClient({ adapter})
export {prisma}