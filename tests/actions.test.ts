import { describe, expect, it } from 'bun:test';
import { parseTradeFormData } from '../src/actions';

describe('parseTradeFormData', () => {
  it('should parse valid form data correctly', () => {
    const formData = new FormData();
    formData.set('symbol', 'btc');
    formData.set('quantity', '5');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result).toEqual({
      symbol: 'BTC',
      quantity: 5,
      type: 'BUY',
    });
  });

  it('should convert symbol to uppercase', () => {
    const formData = new FormData();
    formData.set('symbol', 'eth');
    formData.set('quantity', '10');
    formData.set('type', 'SELL');

    const result = parseTradeFormData(formData);

    expect(result.symbol).toBe('ETH');
  });

  it('should trim whitespace from symbol', () => {
    const formData = new FormData();
    formData.set('symbol', '  btc  ');
    formData.set('quantity', '1');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.symbol).toBe('BTC');
  });

  it('should handle empty symbol', () => {
    const formData = new FormData();
    formData.set('symbol', '');
    formData.set('quantity', '5');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.symbol).toBe('');
  });

  it('should handle missing symbol field', () => {
    const formData = new FormData();
    formData.set('quantity', '5');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.symbol).toBe('');
  });

  it('should parse decimal quantities', () => {
    const formData = new FormData();
    formData.set('symbol', 'BTC');
    formData.set('quantity', '0.5');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBe(0.5);
  });

  it('should handle invalid quantity strings', () => {
    const formData = new FormData();
    formData.set('symbol', 'BTC');
    formData.set('quantity', 'invalid');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBeNaN();
  });

  it('should handle zero quantity', () => {
    const formData = new FormData();
    formData.set('symbol', 'BTC');
    formData.set('quantity', '0');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBe(0);
  });

  it('should handle negative quantities', () => {
    const formData = new FormData();
    formData.set('symbol', 'BTC');
    formData.set('quantity', '-5');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBe(-5);
  });

  it('should parse SELL transaction type', () => {
    const formData = new FormData();
    formData.set('symbol', 'ETH');
    formData.set('quantity', '3');
    formData.set('type', 'SELL');

    const result = parseTradeFormData(formData);

    expect(result.type).toBe('SELL');
  });

  it('should handle symbols with numbers', () => {
    const formData = new FormData();
    formData.set('symbol', 'uni1');
    formData.set('quantity', '100');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.symbol).toBe('UNI1');
  });

  it('should handle very large quantities', () => {
    const formData = new FormData();
    formData.set('symbol', 'DOGE');
    formData.set('quantity', '1000000');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBe(1000000);
  });

  it('should handle very small decimal quantities', () => {
    const formData = new FormData();
    formData.set('symbol', 'BTC');
    formData.set('quantity', '0.00000001');
    formData.set('type', 'BUY');

    const result = parseTradeFormData(formData);

    expect(result.quantity).toBe(0.00000001);
  });
});
