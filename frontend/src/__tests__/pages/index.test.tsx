import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import Home from '@/pages/index';

// useApiフックをモック
jest.mock('@/hooks/useApi');
import { useApi } from '@/hooks/useApi';

const mockedUseApi = useApi as jest.MockedFunction<typeof useApi>;

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

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // useApiの戻り値をモック
    mockedUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      execute: jest.fn(),
      refetch: jest.fn(),
    });
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

  it('useApiが正しい回数呼ばれる', () => {
    renderWithProviders(<Home />);
    
    // 5つのAPIエンドポイント分呼ばれる
    expect(mockedUseApi).toHaveBeenCalledTimes(5);
  });

  it('各API呼び出しがimmediate: falseで設定される', () => {
    renderWithProviders(<Home />);
    
    // 全ての呼び出しでimmediate: falseが設定されていることを確認
    expect(mockedUseApi).toHaveBeenCalledWith(expect.any(Function), { immediate: false });
  });
});