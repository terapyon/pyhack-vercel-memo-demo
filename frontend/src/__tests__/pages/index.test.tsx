import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';

// useApiフックをモック
jest.mock('@/hooks/useApi', () => ({
  useApi: () => ({
    data: null,
    loading: false,
    error: null,
    execute: jest.fn(),
    refetch: jest.fn(),
  }),
}));

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </RecoilRoot>
  );
};

describe.skip('Home Page', () => {
  // 動的インポートでコンポーネントを遅延読み込み
  let Home: any;
  
  beforeAll(async () => {
    const homeModule = await import('@/pages/index');
    Home = homeModule.default;
  });

  it('ページタイトルが正しく表示される', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('メモアプリ - API テスト')).toBeInTheDocument();
    expect(screen.getByText('バックエンドAPI接続テスト')).toBeInTheDocument();
  });

  it('APIテストカードが全て表示される', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('ルートエンドポイント')).toBeInTheDocument();
    expect(screen.getByText('ヘルスチェック')).toBeInTheDocument();
    expect(screen.getByText('テストエンドポイント')).toBeInTheDocument();
    expect(screen.getByText('DB接続テスト')).toBeInTheDocument();
    expect(screen.getByText('DBセッションチェック')).toBeInTheDocument();
  });

  it('API Base URLが表示される', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('API Base URL')).toBeInTheDocument();
  });
});