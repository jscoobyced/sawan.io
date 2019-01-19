import xss from 'xss';

export class HtmlUtils {

    public static readonly baseUrl = (): string => {

        const base = HtmlUtils.getFirstElementsByTagName('base');

        if (!base) {
            return "";
        }

        const baseUrl = base.getAttribute('href');

        if (!baseUrl) {
            return "";
        }

        return baseUrl;
    }

    public static readonly getFirstElementsByTagName = (tagName: string): Element | null => {
        if (!document) {
            return null;
        }

        const elements = document.getElementsByTagName(tagName);
        if (!elements || elements.length === 0) {
            return null;
        }

        return elements[0];
    }

    public static getEllipsis(content: string, length: number): string {
        if (length <= 0 || !content || content.length < length) {
            return content;
        }

        let safeSummary = content.substring(0, length);
        if (content !== safeSummary) {
            safeSummary = safeSummary.substring(0, safeSummary.lastIndexOf(" "));
            safeSummary += '&#8230;';
        }
        return safeSummary;
    }

    public static getSafeContent(content: string, length = -1): string {
        return HtmlUtils.xssFilter.process(content);
    }

    private static readonly options = {
        whiteList: {
            a: ['href', 'title', 'target'],
            br: []
        }
    };

    private static readonly xssFilter = new xss.FilterXSS(HtmlUtils.options);
}
