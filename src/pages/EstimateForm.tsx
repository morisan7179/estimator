// src/pages/EstimateForm.tsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { EstimateFormData } from '../types';

type EstimateFormProps = {
  formData: EstimateFormData;
  setFormData: React.Dispatch<React.SetStateAction<EstimateFormData>>;
};

const EstimateForm: React.FC<EstimateFormProps> = ({
  formData,
  setFormData,
}) => {
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      companyName,
      companyAddress,
      phoneNumber,
      projectName,
      clientName,
      address,
      issueDate,
      expirationDate,
      notes,
    }));
  }, [
    companyName,
    companyAddress,
    phoneNumber,
    projectName,
    clientName,
    address,
    issueDate,
    expirationDate,
    notes,
  ]);

const handleClear = () => {
  setCompanyName('');
  setCompanyAddress('');
  setPhoneNumber('');
  setProjectName('');
  setClientName('');
  setAddress('');
  setIssueDate('');
  setExpirationDate('');
  setNotes('');
  setFormData({
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
    lineItems: [],
  });
};


  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        新規見積り入力
      </Typography>

      <TextField fullWidth label="会社名" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <TextField fullWidth label="会社住所" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
      <TextField fullWidth label="電話番号" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField fullWidth label="工事名" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <TextField fullWidth label="お客様名" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      <TextField fullWidth label="住所" value={address} onChange={(e) => setAddress(e.target.value)} />

      <TextField
        fullWidth
        label="見積作成日"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />
      <TextField
        fullWidth
        label="見積有効期限"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <TextField
        fullWidth
        label="備考"
        multiline
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/items')}>
          明細入力へ
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          クリア
        </Button>
        <Button variant="outlined" onClick={() => navigate('/preview')}>
          プレビュー
        </Button>
      </Box>

     
      <Box sx={{ pb: 10 }} />
  </Box> 
  );
};

export default EstimateForm;
