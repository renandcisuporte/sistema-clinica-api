import jsPDF, { CellConfig } from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'

export interface PdfGenerator {
  generate(data: Record<string, any>[]): Promise<Buffer>
}

export abstract class JsPdfGenerator implements PdfGenerator {
  protected readonly pdf: jsPDF

  constructor() {
    this.pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
  }

  abstract generate(data: Record<string, any>[]): Promise<Buffer>
}

type PdfProductProps = {
  name: string
  quantity: string
  price: string
}
export class PdfProduct extends JsPdfGenerator implements PdfGenerator {
  async generate(data: PdfProductProps[]): Promise<Buffer> {
    this.pdf.text('Relatório de Produtos', 100, 15, {
      maxWidth: 200,
      align: 'center'
    })

    const tableData: RowInput[] = []
    for (const item of data.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })) {
      const { name, quantity, price } = item

      tableData.push([
        {
          content: name,
          styles: { valign: 'middle' }
        },
        {
          content: quantity,
          styles: { halign: 'center', cellWidth: 25, valign: 'middle' }
        },
        {
          content: `R$: ${parseFloat(price).toFixed(2).replace('.', ',')}`,
          styles: { halign: 'center', valign: 'middle' }
        }
      ])
    }

    autoTable(this.pdf, {
      head: [
        [
          {
            content: 'Produto',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          },
          {
            content: 'Qtde (ml/unid)',
            styles: {
              fillColor: [105, 105, 105],
              valign: 'middle',
              halign: 'center'
            }
          },
          {
            content: 'Preço',
            styles: {
              fillColor: [105, 105, 105],
              valign: 'middle',
              halign: 'center'
            }
          }
        ]
      ],
      body: tableData,
      theme: 'grid',
      margin: { top: 20 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 255] }
    })

    const pdfOutput = this.pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  }
}

type PdfGeneratorProps = {
  serviceName: string
  productName: string
  productPrice: string
  productQuantity: string
  id: string
  clinicId: string
  productId: string
  serviceId: string
  rental: number
  rentalPrice: number
}

export class PdfProcedimentProduct
  extends JsPdfGenerator
  implements PdfGenerator
{
  private readonly cells: CellConfig[] = [
    {
      align: 'left',
      padding: 1,
      prompt: 'Categoria',
      width: 57,
      name: 'serviceName'
    },
    {
      align: 'left',
      padding: 1,
      prompt: 'Produto',
      width: 57,
      name: 'productName'
    },
    {
      align: 'center',
      padding: 1,
      prompt: 'QTDE',
      width: 25,
      name: 'productQuantity'
    },
    {
      align: 'center',
      padding: 1,
      prompt: 'Rendimento',
      width: 45,
      name: 'rental'
    },
    {
      align: 'center',
      padding: 1,
      prompt: 'Preço',
      width: 45,
      name: 'rentalPrice'
    }
  ]

  async generate(data: PdfGeneratorProps[]): Promise<Buffer> {
    this.pdf.text('Relatório de Procedimentos', 100, 15, {
      maxWidth: 200,
      align: 'center'
    })

    let group: string = ''
    const tableData: RowInput[] = []
    for (const item of data.sort((a, b) => {
      return a.serviceName.localeCompare(b.serviceName)
    })) {
      const {
        serviceName,
        productName,
        productQuantity,
        productPrice,
        rental,
        rentalPrice,
        serviceId
      } = item
      if (group !== serviceId) {
        group = serviceId
        tableData.push([
          {
            content: serviceName,
            styles: {
              halign: 'center',
              fillColor: [199, 199, 199],
              fontStyle: 'bold'
            },
            colSpan: 5
          }
        ])
      }

      tableData.push([
        {
          content: productName,
          styles: { valign: 'middle' }
        },
        {
          content: productQuantity,
          styles: { halign: 'center', valign: 'middle' }
        },
        {
          content: `R$: ${parseFloat(productPrice)
            .toFixed(2)
            .replace('.', ',')}`,
          styles: { halign: 'center', valign: 'middle' }
        },
        {
          content: rental,
          styles: { halign: 'center', cellWidth: 25, valign: 'middle' }
        },
        {
          content: `R$: ${rentalPrice.toFixed(2).replace('.', ',')}`,
          styles: { halign: 'center', valign: 'middle' }
        }
      ])
    }

    autoTable(this.pdf, {
      head: [
        [
          {
            content: 'Produto',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          },
          {
            content: 'Qtde (ml/unid)',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          },
          {
            content: 'Total',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          },
          {
            content: 'Rendimento',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          },
          {
            content: 'Valor Aplicação',
            styles: { fillColor: [105, 105, 105], valign: 'middle' }
          }
        ]
      ],
      body: tableData,
      theme: 'grid',
      margin: { top: 20 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 255] }
    })

    const pdfOutput = this.pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  }
}
