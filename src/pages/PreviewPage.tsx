// src/pages/PreviewPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
 
} from '@mui/material';
import PreviewContent from '../components/PreviewContent';
import type { EstimateFormData } from '../types';

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
