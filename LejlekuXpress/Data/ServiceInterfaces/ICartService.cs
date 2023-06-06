using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface ICartService
    {
        Task<Cart> AddItem(CartDTO request);

        Task<List<Cart>> GetByUserId(int userId);

        Task DeleteItem(int id);
    }
}
