import { Pairing } from '../Models';
import { AnalysisHelper } from './AnalysisHelper';
import { AnalysisHelperTestData } from './AnalysisHelperTestData';

const highPairing1: Pairing = {
  high: 1500,
  open: 1300,
  close: 1100,
  low: 150,
  timestamp: 123456789,
};

const highPairing2: Pairing = {
  high: 1500,
  open: 1300,
  close: 1400,
  low: 150,
  timestamp: 123456789,
};

const lowPairing1: Pairing = {
  high: 1400,
  open: 1200,
  close: 150,
  low: 100,
  timestamp: 123456789,
};

const lowPairing2: Pairing = {
  high: 1400,
  open: 1200,
  close: 1300,
  low: 100,
  timestamp: 123456789,
};

const largePairing: Pairing = {
  high: 2000,
  open: 50,
  close: 1350,
  low: 50,
  timestamp: 123456789,
};

const positivePairing: Pairing = {
  high: 3000,
  open: 1350,
  close: 1550,
  low: 1250,
  timestamp: 123456789,
};

const negativePairing: Pairing = {
  high: 1600,
  open: 1550,
  close: 1350,
  low: 1050,
  timestamp: 123456789,
};

const distantPairing: Pairing = {
  high: 100,
  open: 150,
  close: 150,
  low: 150,
  timestamp: 123456789,
};

test('AnalysisHelper check IsDropping', () => {
  const isDropping = AnalysisHelper.IsDropping(highPairing1, lowPairing1);
  expect(isDropping).toBeTruthy();

  const isNotDropping = AnalysisHelper.IsDropping(lowPairing1, highPairing1);
  expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsRaising', () => {
  const isRaising = AnalysisHelper.IsRaising(lowPairing2, highPairing2);
  expect(isRaising).toBeTruthy();

  const isNotRaising = AnalysisHelper.IsRaising(highPairing2, lowPairing2);
  expect(isNotRaising).toBeFalsy();
});

test('AnalysisHelper check IsEngulfing', () => {
  const isDropping = AnalysisHelper.IsEngulfing(largePairing, highPairing1, lowPairing1);
  expect(isDropping).toBeTruthy();

  const isNotDropping = AnalysisHelper.IsEngulfing(highPairing1, lowPairing1, largePairing);
  expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsPositive', () => {
  const isPositive = AnalysisHelper.IsPositive(positivePairing);
  expect(isPositive).toBeTruthy();

  const isNotPositive = AnalysisHelper.IsPositive(negativePairing);
  expect(isNotPositive).toBeFalsy();
});

test('AnalysisHelper check IsNegative', () => {
  const IsNegative = AnalysisHelper.IsNegative(negativePairing);
  expect(IsNegative).toBeTruthy();

  const IsNotNegative = AnalysisHelper.IsNegative(positivePairing);
  expect(IsNotNegative).toBeFalsy();
});

test('AnalysisHelper check IsBigDrop', () => {
  const IsBigDrop = AnalysisHelper.IsBigDrop(100, 1);
  expect(IsBigDrop).toBeTruthy();

  const IsNotBigDrop = AnalysisHelper.IsBigDrop(1, 100);
  expect(IsNotBigDrop).toBeFalsy();
});

test('AnalysisHelper check IsReversingDown', () => {
  const IsReversingDown = AnalysisHelper.IsReversingDown(positivePairing, negativePairing);
  expect(IsReversingDown).toBeTruthy();

  const IsNotReversingDown = AnalysisHelper.IsReversingDown(negativePairing, positivePairing);
  expect(IsNotReversingDown).toBeFalsy();
});

test('AnalysisHelper Height', () => {
  const height = AnalysisHelper.Height(largePairing);
  expect(height).toBe(1300);
});

test('AnalysisHelper IsTall', () => {
  const isTall = AnalysisHelper.IsTall(lowPairing2, largePairing, highPairing2, highPairing1);
  expect(isTall).toBeTruthy();
});

test('AnalysisHelper IsShort', () => {
  const isShort = AnalysisHelper.IsShort(largePairing, highPairing1, lowPairing1);
  expect(isShort).toBeTruthy();
});

test('AnalysisHelper IsGap', () => {
  const isGap = AnalysisHelper.IsGap(distantPairing, highPairing1);
  expect(isGap).toBeTruthy();
});

test('AnalysisHelper no IsGap', () => {
  const isGap = AnalysisHelper.IsGap(highPairing1, highPairing2);
  expect(isGap).toBeFalsy();
});

test('AnalysisHelper ThreeDropping', () => {
  const data = new AnalysisHelperTestData();
  const isThreeDropping = AnalysisHelper.IsThreeDropping(data.four, data.three, data.two, data.one, data.current);
});
