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

  // 印刷実行
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <PreviewContent formData={formData} />

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" onClick={handlePrint} sx={{ mr: 2 }}>
          印刷する
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          戻る
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewPage;
