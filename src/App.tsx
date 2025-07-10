// src/App.tsx
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EstimateForm from './pages/EstimateForm';
import EstimateItems from './pages/EstimateItems';
import PreviewPage from './pages/PreviewPage';
import BottomNav from './components/BottomNav';
import type { EstimateFormData, LineItem } from './types';


const App: React.FC = () => {
  /** ❶ 初期 lineItems を [] にする ―― 必ず 1 件だけにしたい場合 */
  const [formData, setFormData] = useState<EstimateFormData>({
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
    lineItems: [], // ← ★ ここを空配列に変更
  });

  /** lineItems だけを安全に更新する setter */
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
        {/* 基本情報入力ページ */}
        <Route
          path="/"
          element={
            <EstimateForm
              formData={formData}
              setFormData={setFormData}
            />
          }
        />

        {/* 明細入力ページ */}
        <Route
          path="/items"
          element={
            <EstimateItems
              lineItems={formData.lineItems}
              setLineItems={setLineItems}
            />
          }
        />

        {/* プレビューページ */}
        <Route path="/preview" element={<PreviewPage formData={formData} />} />
      </Routes>

      {/* フッターナビは常時表示 */}
      <BottomNav formData={formData} />
    </Router>
  );
};

export default App;
