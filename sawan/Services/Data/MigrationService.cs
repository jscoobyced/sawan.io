using sawan.Repositories;

namespace sawan.Services
{
    public class MigrationService : IMigrationService
    {
        private readonly IDbRepository dbRepository;
        void IMigrationService.CheckInitialData()
        {
        }
    }
}