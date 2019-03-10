namespace sawan.Services
{
    using System.Threading.Tasks;

    public interface IAuthentication
    {
        Task<GoogleUser> Login(string token);
    }
}