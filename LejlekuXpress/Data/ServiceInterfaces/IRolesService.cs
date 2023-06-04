using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IRolesService
    {
        Task<IEnumerable<Roles>> GetAll();
        Task<Roles> GetRole(int id);
    }
}
