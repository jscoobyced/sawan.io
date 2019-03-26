namespace sawan.tests
{
    using FluentAssertions;
    using sawan.Repositories;
    using Xunit;

    public class MDatabaseTests
    {
        [Theory]
        [InlineData(null, "test")]
        [InlineData("", "test")]
        [InlineData("test", null)]
        [InlineData("test", "")]
        public void GetDatabaseNullCheck(string connectionString, string database)
        {
            var mongo = new Mongo()
            {
                ConnectionString = connectionString,
                Database = database
            };
            var mDatabase = new MDatabase(
                new OptionBuilder()
                .WithMongo(mongo)
                .Build());

            var result = mDatabase.GetDatabase();
            result.Should().BeNull();
        }
    }
}