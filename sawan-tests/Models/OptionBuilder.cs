namespace sawan.tests
{

    using Microsoft.Extensions.Options;
    using Moq;

    public class OptionBuilder
    {
        private readonly AppSettings appSettings = new AppSettings()
        {
            Url = new Url(),
            MariaDB = new MariaDB()
            {
                ConnectionString = string.Empty
            }
        };

        public IOptions<AppSettings> Build()
        {
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns(this.appSettings);
            return ioptions.Object;
        }

        public IOptions<AppSettings> BuildNullAppSettings()
        {
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns((AppSettings)null);
            return ioptions.Object;
        }

        public IOptions<AppSettings> BuildNullUrlAppSettings()
        {
            var nullUrlAppSettings = new AppSettings()
            {
                Url = null
            };
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns(nullUrlAppSettings);
            return ioptions.Object;
        }

        public OptionBuilder WithDefaultCurrenciesUrl()
        {
            this.WithCurrenciesUrl("some");
            return this;
        }

        public OptionBuilder WithCurrenciesUrl(string url)
        {
            this.appSettings.Url.Currencies = url;
            return this;
        }

        public OptionBuilder WithDefaultPairingsUrl()
        {
            this.WithPairingsUrl("some");
            return this;
        }

        public OptionBuilder WithPairingsUrl(string url)
        {
            this.appSettings.Url.Pairings = url;
            return this;
        }

        public OptionBuilder WithAuthentication(string googleKey, string jwtKey)
        {
            this.appSettings.Authentication = new Authentication()
            {
                GoogleKey = googleKey,
                JwtKey = jwtKey
            };
            return this;
        }
    }
}