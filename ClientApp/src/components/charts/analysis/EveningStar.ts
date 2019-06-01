import { Decision, Pairing, Pattern } from '../Models';
import { AnalysisHelper } from './AnalysisHelper';
import { DefaultPattern, IAnalyser } from './Models';

export class EveningStar implements IAnalyser {
    public analyse(pairings: Pairing[], index: number, upper: boolean): Pattern {
        if (!pairings || pairings.length < index || index < 3 || upper) {
            return DefaultPattern;
        }

        const three = pairings[index - 3];
        const two = pairings[index - 2];
        const one = pairings[index - 1];
        const current = pairings[index];

        if (AnalysisHelper.IsTall(three, two, one, current)
            && AnalysisHelper.IsNegative(one)
            && AnalysisHelper.IsPositive(two)
            && AnalysisHelper.IsShort(two, one, current)
            && AnalysisHelper.IsGap(two, one)
            && AnalysisHelper.IsGap(one, current)
            && AnalysisHelper.IsRaising(two, one)
            && AnalysisHelper.IsDropping(one, current)
            && AnalysisHelper.IsNegative(current)) {
            return {
                decision: Decision.Sell,
                confidence: 72,
                comment: "Evening Star"
            };
        }

        return DefaultPattern;
    }
}
