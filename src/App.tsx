// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EstimateForm from './pages/EstimateForm';
import EstimateItems from './pages/EstimateItems';
import PreviewPage from './pages/PreviewPage';
import BottomNav from './components/BottomNav';

// 型定義（本来は src/types.ts に分けるのが理想）
interface EstimateItem {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

interface FormData {
  companyName?: string;
  companyAddress?: string;
  phoneNumber?: string;
  projectName?: string;
  clientName?: string;
  address?: string;
  issueDate?: string;
  expirationDate?: string;
  notes?: string;
  estimateItems: EstimateItem[];
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    estimateItems: [],
  });

  return (
    <Router>
      {/* ① ページの上部に余白を確保（BottomNav用） */}
      <div style={{ paddingBottom: '72px' }}>
        <Routes>
          <Route
            path="/"
            element={<EstimateForm formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/estimate-items"
            element={<EstimateItems formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/preview"
            element={<PreviewPage formData={formData} />}
          />
        </Routes>
      </div>

      {/* ② どのページでも formData を参照可能に */}
      <BottomNav formData={formData} />
    </Router>
  );
};

export default App;
