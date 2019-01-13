import { ContentService } from './ContentService';
import { ContentServiceFactory } from './ContentServiceFactory';
import { MockContentService } from './MockContentService';

test('ContentServiceFactory can create mock service', () => {
    const contentService = ContentServiceFactory.GetContentService('development');
    expect(contentService).toBeInstanceOf(MockContentService);
});

test('ContentServiceFactory can create a real service', () => {
    const contentService = ContentServiceFactory.GetContentService('production');
    expect(contentService).toBeInstanceOf(ContentService);
});
