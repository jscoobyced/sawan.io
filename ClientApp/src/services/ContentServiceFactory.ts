import { ContentService } from './ContentService';
import { IContentService } from './IContentService';
import { MockContentService } from './MockContentService';

export class ContentServiceFactory {

    public static GetContentService(): IContentService {
        if (!ContentServiceFactory.contentService) {
            const mode = process.env.mode as string;
            if (mode === 'production') {
                ContentServiceFactory.contentService = new ContentService();
            } else {
                ContentServiceFactory.contentService = new MockContentService();
            }
        }
        return ContentServiceFactory.contentService;
    }

    private static contentService: IContentService;
}
