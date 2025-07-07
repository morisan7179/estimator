// src/types.ts
export type LineItem = {
  name: string;           // 項目名（例：外壁塗装）
  unit: string;           // 単位（例：式、一式、㎡など）
  qty: number | '';       // 数量（空文字も許容）
  unitPrice: number | ''; // 単価
  amount: number;         // 金額（自動計算）
};

export interface EstimateFormData {
  title: string;
  recipient: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes: string;
  lineItems: LineItem[];
}
