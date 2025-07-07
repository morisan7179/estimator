// src/pages/EstimateForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EstimateItem {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

interface FormData {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  projectName: string;
  clientName: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes: string;
  estimateItems: EstimateItem[];
}

interface EstimateFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const STORAGE_KEY = 'estimateFormData';

const EstimateForm: React.FC<EstimateFormProps> = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState(formData.companyName ?? '');
  const [companyAddress, setCompanyAddress] = useState(formData.companyAddress ?? '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber ?? '');
  const [projectName, setProjectName] = useState(formData.projectName ?? '');
  const [clientName, setClientName] = useState(formData.clientName ?? '');
  const [address, setAddress] = useState(formData.address ?? '');
  const [issueDate, setIssueDate] = useState(formData.issueDate ?? '');
  const [expirationDate, setExpirationDate] = useState(formData.expirationDate ?? '');
  const [notes, setNotes] = useState(formData.notes ?? '');

  const currentForm: FormData = {
    companyName,
    companyAddress,
    phoneNumber,
    projectName,
    clientName,
    address,
    issueDate,
    expirationDate,
    notes,
    estimateItems: formData.estimateItems ?? [],
  };

  const sync = (next: FormData) => {
    setFormData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const makeHandler =
    (setter: React.Dispatch<React.SetStateAction<string>>, key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setter(value);
      sync({ ...currentForm, [key]: value });
    };

  const handleClear = () => {
    const empty: FormData = {
      companyName: '',
      companyAddress: '',
      phoneNumber: '',
      projectName: '',
      clientName: '',
      address: '',
      issueDate: '',
      expirationDate: '',
      notes: '',
      estimateItems: [],
    };
    setCompanyName('');
    setCompanyAddress('');
    setPhoneNumber('');
    setProjectName('');
    setClientName('');
    setAddress('');
    setIssueDate('');
    setExpirationDate('');
    setNotes('');
    sync(empty);
  };

  useEffect(() => {
    setCompanyName(formData.companyName ?? '');
    setCompanyAddress(formData.companyAddress ?? '');
    setPhoneNumber(formData.phoneNumber ?? '');
    setProjectName(formData.projectName ?? '');
    setClientName(formData.clientName ?? '');
    setAddress(formData.address ?? '');
    setIssueDate(formData.issueDate ?? '');
    setExpirationDate(formData.expirationDate ?? '');
    setNotes(formData.notes ?? '');
  }, [formData]);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        新規見積り入力
      </Typography>

      <TextField label="会社名" fullWidth margin="normal" value={companyName} onChange={makeHandler(setCompanyName, 'companyName')} />
      <TextField label="会社住所" fullWidth margin="normal" value={companyAddress} onChange={makeHandler(setCompanyAddress, 'companyAddress')} />
      <TextField label="電話番号" fullWidth margin="normal" value={phoneNumber} onChange={makeHandler(setPhoneNumber, 'phoneNumber')} />
      <TextField label="工事名" fullWidth margin="normal" value={projectName} onChange={makeHandler(setProjectName, 'projectName')} />
      <TextField label="お客様名" fullWidth margin="normal" value={clientName} onChange={makeHandler(setClientName, 'clientName')} />
      <TextField label="住所" fullWidth margin="normal" value={address} onChange={makeHandler(setAddress, 'address')} />
      <TextField label="作成日" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={issueDate} onChange={makeHandler(setIssueDate, 'issueDate')} />
      <TextField label="見積有効期限" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={expirationDate} onChange={makeHandler(setExpirationDate, 'expirationDate')} />
      <TextField label="備考" fullWidth multiline rows={3} margin="normal" value={notes} onChange={makeHandler(setNotes, 'notes')} />

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" fullWidth onClick={() => navigate('/estimate-items')}>
          次へ（明細入力へ）
        </Button>
      </Box>

      {companyName && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="contained" fullWidth onClick={() => navigate('/preview', { state: currentForm })}>
            プレビューへ
          </Button>
          <Button variant="outlined" fullWidth onClick={handleClear}>
            クリア
          </Button>
        </Box>
      )}

      <Box sx={{ height: 80 }} />
    </Box>
  );
};

export default EstimateForm;
