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
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import type { EstimateFormData } from '../types';

interface Props {
  formData: EstimateFormData;
}

const PreviewContent: React.FC<Props> = ({ formData }) => {
  const navigate = useNavigate();

  /** 小計算出 */
  const subtotal = formData.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  /** 消費税（10%）と合計 */
  const tax = Math.round(subtotal * 0.1);
  const grandTotal = subtotal + tax;

  /** PDF保存処理 */
  const handleSaveAsPdf = () => {
    const element = document.getElementById('preview-area');
    const buttons = document.getElementById('pdf-buttons'); // ★ 追加：ボタンを対象に

    if (element) {
      // ★ ボタンを一時的に非表示
      if (buttons) buttons.style.display = 'none';

      html2pdf()
        .set({
          margin: 0.5,
          filename: '見積書.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save()
        .then(() => {
          // ★ PDF出力後に再表示
          if (buttons) buttons.style.display = 'flex';
        });
    }
  };

  return (
    <Box
      id="preview-area"
      p={2}
      sx={{
        overflowX: 'auto',
        bgcolor: 'white',
        color: 'black',
        minHeight: '100vh',
      }}
    >
      {/* ===== タイトル ===== */}
      <Typography variant="h4" align="center" gutterBottom>
        御見積書
      </Typography>

      {/* ===== 工事情報 & 会社情報 ===== */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box textAlign="left">
          <Typography>工事名：{formData.projectName}</Typography>
          <Typography>お客様名：{formData.clientName}</Typography>
          <Typography>住所：{formData.address}</Typography>
        </Box>

        <Box textAlign="right">
          <Typography>作成日：{formData.issueDate}</Typography>
          <Typography>会社名：{formData.companyName}</Typography>
          <Typography>住所：{formData.companyAddress}</Typography>
          <Typography>電話番号：{formData.phoneNumber}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ===== 明細テーブル ===== */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          border: '1px solid #ccc',
          bgcolor: 'white',
          minWidth: 600,
        }}
      >
        <Table size="small" sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f0f0' }}>
              {['項目名', '単位', '数量', '単価', '金額', '備考'].map((h) => (
                <TableCell
                  key={h}
                  sx={{ border: '1px solid #ccc', color: 'black' }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.lineItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  {item.name}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  {item.unit}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  ¥{item.unitPrice.toLocaleString()}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  ¥{item.total.toLocaleString()}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc', color: 'black' }}>
                  {item.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== 金額まとめ ===== */}
      <Box mb={2}>
        <Typography>小計：¥{subtotal.toLocaleString()}</Typography>
        <Typography>消費税（10%）：¥{tax.toLocaleString()}</Typography>
        <Typography variant="h6">
          合計金額：¥{grandTotal.toLocaleString()}
        </Typography>
      </Box>

      {/* ===== 有効期限・備考 ===== */}
      <Typography>見積有効期限：{formData.expirationDate}</Typography>
      <Typography>備考：{formData.notes || '（なし）'}</Typography>

      {/* ===== ボタン群 ===== */}
      <Box
        id="pdf-buttons" // ★ ここでIDを指定
        mt={3}
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
      >
        <Button variant="contained" onClick={() => navigate('/items')}>
          明細入力へ
        </Button>
        <Button variant="contained" color="success" onClick={handleSaveAsPdf}>
          PDFで保存
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewContent;
