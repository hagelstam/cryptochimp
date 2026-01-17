import { Transaction } from '@/generated/client';
import { describe, expect, it } from 'bun:test';
import {
  calculateCoinShare,
  formatCurrency,
  formatPercentage,
  getDeltaType,
  getOwnedCoins,
} from '../src/lib/utils';

describe('getDeltaType', () => {
  it("should return 'unchanged' for values between -0.1 and 0.1", () => {
    expect(getDeltaType(0)).toBe('unchanged');
    expect(getDeltaType(0.05)).toBe('unchanged');
    expect(getDeltaType(-0.05)).toBe('unchanged');
  });

  it("should return 'moderateDecrease' for negative values", () => {
    expect(getDeltaType(-0.2)).toBe('moderateDecrease');
    expect(getDeltaType(-5)).toBe('moderateDecrease');
  });

  it("should return 'moderateIncrease' for positive values", () => {
    expect(getDeltaType(0.2)).toBe('moderateIncrease');
    expect(getDeltaType(5)).toBe('moderateIncrease');
  });

  it('should handle edge cases', () => {
    expect(getDeltaType(-0.1)).toBe('unchanged');
    expect(getDeltaType(0.1)).toBe('unchanged');
    expect(getDeltaType(-0.11)).toBe('moderateDecrease');
    expect(getDeltaType(0.11)).toBe('moderateIncrease');
  });
});

describe('formatPercentage', () => {
  it('0 should become 0.0%', () => {
    expect(formatPercentage(0)).toBe('0.0%');
  });

  it('100 should become 100.0%', () => {
    expect(formatPercentage(100)).toBe('100.0%');
  });

  it('5.99 should become 6.0%', () => {
    expect(formatPercentage(5.99)).toBe('6.0%');
  });

  it('55.55 should become 55.5%', () => {
    expect(formatPercentage(55.55)).toBe('55.5%');
  });

  it('33.12 should become 33.1%', () => {
    expect(formatPercentage(33.12)).toBe('33.1%');
  });

  it('should handle negative percentages', () => {
    expect(formatPercentage(-5)).toBe('-5.0%');
    expect(formatPercentage(-10.5)).toBe('-10.5%');
  });

  it('should handle very large percentages', () => {
    expect(formatPercentage(1000)).toBe('1000.0%');
    expect(formatPercentage(9999.99)).toBe('10000.0%');
  });

  it('should handle very small percentages', () => {
    expect(formatPercentage(0.01)).toBe('0.0%');
    expect(formatPercentage(0.05)).toBe('0.1%');
  });
});

describe('formatCurrency', () => {
  it('should format 0 correctly', () => {
    expect(formatCurrency(0)).toBe('0,00\u00a0€');
  });

  it('should format whole numbers correctly', () => {
    expect(formatCurrency(100)).toBe('100,00\u00a0€');
    expect(formatCurrency(1000)).toBe('1\u00a0000,00\u00a0€');
  });

  it('should format decimal numbers correctly', () => {
    expect(formatCurrency(99.99)).toBe('99,99\u00a0€');
    expect(formatCurrency(1234.56)).toBe('1\u00a0234,56\u00a0€');
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('1\u00a0000\u00a0000,00\u00a0€');
    expect(formatCurrency(1234567.89)).toBe('1\u00a0234\u00a0567,89\u00a0€');
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-50)).toBe('−50,00\u00a0€');
    expect(formatCurrency(-1234.56)).toBe('−1\u00a0234,56\u00a0€');
  });

  it('should round to 2 decimal places', () => {
    expect(formatCurrency(10.999)).toBe('11,00\u00a0€');
    expect(formatCurrency(10.994)).toBe('10,99\u00a0€');
    expect(formatCurrency(10.995)).toBe('11,00\u00a0€');
  });

  it('should handle very small numbers', () => {
    expect(formatCurrency(0.01)).toBe('0,01\u00a0€');
    expect(formatCurrency(0.001)).toBe('0,00\u00a0€');
  });
});

describe('calculateCoinShare', () => {
  it('should return 0 when portfolio value is 0', () => {
    expect(calculateCoinShare(100, 0)).toBe(0);
  });

  it('should calculate correct share', () => {
    expect(calculateCoinShare(50, 200)).toBe(25);
  });

  it('should handle small values', () => {
    expect(calculateCoinShare(0.1, 10)).toBe(1);
  });

  it('should handle large values', () => {
    expect(calculateCoinShare(1000000, 10000000)).toBe(10);
  });

  it('should return 100 when coin value equals portfolio value', () => {
    expect(calculateCoinShare(500, 500)).toBe(100);
  });

  it('should handle decimal values correctly', () => {
    expect(calculateCoinShare(33.33, 100)).toBeCloseTo(33.33);
    expect(calculateCoinShare(66.66, 99.99)).toBeCloseTo(66.67);
    expect(calculateCoinShare(0.1, 0.3)).toBeCloseTo(33.33);
  });
});

describe('getOwnedCoins', () => {
  it('should return an empty array when no transactions are provided', () => {
    expect(getOwnedCoins([])).toEqual([]);
  });

  it('should correctly calculate owned coins for a single buy transaction', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 5,
        symbol: 'BTC',
        pricePerCoin: 30000,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([
      { symbol: 'BTC', quantity: 5 },
    ]);
  });

  it('should not include coins with zero quantity after buy and sell', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 5,
        symbol: 'ETH',
        pricePerCoin: 2000,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'SELL',
        quantity: 5,
        symbol: 'ETH',
        pricePerCoin: 2100,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([]);
  });

  it('should correctly calculate owned coins for multiple transactions of different coins', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 2,
        symbol: 'BTC',
        pricePerCoin: 30000,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'BUY',
        quantity: 10,
        symbol: 'ETH',
        pricePerCoin: 2000,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '3',
        type: 'SELL',
        quantity: 1,
        symbol: 'BTC',
        pricePerCoin: 35000,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '4',
        type: 'BUY',
        quantity: 100,
        symbol: 'DOGE',
        pricePerCoin: 0.1,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([
      { symbol: 'BTC', quantity: 1 },
      { symbol: 'ETH', quantity: 10 },
      { symbol: 'DOGE', quantity: 100 },
    ]);
  });

  it('should handle multiple buy and sell transactions for the same coin', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 5,
        symbol: 'XRP',
        pricePerCoin: 1,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'SELL',
        quantity: 2,
        symbol: 'XRP',
        pricePerCoin: 1.5,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '3',
        type: 'BUY',
        quantity: 3,
        symbol: 'XRP',
        pricePerCoin: 1.2,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([
      { symbol: 'XRP', quantity: 6 },
    ]);
  });

  it('should handle decimal quantities correctly', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 0.5,
        symbol: 'BTC',
        pricePerCoin: 30000,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'BUY',
        quantity: 0.25,
        symbol: 'BTC',
        pricePerCoin: 31000,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([
      { symbol: 'BTC', quantity: 0.75 },
    ]);
  });

  it('should handle sell quantity exactly matching buy quantity', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 10,
        symbol: 'SOL',
        pricePerCoin: 100,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'SELL',
        quantity: 10,
        symbol: 'SOL',
        pricePerCoin: 120,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    expect(getOwnedCoins(transactions)).toEqual([]);
  });

  it('should maintain correct order with multiple coins', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'BUY',
        quantity: 1,
        symbol: 'ZZZ',
        pricePerCoin: 1,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'BUY',
        quantity: 1,
        symbol: 'AAA',
        pricePerCoin: 1,
        createdAt: new Date(),
        userId: 'user1',
      },
      {
        id: '3',
        type: 'BUY',
        quantity: 1,
        symbol: 'MMM',
        pricePerCoin: 1,
        createdAt: new Date(),
        userId: 'user1',
      },
    ];
    const result = getOwnedCoins(transactions);
    expect(result).toHaveLength(3);
    expect(result.map((c) => c.symbol)).toContain('AAA');
    expect(result.map((c) => c.symbol)).toContain('MMM');
    expect(result.map((c) => c.symbol)).toContain('ZZZ');
  });
});
