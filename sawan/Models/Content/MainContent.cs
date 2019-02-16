namespace sawan
{
    using System.Collections.Generic;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class MainContent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public Language Language { get; set; }
        public NavigationMenuContent NavigationMenuContent { get; set; }
        public MenuContent MenuContent { get; set; }
        public FooterContent FooterContent { get; set; }
    }
}