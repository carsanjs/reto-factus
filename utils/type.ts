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
  role: string;
  id: string;
  email: string;
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
  client_id: string;
  client_secret: string;
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

////// PAGINATION PAGES ///////
interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: [
    {
      url?: null;
      label: string;
      page?: null;
      active: false;
    }
  ];
}

///// OBNTENER NOTA CREDITOS
export interface NotaCreditoAll {
  id: number;
  api_client_name: string;
  reference_code: string;
  number: string;
  identification: string;
  graphic_representation_name: string;
  company?: string;
  trade_name?: null;
  names: string;
  email?: null;
  total: string;
  status: number;
  errors: [];
  send_email: number;
  created_at: string;
}
//// CREATED NOTA DE CREDITO
interface CreateNotaCredito {
  company: {
    url_logo: string;
    nit: string;
    dv: string;
    company: string;
    name: string;
    registration_code: string;
    economic_activity: string;
    phone: string;
    email: string;
    direction: string;
    municipality: string;
  };
  customer: {
    identification: string;
    dv?: null;
    graphic_representation_name: string;
    trade_name?: string;
    company?: string;
    names: string;
    address: string;
    email: string;
    phone: string;
    legal_organization: {
      id: number;
      code: string;
      name: string;
    };
    tribute: {
      id: number;
      code: string;
      name: string;
    };
    municipality: {
      id: number;
      code: string;
      name: string;
    };
  };
  credit_note: {
    id: number;
    number: string;
    reference_code: string;
    status: number;
    send_email: number;
    qr: string;
    cude: string;
    validated: string;
    discount_rate: string;
    discount: string;
    gross_value: string;
    taxable_amount: string;
    tax_amount: string;
    total: string;
    observation?: null;
    errors: [];
    created_at: string;
    qr_image: string;
    bill_id: number;
    cufe: string;
    number_bill: string;
    payment_method: {
      name: string;
      code: string;
    };
    customization_id: {
      code: string;
      name: string;
    };
    correction_concept: {
      code: string;
      name: string;
    };
  };
  items: [
    {
      code_reference: string;
      name: string;
      quantity: number;
      discount_rate: string;
      discount: string;
      gross_value: string;
      tax_rate: string;
      taxable_amount: string;
      tax_amount: string;
      price: string;
      is_excluded: number;
      unit_measure: {
        id: number;
        code: string;
        name: string;
      };
      standard_code: {
        id: number;
        code: string;
        name: string;
      };
      tribute: {
        id: number;
        code: string;
        name: string;
      };
      total: number;
      withholding_taxes: [];
    }
  ];
  withholding_taxes: [];
}
