using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IOrdersService
    {
        Task<Orders> AddItem(OrdersDTO request);

        Task<List<Orders>> GetByUserId(int userId);

        Task DeleteItem(int id);

        Task<Orders> UpdateItem(int id, OrdersDTO request);
    }
}
