import { MovingAverage } from './MovingAverage';

export class StandardDeviation {
  public sd(data: number[], size?: number): number[] {
    const safeSize = size === undefined ? 1 : size;
    const { length } = data;
    const avg = new MovingAverage().ma(data, safeSize);
    const ret: number[] = [];

    let i = safeSize - 1;
    let j;
    let sum;

    for (; i < length; i += 1) {
      sum = 0;
      j = i - safeSize + 1;

      for (; j <= i; j += 1) {
        sum += (data[j] - avg[i]) ** 2;
      }

      ret[i] = Math.sqrt(sum / safeSize);
    }

    return ret;
  }
}
