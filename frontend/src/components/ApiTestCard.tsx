import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ApiTestCardProps {
  title: string;
  description: string;
  data: any;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const ApiTestCard: React.FC<ApiTestCardProps> = ({
  title,
  description,
  data,
  loading,
  error,
  onRefresh,
}) => {
  const getStatusColor = () => {
    if (loading) return 'default';
    if (error) return 'error';
    if (data) return 'success';
    return 'default';
  };

  const getStatusText = () => {
    if (loading) return 'ロード中...';
    if (error) return 'エラー';
    if (data) return '成功';
    return '未実行';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            variant="outlined"
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {data && !loading && (
          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              レスポンス:
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: 'grey.100',
                p: 1,
                borderRadius: 1,
                fontSize: '0.75rem',
                overflow: 'auto',
                maxHeight: 150,
              }}
            >
              {JSON.stringify(data, null, 2)}
            </Box>
          </Box>
        )}

        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRefresh}
          disabled={loading}
          size="small"
        >
          再実行
        </Button>
      </CardContent>
    </Card>
  );
};