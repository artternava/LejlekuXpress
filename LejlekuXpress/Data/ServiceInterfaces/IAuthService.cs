using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IAuthService
    {
        Task<User> Register(UserRegistrationDTO request);

        Task<string> Login(UserLoginDTO request);

        Task Logout(string userId);
    }
}
