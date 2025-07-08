// src/components/PrintPreview.tsx

import React from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

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
  notes?: string;
  estimateItems?: EstimateItem[];
}

interface PrintPreviewProps {
  data: FormData;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({ data }) => {
  const {
    companyName,
    companyAddress,
    phoneNumber,
    projectName,
    clientName,
    address,
    issueDate,
    expirationDate,
    notes,
    estimateItems = [],
  } = data;

  const subtotal = estimateItems.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.1);
  const totaltotal = subtotal + tax;

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        maxWidth: '800px',
        mx: 'auto',
        p: 4,
        fontSize: '14px',
        '@media print': {
          boxShadow: 'none',
        },
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        御見積書
      </Typography>
      <Typography>作成日：{issueDate}</Typography>
      <Typography>工事名：{projectName}</Typography>
      <Typography>お客様名：{clientName}</Typography>
      <Typography>住所：{address}</Typography>
      <Typography>発行者：{companyName}　{companyAddress}　{phoneNumber}</Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>明細</Typography>
        <Table size="small" sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            border: '1px solid #000',
            padding: '6px',
            textAlign: 'left',
            fontSize: '13px',
          },
        }}>
          <TableHead>
            <TableRow>
              <TableCell>項目</TableCell>
              <TableCell>単位</TableCell>
              <TableCell>数量</TableCell>
              <TableCell>単価</TableCell>
              <TableCell>金額</TableCell>
              <TableCell>備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimateItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice.toLocaleString()} 円</TableCell>
                <TableCell>{item.total.toLocaleString()} 円</TableCell>
                <TableCell>{item.notes || '―'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box mt={3}>
        <Typography>小計：{subtotal.toLocaleString()} 円</Typography>
        <Typography>消費税（10%）：{tax.toLocaleString()} 円</Typography>
        <Typography variant="h6">合計金額：{totaltotal.toLocaleString()} 円</Typography>
      </Box>

      <Box mt={2}>
        <Typography>見積有効期限：{expirationDate}</Typography>
        <Typography>備考：{notes || '（なし）'}</Typography>
      </Box>
    </Box>
  );
};

export default PrintPreview;
