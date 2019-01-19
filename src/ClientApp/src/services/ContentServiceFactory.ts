import { ContentService } from './ContentService';
import { IContentService } from './IContentService';
import { MockContentService } from './MockContentService';

export class ContentServiceFactory {

    public static GetContentService(mode: string): IContentService {
        if (mode === 'production') {
            return new ContentService();
        }

        return new MockContentService();
    }
}