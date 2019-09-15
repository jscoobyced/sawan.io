import { HtmlUtils } from './HtmlUtils';

function mockGetElementByTagName(value: any, noBase = false, noLength = false) {
  return jest.fn().mockImplementation(() => {
    if (noBase) {
      return undefined;
    }

    if (noLength) {
      return [];
    }

    return [{
      getAttribute: () => value,
    }];
  });
}

describe('HtmlUtils.baseUrl', () => {
  it('returns / when base value is /', () => {
    document.getElementsByTagName = mockGetElementByTagName('/');
    expect(HtmlUtils.baseUrl()).toBe('/');
  });

  it('returns empty string when document has no "base" tag', () => {
    document.getElementsByTagName = mockGetElementByTagName('', true);
    expect(HtmlUtils.baseUrl()).toBe('');
  });

  it('returns empty string when "base" tag is empty', () => {
    document.getElementsByTagName = mockGetElementByTagName('', true);
    expect(HtmlUtils.baseUrl()).toBe('');
  });

  it('returns empty string when base URL is undefined', () => {
    document.getElementsByTagName = mockGetElementByTagName('', false, true);
    expect(HtmlUtils.baseUrl()).toBe('');
  });

  it('returns empty string when base URL is null', () => {
    document.getElementsByTagName = mockGetElementByTagName(null);
    expect(HtmlUtils.baseUrl()).toBe('');
  });

  it('returns empty string when base URL is empty string', () => {
    document.getElementsByTagName = mockGetElementByTagName('');
    expect(HtmlUtils.baseUrl()).toBe('');
  });
});

test('getSafeContent with empty input', () => {
  expect(HtmlUtils.getSafeContent('')).toBe('');
});

test('getSafeContent with allowed HTML in input', () => {
  const input = 'This is a <a href="http://link" title="title" target="_blank">link</a>.<br />Supports BR tag.';
  expect(HtmlUtils.getSafeContent(input)).toBe(input);
});

test('getSafeContent with forbidden HTML in input', () => {
  const input = 'This tag should be stripped: <div>test</div>.';
  const expected = 'This tag should be stripped: &lt;div&gt;test&lt;/div&gt;.';
  expect(HtmlUtils.getSafeContent(input)).toBe(expected);
});

test('getEllispis with empty input', () => {
  const input = 'Test of some text.';
  expect(HtmlUtils.getEllipsis('', 10)).toBe('');
  expect(HtmlUtils.getEllipsis(input, 0)).toBe(input);
  expect(HtmlUtils.getEllipsis(input, 100)).toBe(input);
});

test('getEllispis with valid input', () => {
  const input = 'This is a valid text with more than 20 characters.';
  const expected20 = 'This is a valid&#8230;';
  const expected23 = 'This is a valid text&#8230;';
  expect(HtmlUtils.getEllipsis(input, 20)).toBe(expected20);
  expect(HtmlUtils.getEllipsis(input, 23)).toBe(expected23);
});

test('query string is empty', () => {
  expect(HtmlUtils.queryString()).toBe('');
});
