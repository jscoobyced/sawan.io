namespace sawan.tests
{
    using sawan.Controllers;
    using sawan.Services;
    public class DataControllerBuilder
    {
        private IPairingService pairingService;

        public DataControllerBuilder WithPairingService(IPairingService pairingService)
        {
            this.pairingService = pairingService;
            return this;
        }

        public DataController Build()
        {
            return new DataController(this.pairingService, null);
        }
    }
}