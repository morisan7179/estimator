// src/components/Preview.tsx
import { Box, Typography, Divider } from '@mui/material';

type PreviewProps = {
  companyName: string;
companyAddress: string;     // ★ 追加
  phoneNumber: string;
  projectName: string;
  clientName: string;
  address: string;
  issueDate: string;
  expirationDate: string;
  notes: string;
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
}: PreviewProps) => {
  return (
    <Box
      sx={{
        mt: 6,
        p: 4,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 800,
        margin: '0 auto',
        fontFamily: 'Noto Sans JP, sans-serif',
      }}
    >
      <Typography variant="h6" gutterBottom>
        御見積書プレビュー
      </Typography>

      {/* 作成日：上に独立 */}
      <Box sx={{ mb: 2 }}>
        <Typography>作成日：{issueDate}</Typography>
      </Box>

      {/* 情報部分：左右に分割 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 4,
          mb: 2,
        }}
      >
        {/* 左側：顧客・工事情報 */}
        <Box>
          <Typography>工事名：{projectName}</Typography>
          <Typography>お客様名：{clientName}</Typography>
          <Typography>住所：{address}</Typography>
        </Box>

        {/* 右側：会社情報 */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography>{companyName}</Typography>
<Typography>{companyAddress}</Typography>  
          <Typography>{phoneNumber}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 有効期限・備考 */}
      <Typography>見積有効期限：{expirationDate}</Typography>
      <Typography>備考：{notes || '（なし）'}</Typography>
    </Box>
  );
};

export default Preview;
