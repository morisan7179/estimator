// src/types.ts
export interface LineItem {
  name: string;
  unit: string;
  quantity: number;      // ← string ではなく number に統一
  unitPrice: number;
  total: number;
  notes?: string;
 
}

export interface EstimateFormData {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  projectName: string;
  clientName: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes?: string;
  lineItems: LineItem[]; // ← プロパティ名も lineItems で統一
}
