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

interface EstimateItemsProps {
  lineItems: LineItem[] | undefined;               // ← undefined を許容
  setLineItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
}

const EMPTY_ITEM: LineItem = {
  name: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  total: 0,
  notes: '',
};

const EstimateItems: React.FC<EstimateItemsProps> = ({
  lineItems = [],                                  // ← デフォルトで空配列
  setLineItems,
}) => {
  /* ---------- 行データ更新 ---------- */
  const handleChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updated = [...lineItems];
    if (field === 'quantity' || field === 'unitPrice') {
      updated[index][field] = value === '' ? 0 : parseFloat(value);
    } else {
      updated[index][field] = value as any;
    }
    updated[index].total = updated[index].quantity * updated[index].unitPrice;
    setLineItems(updated);
  };

  /* ---------- 行の追加／削除 ---------- */
  const handleAddItem = () => setLineItems([...lineItems, { ...EMPTY_ITEM }]);
  const handleRemoveItem = (i: number) =>
    setLineItems(lineItems.filter((_, idx) => idx !== i));

  /* ---------- UI ---------- */
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        見積項目
      </Typography>

      {lineItems.map((item, idx) => (
        <Grid container spacing={1} key={idx} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <TextField
              label="項目名"
              value={item.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="単位"
              value={item.unit}
              onChange={(e) => handleChange(idx, 'unit', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="数量"
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="単価"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleChange(idx, 'unitPrice', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="金額"
              type="number"
              value={item.total}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="備考"
              value={item.notes ?? ''}
              onChange={(e) => handleChange(idx, 'notes', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleRemoveItem(idx)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Box mt={2}>
        <button onClick={handleAddItem}>＋ 項目を追加</button>
      </Box>
    </Box>
  );
};

export default EstimateItems;
