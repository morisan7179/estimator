import React from 'react';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { LineItem } from '../types';

interface LineItemsFormProps {
  items: LineItem[];
  setItems: (items: LineItem[]) => void;
}

const EMPTY_ITEM: LineItem = {
  name: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  total: 0,
  notes: '',
};

const LineItemsForm: React.FC<LineItemsFormProps> = ({ items, setItems }) => {
  /* -------- 行データ更新 -------- */
  const handleChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updated = [...items];

    switch (field) {
      case 'quantity':
      case 'unitPrice':
        updated[index][field] = value === '' ? 0 : Number(value);
        break;
      case 'name':
      case 'unit':
      case 'notes':
        updated[index][field] = value;
        break;
      case 'total':
        // 読み取り専用フィールド（編集させない）
        return;
      default:
        const _exhaustiveCheck: never = field;
        return _exhaustiveCheck;
    }

    // 小計再計算
    updated[index].total = updated[index].quantity * updated[index].unitPrice;
    setItems(updated);
  };

  /* -------- 行追加／削除 -------- */
  const addRow = () => setItems([...items, { ...EMPTY_ITEM }]);
  const removeRow = (idx: number) =>
    setItems(items.filter((_, i) => i !== idx));

  /* -------- JSX -------- */
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        明細入力
      </Typography>

      {items.map((row, idx) => (
        <Grid container spacing={1} key={idx} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <TextField
              label="項目名"
              value={row.name}
              fullWidth
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              label="単位"
              value={row.unit}
              fullWidth
              onChange={(e) => handleChange(idx, 'unit', e.target.value)}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField
              label="数量"
              type="number"
              value={row.quantity}
              fullWidth
              onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="単価"
              type="number"
              value={row.unitPrice}
              fullWidth
              onChange={(e) => handleChange(idx, 'unitPrice', e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="金額"
              type="number"
              value={row.total}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="備考"
              value={row.notes}
              fullWidth
              onChange={(e) => handleChange(idx, 'notes', e.target.value)}
            />
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={() => removeRow(idx)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Box mt={2}>
        <button onClick={addRow}>＋ 項目を追加</button>
      </Box>
    </Box>
  );
};

export default LineItemsForm;
