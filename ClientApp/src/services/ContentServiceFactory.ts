import { ContentService } from './ContentService';
import { IContentService } from './IContentService';
import { MockContentService } from './MockContentService';

export class ContentServiceFactory {

    public static GetContentService(): IContentService {
        const mode = process.env.mode as string;
        if (mode === 'production') {
            return new ContentService();
        }

        return new MockContentService();
    }
}
