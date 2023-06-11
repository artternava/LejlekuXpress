using LejlekuXpress.Data.DTO;
using LejlekuXpress.Models;

namespace LejlekuXpress.Data.ServiceInterfaces
{
    public interface IOrdersService
    {
        Task<Orders> AddItem(OrdersDTO request);
    }
}
