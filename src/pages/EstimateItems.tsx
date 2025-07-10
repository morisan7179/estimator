// src/components/EstimateItems.tsx
import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // ★ 追加
import type { LineItem } from '../types';

interface EstimateItemsProps {
  lineItems: LineItem[];
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
  lineItems,
  setLineItems,
}) => {
  const navigate = useNavigate(); // ★ navigate を初期化

  // 初期化：1行も無ければ 1 行追加
  useEffect(() => {
    if (lineItems.length === 0) {
      setLineItems([{ ...EMPTY_ITEM }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems.length]);

  // 入力変更ハンドラ（型安全）
  const handleChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updated = [...lineItems];

    if (field === 'quantity' || field === 'unitPrice') {
      updated[index][field] = value.trim() === '' ? 0 : Number(value) as number;
    } else if (field !== 'total') {
      updated[index][field] = value as string;
    }

    // 金額再計算
    updated[index].total =
      updated[index].quantity * updated[index].unitPrice;

    setLineItems(updated);
  };

  // 行追加・削除
  const handleAddItem = () =>
    setLineItems([...lineItems, { ...EMPTY_ITEM }]);

  const handleRemoveItem = (index: number) => {
    const filtered = lineItems.filter((_, i) => i !== index);
    setLineItems(filtered.length > 0 ? filtered : [{ ...EMPTY_ITEM }]);
  };

  // 描画
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        見積項目
      </Typography>

      {lineItems.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            border: '1px solid #444',
            borderRadius: 2,
            p: 2,
            mb: 2,
            backgroundColor: '#111',
            position: 'relative',
          }}
        >
          {/* ゴミ箱ボタン */}
          <IconButton
            onClick={() => handleRemoveItem(idx)}
            sx={{
              position: 'absolute',
              top: -12,
              right: -12,
              backgroundColor: '#222',
              border: '1px solid #555',
              zIndex: 2,
            }}
            size="small"
            aria-label="行を削除"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <Stack spacing={1}>
            <TextField
              label="項目名"
              value={item.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
              fullWidth
            />
            <TextField
              label="単位"
              value={item.unit}
              onChange={(e) => handleChange(idx, 'unit', e.target.value)}
              fullWidth
            />
            <TextField
              label="数量"
              type="number"
              value={item.quantity === 0 ? '' : item.quantity} 
              onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
              inputProps={{ min: 0 }}
              fullWidth
            />
            <TextField
              label="単価"
              type="number"
              value={item.unitPrice === 0 ? '' : item.unitPrice}
              onChange={(e) => handleChange(idx, 'unitPrice', e.target.value)}
              inputProps={{ min: 0 }}
              fullWidth
            />
            <TextField
              label="金額"
              type="number"
              value={item.total === 0 ? '' : item.total}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="備考"
              value={item.notes ?? ''}
              onChange={(e) => handleChange(idx, 'notes', e.target.value)}
              fullWidth
            />
          </Stack>
        </Box>
      ))}

      {/* ボタン類 */}
      <Stack direction="column" spacing={2} alignItems="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          fullWidth
        >
          ＋ 項目を追加
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate('/preview')} // ★ 正常にプレビュー画面へ
        >
          プレビューへ
        </Button>
      </Stack>

      {/* 下部余白（固定フッターとの重なり回避） */}
      <Box sx={{ pb: 10 }} />
    </Box>
  );
};

export default EstimateItems;
