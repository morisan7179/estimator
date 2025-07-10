// src/types.ts

export interface LineItem {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

export interface EstimateFormData {
  title: string;
  recipient: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  projectName: string;
  clientName: string;
  lineItems: LineItem[];
}

// ⬇️ 初期値定義（使い回せます）
export const EMPTY_LINE_ITEM: LineItem = {
  name: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  total: 0,
  notes: '',
};

export const INITIAL_FORM_DATA: EstimateFormData = {
  title: '',
  recipient: '',
  address: '',
  issueDate: '',
  expirationDate: '',
  notes: '',
  companyName: '',
  companyAddress: '',
  phoneNumber: '',
  projectName: '',
  clientName: '',
  lineItems: [],
};
