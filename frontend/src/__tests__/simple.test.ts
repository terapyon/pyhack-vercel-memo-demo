// 最もシンプルなテスト
describe('Simple Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have access to environment', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });
});