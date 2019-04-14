import { DateUtil } from './DateUtils';

test('Convert toHumanHours', () => {

    let dateTime = new Date(2018, 1, 1, 10, 10, 10);
    expect(DateUtil.toHumanHours(dateTime)).toBe("10:10");

    dateTime = new Date(2018, 1, 1, 2, 10, 10);
    expect(DateUtil.toHumanHours(dateTime)).toBe("02:10");

    dateTime = new Date(2018, 1, 1, 10, 2, 10);
    expect(DateUtil.toHumanHours(dateTime)).toBe("10:02");

    dateTime = new Date(2018, 1, 1, 2, 2, 10);
    expect(DateUtil.toHumanHours(dateTime)).toBe("02:02");
});

test('Get default date', () => {
    expect(DateUtil.defaultDate()).not.toBeNull();
    expect(DateUtil.defaultDate(true)).not.toBeNull();
});
