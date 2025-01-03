import { ProductRepositoryImp } from '@/modules/products/prisma/repositories/implementation/product-repository'
import { ServiceInProductRepositoryImp } from '@/modules/services-in-products/prisma/repositories/implementation/service-in-product-repository'
import prisma from '@/shared/prisma'
import {
  PdfProcedimentProduct,
  PdfProduct
} from '@/shared/providers/pdf-generator'
import { Router } from 'express'
import { ReportPdfController } from '../controllers/report-pdf-controller'
import { ReportProcedimentProductUseCase } from '../use-cases/report-precediment-product-use-case'
import { ReportProductUseCase } from '../use-cases/report-product-use-case'

export const reportRouter = Router()

const productRepository = new ProductRepositoryImp(prisma)
const procedimentProductRepository = new ServiceInProductRepositoryImp(prisma)

const reportProductPfd = new PdfProduct()
const reportProcedimentProduct = new PdfProcedimentProduct()

const reportProductUseCase = new ReportProductUseCase(
  productRepository,
  reportProductPfd
)
const reportProcedimentProductUseCase = new ReportProcedimentProductUseCase(
  procedimentProductRepository,
  reportProcedimentProduct
)

const reportProductController = new ReportPdfController(
  reportProductUseCase,
  reportProcedimentProductUseCase
)

reportRouter.post(
  '/product-pdf',
  async (req, res) => await reportProductController.pdfProduct(req, res)
)

reportRouter.post(
  '/procediment-in-product',
  async (req, res) => await reportProductController.pdfProcediment(req, res)
)
