// src/pages/EstimateItems.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Item {
  name: string;
  unit: string;
  quantity: string;
  unitPrice: string;
  total: string;
  notes: string;
}

export interface FormData {
  estimateItems: Item[];
  [key: string]: unknown; // 他に任意のキーがあっても許容する
}

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const blankRow = (): Item => ({
  name: '', unit: '', quantity: '', unitPrice: '', total: '', notes: '',
});

const EstimateItems: React.FC<Props> = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>(
    formData.estimateItems?.length ? formData.estimateItems : Array.from({ length: 5 }, blankRow)
  );

  const handleChange = (idx: number, field: keyof Item, value: string) => {
    const next = [...items];
    next[idx][field] = value;

    if (field === 'quantity' || field === 'unitPrice') {
      const q = parseFloat(next[idx].quantity) || 0;
      const p = parseFloat(next[idx].unitPrice) || 0;
      next[idx].total = (q * p).toLocaleString();
    }
    setItems(next);
  };

  const addRow = () => setItems([...items, blankRow()]);
  const removeRow = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  useEffect(() => {
    setFormData({ ...formData, estimateItems: items });
  }, [items]);

  return (
    <Box sx={{ p: 2, pb: 10, overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>明細入力（最大30行）</Typography>

      <Box sx={{ minWidth: 800 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="24%">名称・仕様</TableCell>
              <TableCell width="6%">単位</TableCell>
              <TableCell width="8%">数量</TableCell>
              <TableCell width="12%">単価</TableCell>
              <TableCell width="12%">金額</TableCell>
              <TableCell>備考</TableCell>
              <TableCell width="6%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((it, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <TextField
                    size="small"
                    value={it.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(idx, 'name', e.target.value)}
                    inputProps={{ style: { width: 160 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={it.unit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(idx, 'unit', e.target.value)}
                    inputProps={{ style: { width: 50, textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={it.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(idx, 'quantity', e.target.value)}
                    inputProps={{ style: { width: 60, textAlign: 'right' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={it.unitPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(idx, 'unitPrice', e.target.value)}
                    inputProps={{ style: { width: 100, textAlign: 'right' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    disabled
                    value={it.total}
                    inputProps={{ style: { width: 100, textAlign: 'right' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={it.notes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(idx, 'notes', e.target.value)}
                    inputProps={{ style: { width: 140 } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" color="error" onClick={() => removeRow(idx)}>
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={addRow}>＋ 行を追加</Button>
        <Button variant="contained" fullWidth onClick={() => navigate('/preview')}>
          プレビューへ
        </Button>
      </Box>
    </Box>
  );
};

export default EstimateItems;
