import { describe, expect, it } from "vitest";
import {
  calculateCoinShare,
  formatPercentage,
  getDeltaType,
} from "../src/lib/utils";

describe("getDeltaType", () => {
  it("should return 'unchanged' for values between -0.1 and 0.1", () => {
    expect(getDeltaType(0)).toBe("unchanged");
    expect(getDeltaType(0.05)).toBe("unchanged");
    expect(getDeltaType(-0.05)).toBe("unchanged");
  });

  it("should return 'moderateDecrease' for negative values", () => {
    expect(getDeltaType(-0.2)).toBe("moderateDecrease");
    expect(getDeltaType(-5)).toBe("moderateDecrease");
  });

  it("should return 'moderateIncrease' for positive values", () => {
    expect(getDeltaType(0.2)).toBe("moderateIncrease");
    expect(getDeltaType(5)).toBe("moderateIncrease");
  });

  it("should handle edge cases", () => {
    expect(getDeltaType(-0.1)).toBe("unchanged");
    expect(getDeltaType(0.1)).toBe("unchanged");
    expect(getDeltaType(-0.11)).toBe("moderateDecrease");
    expect(getDeltaType(0.11)).toBe("moderateIncrease");
  });
});

describe("formatPercentage", () => {
  it("0 should become 0.0%", () => {
    expect(formatPercentage(0)).toBe("0.0%");
  });

  it("100 should become 100.0%", () => {
    expect(formatPercentage(100)).toBe("100.0%");
  });

  it("5.99 should become 6.0%", () => {
    expect(formatPercentage(5.99)).toBe("6.0%");
  });

  it("55.55 should become 55.5%", () => {
    expect(formatPercentage(55.55)).toBe("55.5%");
  });

  it("33.12 should become 33.1%", () => {
    expect(formatPercentage(33.12)).toBe("33.1%");
  });
});

describe("calculateCoinShare", () => {
  it("should return 0 when portfolio value is 0", () => {
    expect(calculateCoinShare(100, 0)).toBe(0);
  });

  it("should calculate correct share", () => {
    expect(calculateCoinShare(50, 200)).toBe(25);
  });

  it("should handle small values", () => {
    expect(calculateCoinShare(0.1, 10)).toBe(1);
  });

  it("should handle large values", () => {
    expect(calculateCoinShare(1000000, 10000000)).toBe(10);
  });

  it("should return 100 when coin value equals portfolio value", () => {
    expect(calculateCoinShare(500, 500)).toBe(100);
  });

  it("should handle decimal values correctly", () => {
    expect(calculateCoinShare(33.33, 100)).toBeCloseTo(33.33);
    expect(calculateCoinShare(66.66, 99.99)).toBeCloseTo(66.67);
    expect(calculateCoinShare(0.1, 0.3)).toBeCloseTo(33.33);
  });
});
