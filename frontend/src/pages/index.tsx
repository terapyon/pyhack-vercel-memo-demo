import React from 'react';
import {
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Box,
  Paper,
} from '@mui/material';
import { ApiTestCard } from '../components/ApiTestCard';
import { useApi } from '../hooks/useApi';
import { apiService } from '../lib/api';

export default function Home() {
  // 各APIエンドポイントのhook
  const rootApi = useApi(() => apiService.getRoot(), { immediate: false });
  const healthApi = useApi(() => apiService.getHealth(), { immediate: false });
  const testApi = useApi(() => apiService.getTest(), { immediate: false });
  const dbTestApi = useApi(() => apiService.getDatabaseTest(), { immediate: false });
  const dbCheckApi = useApi(() => apiService.getDatabaseCheck(), { immediate: false });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            メモアプリ - API テスト
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            バックエンドAPI接続テスト
          </Typography>
          <Typography variant="body1" color="text.secondary">
            各APIエンドポイントの動作確認を行えます。
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ApiTestCard
              title="ルートエンドポイント"
              description="API サーバーの基本動作を確認します"
              data={rootApi.data}
              loading={rootApi.loading}
              error={rootApi.error}
              onRefresh={rootApi.execute}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ApiTestCard
              title="ヘルスチェック"
              description="API サーバーの健康状態を確認します"
              data={healthApi.data}
              loading={healthApi.loading}
              error={healthApi.error}
              onRefresh={healthApi.execute}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ApiTestCard
              title="テストエンドポイント"
              description="API 設定情報を取得します"
              data={testApi.data}
              loading={testApi.loading}
              error={testApi.error}
              onRefresh={testApi.execute}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ApiTestCard
              title="DB接続テスト"
              description="データベース接続状態を確認します"
              data={dbTestApi.data}
              loading={dbTestApi.loading}
              error={dbTestApi.error}
              onRefresh={dbTestApi.execute}
            />
          </Grid>

          <Grid item xs={12}>
            <ApiTestCard
              title="DBセッションチェック"
              description="データベースセッションの動作を確認します"
              data={dbCheckApi.data}
              loading={dbCheckApi.loading}
              error={dbCheckApi.error}
              onRefresh={dbCheckApi.execute}
            />
          </Grid>
        </Grid>

        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            API Base URL
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}