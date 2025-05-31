import AxiosInstance from "@/lib/service/axios";
import { ENV } from "../../../utils/constants";
import { FactusConfig } from "../../../utils/type";
export class FactusAPI {
  private config: FactusConfig;
  private refresh_token_: string | null = null;
  private access_token_: string | null = null;
  private expires_in_: ReturnType<typeof setTimeout> | null = null;

  constructor(config: FactusConfig) {
    this.config = config;
  }

  // Autenticación con Factus
  async authenticateWithPassword(
    username: string,
    password: string
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }> {
    const formData = new FormData(); // format form-data
    formData.append("grant_type", "password");
    formData.append("client_id", this.config.client_id);
    formData.append("client_secret", this.config.client_secret);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const { data, statusText } = await AxiosInstance.post(
        ENV.ENDPOINTS.AUTH.AUTH,
        formData
      );
      if (!data) {
        throw Error(`Authentication failed: ${statusText}`);
      }
      this.access_token_ = data.access_token;
      this.refresh_token_ = data.refresh_token;
      this.setSesion(data.access_token, data.refresh_token);
      this.scheduleTokenRefresh(data.expires_in);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMe() {
    const access_token = this.getAccessToken();
    if (!access_token) throw new Error("No access token");
    return {
      user: {
        nombre: "Sand Box",
        email: "sandbox@factus.com.co",
        role: "Administrado",
        id: "3",
      },
    };
  }
  async refreshAccessToken(): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }> {
    const refreshToken = this.getRefreshToken();
    console.log(" existing refreshtoken ?? _>");
    if (!refreshToken) throw new Error("No existe refresh_token");
    const formDataRefresh = new FormData(); // format form-data
    formDataRefresh.append("grant_type", "refresh_token");
    formDataRefresh.append("client_id", this.config.client_id);
    formDataRefresh.append("client_secret", this.config.client_secret);
    formDataRefresh.append("refresh_token", refreshToken);
    try {
      const { data } = await AxiosInstance.post(
        ENV.ENDPOINTS.AUTH.AUTH,
        formDataRefresh
      );

      const { access_token, refresh_token, expires_in } = data;
      this.setSesion(access_token, refresh_token);
      this.scheduleTokenRefresh(expires_in);
      return data;
    } catch (error) {
      throw error;
    }
  }

  private scheduleTokenRefresh(expiresInSeconds: number) {
    if (this.expires_in_) {
      clearTimeout(this.expires_in_);
    }

    const refreshTime = (expiresInSeconds - 240) * 1000;

    this.expires_in_ = setTimeout(() => {
      this.refreshAccessToken().catch((err) => {
        console.error("Auto refresh failed:", err);
      });
    }, refreshTime);
  }

  private setSesion(accesstoken: string, refreshtoken: string) {
    if (accesstoken && refreshtoken) {
      AxiosInstance.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;
      AxiosInstance.defaults.headers.common.Accept = "application/json";
      this.setAcessToken(accesstoken);
      this.setRefreshToken(refreshtoken);
    }
  }

  setAcessToken(accesstoken: string) {
    console.log(" guardamos el accestoken en localstorage ");
    console.log(" accestoken en localstorage ", accesstoken);
    localStorage.setItem(ENV.JWT.ACCESSTOKEN, accesstoken);
    document.cookie = `${ENV.JWT.ACCESSTOKEN}=${accesstoken}; path=/; secure; samesite=strict`;
  }

  setRefreshToken(refreshtoken: string) {
    localStorage.setItem(ENV.JWT.REFRESHTOKEN, refreshtoken);
    document.cookie = `${ENV.JWT.REFRESHTOKEN}=${refreshtoken}; path=/; secure; samesite=strict`;
  }

  getAccessToken = () => localStorage.getItem(ENV.JWT.ACCESSTOKEN);

  getRefreshToken = () => localStorage.getItem(ENV.JWT.REFRESHTOKEN);

  removeSesion() {
    localStorage.removeItem(ENV.JWT.ACCESSTOKEN);
    localStorage.removeItem(ENV.JWT.REFRESHTOKEN);
    document.cookie = `${ENV.JWT.ACCESSTOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    document.cookie = `${ENV.JWT.REFRESHTOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    delete AxiosInstance.defaults.headers.common.Authorization;
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

// Tipos exportados
export type { FactusConfig, InvoiceData, FactusResponse };
