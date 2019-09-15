import { Pairing } from '../Models';

export class AnalysisHelper {
  public static Height(pairing: Pairing): number {
    return Math.abs(pairing.open - pairing.close);
  }

  public static IsDropping(first: Pairing, second: Pairing): boolean {
    return second.close < first.close
            && second.low < first.low
            && second.open < first.open
            && second.high < first.high;
  }

  public static IsRaising(first: Pairing, second: Pairing): boolean {
    return second.close > first.close
            && second.low > first.low
            && second.open > first.open
            && second.high > first.high;
  }

  public static IsEngulfing(current: Pairing, first: Pairing, previous: Pairing): boolean {
    return current.open < previous.close
            && current.low < previous.low
            && current.close > first.open
            && current.high > first.high;
  }

  public static IsPositive(pairing: Pairing): boolean {
    return pairing.close > pairing.open;
  }

  public static IsNegative(pairing: Pairing): boolean {
    return pairing.close < pairing.open;
  }

  public static IsBigDrop(one: number, two: number): boolean {
    return ((one - two) / one) > 0.002;
  }

  public static IsReversingDown(previous: Pairing, current: Pairing): boolean {
    return AnalysisHelper.IsPositive(previous)
            && AnalysisHelper.IsNegative(current);
  }

  public static IsTall(previous: Pairing, current: Pairing, next: Pairing, last: Pairing): boolean {
    const average = (AnalysisHelper.Height(previous)
            + AnalysisHelper.Height(next)
            + AnalysisHelper.Height(last)) / 3;
    return AnalysisHelper.Height(current) > (average * 2);
  }

  public static IsShort(previous: Pairing, current: Pairing, next: Pairing): boolean {
    const average = (AnalysisHelper.Height(previous)
            + AnalysisHelper.Height(next)) / 2;
    return AnalysisHelper.Height(current) < average / 2;
  }

  public static IsGap(previous: Pairing, current: Pairing): boolean {
    const maxPrevious = Math.max(previous.open, previous.close);
    const minPrevious = Math.min(previous.open, previous.close);
    const maxCurrent = Math.max(current.open, current.close);
    const minCurrent = Math.min(current.open, current.close);
    return (minCurrent - maxPrevious) > 0
            || (minPrevious - maxCurrent) > 0;
  }

  public static IsThreeDropping(four: Pairing, three: Pairing, two: Pairing, one: Pairing, current: Pairing): boolean {
    return AnalysisHelper.IsRaising(four, three)
            && AnalysisHelper.IsNegative(one)
            && AnalysisHelper.IsNegative(two)
            && AnalysisHelper.IsPositive(three)
            && AnalysisHelper.IsPositive(four)
            && AnalysisHelper.IsNegative(current)
            && AnalysisHelper.IsReversingDown(three, two)
            && AnalysisHelper.IsDropping(two, one)
            && AnalysisHelper.IsDropping(one, current);
  }
}
