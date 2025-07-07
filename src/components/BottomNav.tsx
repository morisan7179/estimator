// src/components/BottomNav.tsx
import React, { useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PreviewIcon from '@mui/icons-material/Visibility';
import { useNavigate, useLocation } from 'react-router-dom';
import type { EstimateFormData } from '../types';   // ← 共通型を import

interface BottomNavProps {
  formData: EstimateFormData;
}

const BottomNav: React.FC<BottomNavProps> = ({ formData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  /* URL 変更時に選択タブを同期 */
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  /* ナビゲーションハンドラ */
  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue(newValue);
    navigate(
      newValue === '/preview' ? '/preview' : newValue,
      newValue === '/preview' ? { state: formData } : undefined
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        zIndex: 1300,
        '@media print': { display: 'none' },
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {/* ボタン構成は変更していません */}
        <BottomNavigationAction label="ホーム" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="プレビュー" value="/preview" icon={<PreviewIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
