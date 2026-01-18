import { describe, expect, it } from 'bun:test';
import { INITIAL_CAPITAL } from '../src/lib/constants';

const calculatePercentageChange = (current: number, initial: number) => {
  if (initial === 0) return 0;
  return ((current - initial) / initial) * 100;
};

const calculateCapitalChange = (
  current: number,
  previous: number
): { value: number; percentage: number } => {
  const value = current - previous;
  const percentage = previous === 0 ? 0 : (value / previous) * 100;
  return { value, percentage };
};

describe('Portfolio calculations', () => {
  describe('calculatePercentageChange', () => {
    it('should calculate positive percentage change', () => {
      expect(calculatePercentageChange(15000, INITIAL_CAPITAL)).toBe(50);
    });

    it('should calculate negative percentage change', () => {
      expect(calculatePercentageChange(8000, INITIAL_CAPITAL)).toBe(-20);
    });

    it('should return 0 when values are equal', () => {
      expect(calculatePercentageChange(INITIAL_CAPITAL, INITIAL_CAPITAL)).toBe(
        0
      );
    });

    it('should handle initial value of 0', () => {
      expect(calculatePercentageChange(100, 0)).toBe(0);
    });

    it('should handle very small changes', () => {
      const result = calculatePercentageChange(10001, 10000);
      expect(result).toBeCloseTo(0.01, 2);
    });

    it('should handle very large changes', () => {
      expect(calculatePercentageChange(100000, INITIAL_CAPITAL)).toBe(900);
    });

    it('should handle decimal values', () => {
      const result = calculatePercentageChange(10500.5, INITIAL_CAPITAL);
      expect(result).toBeCloseTo(5.005, 3);
    });
  });

  describe('calculateCapitalChange', () => {
    it('should calculate positive change', () => {
      const result = calculateCapitalChange(12000, INITIAL_CAPITAL);
      expect(result.value).toBe(2000);
      expect(result.percentage).toBe(20);
    });

    it('should calculate negative change', () => {
      const result = calculateCapitalChange(8000, INITIAL_CAPITAL);
      expect(result.value).toBe(-2000);
      expect(result.percentage).toBe(-20);
    });

    it('should handle no change', () => {
      const result = calculateCapitalChange(INITIAL_CAPITAL, INITIAL_CAPITAL);
      expect(result.value).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('should handle previous value of 0', () => {
      const result = calculateCapitalChange(100, 0);
      expect(result.value).toBe(100);
      expect(result.percentage).toBe(0);
    });

    it('should handle decimal values', () => {
      const result = calculateCapitalChange(10500.75, 10000.25);
      expect(result.value).toBeCloseTo(500.5, 2);
      expect(result.percentage).toBeCloseTo(5.0037, 2);
    });

    it('should handle very small changes', () => {
      const result = calculateCapitalChange(10000.01, 10000);
      expect(result.value).toBeCloseTo(0.01, 2);
      expect(result.percentage).toBeCloseTo(0.0001, 4);
    });
  });

  describe('Portfolio value calculations', () => {
    it('should calculate total portfolio value from coins', () => {
      const coins = [
        { quantity: 2, currentPrice: 30000 },
        { quantity: 10, currentPrice: 2000 },
        { quantity: 100, currentPrice: 1 },
      ];

      const portfolioValue = coins.reduce(
        (total, coin) => total + coin.quantity * coin.currentPrice,
        0
      );

      expect(portfolioValue).toBe(80100);
    });

    it('should handle empty portfolio', () => {
      const coins: { quantity: number; currentPrice: number }[] = [];

      const portfolioValue = coins.reduce(
        (total, coin) => total + coin.quantity * coin.currentPrice,
        0
      );

      expect(portfolioValue).toBe(0);
    });

    it('should handle portfolio with zero value coins', () => {
      const coins = [
        { quantity: 0, currentPrice: 30000 },
        { quantity: 10, currentPrice: 0 },
      ];

      const portfolioValue = coins.reduce(
        (total, coin) => total + coin.quantity * coin.currentPrice,
        0
      );

      expect(portfolioValue).toBe(0);
    });

    it('should handle decimal quantities and prices', () => {
      const coins = [
        { quantity: 0.5, currentPrice: 30000.99 },
        { quantity: 1.25, currentPrice: 2000.5 },
      ];

      const portfolioValue = coins.reduce(
        (total, coin) => total + coin.quantity * coin.currentPrice,
        0
      );

      expect(portfolioValue).toBeCloseTo(17501.12, 2);
    });
  });
});
