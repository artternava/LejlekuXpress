using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IUserService
    {
        Task<User> GetUser(int id);

        Task DeleteUser(int id);

        Task<User> UpdateUser(int id, UserDTO request);

        Task<IEnumerable<User>> GetAll();

        Task<User> MakeMod(int id);
    }
}
