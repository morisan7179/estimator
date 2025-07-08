// src/App.tsx
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EstimateForm from './pages/EstimateForm';
import EstimateItems from './pages/EstimateItems';
import PreviewPage from './pages/PreviewPage';
import BottomNav from './components/BottomNav';
import type { EstimateFormData, LineItem } from './types';

const EMPTY_ITEM: LineItem = {
  name: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  total: 0,
  notes: '',
};

const App: React.FC = () => {
  /** ★ 初期値を “quantity / total / notes” に合わせて統一 */
  const [formData, setFormData] = useState<EstimateFormData>({
    /** 見積情報 */
    title: '',
    recipient: '',
    address: '',
    issueDate: '',
    expirationDate: '',
    notes: '',
    /** 会社・顧客など（EstimateForm で使う）*/
    companyName: '',
    companyAddress: '',
    phoneNumber: '',
    projectName: '',
    clientName: '',
    /** 明細 30 行 */
    lineItems: Array.from({ length: 30 }, () => ({ ...EMPTY_ITEM })),
  });

 const setLineItems: React.Dispatch<React.SetStateAction<LineItem[]>> = useCallback(
    (updater) => {
      setFormData((prev) => ({
        ...prev,
        lineItems:
          typeof updater === 'function'
            ? (updater as (prev: LineItem[]) => LineItem[])(prev.lineItems)
            : updater,
      }));
    },
    []
  );

  return (
    <Router>
      <Routes>
        {/* 見積基本情報入力 */}
        <Route
          path="/"
          element={<EstimateForm formData={formData} setFormData={setFormData as any} />}
        />

        {/* 明細入力画面 */}
        <Route
          path="/items"
          element={
            <EstimateItems
              lineItems={formData.lineItems}
              setLineItems={setLineItems}
            />
          }
        />

        {/* プレビュー画面 */}
        <Route
          path="/preview"
          element={<PreviewPage formData={formData} />}
        />
      </Routes>

      {/* フッターナビ */}
      <BottomNav formData={formData} />
    </Router>
  );
};

export default App;
