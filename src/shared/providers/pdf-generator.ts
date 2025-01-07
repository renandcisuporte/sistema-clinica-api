import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

export abstract class JsPdfGenerator implements PdfGenerator {
  protected pdf!: jsPDF;

  constructor() {
    this.init();
  }

  abstract generate(data: Record<string, any>[]): Promise<Buffer>;

  protected init() {
    this.pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  }

  // Adiciona cabeçalho
  protected addHeader(text: string) {
    this.pdf.setFontSize(12);
    this.pdf.setFillColor(202, 202, 202);
    this.pdf.rect(0, 0, 212, 15, "F");

    const pageWidth = this.pdf.internal.pageSize.getWidth(); // Largura da página
    const textWidth = this.pdf.getTextWidth(text); // Largura do texto
    const x = (pageWidth - textWidth) / 2; // Posição X centralizada
    this.pdf.text(text, x, 7);
  }

  // Adiciona rodapé
  protected addFooter(pageNumber: number, pageTotal: string = "") {
    const pageHeight = this.pdf.internal.pageSize.height - 10;
    this.pdf.setFontSize(8);
    this.pdf.text(
      `Gerado em: ${new Date().toLocaleDateString()}\nPágina ${pageNumber} de ${pageTotal}`,
      5,
      pageHeight,
    );
    this.pdf.text(
      `DClinicas - By Data Control Informatica (16) 3262-1365 / (16) 16 99716-6880`,
      205,
      pageHeight,
      {
        align: "right",
      },
    );
  }
}

export class PdfProduct extends JsPdfGenerator implements PdfGenerator {
  async generate(data: PdfProductProps[]): Promise<Buffer> {
    const tableData: RowInput[] = [];

    for (const item of data) {
      const { name, quantity, price } = item;

      tableData.push([
        {
          content: name,
          styles: { valign: "middle" },
        },
        {
          content: quantity,
          styles: { halign: "center", cellWidth: 25, valign: "middle" },
        },
        {
          content: `R$: ${parseFloat(price).toFixed(2).replace(".", ",")}`,
          styles: { halign: "center", valign: "middle" },
        },
      ]);
    }

    this.init();
    this.addHeader("RELATÓRIO DE PRODUTOS");
    autoTable(this.pdf, {
      head: [
        [
          {
            content: "Produto",
            styles: { valign: "middle" },
          },
          {
            content: "Qtde (ml/unid)",
            styles: {
              valign: "middle",
              halign: "center",
            },
          },
          {
            content: "Preço",
            styles: {
              valign: "middle",
              halign: "center",
            },
          },
        ],
      ],
      body: tableData,
      theme: "grid",
      margin: { top: 20, left: 5, right: 5 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 140, 115] },
      didDrawPage: () => {
        const pageNumber = this.pdf.getNumberOfPages();
        this.addHeader("RELATÓRIO DE PRODUTOS");
        this.addFooter(pageNumber, "{total_page}");
      },
    });

    this.pdf.putTotalPages("{total_page}");
    const pdfOutput = this.pdf.output("arraybuffer");
    return Buffer.from(pdfOutput);
  }
}

export class PdfProcedimentProduct
  extends JsPdfGenerator
  implements PdfGenerator
{
  async generate(items: PdfGeneratorProps[]): Promise<Buffer> {
    let headGroup = "";
    let groupTotal = 0;
    const tableData: RowInput[] = [];
    for (const item of items) {
      const nextItem = items[items.indexOf(item) + 1];

      const {
        serviceName,
        productName,
        productQuantity,
        productPrice,
        rental,
        rentalPrice,
        serviceId,
      } = item;
      if (headGroup !== serviceId) {
        headGroup = serviceId;
        tableData.push([
          {
            content: serviceName,
            styles: {
              halign: "center",
              fillColor: [105, 105, 105],
              textColor: "#fff",
              fontStyle: "bold",
            },
            colSpan: 5,
          },
        ]);
      }

      tableData.push([
        {
          content: productName,
          styles: { valign: "middle" },
        },
        {
          content: productQuantity,
          styles: { halign: "center", valign: "middle" },
        },
        {
          content: `R$: ${parseFloat(productPrice)
            .toFixed(2)
            .replace(".", ",")}`,
          styles: { halign: "center", valign: "middle" },
        },
        {
          content: rental,
          styles: { halign: "center", cellWidth: 25, valign: "middle" },
        },
        {
          content: `R$: ${rentalPrice.toFixed(2).replace(".", ",")}`,
          styles: { halign: "right", valign: "middle" },
        },
      ]);

      groupTotal += +rentalPrice;
      if (!nextItem || nextItem.serviceId !== serviceId) {
        tableData.push([
          {
            content: `Total do Grupo: R$ ${groupTotal
              .toFixed(2)
              .replace(".", ",")}`,
            styles: {
              halign: "right",
              fillColor: [240, 240, 240],
              fontSize: 12,
              fontStyle: "bold",
            },
            colSpan: 5,
          },
        ]);
        groupTotal = 0; // Resetar o total do grupo
      }
    }

    this.init();
    this.addHeader("RELATÓRIO DE PROCEDIMENTO");
    autoTable(this.pdf, {
      head: [
        [
          {
            content: "Produto",
            styles: { fillColor: [25, 140, 115], valign: "middle" },
          },
          {
            content: "Qtde (ml/unid)",
            styles: {
              fillColor: [25, 140, 115],
              valign: "middle",
              halign: "center",
            },
          },
          {
            content: "Total",
            styles: {
              fillColor: [25, 140, 115],
              valign: "middle",
              halign: "center",
            },
          },
          {
            content: "Rendimento",
            styles: { fillColor: [25, 140, 115], valign: "middle" },
          },
          {
            content: "Valor Aplicação",
            styles: {
              fillColor: [25, 140, 115],
              valign: "middle",
              halign: "center",
            },
          },
        ],
      ],
      body: tableData,
      theme: "grid",
      margin: { top: 20, left: 5, right: 5 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 140, 115] },
      didDrawPage: () => {
        const pageNumber = this.pdf.getNumberOfPages();
        this.addHeader("RELATÓRIO DE PROCEDIMENTO");
        this.addFooter(pageNumber, "{total_page}");
      },
    });

    this.pdf.putTotalPages("{total_page}");

    const pdfOutput = this.pdf.output("arraybuffer");
    return Buffer.from(pdfOutput);
  }
}

export interface PdfGenerator {
  generate(data: Record<string, any>[]): Promise<Buffer>;
}

type PdfProductProps = {
  name: string;
  quantity: string;
  price: string;
};

type PdfGeneratorProps = {
  serviceName: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  id: string;
  clinicId: string;
  productId: string;
  serviceId: string;
  rental: number;
  rentalPrice: number;
};
