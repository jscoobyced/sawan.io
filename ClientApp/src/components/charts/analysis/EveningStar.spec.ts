import { Pairing } from "../Models";
import { AnalysisHelperTestData } from "./AnalysisHelperTestData";
import { EveningStar } from "./EveningStar";
import { DefaultPattern } from "./Models";

const data = new AnalysisHelperTestData();

test('EveningStar analysis is skipped because of parameters', () => {
    const eveningStar = new EveningStar();
    let result = eveningStar.analyse(null as unknown as Pairing[], 2, true);
    expect(result).toEqual(DefaultPattern);

    result = eveningStar.analyse([data.two, data.two], 3, true);
    expect(result).toEqual(DefaultPattern);

    result = eveningStar.analyse([data.two, data.two, data.two, data.two], 2, true);
    expect(result).toEqual(DefaultPattern);

    result = eveningStar.analyse([data.two, data.two, data.two, data.two, data.two], 4, true);
    expect(result).toEqual(DefaultPattern);
});

test('EveningStar analysis is Sell', () => {
    const eveningStar = new EveningStar();
    const result = eveningStar.analyse([data.eveningStar1, data.eveningStar2, data.eveningStar3, data.eveningStar4], 3, false);
    const expected = data.sellPattern;
    expected.confidence = 72;
    expected.comment = "Evening Star";
    expect(result).toEqual(expected);
});

test('EveningStar analysis is Nothing', () => {
    const eveningStar = new EveningStar();
    const result = eveningStar.analyse([data.eveningStar2, data.eveningStar1, data.eveningStar3, data.eveningStar4], 3, false);
    expect(result).toEqual(DefaultPattern);
});
