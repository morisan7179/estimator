import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { EstimateFormData } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  formData: EstimateFormData;
}

const PreviewContent: React.FC<Props> = ({ formData }) => {
  const navigate = useNavigate();

  const calculateTotal = () =>
    formData.lineItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <Box
      p={2}
      sx={{
        overflowX: 'auto',
        bgcolor: 'white',
        color: 'black',
        minHeight: '100vh',
      }}
    >
      {/* タイトル */}
      <Typography variant="h4" align="center" gutterBottom>
        御見積書
      </Typography>

      {/* 工事情報と会社情報を横並びに配置 */}
<Box display="flex" justifyContent="space-between" mb={2}>
  {/* 左：工事情報 */}
  <Box textAlign="left">
    <Typography>工事名：{formData.projectName}</Typography>
    <Typography>お客様名：{formData.clientName}</Typography>
    <Typography>住所：{formData.address}</Typography>
  </Box>

  {/* 右：会社情報 */}
  <Box textAlign="right">
    <Typography>作成日：{formData.issueDate}</Typography>
    <Typography>会社名：{formData.companyName}</Typography>
    <Typography>住所：{formData.companyAddress}</Typography>
    <Typography>電話番号：{formData.phoneNumber}</Typography>
  </Box>
</Box>


      <Divider sx={{ my: 2 }} />

      {/* 明細テーブル */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          border: '1px solid #ccc',
          bgcolor: 'white',
          minWidth: 600,
        }}
      >
        <Table size="small" aria-label="estimate-table" sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f0f0' }}>
              {['項目名', '単位', '数量', '単価', '金額', '備考'].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: 'black', border: '1px solid #ccc' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {formData.lineItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>{item.name}</TableCell>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>{item.unit}</TableCell>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>{item.quantity}</TableCell>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>
                  ¥{item.unitPrice.toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>
                  ¥{item.total.toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: 'black', border: '1px solid #ccc' }}>{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 合計金額 */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        合計金額：¥{calculateTotal().toLocaleString()}
      </Typography>

      {/* その他情報 */}
      <Typography>見積有効期限：{formData.expirationDate}</Typography>
      <Typography>備考：{formData.notes || '（なし）'}</Typography>

      {/* ボタン */}
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => navigate('/items')}>
          明細入力へ
        </Button>
        <Button variant="outlined" onClick={() => window.print()}>
          印刷する
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewContent;
