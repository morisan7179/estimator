// src/pages/PreviewPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import PreviewContent from '../components/PreviewContent';
import type { EstimateFormData } from '../types';
import html2pdf from 'html2pdf.js'; // ★ PDF保存用ライブラリ

interface PreviewPageProps {
  formData: EstimateFormData;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ formData }) => {
  const navigate = useNavigate();

  // データが無い時の早期リターン
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <Box p={4}>
        <Typography>データが存在しません。</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          フォームに戻る
        </Button>
      </Box>
    );
  }

  // PDF保存機能（iOS / Android 両対応）
  const handleSaveAsPdf = () => {
    const element = document.getElementById('preview-area');
    if (element) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: '見積書.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save();
    }
  };

  return (
    <Box>
      {/* PDF対象 */}
      <Box id="preview-area">
        <PreviewContent formData={formData} />
      </Box>

    </Box>
  );
};

export default PreviewPage;
