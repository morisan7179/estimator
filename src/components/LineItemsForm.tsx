// src/components/LineItemsForm.tsx
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import type { LineItem } from '../types';

type Props = {
  items: LineItem[];
  setItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
};

const LineItemsForm: React.FC<Props> = ({ items, setItems }) => {
  // 入力変更ハンドラ
  const handleChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    setItems(prev =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              // 数量・単価は '' or number に正規化
              [field]:
                field === 'qty' || field === 'unitPrice'
                  ? value === '' ? '' : Number(value)
                  : value,

              // amount は qty * unitPrice をリアルタイム計算
              amount: (() => {
                const qty       = field === 'qty'       ? Number(value) : Number(row.qty)       || 0;
                const unitPrice = field === 'unitPrice' ? Number(value) : Number(row.unitPrice) || 0;
                return qty * unitPrice;
              })(),
            }
          : row
      )
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">明細入力（最大30行）</Typography>

      <Grid container spacing={1} sx={{ mt: 1 }}>
        {items.map((row, idx) => (
          <React.Fragment key={idx}>
            {/* 項目名 */}
            <Grid item xs={3}>
              <TextField
                size="small"
                label="項目名"
                value={row.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                fullWidth
              />
            </Grid>

            {/* 単位 */}
            <Grid item xs={2}>
              <TextField
                size="small"
                label="単位"
                value={row.unit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                fullWidth
              />
            </Grid>

            {/* 数量 */}
            <Grid item xs={2}>
              <TextField
                size="small"
                type="number"
                label="数量"
                value={row.qty}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                fullWidth
              />
            </Grid>

            {/* 単価 */}
            <Grid item xs={2}>
              <TextField
                size="small"
                type="number"
                label="単価"
                value={row.unitPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                fullWidth
              />
            </Grid>

            {/* 金額（自動計算, 読取専用） */}
            <Grid item xs={3}>
              <TextField
                size="small"
                label="金額"
                value={row.amount.toLocaleString()}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default LineItemsForm;
