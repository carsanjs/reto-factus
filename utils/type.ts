import { FieldValues, Control, Path, FieldError } from "react-hook-form";

export interface typeInputRender<
  TFieldValues extends FieldValues = FieldValues
> {
  title: string;
  htmlFor: string;
  disabled?: boolean;
  control: Control<TFieldValues>;
  id: Path<TFieldValues>;
  type?: string;
  icon?: React.ReactNode;
  error?: FieldError | string;
  placeholder: string;
}

export interface formData {
  username: string;
  password: string;
}
export type UserType = {
  nombre: string;
  apellido: string;
  rol: string;
};

// Estado global de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserType | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

type AuthPayload = {
  isAuthenticated?: boolean;
  user?: UserType | null;
};

export type AuthAction = {
  type: string;
  payload?: AuthPayload;
};

///////// type de datos para api de factus //////////////////////////
export interface FactusConfig {
  apiKey: string;
  baseUrl: string;
  // testMode: boolean;
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
