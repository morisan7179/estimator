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
 title?: string; // ← 追加
  recipient: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes?: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  projectName: string;
  clientName: string;
  lineItems: LineItem[]; // ← プロパティ名も lineItems で統一
}
