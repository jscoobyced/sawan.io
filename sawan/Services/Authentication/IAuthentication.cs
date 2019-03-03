namespace sawan.Services
{
    using System.Threading.Tasks;

    public interface IAuthentication
    {
        Task<bool> IsAdministrator(string token);
    }
}