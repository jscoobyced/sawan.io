export class DateUtil {
    public static toHumanHours(date: Date): string {
        return `${this.toDigits(date.getHours(), 2)}:${this.toDigits(date.getMinutes(), 2)}`;
    }

    public static dateToString(date: Date): string {
        const lDate = new Date(date);
        const year = lDate.getFullYear();
        const month = DateUtil.toDigits(lDate.getMonth() + 1, 2);
        const day = DateUtil.toDigits(lDate.getDate(), 2);
        return `${year}-${month}-${day}`;
    }

    public static defaultDate(): Date {
        return new Date('2019-01-01T00:00:00Z');
    }

    private static toDigits(value: number, length: number): string {
        let result: string = value.toString();
        while (result.length < length) {
            result = "0" + result;
        }

        return result;
    }
}
