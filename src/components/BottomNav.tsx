// src/components/BottomNav.tsx

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PreviewIcon from "@mui/icons-material/Visibility";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// 型定義（共通化している場合は import）
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

interface BottomNavProps {
  formData: FormData;
}

const BottomNav: React.FC<BottomNavProps> = ({ formData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(
      newValue === "/preview" ? "/preview" : newValue,
      newValue === "/preview" ? { state: formData } : undefined
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        zIndex: 1300,
        "@media print": { display: "none" },
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="ホーム" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="プレビュー"
          value="/preview"
          icon={<PreviewIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
