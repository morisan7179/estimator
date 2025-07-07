// src/components/PreviewContent.tsx
import {
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

type EstimateItem = {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
};

type PreviewProps = {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  projectName: string;
  clientName: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes: string;
  estimateItems: EstimateItem[];
};

const Preview = ({
  companyName,
  companyAddress,
  phoneNumber,
  projectName,
  clientName,
  address,
  issueDate,
  expirationDate,
  notes,
  estimateItems,
}: PreviewProps) => {
  // ★ 修正：quantity × unitPrice で小計を再計算
  const subtotal = estimateItems.reduce((sum, item) => {
    const itemTotal = Number(item.quantity) * Number(item.unitPrice);
    return sum + (isFinite(itemTotal) ? itemTotal : 0);
  }, 0);

  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <Box
      sx={{
        mt: 6,
        p: 4,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 2,
        boxShadow: 3,
        minWidth: 600,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSize: '0.85rem',
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        御見積書
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography align="right">作成日：{issueDate}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 4,
          mb: 2,
        }}
      >
        <Box>
          <Typography>工事名：{projectName}</Typography>
          <Typography>お客様名：{clientName}</Typography>
          <Typography>住所：{address}</Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography>{companyName}</Typography>
          <Typography>{companyAddress}</Typography>
          <Typography>{phoneNumber}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {estimateItems?.length ? (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }} align="center">
            明細
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow sx={{ whiteSpace: 'nowrap' }}>
                  <TableCell sx={{ color: 'black' }}>名称・仕様</TableCell>
                  <TableCell sx={{ color: 'black' }}>単位</TableCell>
                  <TableCell sx={{ color: 'black' }}>数量</TableCell>
                  <TableCell sx={{ color: 'black' }} align="center">
                    単価
                  </TableCell>
                  <TableCell sx={{ color: 'black' }} align="center">
                    金額
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>備考</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estimateItems.map((item, index) =>
                  item.name ? (
                    <TableRow key={index}>
                      <TableCell sx={{ color: 'black' }}>{item.name}</TableCell>
                      <TableCell sx={{ color: 'black' }}>{item.unit}</TableCell>
                      <TableCell sx={{ color: 'black' }}>{item.quantity}</TableCell>
                      <TableCell align="right" sx={{ color: 'black' }}>
                        {Number(item.unitPrice).toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'black' }}>
                        {isFinite(item.quantity) && isFinite(item.unitPrice)
                          ? (item.quantity * item.unitPrice).toLocaleString()
                          : '—'}
                      </TableCell>
                      <TableCell sx={{ color: 'black' }}>{item.notes || ''}</TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'right', pr: 2 }}>
            <Typography>小計：{subtotal.toLocaleString()} 円</Typography>
            <Typography>消費税（10%）：{tax.toLocaleString()} 円</Typography>
            <Typography variant="h6" sx={{ mt: 1 }} fontWeight="bold">
              合計金額：{total.toLocaleString()} 円
            </Typography>
          </Box>
        </>
      ) : null}

      <Typography sx={{ mt: 2 }}>見積有効期限：{expirationDate}</Typography>
      <Typography>備考：{notes || '（なし）'}</Typography>
    </Box>
  );
};

export default Preview;
