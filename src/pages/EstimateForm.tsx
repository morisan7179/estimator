// src/pages/EstimateForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type EstimateFormProps = {
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  lineItems: LineItem[];               // ★追加★
};

const STORAGE_KEY = 'estimateFormData';

const EstimateForm: React.FC<EstimateFormProps> = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  /* ------------- 入力フィールド状態 ------------- */
  const [companyName,    setCompanyName]    = useState(formData.companyName    ?? '');
  const [companyAddress, setCompanyAddress] = useState(formData.companyAddress ?? '');
  const [phoneNumber,    setPhoneNumber]    = useState(formData.phoneNumber    ?? '');
  const [projectName,    setProjectName]    = useState(formData.projectName    ?? '');
  const [clientName,     setClientName]     = useState(formData.clientName     ?? '');
  const [address,        setAddress]        = useState(formData.address        ?? '');
  const [issueDate,      setIssueDate]      = useState(formData.issueDate      ?? '');
  const [expirationDate, setExpirationDate] = useState(formData.expirationDate ?? '');
  const [notes,          setNotes]          = useState(formData.notes          ?? '');

  /* ------------- 現在のフォームまとめ ------------- */
  const currentForm = {
    companyName,
    companyAddress,
    phoneNumber,
    projectName,
    clientName,
    address,
    issueDate,
    expirationDate,
    notes,
  };

  /* ------------- 同期ヘルパ ------------- */
  const sync = (next: typeof currentForm) => {
    setFormData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  /* ------------- onChange ハンドラ生成 ------------- */
  const makeHandler =
    (setter: React.Dispatch<React.SetStateAction<string>>, key: keyof typeof currentForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setter(value);
      sync({ ...currentForm, [key]: value });
    };

  /* ------------- クリア ------------- */
  const handleClear = () => {
    const empty = {
      companyName: '',
      companyAddress: '',
      phoneNumber: '',
      projectName: '',
      clientName: '',
      address: '',
      issueDate: '',
      expirationDate: '',
      notes: '',
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

  /* ------------- 外部から formData が変わったときの反映 ------------- */
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

  /* ======================== UI ======================== */
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        新規見積り入力
      </Typography>

      {/* ---------- 入力フィールド ---------- */}
      <TextField label="会社名"        fullWidth margin="normal" value={companyName}    onChange={makeHandler(setCompanyName,    'companyName')} />
      <TextField label="会社住所"      fullWidth margin="normal" value={companyAddress} onChange={makeHandler(setCompanyAddress, 'companyAddress')} />
      <TextField label="電話番号"      fullWidth margin="normal" value={phoneNumber}    onChange={makeHandler(setPhoneNumber,    'phoneNumber')} />
      <TextField label="工事名"        fullWidth margin="normal" value={projectName}    onChange={makeHandler(setProjectName,    'projectName')} />
      <TextField label="お客様名"      fullWidth margin="normal" value={clientName}     onChange={makeHandler(setClientName,     'clientName')} />
      <TextField label="住所"          fullWidth margin="normal" value={address}        onChange={makeHandler(setAddress,        'address')} />
      <TextField
        label="作成日"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={issueDate}
        onChange={makeHandler(setIssueDate, 'issueDate')}
      />
      <TextField
        label="見積有効期限"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={expirationDate}
        onChange={makeHandler(setExpirationDate, 'expirationDate')}
      />
      <TextField
        label="備考"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={notes}
        onChange={makeHandler(setNotes, 'notes')}
      />

      {/* ---------- アクションボタン ---------- */}
     {companyName && (
  <Box sx={{ mt: 2, mb: 10, display: 'flex', gap: 1 }}>
    {/* 明細入力 */}
    <Button
      variant="outlined"
      fullWidth
      onClick={() => navigate('/items', { state: currentForm })}
    >
      明細入力
    </Button>

    {/* プレビューへ：lineItems が 1 件以上あるときだけ有効 */}
    <Button
      variant="contained"
      fullWidth
      disabled={lineItems.length === 0}            // ★ここ★
      onClick={() => navigate('/preview', { state: currentForm })}
    >
      プレビューへ
    </Button>

    {/* クリア */}
    <Button variant="outlined" color="secondary" fullWidth onClick={handleClear}>
      クリア
    </Button>
  </Box>
)}

      {/* フッタ余白 */}
      <Box sx={{ height: 80 }} />
    </Box>
  );
};

export default EstimateForm;
