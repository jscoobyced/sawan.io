namespace sawan
{
    using System;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class BlogElement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime BlogDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Article { get; set; }
        public string ArticleTitle { get; set; }
    }
}