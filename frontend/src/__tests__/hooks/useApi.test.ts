import { renderHook, act } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';

describe.skip('useApi', () => {
  it('immediate: trueの場合、初期化時にAPIが実行される', async () => {
    const mockApiFunction = jest.fn().mockResolvedValue({ data: 'test' });
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: true })
    );

    expect(result.current.loading).toBe(true);
    expect(mockApiFunction).toHaveBeenCalledTimes(1);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ data: 'test' });
    expect(result.current.error).toBeNull();
  });

  it('immediate: falseの場合、初期化時にAPIが実行されない', () => {
    const mockApiFunction = jest.fn();
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: false })
    );

    expect(result.current.loading).toBe(false);
    expect(mockApiFunction).not.toHaveBeenCalled();
  });

  it('executeを手動で呼び出すとAPIが実行される', async () => {
    const mockApiFunction = jest.fn().mockResolvedValue({ result: 'success' });
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: false })
    );

    await act(async () => {
      await result.current.execute();
    });

    expect(mockApiFunction).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ result: 'success' });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('APIエラーが発生した場合、適切にエラーが設定される', async () => {
    const errorMessage = 'API Error';
    const mockApiFunction = jest.fn().mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: false })
    );

    await act(async () => {
      try {
        await result.current.execute();
      } catch (error) {
        // エラーがスローされることを期待
      }
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('refetchはexecuteと同じ動作をする', async () => {
    const mockApiFunction = jest.fn().mockResolvedValue({ data: 'refetched' });
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: false })
    );

    await act(async () => {
      await result.current.refetch();
    });

    expect(mockApiFunction).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ data: 'refetched' });
  });

  it('複数回executeを呼び出しても正常に動作する', async () => {
    let callCount = 0;
    const mockApiFunction = jest.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({ count: callCount });
    });
    
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { immediate: false })
    );

    // 1回目
    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toEqual({ count: 1 });

    // 2回目
    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toEqual({ count: 2 });

    expect(mockApiFunction).toHaveBeenCalledTimes(2);
  });
});