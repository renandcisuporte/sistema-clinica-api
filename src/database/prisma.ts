import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['warn', 'error'] })
// .$extends({
//   query: {
//     $allModels: {
//       async findMany({ args, query }) {
//         const result: Record<string, any>[] = await query(args)
//         return result.map((item) => {
//           for (const key in item) {
//             if (item[key] instanceof Date) {
//               item[key] = format(item[key], 'yyyy-MM-dd HH:mm:ss', {
//                 locale: ptBR
//               })
//             }
//           }
//           return item
//         })
//       },
//       async findUnique({ args, query }) {
//         const result: any = await query(args)
//         for (const key in result) {
//           if (result[key] instanceof Date) {
//             result[key] = format(result[key], 'yyyy-MM-dd HH:mm:ss', {
//               locale: ptBR
//             })
//           }
//         }
//         return result
//       },
//       async create({ args, query }) {
//         const result: any = await query(args)
//         for (const key in result) {
//           if (result[key] instanceof Date) {
//             result[key] = format(result[key], 'yyyy-MM-dd HH:mm:ss', {
//               locale: ptBR
//             })
//           }
//         }
//         return result
//       },
//       async update({ args, query }) {
//         const result: any = await query(args)
//         for (const key in result) {
//           if (result[key] instanceof Date) {
//             result[key] = format(result[key], 'yyyy-MM-dd HH:mm:ss', {
//               locale: ptBR
//             })
//           }
//         }
//         return result
//       }
//     }
//   }
// })

export default prisma
