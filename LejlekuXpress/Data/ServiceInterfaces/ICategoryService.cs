using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICategoryService
    {
        Task<Category> GetCategory(int id);
        Task<IEnumerable<Category>> GetAll();
    }
}
