const sum = (a: number, b: number) => a + b;

describe('description', () => {
  it('basic', () => {
    expect(sum(0, 0)).toBe(0);
  });

  it('basic again', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
