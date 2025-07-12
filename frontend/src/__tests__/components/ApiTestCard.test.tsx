import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApiTestCard } from '@/components/ApiTestCard';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ApiTestCard', () => {
  const defaultProps = {
    title: 'Test API',
    description: 'Test description',
    data: null,
    loading: false,
    error: null,
    onRefresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('タイトルと説明が正しく表示される', () => {
    renderWithTheme(<ApiTestCard {...defaultProps} />);
    
    expect(screen.getByText('Test API')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('ローディング状態が正しく表示される', () => {
    renderWithTheme(<ApiTestCard {...defaultProps} loading={true} />);
    
    expect(screen.getByText('ロード中...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('エラー状態が正しく表示される', () => {
    const error = 'API Error occurred';
    renderWithTheme(<ApiTestCard {...defaultProps} error={error} />);
    
    expect(screen.getByText('エラー')).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('成功時にデータが正しく表示される', () => {
    const data = { message: 'Success', status: 'ok' };
    renderWithTheme(<ApiTestCard {...defaultProps} data={data} />);
    
    expect(screen.getByText('成功')).toBeInTheDocument();
    expect(screen.getByText('レスポンス:')).toBeInTheDocument();
    expect(screen.getByText(JSON.stringify(data, null, 2))).toBeInTheDocument();
  });

  it('再実行ボタンがクリックされたときにonRefreshが呼ばれる', () => {
    const onRefresh = jest.fn();
    renderWithTheme(<ApiTestCard {...defaultProps} onRefresh={onRefresh} />);
    
    const refreshButton = screen.getByText('再実行');
    fireEvent.click(refreshButton);
    
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('ローディング中は再実行ボタンが無効になる', () => {
    renderWithTheme(<ApiTestCard {...defaultProps} loading={true} />);
    
    const refreshButton = screen.getByText('再実行');
    expect(refreshButton).toBeDisabled();
  });
});