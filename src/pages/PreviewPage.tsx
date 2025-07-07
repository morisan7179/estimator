import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import PreviewContent from '../components/PreviewContent';
import PrintPreview from '../components/PrintPreview'; // 印刷用コンポーネント
import type { EstimateFormData } from '../types';

interface PreviewPageProps {
  formData: EstimateFormData;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ formData }) => {
  const navigate = useNavigate();
  const [printMode, setPrintMode] = useState(false);

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

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 100);
  };

  return (
    <Box>
      {printMode ? (
        <PrintPreview formData={formData} />
      ) : (
        <>
          <PreviewContent formData={formData} />
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" onClick={handlePrint} sx={{ mr: 2 }}>
              印刷する
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              戻る
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PreviewPage;
