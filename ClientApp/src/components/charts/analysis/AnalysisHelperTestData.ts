import { Decision, Pairing, Pattern } from '../Models';

export class AnalysisHelperTestData {
    public readonly four: Pairing = {
      timestamp: 1535252400000,
      low: 217700.0,
      high: 218900.0,
      open: 217800.0,
      close: 218250.0,
    };

    public readonly three: Pairing = {
      timestamp: 1535252700000,
      low: 218200.0,
      high: 219900.0,
      open: 218200.0,
      close: 218650.0,
    };

    public readonly two: Pairing = {
      timestamp: 1535253000000,
      low: 218050.0,
      high: 219901,
      open: 219000.0,
      close: 218100.0,
    };

    public readonly one = {
      timestamp: 1535253300000,
      low: 216400.0,
      high: 217650.99999,
      open: 217600.0,
      close: 216800.0,
    };

    public readonly current: Pairing = {
      timestamp: 1535253600000,
      low: 215500.0,
      high: 216801,
      open: 216700.0,
      close: 216100.0,
    };

    public readonly eveningStar1: Pairing = {
      timestamp: 1535253600000,
      low: 214050.0,
      high: 215000,
      open: 215000.0,
      close: 215550.0,
    };

    public readonly eveningStar2: Pairing = {
      timestamp: 1535253600000,
      low: 215001.0,
      high: 217090.0,
      open: 215004.0,
      close: 216802.0,
    };

    public readonly eveningStar3: Pairing = {
      timestamp: 1535253600000,
      low: 216900.0,
      high: 217302.0,
      open: 217252.0,
      close: 217182.0,
    };

    public readonly eveningStar4: Pairing = {
      timestamp: 1535253600000,
      low: 215850.0,
      high: 216800,
      open: 216550.0,
      close: 215900.0,
    };

    public readonly sellPattern: Pattern = {
      decision: Decision.Sell,
      confidence: 74,
      comment: 'none',
    };

    public readonly buyPattern: Pattern = {
      decision: Decision.Buy,
      confidence: 84,
      comment: 'none',
    };
}
