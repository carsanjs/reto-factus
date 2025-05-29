interface FactusConfig {
  apiKey: string;
  baseUrl: string;
  testMode: boolean;
}

interface InvoiceData {
  client: {
    name: string;
    nit: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
  }>;
  paymentMethod: string;
  paymentTerms: string;
  notes?: string;
  dueDate: string;
}

interface FactusResponse {
  success: boolean;
  data?: {
    cufe: string;
    number: string;
    status: string;
    trackingId: string;
    xmlUrl?: string;
    pdfUrl?: string;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

class FactusAPI {
  private config: FactusConfig;

  constructor(config: FactusConfig) {
    this.config = config;
  }

  // Autenticación con Factus
  async authenticate(): Promise<{ token: string; expiresIn: number }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: this.config.apiKey,
          testMode: this.config.testMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Factus authentication error:", error);
      throw error;
    }
  }

  // Crear y enviar factura a la DIAN
  async createInvoice(invoiceData: InvoiceData): Promise<FactusResponse> {
    try {
      // Primero autenticarse
      const auth = await this.authenticate();

      // Preparar datos para Factus
      const factusInvoiceData = {
        invoice: {
          type: "01", // Factura de venta
          currency: "COP",
          client: {
            identification: {
              type: "31", // NIT
              number: invoiceData.client.nit.replace(/[^0-9]/g, ""),
              checkDigit: this.calculateCheckDigit(invoiceData.client.nit),
            },
            name: invoiceData.client.name,
            email: invoiceData.client.email,
            phone: invoiceData.client.phone,
            address: {
              street: invoiceData.client.address,
              city: invoiceData.client.city,
              country: "CO",
            },
          },
          items: invoiceData.items.map((item, index) => ({
            id: index + 1,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
            taxAmount: (item.quantity * item.unitPrice * item.taxRate) / 100,
            totalAmount:
              item.quantity * item.unitPrice +
              (item.quantity * item.unitPrice * item.taxRate) / 100,
          })),
          payment: {
            method: this.mapPaymentMethod(invoiceData.paymentMethod),
            terms: invoiceData.paymentTerms,
            dueDate: invoiceData.dueDate,
          },
          notes: invoiceData.notes || "",
        },
      };

      // Enviar a Factus
      const response = await fetch(`${this.config.baseUrl}/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(factusInvoiceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: errorData.message || "Error creating invoice",
            details: errorData,
          },
        };
      }

      const responseData = await response.json();

      return {
        success: true,
        data: {
          cufe: responseData.cufe,
          number: responseData.number,
          status: responseData.status,
          trackingId: responseData.trackingId,
          xmlUrl: responseData.xmlUrl,
          pdfUrl: responseData.pdfUrl,
        },
      };
    } catch (error) {
      console.error("Factus API error:", error);
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Error connecting to Factus API",
          details: error,
        },
      };
    }
  }

  // Consultar estado de factura
  async getInvoiceStatus(cufe: string): Promise<FactusResponse> {
    try {
      const auth = await this.authenticate();

      const response = await fetch(
        `${this.config.baseUrl}/invoices/${cufe}/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get invoice status: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          cufe: data.cufe,
          number: data.number,
          status: data.status,
          trackingId: data.trackingId,
        },
      };
    } catch (error) {
      console.error("Error getting invoice status:", error);
      return {
        success: false,
        error: {
          code: "STATUS_ERROR",
          message: "Error getting invoice status",
          details: error,
        },
      };
    }
  }

  // Descargar PDF de factura
  async downloadInvoicePDF(cufe: string): Promise<Blob | null> {
    try {
      const auth = await this.authenticate();

      const response = await fetch(
        `${this.config.baseUrl}/invoices/${cufe}/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return null;
    }
  }

  // Descargar XML de factura
  async downloadInvoiceXML(cufe: string): Promise<string | null> {
    try {
      const auth = await this.authenticate();

      const response = await fetch(
        `${this.config.baseUrl}/invoices/${cufe}/xml`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download XML: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error("Error downloading XML:", error);
      return null;
    }
  }

  // Funciones auxiliares
  private calculateCheckDigit(nit: string): string {
    const cleanNit = nit.replace(/[^0-9]/g, "");
    const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    let sum = 0;

    for (let i = 0; i < cleanNit.length; i++) {
      sum += Number.parseInt(cleanNit[i]) * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? remainder.toString() : (11 - remainder).toString();
  }

  private mapPaymentMethod(method: string): string {
    const methodMap: { [key: string]: string } = {
      cash: "10", // Efectivo
      transfer: "42", // Transferencia
      check: "20", // Cheque
      credit: "1", // Crédito
    };
    return methodMap[method] || "10";
  }
}

// Función para crear instancia de la API
export function createFactusAPI(config: FactusConfig): FactusAPI {
  return new FactusAPI(config);
}

// Tipos exportados
export type { FactusConfig, InvoiceData, FactusResponse };
