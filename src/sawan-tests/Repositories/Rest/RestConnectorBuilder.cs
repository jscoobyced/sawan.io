namespace sawan.tests
{
    using System.Collections.Generic;
    using sawan.Services;
    using Moq;
    using sawan.Repositories;

    public class RestConnectorBuilder
    {
        private string result;

        public RestConnectorBuilder WithResult(string result)
        {
            this.result = result;
            return this;
        }

        public IRestConnector Build()
        {
            var mockRestConnector = new Mock<IRestConnector>();
            mockRestConnector
                .Setup(m=>m.GetAsync(It.IsAny<string>()))
                .ReturnsAsync(this.result);

            return mockRestConnector.Object;
        }
    }
}