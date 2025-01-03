import jsPDF, { CellConfig } from 'jspdf'

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

export class PdfProduct extends JsPdfGenerator implements PdfGenerator {
  private readonly cells: CellConfig[] = [
    {
      align: 'left',
      padding: 1,
      prompt: 'Nome Produto',
      width: 157,
      name: 'name'
    },
    {
      align: 'center',
      padding: 1,
      prompt: 'QTDE',
      width: 50,
      name: 'quantity'
    },
    {
      align: 'center',
      padding: 1,
      prompt: 'Preço',
      width: 45,
      name: 'price'
    }
  ]

  async generate(data: Record<string, any>[]): Promise<Buffer> {
    this.pdf.text('Relatório de Produtos', 100, 15, {
      maxWidth: 200,
      align: 'center'
    })

    data.map((item) => {
      item.price = `R$ ${item.price.replace('.', ',')}`
    })

    this.pdf.table(10, 20, data, this.cells, {
      autoSize: false,
      padding: 2
    })

    const pdfOutput = this.pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  }
}
